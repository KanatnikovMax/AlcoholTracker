package com.example.project.entity;

import com.example.project.enums.DrinkStregth;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "alcohol")
public class Alcohol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alcohol_id")
    private Long alcoholId;

    private String name;

    @Enumerated(EnumType.STRING)
    private DrinkStregth type;

    private Double degree;
    private String info;

    @Column(name = "is_basic")
    private Boolean isBasic;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "savedDrinks")
    private Set<User> savedByUsers = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "favoriteDrinks")
    private Set<User> likedByUsers = new HashSet<>();

}
