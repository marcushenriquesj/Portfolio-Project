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
    
    // Function to get appropriate rootMargin based on screen size
    function getRootMargin() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // Account for mobile header height (120px) and some buffer
            return '-20% 0px -40% 0px';
        } else {
            // Desktop margin
            return '-30% 0px -30% 0px';
        }
    }
    
    // Function to get appropriate threshold based on screen size
    function getThreshold() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // Multiple thresholds for mobile to catch sections at different visibility levels
            return [0.1, 0.2, 0.3, 0.4];
        } else {
            // Desktop threshold
            return 0.4;
        }
    }
    
    const observerOptions = {
        threshold: getThreshold(),
        rootMargin: getRootMargin()
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const isMobile = window.innerWidth <= 768;
            console.log(`Scroll spy: Section ${sectionId} - isIntersecting: ${entry.isIntersecting}, intersectionRatio: ${entry.intersectionRatio.toFixed(2)}, isMobile: ${isMobile}`);
            
            if (entry.isIntersecting) {
                if (sections.includes(sectionId)) {
                    console.log(`Scroll spy: Section ${sectionId} is now active`);
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
    
    // Reinitialize observer on window resize to adjust for mobile/desktop
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log(`Resize detected: Reinitializing scroll spy for ${window.innerWidth <= 768 ? 'mobile' : 'desktop'} layout`);
            
            // Disconnect current observer
            observer.disconnect();
            
            // Update rootMargin and threshold
            observerOptions.rootMargin = getRootMargin();
            observerOptions.threshold = getThreshold();
            console.log(`New rootMargin: ${observerOptions.rootMargin}, New threshold: ${observerOptions.threshold}`);
            
            // Recreate observer with new options
            const newObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const sectionId = entry.target.id;
                    const isMobile = window.innerWidth <= 768;
                    console.log(`Scroll spy (resize): Section ${sectionId} - isIntersecting: ${entry.isIntersecting}, intersectionRatio: ${entry.intersectionRatio.toFixed(2)}, isMobile: ${isMobile}`);
                    
                    if (entry.isIntersecting) {
                        if (sections.includes(sectionId)) {
                            console.log(`Scroll spy: Section ${sectionId} is now active (resize handler)`);
                            dotNetHelper.invokeMethodAsync('OnSectionChange', sectionId);
                        }
                    }
                });
            }, observerOptions);
            
            // Re-observe all sections
            sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    newObserver.observe(element);
                }
            });
            
            // Replace the observer reference
            Object.assign(observer, newObserver);
        }, 250);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    function attemptScroll() {
        const element = document.getElementById(sectionId);
        
        if (element) {
            const viewportHeight = window.innerHeight;
            const elementHeight = element.offsetHeight;
            const isMobile = window.innerWidth <= 768;
            
            // Account for mobile header height
            const navHeight = isMobile ? 120 : 80;
            const mobileHeaderHeight = isMobile ? 60 : 0; // Additional mobile header height
            const offset = navHeight + mobileHeaderHeight + 20;
            
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
