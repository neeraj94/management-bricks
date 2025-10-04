# Management Bricks Admin Platform

This repository contains a demo full-stack admin workspace for Management Bricks. It provides a polished React dashboard for administrators alongside a Spring Boot API that serves mock data for authentication, user management, roles, invoices, and dashboard insights.

## Features

### Front-end (React + Vite)
- **Authentication flow** with login and sign-up screens that persist the active user session in local storage.
- **Responsive admin layout** including a sidebar, top navigation bar, and protected routes.
- **Dynamic dashboards** for home, analytics, user management, role administration, and invoice tracking.
- **Reusable UI primitives** such as status pills, metric cards, and timeline components built with modern CSS.

### Back-end (Spring Boot)
- **In-memory data store** that seeds example users, roles, invoices, activities, and highlights at start-up.
- **Authentication endpoints** for signing in and creating new workspace users (no external database required).
- **RESTful resources** for users, roles, invoices, dashboard metrics, activities, and home highlights.
- **CORS configuration** that allows the Vite dev server on port `5000` to call the API on port `8080`.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Java 17+
- Maven 3.9+

### Front-end
```bash
npm install
npm run dev
```
The development server runs on [http://localhost:5000](http://localhost:5000). The Vite configuration proxies `/api` requests to the Spring Boot server.

### Back-end
```bash
cd backend
mvn spring-boot:run
```
The API is available on [http://localhost:8080](http://localhost:8080).

### Demo Accounts
The seed data includes an administrator you can use for testing:
- **Email:** `admin@managementbricks.com`
- **Password:** `admin123!`

Feel free to sign up with your own credentials; new users are added to the in-memory store while the application is running.

## Project Structure
```
├── assets/                        # Front-end assets
├── backend/                       # Spring Boot project
│   ├── pom.xml
│   └── src/main/java/com/example/adminpanel
├── index.html                     # Vite entry point
├── package.json                   # Front-end dependencies and scripts
├── src/                           # React application source
└── vite.config.js                 # Vite configuration with API proxy
```

## Available API Routes
| Method | Route | Description |
| ------ | ----- | ----------- |
| POST | `/api/auth/login` | Authenticate a user with email and password |
| POST | `/api/auth/signup` | Create a new in-memory admin user |
| GET | `/api/auth/me` | Fetch a user profile by email |
| GET | `/api/users` | Retrieve seeded and newly created users |
| GET | `/api/roles` | View role definitions and permissions |
| GET | `/api/invoices` | List invoices with payment status |
| GET | `/api/dashboard/metrics` | Aggregate metrics for the dashboard cards |
| GET | `/api/dashboard/activities` | Timeline of recent system events |
| GET | `/api/home/highlights` | Quick actions and KPIs for the home screen |

## Notes
- The project is intentionally self-contained and does not persist data between runs.
- npm package installation may require access to the public npm registry.
- The UI uses standard CSS without additional component libraries to keep the bundle lightweight.

Enjoy exploring and extending the Management Bricks admin experience!
