package com.example.project.dto;

import lombok.Data;

@Data
public class PartyPreviewResponse {
    private UserInfoDto userInfo;
    private AlcoholCalculationResponse calculation;

    public PartyPreviewResponse(UserInfoDto userInfoDto, AlcoholCalculationResponse calculationResponse) {
        this.userInfo = userInfoDto;
        this.calculation = calculationResponse;
    }
}