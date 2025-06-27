package com.example.project.dto;

import lombok.Data;

@Data
public class AlcoholDto {
    private Long alcoholId;
    private String name;
    private Double volume;
    private Double degree;
}