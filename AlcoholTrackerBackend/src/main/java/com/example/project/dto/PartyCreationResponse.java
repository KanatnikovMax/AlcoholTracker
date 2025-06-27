package com.example.project.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PartyCreationResponse {
    private PartyDto partyDto;
    private UserInfoDto user;
    private AlcoholCalculationResponse calculation;

    public PartyCreationResponse(PartyDto partyDto, UserInfoDto userInfoDto, AlcoholCalculationResponse calculationResponse) {
        this.partyDto = partyDto;
        this.user = userInfoDto;
        this.calculation = calculationResponse;
    }
}
