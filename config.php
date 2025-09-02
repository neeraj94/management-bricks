<?php
// config.php - SMTP and Email Configuration for ManagementBricks Contact Form

// SMTP Configuration
define('SMTP_HOST', 'smtp.example.com'); // Replace with your SMTP host
define('SMTP_PORT', 587); // 587 for TLS, 465 for SSL
define('SMTP_SECURE', 'tls'); // 'tls' or 'ssl'
define('SMTP_USER', 'no-reply@managementbricks.com'); // Replace with your SMTP username
define('SMTP_PASS', '********'); // Replace with your SMTP password

// Email Configuration
define('FROM_EMAIL', 'no-reply@managementbricks.com'); // From email address
define('FROM_NAME', 'ManagementBricks'); // From name

// Admin Email Configuration
define('ADMIN_EMAIL', 'info@managementbricks.com'); // Admin email to receive submissions
define('ADMIN_NAME', 'ManagementBricks Admin'); // Admin name

// Email Subject Configuration
define('ADMIN_SUBJECT', 'New Contact Form Submission - ManagementBricks');
define('USER_SUBJECT', 'Thank you for contacting ManagementBricks');

/* 
SETUP INSTRUCTIONS:
1. Update SMTP settings above with your email provider's details
2. Common SMTP configurations:
   
   Gmail:
   - SMTP_HOST: smtp.gmail.com
   - SMTP_PORT: 587
   - SMTP_SECURE: tls
   - Use App Password instead of regular password
   
   Outlook/Hotmail:
   - SMTP_HOST: smtp-mail.outlook.com
   - SMTP_PORT: 587
   - SMTP_SECURE: tls
   
   Yahoo:
   - SMTP_HOST: smtp.mail.yahoo.com
   - SMTP_PORT: 587 or 465
   - SMTP_SECURE: tls or ssl
   
   Custom SMTP (recommended for production):
   - Use your hosting provider's SMTP settings
   - Or use services like SendGrid, Mailgun, etc.

3. Update email addresses to match your domain
4. Test the configuration thoroughly before going live
*/
?>