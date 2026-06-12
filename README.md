<p align="center">
  <img src="img/spark.svg" width="80" height="80" alt="image2svip logo">
</p>

<h1 align="center">image2svip</h1>

<p align="center">
  <strong>AI-Powered Image Generation Desktop Application</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/platform-Mac%20%7C%20Windows%20%7C%20Linux%20%7C%20Android-brightgreen.svg" alt="platform">
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg" alt="node">
</p>

<p align="center">
  A modern, cross-platform image generation application with a stunning dark UI, built with Electron and Capacitor. Generate images using GPT Image models with an elegant, professional interface.
</p>

---

## Features

- **AI Image Generation** - Generate images using `gpt-image-2` and `codex-gpt-image-2` models
- **Image-to-Image** - Upload reference images for guided generation
- **Batch Processing** - Generate up to 10 images simultaneously
- **Multiple Aspect Ratios** - 9 preset sizes from 21:9 ultrawide to 9:16 portrait
- **Local Storage** - All generated images stored locally via IndexedDB
- **History Management** - Browse and revisit previous generations
- **Cross-Platform** - Native apps for Mac, Windows, Linux, and Android

## Screenshots

<p align="center">
  <img src="docs/screenshot-dark.png" width="800" alt="Dark Mode Screenshot">
</p>

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- API Key from [zyflow.cn](https://www.zyflow.cn)

### Installation

```bash
# Clone the repository
git clone https://github.com/fangdaclash/image2svip.git
cd image2svip

# Install dependencies
npm install
```

### Run (Web Mode)

```bash
npm start
```

Open [http://localhost:4173](http://localhost:4173) in your browser.

### Run (Electron Desktop)

```bash
npm run electron:dev
```

## Building for Production

### Desktop Applications

```bash
# macOS (.dmg)
npm run build:mac

# Windows (.exe)
npm run build:win

# Linux (AppImage / .deb)
npm run build:linux

# All platforms
npm run build:all
```

Output directory: `dist/`

### Android APK

```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Initialize Capacitor (first time only)
npx cap init

# Add Android platform
npx cap add android

# Sync web assets
npx cap sync

# Open in Android Studio
npx cap open android
```

Build the APK from Android Studio.

## Project Structure

```
image2svip/
├── electron/                 # Electron desktop wrapper
│   ├── main.js              # Main process (server + window)
│   └── preload.js           # Context bridge for renderer
├── public/                   # Frontend assets
│   ├── index.html           # App shell
│   ├── app.js               # Application logic
│   └── styles.css           # Design system
├── img/                      # Icons and assets
├── server.js                 # Standalone Node.js server
├── capacitor.config.ts       # Capacitor configuration
├── package.json              # Dependencies & scripts
└── README.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML5 / CSS3 / ES6+ JavaScript |
| **Desktop** | Electron 28 |
| **Mobile** | Capacitor 5 |
| **Backend** | Node.js HTTP Server |
| **Storage** | IndexedDB + localStorage |
| **Design** | Custom CSS with CSS Variables |
| **Build** | electron-builder |

## Design System

The UI features a premium dark theme with:

- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Gradient Accents** - Cyan (#00F5FF) to Purple (#A855F7) gradients
- **Micro-animations** - Smooth transitions and hover effects
- **Responsive Layout** - 3-panel layout with collapsible sidebar
- **Keyboard Shortcuts** - Cmd+Enter to generate, Cmd+K to focus, Cmd+/ for theme

## API Configuration

### Default Endpoint

```
https://www.zyflow.cn/v1/chat/completions
```

### Custom Endpoint

Set environment variable before starting:

```bash
# macOS / Linux
export IMAGE2SVIP_API_URL="https://your-api.com/v1/chat/completions"

# Windows (PowerShell)
$env:IMAGE2SVIP_API_URL = "https://your-api.com/v1/chat/completions"
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Enter` | Generate image |
| `Cmd/Ctrl + K` | Focus prompt input |
| `Cmd/Ctrl + /` | Toggle dark/light theme |
| `Escape` | Close modals / panels |

## Development

```bash
# Run in development mode with DevTools
npm run electron:dev

# Run web server only
npm start
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Built with Electron and Capacitor
- UI inspired by Linear, Figma, and Arc Browser
- Icons from Lucide

---

<p align="center">
  Made with passion for creative AI
</p>
