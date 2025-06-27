package com.example.project.controller;

import com.example.project.dto.ChangePasswordRequest;
import com.example.project.dto.ProfileDto;
import com.example.project.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable Long userId) {
        System.out.println(userId);
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    @PutMapping("/{userId}/profile/edit")
    public ResponseEntity<ProfileDto> updateProfile(@PathVariable Long userId, @RequestBody ProfileDto profileDto) {
        return ResponseEntity.ok(profileService.updateProfile(userId, profileDto));
    }

    @PostMapping("/{userId}/profile/editPassword")
    public ResponseEntity<String> changePassword(@PathVariable Long userId, @RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(profileService.changePassword(userId, request));
    }
}
