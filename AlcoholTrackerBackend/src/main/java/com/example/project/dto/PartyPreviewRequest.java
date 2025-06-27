package com.example.project.dto;

import com.example.project.enums.Satiety;
import lombok.Data;

@Data
public class PartyPreviewRequest {
    Long userId;
    Satiety satiety;
    Double desiredPromille;
}