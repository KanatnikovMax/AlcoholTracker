package com.example.project.utils;

import com.example.project.dto.AlcoholEquivalent;
import lombok.Data;

import java.util.List;

@Data
public class CombinationVariant {
    private List<AlcoholEquivalent> drinks;
}