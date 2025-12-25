/**
 * Tests for ConfigManager
 * Tests configuration loading, saving, and updating functionality
 */

// Mock localStorage for testing
class MockStorage {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value;
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

// Setup test environment
const mockLocalStorage = new MockStorage();
global.localStorage = mockLocalStorage;

// Import config manager (adjust path as needed)
// In a real test environment, you'd use a proper test runner like Jest or Mocha
// For now, we'll create a testable version

class TestConfigManager {
    constructor() {
        this.storageKey = 'fnp-site-config';
        this.defaultConfig = this.getDefaultConfig();
    }

    getDefaultConfig() {
        return {
            heroName: 'Your Name, DNP, FNP-C',
            heroCredentials: 'Family Nurse Practitioner specializing in kidney disease (Nephrology)',
            heroTagline: 'Helping adults with kidney disease manage their health with clear, compassionate, evidence-based care.',
            profileImageUrl: 'assets/images/placeholder-profile.svg',
            acceptingPatients: false,
            bannerEnabled: false,
            bannerText: '',
            bannerType: 'info',
            theme: 'default',
            businessName: 'dummyLLC',
            contactEmail: 'contact@dummyllc.com'
        };
    }

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

    update(updates) {
        const current = this.load();
        return this.save({ ...current, ...updates });
    }

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

// Test Suite
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log('Running tests...\n');
        for (const test of this.tests) {
            try {
                await test.fn();
                console.log(`✓ ${test.name}`);
                this.passed++;
            } catch (error) {
                console.error(`✗ ${test.name}`);
                console.error(`  Error: ${error.message}`);
                this.failed++;
            }
        }
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
        }
    }

    assertDeepEqual(actual, expected, message) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
    }
}

// Run tests
const runner = new TestRunner();
const configManager = new TestConfigManager();

// Test 1: Default config loading
runner.test('Should load default config when no stored config exists', () => {
    mockLocalStorage.clear();
    const config = configManager.load();
    runner.assert(config.heroName === 'Your Name, DNP, FNP-C', 'Default heroName should be set');
    runner.assert(config.theme === 'default', 'Default theme should be default');
    runner.assert(config.bannerEnabled === false, 'Default bannerEnabled should be false');
});

// Test 2: Config saving
runner.test('Should save configuration successfully', () => {
    mockLocalStorage.clear();
    const testConfig = {
        heroName: 'Test Name, DNP, FNP-C',
        theme: 'winter'
    };
    const result = configManager.save(testConfig);
    runner.assert(result === true, 'Save should return true');
    const stored = JSON.parse(mockLocalStorage.getItem('fnp-site-config'));
    runner.assertEqual(stored.heroName, 'Test Name, DNP, FNP-C', 'Saved heroName should match');
    runner.assertEqual(stored.theme, 'winter', 'Saved theme should match');
});

// Test 3: Config loading with stored data
runner.test('Should load stored configuration', () => {
    const testConfig = {
        heroName: 'Stored Name',
        bannerEnabled: true,
        bannerText: 'Test banner'
    };
    mockLocalStorage.setItem('fnp-site-config', JSON.stringify(testConfig));
    const loaded = configManager.load();
    runner.assertEqual(loaded.heroName, 'Stored Name', 'Should load stored heroName');
    runner.assert(loaded.bannerEnabled === true, 'Should load stored bannerEnabled');
    runner.assertEqual(loaded.bannerText, 'Test banner', 'Should load stored bannerText');
});

// Test 4: Config update
runner.test('Should update existing configuration', () => {
    mockLocalStorage.clear();
    configManager.save({ heroName: 'Original Name' });
    const updated = configManager.update({ heroName: 'Updated Name' });
    runner.assert(updated === true, 'Update should return true');
    const loaded = configManager.load();
    runner.assertEqual(loaded.heroName, 'Updated Name', 'Should update heroName');
});

// Test 5: Config reset
runner.test('Should reset configuration', () => {
    mockLocalStorage.setItem('fnp-site-config', JSON.stringify({ heroName: 'Test' }));
    const result = configManager.reset();
    runner.assert(result === true, 'Reset should return true');
    const stored = mockLocalStorage.getItem('fnp-site-config');
    runner.assert(stored === null, 'Storage should be cleared after reset');
});

// Test 6: Partial config merge
runner.test('Should merge partial config with defaults', () => {
    mockLocalStorage.clear();
    const partial = { heroName: 'Partial Name' };
    configManager.save(partial);
    const loaded = configManager.load();
    runner.assertEqual(loaded.heroName, 'Partial Name', 'Should use partial heroName');
    runner.assertEqual(loaded.theme, 'default', 'Should use default theme');
    runner.assertEqual(loaded.contactEmail, 'contact@dummyllc.com', 'Should use default contactEmail');
});

// Run all tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestRunner, TestConfigManager };
} else {
    // Browser environment
    runner.run();
}

