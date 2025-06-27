package com.example.project.dto;

import com.example.project.enums.Satiety;
import lombok.Data;

@Data
public class AlcoholCalculationRequest {
    private Long userId;

    private Double weight;          // Вес в кг

    private Integer age;                // Возраст

    private String gender;
    private Double height;          // Рост в см

    private Satiety satiety;

    private double desiredPromille;
}
