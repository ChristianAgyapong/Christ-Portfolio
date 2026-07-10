/**
 * AI Assistant — floating chat button for Christian Agyapong portfolio
 * Click the button → full-screen overlay with the AI chat iframe (no extra UI)
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

    const AI_CHAT_URL = 'https://ai-chrix.onrender.com/';

    let isOpen = false;
    let fab = null;
    let overlay = null;

    function openChat() {
        if (isOpen) return;
        isOpen = true;
        if (fab) fab.classList.add('hidden');
        if (overlay) {
            overlay.classList.add('open');
            document.body.classList.add('ai-chat-active');
            // Set src only once (lazy load)
            const iframe = document.getElementById('ai-overlay-iframe');
            if (iframe && !iframe.src) {
                iframe.src = AI_CHAT_URL;
            }
        }
    }

    function closeChat() {
        if (!isOpen) return;
        isOpen = false;
        if (fab) fab.classList.remove('hidden');
        if (overlay) {
            overlay.classList.remove('open');
            document.body.classList.remove('ai-chat-active');
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
            '<span class="ai-fab-label">Ask my AI about me</span>' +
            '</button>';

        // Full-screen overlay (just iframe + close btn)
        overlay = document.createElement('div');
        overlay.className = 'ai-overlay';
        overlay.id = 'ai-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'AI chat assistant');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML =
            '<div class="ai-chat-card">' +
            '<button class="ai-overlay-close" id="ai-overlay-close" aria-label="Close AI chat">' +
            '<i class="fas fa-times"></i>' +
            '</button>' +
            '<iframe id="ai-overlay-iframe" title="Chrix AI Chat" allowfullscreen></iframe>' +
            '</div>';

        document.body.appendChild(fab);
        document.body.appendChild(overlay);

        document.getElementById('ai-fab-btn').addEventListener('click', openChat);
        document.getElementById('ai-overlay-close').addEventListener('click', closeChat);

        // Close on backdrop click (clicking outside iframe)
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeChat();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) closeChat();
        });
    }

    function bindTriggers() {
        document.querySelectorAll('#open-ai-chat-btn, [data-open-ai-chat]').forEach(function (btn) {
            btn.addEventListener('click', openChat);
        });
    }

    // Expose globally so other scripts can call openAiChat() / closeAiChat()
    window.openAiChat = openChat;
    window.closeAiChat = closeChat;

    document.addEventListener('DOMContentLoaded', function () {
        createWidget();
        bindTriggers();
    });
})();
