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
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 50; // Reduced offset for sticky sidebar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
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
