package com.example.project.dto;

import lombok.Data;

@Data
public class AuthResponse { // ответ с токеном
    public String accessToken;

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
