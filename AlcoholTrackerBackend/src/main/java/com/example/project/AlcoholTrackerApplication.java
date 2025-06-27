package com.example.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AlcoholTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlcoholTrackerApplication.class, args);

    }
}
