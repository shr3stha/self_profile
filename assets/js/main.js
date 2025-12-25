/**
 * Main Page Logic
 * Applies configuration to the index.html page
 */

(function() {
    'use strict';

    class MainPageController {
        constructor() {
            this.config = configManager.load();
            this.init();
        }

        /**
         * Initializes the page by applying configuration
         */
        init() {
            this.applyBanner();
            this.applyTheme();
            this.applyHero();
            this.applyContact();
            this.applyVisibility();
            this.setCurrentYear();
        }

        /**
         * Applies banner configuration
         */
        applyBanner() {
            const banner = document.getElementById('urgent-banner');
            const bannerText = document.getElementById('banner-text');
            
            if (!banner || !bannerText) return;

            if (this.config.bannerEnabled && this.config.bannerText) {
                banner.style.display = 'block';
                bannerText.textContent = this.config.bannerText;
                banner.className = `urgent-banner ${this.config.bannerType}`;
            } else {
                banner.style.display = 'none';
            }
        }

        /**
         * Applies theme configuration
         */
        applyTheme() {
            const body = document.body;
            body.className = body.className.replace(/theme-\w+/g, '');
            if (this.config.theme && this.config.theme !== 'default') {
                body.classList.add(`theme-${this.config.theme}`);
            }
        }

        /**
         * Applies visibility settings for header nav, hero availability, and hero CTA
         */
        applyVisibility() {
            const headerNav = document.getElementById('header-nav');
            const heroAvailability = document.getElementById('hero-availability');
            const heroCTA = document.getElementById('hero-cta');

            if (headerNav) {
                headerNav.style.display = (this.config.showHeaderNav !== false) ? '' : 'none';
            }

            if (heroAvailability) {
                heroAvailability.style.display = (this.config.showHeroAvailability !== false) ? '' : 'none';
            }

            if (heroCTA) {
                heroCTA.style.display = (this.config.showHeroCTA !== false) ? '' : 'none';
            }
        }

        /**
         * Applies hero section configuration
         */
        applyHero() {
            const heroName = document.getElementById('hero-name');
            const heroSubtitle = document.getElementById('hero-subtitle');
            const profileImage = document.getElementById('profile-image');
            const acceptingBadge = document.getElementById('accepting-patients-badge');
            const consultationBtn = document.getElementById('consultation-btn');

            if (heroName && this.config.heroName) {
                heroName.textContent = this.config.heroName;
            }

            if (heroSubtitle && this.config.heroSubtitle) {
                // Use innerHTML to preserve formatting (admin-controlled content)
                heroSubtitle.innerHTML = this.config.heroSubtitle;
            }

            // Apply availability status to hero section
            const heroAvailability = document.getElementById('hero-availability');
            if (heroAvailability && this.config.availabilityStatus) {
                heroAvailability.textContent = this.config.availabilityStatus;
            }
            // Note: Visibility is controlled by applyVisibility() method

            if (profileImage && this.config.profileImageUrl) {
                profileImage.src = this.config.profileImageUrl;
                profileImage.alt = this.config.heroName || 'Profile';
                // Handle image loading errors gracefully
                profileImage.onerror = function() {
                    this.src = 'assets/images/placeholder-profile.svg';
                    this.alt = 'Profile image not available';
                };
            }

            if (acceptingBadge) {
                if (this.config.acceptingPatients) {
                    acceptingBadge.style.display = 'inline-block';
                    acceptingBadge.classList.add('active');
                } else {
                    acceptingBadge.style.display = 'none';
                    acceptingBadge.classList.remove('active');
                }
            }

            if (consultationBtn && this.config.contactEmail) {
                consultationBtn.href = `mailto:${this.config.contactEmail}`;
            }
        }

        /**
         * Applies contact section configuration
         */
        applyContact() {
            const businessName = document.getElementById('contact-business-name');
            const contactLocation = document.getElementById('contact-location');
            const contactEmail = document.getElementById('contact-email-link');
            const contactAvailability = document.getElementById('contact-availability');

            if (businessName && this.config.businessName) {
                businessName.textContent = this.config.businessName;
            }

            if (contactLocation && this.config.location) {
                contactLocation.textContent = this.config.location;
            }

            if (contactEmail && this.config.contactEmail) {
                contactEmail.textContent = this.config.contactEmail;
                contactEmail.href = `mailto:${this.config.contactEmail}`;
            }

            if (contactAvailability && this.config.availabilityStatus) {
                contactAvailability.textContent = this.config.availabilityStatus;
            }
        }

        /**
         * Sets the current year in the footer
         */
        setCurrentYear() {
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new MainPageController();
        });
    } else {
        new MainPageController();
    }
})();

