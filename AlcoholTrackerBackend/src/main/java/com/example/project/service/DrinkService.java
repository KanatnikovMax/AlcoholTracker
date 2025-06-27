package com.example.project.service;

import com.example.project.dto.DrinkDetailDto;
import com.example.project.dto.DrinkRequest;
import com.example.project.dto.DrinksBasicDto;
import com.example.project.entity.Alcohol;
import com.example.project.entity.User;
import com.example.project.exception.OperationNotAllowedException;
import com.example.project.exception.ResourceAlreadyExistsException;
import com.example.project.exception.ResourceNotFoundException;
import com.example.project.repository.AlcoholRepository;
import com.example.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DrinkService {
    private final AlcoholRepository drinkRepository;
    private final UserRepository userRepository;
    @Autowired
    CacheManager cacheManager;

    @Transactional(readOnly = true)
    @Cacheable(value = "basicDrinks", key = "#userId")
    public List<DrinksBasicDto> getBasicDrinks(Long userId) {
        User user = getUserOrThrow(userId);
        Set<Alcohol> favorites = user.getFavoriteDrinks();

        return drinkRepository.findByIsBasicTrue().stream()
                .map(drink -> mapToBasicDto(drink, favorites))
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    @Caching(evict = {
            @CacheEvict(value = "userDrinks", key = "#userId")
    })
    public List<DrinksBasicDto> getUserDrinks(Long userId) {
        User user = getUserOrThrow(userId);

        Set<Alcohol> saved = user.getFavoriteDrinks();

        return drinkRepository.findBySavedByUsers_UserId(userId).stream()
                .map(drink -> mapToBasicDto(drink, saved))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "drinkDetails", key = "{#drinkId, #userId}")
    public DrinkDetailDto getInfoDrink(Long userId, Long drinkId) {
        User user = getUserOrThrow(userId);
        Alcohol alcohol = getDrinkOrThrow(drinkId);
        return mapToDetailDto(alcohol, user.getFavoriteDrinks());
    }

    @Caching(evict = {
            @CacheEvict(value = "userDrinks", key = "#userId")//так как у нас меняется список напитков пользователя
    })
    @Transactional
    public DrinkDetailDto createDrink(Long userId, DrinkRequest request) {
        User user = getUserOrThrow(userId);

        validateDrinkRequest(request);

        if (drinkRepository.existsByName(request.getName())) {
            throw new ResourceAlreadyExistsException("Drink with name " + request.getName() + " already exists");
        }

        Alcohol alcohol = new Alcohol();
        alcohol.setName(request.getName());
        alcohol.setType(request.getType());
        alcohol.setInfo(request.getInfo());
        alcohol.setDegree(request.getDegree());
        alcohol.setIsBasic(false);

        alcohol = drinkRepository.save(alcohol);

        user.getSavedDrinks().add(alcohol);   // Добавляем напиток в коллекцию пользователя

        drinkRepository.save(alcohol);

        return mapToDetailDto(alcohol, user.getFavoriteDrinks());
    }

    @Caching(evict = {
            @CacheEvict(value = "drinkDetails", key = "#drinkId"),
            @CacheEvict(value = "userDrinks", allEntries = true),
            @CacheEvict(value = "basicDrinks", allEntries = true),
    })
    public DrinkDetailDto updateDrink(Long userId, Long drinkId, DrinkRequest request) {
        User user = getUserOrThrow(userId);
        Alcohol alcohol = getDrinkOrThrow(drinkId);

        validateDrinkRequest(request);

        alcohol.setName(request.getName());
        alcohol.setType(request.getType());
        alcohol.setInfo(request.getInfo());
        alcohol.setDegree(request.getDegree());

        drinkRepository.save(alcohol);

        return mapToDetailDto(alcohol, user.getFavoriteDrinks());
    }

    private DrinkDetailDto mapToDetailDto(Alcohol alcohol, Set<Alcohol> userFavorites) {
        DrinkDetailDto dto = new DrinkDetailDto();
        dto.setDrinkId(alcohol.getAlcoholId());
        dto.setName(alcohol.getName());
        dto.setType(alcohol.getType());
        dto.setDegree(alcohol.getDegree());
        dto.setInfo(alcohol.getInfo());
        dto.setIsFavorite(userFavorites.contains(alcohol));
        return dto;
    }
    private DrinksBasicDto mapToBasicDto(Alcohol alcohol, Set<Alcohol> userFavorites) {
        DrinksBasicDto dto = new DrinksBasicDto();
        dto.setDrinkId(alcohol.getAlcoholId());
        dto.setDrinkName(alcohol.getName());
        dto.setDegree(alcohol.getDegree());
        dto.setType(alcohol.getType());
        dto.setIsFavorite(userFavorites.contains(alcohol));
        return dto;
    }

    @Transactional
    @CacheEvict(value = "userDrinks", key = "#userId")
    public void addDrinkToUser(Long userId, Long drinkId) {
        User user = getUserOrThrow(userId);
        Alcohol alcohol = getDrinkOrThrow(drinkId);

        if (user.getSavedDrinks().contains(alcohol)) {
            throw new ResourceAlreadyExistsException("Drink already added to you collection");
        }
        // Обновляем обе стороны связи
        user.getSavedDrinks().add(alcohol);
        alcohol.getSavedByUsers().add(user);
    }

    @Transactional
    @Caching (
            evict = {
                    @CacheEvict(value = "drinkDetails", allEntries = true),
                    @CacheEvict(value = "userDrinks", allEntries = true)
            }
    )
    public void deleteAlcohol(Long alcoholId) {
        Alcohol alcohol = getDrinkOrThrow(alcoholId);

        if (alcohol.getIsBasic()) {
            throw new OperationNotAllowedException("Cannot delete basic drink");
        }

        Set<User> users = alcohol.getSavedByUsers();
        if (users != null && !users.isEmpty()) {
            Hibernate.initialize(users);

            users.forEach(user -> {
                Hibernate.initialize(user.getSavedDrinks());
                user.getSavedDrinks().remove(alcohol);
            });
            alcohol.getSavedByUsers().clear();
        }

        drinkRepository.delete(alcohol);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "drinkDetails", allEntries = true),
            @CacheEvict(value = "userDrinks", key = "#userId"),
            @CacheEvict(value = "basicDrinks", key = "#userId")
    })
    public void toggleFavoriteForUser(Long userId, Long drinkId) {
        User user = getUserOrThrow(userId);
        Alcohol drink = getDrinkOrThrow(drinkId);

        Set<Alcohol> favorites = user.getFavoriteDrinks();

        if (favorites.contains(drink)) {
            favorites.remove(drink);
        } else {
            favorites.add(drink);
        }

        userRepository.save(user);
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Alcohol getDrinkOrThrow(Long drinkId) {
        return drinkRepository.findById(drinkId)
                .orElseThrow(() -> new ResourceNotFoundException("Drink not found"));
    }

    private void validateDrinkRequest(DrinkRequest request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new OperationNotAllowedException("Name is required");
        }
        if (request.getType() == null) {
            throw new OperationNotAllowedException("Type is required");
        }
        if (request.getDegree() < 0 || request.getDegree() > 100) {
            throw new OperationNotAllowedException("Alcohol degree must be between 0 and 100");
        }
    }
}
