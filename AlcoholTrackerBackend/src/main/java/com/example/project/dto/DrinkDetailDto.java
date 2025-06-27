package com.example.project.dto;

import com.example.project.enums.DrinkStregth;
import lombok.Data;

@Data
public class DrinkDetailDto {
    private Long drinkId;
    private String name;
    private DrinkStregth type;
    private Double degree;
    private String info;
    private Boolean isFavorite;
}
