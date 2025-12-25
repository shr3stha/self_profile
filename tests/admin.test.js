/**
 * Tests for AdminController
 * Tests admin form validation and configuration management
 */

class TestAdminController {
    constructor() {
        this.config = {
            heroName: '',
            contactEmail: '',
            bannerEnabled: false,
            bannerText: '',
            bannerType: 'info',
            theme: 'default',
            profileImageUrl: '',
            heroCredentials: '',
            heroTagline: '',
            acceptingPatients: false,
            businessName: '',
            contactEmail: ''
        };
    }

    validateFormData(formData) {
        // Validate required fields
        if (!formData.heroName) {
            return { valid: false, message: 'Display name is required' };
        }

        if (!formData.contactEmail) {
            return { valid: false, message: 'Contact email is required' };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contactEmail)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        return { valid: true };
    }

    sanitizeFormData(formData) {
        return {
            heroName: formData.heroName.trim(),
            heroCredentials: formData.heroCredentials.trim(),
            heroTagline: formData.heroTagline.trim(),
            profileImageUrl: formData.profileImageUrl.trim(),
            bannerText: formData.bannerText.trim(),
            businessName: formData.businessName.trim(),
            contactEmail: formData.contactEmail.trim(),
            bannerEnabled: formData.bannerEnabled,
            bannerType: formData.bannerType,
            theme: formData.theme,
            acceptingPatients: formData.acceptingPatients
        };
    }
}

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
        console.log('Running AdminController tests...\n');
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
}

const runner = new TestRunner();
const adminController = new TestAdminController();

// Test 1: Valid form data
runner.test('Should validate correct form data', () => {
    const formData = {
        heroName: 'Test Name',
        contactEmail: 'test@example.com',
        bannerEnabled: true,
        bannerText: 'Test banner',
        bannerType: 'info',
        theme: 'default',
        profileImageUrl: 'test.jpg',
        heroCredentials: 'Test Credentials',
        heroTagline: 'Test Tagline',
        acceptingPatients: true,
        businessName: 'Test LLC',
        contactEmail: 'test@example.com'
    };
    
    const result = adminController.validateFormData(formData);
    runner.assert(result.valid === true, 'Valid form data should pass validation');
});

// Test 2: Missing hero name
runner.test('Should reject form data without hero name', () => {
    const formData = {
        heroName: '',
        contactEmail: 'test@example.com'
    };
    
    const result = adminController.validateFormData(formData);
    runner.assert(result.valid === false, 'Form without hero name should fail validation');
    runner.assert(result.message.includes('Display name'), 'Error message should mention display name');
});

// Test 3: Missing contact email
runner.test('Should reject form data without contact email', () => {
    const formData = {
        heroName: 'Test Name',
        contactEmail: ''
    };
    
    const result = adminController.validateFormData(formData);
    runner.assert(result.valid === false, 'Form without contact email should fail validation');
    runner.assert(result.message.includes('Contact email'), 'Error message should mention contact email');
});

// Test 4: Invalid email format
runner.test('Should reject invalid email format', () => {
    const formData = {
        heroName: 'Test Name',
        contactEmail: 'invalid-email'
    };
    
    const result = adminController.validateFormData(formData);
    runner.assert(result.valid === false, 'Invalid email should fail validation');
    runner.assert(result.message.includes('valid email'), 'Error message should mention valid email');
});

// Test 5: Email format variations
runner.test('Should accept various valid email formats', () => {
    const validEmails = [
        'test@example.com',
        'user.name@example.co.uk',
        'test+tag@example.org',
        'user123@test-domain.com'
    ];
    
    validEmails.forEach(email => {
        const formData = {
            heroName: 'Test Name',
            contactEmail: email
        };
        const result = adminController.validateFormData(formData);
        runner.assert(result.valid === true, `Should accept valid email: ${email}`);
    });
});

// Test 6: Form data sanitization
runner.test('Should sanitize form data by trimming whitespace', () => {
    const formData = {
        heroName: '  Test Name  ',
        heroCredentials: '  Test Credentials  ',
        heroTagline: '  Test Tagline  ',
        profileImageUrl: '  test.jpg  ',
        bannerText: '  Test Banner  ',
        businessName: '  Test LLC  ',
        contactEmail: '  test@example.com  ',
        bannerEnabled: true,
        bannerType: 'info',
        theme: 'default',
        acceptingPatients: false
    };
    
    const sanitized = adminController.sanitizeFormData(formData);
    runner.assertEqual(sanitized.heroName, 'Test Name', 'Should trim hero name');
    runner.assertEqual(sanitized.heroCredentials, 'Test Credentials', 'Should trim credentials');
    runner.assertEqual(sanitized.contactEmail, 'test@example.com', 'Should trim email');
    runner.assert(sanitized.bannerEnabled === true, 'Should preserve boolean values');
});

// Test 7: Empty string handling
runner.test('Should handle empty strings in form data', () => {
    const formData = {
        heroName: 'Test Name',
        contactEmail: 'test@example.com',
        heroCredentials: '',
        heroTagline: '',
        profileImageUrl: '',
        bannerText: '',
        businessName: '',
        bannerEnabled: false,
        bannerType: 'info',
        theme: 'default',
        acceptingPatients: false
    };
    
    const sanitized = adminController.sanitizeFormData(formData);
    runner.assertEqual(sanitized.heroCredentials, '', 'Should preserve empty strings');
    runner.assertEqual(sanitized.bannerText, '', 'Should preserve empty banner text');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestRunner, TestAdminController };
} else {
    runner.run();
}

