// Telegram Media Downloader - Content Script v10
// Approach: unhide Telegram's native download button in media viewer
(function() {
  'use strict';

  if (window.__tgDLInit) return;
  window.__tgDLInit = true;

  const DEBOUNCE_MS = 100;

  let observer = null;
  let scanScheduled = false;
  let active = false;

  function unhideButtons(container) {
    if (!container) return;
    const hiddenButtons = container.querySelectorAll('button.btn-icon.hide');
    for (const btn of hiddenButtons) {
      btn.classList.remove('hide');
      if (btn.className.includes('download')) {
        btn.classList.add('tgico-download');
      }
    }
  }

  function scan() {
    unhideButtons(
      document.querySelector('.media-viewer-whole .media-viewer-buttons')
    );
    unhideButtons(document.getElementById('stories-viewer'));
  }

  function scheduleScan() {
    if (!active || scanScheduled) return;
    scanScheduled = true;
    setTimeout(() => {
      scanScheduled = false;
      if (active) scan();
    }, DEBOUNCE_MS);
  }

  function enable() {
    if (active) return;
    active = true;
    observer = new MutationObserver(scheduleScan);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    scan();
  }

  function disable() {
    if (!active) return;
    active = false;
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    scanScheduled = false;
  }

  function syncEnabled(enabled) {
    enabled ? enable() : disable();
  }

  const hasStorage =
    typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

  if (hasStorage) {
    chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
      syncEnabled(enabled);
    });
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.enabled) {
        syncEnabled(changes.enabled.newValue);
      }
    });
  } else {
    enable();
  }

  // Exposed for tests only
  window.__tgDL = {
    scan,
    enable,
    disable,
    get active() { return active; },
    get observer() { return observer; }
  };
})();
