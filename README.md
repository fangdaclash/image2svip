<div align="center">

<img src="img/spark.svg" width="120" height="120" alt="image2svip Logo">

# image2svip

**Professional AI Image Generation Suite**

Cross-platform desktop application for AI-powered image creation with an elegant, modern interface.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)](https://github.com/fangdaclash/image2svip/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/Platform-Mac%20%7C%20Windows%20%7C%20Linux%20%7C%20Android-purple.svg?style=flat-square)](#installation)
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)](#building)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](CONTRIBUTING.md)

<br>

[Features](#features) • [Screenshots](#screenshots) • [Installation](#installation) • [Usage](#usage) • [Building](#building) • [API](#api-configuration) • [Contributing](#contributing) • [License](#license)

</div>

---

## About

**image2svip** is a premium cross-platform image generation workstation designed for creators, designers, and AI enthusiasts. It bridges powerful AI models with an intuitive user experience, enabling stunning visual content creation through natural language.

### Why image2svip?

| Problem | Solution |
|---------|----------|
| Complex AI interfaces | Intuitive GUI for prompt engineering |
| Cloud-only tools | Local-first approach, your data stays yours |
| Platform lock-in | Native apps for Mac, Windows, Linux, Android |
| Poor UX | Beautiful glassmorphism UI with smooth animations |
| Single image workflow | Batch generation (1-10 images) with history |

---

## Features

### Core Capabilities

<table>
<tr>
<td width="50%">

**AI-Powered Generation**

- Text-to-image from natural language
- Image-to-image with reference uploads
- Multi-model support (GPT Image variants)
- Batch processing (1-10 images)

</td>
<td width="50%">

**Output Controls**

- 9 aspect ratio presets
- Auto or manual sizing
- Parallel generation
- Instant preview

</td>
</tr>
</table>

### User Experience

- **Dark Mode Default** - Eye-friendly design with light mode toggle
- **Glassmorphism UI** - Modern frosted glass effects
- **Keyboard Shortcuts** - Power-user friendly
- **Drag & Drop** - Easy image uploads
- **Full-Screen Preview** - Zoom into details
- **History Management** - Quick access to past generations

---

## Screenshots

<p align="center">
<img src="docs/screenshot-main.png" width="800" alt="Main Interface">
<br>
<em>Professional dark interface with glassmorphism effects</em>
</p>

<p align="center">
<img src="docs/screenshot-gallery.png" width="800" alt="Gallery View">
<br>
<em>Generate and browse multiple images</em>
</p>

---

## Installation

### Prerequisites

| Requirement | Version | Check |
|------------|---------|-------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Latest | `git --version` |

### Quick Start

```bash
# Clone repository
git clone https://github.com/fangdaclash/image2svip.git

# Install dependencies
cd image2svip
npm install

# Start development server
npm start
```

Open [http://localhost:4173](http://localhost:4173) in your browser.

### Platform-Specific Setup

<details>
<summary><strong>macOS</strong></summary>

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Then follow Quick Start above
```

</details>

<details>
<summary><strong>Windows</strong></summary>

```powershell
# Install build tools (if needed)
npm install -g windows-build-tools

# Then follow Quick Start above
```

</details>

<details>
<summary><strong>Linux (Ubuntu/Debian)</strong></summary>

```bash
# Install build dependencies
sudo apt update
sudo apt install build-essential libssl-dev

# Then follow Quick Start above
```

</details>

---

## Usage

### Web Mode

```bash
npm start
# Server runs at http://localhost:4173
```

### Desktop Mode (Electron)

```bash
# Development with DevTools
npm run electron:dev

# Production mode
npm run electron
```

### Mobile (Android)

```bash
# Build and open in Android Studio
npm run build:apk
```

---

## Building

### Build Scripts

| Command | Output | Description |
|---------|--------|-------------|
| `npm run build:mac` | `.dmg` | macOS application |
| `npm run build:win` | `.exe` | Windows installer |
| `npm run build:linux` | `.AppImage` | Linux package |
| `npm run build:all` | All above | Build for all platforms |

### Build Output

```
dist/
├── image2svip-1.0.0.dmg          # macOS
├── image2svip Setup 1.0.0.exe    # Windows
└── image2svip-1.0.0.AppImage     # Linux
```

### Android APK

```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Initialize and add Android
npx cap init
npx cap add android

# Sync and build
npx cap sync
npx cap open android

# Build APK in Android Studio
```

---

## Architecture

### Project Structure

```
image2svip/
├── electron/                 # Desktop wrapper
│   ├── main.js              # Main process
│   └── preload.js           # Context bridge
│
├── public/                   # Frontend
│   ├── index.html           # App shell
│   ├── app.js               # Core logic
│   └── styles.css           # Design system
│
├── img/                      # Assets
├── server.js                 # Backend server
├── capacitor.config.ts       # Mobile config
└── package.json              # Dependencies
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI | HTML5/CSS3/ES6+ | Interface rendering |
| Desktop | Electron 28 | Native packaging |
| Mobile | Capacitor 5 | Android support |
| Server | Node.js | API proxy |
| Storage | IndexedDB | Local data |
| Build | electron-builder | Packaging |

### Design System

```css
/* Color Palette */
--bg-primary: #0A0A0A;      /* Deep black */
--bg-secondary: #111111;    /* Card background */
--accent-cyan: #00F5FF;     /* Primary accent */
--accent-purple: #A855F7;   /* Secondary accent */

/* Typography */
font-family: 'Inter', system-ui, sans-serif;

/* Effects */
backdrop-filter: blur(12px); /* Glassmorphism */
```

---

## API Configuration

### Default Endpoint

```
https://www.zyflow.cn/v1/chat/completions
```

### Custom Endpoint

```bash
# macOS/Linux
export IMAGE2SVIP_API_URL="https://your-api.com/v1/chat/completions"

# Windows PowerShell
$env:IMAGE2SVIP_API_URL = "https://your-api.com/v1/chat/completions"
```

### Supported Models

| Model | Type | Description |
|-------|------|-------------|
| `gpt-image-2` | Standard | General image generation |
| `codex-gpt-image-2` | Optimized | Code-optimized variant |

### API Key

Obtain from [zyflow.cn](https://www.zyflow.cn) and enter in the app.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘/Ctrl + Enter` | Generate image |
| `⌘/Ctrl + K` | Focus prompt |
| `⌘/Ctrl + /` | Toggle theme |
| `Escape` | Close panels |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4173` | Server port |
| `IMAGE2SVIP_API_URL` | (default endpoint) | API URL |

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Make changes and test
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing`
6. Open Pull Request

---

## Roadmap

- [ ] Streaming generation support
- [ ] Custom model training
- [ ] Image enhancement tools
- [ ] Style presets library
- [ ] Cloud sync
- [ ] iOS support
- [ ] Plugin system

---

## FAQ

**Q: Is this free?**
A: Yes, the app is MIT licensed. API usage may have costs.

**Q: Are my images safe?**
A: Yes, everything stays on your device.

**Q: Do I need internet?**
A: Only for generation. History works offline.

---

## License

[MIT License](LICENSE) - Free for personal and commercial use.

---

## Acknowledgments

- [OpenAI](https://openai.com) for GPT models
- [Electron](https://electronjs.org) for desktop
- [Capacitor](https://capacitorjs.com) for mobile
- [Inter](https://rsms.me/inter/) font
- Inspired by [Linear](https://linear.app), [Figma](https://figma.com)

---

<div align="center">

**[GitHub](https://github.com/fangdaclash/image2svip)** • **[Report Bug](https://github.com/fangdaclash/image2svip/issues)** • **[Get API Key](https://www.zyflow.cn)**

Made with passion for creative AI

</div>
