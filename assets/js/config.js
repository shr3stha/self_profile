/**
 * Configuration Management Module
 * Handles loading, saving, and retrieving site configuration
 * Uses localStorage for persistence (can be replaced with API calls later)
 */

class ConfigManager {
    constructor() {
        this.storageKey = 'fnp-site-config';
        this.defaultConfig = this.getDefaultConfig();
    }

    /**
     * Returns the default configuration object
     * @returns {Object} Default configuration
     */
    getDefaultConfig() {
        return {
            heroName: 'Jane Doe, FNP',
            heroCredentials: 'Family Nurse Practitioner specializing in chronic kidney disease and hypertension management',
            heroTagline: 'Helping adults with chronic kidney disease, high blood pressure, and diabetes protect their kidney function with clear, compassionate care.',
            profileImageUrl: 'assets/images/placeholder-profile.svg',
            acceptingPatients: false,
            availabilityStatus: 'Limited appointments available Friday–Sunday, 9:00 AM–5:00 PM.',
            bannerEnabled: false,
            bannerText: '',
            bannerType: 'info',
            theme: 'default',
            businessName: 'dummyLLC',
            contactEmail: 'contact@dummyllc.com',
            location: 'Bel Air, Maryland (serving surrounding communities)'
        };
    }

    /**
     * Loads configuration from localStorage or returns default
     * @returns {Object} Configuration object
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...this.defaultConfig, ...parsed };
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
        return { ...this.defaultConfig };
    }

    /**
     * Saves configuration to localStorage
     * @param {Object} config - Configuration object to save
     * @returns {boolean} Success status
     */
    save(config) {
        try {
            const merged = { ...this.defaultConfig, ...config };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Error saving config:', error);
            return false;
        }
    }

    /**
     * Updates specific configuration fields
     * @param {Object} updates - Partial configuration object
     * @returns {boolean} Success status
     */
    update(updates) {
        const current = this.load();
        return this.save({ ...current, ...updates });
    }

    /**
     * Resets configuration to defaults
     * @returns {boolean} Success status
     */
    reset() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error resetting config:', error);
            return false;
        }
    }
}

// Export singleton instance
const configManager = new ConfigManager();

