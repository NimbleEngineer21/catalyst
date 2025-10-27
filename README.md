<div align="center">

# 🚀 Catalyst

**AI-Powered Development Environment with BMAD Methodology**

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/NimbleEngineer21/catalyst/releases)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Build Status](https://github.com/NimbleEngineer21/catalyst/workflows/CI/badge.svg)](https://github.com/NimbleEngineer21/catalyst/actions)
[![GitHub stars](https://img.shields.io/github/stars/NimbleEngineer21/catalyst)](https://github.com/NimbleEngineer21/catalyst/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/NimbleEngineer21/catalyst)](https://github.com/NimbleEngineer21/catalyst/issues)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)

**Your complete AI development toolkit, running locally on your Mac**

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [Community](#-community)

</div>

---

## What is Catalyst?

Catalyst helps developers harness AI assistants more effectively by providing a complete, privacy-focused toolkit that runs entirely on your Mac. Think of it as your AI development command center - everything you need to work with AI coding assistants, all in one simple package.

**The Problem:** AI coding tools are fragmented and cloud-dependent. Setting up Continue.dev, managing MCP (Model Context Protocol) servers, configuring local AI models, and following structured development methodologies requires hours of setup across dozens of tools.

**The Solution:** Catalyst brings everything together in one Homebrew-installable package. Install once, get instant access to 20+ integrated development tools, local AI support, and the complete BMAD (Brian Madison Development) methodology for structured software development.

**Key Benefits:**

- **Privacy First** - Everything runs on your machine; cloud APIs are completely optional
- **One-Command Setup** - `brew install catalyst` gets you a complete AI development environment
- **Proven Methodology** - BMAD integration provides 10 AI agent roles for the complete software development lifecycle
- **Extensible** - Open source and designed for customization

---

## Quick Start

### Installation via Homebrew

```bash
# Install Catalyst
brew install catalyst

# Run the interactive setup wizard
catalyst setup

# Initialize in your project
cd your-project
catalyst init

# Verify everything works
catalyst verify
```

**Expected output:**

```text
✅ Catalyst 0.1.0
✅ BMAD Method installed
✅ MCP servers configured
✅ All systems operational!
```

**Next Steps:** Check out the [User Guide](docs/guides/README.md) for detailed usage instructions and tutorials.

---

## Key Features

- **BMAD Methodology Integration** - Complete structured development framework with 10 AI agent roles (Product Owner, Developer, QA, Architect, and more)
- **20+ MCP Server Management** - GitHub, Docker, PostgreSQL, Git, Filesystem, Browser automation, and more - all configured automatically
- **LM Studio Integration** - Run AI models locally with MLX optimization for Apple Silicon (M1/M2/M3)
- **Development Automation** - Structured workflows, templates, and tasks for the complete software development lifecycle
- **Multi-IDE Support** - Works with VS Code, Cursor, Claude Code, Windsurf, and 15+ other IDEs
- **Open-Source & Extensible** - AGPL v3.0 licensed, fully customizable and transparent

---

## Demo

```bash
# Example: Using Catalyst with BMAD agents in your IDE

# Initialize a new project with BMAD methodology
catalyst init --type fullstack

# The Product Owner agent creates structured requirements
@po create epic for user authentication

# Developer agent implements the story with tests
@dev implement story 1.2 from epic-1-auth.md

# QA agent reviews implementation and runs tests
@qa review story 1.2

# All coordinated through MCP servers - Git, GitHub, Docker, etc.
```

**How it works:** Catalyst configures your IDE with MCP servers that give AI assistants real capabilities - creating GitHub PRs, running Docker containers, querying databases, and more. Combined with BMAD methodology, you get structured, professional development workflows powered by AI.

---

## Documentation

### For Users

Perfect for developers who want to use Catalyst in their daily work:

- [User Guide](docs/guides/README.md) - Complete installation and usage guide
- [Development Guide](docs/guides/development.md) - Local development workflow and best practices
- [LM Studio Setup](docs/guides/lm-studio-models.md) - Configure local AI models
- [Troubleshooting](docs/guides/development.md#troubleshooting) - Common issues and solutions

### For Developers

For those who want to understand how Catalyst works under the hood:

- [Architecture Overview](docs/architecture/README.md) - System design and technical details
- [Technology Stack](docs/architecture/02-technology-stack.md) - Technologies and design decisions
- [CLI Architecture](docs/architecture/03-cli-architecture.md) - Command-line interface design
- [MCP Server Architecture](docs/architecture/04-mcp-server-architecture.md) - How MCP servers are managed
- [Project Structure](docs/architecture/10-project-structure.md) - Codebase organization

### For Contributors

Ready to help make Catalyst better?

- [Contributing Guide](CONTRIBUTING.md) - How to contribute code, documentation, and ideas
- [Development Setup](docs/guides/development.md) - Set up local development environment
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards and expectations
- [Good First Issues](https://github.com/NimbleEngineer21/catalyst/labels/good-first-issue) - Great starting points for new contributors

---

## Community

Join the Catalyst community to get help, share ideas, and collaborate:

- **[GitHub Discussions](https://github.com/NimbleEngineer21/catalyst/discussions)** - Ask questions, share use cases, discuss ideas
- **[Issue Tracker](https://github.com/NimbleEngineer21/catalyst/issues)** - Report bugs and request features
- **[Security Reports](SECURITY.md)** - Responsible disclosure of security vulnerabilities

**Getting Help:**

1. Check the [User Guide](docs/guides/README.md) and [Troubleshooting](docs/guides/development.md#troubleshooting)
2. Run `catalyst doctor` to diagnose common issues
3. Search [GitHub Discussions](https://github.com/NimbleEngineer21/catalyst/discussions) for similar questions
4. Create a new discussion or issue if you need help

**Code of Conduct:** We are committed to providing a welcoming and inclusive community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Available MCP Servers

Catalyst includes these MCP servers, configured automatically:

**Essential (7 servers):**

- **GitHub** - Repository management, issues, pull requests, workflows
- **Git** - Local repository operations
- **Filesystem** - Safe file operations with permissions
- **Docker** - Container management and orchestration
- **PostgreSQL** - Database operations and queries
- **Fetch** - Web content retrieval and HTTP requests
- **Memory** - Persistent knowledge graph for AI context

**Development Tools (5+ servers):**

- **Vite** - Frontend build and development server
- **Xcode** - iOS and macOS development tools
- **Storybook** - Component documentation and testing
- **Playwright** - Browser automation and end-to-end testing
- **Figma** - Design-to-code integration

All servers are pre-configured and work immediately after `catalyst setup`. Learn more in the [MCP Server Architecture docs](docs/architecture/04-mcp-server-architecture.md).

---

## Why Catalyst?

### Before Catalyst

```text
You: "Hey AI, create a GitHub PR for this bug fix"
AI: "Here are the git commands you should run..."
You: *copies commands, runs manually, switches to browser*
You: *manually creates PR in GitHub UI*
You: *switches back to IDE, forgets what AI suggested*
```

### With Catalyst

```text
You: "@dev Fix the authentication bug, write tests, and open a PR"
AI: *analyzes code using Filesystem MCP*
AI: *implements fix and generates tests*
AI: *runs tests using local development tools*
AI: *commits changes using Git MCP*
AI: *creates PR using GitHub MCP*
Result: "✅ PR #123 created with all tests passing. Ready for review."
```

**The Difference:** Catalyst gives AI assistants real capabilities through MCP servers, combined with structured methodology through BMAD. The result is AI that actually does the work, not just suggests it.

---

## Requirements

**Required:**

- macOS 13.0+ (Ventura or later)
- Homebrew package manager
- 16GB+ RAM recommended
- 50GB+ free disk space

**Optional but Recommended:**

- Continue.dev or Claude Code extension (automatically detected during setup)
- LM Studio for local AI models
- Docker Desktop (for Docker MCP server)
- PostgreSQL (for database MCP server)

**Note:** Catalyst automatically detects your installed IDEs and tools during `catalyst setup` and configures them appropriately.

---

## Commands Reference

```bash
# Setup and initialization
catalyst setup              # Interactive setup wizard
catalyst init               # Initialize project with BMAD
catalyst verify             # Verify installation status
catalyst update             # Update BMAD templates and config
catalyst doctor             # Troubleshoot common issues

# MCP server management
catalyst mcp list           # List available MCP servers
catalyst mcp test <name>    # Test specific server
catalyst mcp logs <name>    # View server logs

# Configuration
catalyst config show        # Show current configuration
catalyst config edit        # Edit configuration file
```

Full command documentation: [CLI Architecture](docs/architecture/03-cli-architecture.md)

---

## License

Catalyst is licensed under the **GNU Affero General Public License v3.0** ([AGPL v3.0](LICENSE)).

**What this means:**

- ✅ **Free and open source forever** - Use Catalyst at no cost
- ✅ **Modify and distribute freely** - Fork, customize, and share your changes
- ✅ **Share improvements** - If you modify and deploy Catalyst (even as a service), you must share your changes
- ✅ **Prevents commercial exploitation** - Forks cannot be commercialized without giving back to the community

**Why AGPL?** We chose AGPL v3.0 to ensure Catalyst remains free and open source, while preventing commercial entities from taking the code without contributing improvements back to the community.

See the [LICENSE](LICENSE) file for complete details.

---

## Acknowledgments

Catalyst stands on the shoulders of giants:

- **[BMAD-METHOD](https://github.com/bmadcode)** (Brian Madison) - Structured development methodology and agent framework
- **[Anthropic](https://anthropic.com)** - Model Context Protocol (MCP) specification and tooling
- **[LM Studio](https://lmstudio.ai)** - MLX-optimized local AI model hosting for Apple Silicon
- **[Continue.dev](https://continue.dev)** - Excellent open-source IDE integration
- **[Homebrew](https://brew.sh)** - macOS package distribution platform
- **All MCP server contributors** - Open-source community building the MCP ecosystem

---

## Project Status & Roadmap

**Current Version:** 0.1.0 (MVP - Active Development)

**Completed:**

- ✅ Core CLI implementation
- ✅ Essential MCP servers (7 servers)
- ✅ BMAD methodology integration
- ✅ Development documentation
- ✅ Open-source governance

**In Progress:**

- 🔄 Build and release automation (Epic 5)
- 🔄 Comprehensive user documentation (Epic 6)

**Planned:**

- 📋 Homebrew formula and public distribution
- 📋 Additional MCP servers (Redis, MongoDB, Jenkins)
- 📋 Enhanced IDE detection and configuration
- 📋 Community-built MCP server marketplace

---

<div align="center">

**Ready to supercharge your AI development workflow?**

```bash
brew install catalyst
catalyst setup
```

**Questions?** Join the discussion on [GitHub](https://github.com/NimbleEngineer21/catalyst/discussions)

---

Made with ❤️ by the Catalyst community

**Built with BMAD methodology** • [azywicki](https://github.com/azywicki)

*Last Updated: October 26, 2025 • Version 0.1.0*

</div>
