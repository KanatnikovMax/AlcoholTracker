package com.example.project.controller;

import com.example.project.service.PartyService;
import com.example.project.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;

    @GetMapping("/{userId}/{partyId}") // подробности застолья
    public ResponseEntity<PartyDto> getPartyById(@PathVariable Long userId, @PathVariable Long partyId) {
        return ResponseEntity.ok(partyService.getPartyByIdAndUserid(userId, partyId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<PartyViewDto>> getPartiesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(partyService.getPartiesByUserId(userId));
    }

    @PostMapping("/preview")
    public ResponseEntity<PartyPreviewResponse> getPartyPreview(@RequestBody PartyPreviewRequest request) {
        return ResponseEntity.ok(partyService.getPartyPreview(request));
    }

    @PostMapping("/{userId}/save")
    public ResponseEntity<PartyCreationResponse> saveParty(
            @PathVariable Long userId,
            @RequestBody SavePartyRequest request) {
        return ResponseEntity.ok(partyService.saveParty(userId, request));
    }

    @PostMapping("/feedback")
    public ResponseEntity<Void> receiveFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        log.info("Получен фидбэк: {}", feedbackRequest);
        partyService.processFeedback(feedbackRequest);
        return ResponseEntity.ok().build();
    }

}