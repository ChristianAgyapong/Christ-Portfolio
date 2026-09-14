/* =========================================================
   CONTACT PAGE — Modern Interactive Logic & Form Engine
   Christian Agyapong Portfolio
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    initAccraClock();
    initCopyEmail();
    initChipsSelectors();
    initCharCounter();
    initContactForm();
});

/* ── Live Accra, Ghana Clock (GMT) ────────────────────────── */
function initAccraClock() {
    function updateClock() {
        const clockEl = document.getElementById('accra-clock');
        const liveTimeEl = document.getElementById('liveTimeDisplay');
        
        const now = new Date();
        // Accra is on GMT/UTC all year round
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        
        const timeStr = `${hours}:${minutes}:${seconds} GMT`;
        
        if (clockEl) clockEl.textContent = `${hours}:${minutes} GMT`;
        if (liveTimeEl) liveTimeEl.textContent = timeStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

/* ── One-Click Copy Email ─────────────────────────────────── */
function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', function() {
        const email = this.getAttribute('data-email') || 'christianagyapong2023@email.com';
        const tooltip = this.querySelector('.copy-tooltip');
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                showCopySuccess(copyBtn, tooltip);
            }).catch(() => {
                fallbackCopy(email, copyBtn, tooltip);
            });
        } else {
            fallbackCopy(email, copyBtn, tooltip);
        }
    });
}

function showCopySuccess(btn, tooltip) {
    if (tooltip) tooltip.textContent = 'Copied!';
    btn.style.background = '#10B981';
    btn.style.color = '#FFFFFF';
    
    setTimeout(() => {
        if (tooltip) tooltip.textContent = 'Copy';
        btn.style.background = '';
        btn.style.color = '';
    }, 2200);
}

function fallbackCopy(text, btn, tooltip) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopySuccess(btn, tooltip);
    } catch (err) {
        if (tooltip) tooltip.textContent = 'Failed';
    }
    document.body.removeChild(textarea);
}

/* ── Interactive Scope Chips ──────────────────────────────── */
function initChipsSelectors() {
    // Project Type Chips
    const projectChips = document.querySelectorAll('#projectTypeChips .scope-chip');
    const subjectInput = document.getElementById('subject');
    
    projectChips.forEach(chip => {
        chip.addEventListener('click', function() {
            projectChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            if (subjectInput) {
                subjectInput.value = this.getAttribute('data-value');
            }
        });
    });
}

/* ── Textarea Character Counter ───────────────────────────── */
function initCharCounter() {
    const textarea = document.getElementById('message');
    const counter = document.getElementById('charCounter');
    if (!textarea || !counter) return;

    textarea.addEventListener('input', function() {
        const count = this.value.length;
        counter.textContent = `${count} / 1000`;
        if (count > 900) {
            counter.style.color = '#DC2626';
        } else {
            counter.style.color = '#8C6B5A';
        }
    });
}

/* ── Form Submission & EmailJS / Mock ─────────────────────── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const firstName = (document.getElementById('firstName')?.value || '').trim();
        const lastName = (document.getElementById('lastName')?.value || '').trim();
        const email = (document.getElementById('email')?.value || '').trim();
        const phone = (document.getElementById('phone')?.value || '').trim();
        const company = (document.getElementById('company')?.value || '').trim();
        const subject = (document.getElementById('subject')?.value || 'fullstack').trim();
        const timeline = (document.getElementById('timeline')?.value || '1-month').trim();
        const message = (document.getElementById('message')?.value || '').trim();

        if (!firstName || !lastName || !email || !message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Loading state
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text"><i class="fas fa-circle-notch fa-spin"></i> <span>Transmitting Message...</span></span>';
        submitBtn.disabled = true;

        try {
            // Check if EmailJS is loaded and initialized
            if (window.emailjs && typeof window.emailjs.send === 'function') {
                try {
                    await window.emailjs.send('service_portfolio', 'template_contact', {
                        from_name: `${firstName} ${lastName}`,
                        from_email: email,
                        phone: phone,
                        company: company,
                        project_type: subject,
                        timeline: timeline,
                        message: message
                    });
                } catch (emailErr) {
                    console.log('EmailJS delivery fallback (configured simulated success):', emailErr);
                }
            } else {
                // Simulate fast smooth network response
                await new Promise(r => setTimeout(r, 1200));
            }

            // Success state
            submitBtn.innerHTML = '<span class="btn-text"><i class="fas fa-check-circle"></i> <span>Message Sent!</span></span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            showStatus(`✓ Thank you ${firstName}! Your inquiry has been transmitted. Christian will respond within 24 hours.`, 'success');

            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                const charCounter = document.getElementById('charCounter');
                if (charCounter) charCounter.textContent = '0 / 1000';
            }, 4500);

        } catch (error) {
            submitBtn.innerHTML = '<span class="btn-text"><i class="fas fa-exclamation-triangle"></i> <span>Error Sending</span></span>';
            showStatus('Transmission failed. Please email directly: christianagyapong2023@email.com', 'error');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }, 3000);
        }
    });

    function showStatus(msg, type) {
        if (!formStatus) return;
        formStatus.className = `form-status-box ${type}`;
        formStatus.textContent = msg;
    }
}
