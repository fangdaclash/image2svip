# Contributing to image2svip

Thank you for your interest in contributing to image2svip! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

By participating, you agree to:
- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/image2svip.git
cd image2svip
npm install
```

---

## Development Setup

### Run in Development Mode

```bash
# Web mode
npm start

# Electron with DevTools
npm run electron:dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start web server on port 4173 |
| `npm run electron` | Run Electron app |
| `npm run electron:dev` | Run Electron with DevTools |
| `npm run build:mac` | Build for macOS |
| `npm run build:win` | Build for Windows |
| `npm run build:linux` | Build for Linux |
| `npm run build:all` | Build for all platforms |

---

## Project Structure

```
image2svip/
├── electron/
│   ├── main.js           # Main process entry point
│   └── preload.js        # Context bridge script
│
├── public/
│   ├── index.html        # App shell
│   ├── app.js            # Application logic
│   └── styles.css        # Design system
│
├── img/                   # Static assets (SVG icons)
├── server.js             # Node.js server
└── package.json          # Dependencies
```

### Key Files

- **`public/app.js`** - Core application logic (state management, API calls, UI rendering)
- **`public/styles.css`** - Complete design system with CSS variables
- **`electron/main.js`** - Desktop integration and API proxy server

---

## Coding Standards

### JavaScript

- Use ES6+ features (const, let, arrow functions, async/await)
- No semicolons (match existing codebase)
- Single quotes for strings
- 2-space indentation
- Use meaningful variable names

### CSS

- Use CSS custom properties (variables)
- Follow BEM-like naming for components
- Mobile-first responsive design
- Consistent spacing (8px grid system)

### HTML

- Semantic HTML5 elements
- Accessible (ARIA labels where needed)
- Minimal inline styles

---

## Commit Messages

Use Conventional Commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance

### Examples

```bash
feat(api): add streaming support
fix(ui): resolve mobile menu toggle
docs(readme): update installation guide
style(css): fix indentation in modal
```

---

## Pull Request Process

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow coding standards
- Test on multiple browsers
- Update documentation if needed

### 3. Commit Changes

```bash
git add .
git commit -m "feat(component): add new feature"
```

### 4. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- **Title**: Clear, concise description
- **Description**: What changed and why
- **Screenshots**: If UI changed

### PR Checklist

- [ ] Code follows project style
- [ ] No console errors
- [ ] Tested on desktop
- [ ] Documentation updated (if applicable)

---

## Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

---

## Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other context or screenshots.
```

---

## Development Tips

### Adding a New Feature

1. Create a feature branch
2. Add UI elements to `index.html`
3. Add styles to `styles.css`
4. Add logic to `app.js`
5. Test thoroughly
6. Update README if needed

### Debugging

- Use Electron DevTools: `Cmd/Ctrl + Shift + I`
- Check console for errors
- Test API calls with Network tab

### Testing Changes

1. Run `npm start` for web testing
2. Run `npm run electron:dev` for desktop testing
3. Test on different screen sizes

---

## Questions?

Open an issue or reach out on [GitHub Discussions](https://github.com/fangdaclash/image2svip/discussions).

---

Thank you for contributing! 🎉
