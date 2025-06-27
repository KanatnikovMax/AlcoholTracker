package com.example.project.controller;

import com.example.project.dto.DrinkDetailDto;
import com.example.project.dto.DrinkRequest;
import com.example.project.dto.DrinksBasicDto;
import com.example.project.service.DrinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/drink")
public class DrinkController {
    private final DrinkService drinkService;

    @GetMapping("/{userId}/basic")
    public ResponseEntity<List<DrinksBasicDto>> getBasicDrinks(@PathVariable Long userId) {
        return ResponseEntity.ok(drinkService.getBasicDrinks(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<DrinksBasicDto>> getUserDrinks(@PathVariable Long userId) {
        return ResponseEntity.ok(drinkService.getUserDrinks(userId));
    }

    @GetMapping("{userId}/details/{drinkId}")
    public ResponseEntity<DrinkDetailDto> getInfoDrink(@PathVariable Long userId, @PathVariable Long drinkId) {
        return ResponseEntity.ok(drinkService.getInfoDrink(userId, drinkId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<DrinkDetailDto> createDrink(@PathVariable Long userId, @RequestBody DrinkRequest drinkRequest) {
        return ResponseEntity.ok(drinkService.createDrink(userId, drinkRequest));
    }

    @DeleteMapping("/{drinkId}")
    public ResponseEntity<Void> deleteDrink(@PathVariable Long drinkId) {
        drinkService.deleteAlcohol(drinkId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/edit/{drinkId}")
    public ResponseEntity<DrinkDetailDto> updateDrink(@PathVariable Long userId, @PathVariable Long drinkId,
                                                      @RequestBody DrinkRequest request) {
        return ResponseEntity.ok(drinkService.updateDrink(userId, drinkId, request));
    }

    @PutMapping("/{userId}/edit/favorite/{drinkId}")
    public ResponseEntity<Void> toggleFavorite(@PathVariable Long userId, @PathVariable Long drinkId) {
        drinkService.toggleFavoriteForUser(userId, drinkId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/add/{drinkId}")
    public ResponseEntity<Void> addDrinkToUser(@PathVariable Long userId, @PathVariable Long drinkId) {
        drinkService.addDrinkToUser(userId, drinkId);
        return ResponseEntity.ok().build();
    }
}
