# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-08-08

### Added
- Comprehensive Spanish + English README with installation, usage, and project structure.
- Testing guide (`TESTING.md`) for manual verification of extension behaviour.
- Apache 2.0 license with explicit attribution requirement.
- Repository topics for improved discoverability on GitHub.
- Promotional screenshots for documentation and the landing page.
- Landing page with feature highlights and installation instructions.

### Changed
- Regenerated PNG icons from the SVG source at proper resolutions (16×16, 48×48, 128×128) with full RGBA — replacing the previous low-colour-depth placeholders.
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
