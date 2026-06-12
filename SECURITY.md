<div align="center">

# Security Policy

Your security is important to us. This document outlines how to report vulnerabilities and our security practices.

</div>

---

## Table of Contents

- [Supported Versions](#supported-versions)
- [Reporting Vulnerabilities](#reporting-vulnerabilities)
- [Security Measures](#security-measures)
- [Data Privacy](#data-privacy)
- [Best Practices](#best-practices)
- [Security Updates](#security-updates)

---

## Supported Versions

| Version | Supported | End of Support |
|---------|-----------|----------------|
| 1.0.x | ✅ Yes | TBD |
| < 1.0 | ❌ No | 2024-01-01 |

We provide security updates for the latest major version only.

---

## Reporting Vulnerabilities

### How to Report

**⚠️ Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the maintainers.

### What to Include

When reporting a vulnerability, please provide:

1. **Description**: Clear explanation of the vulnerability
2. **Type**: Category of the issue
3. **Impact**: Potential damage if exploited
4. **Reproduction**: Steps to reproduce the issue
5. **Proof of Concept**: Code or screenshots (if possible)
6. **Affected Versions**: Which versions are impacted
7. **Suggested Fix**: If you have one (optional)

### Vulnerability Types

| Type | Description | Severity |
|------|-------------|----------|
| **RCE** | Remote Code Execution | Critical |
| **SQL Injection** | Database manipulation | Critical |
| **XSS** | Cross-Site Scripting | High |
| **CSRF** | Cross-Site Request Forgery | High |
| **Authentication Bypass** | Unauthorized access | High |
| **Information Disclosure** | Data leakage | Medium |
| **Denial of Service** | Service disruption | Medium |

### Response Timeline

| Stage | Timeline |
|-------|----------|
| **Acknowledgment** | Within 48 hours |
| **Initial Assessment** | Within 1 week |
| **Fix Development** | Depends on severity |
| **Public Disclosure** | After fix is released |

---

## Security Measures

### Application Security

#### API Key Protection

```javascript
// Keys stored in localStorage (browser-only)
localStorage.setItem('image2svip.apiKey', encryptedKey);

// Never sent to third parties
// Only transmitted to configured API endpoint
```

#### Data Validation

- Input sanitization for all user inputs
- URL validation for API endpoints
- File type validation for image uploads
- Size limits on all uploads

#### Network Security

- HTTPS enforced for all API calls
- No mixed content warnings
- Secure headers in responses

### Code Security

- No eval() usage
- No dynamic code execution
- Content Security Policy headers
- Subresource Integrity for dependencies

---

## Data Privacy

### What We Collect

| Data | Location | Purpose |
|------|----------|---------|
| API Key | localStorage | Authentication |
| Settings | localStorage | User preferences |
| History | IndexedDB | Past generations |
| Images | IndexedDB | Generated content |

### What We DON'T Collect

- ❌ Personal information
- ❌ Usage analytics
- ❌ Crash reports
- ❌ Device information
- ❌ Location data
- ❌ Browsing history

### Data Storage

All data is stored locally on your device:

```
Browser Storage
├── localStorage
│   ├── image2svip.apiKey (encrypted)
│   ├── image2svip.model
│   ├── image2svip.size
│   └── image2svip.history
│
└── IndexedDB
    └── image2svip
        └── images/
            ├── img_xxx_001 (base64)
            ├── img_xxx_002 (base64)
            └── ...
```

### Data Control

- **Export**: Download your data anytime
- **Delete**: Clear all data with one click
- **Privacy**: No data leaves your device

---

## Best Practices

### For Users

1. **Protect Your API Key**
   - Never share your API key
   - Don't commit it to version control
   - Rotate keys periodically

2. **Use HTTPS**
   - Ensure API endpoint uses HTTPS
   - Don't use HTTP for sensitive operations

3. **Keep Updated**
   - Use the latest version
   - Apply security patches promptly

4. **Verify Downloads**
   - Download only from official sources
   - Verify file checksums when available

### For Developers

1. **Never Hardcode Secrets**
   ```javascript
   // ❌ Bad
   const API_KEY = 'sk-abc123...';
   
   // ✅ Good
   const API_KEY = process.env.API_KEY;
   ```

2. **Validate All Inputs**
   ```javascript
   // Always validate user input
   function sanitize(input) {
     return input.replace(/[<>]/g, '');
   }
   ```

3. **Use Secure Defaults**
   ```javascript
   // Secure configuration
   const config = {
     secure: true,
     sameSite: 'strict',
     httpOnly: true
   };
   ```

---

## Security Updates

### How We Handle Updates

1. **Monitoring**
   - Regular dependency audits
   - Security advisory monitoring
   - Community reports

2. **Patching**
   - Critical: Within 48 hours
   - High: Within 1 week
   - Medium: Next release
   - Low: Scheduled maintenance

3. **Communication**
   - GitHub Security Advisories
   - Release notes
   - README updates

### Checking for Updates

```bash
# Check for vulnerable dependencies
npm audit

# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix
```

---

## Dependency Security

### Automated Scanning

We use automated tools to scan dependencies:

- `npm audit` - Built-in vulnerability scanner
- GitHub Dependabot - Automated updates
- Manual review - For critical dependencies

### Dependency Policy

- Minimal dependencies
- Regular updates
- Security-first selection
- No unnecessary packages

---

## Contact

For security-related inquiries:

- **Email**: Contact maintainers via GitHub
- **Issues**: [GitHub Issues](https://github.com/fangdaclash/image2svip/issues) (non-sensitive only)

---

## Acknowledgments

We thank security researchers who responsibly disclose vulnerabilities.

---

<div align="center">

**[Back to Top](#security-policy)**

Made with care for user security

</div>
