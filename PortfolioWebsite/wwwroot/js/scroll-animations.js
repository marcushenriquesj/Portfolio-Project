// Scroll Animation Handler
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll spy functionality
function initializeScrollSpy(dotNetHelper) {
    const sections = ['about-me', 'my-story', 'random-facts', 'how-i-work'];
    
    const observerOptions = {
        threshold: 0.4, // Increased threshold to be less sensitive
        rootMargin: '-30% 0px -30% 0px' // Smaller trigger zone to reduce conflicts
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
    console.log('scrollToSection called with sectionId:', sectionId);
    
    function attemptScroll() {
        const element = document.getElementById(sectionId);
        console.log('Element found:', element);
        
        if (element) {
            const viewportHeight = window.innerHeight;
            const elementHeight = element.offsetHeight;
            const navHeight = 80; // Height of fixed navigation
            const offset = navHeight + 20; // Account for nav height plus some padding
            
            // Calculate position to center the section in the viewport
            const offsetTop = element.offsetTop;
            const targetPosition = Math.max(0, offsetTop - (viewportHeight / 2) + (elementHeight / 2) - offset);
            
            console.log('Element offsetTop:', offsetTop);
            console.log('Viewport height:', viewportHeight);
            console.log('Element height:', elementHeight);
            console.log('Target scroll position (centered):', targetPosition);
            console.log('Current scroll position:', window.scrollY || window.pageYOffset);
            
            // Check if we can actually scroll
            const documentHeight = document.documentElement.scrollHeight;
            console.log('Document height:', documentHeight, 'Viewport height:', viewportHeight);
            console.log('Can scroll:', documentHeight > viewportHeight);
            
            // Try multiple scroll methods with smoother behavior
            try {
                // Method 1: window.scrollTo with custom easing
                const startPosition = window.scrollY || window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = Math.min(Math.abs(distance) * 0.8, 1200); // Dynamic duration based on distance
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
                };
                
                requestAnimationFrame(smoothScroll);
                
                // Method 2: Fallback to native smooth scroll if custom animation fails
                setTimeout(() => {
                    const currentScroll = window.scrollY || window.pageYOffset;
                    console.log('Scroll position after custom animation:', currentScroll);
                    
                    if (Math.abs(currentScroll - targetPosition) > 20) {
                        console.log('Custom animation failed, trying native smooth scroll...');
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        
                        // Method 3: Final fallback to manual scroll
                        setTimeout(() => {
                            const newScroll = window.scrollY || window.pageYOffset;
                            console.log('Scroll position after scrollIntoView:', newScroll);
                            
                            if (Math.abs(newScroll - targetPosition) > 20) {
                                console.log('scrollIntoView failed, using manual scroll...');
                                window.scrollTo(0, targetPosition);
                            }
                        }, 200);
                    }
                }, duration + 100);
                
            } catch (error) {
                console.error('Scroll error:', error);
                // Fallback to manual scroll
                window.scrollTo(0, targetPosition);
            }
            
            return true; // Success
        } else {
            console.error('Element not found for sectionId:', sectionId);
            console.log('Available sections:', ['about-me', 'my-story', 'random-facts', 'how-i-work']);
            console.log('All elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
            return false; // Failed
        }
    }
    
    // Try immediately
    if (!attemptScroll()) {
        // If failed, try again after a short delay (in case DOM isn't ready)
        console.log('Element not found, retrying after 100ms...');
        setTimeout(() => {
            if (!attemptScroll()) {
                console.log('Element still not found, retrying after 500ms...');
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
