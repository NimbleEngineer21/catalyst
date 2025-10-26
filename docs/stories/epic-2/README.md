# Epic 2: Core CLI Implementation

**Status:** Approved - Ready for Implementation
**Priority:** P0 (Must Have)
**Total Stories:** 8
**Estimated Total Effort:** 38 hours (~1 week)

---

## Overview

Epic 2 builds the complete CLI functionality for Catalyst, implementing all essential commands (setup, init, verify, config) with environment detection, configuration management, and secure credential storage.

---

## Epic Goal

Implement the core Catalyst CLI with all essential commands including environment detection, configuration management, and user interaction, providing users with a functional command-line tool for managing their AI development environment.

---

## Stories

| ID | Story | Effort | Status | Dependencies |
|----|-------|--------|--------|--------------|
| **2.1** | [Implement Main CLI Entry Point](story-2.1-implement-main-cli-entry-point.md) | 4h | Not Started | Epic 1 Complete |
| **2.2** | [Implement Environment Detector](story-2.2-implement-environment-detector.md) | 5h | Not Started | 2.1 |
| **2.3** | [Implement Configuration Manager](story-2.3-implement-configuration-manager.md) | 6h | Not Started | 2.1 |
| **2.4** | [Implement macOS Keychain Integration](story-2.4-implement-keychain-integration.md) | 4h | Not Started | 2.3 |
| **2.5** | [Implement `catalyst setup` Command](story-2.5-implement-setup-command.md) | 6h | Not Started | 2.1-2.4 |
| **2.6** | [Implement `catalyst init` Command](story-2.6-implement-init-command.md) | 5h | Not Started | 2.1-2.3, 2.5 |
| **2.7** | [Implement `catalyst verify` Command](story-2.7-implement-verify-command.md) | 4h | Not Started | 2.1-2.3 |
| **2.8** | [Implement `catalyst config` Command](story-2.8-implement-config-command.md) | 4h | Not Started | 2.1, 2.3, 2.4 |

**Total Estimated Effort:** 38 hours

---

## Implementation Sequence

### Phase 1: Core Infrastructure (Stories 2.1-2.4)
**Duration:** ~2-3 days
**Goal:** Foundation for all CLI commands

1. **Story 2.1** - Main CLI entry point with Commander.js
2. **Story 2.2** - Environment detection (IDEs, tools, system)
3. **Story 2.3** - Configuration manager (global + project)
4. **Story 2.4** - Keychain integration for secure credentials

**Milestone:** Infrastructure ready for command implementation

---

### Phase 2: User-Facing Commands (Stories 2.5-2.8)
**Duration:** ~2-3 days
**Goal:** Complete, functional CLI

5. **Story 2.5** - `catalyst setup` - Interactive setup wizard
6. **Story 2.6** - `catalyst init` - Project initialization
7. **Story 2.7** - `catalyst verify` - Installation validation
8. **Story 2.8** - `catalyst config` - Configuration management

**Milestone:** Fully functional CLI ready for users

---

## Success Criteria

Epic 2 is complete when:

- [ ] All 8 stories completed with acceptance criteria met
- [ ] `catalyst --help` shows all commands
- [ ] `catalyst setup` successfully configures Catalyst
- [ ] `catalyst init` creates proper project structure
- [ ] `catalyst verify` accurately checks installation
- [ ] `catalyst config` manages settings correctly
- [ ] All commands have helpful error messages
- [ ] Unit tests achieve 80%+ coverage for CLI commands
- [ ] Integration tests verify command workflows
- [ ] Documentation updated with command usage examples

---

## Deliverables

### Core Modules
- `src/cli/index.ts` - Main CLI entry point
- `src/core/detector.ts` - Environment detection
- `src/core/configurator.ts` - Configuration management
- `src/core/verifier.ts` - Installation verification
- `src/utils/keychain.ts` - macOS Keychain integration

### CLI Commands
- `src/cli/commands/setup.ts` - Setup wizard
- `src/cli/commands/init.ts` - Project initialization
- `src/cli/commands/verify.ts` - Verification
- `src/cli/commands/config.ts` - Configuration management

