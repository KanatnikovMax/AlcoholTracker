package com.example.project.dto;

import com.example.project.enums.FeedbackType;
import lombok.Data;

@Data
public class FeedbackRequest {
    private Long partyId;
    private Long userId;
    private FeedbackType feedback;
}