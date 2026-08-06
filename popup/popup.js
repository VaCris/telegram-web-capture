// Telegram Media Downloader - Popup Script

(function() {
  'use strict';

  const UI_RESET_DELAY_MS = 2000;
  const DOWNLOAD_ALL_RESET_DELAY_MS = 3000;

  // DOM elements
  const mediaList = document.getElementById('mediaList');
  const mediaCount = document.getElementById('mediaCount');
  const downloadAllBtn = document.getElementById('downloadAllBtn');
  const clearBtn = document.getElementById('clearBtn');

  // Current tab ID
  let currentTabId = null;

  // Initialize popup
  async function init() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTabId = tab?.id;

    if (!currentTabId) {
      showError('No se pudo detectar la pestaña activa');
      return;
    }

    // Check if we're on Telegram Web
    if (!tab.url?.includes('web.telegram.org')) {
      showTelegramRequired();
      return;
    }

    loadCapturedMedia();
    setupEventListeners();
  }

  // Load captured media from content script
  async function loadCapturedMedia() {
    try {
      const response = await chrome.tabs.sendMessage(currentTabId, {
        action: 'getCapturedMedia'
      });

      if (response && Array.isArray(response)) {
        renderMediaList(response);
      }
    } catch (error) {
      console.error('[TG Downloader] Failed to load media:', error);
      showError('No se pudo conectar con Telegram Web');
    }
  }

  // Render media list
  function renderMediaList(mediaItems) {
    if (!mediaItems || mediaItems.length === 0) {
      mediaList.innerHTML = `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <p>No se encontraron recursos</p>
        </div>
      `;
      mediaCount.textContent = '0';
      downloadAllBtn.disabled = true;
      return;
    }

    mediaCount.textContent = mediaItems.length;
    downloadAllBtn.disabled = false;

    mediaList.innerHTML = mediaItems.map((mediaItem, index) => `
      <div class="media-item" data-url="${escapeHtml(mediaItem.url)}">
        <div class="media-icon ${mediaItem.type}">
          ${getMediaIcon(mediaItem.type)}
        </div>
        <div class="media-info">
          <div class="media-type">${getMediaTypeLabel(mediaItem.type)}</div>
          <div class="media-url" title="${escapeHtml(mediaItem.url)}">${truncateUrl(mediaItem.url)}</div>
        </div>
        <div class="media-actions">
          <button class="media-btn download-single" data-url="${escapeHtml(mediaItem.url)}" data-type="${mediaItem.type}" title="Descargar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Add event listeners for single download buttons
    document.querySelectorAll('.download-single').forEach(btn => {
      btn.addEventListener('click', handleSingleDownload);
    });
  }

  // Handle single file download
  async function handleSingleDownload(e) {
    const downloadBtn = e.currentTarget;
    const url = downloadBtn.dataset.url;
    const mediaType = downloadBtn.dataset.type;

    downloadBtn.disabled = true;
    downloadBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `;

    try {
      await chrome.runtime.sendMessage({
        action: 'download',
        url,
        mediaType,
        filename: generateFilename(mediaType)
      });

      downloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    } catch (error) {
      downloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      `;
    }

    setTimeout(() => {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      `;
    }, UI_RESET_DELAY_MS);
  }

  // Handle download all
  async function handleDownloadAll() {
    try {
      const media = await chrome.tabs.sendMessage(currentTabId, {
        action: 'getCapturedMedia'
      });

      if (!media || media.length === 0) return;

      downloadAllBtn.disabled = true;
      downloadAllBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        Descargando...
      `;

      const result = await chrome.runtime.sendMessage({
        action: 'downloadAll',
        urls: media.map(m => ({ url: m.url, mediaType: m.type }))
      });

      if (result.success) {
        downloadAllBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          ${result.completed} descargados
        `;
      }
    } catch (error) {
      downloadAllBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Descargar todo
      `;
    }

    setTimeout(() => {
      downloadAllBtn.disabled = false;
      downloadAllBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Descargar todo
      `;
    }, DOWNLOAD_ALL_RESET_DELAY_MS);
  }

  // Handle clear list
  async function handleClear() {
    try {
      await chrome.tabs.sendMessage(currentTabId, {
        action: 'clearCaptured'
      });
      loadCapturedMedia();
    } catch (error) {
      console.error('[TG Downloader] Failed to clear media:', error);
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    downloadAllBtn.addEventListener('click', handleDownloadAll);
    clearBtn.addEventListener('click', handleClear);
  }

  // Helper functions
  function getMediaIcon(mediaType) {
    const icons = {
      video: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      audio: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
      image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
      document: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
    };
    return icons[mediaType] || icons.document;
  }

  function getMediaTypeLabel(mediaType) {
    const labels = {
      video: 'Video',
      audio: 'Audio',
      image: 'Imagen',
      document: 'Documento'
    };
    return labels[mediaType] || 'Archivo';
  }

  function truncateUrl(url) {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      if (path.length > 30) {
        return '...' + path.slice(-27);
      }
      return path;
    } catch {
      return url.substring(0, 30) + '...';
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function generateFilename(mediaType) {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const extensions = { video: 'mp4', audio: 'mp3', image: 'jpg', document: 'bin' };
    return `telegram_${timestamp}.${extensions[mediaType] || 'bin'}`;
  }

  function showError(message) {
    mediaList.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <p>${message}</p>
      </div>
    `;
  }

  function showTelegramRequired() {
    mediaList.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2AABEE" stroke-width="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <p>Abre <strong>web.telegram.org</strong> para usar esta extensión</p>
      </div>
    `;
    downloadAllBtn.disabled = true;
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', init);
})();
