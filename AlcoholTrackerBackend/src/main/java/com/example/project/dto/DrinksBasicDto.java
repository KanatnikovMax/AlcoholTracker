package com.example.project.dto;

import com.example.project.enums.DrinkStregth;
import lombok.Data;

@Data
public class DrinksBasicDto {
    private Long drinkId;
    private String drinkName;
    private DrinkStregth type;
    private Double degree;
    private Boolean isFavorite;
}
