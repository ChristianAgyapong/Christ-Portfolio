# 🚀 Deployment Guide

This guide will help you deploy your portfolio website to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] All images are optimized and compressed
- [ ] All links are working correctly
- [ ] Contact form is tested
- [ ] Website is tested on multiple browsers
- [ ] Website is responsive on mobile devices
- [ ] All personal information is updated
- [ ] Social media links are correct
- [ ] README.md is complete

## 🌐 Deployment Options

### 1. GitHub Pages (Recommended)

**Pros:** Free, easy, automatic deployments
**Cons:** Public repositories only (for free tier)

**Steps:**
1. Push your code to GitHub
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. Go to your repository on GitHub
3. Click on **Settings** → **Pages**
4. Under "Source", select branch: `main` and folder: `/ (root)`
5. Click **Save**
6. Your site will be live at: `https://yourusername.github.io/repository-name`

**Custom Domain (Optional):**
1. Create a file named `CNAME` in the root directory
2. Add your domain name: `yourdomain.com`
3. Configure DNS records with your domain provider:
   - A record pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME record: `www` → `yourusername.github.io`

---

### 2. Netlify

**Pros:** Free, fast, automatic deployments, custom domains
**Cons:** Build minutes limited on free tier

**Steps:**
1. Sign up at [netlify.com](https://netlify.com)
2. Click **"New site from Git"**
3. Connect your GitHub/GitLab/Bitbucket account
4. Select your repository
5. Build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** (leave empty or use `/`)
6. Click **"Deploy site"**
7. Your site will be live with a random URL
8. Change site name in **Site settings** → **Change site name**

**Custom Domain:**
1. Go to **Domain settings** → **Add custom domain**
2. Follow the DNS configuration instructions

---

### 3. Vercel

**Pros:** Extremely fast, automatic deployments, preview URLs
**Cons:** Limited on free tier

**Steps:**
1. Sign up at [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your Git repository
4. Configure:
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Click **"Deploy"**
6. Your site will be live instantly

**Custom Domain:**
1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS with provided records

---

### 4. Firebase Hosting

**Pros:** Google infrastructure, fast, free SSL
**Cons:** Requires Firebase CLI setup

**Steps:**
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new
   - Public directory: `.` (root)
   - Configure as single-page app: No
   - Overwrite index.html: No

4. Deploy:
   ```bash
   firebase deploy
   ```

---

### 5. Azure Static Web Apps

**Pros:** Microsoft infrastructure, free SSL, CI/CD
**Cons:** Requires Azure account

**Steps:**
1. Sign up at [portal.azure.com](https://portal.azure.com)
2. Create a new **Static Web App**
3. Connect to your GitHub repository
4. Configure:
   - **App location:** `/`
   - **Api location:** (leave empty)
   - **Output location:** (leave empty)
5. Review and create
6. Deployment will start automatically

---

### 6. Cloudflare Pages

**Pros:** Fast CDN, free SSL, analytics
**Cons:** Limited build minutes on free tier

**Steps:**
1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click **"Create a project"**
3. Connect to GitHub
4. Select your repository
5. Configure:
   - **Production branch:** main
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
6. Click **"Save and Deploy"**

---

## 🔧 Build Optimization (Optional)

If you want to minify your CSS and JS for production:

### Using Node.js tools:

1. Install dependencies:
   ```bash
   npm install -g clean-css-cli uglify-js
   ```

2. Minify CSS:
   ```bash
   cleancss -o css/styles.min.css css/styles.css
   cleancss -o css/experience-custom.min.css css/experience-custom.css
   cleancss -o css/projects-custom.min.css css/projects-custom.css
   cleancss -o css/skills-custom.min.css css/skills-custom.css
   cleancss -o css/contact-custom.min.css css/contact-custom.css
   ```

3. Minify JavaScript:
   ```bash
   uglifyjs js/script.js -c -m -o js/script.min.js
   uglifyjs js/experience-script.js -c -m -o js/experience-script.min.js
   uglifyjs js/projects-script.js -c -m -o js/projects-script.min.js
   uglifyjs js/skills-script.js -c -m -o js/skills-script.min.js
   uglifyjs js/contact-script.js -c -m -o js/contact-script.min.js
   ```

4. Update HTML files to use `.min.css` and `.min.js` versions

---

## 📊 Performance Tips

1. **Image Optimization:**
   - Use WebP format for better compression
   - Compress images with tools like TinyPNG or ImageOptim
   - Use appropriate image sizes

2. **Lazy Loading:**
   - Add `loading="lazy"` to images
   - Load non-critical CSS asynchronously

3. **Caching:**
   - Most hosting platforms handle this automatically
   - For custom servers, set appropriate cache headers

4. **CDN:**
   - Use CDN for libraries (Font Awesome, Google Fonts)
   - Most hosting platforms provide CDN automatically

---

## 🔍 Testing Before Deployment

1. **Local Testing:**
   - Test on Chrome, Firefox, Safari, Edge
   - Test on mobile devices
   - Check all links and forms

2. **Performance Testing:**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Use [GTmetrix](https://gtmetrix.com/)

3. **Accessibility Testing:**
   - Use [WAVE](https://wave.webaim.org/)
   - Test with screen readers

---

## 🆘 Troubleshooting

### Issue: Images not loading
**Solution:** Check file paths are correct relative to HTML files

### Issue: Custom domain not working
**Solution:** Wait 24-48 hours for DNS propagation, check DNS records

### Issue: CSS/JS not loading
**Solution:** Clear browser cache, check file paths in HTML

### Issue: Form not working
**Solution:** Ensure form action and email service are properly configured

---

## 📚 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [W3C Validator](https://validator.w3.org/) - HTML validation
- [CSS Validator](https://jigsaw.w3.org/css-validator/) - CSS validation

---

## 🎉 Post-Deployment

After successful deployment:

1. Submit your site to search engines
2. Set up Google Analytics (optional)
3. Monitor performance regularly
4. Keep content updated
5. Respond to contact form submissions

---

**Need help?** Create an issue in the repository or contact via email!
