# Epic 2: Core CLI Implementation

**Status:** Approved
**Priority:** P0 (Must Have)
**Estimated Stories:** 8
**Dependencies:** Epic 1 (Project Scaffolding)

---

## Epic Goal

Implement the core Catalyst CLI with all essential commands (`setup`, `init`, `verify`, `update`, `doctor`, `config`, `mcp`) including environment detection, configuration management, and user interaction, providing users with a functional command-line tool for managing their AI development environment.

---

## Epic Description

This epic builds the complete CLI functionality for Catalyst, including:

- Main CLI entry point with Commander.js
- Interactive setup wizard with environment detection
- Per-project initialization command
- Verification and troubleshooting tools
- Configuration management system
- MCP server management commands
- Secure credential storage using macOS Keychain

**Success Criteria:**
- Users can run `catalyst --version` and see version info
- `catalyst setup` detects environment and guides users through configuration
- `catalyst init` creates project-specific configuration
- `catalyst verify` checks installation status
- `catalyst config` manages settings
- All commands have helpful `--help` output
- Error messages are clear and actionable

---

## Stories

### 2.1 Implement Main CLI Entry Point
**As a** user,
**I want** a functional `catalyst` command with help and version info,
**so that** I can access all Catalyst functionality from the command line.

**Acceptance Criteria:**
1. src/index.ts created as main entry point
2. Commander.js configured with program name, description, version
3. `catalyst --version` displays version from package.json
4. `catalyst --help` shows available commands
5. bin/catalyst executable properly configured
6. TypeScript compilation produces working bin file
7. Error handling for unknown commands

---

### 2.2 Implement Environment Detector
**As a** developer,
**I want** Catalyst to detect my installed IDEs and extensions,
**so that** setup is automated and intelligent.

**Acceptance Criteria:**
1. src/core/detector.ts created
2. Detects VS Code, Cursor, Claude Code, and other IDEs
3. Detects Continue.dev extension if installed
4. Detects LM Studio if installed
5. Detects Node.js version
6. Detects macOS version
7. Returns structured environment data
8. Unit tests cover all detection scenarios

---

### 2.3 Implement Configuration Manager
**As a** developer,
**I want** Catalyst to manage global and project configurations,
**so that** settings are persisted and easily managed.

**Acceptance Criteria:**
1. src/core/configurator.ts created
2. Reads/writes ~/.catalyst/config.yaml
3. Reads/writes project .catalyst/config.yaml
4. Validates configuration with Zod schemas
5. Handles hierarchical config (global < project)
6. Creates directories if they don't exist
7. Provides type-safe config access
8. Unit tests for all config operations

---

### 2.4 Implement macOS Keychain Integration
**As a** user,
**I want** my API keys stored securely in macOS Keychain,
**so that** my credentials are protected.

**Acceptance Criteria:**
1. src/utils/keychain.ts created
2. `store()` method saves credentials to Keychain
3. `retrieve()` method reads credentials from Keychain
4. `delete()` method removes credentials
5. Handles Keychain access errors gracefully
6. Environment variable fallback if Keychain unavailable
7. Unit tests with mocked security command

---

### 2.5 Implement `catalyst setup` Command
**As a** user,
**I want** an interactive setup wizard,
**so that** Catalyst is configured for my environment.

**Acceptance Criteria:**
1. src/cli/commands/setup.ts created
2. Uses Inquirer for interactive prompts
3. Detects environment using detector module
4. Prompts for project type preferences
5. Prompts for API keys (optional)
6. Generates ~/.catalyst/config.yaml
7. Provides clear progress indicators
8. Displays summary and next steps
9. Can be re-run to reconfigure

---

### 2.6 Implement `catalyst init` Command
**As a** user,
**I want** to initialize Catalyst in my project directory,
**so that** I have project-specific configuration.

**Acceptance Criteria:**
1. src/cli/commands/init.ts created
2. Detects project type from package.json, Gemfile, etc.
3. Creates .catalyst/ directory
4. Generates .catalyst/config.yaml
5. Creates .bmad-core/core-config.yaml
6. Creates .env.example template
7. Creates docs/ directory structure
8. Prompts for project-specific settings
9. Handles existing files gracefully (prompts before overwriting)

---

### 2.7 Implement `catalyst verify` Command
**As a** user,
**I want** to verify my Catalyst installation,
**so that** I know everything is configured correctly.

**Acceptance Criteria:**
1. src/cli/commands/verify.ts created
2. src/core/verifier.ts created
3. Checks Catalyst version
4. Checks Node.js version (>= 20)
5. Checks macOS version (>= 13.0)
6. Checks ~/.catalyst/ directory structure
7. Checks configuration file validity
8. Displays results with ✅/❌ indicators
9. Exits with appropriate code (0 = pass, 1 = fail)

---

### 2.8 Implement `catalyst config` Command
**As a** user,
**I want** to manage Catalyst configuration from the command line,
**so that** I can view and update settings easily.

**Acceptance Criteria:**
1. src/cli/commands/config.ts created
2. `catalyst config list` shows all settings
3. `catalyst config get <key>` displays specific value
4. `catalyst config set <key> <value>` updates setting
5. Validates config values before saving
6. Supports dot notation for nested keys (e.g., `mcp_servers.docker.enabled`)
7. Shows clear error messages for invalid keys/values
8. Updates both global and project configs as appropriate

---

## Epic Dependencies

**Depends On:**
- Epic 1: Project Scaffolding (core utilities, TypeScript setup)

**Enables:**
- Epic 3: MCP Server Framework (CLI manages MCP servers)
- Epic 4: BMAD Integration (CLI installs and configures BMAD)
- Epic 5: Build & Release Pipeline (CLI is the artifact being built)

---

## Technical Notes

**Key Technologies:**
- Commander.js for CLI framework
- Inquirer for interactive prompts
- Chalk for terminal colors
- Zod for runtime type validation
- fs-extra for file operations
- execa for shell command execution

**Architecture References:**
- [CLI Architecture](../architecture/03-cli-architecture.md)
- [PRD Features: Core Features](../prd/03-features-and-requirements.md#core-features)
- [Technology Stack](../architecture/02-technology-stack.md)

**Security Considerations:**
- API keys must be stored in Keychain, not plaintext config files
- Configuration files should use environment variable references
- Validate all user input before writing to filesystem

---

## Definition of Done

- [ ] All 8 stories completed and acceptance criteria met
- [ ] `catalyst --help` shows all commands
- [ ] `catalyst setup` successfully configures Catalyst
- [ ] `catalyst init` creates proper project structure
- [ ] `catalyst verify` accurately checks installation
- [ ] `catalyst config` manages settings correctly
- [ ] All commands have helpful error messages
- [ ] Unit tests achieve 80%+ coverage for CLI commands
- [ ] Integration tests verify command workflows
- [ ] Documentation updated with command usage examples
