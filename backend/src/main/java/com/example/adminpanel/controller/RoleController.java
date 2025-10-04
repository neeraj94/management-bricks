package com.example.adminpanel.controller;

import com.example.adminpanel.model.Role;
import com.example.adminpanel.service.AdminDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final AdminDataService adminDataService;

    public RoleController(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    @GetMapping
    public List<Role> listRoles() {
        return adminDataService.getRoles();
    }
}
