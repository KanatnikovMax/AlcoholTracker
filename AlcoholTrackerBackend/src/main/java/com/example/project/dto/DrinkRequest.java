package com.example.project.dto;

import com.example.project.enums.DrinkStregth;
import lombok.Data;

@Data
public class DrinkRequest {
    private String name;
    private DrinkStregth type;
    private Double degree;
    private String info;
}
