package com.example.project.entity;

import com.example.project.enums.Satiety;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name ="parties")
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "party_id")
    private Long partyId;

    private LocalDateTime date;
    private String place;

    @Enumerated(EnumType.STRING)
    private Satiety satiety;

    @Column(name = "desired_promille")
    private Double desiredPromille;

    @Column(name = "need_feedback", nullable = false)
    private Boolean needFeedback; // значение по умолчанию

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "party", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PartyMenu> menuItems = new ArrayList<>();
}
