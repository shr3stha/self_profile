# FNP Profile Site - Static Website for Family Nurse Practitioner

A lightweight, fast-loading static website for a Family Nurse Practitioner specializing in kidney disease care. Features a public profile page and a simple admin interface for content management without requiring code changes.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [Customization](#customization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Code Quality](#code-quality)
- [Design System](#design-system)
- [Browser Support](#browser-support)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Features

- **Static Site Architecture**: Pure HTML/CSS/JavaScript for maximum performance and SEO
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Admin Panel**: Simple password-protected admin interface for non-technical users
- **Theme Support**: Multiple seasonal themes (default, winter, spring, autumn)
- **Configurable Content**: All key content editable through admin panel without code changes
- **Healthcare-Focused Design**: Trust-building color scheme and professional layout
- **Comprehensive Tests**: Full test suite covering all core functionality
- **Performance Optimized**: Minimal JavaScript, fast load times, edge-ready

### Technical Features

- **localStorage-based Configuration**: Client-side configuration persistence
- **Modular JavaScript**: Clean separation of concerns (SOLID principles)
- **Error Handling**: Graceful fallbacks for missing images and data
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
- **SEO Friendly**: Proper meta tags, semantic structure, fast loading

## Project Structure

```
.
├── index.html                  # Main public profile page
├── admin.html                  # Admin interface for content management
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet with theme support and CSS variables
│   ├── js/
│   │   ├── config.js          # Configuration management module (Singleton pattern)
│   │   ├── main.js            # Main page controller (applies config to DOM)
│   │   └── admin.js           # Admin page controller (form handling & validation)
│   └── images/
│       └── placeholder-profile.svg  # SVG placeholder profile image
├── tests/
│   ├── config.test.js         # Unit tests for ConfigManager
│   ├── main.test.js           # Unit tests for MainPageController
│   ├── admin.test.js          # Unit tests for AdminController
│   └── run-tests.html         # Browser-based test runner UI
├── package.json               # Node.js dependencies and scripts
├── .gitignore                 # Git ignore patterns
├── README.md                  # This comprehensive documentation
└── QUICKSTART.md              # Quick setup guide for first-time users
```

## Architecture

### Design Patterns

The codebase follows several design patterns:

1. **Singleton Pattern**: `ConfigManager` ensures a single source of truth for configuration
2. **Module Pattern**: Each JavaScript file is a self-contained module
3. **MVC-like Structure**: Separation between data (config), view (HTML), and controller (JS)

### Code Organization

```
assets/js/
├── config.js      # Data layer - Configuration persistence
├── main.js        # View controller - Applies config to public page
└── admin.js       # Admin controller - Handles admin form logic
```

### Data Flow

```
Admin Form → admin.js → ConfigManager → localStorage
                                          ↓
                                    main.js → DOM Updates
```

### Key Classes

#### ConfigManager (`config.js`)

- `load()`: Loads configuration from localStorage or returns defaults
- `save(config)`: Saves configuration to localStorage
- `update(updates)`: Updates specific configuration fields
- `reset()`: Resets configuration to defaults

#### MainPageController (`main.js`)

- `init()`: Initializes page with configuration
- `applyBanner()`: Shows/hides urgent banner
- `applyTheme()`: Applies selected theme
- `applyHero()`: Updates hero section content
- `applyContact()`: Updates contact information

#### AdminController (`admin.js`)

- `setupPasswordProtection()`: Handles admin authentication
- `loadConfigIntoForm()`: Populates form with current config
- `saveConfig()`: Validates and saves form data
- `validateFormData()`: Validates required fields and formats

## Getting Started

### Prerequisites

- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Local Web Server**: For testing (Node.js, Python, PHP, or any static server)
- **Text Editor**: VS Code, Sublime Text, or any code editor
- **Git** (optional): For version control

### Installation

1. **Clone or download the repository**:

   ```bash
   git clone <repository-url>
   cd self_profile
   ```

2. **Install dependencies** (optional, for local development):

   ```bash
   npm install
   ```

   This installs `http-server` for local testing.

3. **Verify file structure**:
   Ensure all files from the project structure are present.

### Running Locally

#### Option 1: Using npm (Recommended)

```bash
npm run serve
```

This starts a local server at `http://localhost:8080` and opens it in your browser.

#### Option 2: Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then navigate to `http://localhost:8000`

#### Option 3: Using PHP

```bash
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

#### Option 4: Using Node.js http-server directly

```bash
npx http-server . -p 8080 -o
```

### Accessing the Site

- **Main Site**: `http://localhost:8080/index.html` or `http://localhost:8080/`
- **Admin Panel**: `http://localhost:8080/admin.html`

### Default Admin Password

The default admin password is `admin123`.

**⚠️ IMPORTANT SECURITY NOTE**:

Since GitHub Pages is a static hosting service, the password in `admin.js` is just a front-door convenience check—it's **not real security**. The password is stored in frontend JavaScript code and can be viewed by anyone who inspects the page source.

**This is suitable for:**

- Personal/non-sensitive marketing sites
- Sites where the admin panel is just a convenience feature
- Development and testing environments

**NOT suitable for:**

- Sites handling sensitive patient data
- Sites requiring real authentication
- Production sites with security requirements

**For production use**, you should:

- Replace this with server-side authentication
- Use a backend API for configuration management
- Implement proper access controls

To change the password, edit `assets/js/admin.js`:

```javascript
// Line ~12 in admin.js
this.password = "your-secure-password-here";
```

## Usage Guide

### Admin Panel Usage

1. **Access Admin Panel**:

   - Navigate to `/admin.html`
   - Enter the admin password
   - Click "Access Admin"

2. **Configure Site Settings**:

   **Urgent Banner**:

   - Toggle "Enable urgent banner" checkbox
   - Enter banner message text
   - Select banner type:
     - `Info` (Blue) - General announcements
     - `Urgent` (Red) - Important notices
     - `Warning` (Orange) - Warnings or closures

   **Theme Selection**:

   - Choose from dropdown:
     - `Default` - Professional blue/teal
     - `Winter` - Cool blues with subtle winter feel
     - `Spring` - Softer green accent
     - `Autumn` - Muted warm accent

   **Hero/Profile Section**:

   - **Profile Image URL**: Full URL to your profile image
   - **Display Name**: Your name and credentials (e.g., "Jane Doe, FNP")
   - **Credentials Line**: Your specialization description
   - **Tagline**: Your value proposition (one sentence)
   - **Accepting New Patients**: Checkbox to show/hide badge
   - **Availability Status**: Text describing your availability (e.g., "Limited appointments available Friday–Sunday, 9:00 AM–5:00 PM.")

   **Contact Information**:

   - **Business Name**: Your practice/business name
   - **Location**: Your location and service area
   - **Contact Email**: Your business email address

3. **Save Changes**:
   - Click "Save Changes" button
   - Success message will appear
   - Changes are immediately saved to localStorage
   - Refresh `index.html` to see changes

### Configuration Storage

The site uses browser `localStorage` to store configuration:

- **Storage Key**: `fnp-site-config`
- **Format**: JSON string
- **Persistence**: Survives browser restarts
- **Scope**: Per browser/device (not synced across devices)

**Limitations**:

- Configuration is browser-specific
- Not synced across devices
- Can be cleared by user clearing browser data

**Future Enhancement**: Migrate to backend API for multi-device sync.

### Configuration Schema

```javascript
{
  "heroName": "Jane Doe, FNP",
  "heroCredentials": "Family Nurse Practitioner specializing in chronic kidney disease and hypertension management",
  "heroTagline": "Helping adults with chronic kidney disease, high blood pressure, and diabetes protect their kidney function...",
  "profileImageUrl": "assets/images/placeholder-profile.svg",
  "acceptingPatients": false,
  "availabilityStatus": "Limited appointments available Friday–Sunday, 9:00 AM–5:00 PM.",
  "bannerEnabled": false,
  "bannerText": "",
  "bannerType": "info",
  "theme": "default",
  "businessName": "dummyLLC",
  "location": "Bel Air, Maryland (serving surrounding communities)",
  "contactEmail": "contact@dummyllc.com"
}
```

## Customization

### Adding Your Profile Image

**Option 1: External URL**

1. Upload image to image hosting service (Imgur, Cloudinary, AWS S3, etc.)
2. Copy the image URL
3. Paste in admin panel's "Profile Image URL" field

**Option 2: Local Image**

1. Add image file to `assets/images/` directory
2. Use relative path: `assets/images/your-image.jpg`
3. Enter path in admin panel

**Supported Formats**: JPG, PNG, SVG, WebP, GIF

**Recommended Size**: 300x300px to 600x600px, square aspect ratio

### Customizing Colors

Edit CSS variables in `assets/css/styles.css`:

```css
:root {
  --primary-color: #1f4e79; /* Main brand color - Navy blue */
  --accent-color: #3baa9a; /* Accent color - Muted teal */
  --background-color: #f7f9fb; /* Background - Off-white */
  --text-color: #333; /* Main text color */
  --text-light: #666; /* Secondary text color */
  --white: #ffffff; /* White */
  --border-color: #e0e0e0; /* Border color */
}
```

### Customizing Themes

Themes are defined in `assets/css/styles.css`:

```css
body.theme-winter {
  --accent-color: #5b9bd5;
}

body.theme-winter .hero {
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
}
```

To add a new theme:

1. Add CSS class `body.theme-yourtheme`
2. Override CSS variables
3. Add option to admin panel dropdown

### Updating Static Content

For content not editable through admin panel, edit `index.html`:

- **About Section**: Lines ~80-95
- **Expertise Cards**: Lines ~100-120
- **Approach Items**: Lines ~125-145
- **Disclaimer Text**: Lines ~160-165

### Adding New Sections

1. Add HTML structure to `index.html`
2. Add corresponding styles to `assets/css/styles.css`
3. Optionally add configuration options to admin panel
4. Update `main.js` to apply configuration if needed

## Testing

### Running Tests

#### Browser-based Tests (Recommended)

1. Open `tests/run-tests.html` in your browser
2. Click "Run" buttons for each test suite:
   - Config Manager Tests
   - Main Page Controller Tests
   - Admin Controller Tests
3. Review test output in the test output areas

#### Command Line Tests

```bash
# Run all tests
npm test

# Run individual test files (requires Node.js test runner)
node tests/config.test.js
node tests/main.test.js
node tests/admin.test.js
```

### Test Coverage

#### Config Manager Tests (`config.test.js`)

- ✅ Default config loading
- ✅ Config saving
- ✅ Config loading with stored data
- ✅ Config updates
- ✅ Config reset
- ✅ Partial config merge

#### Main Page Controller Tests (`main.test.js`)

- ✅ Banner application when enabled
- ✅ Banner hidden when disabled
- ✅ Theme application
- ✅ Default theme handling
- ✅ Hero content application
- ✅ Accepting patients badge display
- ✅ Accepting patients badge hidden

#### Admin Controller Tests (`admin.test.js`)

- ✅ Valid form data validation
- ✅ Missing hero name rejection
- ✅ Missing contact email rejection
- ✅ Invalid email format rejection
- ✅ Valid email format acceptance
- ✅ Form data sanitization (trimming)
- ✅ Empty string handling

### Writing New Tests

Tests follow a simple pattern:

```javascript
runner.test('Test description', () => {
    // Setup
    const testData = { ... };

    // Execute
    const result = functionUnderTest(testData);

    // Assert
    runner.assert(result === expected, 'Error message');
    runner.assertEqual(result, expected, 'Error message');
});
```

## Deployment

### Pre-Deployment Checklist

#### Content Updates

- [ ] Replace "dummyLLC" with your actual business name in:

  - [ ] `index.html` (logo, footer, contact section)
  - [ ] `admin.html` (admin header)
  - [ ] `assets/js/config.js` (default config)
  - [ ] `README.md` (throughout documentation)
  - [ ] `QUICKSTART.md` (if present)

- [ ] Update personal information:

  - [ ] Replace "Jane Doe, FNP" with your actual name and credentials
  - [ ] Update credentials in About section (`index.html`)
  - [ ] Update hero credentials line
  - [ ] Update tagline with your value proposition
  - [ ] Add your actual location and service area
  - [ ] Update contact email address

- [ ] Add your profile image:

  - [ ] Upload professional photo to `assets/images/` or external hosting
  - [ ] Update profile image URL in admin panel or `config.js`

- [ ] Review and customize content:
  - [ ] About section text (if needed)
  - [ ] Expertise descriptions
  - [ ] Approach section
  - [ ] Availability status text
  - [ ] Disclaimer text (ensure compliance with local regulations)

#### Security & Configuration

- [ ] Change admin password in `assets/js/admin.js` (line ~11)
- [ ] Review security considerations section in README
- [ ] Verify all form validations work correctly
- [ ] Test admin panel functionality

#### Testing

- [ ] Test all functionality locally:

  - [ ] Main page loads correctly
  - [ ] Admin panel accessible with password
  - [ ] Configuration saves and applies correctly
  - [ ] All themes work
  - [ ] Banner functionality works
  - [ ] Contact links work (mailto:)
  - [ ] Profile image displays correctly

- [ ] Cross-browser testing:

  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile browsers (iOS Safari, Chrome Mobile)

- [ ] Responsive design verification:

  - [ ] Desktop (1920x1080, 1366x768)
  - [ ] Tablet (768x1024)
  - [ ] Mobile (375x667, 414x896)

- [ ] Performance check:
  - [ ] Page load time < 2 seconds
  - [ ] Images optimized
  - [ ] No console errors

#### Deployment Preparation

- [ ] Choose hosting provider (GitHub Pages recommended)
- [ ] Set up Git repository (if not already done)
- [ ] Review GitHub Pages deployment steps
- [ ] Plan custom domain (if applicable)
- [ ] Prepare DNS records (if using custom domain)

#### Post-Deployment

- [ ] Verify site loads at deployment URL
- [ ] Test admin panel on live site
- [ ] Verify HTTPS is enabled
- [ ] Test all links and forms
- [ ] Check mobile responsiveness on actual devices
- [ ] Set up analytics (optional)
- [ ] Share site URL with stakeholders

### Recommended Hosting Providers

#### Cloudflare Pages (Recommended)

- **Free tier**: Unlimited sites, unlimited bandwidth
- **Features**: Global CDN, automatic HTTPS, Git integration
- **Setup**: Connect GitHub repo, auto-deploy on push

#### Netlify

- **Free tier**: 100GB bandwidth, 300 build minutes/month
- **Features**: Drag-and-drop deploy, form handling, Git integration
- **Setup**: Connect Git repo or drag-and-drop files

#### GitHub Pages

- **Free tier**: Free for public repos
- **Features**: Integrated with GitHub, custom domains
- **Setup**: Enable in repository settings

#### Vercel

- **Free tier**: Unlimited personal projects
- **Features**: Excellent performance, automatic HTTPS
- **Setup**: Connect Git repo or use CLI

### Deployment Steps

#### GitHub Pages (Recommended)

1. **Prepare Repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages**:

   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in left sidebar)
   - Under "Source", select:
     - Branch: `main`
     - Folder: `/` (root)
   - Click **Save**

3. **Access Your Site**:

   - Your site will be available at: `https://<username>.github.io/<repository-name>/`
   - For a user site, rename repository to `<username>.github.io` to get `https://<username>.github.io/`
   - GitHub will show the URL once deployment completes (usually within minutes)

4. **Update Paths** (if using project site with `/repository-name/` prefix):

   - If your site is at `https://username.github.io/repository-name/`, update relative paths:
   - Change `href="admin.html"` to `href="/repository-name/admin.html"` OR
   - Use absolute paths: `href="/repository-name/admin.html"`
   - Update asset paths in CSS/JS if needed

5. **Configure Custom Domain** (optional):
   - In repository Settings → Pages
   - Add your custom domain
   - Update DNS records as instructed by GitHub

#### Cloudflare Pages

1. **Prepare Repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy**:

   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your Git repository
   - Set build command: (leave empty for static site)
   - Set output directory: `/` (root)
   - Click "Save and Deploy"

3. **Configure Custom Domain** (optional):
   - Go to project settings
   - Add custom domain
   - Update DNS records as instructed

#### Netlify

1. **Via Git**:

   - Connect repository to Netlify
   - Build command: (leave empty)
   - Publish directory: `/` (root)
   - Deploy

2. **Via Drag-and-Drop**:
   - Zip all project files
   - Drag to Netlify dashboard
   - Site is live instantly

### Post-Deployment

1. **Verify HTTPS**: Ensure site loads with HTTPS
2. **Test Admin Panel**: Verify admin panel works
3. **Mobile Testing**: Test on actual mobile devices
4. **Performance**: Check load times (should be < 1 second)
5. **SEO**: Verify meta tags and structure
6. **Analytics**: Consider adding Google Analytics or similar

## Code Quality

### Design Principles

This project follows software engineering best practices:

#### SOLID Principles

- **Single Responsibility Principle (SRP)**:

  - `ConfigManager`: Handles only configuration persistence (no DOM manipulation)
  - `MainPageController`: Handles only DOM updates for main page (no admin logic)
  - `AdminController`: Handles only admin form logic (no main page updates)
  - Each class has one reason to change, making code easier to understand and maintain

- **Open/Closed Principle (OCP)**:

  - Themes can be extended by adding new CSS classes without modifying existing theme code
  - Configuration schema can be extended without breaking existing functionality
  - New admin fields can be added without changing core controller logic

- **Liskov Substitution Principle (LSP)**:

  - `ConfigManager` can be replaced with API-based implementation without breaking controllers
  - Controllers follow consistent initialization pattern, interchangeable

- **Interface Segregation Principle (ISP)**:

  - Clean, focused interfaces for each module
  - No forced dependencies on unused methods
  - Controllers only depend on what they need from `ConfigManager`

- **Dependency Inversion Principle (DIP)**:
  - Controllers depend on `ConfigManager` abstraction, not concrete implementation
  - Easy to swap localStorage implementation with API-based version
  - No hardcoded dependencies

#### KISS (Keep It Simple, Stupid)

- Simple, straightforward implementation without over-engineering
- No unnecessary abstractions or design patterns
- Easy to understand for developers at all levels
- Minimal dependencies (pure JavaScript, no heavy frameworks)
- Direct DOM manipulation where appropriate (no virtual DOM overhead)

#### DRY (Don't Repeat Yourself)

- Configuration management centralized in single `ConfigManager` class
- Reusable DOM update patterns in controllers
- Shared CSS variables for consistent theming
- Consistent error handling patterns across modules
- Single source of truth for default configuration

#### YAGNI (You Aren't Gonna Need It)

- Only features needed for MVP included
- No premature optimization or abstraction
- No unused code or commented-out features
- Focus on current requirements, not future possibilities
- Simple solutions preferred over complex ones

#### Clean Code Practices

- **Meaningful Names**: Descriptive variable and function names (`applyBanner`, `loadConfigIntoForm`)
- **Small Functions**: Each function does one thing well (SRP applied at function level)
- **Comments**: JSDoc-style comments for public APIs, inline comments for complex logic
- **Error Handling**: Graceful fallbacks and meaningful error messages
- **Consistent Style**: Uniform code formatting and structure throughout
- **No Magic Numbers**: Configuration values stored in named constants

### Code Style

- **JavaScript**: ES6+ features, modern syntax
- **CSS**: CSS Variables for theming, BEM-like naming
- **HTML**: Semantic HTML5, accessibility-focused
- **Comments**: JSDoc-style comments for functions
- **Naming**: Descriptive, camelCase for variables, PascalCase for classes

### File Organization

- **Separation of Concerns**: HTML (structure), CSS (presentation), JS (behavior)
- **Modular Design**: Each JS file is self-contained with IIFE for scope isolation
- **Reusability**: `ConfigManager` singleton can be used across all pages
- **Maintainability**: Clear structure, easy to modify and extend
- **Low Coupling**: Modules interact through well-defined interfaces
- **High Cohesion**: Related functionality grouped together logically

### Architecture Patterns

- **Singleton Pattern**: `ConfigManager` ensures single source of truth for configuration
- **Module Pattern**: Self-contained modules with IIFE for scope isolation
- **MVC-like Structure**: Separation between data (config), view (HTML), and controller (JS)
- **Observer Pattern**: DOM updates react to configuration changes

### Code Quality Metrics

- **Test Coverage**: Core functionality covered by comprehensive test suite
- **No Code Smells**: No duplicated code, long methods, or complex conditionals
- **Readability**: Code is self-documenting with clear naming
- **Maintainability**: Easy to modify without breaking existing functionality

## Design System

### Color Palette

The site uses a healthcare-focused color palette:

- **Primary Blue** (#1F4E79):
  - Trust, professionalism, cleanliness
  - Used for headers, buttons, links
- **Accent Teal** (#3BAA9A):
  - Health, balance, calm
  - Used for accents, badges, highlights
- **Background** (#F7F9FB):
  - Clean, light, approachable
  - Used for page background
- **Text Colors**:
  - Primary: #333 (dark gray)
  - Secondary: #666 (medium gray)

### Typography

- **Headings**: Poppins (Google Fonts)
  - Weights: 400 (regular), 600 (semi-bold), 700 (bold)
- **Body**: System fonts
  - `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Fast loading, native feel

### Layout

- **Container Width**: Max 1200px, centered
- **Spacing**: Consistent 1rem, 2rem, 4rem scale
- **Grid System**: CSS Grid for responsive layouts
- **Breakpoints**: Mobile-first, 768px breakpoint

### Components

- **Buttons**: Primary style with hover effects
- **Cards**: Subtle shadow, hover lift effect
- **Banner**: Full-width, color-coded by type
- **Badge**: Rounded, color-coded status indicator

## Browser Support

### Supported Browsers

- **Chrome/Edge**: Latest 2 versions ✅
- **Firefox**: Latest 2 versions ✅
- **Safari**: Latest 2 versions ✅
- **Mobile Browsers**:
  - iOS Safari (latest) ✅
  - Chrome Mobile (latest) ✅
  - Samsung Internet (latest) ✅

### Features Used

- **CSS Variables**: Supported in all modern browsers
- **localStorage**: Supported in all modern browsers
- **ES6+ JavaScript**: Transpiled if needed (currently not required)
- **CSS Grid**: Supported in all modern browsers
- **Flexbox**: Supported in all modern browsers

### Fallbacks

- Missing images: Fallback to placeholder SVG
- localStorage unavailable: Uses default configuration
- JavaScript disabled: Basic HTML structure still visible

## Security

### Current Security Measures

- **Password Protection**: Admin panel requires password
- **Input Validation**: Form data validated before saving
- **XSS Prevention**: Content sanitized, no innerHTML with user input
- **HTTPS Ready**: Works with HTTPS (required in production)

### Security Considerations

⚠️ **Important Security Notes**:

1. **Admin Password**: Currently stored in frontend code. This is **not secure** for production.

   - **Solution**: Implement server-side authentication
   - **Temporary**: Use strong password, change regularly

2. **localStorage**: Not encrypted, can be accessed by any script on the page.

   - **Risk**: Low (only configuration data, no sensitive info)
   - **Solution**: For sensitive data, use backend API

3. **HTTPS**: Always use HTTPS in production.
   - Prevents man-in-the-middle attacks
   - Required for modern web features
   - Most hosting providers enable automatically

### Recommended Security Enhancements

- [ ] Server-side admin authentication
- [ ] Rate limiting on admin panel
- [ ] CSRF protection for admin actions
- [ ] Content Security Policy (CSP) headers
- [ ] Input sanitization for all user inputs
- [ ] Regular security audits

## Troubleshooting

### Common Issues

#### Image Not Showing

**Symptoms**: Profile image doesn't display

**Solutions**:

1. Check image URL is correct and accessible
2. Verify image format is supported (JPG, PNG, SVG, WebP)
3. Check browser console for CORS errors
4. Ensure image URL is absolute or correct relative path
5. Check image file size (should be < 2MB)

#### Changes Not Appearing

**Symptoms**: Admin changes don't show on main page

**Solutions**:

1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for JavaScript errors
4. Verify localStorage is enabled in browser
5. Check that config was saved (open browser DevTools → Application → Local Storage)

#### Admin Panel Not Loading

**Symptoms**: Admin panel shows blank or errors

**Solutions**:

1. Check browser console for errors
2. Verify JavaScript is enabled
3. Check all files are present (config.js, admin.js)
4. Try different browser
5. Clear browser cache and cookies

#### Theme Not Applying

**Symptoms**: Theme selection doesn't change appearance

**Solutions**:

1. Hard refresh browser
2. Check theme CSS classes are defined in styles.css
3. Verify body element has theme class applied
4. Check browser console for CSS errors

#### localStorage Not Working

**Symptoms**: Configuration doesn't persist

**Solutions**:

1. Check browser supports localStorage
2. Verify localStorage is enabled (not blocked)
3. Check storage quota (localStorage has ~5-10MB limit)
4. Try incognito/private mode (some extensions block localStorage)

### Debugging Tips

1. **Browser DevTools**:

   - F12 to open
   - Console tab: JavaScript errors
   - Application tab: localStorage contents
   - Network tab: Failed resource loads

2. **Check Configuration**:

   ```javascript
   // In browser console
   JSON.parse(localStorage.getItem("fnp-site-config"));
   ```

3. **Reset Configuration**:
   ```javascript
   // In browser console
   localStorage.removeItem("fnp-site-config");
   ```

## Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Write/update tests
5. Test your changes: `npm test`
6. Commit: `git commit -m "Add your feature"`
7. Push: `git push origin feature/your-feature`
8. Create Pull Request

### Code Standards

- Follow existing code style
- Write tests for new features
- Update documentation
- Keep commits atomic and descriptive
- Follow SOLID principles

## License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Quick Links

- [Quick Start Guide](QUICKSTART.md) - Get started in 5 minutes
- [Admin Panel](./admin.html) - Content management interface
- [Test Suite](./tests/run-tests.html) - Run tests in browser

## Support

For issues, questions, or contributions:

- Check [Troubleshooting](#troubleshooting) section
- Review code comments for implementation details
- Create an issue in the repository

---

**Note**: Remember to replace "dummyLLC" with your actual business name throughout the codebase before deployment. See the [Pre-Deployment Checklist](#pre-deployment-checklist) for a complete list of items to update.

---

## Code Quality Summary

This codebase demonstrates:

✅ **SOLID Principles**: Each class has single responsibility, open for extension  
✅ **KISS**: Simple, straightforward implementation without over-engineering  
✅ **DRY**: Centralized configuration, reusable patterns, no duplication  
✅ **YAGNI**: Only MVP features, no premature optimization  
✅ **Clean Code**: Well-commented, readable, maintainable, testable

The architecture is designed to be:

- **Easy to understand** for developers at all levels
- **Easy to modify** without breaking existing functionality
- **Easy to test** with clear separation of concerns
- **Easy to extend** with new features or themes
