package com.example.project.dto;

import lombok.Data;

@Data
public class AuthRequest { // запрос на аутентификацию
    private String email;
    private String password;
}
