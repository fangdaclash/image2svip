<div align="center">

# Contributing to image2svip

Thank you for considering contributing to image2svip! This guide will help you get started.

</div>

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Style Guide](#style-guide)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

### Unacceptable Behavior

- Harassment, trolling, or personal attacks
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

Ensure you have:

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Git** installed
- A code editor (VS Code recommended)

### First-Time Setup

```bash
# 1. Fork on GitHub, then clone
git clone https://github.com/YOUR_USERNAME/image2svip.git
cd image2svip

# 2. Install dependencies
npm install

# 3. Create a branch
git checkout -b feature/your-feature

# 4. Start development
npm run electron:dev
```

---

## Development Setup

### Recommended Tools

| Tool | Purpose |
|------|---------|
| [VS Code](https://code.visualstudio.com) | Code editor |
| [ES7+ Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) | Code snippets |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | Formatting |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | Linting |

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start web server |
| `npm run electron:dev` | Electron with DevTools |
| `npm run electron` | Electron production |
| `npm run build:mac` | Build for macOS |
| `npm run build:win` | Build for Windows |
| `npm run build:linux` | Build for Linux |

---

## How to Contribute

### Types of Contributions

#### 1. Code Contributions

- Bug fixes
- New features
- Performance improvements
- Refactoring

#### 2. Documentation

- README improvements
- Code comments
- Tutorials/guides
- translations

#### 3. Design

- UI improvements
- New icons
- Accessibility enhancements
- Mobile responsiveness

#### 4. Testing

- Bug reports
- Test cases
- Platform testing
- Performance testing

---

## Coding Standards

### JavaScript Guidelines

```javascript
// ✅ Good
const generateImage = async (prompt) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  return response.json();
};

// ❌ Bad
function generateImage(prompt) {
  return fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  }).then(function(response) {
    return response.json();
  });
}
```

### CSS Guidelines

```css
/* ✅ Good - Use CSS variables */
.button-primary {
  background: var(--accent-gradient);
  border-radius: var(--radius-md);
  transition: transform var(--transition-fast);
}

/* ❌ Bad - Hardcoded values */
.button-primary {
  background: linear-gradient(135deg, #00F5FF, #A855F7);
  border-radius: 12px;
  transition: transform 0.15s;
}
```

### HTML Guidelines

```html
<!-- ✅ Good - Semantic, accessible -->
<section class="prompt-section" aria-label="Image prompt">
  <label for="prompt-input">Enter your prompt</label>
  <textarea id="prompt-input" aria-describedby="prompt-hint"></textarea>
  <span id="prompt-hint">Describe the image you want to create</span>
</section>

<!-- ❌ Bad - Non-semantic -->
<div class="prompt-section">
  <div>Enter your prompt</div>
  <textarea></textarea>
  <div>Describe the image you want to create</div>
</div>
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `imageUrl`, `isGenerating` |
| Functions | camelCase | `generateImage()`, `handleClick()` |
| Classes | kebab-case | `result-frame`, `canvas-panel` |
| Constants | UPPER_SNAKE | `API_URL`, `MAX_IMAGES` |
| Files | kebab-case | `app.js`, `styles.css` |

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting (no code change) |
| `refactor` | Code restructuring |
| `test` | Adding tests |
| `chore` | Maintenance |
| `perf` | Performance improvement |

### Examples

```bash
# Feature
git commit -m "feat(generation): add batch processing support"

# Bug fix
git commit -m "fix(ui): resolve mobile menu toggle issue"

# Documentation
git commit -m "docs(readme): update installation guide"

# Refactor
git commit -m "refactor(api): extract API client module"
```

### Best Practices

- Use imperative mood ("add feature" not "added feature")
- Keep subject line under 72 characters
- Reference issues when applicable
- Separate subject from body with blank line

---

## Pull Request Process

### Before Creating a PR

1. **Update your fork**
   ```bash
   git fetch upstream
   git merge upstream/master
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make changes in small commits**

4. **Test thoroughly**

5. **Update documentation if needed**

### PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other: ___

## Testing

- [ ] Tested on macOS
- [ ] Tested on Windows
- [ ] Tested on Linux
- [ ] Tested on mobile

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### PR Title Format

```
<type>(<scope>): <description>
```

Example: `feat(generation): add style presets`

### Review Process

1. Automated checks must pass
2. At least one maintainer approval
3. Address all review comments
4. Squash and merge

---

## Reporting Bugs

### Bug Report Template

```markdown
## Describe the Bug

Clear description of the bug.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Screenshots

If applicable, add screenshots.

## Environment

- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

## Additional Context

Any other information.
```

---

## Requesting Features

### Feature Request Template

```markdown
## Problem Statement

Describe the problem you're facing.

## Proposed Solution

Describe your ideal solution.

## Alternatives Considered

Other solutions you've thought about.

## Additional Context

Mockups, examples, or references.
```

---

## Style Guide

### File Organization

```
public/
├── index.html      # App shell
├── app.js          # Core logic (organized by sections)
└── styles.css      # Organized by component
```

### CSS Organization

```css
/* 1. Variables */
:root { ... }

/* 2. Reset */
* { ... }

/* 3. Base styles */
body { ... }

/* 4. Components */
.button { ... }
.card { ... }

/* 5. Layout */
.sidebar { ... }
.workspace { ... }

/* 6. Utilities */
.hidden { ... }

/* 7. Animations */
@keyframes spin { ... }

/* 8. Media queries */
@media (max-width: 768px) { ... }
```

### JavaScript Organization

```javascript
// 1. Constants
const API_URL = '...';

// 2. State
const state = { ... };

// 3. DOM Elements
const els = { ... };

// 4. Utility Functions
function escapeHtml() { ... }

// 5. Core Functions
async function generate() { ... }

// 6. UI Functions
function renderResults() { ... }

// 7. Event Listeners
els.generate.addEventListener('click', generate);

// 8. Initialization
init();
```

---

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/fangdaclash/image2svip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fangdaclash/image2svip/discussions)
- **Email**: Contact maintainers directly

---

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!
