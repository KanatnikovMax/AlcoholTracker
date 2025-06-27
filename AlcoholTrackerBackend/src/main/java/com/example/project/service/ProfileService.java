package com.example.project.service;

import com.example.project.dto.ChangePasswordRequest;
import com.example.project.dto.ProfileDto;
import com.example.project.entity.User;
import com.example.project.exception.OperationNotAllowedException;
import com.example.project.exception.ResourceNotFoundException;
import com.example.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Transactional(readOnly = true)
    @Cacheable(value = "userProfile", key = "#userId")
    public ProfileDto getProfile(Long userId) {
        User user = getUserOrThrow(userId);
        return mapToDto(user);
    }

    @CacheEvict(value = "userProfile", key = "#userId")
    public ProfileDto updateProfile(Long userId, ProfileDto profileDto) {
        User user = getUserOrThrow(userId);

        validateProfileUpdate(profileDto);

        user.setUsername(profileDto.getUsername());
        user.setAge(profileDto.getAge());
        user.setHeight(profileDto.getHeight());
        user.setGender(profileDto.getGender());
        user.setWeight(profileDto.getWeight());

        if (!user.getEmail().equals(profileDto.getEmail())) {
            if (userRepository.existsByEmail(profileDto.getEmail())) {
                throw new OperationNotAllowedException("Email " + profileDto.getEmail() + " is already taken");
            }
            user.setEmail(profileDto.getEmail());
        }

        userRepository.save(user);
        return mapToDto(user);
    }

    @CacheEvict(value = "userProfile", key = "#userId")
    public String changePassword(Long userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new OperationNotAllowedException("Old password equals new password");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return "Success";
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private ProfileDto mapToDto(User user) {
        ProfileDto profileDto = new ProfileDto();
        profileDto.setAge(user.getAge());
        profileDto.setUsername(user.getUsername());
        profileDto.setEmail(user.getEmail());
        profileDto.setWeight(user.getWeight());
        profileDto.setHeight(user.getHeight());
        profileDto.setGender(user.getGender());
        return profileDto;
    }

    private void validateProfileUpdate(ProfileDto profileDto) {
        if (profileDto.getUsername() == null) {
            throw new OperationNotAllowedException("Username is required");
        }

        if (profileDto.getEmail() == null) {
            throw new OperationNotAllowedException("Email is required");
        }

        if (profileDto.getAge() != null && (profileDto.getAge() < 18 || profileDto.getAge() > 100)) {
            throw new OperationNotAllowedException("Age must be between 18 and 100");
        }

        if (profileDto.getHeight() == null) {
            throw new OperationNotAllowedException("Height is required");
        }

        if (profileDto.getWeight() == null) {
            throw new OperationNotAllowedException("Weight is required");
        }
    }
}
