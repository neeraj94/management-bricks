package com.example.adminpanel.model;

import java.util.List;

public class Role {
    private String name;
    private String description;
    private List<String> permissions;
    private int members;

    public Role() {
    }

    public Role(String name, String description, List<String> permissions, int members) {
        this.name = name;
        this.description = description;
        this.permissions = permissions;
        this.members = members;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }

    public int getMembers() {
        return members;
    }

    public void setMembers(int members) {
        this.members = members;
    }
}
