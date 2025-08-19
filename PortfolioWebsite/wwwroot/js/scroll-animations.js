// Scroll Animation Handler
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .hero-animate');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll spy functionality
function initializeScrollSpy(dotNetHelper) {
    const sections = ['about-me', 'my-story', 'random-facts', 'how-i-work'];
    
    const observerOptions = {
        threshold: 0.4,
        rootMargin: '-30% 0px -30% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sections.includes(sectionId)) {
                    dotNetHelper.invokeMethodAsync('OnSectionChange', sectionId);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            observer.observe(element);
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    function attemptScroll() {
        const element = document.getElementById(sectionId);
        
        if (element) {
            const viewportHeight = window.innerHeight;
            const elementHeight = element.offsetHeight;
            const navHeight = 80;
            const offset = navHeight + 20;
            
            const offsetTop = element.offsetTop;
            const targetPosition = Math.max(0, offsetTop - (viewportHeight / 2) + (elementHeight / 2) - offset);
            
            // Smooth scroll with custom easing
            const startPosition = window.scrollY || window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(Math.abs(distance) * 0.8, 1200);
            const startTime = performance.now();
            
            function smoothScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smoother animation
                const easeInOutCubic = progress => {
                    return progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                };
                
                const easedProgress = easeInOutCubic(progress);
                const currentPosition = startPosition + (distance * easedProgress);
                
                window.scrollTo(0, currentPosition);
                
                if (progress < 1) {
                    requestAnimationFrame(smoothScroll);
                }
            }
            
            requestAnimationFrame(smoothScroll);
            
            // Fallback to native smooth scroll if needed
            setTimeout(() => {
                const currentScroll = window.scrollY || window.pageYOffset;
                
                if (Math.abs(currentScroll - targetPosition) > 20) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, duration + 100);
            
            return true;
        }
        
        return false;
    }
    
    // Try immediately, then retry if needed
    if (!attemptScroll()) {
        setTimeout(() => {
            if (!attemptScroll()) {
                setTimeout(attemptScroll, 500);
            }
        }, 100);
    }
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollAnimations);
} else {
    initializeScrollAnimations();
}

// Export functions for Blazor
window.initializeScrollAnimations = initializeScrollAnimations;
window.initializeScrollSpy = initializeScrollSpy;
window.scrollToSection = scrollToSection;
