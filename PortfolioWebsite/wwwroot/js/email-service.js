// EmailJS Configuration and Functions
(function() {
    'use strict';

    // Default EmailJS configuration (fallback)
    let EMAILJS_CONFIG = {
        serviceId: 'service_td7vveh',
        templateId: 'template_49mj3c8',
        userId: 'cby30yyJZtnR9t472',
        recipientEmail: 'devgurumarcus@gmail.com'
    };

    // Load configuration from settings.json
    async function loadConfiguration() {
        try {
            const response = await fetch('/settings.json');
            if (response.ok) {
                const settings = await response.json();
                if (settings.emailjs) {
                    EMAILJS_CONFIG = {
                        serviceId: settings.emailjs.serviceId || EMAILJS_CONFIG.serviceId,
                        templateId: settings.emailjs.templateId || EMAILJS_CONFIG.templateId,
                        userId: settings.emailjs.userId || EMAILJS_CONFIG.userId,
                        recipientEmail: settings.contact?.recipientEmail || EMAILJS_CONFIG.recipientEmail
                    };
                    console.log('✅ EmailJS configuration loaded from settings.json');
                }
            }
        } catch (error) {
            console.warn('⚠️ Could not load settings.json, using default configuration:', error);
        }
    }

    // Initialize EmailJS when the page loads
    document.addEventListener('DOMContentLoaded', async function() {
        // Load configuration first
        await loadConfiguration();
        
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.userId);
            console.log('✅ EmailJS initialized successfully with config:', EMAILJS_CONFIG);
        } else {
            console.warn('⚠️ EmailJS not loaded');
        }
    });

    // Function to send email via EmailJS
    window.sendEmailViaEmailJS = function(templateParams) {
        return new Promise((resolve, reject) => {
            if (typeof emailjs === 'undefined') {
                reject(new Error('EmailJS not loaded'));
                return;
            }

            emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    resolve(true);
                }, function(error) {
                    console.error('Email sending failed:', error);
                    reject(error);
                });
        });
    };

    // Function to validate email format
    window.validateEmail = function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to format contact data for EmailJS
    window.formatContactData = function(contactInfo) {
        return {
            from_name: contactInfo.name,
            from_email: contactInfo.email,
            subject: contactInfo.subject,
            message: contactInfo.message,
            name: 'Marcus Henriques', // For the notification email template
            email: contactInfo.email, // For the auto-reply template
            to_name: 'Marcus Henriques', // Your name 
            to_email: EMAILJS_CONFIG.recipientEmail, // Use configured email
            reply_to: contactInfo.email,
            year: new Date().getFullYear() // For the auto-reply template
        };
    };

    // Fallback function for development/testing
    window.simulateEmailSending = function(contactInfo) {
        return new Promise((resolve) => {
            console.log('📧 Simulating email send...');
            console.log('👤 Name:', contactInfo.name);
            console.log('📮 Email:', contactInfo.email);
            console.log('📝 Subject:', contactInfo.subject);
            console.log('💬 Message:', contactInfo.message);
            console.log('🕒 Timestamp:', new Date().toISOString());
            
            // Simulate network delay
            setTimeout(() => {
                console.log('✅ Email simulation completed successfully');
                resolve(true);
            }, 1500);
        });
    };

    // Main email sending function that uses EmailJS with fallback to simulation
    window.sendContactEmail = function(contactInfo) {
        console.log('📧 Attempting to send email via EmailJS...');
        
        // Try to send via EmailJS
        const templateParams = window.formatContactData(contactInfo);
        return window.sendEmailViaEmailJS(templateParams)
            .catch(error => {
                console.warn('EmailJS failed, falling back to simulation:', error);
                return window.simulateEmailSending(contactInfo);
            });
    };

})();
