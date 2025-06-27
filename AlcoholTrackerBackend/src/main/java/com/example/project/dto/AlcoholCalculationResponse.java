package com.example.project.dto;

import com.example.project.utils.CombinationVariant;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class AlcoholCalculationResponse {
    private Double pureAlcoholGrams;
    private List<CombinationVariant> variants;
}