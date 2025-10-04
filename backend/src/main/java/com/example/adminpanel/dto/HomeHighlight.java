package com.example.adminpanel.dto;

public class HomeHighlight {
    private String id;
    private String category;
    private String value;
    private String description;
    private String cta;
    private String icon;

    public HomeHighlight() {
    }

    public HomeHighlight(String id, String category, String value, String description, String cta, String icon) {
        this.id = id;
        this.category = category;
        this.value = value;
        this.description = description;
        this.cta = cta;
        this.icon = icon;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCta() {
        return cta;
    }

    public void setCta(String cta) {
        this.cta = cta;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
