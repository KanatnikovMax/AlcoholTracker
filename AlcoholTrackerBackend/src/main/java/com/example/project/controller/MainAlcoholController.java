package com.example.project.controller;

import com.example.project.dto.AlcoholCalculationRequest;
import com.example.project.dto.AlcoholCalculationResponse;
import com.example.project.service.AlcoholCalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alcohol")
@RequiredArgsConstructor
public class MainAlcoholController {
    private final AlcoholCalculatorService alcoholCalculatorService;

    // Сохраняем POST-метод для комплексных расчётов
    @PostMapping("/calculate")
    public ResponseEntity<AlcoholCalculationResponse> calculate(
            @RequestBody AlcoholCalculationRequest request) {
        return ResponseEntity.ok(alcoholCalculatorService.calculate(request));
    }

    // Добавляем GET-метод для быстрых расчётов
    @GetMapping("/calculate")
    public ResponseEntity<AlcoholCalculationResponse> calculateGet(@RequestBody AlcoholCalculationRequest request) {
        return ResponseEntity.ok(alcoholCalculatorService.calculate(request));
    }
}