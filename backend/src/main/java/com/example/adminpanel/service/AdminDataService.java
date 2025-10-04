package com.example.adminpanel.service;

import com.example.adminpanel.dto.ActivityItem;
import com.example.adminpanel.dto.HomeHighlight;
import com.example.adminpanel.model.AdminUser;
import com.example.adminpanel.model.Invoice;
import com.example.adminpanel.model.Role;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class AdminDataService {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MMM d, yyyy");

    private record StoredUser(AdminUser profile, String password) {}

    private final Map<String, StoredUser> usersByEmail = new ConcurrentHashMap<>();
    private final List<Role> roles = new ArrayList<>();
    private final List<Invoice> invoices = new ArrayList<>();
    private final List<ActivityItem> activities = new ArrayList<>();
    private final List<HomeHighlight> highlights = new ArrayList<>();

    @PostConstruct
    void seedData() {
        AdminUser admin = createUser("Avery Stone", "admin@managementbricks.com", "Administrator", "Active", "Apr 4, 2025", "#4f46e5", "admin123!");
        createUser("Jordan Miller", "jordan@managementbricks.com", "Finance Manager", "Active", "Apr 2, 2025", "#f97316", "finance123");
        createUser("Harper Lee", "harper@managementbricks.com", "People Operations", "Onboarding", "Mar 28, 2025", "#10b981", "people123");
        createUser("Riley Chen", "riley@managementbricks.com", "Viewer", "Inactive", "Feb 16, 2025", "#ec4899", "viewer123");

        roles.addAll(Arrays.asList(
                new Role("Administrator", "Full access to every module and system configuration.",
                        Arrays.asList("Manage billing", "Invite users", "Create roles", "View analytics"), 4),
                new Role("Finance Manager", "Owns invoices, revenue tracking, and expense approvals.",
                        Arrays.asList("Send invoices", "Approve refunds", "View revenue dashboards"), 3),
                new Role("People Operations", "Manages employee onboarding, offboarding, and access.",
                        Arrays.asList("Provision accounts", "Reset passwords", "Manage policies"), 5),
                new Role("Viewer", "Read-only visibility into dashboards and reports.",
                        Arrays.asList("View dashboards", "Export analytics"), 7)
        ));

        invoices.addAll(Arrays.asList(
                new Invoice(UUID.randomUUID(), "INV-1045", "Acme Robotics", "Paid", LocalDate.now().minusDays(18), LocalDate.now().minusDays(10), 12400),
                new Invoice(UUID.randomUUID(), "INV-1046", "Lumen Labs", "Pending", LocalDate.now().minusDays(6), LocalDate.now().plusDays(12), 8600),
                new Invoice(UUID.randomUUID(), "INV-1047", "Brightside AI", "Overdue", LocalDate.now().minusDays(32), LocalDate.now().minusDays(2), 15400),
                new Invoice(UUID.randomUUID(), "INV-1048", "Northwind Logistics", "Paid", LocalDate.now().minusDays(24), LocalDate.now().minusDays(14), 19750),
                new Invoice(UUID.randomUUID(), "INV-1049", "Summit Ventures", "Pending", LocalDate.now().minusDays(3), LocalDate.now().plusDays(20), 5400)
        ));

        activities.addAll(Arrays.asList(
                new ActivityItem("1", "Invoice INV-1049 sent", "Summit Ventures received a new invoice for quarterly services.", "6 minutes ago"),
                new ActivityItem("2", "Role updated", "Finance Manager permissions updated by Avery Stone.", "28 minutes ago"),
                new ActivityItem("3", "New teammate joined", "Harper Lee accepted the invitation to the workspace.", "Yesterday"),
                new ActivityItem("4", "Invoice paid", "Acme Robotics paid invoice INV-1045 ahead of schedule.", "2 days ago")
        ));

        highlights.addAll(Arrays.asList(
                new HomeHighlight("high-1", "Team", "132 teammates", "New hires are trending 12% above forecast. Review onboarding tasks to maintain momentum.", "Review onboarding", "👥"),
                new HomeHighlight("high-2", "Billing", "$48.2k collected", "Your receivables are within target. Two invoices are due this week—send reminders now.", "View invoices", "💳"),
                new HomeHighlight("high-3", "Engagement", "87% adoption", "Weekly active usage is climbing. Share dashboard updates with the executive team.", "Share report", "📈")
        ));
    }

    private AdminUser createUser(String name, String email, String role, String status, String lastActive, String color, String password) {
        AdminUser profile = new AdminUser(UUID.randomUUID(), name, email, role, status, color, lastActive);
        usersByEmail.put(email.toLowerCase(), new StoredUser(profile, password));
        return profile;
    }

    public AdminUser createUser(String name, String email, String role, String password) {
        String status = "Active";
        String lastActive = LocalDate.now().format(FORMATTER);
        String color = pickColor();
        return createUser(name, email, role, status, lastActive, color, password);
    }

    private String pickColor() {
        List<String> palette = Arrays.asList("#4f46e5", "#2563eb", "#f97316", "#10b981", "#ec4899");
        return palette.get(ThreadLocalRandom.current().nextInt(palette.size()));
    }

    public Optional<AdminUser> authenticate(String email, String password) {
        StoredUser record = usersByEmail.get(email.toLowerCase());
        if (record != null && record.password().equals(password)) {
            return Optional.of(record.profile());
        }
        return Optional.empty();
    }

    public Optional<AdminUser> findUserByEmail(String email) {
        return Optional.ofNullable(usersByEmail.get(email.toLowerCase())).map(StoredUser::profile);
    }

    public boolean emailExists(String email) {
        return usersByEmail.containsKey(email.toLowerCase());
    }

    public List<AdminUser> getUsers() {
        return new ArrayList<>(usersByEmail.values().stream().map(StoredUser::profile).toList());
    }

    public List<Role> getRoles() {
        return Collections.unmodifiableList(roles);
    }

    public List<Invoice> getInvoices() {
        return invoices.stream().map(invoice -> new Invoice(
                invoice.getId(),
                invoice.getNumber(),
                invoice.getCustomer(),
                invoice.getStatus(),
                invoice.getIssuedOn(),
                invoice.getDueOn(),
                invoice.getAmount()
        )).toList();
    }

    public List<ActivityItem> getActivities() {
        return Collections.unmodifiableList(activities);
    }

    public List<HomeHighlight> getHighlights() {
        return Collections.unmodifiableList(highlights);
    }
}
