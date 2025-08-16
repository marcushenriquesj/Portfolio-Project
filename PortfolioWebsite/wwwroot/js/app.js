// Smooth scrolling function for navigation
window.scrollToSection = function (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Get element position for ripple effect
window.getElementPosition = function (element) {
    if (element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
        };
    }
    return null;
};

// Intersection Observer for animations
window.initializeAnimations = function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => {
        observer.observe(section);
    });
};

// Theme detection
window.getPreferredTheme = function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

// Loading progress
window.setLoadingProgress = function (progress) {
    const progressElement = document.querySelector('.loading-progress circle:last-child');
    if (progressElement) {
        progressElement.style.strokeDasharray = `${progress * 2.513}, 500%`;
    }
    
    const textElement = document.querySelector('.loading-progress-text');
    if (textElement) {
        textElement.textContent = `${Math.round(progress)}%`;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations
    if (window.initializeAnimations) {
        window.initializeAnimations();
    }
    
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            window.scrollToSection(targetId);
        });
    });
    
    // Add loading animation
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        setTimeout(() => {
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Blazor WebAssembly specific initialization
window.blazorInterop = {
    // Method to be called from Blazor
    initializePortfolio: function () {
        console.log('Portfolio initialized');
        
        // Initialize any additional JavaScript functionality
        if (window.initializeAnimations) {
            window.initializeAnimations();
        }
    },
    
    // Method to handle theme changes
    updateTheme: function (isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    },
    
    // Method to scroll to section
    scrollToSection: function (sectionId) {
        window.scrollToSection(sectionId);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.blazorInterop;
}
