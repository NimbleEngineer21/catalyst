# Story 1.6: Set Up Open-Source Community Foundation

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.6
**Priority:** P0 (Must Have)
**Status:** Planned
**Estimated Effort:** 5 hours

---

## User Story

**As a** project maintainer,
**I want** proper open-source governance files and configuration,
**so that** the project is ready for community contributions from day one.

---

## Context

This story establishes the open-source governance foundation for Catalyst, including license, code of conduct, contribution guidelines, security policy, and GitHub issue/PR templates. This ensures the project is welcoming, well-governed, and ready for community engagement.

**Dependencies:**
- Story 1.1: Initialize TypeScript Project Structure
- Story 1.5: Set Up Local Development Workflow (CONTRIBUTING.md references development.md)

**Enables:**
- Story 1.7: Create Multi-Audience Top-Level README (references these governance files)
- Story 1.8: Configure GitHub Repository for Community (uses these templates)
- Community contributions and engagement

**Reference Documentation:**
- [OSS Community Readiness Guide](../OSS_COMMUNITY_READINESS.md) - Complete guidance for this story

---

## Acceptance Criteria

### 1. LICENSE File
- [ ] `LICENSE` file created in project root
- [ ] **GNU AGPL v3.0-or-later** license text included
- [ ] License prevents commercial exploitation of forks
- [ ] License is compatible with all dependencies (verified in previous analysis)

### 2. CODE_OF_CONDUCT.md
- [ ] `CODE_OF_CONDUCT.md` created in project root
- [ ] **Contributor Covenant v2.1** adopted (recommended standard)
- [ ] Contact email/method specified for code of conduct violations
- [ ] Enforcement guidelines included
- [ ] Clear, welcoming tone

### 3. CODEOWNERS File
- [ ] `.github/CODEOWNERS` file created
- [ ] Initial owner configured: `@azywicki`
- [ ] Patterns defined for:
  - `*` (all files) - @azywicki
  - `/docs/` - @azywicki
  - `/src/` - @azywicki
  - `/.github/` - @azywicki
- [ ] Format follows GitHub CODEOWNERS specification
- [ ] Comments explain ownership structure

### 4. GitHub Issue Templates
- [ ] `.github/ISSUE_TEMPLATE/` directory created
- [ ] **Bug Report template** (`bug_report.yml`):
  - Description field
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - System information (OS, Node version, Catalyst version)
  - Additional context
- [ ] **Feature Request template** (`feature_request.yml`):
  - Problem description
  - Proposed solution
  - Alternatives considered
  - Additional context
- [ ] **Question template** (`question.yml`):
  - What are you trying to do?
  - What have you tried?
  - Links to relevant docs/issues
- [ ] **config.yml** created:
  - Blank issues disabled (must use templates)
  - Link to Discussions for questions

### 5. Pull Request Template
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` created
- [ ] Sections included:
  - **Description** - What does this PR do?
  - **Related Issue** - Fixes #123
  - **Type of Change** - Feature/Bug Fix/Docs/etc
  - **Testing** - How was this tested?
  - **Checklist**:
    - [ ] Tests added/updated
    - [ ] Documentation updated
    - [ ] Code follows style guidelines
    - [ ] All tests pass
    - [ ] No breaking changes (or documented)

### 6. SECURITY.md
- [ ] `SECURITY.md` created in project root
- [ ] Sections included:
  - **Supported Versions** - Which versions receive security updates
  - **Reporting a Vulnerability** - How to report securely (email, private issue)
  - **Security Policy** - Response timeline, disclosure process
  - **Known Issues** - Any known security considerations
- [ ] Contact email specified: security@catalystproject.dev (or appropriate)
- [ ] Responsible disclosure process documented

### 7. Package.json Metadata
- [ ] `package.json` author field set:
  ```json
  "author": "azywicki <81277290+NimbleEngineer21@users.noreply.github.com>"
  ```
- [ ] `package.json` repository field set:
  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/catalyst.git"
  }
  ```
- [ ] `package.json` keywords configured:
  ```json
  "keywords": [
    "ai",
    "development-tools",
    "cli",
    "mcp",
    "model-context-protocol",
    "homebrew",
    "typescript",
    "bmad",
    "automation"
  ]
  ```
- [ ] `package.json` bugs field set:
  ```json
  "bugs": {
    "url": "https://github.com/your-org/catalyst/issues"
  }
  ```
- [ ] `package.json` homepage field set:
  ```json
  "homepage": "https://github.com/your-org/catalyst#readme"
  ```

