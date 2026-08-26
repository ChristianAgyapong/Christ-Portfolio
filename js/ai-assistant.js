/**
 * AI Assistant — floating chat button & interactive overlay for Christian Agyapong portfolio
 * Features instant preloading, zero-delay opening, responsive mobile & desktop layout
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
            document.body.classList.remove('ai-chat-active');
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

        // Floating action button
        fab = document.createElement('div');
        fab.className = 'ai-fab';
        fab.id = 'ai-fab';
        fab.innerHTML =
            '<button class="ai-fab-button" id="ai-fab-btn" aria-label="Open AI chat assistant" aria-expanded="false">' +
            '<span class="ai-fab-dot" aria-hidden="true"></span>' +
            '<span class="ai-fab-icon-wrap"><i class="fas fa-robot"></i></span>' +
            '<span class="ai-fab-divider" aria-hidden="true"></span>' +
            '<span class="ai-fab-label">Ask my AI</span>' +
            '</button>';

        // Full-screen overlay with slim top control bar + full remaining iframe area
        overlay = document.createElement('div');
        overlay.className = 'ai-overlay';
        overlay.id = 'ai-overlay';
        overlay.style.display = 'none';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Chrix AI Chat Assistant');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML =
            '<div class="ai-chat-card">' +
            '  <div class="ai-card-topbar">' +
            '    <div class="ai-card-badge">' +
            '      <span class="ai-card-dot" aria-hidden="true"></span>' +
            '      <span class="ai-card-title">Chrix AI</span>' +
            '    </div>' +
            '    <div class="ai-sheet-handle" aria-hidden="true"></div>' +
            '    <div class="ai-card-actions">' +
            '      <button class="ai-card-btn ai-reload-btn" id="ai-overlay-reload" title="Restart conversation" aria-label="Restart chat">' +
            '        <i class="fas fa-redo-alt"></i>' +
            '      </button>' +
            '      <button class="ai-card-btn ai-close-btn" id="ai-overlay-close" title="Close AI chat" aria-label="Close">' +
            '        <i class="fas fa-times"></i>' +
            '      </button>' +
            '    </div>' +
            '  </div>' +
            '  <div class="ai-iframe-wrapper">' +
            '    <div class="ai-chat-skeleton" id="ai-chat-skeleton">' +
            '      <div class="ai-skeleton-loader">' +
            '        <div class="ai-skeleton-pulse"></div>' +
            '        <span>Connecting to Chrix Tech...</span>' +
            '      </div>' +
            '    </div>' +
            '    <iframe id="ai-overlay-iframe" title="Chrix AI Chat" allow="clipboard-write; clipboard-read; microphone" allowfullscreen></iframe>' +
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
