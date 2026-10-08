'use strict';

const TELEGRAM_URL = 'https://web.telegram.org/';
const TELEGRAM_HOSTS = ['web.telegram.org', 'webk.telegram.org', 'webz.telegram.org'];

function t(key) {
  return chrome.i18n.getMessage(key) || key;
}

function localize() {
  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.textContent = t(el.dataset.i18n);
  }
  document.title = t('extName');
}

function renderStatus(tab) {
  const isTelegram = Boolean(
    tab && tab.url && TELEGRAM_HOSTS.some((host) => {
      try {
        return new URL(tab.url).hostname === host;
      } catch {
        return false;
      }
    })
  );
  const status = document.getElementById('status');
  status.classList.toggle('ok', isTelegram);
  document.getElementById('statusText').textContent = t(
    isTelegram ? 'popupStatusOn' : 'popupStatusOff'
  );
}

async function initToggle() {
  const toggle = document.getElementById('enabledToggle');
  const { enabled = true } = await chrome.storage.local.get({ enabled: true });
  toggle.checked = enabled;
  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });
}

function initOpenTelegram() {
  document.getElementById('openTelegram').addEventListener('click', () => {
    chrome.tabs.create({ url: TELEGRAM_URL });
    window.close();
  });
}

async function init() {
  localize();
  const manifest = chrome.runtime.getManifest();
  document.getElementById('version').textContent = `v${manifest.version}`;
  await initToggle();
  initOpenTelegram();
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  renderStatus(tab);
}

init();
