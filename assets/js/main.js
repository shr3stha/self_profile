/**
 * Main Page Logic
 * Applies configuration to the index.html page
 */

(function() {
    'use strict';

    class MainPageController {
        constructor() {
            // Force refresh config to ensure latest values (handles migrations)
            this.config = configManager.load();
            this.init();
        }

        /**
         * Initializes the page by applying configuration
         */
        async init() {
            // Reload config to ensure we have the latest (after any migrations)
            this.config = configManager.load();
            this.applyBanner();
            this.applyTheme();
            await this.applyHero(); // Now async to handle image detection
            this.applyContact();
            this.applyVisibility();
            this.setCurrentYear();
        }
        
        /**
         * Refreshes all components with current config
         * Call this after config changes to update all components
         */
        async refreshAll() {
            this.config = configManager.load();
            await this.init();
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
         * Applies visibility settings for header logo, header nav, hero availability, hero CTA, and footer copyright
         */
        applyVisibility() {
            const headerLogo = document.getElementById('header-logo');
            const headerNav = document.getElementById('header-nav');
            const heroAvailability = document.getElementById('hero-availability');
            const heroCTA = document.getElementById('hero-cta');
            const footerCopyright = document.getElementById('footer-copyright');

            if (headerLogo) {
                headerLogo.style.display = (this.config.showHeaderLogo !== false) ? '' : 'none';
            }

            if (headerNav) {
                headerNav.style.display = (this.config.showHeaderNav !== false) ? '' : 'none';
            }

            if (heroAvailability) {
                heroAvailability.style.display = (this.config.showHeroAvailability !== false) ? '' : 'none';
            }

            if (heroCTA) {
                heroCTA.style.display = (this.config.showHeroCTA !== false) ? '' : 'none';
            }

            if (footerCopyright) {
                footerCopyright.style.display = (this.config.showFooterCopyright !== false) ? '' : 'none';
            }
        }

        /**
         * Applies hero section configuration
         */
        async applyHero() {
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

            if (profileImage) {
                // Determine which image to use
                let imageToUse = this.config.profileImageUrl;
                
                // If using pfp pattern (pfp.jpg, pfp1.jpg, pfp2.jpg, etc.), find the latest numbered version
                if (imageToUse && imageToUse.includes('pfp')) {
                    try {
                        // Always check for the latest numbered pfp image
                        const latest = await configManager.findLatestPfpImage();
                        // Use the latest found if it's a numbered pfp, otherwise use configured value
                        if (latest && latest.match(/pfp\d+\.jpg/)) {
                            imageToUse = latest;
                        } else if (latest) {
                            // Fallback image found
                            imageToUse = latest;
                        }
                    } catch (error) {
                        console.error("Error finding latest pfp image:", error);
                        // Fallback to placeholder if error occurs
                        imageToUse = 'assets/images/placeholder-profile.svg';
                    }
                }
                
                // Set the image
                if (imageToUse) {
                    profileImage.src = imageToUse;
                    profileImage.alt = this.config.heroName || 'Profile';
                    
                    // Handle image loading errors gracefully
                    profileImage.onerror = function() {
                        console.warn("Profile image failed to load:", imageToUse);
                        this.src = 'assets/images/placeholder-profile.svg';
                        this.alt = 'Profile image not available';
                    };
                }
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
            const contactFieldBusiness = document.getElementById('contact-field-business');
            const contactFieldLocation = document.getElementById('contact-field-location');
            const contactFieldEmail = document.getElementById('contact-field-email');
            const contactFieldAvailability = document.getElementById('contact-field-availability');

            // Update content
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

            // Apply visibility settings
            if (contactFieldBusiness) {
                contactFieldBusiness.style.display = (this.config.showContactBusiness !== false) ? '' : 'none';
            }

            if (contactFieldLocation) {
                contactFieldLocation.style.display = (this.config.showContactLocation !== false) ? '' : 'none';
            }

            if (contactFieldEmail) {
                contactFieldEmail.style.display = (this.config.showContactEmail !== false) ? '' : 'none';
            }

            if (contactFieldAvailability) {
                contactFieldAvailability.style.display = (this.config.showContactAvailability !== false) ? '' : 'none';
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

