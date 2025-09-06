# ManagementBricks Website

## Overview

ManagementBricks is a modern business website for a student development and career readiness company. The website showcases three core services: Psychometric Assessment, Mock Interview Preparation, and Aptitude Testing. Built with a premium dark aesthetic, it features a responsive design, contact form functionality, and SEO optimization. The site serves as both a marketing platform and potential entry point for future service delivery systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Multi-Page Website**: Traditional HTML/CSS/JavaScript structure with separate pages for each service
- **Responsive Design System**: Mobile-first approach with breakpoints at 480px, 768px, 1024px, and 1280px
- **Design Token System**: Centralized color palette using CSS custom properties for consistent theming
- **Component-Based Styling**: Modular CSS with separate stylesheets for general styles and service-specific styles
- **Build System**: Vite configuration for modern development workflow with multi-page support

### UI/UX Patterns
- **Dark Premium Theme**: Sophisticated color scheme with charcoal backgrounds (#0F1115) and gold accents (#D6B36A)
- **Sticky Navigation**: Translucent header with blur effects and dropdown menus
- **Hero Slider**: Auto-playing image carousel with manual controls
- **Card-Based Layout**: Consistent card components for services and content sections
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features

### Content Management
- **Static Content**: All content managed through HTML files for maximum performance
- **SEO Optimization**: Comprehensive meta tags, Open Graph properties, sitemap.xml, and robots.txt
- **Semantic HTML**: Accessibility-focused markup with proper heading hierarchy and ARIA patterns

### Development Workflow
- **Vite Build System**: Modern bundling with hot module replacement for development
- **Multi-Entry Configuration**: Separate build entries for homepage, about page, and service pages
- **Asset Optimization**: Automatic minification and optimization for production builds

## External Dependencies

### Fonts and Typography
- **Google Fonts**: Inter font family (weights 300-800) for consistent typography across all devices
- **Font Loading Strategy**: Preconnect optimization for improved loading performance

### Build Tools
- **Vite**: Modern build tool and development server
- **Node.js**: JavaScript runtime for build processes

### SEO and Analytics
- **Search Engine Optimization**: Structured data markup and semantic HTML for better search visibility
- **Social Media Integration**: Open Graph meta tags for social sharing optimization

### Future Integration Points
- **Contact Form Backend**: PHP-based contact form with SMTP configuration (referenced but not implemented in current codebase)
- **Authentication System**: Login navigation prepared for future user authentication
- **Service Delivery Platform**: Architecture prepared for integration with assessment and testing platforms