package com.example.adminpanel.controller;

import com.example.adminpanel.model.Invoice;
import com.example.adminpanel.service.AdminDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final AdminDataService adminDataService;

    public InvoiceController(AdminDataService adminDataService) {
        this.adminDataService = adminDataService;
    }

    @GetMapping
    public List<Invoice> listInvoices() {
        return adminDataService.getInvoices();
    }
}
