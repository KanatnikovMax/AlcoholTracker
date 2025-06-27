package com.example.project.dto;

import lombok.Data;

@Data
public class ProfileDto {
    private String email;
    private String username;
    private String gender;
    private Integer age;
    private Double height;
    private Double weight;
}
