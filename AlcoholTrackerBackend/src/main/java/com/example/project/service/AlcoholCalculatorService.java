package com.example.project.service;

import com.example.project.dto.AlcoholCalculationRequest;
import com.example.project.dto.AlcoholCalculationResponse;
import com.example.project.dto.FeedbackRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlcoholCalculatorService {
    private final RestTemplate restTemplate;

    @Value("${alcohol.service.url}")
    private String alcoholServiceUrl;

    @Cacheable(value = "alcoholCalculation", key = "{#request.weight, #request.gender}")
    public AlcoholCalculationResponse calculate(AlcoholCalculationRequest request) {
        String url = alcoholServiceUrl + "/api/alcohol/calculate";
        return restTemplate.postForObject(url, request, AlcoholCalculationResponse.class);
    }

    public void sendFeedback(FeedbackRequest request) {
        log.info("Отправка фидбэка в сервис алкоголя: {}", request);
        String url = alcoholServiceUrl + "/api/user/update-const";
        restTemplate.postForLocation(url, request);
    }
}
