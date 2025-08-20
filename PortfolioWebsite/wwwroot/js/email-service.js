/**
 * EmailJS Configuration and Functions
 * Handles email sending via EmailJS with fallback simulation for development
 */
(function() {
    'use strict';

    // Default EmailJS configuration (will be overridden by settings.json)
    let EMAILJS_CONFIG = {
        serviceId: '',
        templateId: '',
        userId: '',
        recipientEmail: ''
    };

    // Load configuration from settings.json
    async function loadConfiguration() {
        try {
            // Get the base path from the document base href
            const basePath = document.querySelector('base')?.getAttribute('href') || '/';
            const settingsPath = basePath + 'settings.json';
            
            console.log('🔍 Attempting to load settings from:', settingsPath);
            const response = await fetch(settingsPath);
            
            if (response.ok) {
                const settings = await response.json();
                console.log('📄 Settings loaded:', settings);
                
                if (settings.emailjs) {
                    EMAILJS_CONFIG = {
                        serviceId: settings.emailjs.serviceId || '',
                        templateId: settings.emailjs.templateId || '',
                        userId: settings.emailjs.userId || '',
                        recipientEmail: settings.contact?.recipientEmail || ''
                    };
                    console.log('✅ EmailJS configuration loaded from settings.json');
                    console.log('🔧 Config:', {
                        serviceId: EMAILJS_CONFIG.serviceId ? '***' : 'MISSING',
                        templateId: EMAILJS_CONFIG.templateId ? '***' : 'MISSING',
                        userId: EMAILJS_CONFIG.userId ? '***' : 'MISSING',
                        recipientEmail: EMAILJS_CONFIG.recipientEmail ? '***' : 'MISSING'
                    });
                } else {
                    console.warn('⚠️ No emailjs configuration found in settings.json');
                }
            } else {
                console.warn('⚠️ Failed to load settings.json:', response.status, response.statusText);
            }
        } catch (error) {
            console.warn('⚠️ Could not load settings.json:', error);
        }
    }

    // Initialize EmailJS when the page loads
    document.addEventListener('DOMContentLoaded', async function() {
        console.log('🚀 Initializing EmailJS service...');
        
        // Load configuration first
        await loadConfiguration();
        
        if (typeof emailjs !== 'undefined') {
            console.log('✅ EmailJS library loaded');
            
            if (EMAILJS_CONFIG.userId) {
                emailjs.init(EMAILJS_CONFIG.userId);
                console.log('✅ EmailJS initialized successfully with user ID');
            } else {
                console.warn('⚠️ EmailJS user ID missing from configuration');
            }
        } else {
            console.warn('⚠️ EmailJS library not loaded');
        }
    });

    // Function to send email via EmailJS
    window.sendEmailViaEmailJS = function(templateParams) {
        return new Promise((resolve, reject) => {
            if (typeof emailjs === 'undefined') {
                reject(new Error('EmailJS not loaded'));
                return;
            }

            if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
                reject(new Error('EmailJS configuration missing'));
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
            name: 'Marcus Henriques',
            email: contactInfo.email,
            to_name: 'Marcus Henriques',
            to_email: EMAILJS_CONFIG.recipientEmail,
            reply_to: contactInfo.email,
            year: new Date().getFullYear()
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
