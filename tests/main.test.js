/**
 * Tests for MainPageController
 * Tests DOM manipulation and configuration application
 */

// Mock DOM for testing
class MockDOM {
    constructor() {
        this.elements = {};
    }

    createElement(tag) {
        return {
            tagName: tag,
            textContent: '',
            style: {},
            className: '',
            classList: {
                add: (cls) => {
                    if (!this.className.includes(cls)) {
                        this.className += (this.className ? ' ' : '') + cls;
                    }
                },
                remove: (cls) => {
                    this.className = this.className.replace(new RegExp(`\\b${cls}\\b`, 'g'), '').trim();
                }
            },
            src: '',
            alt: '',
            href: '',
            display: 'block'
        };
    }

    getElementById(id) {
        if (!this.elements[id]) {
            this.elements[id] = this.createElement('div');
            this.elements[id].id = id;
        }
        return this.elements[id];
    }

    querySelector(selector) {
        // Simple mock - in real tests, use jsdom or similar
        return this.createElement('div');
    }
}

// Test MainPageController logic
class TestMainPageController {
    constructor(config, dom) {
        this.config = config;
        this.dom = dom;
    }

    applyBanner() {
        const banner = this.dom.getElementById('urgent-banner');
        const bannerText = this.dom.getElementById('banner-text');
        
        if (!banner || !bannerText) return;

        if (this.config.bannerEnabled && this.config.bannerText) {
            banner.style.display = 'block';
            bannerText.textContent = this.config.bannerText;
            banner.className = `urgent-banner ${this.config.bannerType}`;
        } else {
            banner.style.display = 'none';
        }
    }

    applyTheme() {
        const body = { className: '' };
        body.className = body.className.replace(/theme-\w+/g, '');
        if (this.config.theme && this.config.theme !== 'default') {
            body.className += ` theme-${this.config.theme}`;
        }
        return body;
    }

    applyHero() {
        const heroName = this.dom.getElementById('hero-name');
        const heroCredentials = this.dom.getElementById('hero-credentials');
        const heroTagline = this.dom.getElementById('hero-tagline');
        const profileImage = this.dom.getElementById('profile-image');
        const acceptingBadge = this.dom.getElementById('accepting-patients-badge');
        const consultationBtn = this.dom.getElementById('consultation-btn');

        if (heroName && this.config.heroName) {
            heroName.textContent = this.config.heroName;
        }

        if (heroCredentials && this.config.heroCredentials) {
            heroCredentials.textContent = this.config.heroCredentials;
        }

        if (heroTagline && this.config.heroTagline) {
            heroTagline.textContent = this.config.heroTagline;
        }

        if (profileImage && this.config.profileImageUrl) {
            profileImage.src = this.config.profileImageUrl;
            profileImage.alt = this.config.heroName || 'Profile';
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
        console.log('Running MainPageController tests...\n');
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

// Test 1: Banner application when enabled
runner.test('Should apply banner when enabled', () => {
    const dom = new MockDOM();
    const config = {
        bannerEnabled: true,
        bannerText: 'Test banner message',
        bannerType: 'urgent'
    };
    const controller = new TestMainPageController(config, dom);
    controller.applyBanner();
    
    const banner = dom.getElementById('urgent-banner');
    const bannerText = dom.getElementById('banner-text');
    
    runner.assertEqual(banner.style.display, 'block', 'Banner should be displayed');
    runner.assertEqual(bannerText.textContent, 'Test banner message', 'Banner text should match');
    runner.assert(banner.className.includes('urgent'), 'Banner should have urgent class');
});

// Test 2: Banner hidden when disabled
runner.test('Should hide banner when disabled', () => {
    const dom = new MockDOM();
    const config = {
        bannerEnabled: false,
        bannerText: 'Test banner'
    };
    const controller = new TestMainPageController(config, dom);
    controller.applyBanner();
    
    const banner = dom.getElementById('urgent-banner');
    runner.assertEqual(banner.style.display, 'none', 'Banner should be hidden');
});

// Test 3: Theme application
runner.test('Should apply theme class to body', () => {
    const dom = new MockDOM();
    const config = { theme: 'winter' };
    const controller = new TestMainPageController(config, dom);
    const body = controller.applyTheme();
    
    runner.assert(body.className.includes('theme-winter'), 'Body should have winter theme class');
});

// Test 4: Default theme
runner.test('Should not apply theme class for default theme', () => {
    const dom = new MockDOM();
    const config = { theme: 'default' };
    const controller = new TestMainPageController(config, dom);
    const body = controller.applyTheme();
    
    runner.assert(!body.className.includes('theme-'), 'Body should not have theme class for default');
});

// Test 5: Hero content application
runner.test('Should apply hero content from config', () => {
    const dom = new MockDOM();
    const config = {
        heroName: 'Test Name, DNP',
        heroCredentials: 'Test Credentials',
        heroTagline: 'Test Tagline',
        profileImageUrl: 'test.jpg',
        contactEmail: 'test@example.com'
    };
    const controller = new TestMainPageController(config, dom);
    controller.applyHero();
    
    const heroName = dom.getElementById('hero-name');
    const heroCredentials = dom.getElementById('hero-credentials');
    const heroTagline = dom.getElementById('hero-tagline');
    const profileImage = dom.getElementById('profile-image');
    const consultationBtn = dom.getElementById('consultation-btn');
    
    runner.assertEqual(heroName.textContent, 'Test Name, DNP', 'Hero name should match');
    runner.assertEqual(heroCredentials.textContent, 'Test Credentials', 'Hero credentials should match');
    runner.assertEqual(heroTagline.textContent, 'Test Tagline', 'Hero tagline should match');
    runner.assertEqual(profileImage.src, 'test.jpg', 'Profile image src should match');
    runner.assertEqual(consultationBtn.href, 'mailto:test@example.com', 'Consultation button href should match');
});

// Test 6: Accepting patients badge
runner.test('Should show accepting patients badge when enabled', () => {
    const dom = new MockDOM();
    const config = { acceptingPatients: true };
    const controller = new TestMainPageController(config, dom);
    controller.applyHero();
    
    const badge = dom.getElementById('accepting-patients-badge');
    runner.assertEqual(badge.style.display, 'inline-block', 'Badge should be displayed');
    runner.assert(badge.className.includes('active'), 'Badge should have active class');
});

// Test 7: Accepting patients badge hidden
runner.test('Should hide accepting patients badge when disabled', () => {
    const dom = new MockDOM();
    const config = { acceptingPatients: false };
    const controller = new TestMainPageController(config, dom);
    controller.applyHero();
    
    const badge = dom.getElementById('accepting-patients-badge');
    runner.assertEqual(badge.style.display, 'none', 'Badge should be hidden');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestRunner, TestMainPageController, MockDOM };
} else {
    runner.run();
}

