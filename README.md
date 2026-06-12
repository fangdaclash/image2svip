<p align="center">
  <img src="img/spark.svg" width="100" height="100" alt="image2svip logo">
</p>

<h1 align="center">image2svip</h1>

<p align="center">
  <strong>Professional AI Image Generation Suite</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/platform-Mac%20%7C%20Windows%20%7C%20Linux%20%7C%20Android-brightgreen.svg?style=flat-square" alt="platform">
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg?style=flat-square" alt="node">
  <img src="https://img.shields.io/badge/electron-28-purple.svg?style=flat-square" alt="electron">
</p>

<p align="center">
  A premium, cross-platform desktop application for AI-powered image generation. 
  Create stunning visuals using OpenAI's GPT Image models with an intuitive, 
  professionally designed interface that combines dark aesthetics with powerful functionality.
</p>

---

## About image2svip

**image2svip** is a modern image generation workstation designed for creators, designers, and AI enthusiasts. It provides a seamless bridge between powerful AI models and an elegant user experience, enabling you to transform text prompts into stunning visual content.

### Why image2svip?

- **No Coding Required** - Intuitive GUI for prompt engineering and image generation
- **Local-First** - Your API keys and generated images stay on your device
- **Cross-Platform** - One codebase, native experience on Mac, Windows, Linux, and Android
- **Professional Workflow** - Batch generation, history management, and instant previews
- **Beautiful Design** - Glassmorphism UI with smooth animations that's a pleasure to use

---

## Key Features

### AI-Powered Generation

| Feature | Description |
|---------|-------------|
| **Text-to-Image** | Generate images from natural language descriptions |
| **Image-to-Image** | Upload reference images for style transfer and editing |
| **Multi-Model Support** | Choose between `gpt-image-2` and `codex-gpt-image-2` |
| **Batch Processing** | Generate up to 10 images in parallel |

### Output Controls

| Control | Options |
|---------|---------|
| **Aspect Ratios** | 21:9, 16:9, 3:2, 4:3, 1:1, 3:4, 2:3, 9:16, Auto |
| **Batch Size** | 1-10 images per generation |
| **Image Quality** | Powered by OpenAI's latest models |

### User Experience

- **Dark Mode Default** - Eye-friendly dark theme with light mode toggle
- **Glassmorphism UI** - Modern frosted glass effects and gradients
- **Keyboard Shortcuts** - Power-user friendly with Cmd/Ctrl shortcuts
- **Drag & Drop** - Easy image upload with visual feedback
- **Image Preview** - Full-screen zoom for generated results
- **History Browser** - Quickly access and re-use previous generations

---

## Screenshots

### Desktop Interface

<p align="center">
  <img src="docs/screenshot-desktop.png" width="100%" alt="Desktop Screenshot">
</p>

### Key Screens

