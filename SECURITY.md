# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within image2svip, please send an email to the maintainers. All security vulnerabilities will be promptly addressed.

**Please do NOT report security vulnerabilities through public GitHub issues.**

### What to Include

When reporting a vulnerability, please include:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Fix Released**: Depends on severity, typically within 2 weeks

## Security Considerations

### API Keys

- API keys are stored locally in your browser's localStorage
- Keys are never sent to any server except the configured API endpoint
- Consider using environment variables for production deployments

### Image Storage

- All generated images are stored locally on your device
- Images are stored in IndexedDB, a browser-native database
- No images are uploaded to external servers (unless you explicitly share them)

### Network Traffic

- All API communication uses HTTPS
- No telemetry or analytics data is collected
- You can configure custom API endpoints for full control

### Dependencies

- We regularly update dependencies to patch known vulnerabilities
- Run `npm audit` to check for known vulnerabilities in dependencies

## Best Practices

When deploying or using image2svip:

1. **Keep Updated**: Always use the latest version
2. **Secure Your API Key**: Treat it like a password
3. **Use HTTPS**: Ensure your API endpoint uses HTTPS
4. **Review Permissions**: Be aware of what the application can access
5. **Monitor Network**: Use browser DevTools to inspect network requests

## Contact

For security-related inquiries, please contact the maintainers directly via GitHub.
