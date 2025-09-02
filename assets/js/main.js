/* ===== NAVIGATION MENU ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
});

/* ===== ACTIVE LINK HIGHLIGHTING ===== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 200;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active-link');
        } else {
            sectionsClass?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* ===== HERO SLIDER ===== */
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero__slide');
        this.indicators = document.querySelectorAll('.hero__indicator');
        this.prevBtn = document.querySelector('.hero__prev');
        this.nextBtn = document.querySelector('.hero__next');
        this.currentSlide = 0;
        this.isPlaying = true;
        this.slideInterval = null;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.bindEvents();
        this.startAutoPlay();
    }

    bindEvents() {
        // Previous button
        this.prevBtn?.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });

        // Next button
        this.nextBtn?.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        heroSection?.addEventListener('mouseenter', () => this.pauseAutoPlay());
        heroSection?.addEventListener('mouseleave', () => this.resumeAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoPlay();
            }
        });
    }

    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide]?.classList.remove('active');
        this.indicators[this.currentSlide]?.classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide]?.classList.add('active');
        this.indicators[this.currentSlide]?.classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, 5000);
    }

    pauseAutoPlay() {
        this.isPlaying = false;
    }

    resumeAutoPlay() {
        this.isPlaying = true;
    }

    resetAutoPlay() {
        clearInterval(this.slideInterval);
        this.startAutoPlay();
    }
}

// Initialize hero slider
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});

/* ===== SMOOTH SCROLLING FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

/* ===== CONTACT FORM HANDLING ===== */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.message = document.getElementById('form-message');
        this.formTimeField = document.getElementById('form_time');
        
        this.init();
    }

    init() {
        if (!this.form) return;

        // Set form load time for spam protection
        this.formTimeField.value = Date.now();

        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Validate based on field type
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 3 characters long';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#F44336';
        
        // Create error message element if it doesn't exist
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.cssText = 'color: #F44336; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setSubmitState(isLoading) {
        const btnText = this.submitBtn.querySelector('.btn__text');
        const btnSpinner = this.submitBtn.querySelector('.btn__spinner');

        if (isLoading) {
            this.submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnSpinner.style.display = 'inline';
        } else {
            this.submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnSpinner.style.display = 'none';
        }
    }

    showMessage(message, type) {
        this.message.textContent = message;
        this.message.className = `form__message ${type}`;
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                this.message.className = 'form__message';
            }, 5000);
        }
    }

    async handleSubmit() {
        // Validate form
        if (!this.validateForm()) {
            this.showMessage('Please fix the errors above and try again.', 'error');
            return;
        }

        this.setSubmitState(true);

        try {
            // Prepare form data
            const formData = new FormData(this.form);
            
            // Send to PHP handler
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showMessage(result.message, 'success');
                this.form.reset();
                this.formTimeField.value = Date.now(); // Reset form time
            } else {
                this.showMessage(result.message || 'An error occurred. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            this.setSubmitState(false);
        }
    }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

/* ===== HEADER SCROLL EFFECT ===== */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/* ===== SCROLL TO TOP ===== */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: var(--bg-color);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-normal);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

scrollTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

/* ===== ACCESSIBILITY IMPROVEMENTS ===== */
// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 0;
    background: var(--primary-color);
    color: var(--bg-color);
    padding: 1rem;
    text-decoration: none;
    z-index: 9999;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }
});

// Focus management for mobile menu
if (navToggle && navClose) {
    navToggle.addEventListener('click', () => {
        setTimeout(() => navClose.focus(), 100);
    });
    
    navClose.addEventListener('click', () => {
        navToggle.focus();
    });
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */
// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
        'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src + '?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadCriticalResources);