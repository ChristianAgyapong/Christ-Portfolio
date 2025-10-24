# 🚀 Christian Agyapong - Web3 Developer Portfolio# Personal Portfolio Website



A modern, cyberpunk-themed portfolio website showcasing my skills, projects, and experience as a Full Stack Developer.A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. This website showcases your professional profile, skills, experience, and projects with a clean, contemporary design.



![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)## Features

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)- **Responsive Design**: Fully responsive layout that works on all devices

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)- **Modern UI/UX**: Clean, professional design with smooth animations

- **Interactive Elements**: Hover effects, typing animation, and scroll animations

## ✨ Features- **Smooth Navigation**: Smooth scrolling navigation with active link highlighting

- **Contact Form**: Functional contact form with validation

### 🎨 Web3 Cyberpunk Design- **Performance Optimized**: Fast loading and smooth animations

- Animated cyber grid backgrounds

- 3D rotating cubes and interactive elements## Sections

- Neon glow effects and smooth transitions

- Custom cursor effects throughout the site1. **Hero Section**: Eye-catching introduction with animated typing text

- Parallax scrolling animations2. **About Section**: Personal introduction with statistics

3. **Experience**: Timeline-based experience and education display

### 📱 Fully Responsive4. **Projects**: Showcase of featured projects with hover effects

- Mobile-first design approach5. **Skills**: Organized display of technical skills and technologies

- Optimized for all screen sizes6. **Contact**: Contact information and functional contact form

- Touch-friendly interactive elements

- Smooth animations on all devices## Technologies Used



### 🔥 Interactive Components- HTML5

- **Hero Section**: Animated stats counter with 3D visual elements- CSS3 (Flexbox, Grid, Animations)

- **Skills Page**: Interactive skill categories with animated progress bars- JavaScript (ES6+)

- **Projects Page**: Filterable project cards with live demos- Font Awesome Icons

- **Experience Page**: Timeline-based career history- Google Fonts (Inter)

- **Contact Page**: Encrypted-style contact form with real-time validation

## Customization

## 📂 Project Structure

To customize this website for your personal use:

```

Profile/1. **Personal Information**:

├── index.html              # Homepage   - Update your name in the `<title>` and throughout the HTML

├── about.html              # About Me page   - Replace placeholder email, phone, and location in the contact section

├── experience.html         # Work Experience page   - Update social media links

├── projects.html           # Projects Showcase page

├── skills.html             # Technical Skills page2. **Profile Content**:

├── contact.html            # Contact Form page   - Replace the hero image and about image with your photos

├── css/   - Update the about text with your personal story

│   ├── styles.css          # Global styles   - Modify the typing animation roles in `script.js`

│   ├── experience-custom.css

│   ├── projects-custom.css3. **Experience & Education**:

│   ├── skills-custom.css   - Update the timeline section with your actual experience

│   └── contact-custom.css   - Add your real job titles, companies, and descriptions

├── js/   - Update skills tags for each position

│   ├── script.js           # Global scripts

│   ├── experience-script.js4. **Projects**:

│   ├── projects-script.js   - Replace project images and information

│   ├── skills-script.js   - Update project links to your actual repositories/demos

│   └── contact-script.js   - Modify technology tags to match your projects

├── images/

│   ├── christian-photo.jpg5. **Skills**:

│   ├── academinc.jpg   - Update the skills sections with your actual technical skills

│   ├── graphic-design-certificate.jpg   - Add or remove skill categories as needed

│   ├── python-certificate.jpg   - Update icons to match your skill set

│   ├── movies.jpg

│   └── portfolio .jpg6. **Colors & Styling**:

└── docs/   - Modify CSS custom properties in `:root` for color scheme

    └── (Documentation files)   - Adjust fonts, spacing, and animations as desired

```

## File Structure

## 🚀 Quick Start

```

### Local DevelopmentPortfolio/

├── index.html          # Main HTML file

1. **Clone the repository**├── styles.css          # CSS styles and animations

   ```bash├── script.js           # JavaScript functionality

   git clone https://github.com/ChristianAgyapong/Christ-Portfolio.git└── README.md           # This file

   cd Christ-Portfolio```

   ```

## Setup

2. **Open in browser**

   - Simply open `index.html` in your preferred browser1. Clone or download the files

   - Or use a local server:2. Customize the content as described above

   ```bash3. Open `index.html` in a web browser to view locally

   # Using Python4. Deploy to your preferred hosting platform

   python -m http.server 8000

   ## Browser Support

   # Using Node.js (http-server)

   npx http-server- Chrome (latest)

   - Firefox (latest)

   # Using PHP- Safari (latest)

   php -S localhost:8000- Edge (latest)

   ```

## License

3. **View the site**

   - Navigate to `http://localhost:8000`This project is open source and available under the MIT License.

### Deployment

#### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`) and root folder
4. Click Save
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Click "Deploy site"
5. Your site will be live instantly

#### Vercel
1. Sign up at [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Click "Deploy"
5. Your site will be live in seconds

## 🎯 Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Modern JavaScript features
- **Font Awesome 6** - Icon library
- **Google Fonts** - Inter & Orbitron fonts

### Features & Libraries
- **Intersection Observer API** - Scroll animations
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Custom Properties** - Theme consistency
- **LocalStorage** - User preferences (if applicable)

## 🎨 Customization

### Colors
Edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a202c;
    --text-secondary: #718096;
}
```

### Content
- Update personal information in each HTML file
- Replace images in the `images/` folder
- Modify project details in `projects.html`
- Update skills in `skills.html`

### Fonts
Change fonts in HTML `<head>` sections or CSS:
```css
font-family: 'Inter', sans-serif;
font-family: 'Orbitron', sans-serif;
```

## 📊 Performance

- ✅ Optimized images
- ✅ Minified CSS/JS (for production)
- ✅ Lazy loading for images
- ✅ Efficient animations using CSS transforms
- ✅ Minimal external dependencies

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

**Christian Agyapong**
- 📧 Email: christianagyapong2023@email.com
- 💼 LinkedIn: [linkedin.com/in/christian-agyapong](https://linkedin.com/in/christian-agyapong)
- 🐙 GitHub: [github.com/ChristianAgyapong](https://github.com/ChristianAgyapong)
- 📍 Location: Accra-Newtown, Ghana

## 🌟 Features Roadmap

- [ ] Dark/Light theme toggle
- [ ] Blog section
- [ ] Testimonials section
- [ ] Project search functionality
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1)

## 📸 Screenshots

### Homepage
![Homepage Screenshot](screenshots/homepage.png)

### Projects
![Projects Screenshot](screenshots/projects.png)

### Skills
![Skills Screenshot](screenshots/skills.png)

### Contact
![Contact Screenshot](screenshots/contact.png)

---

⭐ **If you like this portfolio, please give it a star!**

Made with ❤️ by Christian Agyapong
