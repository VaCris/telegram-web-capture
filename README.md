# Telegram Media Downloader

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Manifest](https://img.shields.io/badge/Manifest%20V3-Chrome%20Extension-orange)](manifest.json)
[![Version](https://img.shields.io/badge/version-1.0.2-blue)](https://github.com/VaCris/telegram-web-capture/releases)
[![GitHub Stars](https://img.shields.io/github/stars/VaCris/telegram-web-capture?style=social)](https://github.com/VaCris/telegram-web-capture/stargazers)

**English** · [Español](README_ES.md)

Telegram Media Downloader is a lightweight Chrome extension that reveals Telegram Web's **native download button** inside the media viewer and Stories viewer.

It does not capture, proxy, or store media. Instead, it removes Telegram Web's hidden state from its own download controls so files are downloaded through Telegram's existing mechanism.

## Features

- Reveals Telegram Web's native download button.
- Works in the media viewer and Stories viewer.
- Supports media handled by Telegram's own viewer, including images, videos, audio, and documents.
- Does not intercept media requests or store downloaded content.
- No configuration required.
- Built with Chrome Extension Manifest V3.
- Lightweight content script with a small DOM scan every 500 ms.

## Installation

### From a release

1. Open the [Releases](https://github.com/VaCris/telegram-web-capture/releases) page.
2. Download the latest ZIP asset.
3. Extract it to a folder.
4. Open `chrome://extensions/`.
5. Enable **Developer mode**.
6. Click **Load unpacked**.
7. Select the extracted extension folder.

### From source

```bash
git clone https://github.com/VaCris/telegram-web-capture.git
cd telegram-web-capture
```

Then open `chrome://extensions/`, enable **Developer mode**, choose **Load unpacked**, and select the repository folder.

Chromium-based browsers such as Microsoft Edge and Brave can generally load the extension using the same unpacked-extension workflow.

## Usage

1. Open [Telegram Web](https://web.telegram.org) and sign in.
2. Open a chat, group, or channel.
3. Open an image, video, audio file, document, or Story.
4. The extension checks the active Telegram viewer and reveals hidden native controls.
5. Click Telegram's download button to save the file using Telegram's normal download flow.

### Screenshots

![Open media in Telegram Web](docs/screenshots/screenshot-step-1-view.png)

![Native download button visible](docs/screenshots/screenshot-step-2-button.png)

![Download started](docs/screenshots/screenshot-step-3-download.png)

## How it works

Telegram Web may keep native viewer controls hidden with the `hide` class.

The extension injects `content/content.js`, which periodically checks:

- `.media-viewer-whole` and its `.media-viewer-buttons`
- `#stories-viewer`

When it finds hidden viewer buttons, it removes the `hide` class. If the button matches Telegram's download icon, it also marks it with `tgico-download`.

This means the extension does **not** need to reverse-engineer Telegram's private APIs or implement its own media downloader.

## Project structure

```text
telegram-web-capture/
├── manifest.json
├── background/
├── content/
│   ├── content.js
│   └── content.css
├── popup/
├── icons/
├── docs/
│   └── screenshots/
├── README.md
├── README_ES.md
├── TESTING.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

## Development

There is no build step required for the current extension.

1. Clone the repository.
2. Load the repository as an unpacked extension.
3. Modify the source files.
4. Reload the extension from `chrome://extensions/`.
5. Refresh Telegram Web and verify the affected flow.

For manual verification guidance, see [TESTING.md](TESTING.md).

## Compatibility

| Browser | Status |
| --- | --- |
| Google Chrome (desktop) | Supported |
| Microsoft Edge (Chromium) | Expected to work |
| Brave (desktop) | Expected to work |
| Other Chromium browsers | May work |
| Firefox | Not currently targeted |

Compatibility may change when Telegram Web updates its DOM structure.

## Contributing

Contributions are welcome.

1. Open an issue describing the bug or improvement.
2. Fork the repository.
3. Create a focused branch.
4. Submit a pull request with a clear description of the change.

If Telegram changes its media viewer DOM, the selectors in `content/content.js` may need to be updated.

## Privacy

The extension's current implementation does not capture or persist Telegram media. It operates on Telegram Web's existing interface by revealing controls already present in the page.

Review `manifest.json` and the source code before installing if you want to verify the permissions and behavior.

## License

Licensed under the [Apache License 2.0](LICENSE).

Original work by **Bryan Alexander Vidal Crispin**  
https://github.com/VaCris/telegram-web-capture

## Links

- [Releases](https://github.com/VaCris/telegram-web-capture/releases)
- [Changelog](CHANGELOG.md)
- [Testing guide](TESTING.md)
- [Landing page](https://vacris.github.io/telegram-web-capture/)
