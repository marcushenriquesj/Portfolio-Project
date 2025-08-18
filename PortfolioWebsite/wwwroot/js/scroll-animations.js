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
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
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
            const offset = 50; // Offset for sticky sidebar
            
            // Method 1: Using offsetTop
            const offsetTop = element.offsetTop;
            console.log('Element offsetTop:', offsetTop);
            
            // Method 2: Using getBoundingClientRect + scrollY
            const rect = element.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const rectTop = rect.top + scrollY;
            console.log('Element rect.top:', rect.top, 'scrollY:', scrollY, 'rectTop:', rectTop);
            
            // Check if we can actually scroll
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            console.log('Document height:', documentHeight, 'Viewport height:', viewportHeight);
            console.log('Can scroll:', documentHeight > viewportHeight);
            
            // Use offsetTop method as primary, with fallback
            const targetPosition = offsetTop - offset;
            console.log('Target scroll position:', targetPosition);
            console.log('Current scroll position:', window.scrollY || window.pageYOffset);
            
            // Try multiple scroll methods
            try {
                // Method 1: window.scrollTo
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Method 2: If that doesn't work, try scrollIntoView
                setTimeout(() => {
                    const currentScroll = window.scrollY || window.pageYOffset;
                    console.log('Scroll position after scrollTo:', currentScroll);
                    
                    if (Math.abs(currentScroll - targetPosition) > 10) {
                        console.log('scrollTo failed, trying scrollIntoView...');
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Method 3: If that doesn't work, try manual scroll
                        setTimeout(() => {
                            const newScroll = window.scrollY || window.pageYOffset;
                            console.log('Scroll position after scrollIntoView:', newScroll);
                            
                            if (Math.abs(newScroll - targetPosition) > 10) {
                                console.log('scrollIntoView failed, trying manual scroll...');
                                window.scrollTo(0, targetPosition);
                            }
                        }, 100);
                    }
                }, 100);
                
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
