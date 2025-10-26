# Catalyst Guides

**Audience:** End users, developers, operators, and contributors
**Purpose:** Practical guides for using, developing, and operating Catalyst

---

## Overview

This directory contains user-facing and operational guides for Catalyst. These documents are designed to help different audiences successfully use, develop, and operate the Catalyst development environment.

---

## Available Guides

### For Users

These guides help end users get started with Catalyst and understand how to use it effectively.

- **[Coming in Story 6.1]** User Guide - Complete guide for end users
- **[Coming in Story 6.3]** API Reference - CLI commands and options
- **[Coming in Story 6.6]** Troubleshooting Guide - Common issues and solutions

### For Developers

These guides help developers set up their local environment and contribute to Catalyst.

- **[Coming in Story 1.5]** [Development Guide](development.md) - Local development setup and workflow
- **[Coming in Epic 6]** Contributing Guide - How to contribute to Catalyst

### For Operators

These guides help operators configure and optimize Catalyst deployments.

- **[LM Studio Models Guide](lm-studio-models.md)** - Model recommendations and configuration for Apple Silicon
- **[LM Studio MCP Publishing Guide](lm-studio-mcp-publishing.md)** - How to publish and distribute Catalyst MCP servers

---

## Guide Organization

Guides are organized by audience and use case:

```
docs/guides/
├── README.md                        # This file - guide index
├── lm-studio-models.md             # Model recommendations (operators/users)
├── lm-studio-mcp-publishing.md     # MCP server distribution (operators/maintainers)
├── development.md                   # [Story 1.5] Local dev setup (developers)
├── user-guide.md                   # [Story 6.1] End user guide
├── api-reference.md                # [Story 6.3] CLI API reference
└── troubleshooting.md              # [Story 6.6] Common issues
```

---

## Related Documentation

### For Architecture and Design
See [docs/architecture/](../architecture/) for technical architecture documentation

### For Product Requirements
See [docs/prd/](../prd/) for product requirements and specifications

### For Implementation Stories
See [docs/stories/](../stories/) for epic and story definitions

### For Project Overview
See [DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md) for complete documentation map

---

## Document Standards

All guides in this directory should follow these standards:

### Structure
- **Audience declaration** at the top (who is this for?)
- **Purpose statement** (what problem does this solve?)
- **Clear sections** with descriptive headings
- **Examples** and code snippets where applicable
- **Links to related guides** and documentation

### Style
- **Practical and actionable** - guides should help users DO something
- **Clear and concise** - avoid unnecessary jargon
- **Step-by-step instructions** where appropriate
- **Visual aids** (screenshots, diagrams) when helpful
- **Troubleshooting sections** for common issues

### Maintenance
- **Last updated date** at the top of each guide
- **Version compatibility** noted where applicable
- **Regular reviews** to ensure accuracy
- **User feedback** incorporated when available

---

## Contributing to Guides

If you'd like to improve these guides:

1. **For typos/fixes**: Open a PR with your changes
2. **For new guides**: Open an issue to discuss first
3. **For major rewrites**: Discuss in GitHub Discussions

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for more details.

---

**Last Updated:** October 26, 2025
**Maintained By:** Catalyst Team
