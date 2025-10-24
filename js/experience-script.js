// ==========================================
// EXPERIENCE PAGE TAB FILTERING SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Tab Switching Functionality
    const tabs = document.querySelectorAll('.cyber-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Show corresponding content
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
            
            // Trigger animation for timeline items
            const timelineItems = activeContent.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `slideInRight 0.6s ease-out ${index * 0.1}s both`;
                }, 10);
            });
        }
    }
    
    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Initialize - Show first tab by default
    if (tabs.length > 0) {
        const firstTabId = tabs[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
    
    // Keyboard navigation for tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let targetIndex = index;
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetIndex = (index + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
                return;
            } else {
                return;
            }
            
            // Focus and activate the target tab
            tabs[targetIndex].focus();
            const targetTabId = tabs[targetIndex].getAttribute('data-tab');
            switchTab(targetTabId);
        });
    });
    
    // Enhanced hover effects for experience cards
    const experienceCards = document.querySelectorAll('.experience-card-cyber');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect to marker when hovering card
            const timelineItem = this.closest('.timeline-item');
            if (timelineItem) {
                const marker = timelineItem.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1.3)';
                    marker.style.borderColor = 'var(--neon-green)';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect from marker
            const timelineItem = this.closest('.timeline-item');
            if (timelineItem) {
                const marker = timelineItem.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1)';
                    marker.style.borderColor = 'var(--neon-blue)';
                }
            }
        });
        
        // Add click to navigate functionality
        card.addEventListener('click', function(e) {
            // Check if the click was on a portfolio link button
            if (e.target.closest('.portfolio-link')) {
                return; // Let the link handle the navigation
            }
            
            // Navigate to main page when clicking anywhere else on the card
            window.location.href = 'index.html';
        });
        
        // Add visual feedback for clickable cards
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'Click to view full portfolio');
    });
    
    // Certification cards animation
    const certCards = document.querySelectorAll('.cert-card-cyber');
    
    certCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.6s ease-out ${index * 0.15}s both`;
    });
    
    // Tech tag interaction
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const techName = this.textContent.trim();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: var(--neon-blue);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Optional: Log or perform action with tech name
            console.log(`Tech clicked: ${techName}`);
        });
    });
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(10);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Smooth scroll for internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.timeline-item, .cert-card-cyber').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Copy to clipboard functionality for tech tags (optional feature)
    techTags.forEach(tag => {
        tag.setAttribute('title', 'Click to copy');
        
        tag.addEventListener('dblclick', async function() {
            const text = this.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Show feedback
                const originalText = this.textContent;
                this.textContent = '✓ Copied!';
                this.style.background = 'var(--neon-green)';
                this.style.color = 'var(--bg-dark)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 1000);
            } catch (err) {
                console.log('Failed to copy text:', err);
            }
        });
    });
    
    // Add dynamic gradient to cyber-timeline based on scroll position
    const timeline = document.querySelector('.cyber-timeline::before');
    if (timeline) {
        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            // You could dynamically update the gradient here if needed
        });
    }
    
    // Cube rotation speed control on hover
    const cube = document.querySelector('.experience-cube');
    if (cube) {
        cube.addEventListener('mouseenter', function() {
            this.style.animationDuration = '10s';
        });
        
        cube.addEventListener('mouseleave', function() {
            this.style.animationDuration = '20s';
        });
        
        // Make cube faces clickable
        const cubeFaces = cube.querySelectorAll('.cube-face');
        cubeFaces.forEach(face => {
            face.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Get the face content to determine navigation
                const faceText = this.querySelector('span').textContent.toLowerCase();
                
                switch(faceText) {
                    case 'development':
                    case 'projects':
                    case 'innovation':
                        // Navigate to main portfolio
                        window.location.href = 'index.html#projects';
                        break;
                    case 'education':
                    case 'certificates':
                        // Switch to education/certification tab
                        const educationTab = document.querySelector('[data-tab="education"]');
                        if (educationTab) {
                            educationTab.click();
                        }
                        break;
                    case 'skills':
                        // Navigate to about page
                        window.location.href = 'about.html';
                        break;
                    default:
                        // Default to main portfolio
                        window.location.href = 'index.html';
                }
                
                // Add visual feedback
                this.style.background = 'rgba(0, 212, 255, 0.3)';
                setTimeout(() => {
                    this.style.background = '';
                }, 300);
            });
            
            // Add hover titles
            const faceText = face.querySelector('span').textContent;
            face.setAttribute('title', `Click to explore ${faceText}`);
        });
    }
    
    // Console greeting
    console.log('%c🚀 Experience Page Loaded - Web3 Edition', 
        'color: #00d4ff; font-size: 16px; font-weight: bold; font-family: "Orbitron", sans-serif;');
    console.log('%cTab switching: ✓\nAnimations: ✓\nInteractivity: ✓\nPortfolio Links: ✓', 
        'color: #22c55e; font-size: 12px;');
    
    // Add portfolio links to old format experience cards
    const oldFormatCards = document.querySelectorAll('.experience-card');
    oldFormatCards.forEach(card => {
        // Make old cards clickable too
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'Click to view full portfolio');
        
        // Add floating portfolio button
        const floatingBtn = document.createElement('div');
        floatingBtn.className = 'floating-portfolio-btn';
        floatingBtn.innerHTML = '<i class="fas fa-external-link-alt"></i>';
        floatingBtn.setAttribute('title', 'View Full Portfolio');
        card.style.position = 'relative';
        card.appendChild(floatingBtn);
        
        // Handle clicks
        const handlePortfolioClick = function(e) {
            e.stopPropagation();
            window.location.href = 'index.html';
        };
        
        card.addEventListener('click', handlePortfolioClick);
        floatingBtn.addEventListener('click', handlePortfolioClick);
        
        // Add hover effects to old cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Add floating buttons to cyber cards that don't have portfolio links
    const cyberCards = document.querySelectorAll('.experience-card-cyber');
    cyberCards.forEach(card => {
        // Check if card already has a portfolio link
        if (!card.querySelector('.portfolio-link')) {
            const floatingBtn = document.createElement('div');
            floatingBtn.className = 'floating-portfolio-btn';
            floatingBtn.innerHTML = '<i class="fas fa-briefcase"></i>';
            floatingBtn.setAttribute('title', 'View Full Portfolio');
            card.appendChild(floatingBtn);
            
            floatingBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = 'index.html';
            });
        }
    });
});

// Export functions for external use if needed
window.experiencePageUtils = {
    switchTab: function(tabId) {
        const tab = document.querySelector(`[data-tab="${tabId}"]`);
        if (tab) {
            tab.click();
        }
    },
    
    getTechStack: function() {
        const techTags = document.querySelectorAll('.tech-tag');
        return Array.from(techTags).map(tag => tag.textContent.trim());
    },
    
    getActiveTab: function() {
        const activeTab = document.querySelector('.cyber-tab.active');
        return activeTab ? activeTab.getAttribute('data-tab') : null;
    }
};