| Prompt Input | Generation Results | History Panel |
|:---:|:---:|:---:|
| <img src="docs/screen-prompt.png" width="200"> | <img src="docs/screen-results.png" width="200"> | <img src="docs/screen-history.png" width="200"> |

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** version 18 or higher
- **npm** (comes with Node.js) or **yarn**
- An **API Key** from [zyflow.cn](https://www.zyflow.cn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/fangdaclash/image2svip.git

# 2. Navigate to project directory
cd image2svip

# 3. Install dependencies
npm install
```

### Running the Application

#### Web Mode (Development)

```bash
npm start
```

Open [http://localhost:4173](http://localhost:4173) in your browser.

#### Electron Desktop Mode

```bash
# Development with DevTools
npm run electron:dev

# Production mode
npm run electron
```

---

## Building for Production

### Desktop Applications

#### macOS

```bash
npm run build:mac
```

Output: `dist/image2svip-1.0.0.dmg`

#### Windows

```bash
npm run build:win
```

Output: `dist/image2svip Setup 1.0.0.exe`

#### Linux

```bash
npm run build:linux
```

Output: `dist/image2svip-1.0.0.AppImage`

#### Build All Platforms

```bash
npm run build:all
```

### Android APK

```bash
# 1. Install Capacitor CLI
npm install -g @capacitor/cli

# 2. Initialize (first time only)
npx cap init "image2svip" "com.image2svip.app" --web-dir public

# 3. Add Android platform
npx cap add android

# 4. Sync web assets
npx cap sync

# 5. Open in Android Studio
npx cap open android
```

Build the APK from Android Studio's Build menu.

---

## Project Architecture

```
image2svip/
├── electron/                     # Desktop wrapper (Electron)
│   ├── main.js                  # Main process - server + window management
│   └── preload.js               # Secure context bridge
│
├── public/                       # Web frontend
│   ├── index.html               # App shell with semantic HTML
│   ├── app.js                   # Core application logic (1000+ lines)
│   └── styles.css               # Complete design system
│
├── img/                          # Static assets
│   ├── spark.svg                # App icon
│   ├── shua.svg                 # Favicon
│   └── *.svg                    # UI icons
│
├── server.js                     # Standalone Node.js server
├── capacitor.config.ts           # Mobile configuration
├── package.json                  # Dependencies & scripts
└── README.md
```

---

## Technology Stack

<table>
  <tr>
    <th>Layer</th>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>HTML5 / CSS3 / ES6+</td>
    <td>UI rendering and interaction</td>
  </tr>
  <tr>
    <td><strong>Desktop</strong></td>
    <td>Electron 28</td>
    <td>Native desktop packaging</td>
  </tr>
  <tr>
    <td><strong>Mobile</strong></td>
    <td>Capacitor 5</td>
    <td>Android APK generation</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Node.js HTTP</td>
    <td>API proxy and static serving</td>
  </tr>
  <tr>
    <td><strong>Storage</strong></td>
    <td>IndexedDB + localStorage</td>
    <td>Local image and settings storage</td>
  </tr>
  <tr>
    <td><strong>Build</strong></td>
    <td>electron-builder</td>
    <td>Platform-specific packaging</td>
  </tr>
</table>

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0A0A0A` | Main background |
| `--bg-secondary` | `#111111` | Card/panel background |
| `--accent-cyan` | `#00F5FF` | Primary accent |
| `--accent-purple` | `#A855F7` | Secondary accent |
| `--text-primary` | `#FFFFFF` | Headings |
| `--text-secondary` | `#A0A0A0` | Body text |

### Typography

- **Primary Font**: Inter (Google Fonts)
- **Monospace**: SF Mono / Fira Code
- **Headings**: Bold (700-800 weight)
- **Body**: Regular (400-500 weight)

### Components

- Glassmorphism panels with `backdrop-filter: blur()`
- Gradient borders and glowing accents
- Smooth cubic-bezier transitions
- Responsive grid layout

---

## API Configuration

### Default Endpoint

```
https://www.zyflow.cn/v1/chat/completions
```

### Custom API Endpoint

```bash
# macOS / Linux
export IMAGE2SVIP_API_URL="https://your-api.com/v1/chat/completions"

# Windows PowerShell
$env:IMAGE2SVIP_API_URL = "https://your-api.com/v1/chat/completions"
```

### Supported Models

| Model | Description |
|-------|-------------|
| `gpt-image-2` | Standard image generation model |
| `codex-gpt-image-2` | Code-optimized variant |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Enter` | Generate image |
| `Cmd/Ctrl + K` | Focus prompt input |
| `Cmd/Ctrl + /` | Toggle dark/light theme |
| `Escape` | Close modals / panels |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4173` | Server port |
| `IMAGE2SVIP_API_URL` | `https://www.zyflow.cn/v1/chat/completions` | API endpoint |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Test on multiple platforms if possible
- Update documentation for new features
- Keep commits atomic and descriptive

---

## Roadmap

- [ ] Streaming image generation
- [ ] Custom model fine-tuning support
- [ ] Image upscaling and enhancement
- [ ] Style presets library
- [ ] Cloud sync for history
- [ ] iOS app support
- [ ] Plugin system for extensions

---

## FAQ

**Q: Do I need an API key?**
A: Yes. You can obtain one from [zyflow.cn](https://www.zyflow.cn).

**Q: Are my images stored on a server?**
A: No. All images are stored locally on your device using IndexedDB.

**Q: Can I use this offline?**
A: You need an internet connection for AI generation, but browsing history works offline.

**Q: Is this free?**
A: The application is open-source (MIT License). API usage may incur costs based on your plan.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [OpenAI](https://openai.com) for GPT Image models
- [Electron](https://electronjs.org) for desktop framework
- [Capacitor](https://capacitorjs.com) for mobile support
- [Inter](https://rsms.me/inter/) font family
- UI inspired by [Linear](https://linear.app), [Figma](https://figma.com), and [Arc Browser](https://arc.net)

---

<p align="center">
  Built with passion for creative AI
</p>

<p align="center">
  <a href="https://github.com/fangdaclash/image2svip">GitHub</a> · 
  <a href="https://github.com/fangdaclash/image2svip/issues">Report Bug</a> · 
  <a href="https://www.zyflow.cn">Get API Key</a>
</p>
