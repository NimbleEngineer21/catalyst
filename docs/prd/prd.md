# Product Requirements Document: Catalyst

**Version:** 2.0.0
**Last Updated:** October 26, 2025
**Status:** Draft
**Owner:** Development Team
**Distribution:** Homebrew

---

## Document Organization

This PRD is sharded into multiple documents for manageability. Read them in sequence:

### Core Documents

1. **[prd.md](prd.md)** (This Document) - Overview and Navigation
2. **[01-vision-and-goals.md](01-vision-and-goals.md)** - Product vision, objectives, and success criteria
3. **[02-users-and-use-cases.md](02-users-and-use-cases.md)** - User personas, use cases, and user journeys
4. **[03-features-and-requirements.md](03-features-and-requirements.md)** - Detailed feature specifications and requirements
5. **[04-technical-architecture.md](04-technical-architecture.md)** - System design, technology stack, and architecture
6. **[05-mcp-servers.md](05-mcp-servers.md)** - MCP server specifications and integrations
7. **[06-bmad-integration.md](06-bmad-integration.md)** - BMAD methodology integration and workflow
8. **[07-user-experience.md](07-user-experience.md)** - UX design, workflows, and interaction patterns
9. **[08-metrics-and-launch.md](08-metrics-and-launch.md)** - Success metrics, KPIs, and release plan

---

## Executive Summary

**Catalyst** is a Homebrew-distributed development environment that combines local AI capabilities, the BMAD methodology, and extensive MCP (Model Context Protocol) server integrations. It provides developers with a production-ready AI assistant ecosystem that runs entirely on their machine with optional cloud API support.

### The Problem

Developers currently face fragmented AI tooling:
- Manual context switching between AI chat and development tools
- Lack of standardized AI-assisted development workflows
- Privacy concerns with cloud-only AI solutions
- Difficulty integrating AI into existing development processes
- No unified framework for structured AI-driven development

### The Solution

Catalyst provides:
- **One-command installation** via Homebrew (`brew install catalyst`)
- **Intelligent environment detection** and automatic configuration
- **20+ MCP servers** for seamless tool integration (GitHub, Docker, databases, browsers, etc.)
- **BMAD methodology** built-in for structured development workflows
- **Multi-IDE support** (VS Code, Cursor, Claude Code, Windsurf, and 15+ others)
- **Local-first AI** with optional cloud APIs
- **Privacy-focused** - everything runs on the developer's machine

### Target Market

- **Primary:** Individual developers seeking AI-augmented development environments
- **Secondary:** Development teams standardizing on AI-assisted workflows
- **Tertiary:** Organizations using BMAD methodology

### Business Goals

1. Become the de facto standard for local AI development environments
2. Build an active community around Catalyst and BMAD integration
3. Enable 10,000+ developers to use AI-assisted development within first year
4. Create ecosystem for third-party MCP server development
5. Establish thought leadership in AI-augmented software development

---

## Key Metrics

### Success Metrics (12 Months)
- **Installations:** 10,000+ via Homebrew
- **Active Users:** 5,000+ monthly active developers
- **GitHub Stars:** 2,000+
- **MCP Servers:** 30+ available (including community contributions)
- **Community:** 1,000+ Discord members
- **Satisfaction:** 4.5+/5.0 average rating

### Leading Indicators
- Daily installations via Homebrew
- Setup completion rate
- MCP server activation rate
- BMAD agent usage frequency
- Time to first successful AI interaction
- Retention rate (7-day, 30-day)

---

## Product Scope

### In Scope (Version 2.0)

**Core Platform:**
- ✅ Homebrew distribution and installation
- ✅ CLI tool for setup, configuration, and management
- ✅ Intelligent IDE/extension detection
- ✅ BMAD methodology integration (full framework)
- ✅ Configuration generation for Continue.dev and Claude Code

**MCP Servers:**
- ✅ 7 essential servers (GitHub, Git, Filesystem, Docker, PostgreSQL, Fetch, Memory)
- ✅ 5 custom-built servers (Docker, PostgreSQL, Xcode, Storybook, Vite)
- ✅ Integration with 10+ community/official servers

**User Experience:**
- ✅ Interactive setup wizard
- ✅ Per-project initialization
- ✅ Update management with customization preservation
- ✅ Verification and troubleshooting tools

**Developer Experience:**
- ✅ Clear build pipeline with GitHub Actions
- ✅ Local development workflow
- ✅ MCP server development framework
- ✅ Comprehensive documentation

### Out of Scope (Future Versions)

**Version 2.1+:**
- ❌ Web-based dashboard for configuration
- ❌ Team collaboration features
- ❌ Remote MCP server hosting
- ❌ Windows/Linux native support (community can port)
- ❌ GUI installer (CLI-first approach)
- ❌ Custom model training/fine-tuning
- ❌ Marketplace for paid MCP servers
- ❌ Enterprise SSO/authentication

---

## Dependencies

### External Dependencies

**Required:**
- Homebrew (package manager)
- Node.js 20+ (for CLI and MCP servers)
- macOS (primary platform)

**Optional:**
- Docker Desktop (for Docker MCP)
- LM Studio (for local AI)
- PostgreSQL (for database MCP)
- Xcode (for iOS/macOS development)

