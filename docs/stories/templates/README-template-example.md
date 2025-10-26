# Catalyst README Template - Multi-Audience Example

**Purpose:** This template provides guidance for Story 1.7 (Create Multi-Audience Top-Level README)

**Note:** This is a TEMPLATE showing structure and approach. Actual content should be written during Story 1.7 implementation.

---

# Catalyst

> Your AI-powered development environment with local-first privacy and structured methodology

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/your-org/catalyst/releases)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Build Status](https://github.com/your-org/catalyst/workflows/CI/badge.svg)](https://github.com/your-org/catalyst/actions)
[![Homebrew](https://img.shields.io/badge/homebrew-available-orange.svg)](https://formulae.brew.sh/formula/catalyst)

**One command to set up your complete AI development environment:**

```bash
brew install catalyst
catalyst setup
```

---

## 🎯 What is Catalyst?

**For the general public:** Catalyst helps developers use AI assistants more effectively by providing a complete toolkit that runs on your Mac, keeps your data private, and follows proven development methods.

**For developers:** Catalyst is a Homebrew-distributed CLI that combines:
- 🤖 **12+ MCP servers** for tool integration (Docker, PostgreSQL, GitHub, Git, and more)
- 📚 **BMAD methodology** (10 AI agents for complete SDLC)
- 🔒 **Local-first AI** (works with LM Studio or cloud APIs)
- 🛠️ **IDE integration** (Continue.dev, Claude Code, VS Code, Cursor, and 15+ others)

**Why it exists:** Current AI coding tools are fragmented and cloud-dependent. Catalyst brings everything together in one privacy-focused package.

---

## ✨ Key Features

- **One-Command Install**: `brew install catalyst` - everything included
- **Privacy First**: Runs entirely on your Mac, optional cloud APIs
- **Intelligent Setup**: Detects your IDE, configures automatically
- **20+ MCP Servers**: GitHub, Docker, databases, browsers, dev tools
- **BMAD Methodology**: Built-in agents for PO, Dev, QA, Architect roles
- **Multi-IDE Support**: Works with VS Code, Cursor, Claude Code, Windsurf, and more
- **Local AI Support**: Integrates with LM Studio for completely offline AI

---

## 🚀 Quick Start

### Installation (macOS)

```bash
# Install via Homebrew
brew install catalyst

# Run setup wizard
catalyst setup

# Initialize in your project
cd your-project
catalyst init

# Verify installation
catalyst verify
```

**First time?** Follow our [Getting Started Guide](docs/guides/user-guide.md) for a complete walkthrough.

---

## 📚 Documentation by Audience

### 👥 For End Users

- **[User Guide](docs/guides/user-guide.md)** - Complete installation and usage guide
- **[Quick Start](docs/guides/quick-start.md)** - Get up and running in 5 minutes
- **[FAQ](docs/guides/faq.md)** - Common questions answered
- **[Troubleshooting](docs/guides/troubleshooting.md)** - Fix common issues

### 🔧 For Developers

- **[Architecture Docs](docs/architecture/)** - System design and technical details
- **[MCP Server API Reference](docs/mcp-servers/)** - Available tools and how to use them
- **[CLI Command Reference](docs/cli/)** - All `catalyst` commands documented

### 🤝 For Contributors

- **[Contributing Guide](docs/guides/contributing.md)** - How to contribute code
- **[Development Setup](docs/architecture/11-development-workflow.md)** - Local development environment
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community standards
- **[Good First Issues](https://github.com/your-org/catalyst/labels/good-first-issue)** - Start here!

---

## 🎬 See It In Action

<!-- TODO: Add asciicast or video demo during Story 1.7 -->

```bash
# Example: Using Catalyst with BMAD agents
catalyst init --type fullstack

# In your IDE, invoke the Product Owner agent
@po create epic for user authentication

# Developer agent implements the story
@dev implement story 1.2 from epic-1-auth.md

# QA agent reviews the implementation
@qa review story 1.2
```

---

## 🏗️ How It Works

```
┌─────────────────────────────────────────┐
│  Your IDE (VS Code, Cursor, etc.)      │
│  ├─ Continue.dev or Claude Code        │
│  └─ Connected to:                      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  Catalyst (runs on your Mac)           │
│  ├─ MCP Servers (12+ integrations)     │
│  ├─ BMAD Agents (10 development roles) │
│  └─ Local AI (LM Studio) or Cloud APIs │
└─────────────────────────────────────────┘
```

**Privacy**: Everything runs locally. Cloud APIs are opt-in.

---

## 🛠️ Available MCP Servers

Catalyst includes these MCP servers out of the box:

**Essential (7):**
- 🐙 GitHub - Issues, PRs, workflows
- 📁 Git - Local repository operations
- 📂 Filesystem - Safe file operations
- 🐳 Docker - Container management
- 🐘 PostgreSQL - Database operations
- 🌐 Fetch - HTTP requests and web scraping
- 🧠 Memory - Knowledge graph and context

**Development Tools (5):**
- ⚡ Vite - Frontend build and testing
- 📖 Storybook - Component documentation
- 🍎 Xcode - iOS/macOS development
- 🎭 Playwright - Browser automation
- 🎨 Figma - Design integration

[See full MCP server documentation →](docs/mcp-servers/)

---

## 🎯 Use Cases

### Individual Developers
- Set up new projects in minutes with AI assistance
- Use BMAD agents to plan, implement, and test features
- Keep all AI interactions private and local

### Development Teams
- Standardize on BMAD methodology across the team
- Share Catalyst configurations via version control
- No per-seat licensing costs (open source)

### BMAD Practitioners
- Get all BMAD agents pre-configured out of the box
- Templates and workflows included
- Automation via MCP servers

---

## 🌟 Community

- **[GitHub Discussions](https://github.com/your-org/catalyst/discussions)** - Ask questions, share ideas
- **[Discord](https://discord.gg/catalyst)** - Real-time chat with the community
- **[Issue Tracker](https://github.com/your-org/catalyst/issues)** - Report bugs, request features
- **[Contributing](CONTRIBUTING.md)** - Help make Catalyst better

---

## 📊 Project Status

**Current Version:** 2.0.0 (MVP in active development)

**Roadmap:**
- ✅ Core CLI implementation
- ✅ Essential MCP servers
- ✅ BMAD integration
- 🔄 Build and release automation (in progress)
- 📋 Documentation and launch prep
- 🎯 Public release: Q1 2026

[See detailed roadmap →](docs/ROADMAP.md)

---

## 🤔 Why Catalyst?

**vs. GitHub Copilot:** Catalyst complements Copilot by adding methodology and full SDLC support. Use both together.

**vs. Cursor:** Catalyst works *with* Cursor, providing MCP servers and BMAD agents that enhance Cursor's capabilities.

**vs. Continue.dev:** Catalyst simplifies Continue.dev setup with one-command installation and pre-configured MCP servers.

**Positioning:** Catalyst is a methodology and automation layer that makes existing AI coding tools more powerful and structured.

---

## 📄 License

Catalyst is licensed under the [GNU AGPL v3.0](LICENSE).

**What this means:**
- ✅ Free and open source forever
- ✅ You can use, modify, and distribute it
- ✅ If you modify and deploy Catalyst (even as a service), you must share your changes
- ✅ Prevents commercial exploitation of forks without giving back to the community

See [LICENSE](LICENSE) for full details.

**Attribution:** Built by [@azywicki](https://github.com/azywicki)

---

## 🙏 Acknowledgments

- **BMAD Method** - Structured AI development methodology
- **Anthropic** - Model Context Protocol (MCP)
- **Continue.dev** - Open-source IDE integration
- **LM Studio** - Local AI model hosting

---

## 🚦 Getting Help

- **[User Guide](docs/guides/user-guide.md)** - Comprehensive documentation
- **[FAQ](docs/guides/faq.md)** - Common questions
- **`catalyst doctor`** - Built-in troubleshooting
- **[GitHub Issues](https://github.com/your-org/catalyst/issues)** - Bug reports
- **[Discussions](https://github.com/your-org/catalyst/discussions)** - Q&A and ideas

---

## 🎉 Quick Links

- [Installation Guide](docs/guides/user-guide.md#installation)
- [Configuration Reference](docs/guides/configuration.md)
- [MCP Server API Docs](docs/mcp-servers/)
- [BMAD Agent Guide](docs/guides/bmad-agents.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Roadmap](docs/ROADMAP.md)

---

**Ready to get started?**

```bash
brew install catalyst
catalyst setup
```

**Questions?** Open a [discussion](https://github.com/your-org/catalyst/discussions) or join our [Discord](https://discord.gg/catalyst).

---

<p align="center">
  Made with ❤️ by the Catalyst community
</p>
