# Security Policy

## Supported Versions

We release security updates for the following versions of Catalyst:

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

**Note:** As Catalyst is in early development (pre-1.0), we focus security updates on the latest release. Once we reach stable 1.0, we'll maintain security support for multiple versions.

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in Catalyst, please report it responsibly.

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please use one of these secure channels:

1. **GitHub Security Advisories** (Preferred):
   - Navigate to the [Security tab](https://github.com/your-org/catalyst/security/advisories)
   - Click "Report a vulnerability"
   - Fill out the advisory form

2. **Email:**
   - Send to: **security@catalystproject.dev**
   - Or contact maintainer: **azywicki** via GitHub

### What to Include

When reporting a vulnerability, please include:

- **Description:** Clear description of the vulnerability
- **Steps to Reproduce:** Detailed steps to reproduce the issue
- **Potential Impact:** What could an attacker do with this vulnerability?
- **Affected Versions:** Which versions are affected?
- **Suggested Fix:** If you have ideas for a fix (optional)
- **Proof of Concept:** Code or commands demonstrating the issue (if safe to share)

### Response Timeline

We aim to respond to security reports with the following timeline:

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 1 week
- **Status Updates:** Every 7 days until resolved
- **Fix Development:** Varies by severity (see below)
- **Coordinated Disclosure:** After fix is released

### Severity Guidelines

| Severity | Response Time | Example |
|----------|---------------|---------|
| Critical | 1-7 days | Remote code execution, data breach |
| High | 7-14 days | Authentication bypass, privilege escalation |
| Medium | 14-30 days | XSS, CSRF, information disclosure |
| Low | 30-90 days | Minor information leaks, edge cases |

## Disclosure Policy

We follow **coordinated disclosure**:

1. **Private Report:** Vulnerability reported privately to maintainers
2. **Investigation:** We confirm and assess the vulnerability
3. **Fix Development:** We develop and test a fix
4. **Security Release:** We release a patched version
5. **Public Disclosure:** We publish a security advisory (with credit to reporter)
6. **CVE Assignment:** We request a CVE if applicable

We will work with you to ensure proper credit and coordinate disclosure timing.

## Security Best Practices

When using Catalyst, follow these security best practices:

### For Users

- **Keep Updated:** Always use the latest version of Catalyst
- **Node.js Security:** Keep Node.js and npm updated to latest LTS versions
- **Environment Variables:** Use environment variables for sensitive data (never commit secrets)
- **Secrets Management:** Never commit `.env` files or secrets to version control
- **MCP Server Permissions:** Review MCP server permissions before enabling
- **File Access:** Be aware that Catalyst can read/write local files by design
- **Shell Commands:** Catalyst executes shell commands - only run trusted scripts

### For Contributors

- **Dependency Updates:** Keep dependencies up to date with `npm audit`
- **Code Review:** All code changes require maintainer review
- **Input Validation:** Always validate user input and sanitize outputs
- **Least Privilege:** Request minimum permissions necessary
- **Secret Scanning:** Use GitHub secret scanning to prevent committed secrets
- **Secure Coding:** Follow OWASP secure coding guidelines

## Known Security Considerations

### By Design (Not Vulnerabilities)

These behaviors are intentional and necessary for Catalyst's functionality:

- **AGPL License:** Ensures all modifications remain open source
- **Local File Access:** Catalyst can read/write files in your project directory
- **Shell Execution:** Catalyst executes shell commands for build/test operations
- **MCP Server Access:** MCP servers have controlled access to system resources
- **Template Processing:** Templates can include executable code

### Risk Mitigation

We mitigate these risks by:

- Clear documentation of permissions and capabilities
- User consent before executing commands
- Sandboxed execution where possible
- Regular security audits of core functionality
- Community review of all code changes

## Security-Related Configuration

### Environment Variables

```bash
# Recommended: Use environment variables for sensitive data
CATALYST_CONFIG_PATH=/path/to/config
MCP_SERVER_KEY=your-api-key-here
```

### File Permissions

Ensure sensitive files have appropriate permissions:

```bash
chmod 600 .env
chmod 700 .catalyst/
```

## Security Updates

Subscribe to security updates:

- **Watch this repository** on GitHub for security advisories
- **Enable GitHub Security Alerts** for your fork
- **Check Releases** for security patches

## Scope

This security policy applies to:

- ✅ Catalyst CLI core functionality
- ✅ Bundled MCP servers
- ✅ Build and deployment scripts
- ✅ Official templates
- ❌ Third-party MCP servers (report to their maintainers)
- ❌ User-created templates (users responsible for their own code)

## Questions?

For security questions that don't require private disclosure:

- **GitHub Discussions:** [https://github.com/your-org/catalyst/discussions](https://github.com/your-org/catalyst/discussions)
- **Documentation:** Check [Security Architecture](docs/architecture/08-security-architecture.md)

## Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Contributors who report valid security issues will be listed here -->

*No security reports yet - be the first!*

---

**Last Updated:** October 26, 2025
