package com.example.project.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PartyViewDto {
    private Long partyId;
    private LocalDateTime date;
    private String place;
    private Boolean needFeedback;
}