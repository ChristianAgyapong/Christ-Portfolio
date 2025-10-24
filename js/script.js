// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Web3 Cursor Effect
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Cursor hover effects
document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(2)';
        cursorOutline.style.borderColor = 'var(--neon-pink)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.borderColor = 'var(--primary-color)';
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Web3 effect on scroll - keeps glass morphism
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        // Enhanced glass effect when scrolled
        navbar.style.background = 'rgba(30, 41, 59, 0.9)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.37), 0 0 20px rgba(0, 212, 255, 0.2)';
        navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.3)';
    } else {
        // Original glass effect at top
        navbar.style.background = 'rgba(30, 41, 59, 0.7)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.37)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next role
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Start typing animation
typeRole();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Web3 About Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + (target === 100 ? '%' : target === 50 ? '+' : '+');
                }
            };
            
            updateCounter();
        });
    }
    
    // Animate Skill Meters
    function animateSkillMeters() {
        const meters = document.querySelectorAll('.meter-fill');
        
        meters.forEach(meter => {
            const width = meter.getAttribute('data-width');
            setTimeout(() => {
                meter.style.width = width + '%';
            }, 500);
        });
    }
    
    // Terminal Typing Effect
    function typeTerminalContent() {
        const codeLines = document.querySelectorAll('.code-line');
        
        codeLines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'typeIn 0.5s ease-out';
            }, index * 200);
        });
    }
    
    // Intersection Observer for About Section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger all animations
                    setTimeout(animateCounters, 500);
                    setTimeout(animateSkillMeters, 1000);
                    setTimeout(typeTerminalContent, 300);
                    
                    // Trigger stat card animations
                    const statCards = document.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = 'slideInUp 0.6s ease-out forwards';
                        }, index * 150);
                    });
                    
                    // Trigger holographic profile animation
                    const holoProfile = document.querySelector('.holo-profile');
                    if (holoProfile) {
                        setTimeout(() => {
                            holoProfile.style.animation = 'holoActivate 1s ease-out forwards';
                        }, 800);
                    }
                    
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        aboutObserver.observe(aboutSection);
    }
    
    // Interactive Stat Cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.stat-icon i');
            icon.style.transform = 'scale(1.2) rotateY(180deg)';
            icon.style.filter = 'drop-shadow(0 0 20px var(--primary-color))';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.stat-icon i');
            icon.style.transform = 'scale(1) rotateY(0deg)';
            icon.style.filter = 'none';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Old form submission handler removed - now using EmailJS below

// Smooth reveal animations
function revealElements() {
    const reveals = document.querySelectorAll('.timeline-content, .about-text, .project-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealElements);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .timeline-content,
    .about-text,
    .project-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .timeline-content.active,
    .about-text.active,
    .project-card.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize reveal on load
window.addEventListener('load', revealElements);

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) scale(1)';
    });
});

// Project card tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Navbar active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav link styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.getElementsByClassName('close')[0];
    const demoLinks = document.querySelectorAll('.demo-link');

    // Open modal when demo link is clicked
    demoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    // Check if EmailJS is available and configured
    const isEmailJSConfigured = typeof emailjs !== 'undefined' && 
                                 emailjs !== null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!formValues.from_name || !formValues.from_email || !formValues.message) {
                showFormStatus('error', 'Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formValues.from_email)) {
                showFormStatus('error', 'Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            contactForm.classList.add('loading');
            formStatus.style.display = 'none';
            
            if (isEmailJSConfigured) {
                // Try to send with EmailJS
                sendWithEmailJS(formValues);
            } else {
                // Fallback: Show message with contact info
                showFallbackMessage(formValues);
            }
        });
    }
    
    function sendWithEmailJS(formValues) {
        // Initialize EmailJS if not done
        if (!emailjs._userID) {
            emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
        }
        
        const templateParams = {
            from_name: formValues.from_name,
            from_email: formValues.from_email,
            subject: formValues.subject,
            message: formValues.message,
            to_email: 'christianagyapong2023@email.com'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                // Show fallback message instead of error
                showFallbackMessage(formValues);
            })
            .finally(function() {
                contactForm.classList.remove('loading');
            });
    }
    
    function showFallbackMessage(formValues) {
        const message = `
            <strong>Thanks for your message!</strong><br><br>
            Since EmailJS isn't configured yet, here's your message:<br><br>
            <strong>Name:</strong> ${formValues.from_name}<br>
            <strong>Email:</strong> ${formValues.from_email}<br>
            <strong>Subject:</strong> ${formValues.subject}<br>
            <strong>Message:</strong> ${formValues.message}<br><br>
            Please email me directly at: <strong>christianagyapong2023@email.com</strong>
        `;
        
        showFormStatus('success', '');
        formStatus.innerHTML = message;
        contactForm.reset();
        contactForm.classList.remove('loading');
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    // Add form styles dynamically
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .form-status {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            display: none;
        }
        
        .form-status.success {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            display: block;
        }
        
        .form-status.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            display: block;
        }
        
        .btn-loading {
            display: none;
        }
        
        .contact-form.loading .btn-text {
            display: none;
        }
        
        .contact-form.loading .btn-loading {
            display: inline-block;
        }
        
        .contact-form.loading .btn {
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    document.head.appendChild(formStyles);
});

// Web3 Scroll Indicator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about')?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Hide scroll indicator when scrolling
    window.addEventListener('scroll', () => {
        if (scrollIndicator) {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
});

// Web3 About Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animated typing effect for terminal
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.setProperty('--line-index', index);
    });
    
    // Contact field interactions
    const contactFields = document.querySelectorAll('.contact-field');
    contactFields.forEach(field => {
        field.addEventListener('click', function() {
            const fieldType = this.getAttribute('data-field');
            const fieldValue = this.querySelector('.field-value').textContent;
            
            if (fieldType === 'email') {
                // Copy email to clipboard
                navigator.clipboard.writeText(fieldValue).then(() => {
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.log('Failed to copy email: ', err);
                });
            }
        });
        
        // Add hover sound effect (optional)
        field.addEventListener('mouseenter', function() {
            // Subtle hover effect enhancement
            this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
        });
        
        field.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Terminal scan line animation enhancement
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
        // Add subtle glitch effect occasionally
        setInterval(() => {
            if (Math.random() < 0.08) { // 8% chance
                terminalContent.style.filter = 'blur(0.5px)';
                setTimeout(() => {
                    terminalContent.style.filter = 'none';
                }, 80);
            }
        }, 4000);
    }
    
    // Status indicator pulsing enhancement
    const statusDots = document.querySelectorAll('.status-dot');
    statusDots.forEach(dot => {
        setInterval(() => {
            dot.style.transform = 'scale(1.3)';
            dot.style.boxShadow = '0 0 15px var(--neon-green)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = '0 0 10px var(--neon-green)';
            }, 300);
        }, 2500);
    });
});