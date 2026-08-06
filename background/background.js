// Telegram Media Downloader - Background
const CDN_RE = /cdn\d*\.web\.telegram\.org|telegram\.org\/file/i;
const cdnRedirectMap = new Map(); // stream URL -> CDN URL

// Intercept CDN responses to map stream URLs to real CDN URLs
if (chrome.webRequest?.onHeadersReceived) {
  chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
      if (details.url && CDN_RE.test(details.url)) {
        // This is a CDN URL - store it
        cdnRedirectMap.set(details.url, details.url);
      }
    },
    { urls: ['<all_urls>'] }
  );
}

// Also intercept redirects from stream URLs
if (chrome.webRequest?.onBeforeRedirect) {
  chrome.webRequest.onBeforeRedirect.addListener(
    (details) => {
      if (details.redirectUrl && details.url.includes('/stream/')) {
        console.log('[TG Downloader] redirect:', details.url.substring(0, 50), '->', details.redirectUrl.substring(0, 50));
        cdnRedirectMap.set(details.url, details.redirectUrl);
      }
    },
    { urls: ['<all_urls>'] }
  );
}

// Handle download messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download' && message.url) {
    // Try to find the real CDN URL
    let actualDownloadUrl = cdnRedirectMap.get(message.url) || message.url;

    console.log('[TG Downloader] downloading:', actualDownloadUrl.substring(0, 80));

    chrome.downloads.download({
      url: actualDownloadUrl,
      filename: message.filename || 'telegram_file.mp4',
      saveAs: false
    }, (id) => {
      if (chrome.runtime.lastError) {
        console.error('[TG Downloader] download error:', chrome.runtime.lastError.message);
        // Try with original URL as fallback
        if (actualDownloadUrl !== message.url) {
          chrome.downloads.download({
            url: message.url,
            filename: message.filename || 'telegram_file.mp4',
            saveAs: false
          });
        }
      }
      sendResponse({ ok: true, id });
    });
    return true;
  }
});