---

## Technical Implementation Notes

### LICENSE
The LICENSE file already exists with GNU AGPL v3.0. Verify it's complete and properly formatted.

### CODE_OF_CONDUCT.md Structure

```markdown
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

## Our Standards

[... continue with Contributor Covenant v2.1 text ...]

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at conduct@catalystproject.dev.

All complaints will be reviewed and investigated promptly and fairly.

[... complete enforcement guidelines ...]
```

### CODEOWNERS Example

```
# Catalyst CODEOWNERS
#
# This file defines individuals or teams responsible for code review
# in specific parts of the repository.

# Global ownership - all files
* @azywicki

# Documentation
/docs/ @azywicki

# Source code
/src/ @azywicki

# GitHub workflows and configuration
/.github/ @azywicki

# MCP Servers (future: may add specialized reviewers)
/mcp-servers/ @azywicki

# Build and release
/scripts/ @azywicki
/Formula/ @azywicki
```

### Bug Report Template Example

```yaml
name: Bug Report
description: Report a bug or issue with Catalyst
title: "[Bug]: "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug! Please fill out the information below.

  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of the bug
      placeholder: What went wrong?
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      description: How can we reproduce this issue?
      placeholder: |
        1. Run `catalyst setup`
        2. Select option X
        3. Error occurs
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What did you expect to happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened?
    validations:
      required: true

  - type: textarea
    id: system
    attributes:
      label: System Information
      description: Your environment details
      placeholder: |
        - OS: macOS 14.0
        - Node: v20.10.0
        - Catalyst Version: 0.1.0
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Any additional information (logs, screenshots, etc.)
```

### SECURITY.md Structure

```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly:

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please email: **security@catalystproject.dev**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 1 week
- **Fix Development:** Varies by severity
- **Disclosure:** Coordinated with reporter

### Disclosure Policy

We follow coordinated disclosure:
1. Vulnerability reported privately
2. Fix developed and tested
3. Release published
4. Public disclosure (with credit to reporter)

## Security Best Practices

When using Catalyst:
- Keep Node.js and npm updated
- Don't commit secrets to git (.env files excluded)
- Use environment variables for sensitive data
- Review MCP server permissions before enabling
- Keep Catalyst updated to latest version

## Known Security Considerations

- **AGPL License:** Ensures modifications remain open source
- **MCP Servers:** Review permissions before installation
- **Local File Access:** Catalyst can read/write local files (by design)
- **Shell Commands:** Catalyst executes shell commands (by design)

## Questions?

For security questions (not vulnerabilities), use [GitHub Discussions](https://github.com/your-org/catalyst/discussions).
```

---

## Architecture References

- [OSS Community Readiness](../OSS_COMMUNITY_READINESS.md) - Complete OSS setup guide
- [Security Architecture](../../architecture/08-security-architecture.md) - Security design

---

## Testing Strategy

**For this story:**
- Manual verification: All files created and properly formatted
- Verify CODEOWNERS syntax with GitHub's validator
- Test issue templates by creating sample issues (after Story 1.9)
- Verify all links in governance files are correct
- Review LICENSE is complete GNU AGPL v3.0 text

**Success Criteria:**
- All governance files in place
- Files follow community standards
- GitHub recognizes templates and CODEOWNERS

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] LICENSE file complete (GNU AGPL v3.0)
- [ ] CODE_OF_CONDUCT.md created (Contributor Covenant v2.1)
- [ ] CODEOWNERS file created with @azywicki
- [ ] GitHub issue templates created (bug, feature, question)
- [ ] Pull request template created
- [ ] SECURITY.md created with responsible disclosure process
- [ ] package.json metadata updated (author, repository, keywords, bugs, homepage)
- [ ] All files follow GitHub conventions and best practices
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- **License Already Exists:** LICENSE file was created earlier with AGPL-3.0
- **Email Addresses:** Use appropriate contact emails (security@, conduct@)
  - For now, can use GitHub Issues for enforcement until domain/email setup
- **CODEOWNERS Evolution:** As team grows, add more specific owners for areas
- **Issue Templates:** GitHub will show these when users create issues
- **Template Updates:** These can be refined based on community feedback
- **Future Enhancements:**
  - Add more specific issue templates (documentation, performance, etc.)
  - Add GitHub Actions for automated issue labeling
  - Create issue forms with more validation
  - Add FUNDING.yml if accepting sponsorships

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
