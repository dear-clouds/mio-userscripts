// ==UserScript==
// @name         Patreon Auto-Like on Download
// @namespace    https://github.com/dear-clouds/mio-userscripts
// @version      1.0
// @description  Automatically like a post when downloading an attachment on Patreon
// @author       Mio.
// @supportURL   https://github.com/dear-clouds/mio-userscripts/issues
// @license      GPL-3.0
// @match        *://*.patreon.com/posts/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        const attachmentContainer = document.querySelector('div[data-tag="post-attachments"]');
        if (attachmentContainer) {
            const attachmentElements = attachmentContainer.querySelectorAll('a, button');
            // Attach a click listener to each link or button inside the attachment container
            attachmentElements.forEach(element => {
                element.addEventListener('click', () => {
                    likePostIfNotLiked();
                });
            });
        }
    });

    function likePostIfNotLiked() {
        // Check if the post is already liked by looking for the "Liked" state
        const likeButton = document.querySelector('[data-tag="like-button"]');
        if (likeButton && likeButton.getAttribute('aria-checked') === 'false') {
            // Simulate a user click on the like button using a mouse event
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            likeButton.dispatchEvent(event);
            console.log('Simulate like click.');
        }
    }
})();
