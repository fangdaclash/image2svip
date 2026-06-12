<div align="center">

<img src="img/spark.svg" width="120" height="120" alt="image2svip Logo">

# image2svip

**Professional AI Image Generation Suite**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)](https://github.com/fangdaclash/image2svip/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/Platform-Mac%20%7C%20Windows%20%7C%20Linux%20%7C%20Android-purple.svg?style=flat-square)](#installation)

---

[Features](#features) • [Quick Start](#quick-start) • [Installation](#installation) • [Usage](#usage) • [Building](#building-for-production) • [API Config](#api-configuration) • [Contributing](#contributing) • [License](#license)

</div>

---

## Introduction

image2svip is an open-source, cross-platform AI image generation application that brings the power of GPT Image models to your desktop and mobile devices. Built with modern web technologies and packaged natively for every major platform, it provides a seamless, privacy-focused experience for creating AI-generated images.

### The Problem We Solve

AI image generation has become incredibly powerful, but the tools available today have significant limitations:

- **Complex Interfaces** — Most AI tools require technical knowledge, API calls, or complicated workflows
- **Privacy Concerns** — Cloud-based tools store your prompts, images, and data on external servers
- **Platform Fragmentation** — You're stuck with whatever platform the tool runs on
- **No Local Control** — Generated images are often locked into proprietary ecosystems
- **Poor Developer Experience** — Building custom workflows requires significant boilerplate

### Our Solution

image2svip addresses every one of these pain points:

| Pain Point | Our Solution |
|------------|-------------|
| Complex workflows | Clean, intuitive GUI with drag-and-drop support |
| Privacy issues | 100% local-first architecture — your data never leaves your device |
| Platform lock-in | Native apps for macOS, Windows, Linux, and Android |
| No local control | All images stored locally in IndexedDB with full export capabilities |
| Poor DX | Simple `npm install && npm start` to get running in seconds |

### Who Is This For?

**Designers & Creatives** — Quickly generate concept art, mood boards, and visual assets without switching between tools. The batch generation feature lets you explore multiple variations simultaneously.

**Developers & Engineers** — Integrate AI image generation into your workflow. The clean API proxy architecture means you can extend it or use it as a reference implementation.

**Content Creators** — Generate unique visuals for social media, blogs, and presentations. The history feature keeps your best generations organized and accessible.

**AI Enthusiasts** — Experiment with different models and prompts in a comfortable, local environment. No rate limits, no data collection, no restrictions.

---

## Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Text-to-Image** | Generate images from natural language descriptions |
| **Image-to-Image** | Upload reference images for guided generation and editing |
| **Multi-Model Support** | Choose between `gpt-image-2` and `codex-gpt-image-2` |
| **Batch Generation** | Generate 1–10 images simultaneously with parallel processing |
| **9 Aspect Ratios** | 21:9, 16:9, 3:2, 4:3, 1:1, 3:4, 2:3, 9:16, and Auto |
| **History Management** | Browse, search, and re-use past generations |
| **Local Storage** | All images stored in IndexedDB — no cloud dependency |
| **Image Preview** | Full-screen zoom with instant magnification |

### Platform Support

| Platform | Format | Status |
|----------|--------|--------|
| macOS | `.dmg` / `.app` | Supported |
| Windows | `.exe` installer | Supported |
| Linux | `.AppImage` / `.deb` | Supported |
| Android | `.apk` | Supported |
| Web | Browser | Supported |

### Design

- Dark mode by default with light mode toggle
- Glassmorphism UI with backdrop blur effects
- Cyan (`#00F5FF`) and purple (`#A855F7`) accent gradients
- Smooth micro-animations on all interactive elements
- Responsive 3-panel layout with collapsible sidebar
- Keyboard shortcuts for power users (`Cmd/Ctrl+Enter`, `Cmd/Ctrl+K`, `Cmd/Ctrl+/`)

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/fangdaclash/image2svip.git
cd image2svip
npm install
```

### 2. Start the App

```bash
npm start
```

Open [http://localhost:4173](http://localhost:4173).

### 3. Enter Your API Key

1. Paste your API key in the sidebar
2. Click **Save**
3. Type a prompt and click **Generate**

That's it. You're generating images.

---

## Installation

### Requirements

| Dependency | Minimum Version | Notes |
|------------|----------------|-------|
| Node.js | 18.0+ | LTS recommended |
| npm | 9.0+ | Ships with Node.js |
| Git | Latest | For cloning |

### Platform-Specific Notes

<details>
<summary><strong>macOS</strong></summary>

```bash
xcode-select --install
```

</details>

<details>
<summary><strong>Windows</strong></summary>

```powershell
npm install -g windows-build-tools
```

</details>

<details>
<summary><strong>Linux</strong></summary>

```bash
sudo apt update && sudo apt install build-essential libssl-dev
```

</details>

---

## Usage

### Web Mode

```bash
npm start
# → http://localhost:4173
```

### Desktop Mode (Electron)

```bash
npm run electron:dev   # Development with DevTools
npm run electron       # Production mode
```

### Android

```bash
npm install -g @capacitor/cli
npx cap init
npx cap add android
npx cap sync
npx cap open android
# Build APK from Android Studio
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Enter` | Generate image |
| `Cmd/Ctrl + K` | Focus prompt input |
| `Cmd/Ctrl + /` | Toggle dark/light theme |
| `Escape` | Close modals and panels |

---

## Building for Production

| Command | Platform | Output |
|---------|----------|--------|
| `npm run build:mac` | macOS | `dist/*.dmg` |
| `npm run build:win` | Windows | `dist/*.exe` |
| `npm run build:linux` | Linux | `dist/*.AppImage` |
| `npm run build:all` | All | All of the above |

---

## API Configuration

### Default Endpoint

```
https://www.zyflow.cn/v1/chat/completions
```

### Custom Endpoint

```bash
export IMAGE2SVIP_API_URL="https://your-endpoint.com/v1/chat/completions"
```

### Supported Models

| Model | Description |
|-------|-------------|
| `gpt-image-2` | Standard image generation |
| `codex-gpt-image-2` | Code-optimized variant |

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4173` | Server port |
| `IMAGE2SVIP_API_URL` | zyflow.cn endpoint | API endpoint URL |

---

## Architecture

```
image2svip/
├── electron/              # Desktop wrapper (Electron)
│   ├── main.js           # Main process + API proxy server
│   └── preload.js        # Secure context bridge
├── public/                # Frontend application
│   ├── index.html        # App shell (semantic HTML5)
│   ├── app.js            # Core application logic
│   └── styles.css        # Design system (CSS variables)
├── img/                   # SVG icons and assets
├── server.js              # Standalone Node.js server
├── capacitor.config.ts    # Android configuration
└── package.json           # Dependencies and scripts
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5 / CSS3 / ES6+ |
| Desktop | Electron 28 |
| Mobile | Capacitor 5 |
| Server | Node.js HTTP |
| Storage | IndexedDB + localStorage |
| Build | electron-builder |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

Quick start:

```bash
git checkout -b feature/your-feature
# make changes
git commit -m "feat: add your feature"
git push origin feature/your-feature
# open a Pull Request
```

---

## Roadmap

- [ ] Streaming generation support
- [ ] Style presets library
- [ ] Image upscaling and enhancement
- [ ] Cloud sync for history
- [ ] iOS app support
- [ ] Plugin system

---

## License

[MIT License](LICENSE) — free for personal and commercial use.

---

## Acknowledgments

- [OpenAI](https://openai.com) for GPT Image models
- [Electron](https://electronjs.org) for desktop packaging
- [Capacitor](https://capacitorjs.com) for mobile support
- [Inter](https://rsms.me/inter/) font family

---

<div align="center">

**[GitHub](https://github.com/fangdaclash/image2svip)** · **[Report Bug](https://github.com/fangdaclash/image2svip/issues)** · **[Get API Key](https://www.zyflow.cn)**

</div>
