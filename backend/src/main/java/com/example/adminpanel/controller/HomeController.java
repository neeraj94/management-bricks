package com.example.adminpanel.controller;

import com.example.adminpanel.dto.HomeHighlight;
import com.example.adminpanel.service.AdminDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final AdminDataService adminDataService;

    public HomeController(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    @GetMapping("/highlights")
    public List<HomeHighlight> highlights() {
        return adminDataService.getHighlights();
    }
}
