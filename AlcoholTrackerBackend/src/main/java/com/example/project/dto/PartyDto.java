package com.example.project.dto;

import com.example.project.enums.Satiety;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PartyDto {
    private Long partyId;
    private LocalDateTime date;
    private String place;
    private Satiety satiety;
    private Double desiredPromille;
    private Boolean needFeedback;
    private List<AlcoholDto> drinks;
}