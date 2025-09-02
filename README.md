# ManagementBricks Website

A modern, responsive website for ManagementBricks - empowering leaders of tomorrow through comprehensive student development and career readiness solutions.

## Overview

ManagementBricks specializes in transformative student development experiences through:
- Psychometric Assessment
- Mock Interview Preparation  
- Aptitude Testing

This website showcases our services with a premium dark aesthetic and includes a fully functional contact form system.

## Features

### Design & User Experience
- **Dark Premium Theme**: Sophisticated charcoal/black background with soft gray cards
- **Responsive Design**: Mobile-first approach with breakpoints at 480/768/1024/1280px
- **Modern Typography**: Inter font family with proper weight hierarchy
- **Smooth Animations**: Fade-in effects, hover states, and micro-interactions
- **Accessibility**: AA+ color contrast, keyboard navigation, semantic HTML

### Technical Features
- **Hero Slider**: Auto-playing image carousel with manual controls
- **Sticky Navigation**: Blur effect with dropdown menus
- **Contact Form**: Dual email system (admin + autoresponder) with SMTP support
- **SEO Optimized**: Meta tags, Open Graph, sitemap.xml, robots.txt
- **Performance**: Optimized images, minified assets, lazy loading ready

## File Structure

```
/
├── index.html                          # Homepage
├── about.html                          # About page
├── contact.php                         # Contact form handler
├── config.php                         # SMTP configuration
├── robots.txt                         # Search engine directives
├── sitemap.xml                        # Site structure for SEO
├── README.md                          # This file
├── assets/
│   ├── css/
│   │   ├── style.css                  # Main stylesheet
│   │   └── service-pages.css          # Service page specific styles
│   └── js/
│       └── main.js                    # JavaScript functionality
└── services/
    ├── psychometric-assessment.html   # Psychometric service page
    ├── mock-interview.html           # Mock interview service page
    └── aptitude-testing.html         # Aptitude testing service page
```

## Setup Instructions

### 1. Server Requirements
- **Web Server**: Apache/Nginx
- **PHP**: Version 7.4 or higher
- **Extensions**: php-curl, php-openssl (for SMTP)

### 2. SMTP Configuration
1. Open `config.php`
2. Update SMTP settings with your email provider details:

```php
// Example for Gmail
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-app-password');
```

3. Update email addresses to match your domain:

```php
define('ADMIN_EMAIL', 'info@managementbricks.com');
define('FROM_EMAIL', 'no-reply@managementbricks.com');
```

### 3. PHPMailer Installation (Recommended)
For enhanced email functionality, install PHPMailer:

```bash
composer require phpmailer/phpmailer
```

### 4. File Permissions
Ensure PHP can write to temporary directories for rate limiting:
```bash
chmod 755 /tmp
```

### 5. cPanel Deployment
1. Upload all files to `public_html` directory
2. Update `config.php` with your hosting provider's SMTP settings
3. Test the contact form thoroughly
4. Enable error logging in production

## Configuration Options

### Email Templates
The contact form sends two emails:
- **Admin Email**: Detailed submission with user info and metadata
- **User Email**: Professional autoresponder with company branding

### Security Features
- **Rate Limiting**: One submission per minute per IP
- **Honeypot**: Hidden field to catch spam bots
- **Time-based Protection**: Form must be displayed for 3+ seconds
- **Input Sanitization**: All form data is sanitized and validated
- **Spam Detection**: Pattern-based spam filtering

### Customization
- **Colors**: Update CSS variables in `assets/css/style.css`
- **Images**: Replace placeholder URLs with your own images
- **Content**: Modify service descriptions in respective HTML files
- **Contact Info**: Update company details in footer and contact sections

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Targets

- **Lighthouse Performance**: ≥ 85
- **Accessibility**: ≥ 90  
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

## Development

### Local Development
1. Use a local server (XAMPP, WAMP, or similar)
2. Place files in web directory
3. Configure PHP mail settings for testing
4. Test contact form functionality

### Testing Checklist
- [ ] All navigation links work correctly
- [ ] Hero slider functions properly
- [ ] Contact form submits and sends emails
- [ ] Responsive design works on all breakpoints
- [ ] All images load correctly
- [ ] Service pages display complete content
- [ ] Footer links are functional

## Troubleshooting

### Contact Form Issues
1. **Emails not sending**: Check SMTP credentials in `config.php`
2. **Server errors**: Enable PHP error logging and check logs
3. **Timeout issues**: Increase PHP `max_execution_time`
4. **Rate limiting**: Clear `/tmp/contact_rate_limit_*` files

### Common SMTP Settings

**Gmail**:
```php
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_SECURE: tls
// Use App Password, not regular password
```

**Outlook/Hotmail**:
```php
SMTP_HOST: smtp-mail.outlook.com
SMTP_PORT: 587
SMTP_SECURE: tls
```

**Hosting Provider**: Use your hosting provider's SMTP settings (recommended for production)

## Security Notes

- Keep `config.php` secure and out of web-accessible directories in production
- Use environment variables for sensitive data when possible
- Regularly update PHP and server software
- Monitor contact form for spam/abuse
- Consider implementing CAPTCHA for high-traffic sites

## Support

For technical support or customization requests, contact the development team or refer to the inline code documentation.

---

**ManagementBricks** - Empowering Leaders of Tomorrow  
© 2025 ManagementBricks Pvt. Ltd. All rights reserved.