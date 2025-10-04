package com.example.adminpanel.controller;

import com.example.adminpanel.dto.ActivityItem;
import com.example.adminpanel.dto.DashboardMetricsResponse;
import com.example.adminpanel.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/metrics")
    public DashboardMetricsResponse metrics() {
        return dashboardService.getMetrics();
    }

    @GetMapping("/activities")
    public List<ActivityItem> activities() {
        return dashboardService.getActivities();
    }
}
