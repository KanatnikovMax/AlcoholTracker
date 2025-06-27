package com.example.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    private String email;
    @JsonIgnore
    private String password;
    private String gender;
    private Integer age;
    private Double height;
    private Double weight;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "saved_drinks",
            joinColumns = @JoinColumn(name = "user_id"), // здесь у нас столбец владеющей стороны
            inverseJoinColumns = @JoinColumn(name = "alcohol_id") // а здесь у нас столбец обратной стороны
    )
    @JsonIgnore
    private Set<Alcohol> savedDrinks = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_favorite_drinks",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "alcohol_id")
    )
    @JsonIgnore // Циклические зависимости (User -> Alcohol -> User) Ну тут я уже думал закончить программировать
    private Set<Alcohol> favoriteDrinks = new HashSet<>();
}
