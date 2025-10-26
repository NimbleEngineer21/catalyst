# Catalyst

> **AI-Powered Development Environment** with MCP Servers + BMAD Integration

Catalyst is a Homebrew-distributed development environment that combines local AI capabilities, the BMAD methodology, and extensive MCP (Model Context Protocol) server integrations. It provides developers with a production-ready AI assistant ecosystem that runs entirely on their machine with optional cloud API support.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/azywicki/catalyst/releases)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)

## What You Get

- **Homebrew Distribution** - Simple `brew install catalyst` setup
- **Local AI Models** via LM Studio (MLX-optimized for Apple Silicon)
- **20+ MCP Servers** - GitHub, Docker, PostgreSQL, Browser automation, and more
- **BMAD Method Integration** - Complete structured software development framework
- **Multi-IDE Support** - Works with VS Code, Cursor, Claude Code, Windsurf, and 15+ others
- **Privacy-First** - Everything runs locally (cloud APIs optional)
- **Production Ready** - Built for real development work

## Quick Start

### Prerequisites

- macOS 13.0+ (Ventura or later)
- Homebrew installed
- 16GB+ RAM recommended
- 50GB+ free disk space

### Installation

```bash
# 1. Install Catalyst via Homebrew
brew tap azywicki/catalyst
brew install catalyst

# 2. Run setup wizard
catalyst setup

# The wizard will:
# - Detect your IDEs and extensions
# - Configure Continue.dev or Claude Code (if installed)
# - Set up MCP servers
# - Install BMAD methodology
# - Optional: Download LM Studio and models
# - Verify installation

# 3. Initialize a project
cd ~/Projects/my-app
catalyst init

# 4. Start developing!
code .  # Open in VS Code
```

### Verify Installation

```bash
catalyst verify

# Expected output:
# ✅ Catalyst 0.1.0
# ✅ BMAD Method 4.44.1
# ✅ 8 MCP servers connected
# ✅ LM Studio running
# ✅ All systems operational!
```

## Documentation

- **[Project Brief](docs/project_brief.md)** - High-level vision and architecture
- **[Architecture Documentation](docs/architecture.md)** - Detailed technical design
- **[PRD](docs/prd/prd.md)** - Complete product requirements

## Development

### For Contributors

```bash
# Clone repository
git clone https://github.com/azywicki/catalyst.git
cd catalyst

# Install dependencies
npm install

# Build CLI
npm run build

# Install BMAD for development
./scripts/install-bmad.sh

# Build MCP servers
./scripts/build-mcp-servers.sh

# Run tests
npm test

# Test locally
npm run dev -- setup
```

### Project Structure

```
catalyst/
├── src/                   # TypeScript source code
│   ├── cli/              # CLI commands
│   ├── core/             # Core business logic
│   ├── mcp/              # MCP server management
│   ├── bmad/             # BMAD integration
│   └── utils/            # Shared utilities
├── mcp-servers/          # Custom MCP server implementations
├── scripts/              # Build and utility scripts
├── docs/                 # Documentation
└── Formula/              # Homebrew formula
```

## Features

### MCP Servers (Essential)

- **GitHub** - Repository management, PRs, issues
- **Git** - Local Git operations
- **Filesystem** - Safe file operations
- **Docker** - Container management
- **PostgreSQL** - Database operations
- **Fetch** - Web content retrieval
- **Memory** - Persistent knowledge graph

### MCP Servers (Optional)

- **Vite** - Frontend build tooling
- **Xcode** - iOS/macOS development
- **Storybook** - Component documentation
- **Playwright** - Browser automation
- **Figma** - Design-to-code automation

[See full MCP server list](docs/project_brief.md#mcp-servers)

### BMAD Integration

Complete structured development methodology including:
- 10 Agent Roles (PO, Dev, QA, PM, Architect, etc.)
- 24 Structured Tasks
- 14 Document Templates
- 6 Development Workflows

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **CLI** | TypeScript/Node.js | 20+ |
| **MCP Servers** | TypeScript/Node.js | 20+ |
| **Distribution** | Homebrew | - |
| **Testing** | Vitest | 1.x |
| **Build** | TypeScript Compiler | 5.3+ |

## Commands

```bash
# Setup and configuration
catalyst setup              # Interactive setup wizard
catalyst init               # Initialize project
catalyst verify             # Verify installation
catalyst update             # Update BMAD/config
catalyst doctor             # Troubleshoot issues

# MCP server management
catalyst mcp list           # List available servers
catalyst mcp test <name>    # Test specific server
catalyst mcp logs <name>    # View server logs

# Configuration
catalyst config show        # Show current config
catalyst config edit        # Edit configuration
```

## Why Catalyst?

### Before Catalyst

```
You: "Hey ChatGPT, I need to create a PR for this fix"
ChatGPT: "Here's the git commands you should run..."
You: *copies commands, runs them manually, switches to browser*
You: *creates PR in GitHub UI*
You: *switches back to IDE*
```

### With Catalyst

```
You: "@dev Fix the authentication bug, create tests, and open a PR"
Catalyst: *analyzes code, implements fix, generates tests,
          runs tests, commits, pushes, creates PR*
Catalyst: "✅ PR #123 created with tests passing. Ready for review."
```

## Requirements

**Required:**
- macOS 13.0+ (Ventura or later)
- Homebrew package manager
- Node.js 20+ (installed automatically)

**Optional but Recommended:**
- Continue.dev or Claude Code extension for VS Code
- LM Studio for local AI models
- Docker Desktop (for Docker MCP server)
- PostgreSQL (for database MCP server)

## Roadmap

### v2.1 (Q1 2026)
- Additional MCP servers (Redis, MongoDB)
- Enhanced IDE detection
- Web dashboard for configuration
- Team collaboration features

### v2.2 (Q2 2026)
- GitLab MCP server
- Jenkins MCP server
- Kubernetes MCP server
- Enhanced BMAD workflows

### v3.0 (Q3 2026)
- Multi-agent collaboration
- Custom MCP server builder
- Marketplace for configurations
- Enterprise features

## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/guides/contributing.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the GNU Affero General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Anthropic](https://anthropic.com) for Model Context Protocol
- [BMAD-METHOD](https://github.com/bmadcode) (Brian Madison) for development framework
- [LM Studio](https://lmstudio.ai) team for MLX-optimized local models
- [Continue.dev](https://continue.dev) team for excellent VS Code extension
- [Homebrew](https://brew.sh) maintainers for distribution platform
- All MCP server contributors and open-source community

## Support

- **Issues:** [GitHub Issues](https://github.com/azywicki/catalyst/issues)
- **Discussions:** [GitHub Discussions](https://github.com/azywicki/catalyst/discussions)
- **Documentation:** [docs/](docs/)

---

**Built with BMAD methodology**

*Last Updated: October 26, 2025 • Version: 0.1.0*
