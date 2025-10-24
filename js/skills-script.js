// =====================================
//   SKILLS PAGE - WEB3 INTERACTIONS
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    initializeSkillTabs();
    initializeStatsCounter();
    initializeProgressBars();
    initializeScrollEffects();
    
    console.log('%c⚡ Skills Page Initialized', 
        'color: #00d4ff; font-size: 16px; font-weight: bold; font-family: "Orbitron", sans-serif;');
});

// Skill Tabs System
function initializeSkillTabs() {
    const tabButtons = document.querySelectorAll('.cyber-tab');
    const tabContents = document.querySelectorAll('.skill-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                    
                    // Reinitialize progress bars for newly visible content
                    setTimeout(() => {
                        animateProgressBars(content);
                    }, 100);
                }
            });
        });
    });
}

// Global function for backwards compatibility
window.showSkillTab = function(tabName) {
    const buttons = document.querySelectorAll('.cyber-tab');
    const contents = document.querySelectorAll('.skill-tab-content');
    
    buttons.forEach(btn => {
        const btnTab = btn.getAttribute('data-tab');
        if (btnTab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    contents.forEach(content => {
        if (content.id === tabName) {
            content.classList.add('active');
            setTimeout(() => {
                animateProgressBars(content);
            }, 100);
        } else {
            content.classList.remove('active');
        }
    });
};

// Animated Stats Counter
function initializeStatsCounter() {
    const statsElements = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                animateCounter(element, target);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statsElements.forEach(element => {
        observer.observe(element);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Progress Bars Animation
function initializeProgressBars() {
    const skillCards = document.querySelectorAll('.cyber-skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
    
    // Animate visible bars on load
    const activeTab = document.querySelector('.skill-tab-content.active');
    if (activeTab) {
        setTimeout(() => {
            animateProgressBars(activeTab);
        }, 500);
    }
}

function animateProgressBars(container) {
    const progressBars = container.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        // Update scroll indicator opacity
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - scrolled / 300);
            scrollIndicator.style.opacity = opacity;
        }
        
        // Update navbar opacity
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.8)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
    }, 10));
    
    // Smooth scroll for internal links
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
}

// Card Animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.cyber-skill-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Initialize card animations after page load
window.addEventListener('load', () => {
    setTimeout(initializeCardAnimations, 300);
});

// Skill Item Hover Effects
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.cyber-skill-item')) {
        const item = e.target.closest('.cyber-skill-item');
        const progressBar = item.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.filter = 'brightness(1.2)';
        }
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.cyber-skill-item')) {
        const item = e.target.closest('.cyber-skill-item');
        const progressBar = item.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.filter = 'brightness(1)';
        }
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Press 1-4 to switch tabs
    const keyMap = {
        '1': 'technical',
        '2': 'tools',
        '3': 'soft',
        '4': 'learning'
    };
    
    if (keyMap[e.key]) {
        e.preventDefault();
        showSkillTab(keyMap[e.key]);
    }
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Skill Card Interaction
document.addEventListener('click', function(e) {
    if (e.target.closest('.cyber-skill-card')) {
        const card = e.target.closest('.cyber-skill-card');
        
        // Add pulse effect
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 100);
    }
});

// Progress Bar Click to Show Percentage
document.addEventListener('click', function(e) {
    if (e.target.closest('.cyber-progress-bar')) {
        const progressBar = e.target.closest('.cyber-progress-bar');
        const skillItem = progressBar.closest('.cyber-skill-item');
        const percentage = skillItem.querySelector('.skill-percentage');
        
        if (percentage) {
            percentage.style.transform = 'scale(1.2)';
            percentage.style.color = 'var(--accent-green)';
            
            setTimeout(() => {
                percentage.style.transform = 'scale(1)';
                percentage.style.color = 'var(--accent-cyan)';
            }, 500);
        }
    }
});

// Console Easter Egg
setTimeout(() => {
    console.log('%c' + 
        '🎯 Skills Portfolio Loaded!\n' +
        '💡 Press 1-4 to switch skill tabs\n' +
        '🔧 Built with Web3 cyber aesthetics\n' +
        '⚡ Featuring animated progress bars', 
        'color: #00d4ff; font-family: "Orbitron", monospace; font-size: 12px; line-height: 1.5;'
    );
}, 2000);

// Auto-update progress bars on resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const activeTab = document.querySelector('.skill-tab-content.active');
        if (activeTab) {
            animateProgressBars(activeTab);
        }
    }, 250);
});

// Track skill views (optional analytics)
function trackSkillView(skillCategory) {
    console.log(`%cViewing: ${skillCategory} Skills`, 
        'color: #22c55e; font-weight: bold;');
}

// Initialize skill view tracking
document.querySelectorAll('.cyber-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const category = this.getAttribute('data-tab');
        trackSkillView(category);
    });
});