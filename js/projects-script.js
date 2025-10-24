// =====================================
//   PROJECTS PAGE - WEB3 INTERACTIONS
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeProjectFilters();
    initializeStatsCounter();
    initializeProjectAnimations();
    initializeScrollEffects();
    
    console.log('%c🚀 Projects Page Initialized', 
        'color: #00d4ff; font-size: 16px; font-weight: bold; font-family: "Orbitron", sans-serif;');
});

// Project Filtering System
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.cyber-tab');
    const projectCards = document.querySelectorAll('.cyber-project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, cards) {
    cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
            card.style.display = 'block';
        } else {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
            setTimeout(() => {
                if (card.classList.contains('fade-out')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Global filter function (for backwards compatibility)
window.filterProjects = function(filter) {
    const buttons = document.querySelectorAll('.cyber-tab');
    const cards = document.querySelectorAll('.cyber-project-card');
    
    // Update active button
    buttons.forEach(btn => {
        const btnFilter = btn.getAttribute('data-filter');
        if (btnFilter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter projects
    filterProjects(filter, cards);
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
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        let displayValue = Math.floor(current);
        if (target >= 1000) {
            displayValue = formatNumber(displayValue);
        }
        if (target >= 50000) {
            displayValue = formatLargeNumber(displayValue);
        }
        
        element.textContent = displayValue;
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toString();
}

function formatLargeNumber(num) {
    if (num >= 50000) {
        return '50k+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toString();
}

// Project Card Animations
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll('.cyber-project-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and observe
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover sound effect (optional)
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle hover effect
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
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
    });
    
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

// Project Link Interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.demo-link')) {
        e.preventDefault();
        const link = e.target.closest('.demo-link');
        const projectCard = link.closest('.cyber-project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        
        // Show demo notification
        showDemoNotification(projectTitle);
    }
    
    if (e.target.closest('.github-link')) {
        // Add visual feedback for GitHub links
        const link = e.target.closest('.github-link');
        link.style.transform = 'scale(1.1)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    }
});

function showDemoNotification(projectTitle) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 212, 255, 0.1);
        border: 2px solid var(--accent-cyan);
        color: var(--accent-cyan);
        padding: 2rem;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        text-align: center;
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
        box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 1rem;">🚀 Project Demo</div>
        <div style="margin-bottom: 1.5rem;">${projectTitle}</div>
        <div style="font-size: 0.9rem; opacity: 0.8;">Demo will be available soon!</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            background: var(--accent-cyan);
            color: var(--primary-dark);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
        ">Close</button>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { 
                opacity: 0; 
                transform: translate(-50%, -50%) scale(0.8); 
            }
            to { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1); 
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 1-5 to filter projects
    const keyMap = {
        '1': 'all',
        '2': 'web',
        '3': 'python',
        '4': 'design',
        '5': 'frontend'
    };
    
    if (keyMap[e.key]) {
        e.preventDefault();
        filterProjects(keyMap[e.key]);
    }
    
    // Press 'Escape' to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('[style*="position: fixed"]');
        notifications.forEach(notification => {
            if (notification.textContent.includes('Demo')) {
                notification.remove();
            }
        });
    }
});

// Performance optimization
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

// Throttled scroll handler
const throttledScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Update navbar opacity based on scroll
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
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Console Easter Egg
setTimeout(() => {
    console.log('%c' + 
        '🎯 Projects Portfolio Loaded!\n' +
        '💡 Press 1-5 to filter projects\n' +
        '🔧 Built with Web3 cyber aesthetics\n' +
        '⚡ Featuring modern animations & interactions', 
        'color: #00d4ff; font-family: "Orbitron", monospace; font-size: 12px; line-height: 1.5;'
    );
}, 2000);