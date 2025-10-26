# Catalyst: Local AI Development Environment

**Complete AI-Powered Development Stack with MCP Servers + BMAD Integration**

**Version:** 2.0.0
**Date:** October 26, 2025
**Status:** In Development
**Distribution:** Homebrew

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [What is Catalyst?](#what-is-catalyst)
3. [Quick Start](#quick-start)
4. [Architecture](#architecture)
5. [Distribution Model](#distribution-model)
6. [MCP Servers](#mcp-servers)
7. [BMAD Integration](#bmad-integration)
8. [Repository Structure](#repository-structure)
9. [Build Pipeline](#build-pipeline)
10. [Installation Workflows](#installation-workflows)
11. [Development Workflow](#development-workflow)
12. [Maintenance & Updates](#maintenance--updates)
13. [Troubleshooting](#troubleshooting)
14. [Roadmap](#roadmap)
15. [Contributing](#contributing)

---

## Executive Summary

**Catalyst** is a Homebrew-distributed development environment that combines local AI capabilities, the BMAD methodology, and extensive MCP server integrations. It provides developers with a production-ready AI assistant ecosystem that runs entirely on their machine with optional cloud API support.

### What You Get

- 🍺 **Homebrew Distribution** - Simple `brew install catalyst` setup
- 🤖 **Local AI Models** via LM Studio (MLX-optimized for Apple Silicon)
- 🔧 **20+ MCP Servers** - GitHub, Docker, PostgreSQL, Browser automation, and more
- 📋 **BMAD Method Integration** - Complete structured software development framework
- 🎯 **Multi-IDE Support** - Works with VS Code, Cursor, Claude Code, Windsurf, and 15+ others
- 🔐 **Privacy-First** - Everything runs locally (cloud APIs optional)
- 🚀 **Production Ready** - Built for real development work

### Who Is This For?

- Developers starting on a new machine who want complete AI tooling
- Teams wanting standardized AI development environments
- Engineers who value privacy and local execution
- Anyone who wants AI assistance without vendor lock-in
- Organizations using BMAD methodology

### Time Investment

- **Initial Setup:** 10-15 minutes (mostly download time)
- **Learning Curve:** 1-2 days to master
- **ROI:** 10x productivity boost in first week

---

## What is Catalyst?

Catalyst transforms your development environment into an AI-powered workspace that can:

✅ **Understand your codebase** through intelligent context awareness
✅ **Execute complex tasks** via MCP servers (build, test, deploy)
✅ **Automate workflows** using BMAD methodology
✅ **Navigate across tools** (GitHub, Docker, databases, browsers)
✅ **Generate production code** from designs and requirements
✅ **Run entirely local** with Apple Silicon optimization

### The Problem Catalyst Solves

**Before Catalyst:**
```
You: "Hey ChatGPT, I need to create a PR for this fix"
ChatGPT: "Here's the git commands you should run..."
You: *copies commands, runs them manually, switches to browser*
You: *creates PR in GitHub UI*
You: *switches back to IDE*
You: *asks for next task*
```

**With Catalyst:**
```
You: "@dev Fix the authentication bug, create tests, and open a PR"
Catalyst: *analyzes code, implements fix, generates tests,
          runs tests, commits, pushes, creates PR*
Catalyst: "✅ PR #123 created with tests passing. Ready for review."
```

### Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                    Your IDE (VS Code, etc.)                  │
│              + Continue.dev or Claude Code                   │
│         (Your AI Assistant & Agent Orchestrator)            │
└─────────────┬───────────────────────────────┬───────────────┘
              │                               │
       ┌──────▼──────┐                 ┌─────▼──────┐
       │  LM Studio  │                 │ Cloud APIs │
       │  (Local AI) │                 │ (Optional) │
       └──────┬──────┘                 └─────┬──────┘
              │                               │
    ┌─────────▼───────────────────────────────▼─────────┐
    │            MCP Servers (Tools Layer)              │
    │  ┌──────┬──────┬──────┬──────┬──────┬──────┐    │
    │  │GitHub│Docker│PostgreSQL│Browser│Memory│ ... │    │
    │  └──────┴──────┴──────┴──────┴──────┴──────┘    │
    └───────────────────────────────────────────────────┘
              │
    ┌─────────▼─────────────────────────────────┐
    │       Your Development Environment         │
    │  (Code, Containers, Databases, Browser)   │
    └───────────────────────────────────────────┘
              │
    ┌─────────▼─────────────────────────────────┐
    │         BMAD Methodology Layer             │
    │    (Agents, Tasks, Workflows, Templates)  │
    └───────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

- macOS (required for optimal experience)
- 16GB+ RAM recommended
- 50GB+ free disk space
- Admin access to install software
- Homebrew installed

### Installation

```bash
# 1. Install Catalyst via Homebrew
brew tap your-org/catalyst
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
# ✅ Catalyst 2.0.0
# ✅ BMAD Method 4.44.1
# ✅ 8 MCP servers connected
# ✅ LM Studio running
# ✅ All systems operational!
```

---

## Architecture

### System Design

Catalyst uses a **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                 Tier 1: Distribution Layer                   │
│                      (Homebrew)                              │
│  • Global installation at /opt/homebrew/                    │
│  • Version management via brew upgrade                      │
│  • Dependency resolution                                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              Tier 2: Global Configuration                    │
│                 (~/.catalyst, ~/.bmad-core)                  │
│                                                             │
│  ~/.catalyst/                                               │
│  ├── config.yaml           # User preferences              │
│  ├── cache/                # Downloaded models, etc.       │
│  └── logs/                 # Installation logs             │
│                                                             │
│  ~/.bmad-core/             # BMAD methodology              │
│  ├── agents/               # PO, Dev, QA, etc.            │
│  ├── tasks/                # Structured tasks             │
│  ├── templates/            # Document templates           │
│  └── workflows/            # Development workflows        │
│                                                             │
│  ~/.continue/              # Continue.dev config (if used) │
│  ├── config.yaml           # Generated by Catalyst        │
│  └── mcp-servers.yaml      # MCP configurations           │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│           Tier 3: Per-Project Configuration                 │
│                  (Minimal footprint)                        │
│                                                             │
│  project-repo/                                              │
│  ├── .catalyst/                                             │
│  │   └── config.yaml      # Project-specific settings     │
│  ├── .bmad-core/                                            │
│  │   └── core-config.yaml # BMAD project config           │
│  ├── .env                  # Project secrets              │
│  └── docs/                 # Generated by agents          │
│      ├── prd.md                                             │
│      ├── architecture.md                                    │
│      └── stories/                                           │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

#### Catalyst CLI (Orchestrator) - TypeScript/Node.js
- Manages installation and updates
- Detects IDE/extension configurations
- Generates configuration files
- Coordinates BMAD and MCP setup
- Provides verification and troubleshooting

#### BMAD Method (Framework)
- Provides structured development processes
- Defines agent roles (PO, Dev, QA, Architect, etc.)
- Templates for documentation (PRD, Architecture, Stories)
- Checklists for quality assurance
- Workflows for common scenarios

#### LM Studio (Local AI)
- Hosts local AI models (MLX-optimized)
- Provides OpenAI-compatible API
- Manages model loading and inference
- Acts as MCP host (can expose models as tools)
- Handles tool call confirmations

#### MCP Servers (Tools)
- Expose specific capabilities to AI
- Handle authentication and authorization
- Execute operations in target systems
- Return structured responses
- Maintain safety boundaries

---

## Distribution Model

### Homebrew-Based Distribution

Catalyst uses Homebrew for clean, version-managed distribution:

```bash
# Users install via:
brew tap your-org/catalyst
brew install catalyst

# Updates are simple:
brew upgrade catalyst
catalyst update
```

### Why Homebrew?

✅ **Familiar** - All developers know `brew install`
✅ **Version Management** - Built-in upgrade/downgrade
✅ **Dependency Handling** - Auto-installs Node, Ruby, etc.
✅ **Clean Uninstall** - `brew uninstall catalyst` removes everything
✅ **Distribution** - Works with private and public taps

### Repository Structure

**Two repositories required:**

1. **catalyst** (main repository)
   - Source code and build scripts
   - Custom MCP server implementations
   - Configuration templates
   - Documentation

2. **homebrew-catalyst** (tap repository)
   - Homebrew formula only
   - Auto-updated by GitHub Actions
   - Points to catalyst releases

---

## MCP Servers

Catalyst includes and supports 20+ MCP servers across three tiers.

### Tier 1: Essential Servers (Installed by Default)

#### 1. GitHub MCP Server
**Status:** ✅ Official
**Package:** `@modelcontextprotocol/server-github`
**Transport:** stdio

**Capabilities:**
- Repository management (browse, search, file operations)
- Issue tracking (create, update, search, bulk operations)
- Pull request automation (create, update, merge, review)
- CI/CD monitoring (GitHub Actions workflows)
- Team collaboration (discussions, notifications)

**Configuration:**
```yaml
name: GitHub
type: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-github"]
env:
  GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"
```

#### 2. Git MCP Server
**Status:** ✅ Official
**Package:** `@modelcontextprotocol/server-git`

**Capabilities:**
- Local Git operations (commit, branch, merge)
- Repository inspection (log, diff, status)
- History analysis

#### 3. Filesystem MCP Server
**Status:** ✅ Official
**Package:** `@modelcontextprotocol/server-filesystem`

**Capabilities:**
- Safe file read/write operations
- Directory traversal
- File search and manipulation
- Configurable access controls

#### 4. Docker MCP Server
**Status:** 🔨 Custom Built
**Path:** `mcp-servers/docker`

**Capabilities:**
- Container management (list, start, stop, logs)
- Image operations (pull, build, tag, push)
- Docker Compose (up, down, scale)
- Network management
- Volume management
- System monitoring (stats, events)

#### 5. PostgreSQL MCP Server
**Status:** 🔨 Custom Built
**Path:** `mcp-servers/postgres`

**Capabilities:**
- Database operations (queries, transactions)
- Schema management (tables, indexes, constraints)
- Data operations (SELECT, INSERT, UPDATE, DELETE)
- Migration support (run, rollback, track)
- Query analysis (EXPLAIN, optimization)

#### 6. Fetch MCP Server
**Status:** ✅ Official
**Package:** `@modelcontextprotocol/server-fetch`

**Capabilities:**
- Web content retrieval
- HTML to Markdown conversion
- API requests

#### 7. Memory MCP Server
**Status:** ✅ Official
**Package:** `@modelcontextprotocol/server-memory`

**Capabilities:**
- Persistent knowledge graph
- Entity tracking
- Relationship management
- Context preservation across sessions

---

### Tier 2: Development Tool Servers (Optional)

#### Frontend Development

**Vite MCP Server** (Custom Built)
- Test execution (Vitest)
- Coverage analysis
- Build operations
- Dev server management

**Storybook MCP Server** (Custom Built)
- Component story management
- Interaction testing
- Visual regression testing
- Documentation generation

#### Mobile Development

**Xcode MCP Server** (Custom Built - macOS only)
- Project management
- Build operations (device/simulator)
- Test execution (unit, UI)
- Simulator control
- Swift Package Manager

#### Browser Automation

**Playwright MCP** (Official)
- Cross-browser testing (Chromium, Firefox, WebKit)
- Element interaction
- Page analysis (accessibility tree)
- Screenshot capture

**Puppeteer MCP** (Community)
- Chrome/Chromium automation
- Web scraping
- Performance testing

#### Design Tools

**Figma MCP** (Official)
- Design-to-code automation
- Component extraction
- Style system integration
- Code generation (React, Tailwind)

#### Communication

**Slack MCP** (Community - Zencoder)
- Channel management
- Messaging automation
- Notification integration

---

### Tier 3: Specialized Servers

#### Cloud Platforms
- **AWS MCP** - S3, Lambda, EC2, RDS management
- **Azure MCP** - Azure services integration
- **GCP MCP** - Google Cloud operations

#### Project Management
- **Jira MCP** - Issue tracking
- **Linear MCP** - Modern project management
- **Atlassian MCP** - Confluence + Jira

#### Data & Analytics
- **Jupyter MCP** - Notebook operations
- **Pandas MCP** - DataFrame manipulation
- **Elasticsearch MCP** - Search and analytics

#### DevOps & Infrastructure
- **Kubernetes MCP** - Cluster management
- **Terraform MCP** - Infrastructure as code
- **Ansible MCP** - Configuration management

#### Monitoring & Security
- **Sentry MCP** - Error tracking
- **DataDog MCP** - Observability
- **1Password MCP** - Secrets management
- **Vault MCP** - HashiCorp Vault integration

#### E-commerce & CMS
- **Shopify MCP** - Store management
- **Stripe MCP** - Payment processing
- **WordPress MCP** - Content management
- **Contentful MCP** - Headless CMS

---

### MCP Server Selection

During `catalyst setup`, users are prompted:

```
📦 MCP Server Selection

What type of project are you working on?
  1. Fullstack Web Application
  2. Frontend Application
  3. Backend Service/API
  4. Mobile Application (iOS/Android)
  5. Data Science/ML
  6. Custom selection

Selection: 1

✅ Installing servers for Fullstack Web:
   • GitHub
   • Git
   • Filesystem
   • Docker
   • PostgreSQL
   • Vite
   • Playwright

Do you use these collaboration tools? (multi-select)
  [ ] Slack
  [ ] Jira
  [ ] Linear
  [ ] Figma

Cloud provider? (multi-select)
  [ ] AWS
  [ ] Azure
  [ ] GCP
  [x] None / Local only
```

---

## BMAD Integration

### What is BMAD?

The **Balanced Method for Agile Development (BMAD)** is a comprehensive framework for AI-assisted software development. It provides:

- **10 Agent Roles:** PO, Dev, QA, PM, Architect, Analyst, UX Expert, SM, Master, Orchestrator
- **24 Structured Tasks:** Story creation, testing, documentation, elicitation, etc.
- **6 Workflows:** Greenfield/Brownfield for UI, Service, and Fullstack projects
- **14 Templates:** PRD, Architecture, Stories, QA Gates, etc.
- **6 Checklists:** Quality assurance for each role
- **5+ Expansion Packs:** Game Development, Creative Writing, Infrastructure/DevOps

### How Catalyst Uses BMAD

**During Development:**
Catalyst itself is developed using BMAD methodology. All BMAD agents, tasks, and workflows are available for building Catalyst features.

**For End Users:**
Catalyst includes the complete BMAD framework, allowing users to leverage structured development processes in their own projects.

### BMAD Installation Process

BMAD is installed **during the Catalyst build process**, not tracked in Git:

```bash
# In GitHub Actions (build time):
npx bmad-method install --full --expansion-packs all --ides all

# Result:
.bmad-core/              # Core framework
.bmad-2d-unity-game-dev/ # Expansion pack
.bmad-creative-writing/  # Expansion pack
# ... (all expansions)

# These directories are bundled into Catalyst release
# Users get them via: brew install catalyst
```

### BMAD Update Strategy

Users don't update BMAD directly. Instead:

1. **Developer (you)** updates Catalyst with new BMAD version
2. **Build pipeline** runs `npx bmad-method install`
3. **New BMAD files** are bundled into release
4. **Users** run `brew upgrade catalyst` to get updates
5. **Catalyst CLI** handles migration and customization preservation

```bash
# User workflow:
brew upgrade catalyst  # Gets new Catalyst + BMAD
catalyst update        # Applies updates, preserves customizations

# Output:
# ✅ Catalyst 2.0.0 → 2.1.0
# ✅ BMAD 4.44.1 → 4.45.0
# ✅ Backed up 3 customized files
# ✅ Updated successfully!
```

---

## Repository Structure

### What Gets Tracked in Git

```
catalyst/                          # VERSION CONTROLLED
├── docs/
│   ├── PROJECT_BRIEF_CATALYST.md  # ✅ This file
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   └── DEVELOPMENT.md
│
├── bin/
│   └── catalyst                   # ✅ Main CLI executable (Node.js)
│
├── src/                           # ✅ TypeScript source code
│   ├── index.ts                   # Main entry point
│   ├── cli/
│   │   ├── commands/              # CLI commands
│   │   │   ├── setup.ts
│   │   │   ├── init.ts
│   │   │   ├── verify.ts
│   │   │   ├── update.ts
│   │   │   └── doctor.ts
│   │   └── index.ts
│   ├── core/
│   │   ├── installer.ts           # Installation orchestration
│   │   ├── configurator.ts        # Config file generation
│   │   ├── detector.ts            # IDE detection
│   │   ├── updater.ts             # Update management
│   │   └── verifier.ts            # Installation verification
│   ├── mcp/
│   │   ├── manager.ts             # MCP server lifecycle
│   │   ├── registry.ts            # Available servers
│   │   └── installer.ts           # Server installation
│   ├── bmad/
│   │   ├── installer.ts           # Wraps npx bmad-method
│   │   ├── linker.ts              # Symlink management
│   │   └── updater.ts             # BMAD version management
│   └── utils/
│       ├── filesystem.ts
│       ├── logger.ts
│       └── shell.ts
│
├── dist/                          # ✅ Compiled JavaScript (gitignored)
│
├── mcp-servers/                   # ✅ Custom implementations
│   ├── docker/
│   │   ├── package.json
│   │   ├── src/
│   │   └── dist/              # Built files (gitignored)
│   ├── postgres/
│   ├── xcode/
│   ├── storybook/
│   └── vite/
│
├── templates/                     # ✅ Config templates
│   ├── continue/
│   │   ├── config.yaml.erb
│   │   └── mcp-servers.yaml.erb
│   ├── project/
│   │   ├── .catalyst/
│   │   └── .env.example
│   └── README.md
│
├── scripts/                       # ✅ Build scripts
│   ├── build.sh
│   ├── install-bmad.sh
│   ├── build-mcp-servers.sh
│   └── verify-installation.sh
│
├── config/                        # ✅ Catalyst configuration
│   ├── bmad-install.yaml
│   └── mcp-defaults.yaml
│
├── .github/
│   └── workflows/
│       ├── build.yml              # ✅ CI
│       └── release.yml            # ✅ Release automation
│
├── Formula/
│   └── catalyst.rb                # ✅ Homebrew formula
│
├── .gitignore                     # ✅ Ignores BMAD files
├── package.json                   # ✅ Node.js dependencies
├── tsconfig.json                  # ✅ TypeScript configuration
├── LICENSE
└── README.md
```

### What Gets Ignored (.gitignore)

```gitignore
# BMAD Method Generated Files
# (Installed via npx during build)
.bmad-core/
.bmad-*/
.bmad-2d-unity-game-dev/
.bmad-2d-phaser-game-dev/
.bmad-creative-writing/
.bmad-godot-game-dev/
.bmad-infrastructure-devops/

# IDE Configuration (BMAD-generated)
.augment/
.claude/
.cursor/
.windsurf/
.trae/
.qwen/
.crush/
.gemini/
.iflow/
.clinerules/
.vscode/

# BMAD-generated files
AGENTS.md
opencode.jsonc
.kilocodemodes
.roomodes
web-bundles/

# Build artifacts
build/
dist/
*.tar.gz

# Dependencies
node_modules/
vendor/bundle/

# Environment
.env
```

---

## Build Pipeline

### GitHub Actions Release Workflow

```yaml
name: Build and Release Catalyst

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm ci

      - name: Build CLI
        run: npm run build

      - name: Run Tests
        run: npm test

      - name: Install BMAD Method
        run: |
          chmod +x scripts/*.sh
          ./scripts/install-bmad.sh

      - name: Build MCP Servers
        run: ./scripts/build-mcp-servers.sh

      - name: Build Release
        run: ./scripts/build.sh

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: build/catalyst-*.tar.gz

      - name: Update Homebrew Tap
        run: |
          # Auto-update formula in homebrew-catalyst repo
```

### Build Script Flow

```bash
# scripts/build.sh

1. Clean previous build artifacts
2. Run: npm ci (install dependencies)
3. Run: npm run build (compile TypeScript CLI)
4. Run: npx bmad-method install --full
5. Verify BMAD installation (.bmad-core exists)
6. Build MCP servers (npm run build in each)
7. Copy compiled CLI (dist/)
8. Copy built MCP servers
9. Copy BMAD bundles (generated by npx)
10. Create tarball (catalyst-{version}.tar.gz)
11. Calculate SHA256
12. Output build artifact
```

---

## Installation Workflows

### Flow 1: First-Time User Installation

```bash
$ brew tap your-org/catalyst
$ brew install catalyst

==> Installing catalyst from your-org/catalyst
==> Downloading https://github.com/your-org/catalyst/releases/download/v2.0.0/catalyst-2.0.0.tar.gz
==> Installing dependencies: node
==> Installing catalyst
🍺  /opt/homebrew/Cellar/catalyst/2.0.0: 1,234 files, 45.6MB

$ catalyst setup

┌─────────────────────────────────────────┐
│     Catalyst Setup Wizard v2.0.0        │
└─────────────────────────────────────────┘

🔍 Detecting your environment...

✅ Found: VS Code
✅ Found: Continue.dev extension (v0.8.52)
✅ Found: Docker Desktop
✅ Found: Git
⚠️  Not found: LM Studio

📦 Installation Options

  What would you like to set up?

  [x] Configure Continue.dev with Catalyst
  [x] Set up MCP servers
  [x] Install BMAD methodology
  [ ] Install LM Studio (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️  Configuring Continue.dev...
   ✅ Generated ~/.continue/config.yaml
   ✅ Configured 8 MCP servers
   ✅ Linked BMAD agents

📚 Installing BMAD bundles...
   ✅ Core agents (PO, Dev, QA, PM, etc.)
   ✅ 5 expansion packs
   ✅ Created ~/.bmad-core/

✅ Setup Complete!

Next steps:
  1. Restart VS Code
  2. Try: catalyst init in a project
  3. Run: catalyst verify to check installation
```

### Flow 2: Per-Project Initialization

```bash
$ cd ~/Projects/my-new-app

$ catalyst init

┌─────────────────────────────────────────┐
│     Initialize Catalyst Project         │
└─────────────────────────────────────────┘

📋 Project Type:
   1. UI Application
   2. Backend Service
   3. Fullstack Application
   4. Mobile App
   5. Game Development

   Select: 3

🎨 Frontend: React + TypeScript
🗄️  Database: PostgreSQL

✅ Creating project structure...

   Created:
   ✅ .catalyst/config.yaml
   ✅ .bmad-core/core-config.yaml
   ✅ .env.example
   ✅ docs/

🚀 Project initialized!

Try: @analyst create project brief
```

### Flow 3: Updating Catalyst

```bash
$ brew upgrade catalyst

==> Upgrading catalyst 2.0.0 -> 2.1.0

$ catalyst update

🔍 Checking for updates...

📦 Catalyst: 2.1.0 (current)
📚 BMAD: 4.44.1 → 4.45.0

BMAD Updates:
• Enhanced PO agent
• New game dev tasks
• Updated templates

Proceed? (Y/n): Y

⚙️  Updating...
   ✅ Backed up customizations
   ✅ Updated core bundles
   ✅ Restored customizations

✅ Update complete!
```

---

## Development Workflow

### Using BMAD to Build Catalyst

As the Catalyst developer, you use BMAD to build Catalyst itself:

```bash
# 1. Start with Analyst for requirements
@analyst review the current architecture

# 2. Use Architect for technical design
@architect create detailed MCP server architecture

# 3. Use PO to create implementation stories
@po create stories for Docker MCP server

# Output: docs/stories/
# - STORY-001: Docker container operations
# - STORY-002: Docker image management
# - STORY-003: Docker Compose integration

# 4. Use Dev to implement
@dev implement STORY-001

# 5. Use QA to verify
@qa gate STORY-001

# 6. Use PM for documentation
@pm document Docker MCP server
```

### Daily Development Tasks

**Adding a New MCP Server:**

```bash
# 1. Create story with PO
@po create story for Redis MCP server

# 2. Design with Architect
@architect design Redis MCP architecture

# 3. Implement with Dev
@dev implement Redis MCP from story

# Result:
mcp-servers/redis/
├── package.json
├── src/
│   ├── index.ts
│   └── tools/
├── tests/
└── README.md

# 4. Test with QA
@qa verify Redis MCP integration

# 5. Update docs
@pm document Redis MCP server
```

**Updating BMAD Version:**

```bash
# 1. Test new BMAD version locally
npx bmad-method install --full

# 2. Verify compatibility
catalyst verify

# 3. Update version in docs
# 4. Create release tag
# 5. GitHub Actions handles build with new BMAD
```

---

## Maintenance & Updates

### For Users

```bash
# Weekly: Check for updates
brew update
brew upgrade catalyst
catalyst update

# Monthly: Clean cache
catalyst clean --cache

# As needed: Verify installation
catalyst verify

# Troubleshooting
catalyst doctor
```

### For Developers (You)

```bash
# Update BMAD in development
npx bmad-method install --full

# Build locally
./scripts/build.sh

# Test build
tar -xzf build/catalyst-*.tar.gz
cd catalyst && bin/catalyst verify

# Release
git tag v2.1.0
git push origin v2.1.0
# GitHub Actions handles rest
```

---

## Troubleshooting

### Common Issues

**Issue: BMAD agents not found**
```bash
Solution:
catalyst setup  # Re-run setup
catalyst verify # Check installation
```

**Issue: MCP server not connecting**
```bash
Solution:
catalyst doctor # Diagnose issues
cat ~/.continue/config.yaml # Check config
catalyst setup --reconfigure # Reset config
```

**Issue: Continue.dev not detecting changes**
```bash
Solution:
# Restart VS Code
# Or: Cmd+Shift+P → "Developer: Reload Window"
```

---

## Roadmap

### Version 2.1 (Q1 2026)
- [ ] Additional MCP servers (Redis, MongoDB)
- [ ] Enhanced IDE detection
- [ ] Web dashboard for configuration
- [ ] Team collaboration features

### Version 2.2 (Q2 2026)
- [ ] GitLab MCP server
- [ ] Jenkins MCP server
- [ ] Kubernetes MCP server
- [ ] Enhanced BMAD workflows

### Version 3.0 (Q3 2026)
- [ ] Multi-agent collaboration
- [ ] Custom MCP server builder
- [ ] Marketplace for configurations
- [ ] Enterprise features

---

## Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/catalyst.git
cd catalyst

# Install dependencies
npm install

# Build CLI
npm run build

# Run BMAD install for development
./scripts/install-bmad.sh

# Build MCP servers
./scripts/build-mcp-servers.sh

# Test locally
npm run dev verify
# or run compiled version
node dist/index.js verify
```

### Creating a New MCP Server

1. Create directory: `mcp-servers/your-server/`
2. Implement using TypeScript SDK
3. Add tests
4. Update `config/mcp-defaults.yaml`
5. Document in this file
6. Submit PR

### Release Process

```bash
# 1. Update version
# package.json version field

# 2. Update CHANGELOG.md

# 3. Commit
git add -A
git commit -m "chore: release v2.1.0"

# 4. Tag
git tag v2.1.0
git push origin main --tags

# 5. GitHub Actions handles:
#    - Installing dependencies
#    - Building CLI (TypeScript)
#    - Running tests
#    - BMAD installation
#    - MCP server builds
#    - Release creation
#    - Homebrew formula update
```

---

## License

MIT License - see [LICENSE](../LICENSE) file

---

## Acknowledgments

- **Anthropic** for Model Context Protocol
- **BMAD-METHOD** (Brian Madison) for development framework
- **LM Studio** team for MLX-optimized local models
- **Continue.dev** team for excellent VS Code extension
- **Homebrew** maintainers for distribution platform
- All MCP server contributors and open-source community

---

## Contact

- **Repository:** [github.com/your-org/catalyst](https://github.com/your-org/catalyst)
- **Issues:** [github.com/your-org/catalyst/issues](https://github.com/your-org/catalyst/issues)
- **Discussions:** [github.com/your-org/catalyst/discussions](https://github.com/your-org/catalyst/discussions)

---

**Built with BMAD methodology**

*Last Updated: October 26, 2025*
*Version: 2.0.0*

---
