<?php
// contact.php - Professional Contact Form Handler with Dual Email System

// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Include configuration
require_once 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Enable error reporting for debugging (remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

class ContactFormHandler {
    private $config;
    private $errors = [];
    private $formData = [];
    
    public function __construct($config) {
        $this->config = $config;
    }
    
    public function handleRequest() {
        // Only allow POST requests
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return $this->jsonResponse(false, 'Invalid request method.');
        }
        
        // Basic security checks
        if (!$this->validateRequest()) {
            return $this->jsonResponse(false, 'Security validation failed.');
        }
        
        // Sanitize and validate form data
        if (!$this->sanitizeAndValidateData()) {
            return $this->jsonResponse(false, implode(' ', $this->errors));
        }
        
        // Send emails
        $emailResult = $this->sendEmails();
        
        if ($emailResult['success']) {
            return $this->jsonResponse(true, 'Thank you for your message! We\'ll get back to you soon.');
        } else {
            return $this->jsonResponse(false, $emailResult['message']);
        }
    }
    
    private function validateRequest() {
        // Check for required fields
        $requiredFields = ['name', 'email', 'phone', 'message'];
        foreach ($requiredFields as $field) {
            if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
                return false;
            }
        }
        
        // Honeypot spam protection
        if (!empty($_POST['honeypot'])) {
            return false;
        }
        
        // Time-based spam protection (form must be displayed for at least 3 seconds)
        if (isset($_POST['form_time'])) {
            $formTime = intval($_POST['form_time']);
            $currentTime = time() * 1000; // Convert to milliseconds
            if (($currentTime - $formTime) < 3000) {
                return false;
            }
        }
        
        // Rate limiting (simple IP-based)
        if (!$this->checkRateLimit()) {
            return false;
        }
        
        return true;
    }
    
    private function checkRateLimit() {
        $ip = $this->getUserIP();
        $rateLimitFile = sys_get_temp_dir() . '/contact_rate_limit_' . md5($ip);
        
        if (file_exists($rateLimitFile)) {
            $lastSubmission = filemtime($rateLimitFile);
            // Allow one submission per minute
            if ((time() - $lastSubmission) < 60) {
                return false;
            }
        }
        
        // Update rate limit file
        touch($rateLimitFile);
        return true;
    }
    
    private function sanitizeAndValidateData() {
        // Sanitize inputs
        $this->formData['name'] = $this->sanitizeString($_POST['name']);
        $this->formData['email'] = $this->sanitizeEmail($_POST['email']);
        $this->formData['phone'] = $this->sanitizeString($_POST['phone']);
        $this->formData['message'] = $this->sanitizeString($_POST['message']);
        
        // Validate name
        if (strlen($this->formData['name']) < 2 || strlen($this->formData['name']) > 100) {
            $this->errors[] = 'Name must be between 2 and 100 characters.';
        }
        
        if (!preg_match('/^[a-zA-Z\s\'-\.]+$/', $this->formData['name'])) {
            $this->errors[] = 'Name contains invalid characters.';
        }
        
        // Validate email
        if (!filter_var($this->formData['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors[] = 'Invalid email address.';
        }
        
        if (strlen($this->formData['email']) > 254) {
            $this->errors[] = 'Email address is too long.';
        }
        
        // Validate phone
        if (!preg_match('/^[0-9+()\s-]{7,}$/', $this->formData['phone'])) {
            $this->errors[] = 'Please enter a valid phone number.';
        }
        
        // Validate message
        if (strlen($this->formData['message']) < 10 || strlen($this->formData['message']) > 2000) {
            $this->errors[] = 'Message must be between 10 and 2000 characters.';
        }
        
        // Check for spam patterns
        if ($this->detectSpam($this->formData['message'])) {
            $this->errors[] = 'Message contains prohibited content.';
        }
        
        return empty($this->errors);
    }
    
    private function sanitizeString($string) {
        $string = trim($string);
        $string = stripslashes($string);
        $string = htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
        return $string;
    }
    
    private function sanitizeEmail($email) {
        $email = trim($email);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        return strtolower($email);
    }
    
    private function detectSpam($text) {
        $spamPatterns = [
            '/\b(viagra|cialis|casino|poker|loan|mortgage|insurance|pharmacy)\b/i',
            '/\b(click here|act now|limited time|make money|work from home)\b/i',
            '/(https?:\/\/[^\s]+.*https?:\/\/[^\s]+)/i', // Multiple URLs
            '/(.)\1{10,}/', // Repeated characters
        ];
        
        foreach ($spamPatterns as $pattern) {
            if (preg_match($pattern, $text)) {
                return true;
            }
        }
        
        return false;
    }
    
    private function sendEmails() {
        // Try PHPMailer first
        if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
            return $this->sendEmailsWithPHPMailer();
        }
        
        // Fallback to PHP mail()
        return $this->sendEmailsWithPHPMail();
    }
    
    private function sendEmailsWithPHPMailer() {
        require_once 'vendor/autoload.php';
        
        try {
            $mail = new PHPMailer(true);
            
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = $this->config['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $this->config['SMTP_USER'];
            $mail->Password = $this->config['SMTP_PASS'];
            $mail->SMTPSecure = $this->config['SMTP_SECURE'];
            $mail->Port = $this->config['SMTP_PORT'];
            
            // Set charset
            $mail->CharSet = 'UTF-8';
            
            // Email 1: Send to admin
            $adminEmailSent = $this->sendAdminEmail($mail);
            
            // Email 2: Send autoresponder to user
            $userEmailSent = $this->sendUserEmail($mail);
            
            if ($adminEmailSent && $userEmailSent) {
                return ['success' => true, 'message' => 'Emails sent successfully'];
            } else {
                return ['success' => false, 'message' => 'Failed to send one or more emails'];
            }
            
        } catch (Exception $e) {
            error_log("PHPMailer Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Email configuration error. Please try again later.'];
        }
    }
    
    private function sendAdminEmail($mail) {
        try {
            $mail->clearAddresses();
            $mail->clearAttachments();
            
            // From
            $mail->setFrom($this->config['FROM_EMAIL'], $this->config['FROM_NAME']);
            $mail->addReplyTo($this->formData['email'], $this->formData['name']);
            
            // To
            $mail->addAddress($this->config['ADMIN_EMAIL'], $this->config['ADMIN_NAME']);
            
            // Subject
            $mail->Subject = $this->config['ADMIN_SUBJECT'];
            
            // Body
            $mail->isHTML(true);
            $mail->Body = $this->getAdminEmailBody();
            $mail->AltBody = $this->getAdminEmailBodyText();
            
            return $mail->send();
            
        } catch (Exception $e) {
            error_log("Admin Email Error: " . $e->getMessage());
            return false;
        }
    }
    
    private function sendUserEmail($mail) {
        try {
            $mail->clearAddresses();
            $mail->clearAttachments();
            
            // From
            $mail->setFrom($this->config['FROM_EMAIL'], $this->config['FROM_NAME']);
            
            // To
            $mail->addAddress($this->formData['email'], $this->formData['name']);
            
            // Subject
            $mail->Subject = $this->config['USER_SUBJECT'];
            
            // Body
            $mail->isHTML(true);
            $mail->Body = $this->getUserEmailBody();
            $mail->AltBody = $this->getUserEmailBodyText();
            
            return $mail->send();
            
        } catch (Exception $e) {
            error_log("User Email Error: " . $e->getMessage());
            return false;
        }
    }
    
    private function sendEmailsWithPHPMail() {
        // Admin email
        $adminEmailSent = $this->sendAdminEmailPHP();
        
        // User email
        $userEmailSent = $this->sendUserEmailPHP();
        
        if ($adminEmailSent && $userEmailSent) {
            return ['success' => true, 'message' => 'Emails sent successfully'];
        } else {
            return ['success' => false, 'message' => 'Failed to send emails. Please try again later.'];
        }
    }
    
    private function sendAdminEmailPHP() {
        $to = $this->config['ADMIN_EMAIL'];
        $subject = $this->config['ADMIN_SUBJECT'];
        $message = $this->getAdminEmailBodyText();
        
        $headers = [
            'From: ' . $this->config['FROM_EMAIL'],
            'Reply-To: ' . $this->formData['email'],
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        return mail($to, $subject, $message, implode("\r\n", $headers));
    }
    
    private function sendUserEmailPHP() {
        $to = $this->formData['email'];
        $subject = $this->config['USER_SUBJECT'];
        $message = $this->getUserEmailBodyText();
        
        $headers = [
            'From: ' . $this->config['FROM_EMAIL'],
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        return mail($to, $subject, $message, implode("\r\n", $headers));
    }
    
    private function getAdminEmailBody() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
        $ipAddress = $this->getUserIP();
        $timestamp = date('Y-m-d H:i:s');
        
        return "
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #C9B8A6; color: #0B0B0B; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; }
                .value { padding: 8px; background: #fff; border-left: 3px solid #C9B8A6; margin-top: 5px; }
                .footer { background: #333; color: #fff; padding: 15px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New Contact Form Submission</h2>
                    <p>ManagementBricks Website</p>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Name:</div>
                        <div class='value'>{$this->formData['name']}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Email:</div>
                        <div class='value'>{$this->formData['email']}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Phone:</div>
                        <div class='value'>{$this->formData['phone']}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Message:</div>
                        <div class='value'>" . nl2br($this->formData['message']) . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p><strong>Submission Details:</strong></p>
                    <p>Date & Time: {$timestamp}</p>
                    <p>IP Address: {$ipAddress}</p>
                    <p>User Agent: {$userAgent}</p>
                </div>
            </div>
        </body>
        </html>";
    }
    
    private function getAdminEmailBodyText() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
        $ipAddress = $this->getUserIP();
        $timestamp = date('Y-m-d H:i:s');
        
        return "NEW CONTACT FORM SUBMISSION - ManagementBricks Website\n\n" .
               "Name: {$this->formData['name']}\n" .
               "Email: {$this->formData['email']}\n" .
               "Phone: {$this->formData['phone']}\n\n" .
               "Message:\n{$this->formData['message']}\n\n" .
               "---\n" .
               "Submission Details:\n" .
               "Date & Time: {$timestamp}\n" .
               "IP Address: {$ipAddress}\n" .
               "User Agent: {$userAgent}";
    }
    
    private function getUserEmailBody() {
        return "
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #C9B8A6; color: #0B0B0B; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .footer { background: #333; color: #fff; padding: 20px; text-align: center; }
                .logo { font-size: 24px; font-weight: bold; }
                .message { margin: 20px 0; }
                .button { display: inline-block; background: #C9B8A6; color: #0B0B0B; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <div class='logo'>ManagementBricks</div>
                    <p>Thank you for contacting us!</p>
                </div>
                <div class='content'>
                    <p>Dear {$this->formData['name']},</p>
                    
                    <div class='message'>
                        <p>Thank you for reaching out to ManagementBricks. We have successfully received your message.</p>

                        <p>Our team will review your inquiry and get back to you within 24-48 hours. We appreciate your interest in our services and look forward to helping you achieve your career development goals.</p>
                    </div>
                    
                    <p>In the meantime, feel free to explore our services:</p>
                    <ul>
                        <li>Psychometric Assessment</li>
                        <li>Mock Interview Preparation</li>
                        <li>Aptitude Testing</li>
                    </ul>
                    
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='https://managementbricks.com' class='button'>Visit Our Website</a>
                    </div>
                    
                    <p>If you have any urgent questions, please don't hesitate to contact us directly at info@managementbricks.com.</p>
                    
                    <p>Best regards,<br>
                    <strong>The ManagementBricks Team</strong></p>
                </div>
                <div class='footer'>
                    <p><strong>ManagementBricks Pvt. Ltd.</strong></p>
                    <p>Empowering Leaders of Tomorrow</p>
                    <p>Hyderabad, India | info@managementbricks.com</p>
                </div>
            </div>
        </body>
        </html>";
    }
    
    private function getUserEmailBodyText() {
        return "Thank you for contacting ManagementBricks!\n\n" .
               "Dear {$this->formData['name']},\n\n" .
               "Thank you for reaching out to ManagementBricks. We have successfully received your message.\n\n" .
               "Our team will review your inquiry and get back to you within 24-48 hours. We appreciate your interest in our services and look forward to helping you achieve your career development goals.\n\n" .
               "In the meantime, feel free to explore our services:\n" .
               "• Psychometric Assessment\n" .
               "• Mock Interview Preparation\n" .
               "• Aptitude Testing\n\n" .
               "If you have any urgent questions, please don't hesitate to contact us directly at info@managementbricks.com.\n\n" .
               "Best regards,\n" .
               "The ManagementBricks Team\n\n" .
               "---\n" .
               "ManagementBricks Pvt. Ltd.\n" .
               "Empowering Leaders of Tomorrow\n" .
               "Hyderabad, India\n" .
               "info@managementbricks.com";
    }
    
    private function getUserIP() {
        $ip_keys = ['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'];
        
        foreach ($ip_keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = $_SERVER[$key];
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        
        return $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    }
    
    private function jsonResponse($success, $message, $data = []) {
        $response = [
            'success' => $success,
            'message' => $message,
            'timestamp' => time()
        ];
        
        if (!empty($data)) {
            $response = array_merge($response, $data);
        }
        
        echo json_encode($response);
        exit;
    }
}

// Configuration array
$config = [
    'SMTP_HOST' => SMTP_HOST,
    'SMTP_PORT' => SMTP_PORT,
    'SMTP_SECURE' => SMTP_SECURE,
    'SMTP_USER' => SMTP_USER,
    'SMTP_PASS' => SMTP_PASS,
    'FROM_EMAIL' => FROM_EMAIL,
    'FROM_NAME' => FROM_NAME,
    'ADMIN_EMAIL' => ADMIN_EMAIL,
    'ADMIN_NAME' => ADMIN_NAME,
    'ADMIN_SUBJECT' => ADMIN_SUBJECT,
    'USER_SUBJECT' => USER_SUBJECT
];

// Initialize and handle the request
$contactHandler = new ContactFormHandler($config);
$contactHandler->handleRequest();
?>