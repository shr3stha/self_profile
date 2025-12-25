/**
 * Admin Page Logic
 * Handles admin form interactions and configuration management
 */

(function() {
    'use strict';

    class AdminController {
        constructor() {
            this.password = 'admin123'; // Default password - should be changed in production
            this.config = configManager.load();
            this.init();
        }

        /**
         * Initializes the admin page
         */
        init() {
            this.setupPasswordProtection();
            this.setupForm();
        }

        /**
         * Sets up password protection
         */
        setupPasswordProtection() {
            const passwordScreen = document.getElementById('password-screen');
            const adminContent = document.getElementById('admin-content');
            const passwordInput = document.getElementById('password-input');
            const passwordSubmit = document.getElementById('password-submit');
            const passwordError = document.getElementById('password-error');

            if (!passwordScreen || !adminContent) return;

            const checkPassword = () => {
                const entered = passwordInput.value;
                if (entered === this.password) {
                    passwordScreen.style.display = 'none';
                    adminContent.style.display = 'block';
                    this.loadConfigIntoForm();
                } else {
                    passwordError.textContent = 'Incorrect password. Please try again.';
                    passwordError.style.display = 'block';
                    passwordInput.value = '';
                }
            };

            passwordSubmit.addEventListener('click', checkPassword);
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkPassword();
                }
            });
        }

        /**
         * Sets up the admin form
         */
        setupForm() {
            const form = document.getElementById('admin-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveConfig();
            });
        }

        /**
         * Loads current configuration into the form
         */
        loadConfigIntoForm() {
            const config = this.config;

            // Banner settings
            document.getElementById('banner-enabled').checked = config.bannerEnabled || false;
            document.getElementById('banner-text-input').value = config.bannerText || '';
            document.getElementById('banner-type').value = config.bannerType || 'info';

            // Theme
            document.getElementById('theme').value = config.theme || 'default';

            // Hero/Profile
            document.getElementById('profile-image-url').value = config.profileImageUrl || '';
            document.getElementById('hero-name').value = config.heroName || '';
            document.getElementById('hero-subtitle').value = config.heroSubtitle || '';
            document.getElementById('hero-tagline').value = config.heroTagline || '';
            document.getElementById('accepting-patients').checked = config.acceptingPatients || false;
            document.getElementById('availability-status').value = config.availabilityStatus || '';

            // Contact
            document.getElementById('business-name').value = config.businessName || '';
            document.getElementById('location').value = config.location || '';
            document.getElementById('contact-email').value = config.contactEmail || '';
        }

        /**
         * Collects form data and saves configuration
         */
        saveConfig() {
            const formData = {
                bannerEnabled: document.getElementById('banner-enabled').checked,
                bannerText: document.getElementById('banner-text-input').value.trim(),
                bannerType: document.getElementById('banner-type').value,
                theme: document.getElementById('theme').value,
                profileImageUrl: document.getElementById('profile-image-url').value.trim(),
                heroName: document.getElementById('hero-name').value.trim(),
                heroSubtitle: document.getElementById('hero-subtitle').value.trim(),
                heroTagline: document.getElementById('hero-tagline').value.trim(),
                acceptingPatients: document.getElementById('accepting-patients').checked,
                availabilityStatus: document.getElementById('availability-status').value.trim(),
                businessName: document.getElementById('business-name').value.trim(),
                location: document.getElementById('location').value.trim(),
                contactEmail: document.getElementById('contact-email').value.trim()
            };

            // Validate required fields
            if (!formData.heroName) {
                this.showMessage('Display name is required', 'error');
                return;
            }

            if (!formData.contactEmail) {
                this.showMessage('Contact email is required', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.contactEmail)) {
                this.showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Save configuration
            const success = configManager.save(formData);
            if (success) {
                this.config = formData;
                this.showMessage('Configuration saved successfully! Changes will appear on the main page.', 'success');
            } else {
                this.showMessage('Error saving configuration. Please try again.', 'error');
            }
        }

        /**
         * Shows a message to the user
         * @param {string} message - Message text
         * @param {string} type - Message type ('success' or 'error')
         */
        showMessage(message, type) {
            const messageEl = document.getElementById('admin-message');
            if (!messageEl) return;

            messageEl.textContent = message;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';

            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new AdminController();
        });
    } else {
        new AdminController();
    }
})();

