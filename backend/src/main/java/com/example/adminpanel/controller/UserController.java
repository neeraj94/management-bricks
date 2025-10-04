package com.example.adminpanel.controller;

import com.example.adminpanel.model.AdminUser;
import com.example.adminpanel.service.AdminDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AdminDataService adminDataService;

    public UserController(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    @GetMapping
    public List<AdminUser> listUsers() {
        return adminDataService.getUsers();
    }
}
