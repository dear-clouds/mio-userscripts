// ==UserScript==
// @name         Drama-Otaku+
// @version      1.0
// @description  Enhancements for Drama-Otaku
// @author       Mio.
// @namespace    https://github.com/dear-clouds/mio-userscripts
// @supportURL   https://github.com/dear-clouds/mio-userscripts/issues
// @downloadURL  https://github.com/dear-clouds/mio-userscripts/raw/refs/heads/main/drama-otaku/dramaotaku+.user.js
// @license      GPL-3.0
// @match        *://*.drama-otaku.com/subtitle-project/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Create a "Download All as ZIP" button
    const button = document.createElement('button');
    button.textContent = 'Download All as ZIP';
    button.style.padding = '10px';
    button.style.color = 'var(--dracula-text--primarybtncolor)';
    button.style.borderColor = 'currentcolor';
    button.style.fill = 'currentcolor';
    button.style.background = 'var(--dracula-bg--primarybtnbg)';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.float = 'right';
    button.style.marginTop = '10px';

    // Append the button below the subtitle-downloads table
    const subtitleTable = document.querySelector('table.subtitle-downloads');
    if (subtitleTable) {
        subtitleTable.insertAdjacentElement('afterend', button);
    } else {
        document.body.appendChild(button); // Fallback if table not found
    }

    button.addEventListener('click', async () => {
        const zip = new JSZip();
        const downloadItems = document.querySelectorAll('table.subtitle-downloads .subtitle-downloads-item');
        const zipNameElement = document.querySelector('h2.body.h2-body');
        const zipName = zipNameElement ? zipNameElement.textContent.trim() + '.zip' : 'Drama-Otaku-Subtitles.zip';

        for (const item of downloadItems) {
            const fileUrl = item.querySelector('.downloads-file').textContent.trim();
            const fileName = fileUrl.split('/').pop();

            try {
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${fileName}`);
                }
                const blob = await response.blob();
                zip.file(fileName, blob);
            } catch (error) {
                console.error(`Error downloading ${fileName}:`, error);
            }
        }

        // Generate the ZIP and trigger download
        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, zipName);
        });

        // Automatically click the Thanks button
        const thanksButton = document.querySelector('.thanks-btn-add');
        if (thanksButton) {
            thanksButton.click();
        }
    });
})();
