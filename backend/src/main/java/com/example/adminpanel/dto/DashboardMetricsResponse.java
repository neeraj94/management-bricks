package com.example.adminpanel.dto;

public class DashboardMetricsResponse {
    private String activeUsers;
    private String monthlyRevenue;
    private String openInvoices;
    private Integer usersGrowth;
    private Integer revenueGrowth;
    private Integer overdueDelta;

    public DashboardMetricsResponse() {
    }

    public DashboardMetricsResponse(String activeUsers, String monthlyRevenue, String openInvoices,
                                     Integer usersGrowth, Integer revenueGrowth, Integer overdueDelta) {
        this.activeUsers = activeUsers;
        this.monthlyRevenue = monthlyRevenue;
        this.openInvoices = openInvoices;
        this.usersGrowth = usersGrowth;
        this.revenueGrowth = revenueGrowth;
        this.overdueDelta = overdueDelta;
    }

    public String getActiveUsers() {
        return activeUsers;
    }

    public void setActiveUsers(String activeUsers) {
        this.activeUsers = activeUsers;
    }

    public String getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(String monthlyRevenue) {
        this.monthlyRevenue = monthlyRevenue;
    }

    public String getOpenInvoices() {
        return openInvoices;
    }

    public void setOpenInvoices(String openInvoices) {
        this.openInvoices = openInvoices;
    }

    public Integer getUsersGrowth() {
        return usersGrowth;
    }

    public void setUsersGrowth(Integer usersGrowth) {
        this.usersGrowth = usersGrowth;
    }

    public Integer getRevenueGrowth() {
        return revenueGrowth;
    }

    public void setRevenueGrowth(Integer revenueGrowth) {
        this.revenueGrowth = revenueGrowth;
    }

    public Integer getOverdueDelta() {
        return overdueDelta;
    }

    public void setOverdueDelta(Integer overdueDelta) {
        this.overdueDelta = overdueDelta;
    }
}
