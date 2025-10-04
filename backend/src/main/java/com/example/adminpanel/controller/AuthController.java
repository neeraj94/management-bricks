package com.example.adminpanel.controller;

import com.example.adminpanel.dto.AuthResponse;
import com.example.adminpanel.dto.LoginRequest;
import com.example.adminpanel.dto.SignupRequest;
import com.example.adminpanel.model.AdminUser;
import com.example.adminpanel.service.AdminDataService;
import com.example.adminpanel.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AdminDataService adminDataService;

    public AuthController(AuthService authService, AdminDataService adminDataService) {
        this.authService = authService;
        this.adminDataService = adminDataService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AdminUser> currentUser(@RequestParam String email) {
        return adminDataService.findUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
