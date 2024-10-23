// ==UserScript==
// @name         Bypass LiveJournal External Link Warning
// @namespace    https://github.com/dear-clouds/mio-userscripts
// @version      1.0
// @description  Automatically bypass LiveJournal's external link warning page
// @author       Mio.
// @supportURL   https://github.com/dear-clouds/mio-userscripts/issues
// @license      GPL-3.0
// @match        *://*.livejournal.com/away?to=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var urlParams = new URLSearchParams(window.location.search);
    var redirectUrl = urlParams.get('to');

    if (redirectUrl) {
        window.location.href = decodeURIComponent(redirectUrl);
    }
})();
