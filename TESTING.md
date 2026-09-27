# Testing Guide — Telegram Media Downloader

<div align="center">

🇺🇸 **English** · 🇪🇸 [Español](TESTING_ES.md)

</div>

This guide explains how to manually verify the current extension behavior.

## Quick test

1. **Load the extension**
   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode**.
   - Click **Load unpacked**.
   - Select the `telegram-web-capture` folder.
2. **Confirm installation**
   - Verify that **Telegram Media Downloader** appears in the extensions list.
3. **Open Telegram Web**
   - Go to [web.telegram.org](https://web.telegram.org) and sign in.
4. **Open the media viewer**
   - Open an image, video, audio file, or document from a chat, channel, or group.
5. **Verify the download button**
   - Telegram's native download button should be visible in the viewer instead of remaining hidden.
6. **Test the download**
   - Click the native download button.
   - Telegram should handle the download through its normal browser flow.

## Stories test

1. Open a Story.
2. Verify that the Stories viewer opens correctly.
3. Confirm that Telegram's native download control is visible when Telegram includes it in the viewer.

## Expected behavior

| Behavior | Expected result |
| --- | --- |
| Media viewer opens | The selected media is displayed in Telegram's viewer |
| Download control | Telegram's native download button is visible |
| Download click | Telegram handles the download normally |
| Stories viewer | Hidden native controls are revealed |

## Troubleshooting

### The download button does not appear

- Confirm that you are using `web.telegram.org`, `webk.telegram.org`, or `webz.telegram.org`.
- Open the media inside Telegram's viewer; the extension targets viewer controls.
- Reload Telegram Web and open the media again.
- Confirm that the extension is enabled in `chrome://extensions/`.
- Telegram may have changed its DOM structure. Inspect the selectors used by `content/content.js`.

## Debugging

1. Open Telegram Web.
2. Press **F12** to open DevTools.
3. Open the **Elements** tab.
4. Open Telegram's media viewer.
5. Check for:
   - `.media-viewer-whole`
   - `.media-viewer-buttons`
   - `button.btn-icon.hide`
6. For Stories, inspect `#stories-viewer`.
7. If Telegram changed these elements, update `scanMediaViewer()` or `scanStories()` in `content/content.js`.

## Current runtime scope

The current `manifest.json` registers the content script and CSS for Telegram Web. Although the repository still contains `background/` and `popup/` source files, they are not currently registered by the manifest and should not be treated as active extension runtime components during these tests.

## When Telegram changes its UI

The most likely maintenance point is `content/content.js`, especially the selectors used by:

- `scanMediaViewer()`
- `scanStories()`

Re-test both the media viewer and Stories after changing these selectors.
