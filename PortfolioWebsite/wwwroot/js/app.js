// Portfolio Website JavaScript
// Handles global functionality and interactions

// Initialize portfolio functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add intersection observer for animations
    addScrollAnimations();
    
    // Initialize any additional functionality
    setupEventListeners();
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function setupEventListeners() {
    // Add any additional event listeners here
    console.log('Portfolio initialized successfully');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in Blazor
window.PortfolioUtils = {
    debounce,
    throttle,
    addSmoothScrolling,
    addScrollAnimations
};
