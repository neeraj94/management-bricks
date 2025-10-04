package com.example.adminpanel.service;

import com.example.adminpanel.dto.AuthResponse;
import com.example.adminpanel.dto.LoginRequest;
import com.example.adminpanel.dto.SignupRequest;
import com.example.adminpanel.model.AdminUser;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class AuthService {

    private final AdminDataService adminDataService;

    public AuthService(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    public AuthResponse login(LoginRequest request) {
        AdminUser user = adminDataService.authenticate(request.getEmail(), request.getPassword())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        return new AuthResponse(generateToken(), user);
    }

    public AuthResponse signup(SignupRequest request) {
        if (adminDataService.emailExists(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists");
        }
        AdminUser user = adminDataService.createUser(request.getFullName(), request.getEmail(), request.getRole(), request.getPassword());
        return new AuthResponse(generateToken(), user);
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}