**Third-Party:**
- BMAD Method (`npx bmad-method install`)
- Official MCP servers (`@modelcontextprotocol/*`)
- Continue.dev extension (if using VS Code)
- Claude Code (if using that IDE)

### Internal Dependencies

- MCP server implementations (custom-built)
- Configuration templates
- Build and release automation
- Documentation and guides

---

## Risk Assessment

### High Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| BMAD Method changes breaking compatibility | High | Version locking, automated testing, backup/restore |
| MCP protocol changes | High | Use stable SDK versions, maintain backwards compatibility |
| IDE/extension API changes | Medium | Abstraction layer, multiple IDE support |
| Homebrew formula rejection | High | Follow guidelines, community review, test extensively |

### Medium Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low adoption rate | Medium | Strong marketing, documentation, video tutorials |
| User environment complexity | Medium | Robust detection, clear error messages, doctor command |
| MCP server performance | Medium | Optimize implementations, async operations, caching |
| Security concerns with local execution | Medium | Sandboxing, permission checks, audit logging |

### Low Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| Documentation gaps | Low | Community contributions, feedback loops |
| LM Studio compatibility issues | Low | Fallback to cloud APIs, clear setup guides |
| Build pipeline failures | Low | Extensive CI/CD testing, manual release process backup |

---

## Assumptions

1. **User Technical Level:** Users are comfortable with command-line tools and Homebrew
2. **Network Access:** Users have internet connection for initial download (offline operation after)
3. **Disk Space:** Users have 50GB+ available for models and caches
4. **macOS Focus:** Primary development and testing on macOS (community can port)
5. **BMAD Stability:** BMAD Method will maintain stable API for v4.x releases
6. **MCP Adoption:** Model Context Protocol will gain wider adoption
7. **IDE Support:** Continue.dev and Claude Code will remain active projects
8. **Community Interest:** Developers want local AI development environments

---

## Constraints

### Technical Constraints
- Must work within Homebrew ecosystem and guidelines
- Must support multiple IDEs without tight coupling
- Cannot require admin privileges after installation
- Build artifacts must be under 500MB (excluding optional models)
- Must be compatible with Apple Silicon and Intel Macs

### Business Constraints
- Open source (GNU AGPL v3.0 license - prevents commercial exploitation of forks)
- No paid features in v2.0
- Community-driven development model
- Limited initial marketing budget

### Time Constraints
- Version 2.0 MVP: 3 months
- First public beta: 6 weeks
- Production release: 3 months

### Resource Constraints
- Small development team (1-2 developers initially)
- Community contributions for additional MCP servers
- Limited support capacity (community-based support)

---

## Success Criteria

### Must Have (P0)
- ✅ Successfully installs via `brew install catalyst` on clean macOS
- ✅ Detects and configures Continue.dev or Claude Code automatically
- ✅ All 7 essential MCP servers connect and function
- ✅ BMAD agents accessible and functional
- ✅ Per-project initialization creates correct structure
- ✅ Update process preserves user customizations
- ✅ `catalyst verify` passes on successful installation

### Should Have (P1)
- ✅ All 5 custom MCP servers fully implemented
- ✅ Interactive setup wizard with intelligent defaults
- ✅ Comprehensive documentation and examples
- ✅ `catalyst doctor` troubleshooting tool
- ✅ Video walkthrough of installation and first use
- ✅ GitHub Actions fully automated release pipeline

### Nice to Have (P2)
- ⭕ Support for additional IDEs (beyond Continue.dev/Claude Code)
- ⭕ LM Studio automatic installation and configuration
- ⭕ Pre-configured model recommendations
- ⭕ Sample projects demonstrating Catalyst usage
- ⭕ Community Discord server with active support

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | Oct 26, 2025 | Dev Team | Initial draft based on project brief |
| 2.0.0 | Oct 26, 2025 | Dev Team | Complete rewrite with Homebrew distribution model |

---

## Approvals

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | TBD | Pending | - |
| Technical Lead | TBD | Pending | - |
| QA Lead | TBD | Pending | - |

---

## Related Documents

- [Project Brief](../PROJECT_BRIEF_CATALYST.md) - High-level vision and architecture
- [Architecture Document](../architecture.md) - Detailed technical design (TBD)
- [API Documentation](../api/) - MCP server APIs (TBD)
- [User Guide](../guides/user-guide.md) - End-user documentation (TBD)
- [Developer Guide](../guides/developer-guide.md) - Contribution guidelines (TBD)

---

## Quick Reference

### Key Commands
```bash
brew install catalyst      # Install
catalyst setup            # Interactive setup
catalyst init             # Per-project init
catalyst verify           # Check installation
catalyst update           # Update BMAD/config
catalyst doctor           # Troubleshoot
```

### Key Files
```
~/.catalyst/              # Global configuration
~/.bmad-core/             # BMAD methodology
~/.continue/              # Continue.dev config (if used)
project/.catalyst/        # Project-specific config
project/.bmad-core/       # Project BMAD settings
```

### Support Channels
- GitHub Issues: [github.com/your-org/catalyst/issues](https://github.com/your-org/catalyst/issues)
- Discussions: [github.com/your-org/catalyst/discussions](https://github.com/your-org/catalyst/discussions)
- Discord: TBD

---

**Next:** Read [01-vision-and-goals.md](01-vision-and-goals.md) for detailed product vision and objectives.
