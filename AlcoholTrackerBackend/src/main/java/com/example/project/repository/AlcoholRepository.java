package com.example.project.repository;

import com.example.project.entity.Alcohol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlcoholRepository extends JpaRepository<Alcohol, Long> {
    List<Alcohol> findByIsBasicTrue();
    List<Alcohol> findBySavedByUsers_UserId(Long userId);

    boolean existsByName(String name);

    Optional<Alcohol> findByName(String name);
}
