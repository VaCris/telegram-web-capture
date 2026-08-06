// Telegram Media Downloader - Content Script v7
// Approach: unhide Telegram's native download button in media viewer
(function() {
  'use strict';

  if (window.__tgDLInit) return;
  window.__tgDLInit = true;

  const DOWNLOAD_ICON = '\uE95E';

  // Listen for popup messages
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getCapturedMedia') {
      sendResponse([]);
    }
    return true;
  });

  const SCAN_INTERVAL_MS = 500;
  setInterval(scan, SCAN_INTERVAL_MS);

  function scan() {
    scanMediaViewer();
    scanStories();
  }

  // --- Media Viewer: unhide native download button ---
  function scanMediaViewer() {
    const viewer = document.querySelector('.media-viewer-whole');
    if (!viewer) return;

    const buttons = viewer.querySelector('.media-viewer-buttons');
    if (!buttons) return;

    // Find ALL hidden buttons and unhide them
    const hiddenButtons = buttons.querySelectorAll('button.btn-icon.hide');
    for (const btn of hiddenButtons) {
      btn.classList.remove('hide');

      // If this is the native download button, mark it
      if (btn.textContent.includes(DOWNLOAD_ICON) || btn.classList.contains('tgico-download')) {
        btn.classList.add('tgico-download');
      }
    }
  }

  // --- Stories: unhide native download button ---
  function scanStories() {
    const viewer = document.getElementById('stories-viewer');
    if (!viewer) return;

    // Try to find and unhide download buttons in stories
    const allButtons = viewer.querySelectorAll('button.btn-icon.hide');
    for (const btn of allButtons) {
      btn.classList.remove('hide');
      if (btn.textContent.includes(DOWNLOAD_ICON)) {
        btn.classList.add('tgico-download');
      }
    }
  }
})();
