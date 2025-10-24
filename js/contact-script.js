/* ======================================
   CONTACT PAGE - WEB3 INTERACTIVE SCRIPT
   ====================================== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initHeroAnimations();
    initFormHandling();
    initFormAnimations();
    initScrollEffects();
    initParticles();
});

/* ================
   HERO ANIMATIONS
   ================ */
function initHeroAnimations() {
    // Animate stats counter
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

/* ================
   FORM HANDLING
   ================ */
function initFormHandling() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('.cyber-submit-btn');
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="btn-text"><i class="fas fa-spinner fa-spin"></i> Transmitting...</span>';
        submitButton.disabled = true;
        
        // Simulate API call
        try {
            await simulateFormSubmission(data);
            
            // Success state
            submitButton.innerHTML = '<span class="btn-text"><i class="fas fa-check"></i> Message Sent!</span>';
            formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thank you ${data.firstName}! Your message has been transmitted successfully.`;
            formStatus.style.color = '#22c55e';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
                formStatus.innerHTML = '';
            }, 3000);
            
        } catch (error) {
            // Error state
            submitButton.innerHTML = '<span class="btn-text"><i class="fas fa-exclamation-triangle"></i> Error</span>';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Transmission failed. Please try again.';
            formStatus.style.color = '#ef4444';
            
            setTimeout(() => {
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

function validateForm(data) {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Message length validation
    if (data.message.length < 10) {
        showNotification('Please provide more details about your project (minimum 10 characters).', 'error');
        return false;
    }
    
    return true;
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // 90% success rate for demo
            if (Math.random() > 0.1) {
                console.log('Form submitted successfully:', data);
                resolve();
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `cyber-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0, 212, 255, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ================
   FORM ANIMATIONS
   ================ */
function initFormAnimations() {
    const formFields = document.querySelectorAll('.cyber-form-group input, .cyber-form-group textarea, .cyber-form-group select');
    
    formFields.forEach(field => {
        // Focus animations
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Input validation feedback
        field.addEventListener('input', function() {
            if (this.required && this.value.trim() !== '') {
                this.style.borderColor = 'rgba(34, 197, 94, 0.5)';
            } else if (this.required) {
                this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
            }
        });
        
        // Real-time email validation
        if (field.type === 'email') {
            field.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                } else if (this.value) {
                    this.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                }
            });
        }
    });
}

/* ================
   SCROLL EFFECTS
   ================ */
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all contact cards and sections
    document.querySelectorAll('.cyber-contact-card, .availability-card, .social-contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            const cyberGrid = document.querySelector('.cyber-grid');
            const contactCube = document.querySelector('.contact-cube');
            
            if (cyberGrid) {
                cyberGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            if (contactCube) {
                const rotation = scrolled * 0.1;
                contactCube.style.transform = `rotateX(${rotation}deg) rotateY(${rotation}deg)`;
            }
        }
    }
}

/* ================
   PARTICLES EFFECT
   ================ */
function initParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.6)' : 'rgba(34, 197, 94, 0.6)'};
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        animation: floatParticle ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        filter: blur(1px);
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ================
   KEYBOARD SHORTCUTS
   ================ */
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contactForm');
        if (form) {
            form.requestSubmit();
        }
    }
});

/* ================
   CONTACT LINKS
   ================ */
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(0, 212, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple effect animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ================
   CONSOLE EASTER EGG
   ================ */
console.log('%c🚀 Contact Page Loaded!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cLooking to connect? Fill out the form above!', 'color: #22c55e; font-size: 14px;');
console.log('%cPro tip: Use Ctrl/Cmd + Enter to quickly submit the form!', 'color: #fff; font-size: 12px;');
