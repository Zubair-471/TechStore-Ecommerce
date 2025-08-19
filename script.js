// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Add keyboard shortcut (Ctrl/Cmd + J)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            this.themeIcon.className = 'fas fa-sun';
        } else {
            this.themeIcon.className = 'fas fa-moon';
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation effect
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu when window is resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }
    
    openMenu() {
        this.navMenu.style.display = 'flex';
        this.navMenu.style.flexDirection = 'column';
        this.navMenu.style.position = 'absolute';
        this.navMenu.style.top = '100%';
        this.navMenu.style.left = '0';
        this.navMenu.style.right = '0';
        this.navMenu.style.backgroundColor = 'var(--navbar-background)';
        this.navMenu.style.backdropFilter = 'blur(10px)';
        this.navMenu.style.borderTop = '1px solid var(--border-color)';
        this.navMenu.style.padding = '1rem';
        this.navMenu.style.gap = '1rem';
        this.navMenu.style.zIndex = '999';
        
        // Animate menu items
        const menuItems = this.navMenu.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    closeMenu() {
        this.isOpen = false;
        this.navMenu.style.display = 'none';
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            // Scrolling down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// Enhanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-up');
                    }, index * 100);
                }
            });
        }, this.observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.product-card, .category-card, .testimonial-card, .offer-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Special animations for hero section
        this.animateHeroSection();
    }
    
    animateHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent && heroImage) {
            setTimeout(() => {
                heroContent.classList.add('animate-slide-left');
            }, 300);
            
            setTimeout(() => {
                heroImage.classList.add('animate-slide-right');
            }, 600);
        }
    }
}

// Enhanced Counter Animation
class CounterAnimation {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.stats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isSlash = target.includes('/');
        
        let numericTarget;
        if (isPercentage) {
            numericTarget = parseFloat(target.replace('%', ''));
        } else if (isPlus) {
            numericTarget = parseInt(target.replace('+', ''));
        } else if (isSlash) {
            numericTarget = 24; // For 24/7
        } else {
            numericTarget = parseInt(target);
        }
        
        let current = 0;
        const increment = numericTarget / 60; // Slower animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
            
            let displayValue;
            if (isPercentage) {
                displayValue = current.toFixed(1) + '%';
            } else if (isPlus) {
                displayValue = Math.floor(current) + '+';
            } else if (isSlash) {
                displayValue = Math.floor(current) + '/7';
            } else {
                displayValue = Math.floor(current);
            }
            
            element.textContent = displayValue;
        }, 40);
    }
}

// Enhanced Button Effects
class ButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
                this.addClickEffect(button);
            });
        });
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addClickEffect(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}

// Product Card Interactions
class ProductInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        // Add to cart button effects
        const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAddToCartEffect(button);
            });
        });
        
        // Category card hover effects
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCategoryCard(card);
            });
        });
    }
    
    showAddToCartEffect(button) {
        const originalText = button.textContent;
        button.textContent = 'Added! ✓';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }
    
    animateCategoryCard(card) {
        const icon = card.querySelector('.category-icon i');
        if (icon) {
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 600);
        }
    }
}

// Form Validation (for future contact forms)
class FormValidation {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }
    
    showError(input, message) {
        const errorDiv = input.parentNode.querySelector('.error-message') || 
                        document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--accent-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        if (!input.parentNode.querySelector('.error-message')) {
            input.parentNode.appendChild(errorDiv);
        }
        
        input.style.borderColor = 'var(--accent-color)';
    }
    
    clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images (if any are added later)
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadResources();
    }
    
    setupLazyLoading() {
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
    }
    
    preloadResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SmoothScroller();
    new MobileMenu();
    new NavbarScroll();
    new ScrollAnimations();
    new CounterAnimation();
    new ButtonEffects();
    new ProductInteractions();
    new FormValidation();
    new PerformanceOptimizer();
    
    console.log('TechStore Landing Page loaded successfully! 🚀');
});

// Add enhanced CSS dynamically
const enhancedCSS = `
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-fade-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-slide-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .animate-slide-right {
        animation: slideInRight 0.8s ease-out forwards;
    }
    
    .navbar.scrolled {
        box-shadow: 0 2px 20px var(--shadow-color);
    }
    
    /* Enhanced product card animations */
    .product-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .product-card.animate-fade-up {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Enhanced category card animations */
    .category-card {
        opacity: 0;
        transform: scale(0.9);
    }
    
    .category-card.animate-fade-up {
        opacity: 1;
        transform: scale(1);
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedCSS;
document.head.appendChild(styleSheet);
