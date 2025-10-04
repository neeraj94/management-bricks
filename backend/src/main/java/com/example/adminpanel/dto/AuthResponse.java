package com.example.adminpanel.dto;

import com.example.adminpanel.model.AdminUser;

public class AuthResponse {
    private String token;
    private AdminUser user;

    public AuthResponse() {
    }

    public AuthResponse(String token, AdminUser user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AdminUser getUser() {
        return user;
    }

    public void setUser(AdminUser user) {
        this.user = user;
    }
}
