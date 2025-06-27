package com.example.project.service;

import com.example.project.dto.DrinkDetailDto;
import com.example.project.dto.DrinkRequest;
import com.example.project.dto.DrinksBasicDto;
import com.example.project.entity.Alcohol;
import com.example.project.entity.User;
import com.example.project.enums.DrinkStregth;
import com.example.project.exception.OperationNotAllowedException;
import com.example.project.exception.ResourceAlreadyExistsException;
import com.example.project.exception.ResourceNotFoundException;
import com.example.project.repository.AlcoholRepository;
import com.example.project.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DrinkServiceTest {

    @Mock
    private AlcoholRepository drinkRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CacheManager cacheManager;

    @InjectMocks
    private DrinkService drinkService;

    private User testUser;
    private Alcohol testDrink;
    private DrinkRequest drinkRequest;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUserId(1L);
        testUser.setSavedDrinks(new HashSet<>());
        testUser.setFavoriteDrinks(new HashSet<>());

        testDrink = new Alcohol();
        testDrink.setAlcoholId(1L);
        testDrink.setName("Test Drink");
        testDrink.setType(DrinkStregth.MEDIUM_ALCOHOL);
        testDrink.setDegree(15.0);
        testDrink.setInfo("Test info");
        testDrink.setIsBasic(false);

        drinkRequest = new DrinkRequest();
        drinkRequest.setName("New Drink");
        drinkRequest.setType(DrinkStregth.LOW_ALCOHOL);
        drinkRequest.setDegree(5.5);
        drinkRequest.setInfo("New drink info");
    }

    @Test
    void getBasicDrinks_ReturnsList() {
        List<Alcohol> drinks = Collections.singletonList(testDrink);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findByIsBasicTrue()).thenReturn(drinks);

        List<DrinksBasicDto> result = drinkService.getBasicDrinks(1L);

        assertEquals(1, result.size());
        DrinksBasicDto dto = result.get(0);
        assertEquals(testDrink.getAlcoholId(), dto.getDrinkId());
        assertEquals(testDrink.getName(), dto.getDrinkName());
        verify(drinkRepository).findByIsBasicTrue();
    }

    @Test
    void getUserDrinks_ReturnsList() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findBySavedByUsers_UserId(1L)).thenReturn(Collections.singletonList(testDrink));

        List<DrinksBasicDto> result = drinkService.getUserDrinks(1L);

        assertEquals(1, result.size());
        verify(drinkRepository).findBySavedByUsers_UserId(1L);
    }

    @Test
    void getInfoDrink_ReturnsDetails() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));

        DrinkDetailDto result = drinkService.getInfoDrink(1L, 1L);

        assertEquals(testDrink.getAlcoholId(), result.getDrinkId());
        assertEquals(testDrink.getName(), result.getName());
        assertFalse(result.getIsFavorite());
    }

    @Test
    void createDrink_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.existsByName("New Drink")).thenReturn(false);
        when(drinkRepository.save(any(Alcohol.class))).thenAnswer(inv -> {
            Alcohol saved = inv.getArgument(0);
            saved.setAlcoholId(2L);
            return saved;
        });

        DrinkDetailDto result = drinkService.createDrink(1L, drinkRequest);

        assertEquals(2L, result.getDrinkId());
        assertEquals("New Drink", result.getName());
        assertTrue(testUser.getSavedDrinks().size() > 0);
        verify(drinkRepository, times(2)).save(any(Alcohol.class));
    }

    @Test
    void createDrink_ThrowsWhenExists() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.existsByName("New Drink")).thenReturn(true);

        assertThrows(ResourceAlreadyExistsException.class,
                () -> drinkService.createDrink(1L, drinkRequest));
    }

    @Test
    void updateDrink_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));
        when(drinkRepository.save(any(Alcohol.class))).thenReturn(testDrink);

        DrinkDetailDto result = drinkService.updateDrink(1L, 1L, drinkRequest);

        assertEquals("New Drink", result.getName());
        verify(drinkRepository).save(testDrink);
    }

    @Test
    void addDrinkToUser_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));

        drinkService.addDrinkToUser(1L, 1L);

        assertTrue(testUser.getSavedDrinks().contains(testDrink));
        verify(userRepository).save(testUser);
    }

    @Test
    void deleteAlcohol_Success() {
        testDrink.setIsBasic(false);
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));

        drinkService.deleteAlcohol(1L);

        verify(drinkRepository).delete(testDrink);
    }

    @Test
    void deleteAlcohol_ThrowsWhenBasic() {
        testDrink.setIsBasic(true);
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));

        assertThrows(OperationNotAllowedException.class,
                () -> drinkService.deleteAlcohol(1L));
    }

    @Test
    void toggleFavoriteForUser_TogglesStatus() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));

        drinkService.toggleFavoriteForUser(1L, 1L);
        assertTrue(testUser.getFavoriteDrinks().contains(testDrink));

        drinkService.toggleFavoriteForUser(1L, 1L);
        assertFalse(testUser.getFavoriteDrinks().contains(testDrink));

        verify(userRepository, times(2)).save(testUser);
    }

    @Test
    void getBasicDrinks_UserNotFound_ThrowsException() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> drinkService.getBasicDrinks(1L));
    }

    @Test
    void validateDrinkRequest_InvalidDegree_ThrowsException() {
        DrinkRequest invalidRequest = new DrinkRequest();
        invalidRequest.setName("Invalid");
        invalidRequest.setType(DrinkStregth.LOW_ALCOHOL);
        invalidRequest.setDegree(150.0); // Invalid degree

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        assertThrows(OperationNotAllowedException.class,
                () -> drinkService.createDrink(1L, invalidRequest));
    }

    @Test
    void addDrinkToUser_AlreadyAdded_ThrowsException() {
        testUser.getSavedDrinks().add(testDrink);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(drinkRepository.findById(1L)).thenReturn(Optional.of(testDrink));

        assertThrows(ResourceAlreadyExistsException.class,
                () -> drinkService.addDrinkToUser(1L, 1L));
    }
}