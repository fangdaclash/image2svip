<div align="center">

# Changelog

All notable changes to image2svip will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

</div>

---

## [1.0.0] - 2024-01-XX

### 🎉 Initial Release

The first stable release of image2svip - a professional AI image generation desktop application.

---

### ✨ Added

#### Core Features

- **Text-to-Image Generation**
  - Natural language prompt support
  - Real-time generation progress
  - Multiple image generation (1-10)

- **Image-to-Image Generation**
  - Drag-and-drop image upload
  - Multiple reference image support (up to 6)
  - Image preview before generation

- **Multi-Model Support**
  - `gpt-image-2` - Standard image generation
  - `codex-gpt-image-2` - Code-optimized variant
  - Easy model switching

- **Output Controls**
  - 9 aspect ratio presets (21:9 to 9:16)
  - Auto/Smart sizing option
  - Custom resolution support

#### User Interface

- **Modern Dark Theme**
  - Glassmorphism design
  - Cyan/purple accent gradients
  - Smooth micro-animations
  - Responsive layout

- **Three-Panel Layout**
  - Collapsible sidebar
  - Central workspace
  - Settings panel

- **Image Management**
  - Full-screen preview modal
  - Image zoom on hover
  - Copy image URL
  - Download images

- **History System**
  - Persistent history storage
  - Quick access thumbnails
  - One-click restoration

- **Accessibility**
  - Keyboard navigation
  - ARIA labels
  - Focus indicators
  - Screen reader support

#### Desktop Support

- **Electron Integration**
  - Native window controls
  - System menu bar
  - Minimize to tray
  - Remember window size

- **Cross-Platform**
  - macOS (DMG)
  - Windows (EXE installer)
  - Linux (AppImage)

#### Mobile Support

- **Capacitor Integration**
  - Android APK build
  - Touch-optimized UI
  - Responsive design

#### Developer Experience

- **Build System**
  - electron-builder configuration
  - Platform-specific scripts
  - Development mode with DevTools

- **Documentation**
  - Comprehensive README
  - Contributing guidelines
  - API documentation
  - Keyboard shortcuts

---

### 🔧 Technical Details

#### Architecture

- **Frontend**: Vanilla HTML5/CSS3/ES6+ JavaScript
- **Backend**: Node.js HTTP server
- **Desktop**: Electron 28
- **Mobile**: Capacitor 5
- **Storage**: IndexedDB + localStorage
- **Build**: electron-builder

#### API Integration

- OpenAI-compatible endpoint
- Custom URL configuration
- Bearer token authentication
- Error handling with retry logic

#### Performance

- Parallel image generation
- Lazy loading for history
- Efficient DOM updates
- Memory-optimized storage

---

### 📦 Dependencies

#### Production

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | HTTP server |
| electron | ^28.0.0 | Desktop wrapper |
| electron-builder | ^24.9.1 | Build tool |

#### Development

| Package | Version | Purpose |
|---------|---------|---------|
| @capacitor/cli | ^5.0.0 | Mobile tooling |
| @capacitor/core | ^5.0.0 | Mobile runtime |

---

### 🔒 Security

- API keys stored locally (localStorage)
- No telemetry or analytics
- HTTPS for all API calls
- No external data collection

---

### 📊 Statistics

| Metric | Value |
|--------|-------|
| Files | 15+ |
| Lines of Code | 2000+ |
| Build Targets | 4 |
| Aspect Ratios | 9 |
| Keyboard Shortcuts | 4 |

---

## [Unreleased]

### 🚀 Planned Features

#### v1.1.0 (Planned)

- [ ] Streaming generation support
- [ ] Generation queue
- [ ] Style presets library
- [ ] Image enhancement tools

#### v1.2.0 (Planned)

- [ ] Custom model fine-tuning
- [ ] Batch export options
- [ ] Cloud sync for history
- [ ] Plugin system

#### v2.0.0 (Future)

- [ ] iOS support
- [ ] WebAssembly optimizations
- [ ] Collaborative features
- [ ] Advanced editing tools

---

## Versioning

We use [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Cycle

- **Major**: When ready (6-12 months)
- **Minor**: Monthly
- **Patch**: As needed

---

## Migration Guide

### From 0.x to 1.0.0

This is the initial stable release. No migration needed.

---

## Support

- **Documentation**: [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/fangdaclash/image2svip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fangdaclash/image2svip/discussions)

---

<div align="center">

**[Back to Top](#changelog)**

</div>
