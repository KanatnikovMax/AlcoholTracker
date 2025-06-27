package com.example.project.dto;

import com.example.project.enums.Satiety;
import lombok.Data;

import java.util.List;

@Data
public class SavePartyRequest {
    private String place;
    private Satiety satiety;
    private Double desiredPromille;
    private AlcoholCalculationResponse calculationResponse;
    private List<AlcoholDto> selectedDrinks;
}