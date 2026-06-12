# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added

#### Core Features
- AI image generation using GPT Image models (`gpt-image-2`, `codex-gpt-image-2`)
- Text-to-image generation with natural language prompts
- Image-to-image generation with reference images
- Batch processing (1-10 images per request)
- 9 preset aspect ratios (21:9 to 9:16)

#### User Interface
- Modern dark mode UI with glassmorphism design
- Responsive 3-panel layout (sidebar, workspace, settings)
- Drag-and-drop image upload with preview
- Full-screen image preview modal
- Generation progress indicators
- History panel with thumbnails

#### Data Management
- Local image storage using IndexedDB
- Generation history persistence
- API key storage (encrypted in localStorage)
- Settings persistence (model, size, count)

#### Desktop Support
- Electron wrapper for macOS
- Electron wrapper for Windows
- Electron wrapper for Linux
- Native window controls
- DevTools support in development mode

#### Mobile Support
- Capacitor integration for Android
- Touch-friendly interface
- Responsive design for mobile screens

#### Keyboard Shortcuts
- `Cmd/Ctrl + Enter` - Generate image
- `Cmd/Ctrl + K` - Focus prompt input
- `Cmd/Ctrl + /` - Toggle dark/light theme
- `Escape` - Close modals and panels

#### API Integration
- OpenAI-compatible API endpoint support
- Custom API URL configuration
- Error handling with user-friendly messages
- Response parsing for multiple formats

### Technical

- Vanilla JavaScript (no frameworks)
- CSS custom properties for theming
- Modular code organization
- Comprehensive error handling
- Cross-platform build system

---

## [Unreleased]

### Planned Features

- Streaming image generation
- Custom model fine-tuning support
- Image upscaling and enhancement
- Style presets library
- Cloud sync for history
- iOS app support
- Plugin system for extensions

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2024-01-XX | Initial release with full feature set |

---

## Upgrade Notes

### From 0.x to 1.0.0

This is the initial stable release. No upgrade path needed.

---

## Support

- **Documentation**: [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/fangdaclash/image2svip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fangdaclash/image2svip/discussions)
