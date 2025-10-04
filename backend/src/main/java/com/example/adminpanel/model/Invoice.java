package com.example.adminpanel.model;

import java.time.LocalDate;
import java.util.UUID;

public class Invoice {
    private UUID id;
    private String number;
    private String customer;
    private String status;
    private LocalDate issuedOn;
    private LocalDate dueOn;
    private double amount;

    public Invoice() {
    }

    public Invoice(UUID id, String number, String customer, String status, LocalDate issuedOn, LocalDate dueOn, double amount) {
        this.id = id;
        this.number = number;
        this.customer = customer;
        this.status = status;
        this.issuedOn = issuedOn;
        this.dueOn = dueOn;
        this.amount = amount;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getIssuedOn() {
        return issuedOn;
    }

    public void setIssuedOn(LocalDate issuedOn) {
        this.issuedOn = issuedOn;
    }

    public LocalDate getDueOn() {
        return dueOn;
    }

    public void setDueOn(LocalDate dueOn) {
        this.dueOn = dueOn;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
