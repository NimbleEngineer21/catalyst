# PRD Shard 03: Features & Requirements

**Parent Document:** [prd.md](prd.md)
**Last Updated:** October 26, 2025

---

## Table of Contents

1. [Feature Overview](#feature-overview)
2. [Core Features](#core-features)
3. [MCP Server Features](#mcp-server-features)
4. [BMAD Integration Features](#bmad-integration-features)
5. [User Experience Features](#user-experience-features)
6. [Non-Functional Requirements](#non-functional-requirements)

---

## Feature Overview

### Feature Priority Framework

- **P0 (Must Have)** - Critical for MVP, blocks release
- **P1 (Should Have)** - Important for user experience, plan for v2.0
- **P2 (Nice to Have)** - Enhances product, can defer to v2.1+

### Feature Categories

1. **Installation & Setup** - Getting Catalyst running
2. **CLI Commands** - User-facing command-line interface
3. **MCP Server Management** - Installing and configuring MCP servers
4. **BMAD Integration** - Methodology framework features
5. **IDE Integration** - Connecting with development environments
6. **Configuration Management** - Per-user and per-project settings
7. **Update & Maintenance** - Keeping Catalyst current
8. **Troubleshooting** - Diagnosing and fixing issues

---

## Core Features

### F1: Homebrew Installation (P0)

**Description:** Users can install Catalyst via Homebrew with standard commands

**Requirements:**
- REQ-F1.1: Catalyst available via Homebrew tap
- REQ-F1.2: Single command installation: `brew install catalyst`
- REQ-F1.3: Automatic dependency resolution (Node.js, Ruby)
- REQ-F1.4: Installation completes in < 10 minutes on average Mac
- REQ-F1.5: Post-install message with next steps
- REQ-F1.6: Creates global directories (`~/.catalyst`, `~/.bmad-core`)

**Acceptance Criteria:**
- User can add tap: `brew tap your-org/catalyst`
- User can install: `brew install catalyst`
- Installation succeeds on clean macOS (Ventura+)
- `catalyst --version` shows correct version after install
- No errors during installation process

**Testing:**
- Test on fresh macOS installations (Intel + Apple Silicon)
- Test with/without pre-existing Node.js/Ruby
- Test network interruption handling
- Test disk space requirements

---

### F2: Interactive Setup Wizard (P0)

**Description:** First-run wizard that detects environment and configures Catalyst

**Requirements:**
- REQ-F2.1: Command: `catalyst setup`
- REQ-F2.2: Detects installed IDEs (VS Code, Cursor, Claude Code, etc.)
- REQ-F2.3: Detects Continue.dev extension if present
- REQ-F2.4: Prompts for project type (fullstack, frontend, backend, mobile, etc.)
- REQ-F2.5: Selects appropriate MCP servers based on project type
- REQ-F2.6: Prompts for API keys (GitHub, optional cloud APIs)
- REQ-F2.7: Offers to install LM Studio
- REQ-F2.8: Generates configuration files
- REQ-F2.9: Links BMAD methodology files
- REQ-F2.10: Runs verification checks
- REQ-F2.11: Completes in < 5 minutes of user time

**Acceptance Criteria:**
- Wizard runs on first `catalyst setup` invocation
- Correctly detects at least one IDE/extension
- Presents clear, numbered choices for all prompts
- Validates API keys before saving
- Creates all necessary configuration files
- Provides clear success/failure messages
- Can be re-run to reconfigure

**Testing:**
- Test with each supported IDE
- Test with no IDE installed (error handling)
- Test with invalid API keys
- Test interruption and resumption
- Test on slow network connections

---

### F3: Per-Project Initialization (P0)

**Description:** Initialize Catalyst configuration for individual projects

**Requirements:**
- REQ-F3.1: Command: `catalyst init`
- REQ-F3.2: Detects project type from files (package.json, Gemfile, etc.)
- REQ-F3.3: Creates `.catalyst/config.yaml`
- REQ-F3.4: Creates `.bmad-core/core-config.yaml`
- REQ-F3.5: Creates `.env.example` template
- REQ-F3.6: Creates `docs/` directory structure
- REQ-F3.7: Prompts for project-specific settings
- REQ-F3.8: Inherits from global configuration
- REQ-F3.9: Git-friendly (small files, clear format)

**Acceptance Criteria:**
- Creates minimal, focused project configuration
- Doesn't override existing files without confirmation
- Config files are human-readable YAML
- Can run multiple times (idempotent)
- Works in git repositories and non-git directories

**Testing:**
- Test in new vs existing projects
- Test with various project types (React, Rails, Python, etc.)
- Test in git repo vs non-git directory
- Test with existing `.env` files
- Test re-running init command

---

### F4: MCP Server Management (P0)

**Description:** Install, configure, and manage MCP servers

**Requirements:**
- REQ-F4.1: Install essential MCP servers by default
- REQ-F4.2: Command: `catalyst mcp list` - show installed servers
- REQ-F4.3: Command: `catalyst mcp install <server>` - install additional server
- REQ-F4.4: Command: `catalyst mcp remove <server>` - remove server
- REQ-F4.5: Command: `catalyst mcp test <server>` - verify server works
- REQ-F4.6: Generate IDE-specific MCP configuration files
- REQ-F4.7: Support npm-based servers (`npx @modelcontextprotocol/...`)
- REQ-F4.8: Support custom binary servers (Docker, PostgreSQL, etc.)
- REQ-F4.9: Validate MCP server connectivity on setup

**Acceptance Criteria:**
- Default installation includes 7 essential servers
- `catalyst mcp list` shows status (active/inactive) for each server
- Can install community MCP servers from npm
- Custom servers properly integrated
- MCP configuration matches IDE requirements

**Testing:**
- Test each default MCP server
- Test installing/removing servers
- Test with Continue.dev and Claude Code
- Test npm-based vs binary servers
- Test error handling for failed servers

---

### F5: BMAD Integration (P0)

**Description:** Full BMAD methodology framework integrated and accessible

**Requirements:**
- REQ-F5.1: Install BMAD via `npx bmad-method install` during setup
- REQ-F5.2: Create symlinks from `~/.bmad-core` to Catalyst bundle
- REQ-F5.3: All 10 BMAD agents available (PO, Dev, QA, PM, etc.)
- REQ-F5.4: All 24 BMAD tasks available
- REQ-F5.5: All 14 BMAD templates available
- REQ-F5.6: All 6 BMAD workflows available
- REQ-F5.7: All 5+ expansion packs installable
- REQ-F5.8: BMAD agents accessible via `@agent-name` in IDE
- REQ-F5.9: BMAD files linked to IDE command structures

**Acceptance Criteria:**
- `ls ~/.bmad-core` shows complete BMAD structure
- Can invoke any BMAD agent from IDE
- Templates generate correct document structures
- Workflows execute full multi-agent sequences
- Expansion packs install on demand

**Testing:**
- Test each BMAD agent invocation
- Test template generation
- Test workflow execution
- Test expansion pack installation
- Test BMAD updates

---

### F6: Configuration Management (P1)

**Description:** Manage global and project-specific configurations

**Requirements:**
- REQ-F6.1: Command: `catalyst config get <key>` - read setting
- REQ-F6.2: Command: `catalyst config set <key> <value>` - write setting
- REQ-F6.3: Command: `catalyst config list` - show all settings
- REQ-F6.4: Hierarchical config: global < project < environment
- REQ-F6.5: Config validation on set
- REQ-F6.6: Export/import configurations
- REQ-F6.7: Template configurations for teams

**Acceptance Criteria:**
- Can read and write config values
- Project config overrides global config
- Invalid values rejected with clear error
- Can export config to share with team
- Can import team config template

---

### F7: Update Management (P0)

**Description:** Keep Catalyst and BMAD up to date

**Requirements:**
- REQ-F7.1: Homebrew updates via `brew upgrade catalyst`
- REQ-F7.2: Command: `catalyst update` - apply configuration updates
- REQ-F7.3: Detect BMAD version changes
- REQ-F7.4: Backup user customizations before update
- REQ-F7.5: Merge updated BMAD with custom files
- REQ-F7.6: Restore customizations after update
- REQ-F7.7: Show changelog on update
- REQ-F7.8: Support rollback to previous version

**Acceptance Criteria:**
- `brew upgrade catalyst` updates to latest version
- `catalyst update` preserves customizations
- User notified of changes before applying
- Can review what will change
- Rollback works if update fails

**Testing:**
- Test update from v0.1.0 to v2.0.1
- Test with customized BMAD agents
- Test with modified templates
- Test interrupted update
- Test rollback scenarios

---

### F8: Verification & Troubleshooting (P0)

**Description:** Tools to verify installation and diagnose issues

**Requirements:**
- REQ-F8.1: Command: `catalyst verify` - check installation
- REQ-F8.2: Verify all components (CLI, BMAD, MCP servers, IDE config)
- REQ-F8.3: Command: `catalyst doctor` - diagnose issues
- REQ-F8.4: Check common problems (permissions, paths, connectivity)
- REQ-F8.5: Suggest fixes for detected issues
- REQ-F8.6: Generate diagnostic report for bug reports
- REQ-F8.7: Validate configuration files
- REQ-F8.8: Test MCP server connectivity

**Acceptance Criteria:**
- `catalyst verify` shows pass/fail for each component
- `catalyst doctor` identifies common issues
- Diagnostic report includes all relevant information
- Clear instructions for fixing issues
- Can run checks individually

**Testing:**
- Test on working installation (all pass)
- Test with missing components
- Test with incorrect configuration
- Test with failed MCP servers
- Test diagnostic report completeness

---

## MCP Server Features

### F9: Essential MCP Servers (P0)

**GitHub MCP Server:**
- Create/update/close issues
- Create/update/merge PRs
- Search repositories
- Manage workflows
- Read/write files via GitHub API

**Git MCP Server:**
- Local repository operations
- Commit, branch, merge
- View history and diffs
- Stage/unstage changes

**Filesystem MCP Server:**
- Read/write files with safety checks
- Directory operations
- Search and replace
- File permissions management

**Docker MCP Server (Custom):**
- Container management (start/stop/restart)
- Image operations (build/pull/push)
- Docker Compose support
- Volume and network management
- Container logs and stats

**PostgreSQL MCP Server (Custom):**
- Execute SQL queries
- Schema inspection
- Migration management
- Query analysis (EXPLAIN)
- Transaction support

**Fetch MCP Server:**
- HTTP/HTTPS requests
- HTML to Markdown conversion
- API endpoint testing

**Memory MCP Server:**
- Knowledge graph storage
- Entity and relationship tracking
- Context preservation across sessions

---

### F10: Development Tool MCP Servers (P1)

**Vite MCP Server (Custom):**
- Run tests (Vitest)
- Generate coverage reports
- Build for production
- Dev server management

**Storybook MCP Server (Custom):**
- List components and stories
- Run interaction tests
- Generate visual regression tests
- Export Storybook static build

**Xcode MCP Server (Custom):**
- Build iOS/macOS projects
- Run simulators
- Execute unit/UI tests
- Manage Swift packages

**Playwright MCP Server (Official):**
- Browser automation
- Cross-browser testing
- Screenshot capture
- Accessibility tree extraction

**Figma MCP Server (Official):**
- Extract design components
- Generate code from designs
- Access design tokens
- Code Connect integration

---

## BMAD Integration Features

### F11: Agent Invocation (P0)

**Requirements:**
- REQ-F11.1: Agents invocable via `@agent-name` syntax
- REQ-F11.2: Context-aware responses
- REQ-F11.3: Access to all MCP servers
- REQ-F11.4: Use appropriate BMAD templates
- REQ-F11.5: Follow BMAD workflows

**Agents:**
- `@analyst` - Requirements analysis and research
- `@po` - Product owner, creates stories
- `@architect` - System design and architecture
- `@dev` - Implementation and coding
- `@qa` - Testing and quality assurance
- `@pm` - Project management and documentation
- `@ux-expert` - User experience design
- `@sm` - Scrum master, process facilitation
- `@bmad-master` - BMAD methodology guidance
- `@bmad-orchestrator` - Multi-agent workflow coordination

---

### F12: Template System (P1)

**Requirements:**
- REQ-F12.1: BMAD templates available for all agents
- REQ-F12.2: Agents use templates automatically
- REQ-F12.3: Templates customizable per project
- REQ-F12.4: Templates generate structured documents

**Templates:**
- Project Brief
- PRD (Product Requirements Document)
- Architecture Document
- User Story
- QA Gate Report
- Market Research
- Competitor Analysis
- Various domain-specific templates

---

## User Experience Features

### F13: CLI Design (P0)

**Requirements:**
- REQ-F13.1: Clear, consistent command structure
- REQ-F13.2: Helpful error messages
- REQ-F13.3: Progress indicators for long operations
- REQ-F13.4: Colorized output for readability
- REQ-F13.5: `--help` for every command
- REQ-F13.6: `--verbose` flag for debugging
- REQ-F13.7: `--quiet` flag for scripts

**Command Structure:**
```bash
catalyst <command> [subcommand] [options]

# Examples:
catalyst setup
catalyst init
catalyst verify
catalyst update
catalyst mcp list
catalyst config get github.token
catalyst doctor
```

---

### F14: Documentation (P0)

**Requirements:**
- REQ-F14.1: README with quick start guide
- REQ-F14.2: Installation guide
- REQ-F14.3: Configuration reference
- REQ-F14.4: MCP server documentation
- REQ-F14.5: Troubleshooting guide
- REQ-F14.6: API documentation for MCP servers
- REQ-F14.7: Video tutorials
- REQ-F14.8: Example projects

---

## Non-Functional Requirements

### NFR1: Performance (P0)

- Installation completes in < 10 minutes
- Setup wizard completes in < 5 minutes
- `catalyst verify` runs in < 30 seconds
- MCP server responses in < 2 seconds
- CLI commands start in < 1 second

### NFR2: Reliability (P0)

- 95%+ installation success rate
- Graceful handling of network failures
- Resume interrupted operations
- Atomic configuration updates
- Backup before destructive operations

### NFR3: Security (P0)

- API keys stored securely (keychain integration)
- MCP servers run with minimal permissions
- Sandboxed file operations
- Clear audit trail for operations
- No telemetry without user consent

### NFR4: Compatibility (P0)

- macOS 13.0 (Ventura) and later
- Apple Silicon and Intel Macs
- Node.js 20+
- Ruby 3.2+
- Compatible with major IDEs

### NFR5: Maintainability (P1)

- Modular architecture
- Clear separation of concerns
- Comprehensive test coverage (80%+)
- CI/CD automation
- Version-locked dependencies

### NFR6: Usability (P0)

- Zero-config default experience
- Progressive disclosure of advanced features
- Clear, actionable error messages
- Consistent UX across all commands
- Keyboard-friendly (no mouse required)

### NFR7: Scalability (P1)

- Support for 100+ MCP servers
- Handle large project configurations
- Efficient caching mechanisms
- Async operations where possible

---

**Next:** Read [04-technical-architecture.md](04-technical-architecture.md) for system design and technical specifications.
