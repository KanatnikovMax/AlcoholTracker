package com.example.project.service;

import com.example.project.dto.AuthRequest;
import com.example.project.dto.AuthResponse;
import com.example.project.dto.UserDto;
import com.example.project.entity.User;
import com.example.project.exception.CustomAuthenticationException;
import com.example.project.exception.ResourceAlreadyExistsException;
import com.example.project.exception.ResourceNotFoundException;
import com.example.project.repository.UserRepository;
import com.example.project.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    @CacheEvict(value = "userDetails", key = "#userDto.email")
    public AuthResponse register(UserDto userDto) {

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new ResourceAlreadyExistsException("User with email " + userDto.getEmail() + " already exists");
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userService.createUser(user);

        UserDetails userDetails = new UserDetailsImpl(user);
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        try {
            if (!userRepository.existsByEmail(request.getEmail())) {
                throw new ResourceNotFoundException("User with email " + request.getEmail() + " not found");
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails);

            return new AuthResponse(token);
        } catch (BadCredentialsException exception) {
            throw new CustomAuthenticationException("Invalid password");
        } catch (AuthenticationException exception) {
            throw new CustomAuthenticationException("Authentication failed: " + exception.getMessage());
        }
     }


}
