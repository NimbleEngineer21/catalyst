# Epic 4: BMAD Integration

**Status:** Draft
**Priority:** P0 (Must Have)
**Estimated Stories:** 5
**Dependencies:** Epic 1 (Project Scaffolding), Epic 2 (Core CLI)

---

## Epic Goal

Integrate the complete BMAD (BMad Method) framework into Catalyst, including installation automation, symlink management, update handling, and IDE configuration, enabling users to access all 10 BMAD agents, 24 tasks, 14 templates, and 6 workflows seamlessly.

---

## Epic Description

This epic delivers full BMAD methodology integration, including:

- Automated BMAD installation via `npx bmad-method install`
- Symlink management between Catalyst bundles and ~/.bmad-core
- BMAD version detection and update management
- IDE integration for BMAD agents (slash commands, @ mentions)
- Expansion pack installation support
- BMAD customization preservation during updates

**Success Criteria:**
- `catalyst setup` automatically installs BMAD
- All 10 BMAD agents accessible in IDE
- `catalyst update` preserves user customizations
- BMAD expansion packs can be installed on demand
- ~/.bmad-core properly linked to Catalyst bundles
- BMAD workflows functional in IDE

---

## Stories

### 4.1 Implement BMAD Installer Module
**As a** user,
**I want** Catalyst to install BMAD automatically during setup,
**so that** I don't have to manually configure the methodology framework.

**Acceptance Criteria:**
1. src/bmad/installer.ts created
2. Executes `npx bmad-method install --full --yes`
3. Installs all expansion packs by default
4. Configures BMAD for all detected IDEs
5. Validates successful installation
6. Handles installation errors gracefully
7. Provides progress indicators during installation
8. Verifies ~/.bmad-core directory structure
9. Unit tests with mocked npx execution

---

### 4.2 Implement BMAD Symlink Manager
**As a** developer,
**I want** Catalyst to manage symlinks between bundles and ~/.bmad-core,
**so that** BMAD updates are seamless and customizations are preserved.

**Acceptance Criteria:**
1. src/bmad/linker.ts created
2. Creates symlinks from ~/.bmad-core to Catalyst bundles
3. Handles existing files/directories gracefully
4. Backs up user customizations before relinking
5. Restores customizations after update
6. Validates symlink integrity
7. Provides rollback capability
8. Unit tests for symlink operations

---

### 4.3 Implement BMAD Version Management
**As a** user,
**I want** Catalyst to detect BMAD version changes and handle updates,
**so that** I always have the latest methodology framework.

**Acceptance Criteria:**
1. src/bmad/updater.ts created
2. Detects currently installed BMAD version
3. Detects available BMAD version
4. Prompts user before updating
5. Shows changelog/release notes
6. Backs up customizations before update
7. Executes BMAD update process
8. Restores customizations after update
9. Validates successful update
10. Unit tests for version detection and update flow

---

### 4.4 Implement `catalyst update` Command
**As a** user,
**I want** to update Catalyst and BMAD with a single command,
**so that** I can easily keep my environment current.

**Acceptance Criteria:**
1. src/cli/commands/update.ts created
2. Checks for Catalyst updates (via Homebrew)
3. Checks for BMAD updates
4. Displays available updates
5. Prompts for confirmation
6. Backs up configurations
7. Executes updates in correct order (BMAD first, then configs)
8. Validates successful updates
9. Shows summary of changes
10. Provides rollback instructions if needed

---

### 4.5 Configure BMAD IDE Integration
**As a** user,
**I want** BMAD agents accessible via @ mentions in my IDE,
**so that** I can invoke agents naturally during development.

**Acceptance Criteria:**
1. Generates IDE-specific BMAD configurations
2. Continue.dev slash command configuration
3. Claude Code @ mention configuration
4. All 10 agents accessible (@po, @dev, @qa, @architect, etc.)
5. Agent context properly configured
6. MCP servers available to agents
7. Templates and tasks accessible
8. Workflows properly configured
9. Validates agent invocation functionality

---

## Epic Dependencies

**Depends On:**
- Epic 1: Project Scaffolding (core utilities, filesystem operations)
- Epic 2: Core CLI (setup, update commands)

**Enables:**
- Epic 6: Documentation (BMAD workflows documented)
- Development workflow (agents used to build Catalyst)

**Works Alongside:**
- Epic 3: MCP Server Framework (BMAD agents use MCP servers)

---

## Technical Notes

**Key Technologies:**
- `npx` for BMAD installation
- Filesystem symlinks for bundle management
- YAML parsing for BMAD configuration
- Shell command execution (execa)

**Architecture References:**
- [PRD Features: BMAD Integration](../prd/03-features-and-requirements.md#bmad-integration-features)
- [BMAD Integration Specification](../prd/06-bmad-integration.md)
- [Data Architecture](../prd/04-technical-architecture.md#data-architecture)

**BMAD Components:**
- 10 Agents: @analyst, @po, @architect, @dev, @qa, @pm, @ux-expert, @sm, @bmad-master, @bmad-orchestrator
- 24 Tasks: Various development tasks
- 14 Templates: PRD, Architecture, Story, etc.
- 6 Workflows: Greenfield, Brownfield, etc.
- 5+ Expansion Packs: Unity, Phaser, Creative Writing, Infrastructure, Godot

**Critical Considerations:**
- User customizations must be preserved during updates
- Backup before any destructive operations
- Clear rollback procedures
- Version compatibility validation
- Symlink integrity validation

---

## Definition of Done

- [ ] All 5 stories completed and acceptance criteria met
- [ ] `catalyst setup` installs BMAD automatically
- [ ] All 10 BMAD agents accessible in IDE
- [ ] `catalyst update` handles BMAD updates safely
- [ ] User customizations preserved during updates
- [ ] ~/.bmad-core properly structured and linked
- [ ] BMAD expansion packs installable
- [ ] Agent invocation tested and functional
- [ ] Rollback procedures validated
- [ ] Documentation includes BMAD usage examples
