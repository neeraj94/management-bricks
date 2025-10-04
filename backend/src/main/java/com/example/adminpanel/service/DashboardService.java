package com.example.adminpanel.service;

import com.example.adminpanel.dto.ActivityItem;
import com.example.adminpanel.dto.DashboardMetricsResponse;
import com.example.adminpanel.model.Invoice;
import com.example.adminpanel.model.Role;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Service
public class DashboardService {

    private final AdminDataService adminDataService;

    public DashboardService(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    public DashboardMetricsResponse getMetrics() {
        int activeUsers = (int) adminDataService.getUsers().stream().filter(user -> "Active".equalsIgnoreCase(user.getStatus())).count();
        double monthlyRevenue = adminDataService.getInvoices().stream()
                .filter(invoice -> "Paid".equalsIgnoreCase(invoice.getStatus()) || "Pending".equalsIgnoreCase(invoice.getStatus()))
                .mapToDouble(Invoice::getAmount)
                .sum();
        long openInvoices = adminDataService.getInvoices().stream()
                .filter(invoice -> !"Paid".equalsIgnoreCase(invoice.getStatus()))
                .count();
        long overdue = adminDataService.getInvoices().stream()
                .filter(invoice -> "Overdue".equalsIgnoreCase(invoice.getStatus()))
                .count();

        NumberFormat currency = NumberFormat.getCurrencyInstance(Locale.US);
        return new DashboardMetricsResponse(
                String.valueOf(activeUsers),
                currency.format(monthlyRevenue),
                String.valueOf(openInvoices),
                12,
                9,
                (int) overdue
        );
    }

    public List<ActivityItem> getActivities() {
        return adminDataService.getActivities();
    }

    public List<Role> getRoles() {
        return adminDataService.getRoles();
    }
}
