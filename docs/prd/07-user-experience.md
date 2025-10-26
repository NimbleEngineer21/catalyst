# PRD Shard 07: User Experience & Workflows

**Parent Document:** [prd.md](prd.md)
**Last Updated:** October 26, 2025

---

## Table of Contents

1. [UX Principles](#ux-principles)
2. [CLI Design](#cli-design)
3. [Interactive Flows](#interactive-flows)
4. [Error Handling & Recovery](#error-handling--recovery)
5. [Documentation & Help](#documentation--help)

---

## UX Principles

### Core UX Principles

1. **Progressive Disclosure**
   - Start simple, reveal complexity as needed
   - Default to intelligent choices
   - Advanced options available but not prominent

2. **Immediate Feedback**
   - Show what's happening
   - Progress indicators for long operations
   - Clear success/failure messages

3. **Error Prevention**
   - Validate input before execution
   - Confirm destructive operations
   - Provide clear warnings

4. **Recovery & Undo**
   - Backup before changes
   - Ability to rollback
   - Clear recovery procedures

5. **Consistency**
   - Uniform command structure
   - Consistent terminology
   - Predictable behavior

### Design Goals

**For New Users:**
- Install and run first AI command in < 30 minutes
- Understand basic concepts without reading docs
- Feel confident experimenting

**For Experienced Users:**
- Efficient command-line workflows
- Scriptable operations
- Customization and extensibility

---

## CLI Design

### Command Structure

**Hierarchy:**
```bash
catalyst <command> [subcommand] [options] [arguments]
```

**Examples:**
```bash
catalyst setup                    # Top-level command
catalyst init                     # Top-level command
catalyst verify                   # Top-level command
catalyst mcp list                 # Command with subcommand
catalyst mcp install github       # Subcommand with argument
catalyst config get github.token  # Nested key access
```

### Command Reference

#### Installation & Setup

**`catalyst setup`**
```
Usage: catalyst setup [options]

Run interactive setup wizard to configure Catalyst

Options:
  --reconfigure     Re-run setup even if already configured
  --skip-bmad       Skip BMAD installation
  --skip-ide        Skip IDE detection
  --verbose         Show detailed output

Examples:
  catalyst setup                  # Interactive setup
  catalyst setup --reconfigure    # Reset and reconfigure
```

**`catalyst init`**
```
Usage: catalyst init [options]

Initialize Catalyst configuration for current project

Options:
  --type TYPE       Project type (fullstack|frontend|backend|mobile|game)
  --force           Overwrite existing configuration
  --template PATH   Use custom configuration template

Examples:
  catalyst init                   # Interactive project setup
  catalyst init --type fullstack  # Quick setup for fullstack
  catalyst init --template ../team-config.yaml
```

#### MCP Server Management

**`catalyst mcp`**
```
Usage: catalyst mcp <subcommand> [options]

Manage MCP servers

Subcommands:
  list              List installed MCP servers
  install NAME      Install MCP server
  remove NAME       Remove MCP server
  test NAME         Test MCP server connectivity
  config NAME       Show MCP server configuration

Examples:
  catalyst mcp list
  catalyst mcp install playwright
  catalyst mcp test docker
```

#### Configuration

**`catalyst config`**
```
Usage: catalyst config <subcommand> [key] [value]

Manage configuration settings

Subcommands:
  get KEY           Get configuration value
  set KEY VALUE     Set configuration value
  list              List all configuration
  reset             Reset to defaults

Examples:
  catalyst config get github.token
  catalyst config set github.token ghp_xxxx
  catalyst config list
```

#### Maintenance

**`catalyst update`**
```
Usage: catalyst update [options]

Update BMAD and configurations

Options:
  --dry-run         Show what would be updated
  --force           Force update even if no changes

Examples:
  catalyst update                 # Interactive update
  catalyst update --dry-run       # Preview changes
```

**`catalyst verify`**
```
Usage: catalyst verify [options]

Verify Catalyst installation

Options:
  --component NAME  Verify specific component
  --verbose         Show detailed checks

Examples:
  catalyst verify                 # Check all components
  catalyst verify --component mcp # Check only MCP servers
```

**`catalyst doctor`**
```
Usage: catalyst doctor [options]

Diagnose and fix common issues

Options:
  --fix             Automatically fix detected issues
  --report          Generate diagnostic report

Examples:
  catalyst doctor                 # Diagnose issues
  catalyst doctor --fix           # Auto-fix if possible
  catalyst doctor --report > report.txt
```

### Output Design

#### Progress Indicators

**Installation Progress:**
```
🚀 Installing Catalyst...

📦 Installing dependencies...
  ✅ Node.js 20.10.0
  ✅ Ruby 3.2.2

📚 Installing BMAD Method...
  [████████████████████░░░░] 80% - Installing expansion packs

⚙️  Configuring MCP servers...
  ✅ GitHub
  ✅ Git
  ✅ Filesystem
  ⏳ Docker (testing connection...)
```

**Color Coding:**
- 🟢 Green: Success, completed operations
- 🔵 Blue: In progress, information
- 🟡 Yellow: Warnings, optional items
- 🔴 Red: Errors, failures

#### Success Messages

```
✅ Catalyst setup complete!

What's next?
  1. Restart your IDE to load new configuration
  2. Try: catalyst init in a project directory
  3. Invoke agents with @agent-name in your IDE

Run 'catalyst verify' to check your installation.
```

#### Error Messages

**Clear, actionable errors:**

```
❌ Error: Docker daemon not running

BMAD requires Docker to be installed and running.

To fix:
  1. Install Docker Desktop: https://docker.com/get-started
  2. Start Docker Desktop
  3. Run: catalyst doctor --fix

Need help? https://github.com/your-org/catalyst/issues
```

---

## Interactive Flows

### Setup Wizard

**Full Interactive Flow:**

```
┌─────────────────────────────────────────┐
│     Catalyst Setup Wizard v2.0.0        │
└─────────────────────────────────────────┘

Welcome to Catalyst! Let's set up your AI development environment.

This will take about 5 minutes.

🔍 Detecting your environment...

Found:
  ✅ VS Code (version 1.85.0)
  ✅ Continue.dev extension (v0.8.52)
  ✅ Docker Desktop (running)
  ✅ Git
  ⚠️  LM Studio not found (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Which project types do you work on?

  Select all that apply (space to toggle, enter to continue):

  [x] Fullstack Web Applications
  [ ] Frontend Only
  [ ] Backend Services/APIs
  [ ] Mobile Apps (iOS/Android)
  [ ] Game Development
  [ ] Data Science/ML

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your selection, I'll install these MCP servers:

  Essential (always installed):
    • GitHub - Repository management
    • Git - Local version control
    • Filesystem - File operations
    • Fetch - Web content retrieval
    • Memory - Context persistence

  For Fullstack Development:
    • Docker - Container management
    • PostgreSQL - Database operations
    • Vite - Frontend testing & build
    • Playwright - Browser automation

  Total: 9 servers

  [C]ontinue  [E]dit selection  [Q]uit
  >

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 API Keys (optional but recommended)

  GitHub Personal Access Token:
  (Leave blank to skip, can set later with 'catalyst config set')

  > ghp_************************************
  ✅ Token validated

  Other API keys? (y/N): n

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️  Installing components...

  [████████████████████████████████] 100%

  ✅ BMAD Method 4.44.1
  ✅ 10 BMAD agents
  ✅ 5 expansion packs
  ✅ 9 MCP servers configured
  ✅ Continue.dev configured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Setup complete!

Configuration saved to:
  ~/.catalyst/config.yaml

Next steps:
  1. Restart VS Code (Cmd+Shift+P → "Reload Window")
  2. Open a project and try: catalyst init
  3. Start using agents: @dev hello

Verify everything works:
  catalyst verify

Get help anytime:
  catalyst --help
  https://catalyst.dev/docs

Happy coding! 🚀
```

### Project Initialization

**Interactive Project Setup:**

```
$ catalyst init

┌─────────────────────────────────────────┐
│     Initialize Catalyst Project         │
└─────────────────────────────────────────┘

📋 What type of project is this?

  1. Fullstack Web Application
  2. Frontend Application
  3. Backend Service/API
  4. Mobile App (iOS/Android)
  5. Game Development
  6. Other/Custom

  Select (1-6): 1

🎨 Frontend Framework?

  1. React + TypeScript
  2. React + JavaScript
  3. Vue 3
  4. Svelte
  5. Next.js
  6. Other

  Select (1-6): 1

🗄️  Database?

  1. PostgreSQL
  2. MySQL
  3. MongoDB
  4. SQLite
  5. None

  Select (1-5): 1

☁️  Deployment Target?

  1. Vercel
  2. AWS (Amplify/ECS)
  3. Docker (self-hosted)
  4. Heroku
  5. Other/Not decided

  Select (1-5): 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creating project configuration...

  ✅ .catalyst/config.yaml
  ✅ .bmad-core/core-config.yaml
  ✅ .env.example
  ✅ docs/prd.md (template)
  ✅ docs/architecture.md (template)
  ✅ docs/stories/ (directory)

Configured MCP servers:
  • GitHub
  • Git
  • Filesystem
  • Docker
  • PostgreSQL
  • Vite
  • Playwright

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Project initialized!

Try these commands in your IDE:

  @analyst create project brief
  @po create stories for [feature]
  @architect design system
  @dev implement [story]

Or start with BMAD workflow:

  @bmad-orchestrator run greenfield-fullstack
```

---

## Error Handling & Recovery

### Error Categories

**1. Installation Errors**
```
❌ Error: Insufficient disk space

Required: 50GB free
Available: 12GB free

Catalyst requires space for:
  • BMAD bundles (2GB)
  • MCP servers (500MB)
  • LM Studio models (10-30GB)
  • Cache and logs (5GB)

To fix:
  1. Free up disk space
  2. Or install without LM Studio: catalyst setup --skip-lm-studio

Run 'catalyst doctor' for more disk space tips.
```

**2. Configuration Errors**
```
❌ Error: Invalid configuration file

File: ~/.catalyst/config.yaml
Line: 23
Issue: Invalid YAML syntax (unexpected character ':')

To fix:
  1. Edit ~/.catalyst/config.yaml
  2. Or reset to defaults: catalyst config reset
  3. Or reconfigure: catalyst setup --reconfigure
```

**3. Runtime Errors**
```
❌ Error: MCP server 'docker' failed to connect

Reason: Docker daemon not responding

To fix:
  1. Ensure Docker Desktop is running
  2. Check Docker status: docker ps
  3. Restart Docker if needed
  4. Test connection: catalyst mcp test docker

Still having issues?
  catalyst doctor --component docker
```

### Recovery Procedures

**Backup & Restore:**

```bash
# Automatic backup before updates
$ catalyst update

Backing up current configuration...
  ✅ ~/.catalyst/config.yaml → ~/.catalyst/backups/config_20251026.yaml
  ✅ Customized BMAD files → ~/.catalyst/backups/bmad_20251026.yaml

# Manual backup
$ catalyst config backup
Configuration backed up to:
  ~/.catalyst/backups/config_20251026_143022.yaml

# Restore from backup
$ catalyst config restore ~/.catalyst/backups/config_20251026.yaml
✅ Configuration restored successfully
```

**Rollback:**

```bash
# After failed update
$ catalyst update --rollback

Rolling back to previous version...
  ⏪ Catalyst 2.1.0 → 2.0.0
  ⏪ BMAD 4.45.0 → 4.44.1
  ✅ Rollback complete

Verify installation:
  catalyst verify
```

---

## Documentation & Help

### Built-in Help

**Command Help:**

```bash
$ catalyst --help

Catalyst v2.0.0 - AI Development Environment

Usage: catalyst <command> [options]

Commands:
  setup                   Run interactive setup wizard
  init                    Initialize project configuration
  verify                  Verify installation
  update                  Update BMAD and configurations
  doctor                  Diagnose and fix issues
  mcp <subcommand>        Manage MCP servers
  config <subcommand>     Manage configuration

Options:
  -h, --help              Show help
  -v, --version           Show version
  --verbose               Verbose output
  --quiet                 Minimal output

Examples:
  catalyst setup          # First-time setup
  catalyst init           # Set up new project
  catalyst mcp list       # List MCP servers
  catalyst verify         # Check installation

Documentation: https://catalyst.dev/docs
Issues: https://github.com/your-org/catalyst/issues
```

**Command-Specific Help:**

```bash
$ catalyst mcp --help

catalyst mcp - Manage MCP servers

Usage: catalyst mcp <subcommand> [options]

Subcommands:
  list                    List installed servers
  install <name>          Install MCP server
  remove <name>           Remove MCP server
  test <name>             Test server connection
  config <name>           Show server configuration

Options:
  --verbose               Show detailed information
  -h, --help              Show this help

Examples:
  catalyst mcp list                    # List all servers
  catalyst mcp install playwright      # Install Playwright MCP
  catalyst mcp test docker             # Test Docker MCP
  catalyst mcp config github           # Show GitHub MCP config

Available servers: https://catalyst.dev/mcp-servers
```

### Documentation Structure

**Online Documentation:**

```
https://catalyst.dev/
├── /docs
│   ├── /getting-started
│   │   ├── installation
│   │   ├── first-project
│   │   └── tutorial
│   ├── /guides
│   │   ├── mcp-servers
│   │   ├── bmad-methodology
│   │   ├── customization
│   │   └── team-setup
│   ├── /reference
│   │   ├── cli-commands
│   │   ├── configuration
│   │   ├── api
│   │   └── troubleshooting
│   └── /examples
│       ├── fullstack-app
│       ├── mobile-app
│       └── custom-mcp-server
```

### Video Tutorials

**Essential Videos:**

1. **"Catalyst in 5 Minutes"** (Quick Start)
   - Installation
   - First agent invocation
   - Simple workflow

2. **"Complete Setup Guide"** (15 minutes)
   - Detailed installation
   - Configuration options
   - IDE integration

3. **"BMAD Methodology Intro"** (20 minutes)
   - Agent roles
   - Workflows
   - Template system

4. **"Building Custom MCP Servers"** (30 minutes)
   - MCP protocol overview
   - TypeScript implementation
   - Testing and deployment

### Community Support

**Support Channels:**

- **GitHub Discussions:** Questions, ideas, showcase
- **GitHub Issues:** Bug reports, feature requests
- **Discord:** Real-time chat, community help
- **Stack Overflow:** Tag `catalyst-dev`
- **Twitter/X:** Updates and announcements

**Response Time Targets:**
- Critical bugs: < 24 hours
- Feature requests: < 1 week
- Questions: Community-driven

---

**Next:** Read [08-metrics-and-launch.md](08-metrics-and-launch.md) for success metrics and release plan.
