# Changelog

<div align="center">

🇺🇸 **English** · 🇪🇸 [Español](CHANGELOG_ES.md)

</div>

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-10-08

### Added
- Toolbar popup: connection status for the active tab, an on/off toggle persisted in `chrome.storage`, and an Open Telegram shortcut (localized EN/ES).
- Manifest localization via Chrome's `_locales` system (English default, Spanish included).
- SVG country flags on the landing page language switcher, rendered with the [flag-icons](https://github.com/lipis/flag-icons) library.
- jsdom test suite for the content script (`npm test`) covering media viewer, Stories viewer, and observer behaviour.
- Packaging script (`npm run package`) that builds a clean release zip with runtime files only (16 KB instead of the full repository weight).

### Changed
- Landing page auto-detects the browser language on first visit: Spanish browsers get Spanish without clicking, everything else gets English; a manual choice stored in `localStorage` always wins.
- Replaced the 500 ms polling interval with a debounced `MutationObserver`: downloads appear instantly and the script has no idle cost.
- Unhides every hidden viewer button again: the previous download-icon check (`\uE95E`) no longer matches the icons Telegram Web currently ships, so a narrower check left the button hidden.
- Landing page preconnects to the jsDelivr CDN used by flag-icons.
- Removed the dead `background/` service worker and unused `content.css`; the old no-op popup was rebuilt as the working toolbar popup above.
- Permissions trimmed to `activeTab` (tab status in the popup) and `storage` (on/off toggle) — no `host_permissions`.
- Removed the orphaned popup message listener from the content script.

## [1.0.2] - 2026-08-08

### Added
- Comprehensive Spanish + English README with installation, usage, and project structure.
- Testing guide (`TESTING.md`) for manual verification of extension behaviour.
- Apache 2.0 license with explicit attribution requirement.
- Repository topics for improved discoverability on GitHub.
- Promotional screenshots for documentation and the landing page.
- Landing page with feature highlights and installation instructions.

### Changed
- Regenerated PNG icons from the SVG source at proper resolutions (16×16, 48×48, 128×128) with full RGBA, replacing the previous low-colour-depth placeholders.
- Cleaned up the icon SVG so the download arrow is fully visible on the blue background.
- Content script now explicitly targets both the media viewer and Stories viewer containers.

### Fixed
- Resolved inconsistencies between the popup UI labels and actual extension behaviour.

## [1.0.1] - 2026-08-07

### Changed
- Added attribution requirement clause to the Apache 2.0 license.
- Updated README to clarify usage and available features.

## [1.0.0] - 2026-08-06

### Added
- Initial commit of the Telegram Media Downloader Chrome extension.
- Manifest V3 extension that unhides the native download button in Telegram Web's media viewer and Stories viewer.
