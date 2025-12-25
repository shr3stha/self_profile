/**
 * Configuration Management Module
 * Handles loading, saving, and retrieving site configuration
 * Uses localStorage for persistence (can be replaced with API calls later)
 */

class ConfigManager {
  constructor() {
    this.storageKey = "fnp-site-config";
    this.configVersion = "2.0"; // Increment to force migration/refresh
    this.versionKey = "fnp-site-config-version";
    this.defaultConfig = this.getDefaultConfig();
  }

  /**
   * Returns the default configuration object
   * @returns {Object} Default configuration
   */
  getDefaultConfig() {
    return {
      heroName: "Rujita Munankarmi, FNP",
      heroSubtitle:
        '<strong>Primary care</strong> with <span class="accent">CKD & hypertension</span> prevention and management',
      profileImageUrl: "assets/images/pfp.jpg",
      acceptingPatients: false,
      availabilityStatus: "Please contact us to inquire about availability.",
      showHeaderNav: false,
      showHeaderLogo: false,
      showHeroAvailability: false,
      showHeroCTA: false,
      showFooterCopyright: true,
      bannerEnabled: false,
      bannerText: "",
      bannerType: "info",
      theme: "default",
      businessName: "CarenexLLC",
      contactEmail: "carenex.np@gmail.com",
      location: "Harford County, Maryland",
      showContactBusiness: false,
      showContactLocation: true,
      showContactEmail: true,
      showContactAvailability: true,
    };
  }

  /**
   * Loads configuration from localStorage or returns default
   * @returns {Object} Configuration object
   */
  load() {
    try {
      const storedVersion = localStorage.getItem(this.versionKey);
      const stored = localStorage.getItem(this.storageKey);

      // If version mismatch or no version, force migration
      const needsMigration = storedVersion !== this.configVersion;

      if (stored) {
        const parsed = JSON.parse(stored);
        let merged = { ...this.defaultConfig, ...parsed };
        let needsSave = false;

        // Force migration if version changed
        if (needsMigration) {
          // Reset to defaults and merge only valid fields
          merged = { ...this.defaultConfig };
          // Preserve user customizations that are still valid
          Object.keys(parsed).forEach((key) => {
            if (this.defaultConfig.hasOwnProperty(key)) {
              merged[key] = parsed[key];
            }
          });
          needsSave = true;
        }

        // Migration: Update old location value if it exists
        if (
          merged.location ===
          "Bel Air, Maryland (serving surrounding communities)"
        ) {
          merged.location = "Harford County, Maryland";
          needsSave = true;
        }

        // Migration: Update old name value if it exists
        if (merged.heroName === "Jane Doe, FNP") {
          merged.heroName = "Rujita Munankarmi, FNP";
          needsSave = true;
        }

        // Migration: Update old business name if it exists
        if (merged.businessName === "dummyLLC") {
          merged.businessName = "CarenexLLC";
          needsSave = true;
        }

        // Migration: Update old email if it exists
        if (merged.contactEmail === "contact@dummyllc.com") {
          merged.contactEmail = "carenex.np@gmail.com";
          needsSave = true;
        }

        // Migration: Update old profile image if it exists
        if (
          merged.profileImageUrl === "assets/images/placeholder-profile.svg"
        ) {
          merged.profileImageUrl = "assets/images/pfp.jpg";
          needsSave = true;
        }

        // Auto-save migrated values and update version
        if (needsSave) {
          this.save(merged);
          localStorage.setItem(this.versionKey, this.configVersion);
        }

        return merged;
      } else {
        // No stored config, set version for first time
        localStorage.setItem(this.versionKey, this.configVersion);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
    return { ...this.defaultConfig };
  }

  /**
   * Forces a refresh by clearing cached config and reloading
   * Useful for ensuring all components get updated values
   */
  forceRefresh() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.setItem(this.versionKey, this.configVersion);
      return this.load();
    } catch (error) {
      console.error("Error forcing refresh:", error);
      return { ...this.defaultConfig };
    }
  }

  /**
   * Finds the highest numbered pfp image (pfp1.jpg, pfp2.jpg, etc.)
   * Uses image loading to detect which files exist
   * @returns {Promise<string>} Path to the highest numbered pfp image, or default placeholder
   */
  async findLatestPfpImage() {
    const cacheKey = "fnp-latest-pfp-cache";
    const cacheTimeKey = "fnp-latest-pfp-cache-time";
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

    // Check cache first
    try {
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(cacheTimeKey);
      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10);
        if (age < cacheDuration) {
          // Verify cached image still exists
          const exists = await this.checkImageExists(cached);
          if (exists) {
            return cached;
          }
        }
      }
    } catch (error) {
      console.warn("Error reading pfp cache:", error);
    }

    // Try to find the highest numbered pfp image
    // Start from a reasonable high number and work backwards for efficiency
    const maxAttempts = 20; // Check up to pfp20.jpg
    let highestFound = null;
    let highestNumber = 0;

    // Try numbers in reverse order (faster if high numbers exist)
    for (let i = maxAttempts; i >= 1; i--) {
      const imagePath = `assets/images/pfp${i}.jpg`;
      const exists = await this.checkImageExists(imagePath);

      if (exists) {
        highestFound = imagePath;
        highestNumber = i;
        break; // Found the highest, no need to check lower numbers
      }
    }

    // Cache the result
    if (highestFound) {
      try {
        localStorage.setItem(cacheKey, highestFound);
        localStorage.setItem(cacheTimeKey, Date.now().toString());
      } catch (error) {
        console.warn("Error caching pfp image:", error);
      }
      return highestFound;
    }

    // Fallback to default placeholder if no pfp images found
    const fallback = "assets/images/placeholder-profile.svg";
    try {
      localStorage.setItem(cacheKey, fallback);
      localStorage.setItem(cacheTimeKey, Date.now().toString());
    } catch (error) {
      console.warn("Error caching fallback image:", error);
    }
    return fallback;
  }

  /**
   * Checks if an image file exists by attempting to load it
   * @param {string} imagePath - Path to the image file
   * @returns {Promise<boolean>} True if image exists, false otherwise
   */
  checkImageExists(imagePath) {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve(false);
      }, 2000); // 2 second timeout

      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };

      img.src = imagePath;
    });
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
      console.error("Error saving config:", error);
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
      console.error("Error resetting config:", error);
      return false;
    }
  }
}

// Export singleton instance
const configManager = new ConfigManager();
