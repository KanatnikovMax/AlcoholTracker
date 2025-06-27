package com.example.project.service;

import com.example.project.dto.*;
import com.example.project.entity.Alcohol;
import com.example.project.entity.Party;
import com.example.project.entity.PartyMenu;
import com.example.project.entity.User;
import com.example.project.exception.OperationNotAllowedException;
import com.example.project.exception.ResourceNotFoundException;
import com.example.project.repository.AlcoholRepository;
import com.example.project.repository.PartyRepository;
import com.example.project.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class PartyService {
    private final UserRepository userRepository;
    private final PartyRepository partyRepository;
    private final AlcoholRepository alcoholRepository;
    private final AlcoholCalculatorService alcoholCalculatorService;

    @Transactional(readOnly = true)
    public PartyPreviewResponse getPartyPreview(PartyPreviewRequest request) {
        Long userId = request.getUserId();

        User user = getUserOrThrow(userId);

        AlcoholCalculationRequest calculationRequest = new AlcoholCalculationRequest();
        calculationRequest.setUserId(userId);
        calculationRequest.setWeight(user.getWeight());
        calculationRequest.setAge(user.getAge());
        calculationRequest.setGender(user.getGender());
        calculationRequest.setHeight(user.getHeight());
        calculationRequest.setSatiety(request.getSatiety());
        calculationRequest.setDesiredPromille(request.getDesiredPromille());

        // Получаем расчет
        AlcoholCalculationResponse calculationResponse = alcoholCalculatorService.calculate(calculationRequest);

        return new PartyPreviewResponse(
                mapToUserInfoDto(user),
                calculationResponse
        );
    }

    @Caching (
            evict = {
                    @CacheEvict(value = "userParties", key = "#userId"),
                    @CacheEvict(value = "partyDetails", allEntries = true)
            }
    )
    @Transactional
    public PartyCreationResponse saveParty(Long userId, SavePartyRequest request) {
        User user = getUserOrThrow(userId);
        validatePartyRequest(request);

        Party party = new Party();
        party.setDate(LocalDateTime.now());
        party.setPlace(request.getPlace());
        party.setSatiety(request.getSatiety());
        party.setDesiredPromille(request.getDesiredPromille());
        party.setNeedFeedback(true);
        party.setUser(user);

        List<PartyMenu> menuItems = new ArrayList<>();

        // Добавляем напитки с объемами
        for (AlcoholDto drink : request.getSelectedDrinks()) {
            Alcohol alcohol = alcoholRepository.findById(drink.getAlcoholId())
                    .orElseThrow(() -> new EntityNotFoundException("Alcohol not found"));

            PartyMenu menuItem = new PartyMenu();
            menuItem.setParty(party);
            menuItem.setAlcohol(alcohol);
            menuItem.setVolume(drink.getVolume());

            menuItems.add(menuItem);
        }

        party.setMenuItems(menuItems);

        Party savedParty = partyRepository.save(party);

        return new PartyCreationResponse(
                mapToPartyDto(savedParty),
                mapToUserInfoDto(user),
                request.getCalculationResponse()
        );
    }

    @CacheEvict(value = "userParties", key = "#userId")
    @Transactional(readOnly = true)
    public List<PartyViewDto> getPartiesByUserId(Long userId) {
        getUserOrThrow(userId);
        return partyRepository.findByUser_UserIdOrderByDateDesc(userId).stream()
                .map(this::mapToPartyViewDto).collect(Collectors.toList());
    }

    @Cacheable(value = "partyDetails", key = "{#userId, #partyId}")
    public PartyDto getPartyByIdAndUserid(Long userId, Long partyId) {
        Party party = partyRepository.findByPartyIdAndUser_UserId(partyId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Party not found for you"));
        return mapToPartyDto(party);
    }

    private UserInfoDto mapToUserInfoDto(User user) {
        UserInfoDto dto = new UserInfoDto();
        dto.setUserId(user.getUserId());
        dto.setGender(user.getGender());
        dto.setAge(user.getAge());
        dto.setHeight(user.getHeight());
        dto.setWeight(user.getWeight());
        return dto;
    }

    private PartyDto mapToPartyDto(Party party) {
        PartyDto partyDto = new PartyDto();
        partyDto.setPartyId(party.getPartyId());
        partyDto.setDate(party.getDate());
        partyDto.setSatiety(party.getSatiety());
        partyDto.setPlace(party.getPlace());
        partyDto.setDesiredPromille(party.getDesiredPromille());
        partyDto.setNeedFeedback(party.getNeedFeedback());

        // Маппинг напитков
        if (party.getMenuItems() != null) {
            partyDto.setDrinks(party.getMenuItems().stream()
                    .map(this::mapPartyMenuToDrinkDto)
                    .collect(Collectors.toList()));
        }

        return partyDto;
    }

    private AlcoholDto mapPartyMenuToDrinkDto(PartyMenu partyMenu) {
        AlcoholDto drinkDto = new AlcoholDto();
        Alcohol alcohol = partyMenu.getAlcohol();

        drinkDto.setAlcoholId(alcohol.getAlcoholId());
        drinkDto.setName(alcohol.getName());
        drinkDto.setVolume(partyMenu.getVolume()); // объем из PartyMenu
        drinkDto.setDegree(alcohol.getDegree()); // крепость из Alcohol

        return drinkDto;
    }

    private PartyViewDto mapToPartyViewDto(Party party) {
        PartyViewDto partyViewDto = new PartyViewDto();
        partyViewDto.setPartyId(party.getPartyId());
        partyViewDto.setDate(party.getDate());
        partyViewDto.setPlace(party.getPlace());
        partyViewDto.setNeedFeedback(party.getNeedFeedback());
        return partyViewDto;
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private void validatePartyRequest(SavePartyRequest request) {
        if (request.getPlace() == null || request.getPlace().isBlank()) {
            throw new OperationNotAllowedException("Party place is required");
        }

        if (request.getSatiety() == null) {
            throw new OperationNotAllowedException("Satiety is required");
        }
    }

    @Transactional
    public void processFeedback(FeedbackRequest request) {
        alcoholCalculatorService.sendFeedback(request);
        partyRepository.markFeedbackAsProcessed(request.getPartyId(), request.getUserId());
    }
}