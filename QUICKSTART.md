# Quick Start Guide

## First-Time Setup (5 minutes)

### 1. Update Your Information

1. Open `admin.html` in your browser
2. Default password: `admin123`
3. Update the following fields:
   - **Display Name**: Your name and credentials
   - **Credentials Line**: Your specialization
   - **Tagline**: Your value proposition
   - **Profile Image URL**: URL to your professional photo
   - **Business Name**: Your business name (replace "dummyLLC")
   - **Contact Email**: Your business email
4. Click "Save Changes"

### 2. Add Your Profile Image

**Option A: Use an existing image URL**
- Upload your image to an image hosting service (Imgur, Cloudinary, etc.)
- Copy the image URL
- Paste it in the admin panel's "Profile Image URL" field

**Option B: Use a local image**
- Place your image in `assets/images/` folder
- Name it `profile.jpg` (or similar)
- Use the path: `assets/images/profile.jpg`

### 3. Customize Content (Optional)

Edit `index.html` directly to customize:
- About section text
- Expertise descriptions
- Approach items
- Footer text

### 4. Change Admin Password

**Important**: Change the default password before going live!

1. Open `assets/js/admin.js`
2. Find line: `this.password = 'admin123';`
3. Change to: `this.password = 'your-secure-password';`

### 5. Test Your Site

1. Open `index.html` in your browser
2. Verify all content displays correctly
3. Test on mobile device or resize browser window
4. Check admin panel functionality

## Deployment Checklist

- [ ] Updated all "dummyLLC" references to your business name
- [ ] Added your profile image
- [ ] Updated contact email
- [ ] Changed admin password
- [ ] Tested all functionality
- [ ] Verified mobile responsiveness
- [ ] Checked all links work

## Common Tasks

### Enable Urgent Banner

1. Go to admin panel
2. Check "Enable urgent banner"
3. Enter banner message
4. Select banner type (info/urgent/warning)
5. Save changes

### Change Theme

1. Go to admin panel
2. Select theme from dropdown
3. Save changes

### Toggle "Accepting New Patients"

1. Go to admin panel
2. Check/uncheck "Accepting new patients"
3. Save changes

## Troubleshooting

### Image Not Showing

- Verify image URL is correct and accessible
- Check browser console for errors
- Ensure image format is supported (JPG, PNG, SVG, WebP)

### Changes Not Appearing

- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check browser console for JavaScript errors

### Admin Panel Not Working

- Verify JavaScript is enabled in browser
- Check browser console for errors
- Ensure you're using a modern browser

## Next Steps

- Set up hosting (Cloudflare Pages, Netlify, etc.)
- Configure custom domain
- Set up analytics (Google Analytics, etc.)
- Consider adding contact form
- Plan for future enhancements

