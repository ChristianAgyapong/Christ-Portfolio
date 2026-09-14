/**
 * AI Assistant — floating chat button & interactive overlay for Christian Agyapong portfolio
 * Features instant preloading, zero-delay opening, mobile virtual keyboard adaptation (visualViewport)
 */
(function () {
    'use strict';

    // Self-inject ai-assistant.css non-blocking — keeps it out of every page <head>
    (function injectCSS() {
        var id = 'ai-assistant-css';
        if (document.getElementById(id)) return;
        var link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = (document.currentScript && document.currentScript.src
            ? document.currentScript.src.replace(/js\/[^/]+$/, '')
            : '') + 'css/ai-assistant.css';
        document.head.appendChild(link);
    })();

    const AI_CHAT_URL = 'https://chrix-personal.onrender.com/';

    let isOpen = false;
    let fab = null;
    let overlay = null;
    let iframe = null;

    function syncVisualViewport() {
        if (!overlay || !isOpen) return;
        if (window.visualViewport && window.innerWidth <= 600) {
            overlay.style.height = window.visualViewport.height + 'px';
            overlay.style.top = window.visualViewport.offsetTop + 'px';
        } else if (overlay) {
            overlay.style.height = '';
            overlay.style.top = '';
        }
    }

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', syncVisualViewport);
        window.visualViewport.addEventListener('scroll', syncVisualViewport);
    }

    function openChat(e) {
        if (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        if (isOpen) return;
        isOpen = true;
        if (fab) fab.classList.add('hidden');
        if (!overlay) return;

        overlay.style.display = 'flex';
        // Force reflow for transition
        void overlay.offsetHeight;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('ai-chat-active');
        document.documentElement.classList.add('ai-chat-active');

        syncVisualViewport();

        // Ensure iframe src is populated
        if (iframe && !iframe.src) {
            iframe.src = AI_CHAT_URL;
        }

        // Focus close button for accessibility
        const closeBtn = document.getElementById('ai-overlay-close');
        if (closeBtn) {
            setTimeout(function () {
                closeBtn.focus();
            }, 150);
        }
    }

    function closeChat(e) {
        if (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        if (!isOpen) return;
        isOpen = false;
        if (fab) fab.classList.remove('hidden');
        if (overlay) {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            overlay.style.height = '';
            overlay.style.top = '';
            document.body.classList.remove('ai-chat-active');
            document.documentElement.classList.remove('ai-chat-active');
            setTimeout(function () {
                if (!isOpen && overlay) {
                    overlay.style.display = 'none';
                }
            }, 300);
        }
    }

    function reloadChat(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        if (iframe) {
            const skeleton = document.getElementById('ai-chat-skeleton');
            if (skeleton) skeleton.classList.remove('loaded');
            iframe.src = AI_CHAT_URL;
        }
    }

    function createWidget() {
        if (document.getElementById('ai-fab')) return;

        // Floating action button with modern luxury pill/orb design
        fab = document.createElement('div');
        fab.className = 'ai-fab';
        fab.id = 'ai-fab';
        fab.innerHTML =
            '<button class="ai-fab-button" id="ai-fab-btn" aria-label="Chat with Christian\'s AI Digital Twin" aria-expanded="false">' +
            '  <div class="ai-fab-ambient-glow" aria-hidden="true"></div>' +
            '  <div class="ai-fab-icon-box">' +
            '    <div class="ai-fab-pulse-ring" aria-hidden="true"></div>' +
            '    <i class="fas fa-wand-magic-sparkles ai-fab-main-icon"></i>' +
            '    <span class="ai-fab-status-dot" aria-hidden="true" title="Online"></span>' +
            '  </div>' +
            '  <div class="ai-fab-text-wrap">' +
            '    <div class="ai-fab-top-tag">' +
            '      <span class="ai-fab-mini-dot"></span>' +
            '      <span>AI TWIN</span>' +
            '    </div>' +
            '    <span class="ai-fab-title">Ask Christian</span>' +
            '  </div>' +
            '  <div class="ai-fab-sparkle-fx" aria-hidden="true">✦</div>' +
            '</button>';

        // Full-screen overlay with sleek modal and zero duplicate header
        overlay = document.createElement('div');
        overlay.className = 'ai-overlay';
        overlay.id = 'ai-overlay';
        overlay.style.display = 'none';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Christian\'s AI Chat Assistant');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML =
            '<div class="ai-chat-card">' +
            '  <div class="ai-floating-actions">' +
            '    <button class="ai-action-btn ai-reload-action" id="ai-overlay-reload" title="Restart conversation" aria-label="Restart chat">' +
            '      <i class="fas fa-redo-alt"></i>' +
            '    </button>' +
            '    <button class="ai-action-btn ai-close-action" id="ai-overlay-close" title="Close AI chat" aria-label="Close">' +
            '      <i class="fas fa-times"></i>' +
            '      <span>Close</span>' +
            '    </button>' +
            '  </div>' +
            '  <div class="ai-iframe-wrapper">' +
            '    <div class="ai-chat-skeleton" id="ai-chat-skeleton">' +
            '      <div class="ai-skeleton-loader">' +
            '        <div class="ai-skeleton-pulse"></div>' +
            '        <span>Connecting to Christian\'s Digital Twin...</span>' +
            '      </div>' +
            '    </div>' +
            '    <iframe id="ai-overlay-iframe" title="Christian\'s AI Chat" allow="clipboard-write; clipboard-read; microphone" allowfullscreen></iframe>' +
            '  </div>' +
            '</div>';

        document.body.appendChild(fab);
        document.body.appendChild(overlay);

        iframe = document.getElementById('ai-overlay-iframe');

        // Preload silently so it is ready on-click with zero loading wait
        iframe.src = AI_CHAT_URL;

        // When iframe finishes loading, hide skeleton
        iframe.addEventListener('load', function () {
            const skeleton = document.getElementById('ai-chat-skeleton');
            if (skeleton) skeleton.classList.add('loaded');
        });

        const fabBtn = document.getElementById('ai-fab-btn');
        if (fabBtn) {
            fabBtn.addEventListener('click', function (e) {
                openChat(e);
            });
        }

        const closeBtn = document.getElementById('ai-overlay-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                closeChat(e);
            });
        }

        const reloadBtn = document.getElementById('ai-overlay-reload');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', function (e) {
                reloadChat(e);
            });
        }

        // Close on backdrop click (clicking outside the card)
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeChat(e);
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) closeChat(e);
        });
    }

    function bindTriggers() {
        document.querySelectorAll('#open-ai-chat-btn, [data-open-ai-chat]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                openChat(e);
            });
        });
    }

    // Expose globally so other scripts can call openAiChat() / closeAiChat()
    window.openAiChat = openChat;
    window.closeAiChat = closeChat;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            createWidget();
            bindTriggers();
        });
    } else {
        createWidget();
        bindTriggers();
    }
})();