### Configuration Files (Generated)
- `~/.catalyst/config.yaml` - Global configuration
- `.catalyst/config.yaml` - Project configuration
- `.catalyst/memory-mcp-config.json` - Memory MCP context
- `.catalyst/bmad-context.json` - BMAD agent context

### Tests
- `tests/unit/cli/*.test.ts` - Unit tests for CLI
- `tests/unit/core/*.test.ts` - Unit tests for core modules
- `tests/integration/commands/*.test.ts` - Integration tests

---

## Technical Notes

### Key Technologies
- **Commander.js** - CLI framework
- **Inquirer.js** - Interactive prompts
- **Chalk** - Terminal colors
- **Ora** - Spinners/progress indicators
- **Zod** - Runtime type validation
- **YAML** - Configuration file format

### Architecture References
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Complete CLI design
- [Data Architecture](../../architecture/07-data-architecture.md) - Config structure
- [Security Architecture](../../architecture/08-security-architecture.md) - Keychain integration
- [PRD: User Experience](../../prd/07-user-experience.md) - Command design

---

## Dependencies

**Depends On:**
- **Epic 1:** Project Scaffolding (utilities, TypeScript setup)

**Enables:**
- **Epic 3:** MCP Server Framework (CLI manages MCP servers)
- **Epic 4:** BMAD Integration (CLI installs/configures BMAD)
- **Epic 5:** Build & Release Pipeline (CLI is the artifact)

---

## Command Overview

### `catalyst` (Base Command)
- Shows help and version
- Lists available commands
- Entry point for all functionality

### `catalyst setup`
- Interactive setup wizard
- Detects environment (IDEs, LM Studio, etc.)
- Configures global settings
- Stores API keys securely
- Creates ~/.catalyst/ structure

### `catalyst init`
- Initializes Catalyst in project
- Detects project type
- Creates .catalyst/ directory
- Generates project config
- Sets up documentation structure

### `catalyst verify`
- Validates installation
- Checks system requirements
- Validates configuration files
- Tests tool availability
- Provides troubleshooting guidance

### `catalyst config`
- Manages configuration settings
- Subcommands: list, get, set, delete
- Works with global and project configs
- Validates values before saving
- Supports dot notation for nested keys

---

## Testing Strategy

### Unit Tests
- Test each module in isolation
- Mock external dependencies
- Test success and error paths
- >80% code coverage goal

### Integration Tests
- Test complete command flows
- Test config file operations
- Test keychain integration
- Test environment detection on real system

### Manual Testing Checklist
- [ ] Install Catalyst globally with `npm link`
- [ ] Run `catalyst setup` and complete wizard
- [ ] Navigate to project and run `catalyst init`
- [ ] Run `catalyst verify` to check installation
- [ ] Use `catalyst config` to view/modify settings
- [ ] Test on fresh macOS installation
- [ ] Test with different IDE combinations

---

## Notes

- **macOS Focus:** Initial implementation targets macOS (Homebrew primary distribution)
- **Future Cross-Platform:** Design allows for Linux/Windows support
- **Keychain Security:** All sensitive data stored in Keychain, not plaintext
- **Hierarchical Config:** Project config overrides global config
- **Interactive Experience:** Commands use colors, spinners, progress indicators
- **Error Handling:** All errors provide clear messages and fix suggestions
- **Future Enhancements:**
  - Shell completion (bash, zsh, fish)
  - `catalyst doctor` - Advanced diagnostics
  - `catalyst update` - Self-update mechanism
  - `catalyst uninstall` - Clean uninstallation
  - `catalyst plugin` - Plugin management
  - Machine-readable output (`--json` flag)

---

## Definition of Done

- [ ] All 8 stories completed and acceptance criteria met
- [ ] All commands functional and tested
- [ ] Help text clear and comprehensive
- [ ] Error messages actionable
- [ ] Unit tests passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] Code follows standards
- [ ] PO acceptance

---

**Epic Created:** October 26, 2025
**Last Updated:** October 26, 2025
**Ready for Implementation:** ✅ Yes
