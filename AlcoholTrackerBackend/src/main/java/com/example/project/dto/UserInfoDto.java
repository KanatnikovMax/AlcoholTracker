package com.example.project.dto;

import lombok.Data;

@Data
public class UserInfoDto {
    private Long userId;
    private String gender;
    private Integer age;
    private Double height;
    private Double weight;
}