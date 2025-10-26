# Epic 1: Project Scaffolding & Development Environment

**Status:** Approved
**Priority:** P0 (Must Have)
**Estimated Stories:** 9
**Dependencies:** None (First epic)

---

## Epic Goal

Establish the foundational project structure, development tooling, and local development environment for Catalyst, enabling the team to begin implementing CLI and MCP server functionality with proper type safety, testing, and build capabilities.

---

## Epic Description

This epic creates the complete development foundation for Catalyst, including:

- TypeScript project structure with proper compilation and type checking
- Testing infrastructure with Vitest
- Development scripts and tooling
- Local development workflow
- Core project directories and configuration files
- Git repository setup and initial commit
- **Open-source community infrastructure (LICENSE, CODE_OF_CONDUCT, CODEOWNERS)**
- **Multi-audience README for general public, users, and contributors**
- **GitHub repository configuration for community contributions**

**Success Criteria:**
- Developers can clone the repository and start development immediately
- `npm install` and `npm run build` work successfully
- `npm test` runs the test suite
- TypeScript compilation is configured correctly
- All core directories exist and follow architecture specification

---

## Stories

### 1.1 Initialize TypeScript Project Structure
**As a** developer,
**I want** the project scaffolded with TypeScript configuration and core directories,
**so that** I can begin implementing features with proper type safety.

**Acceptance Criteria:**
1. TypeScript project initialized with tsconfig.json matching architecture spec
2. package.json created with all required dependencies
3. Core directory structure created (src/, mcp-servers/, bin/, templates/, config/, scripts/, tests/)
4. ESLint and Prettier configured for code quality
5. .gitignore properly configured
6. Initial README.md with project overview created

---

### 1.2 Set Up Testing Infrastructure
**As a** developer,
**I want** Vitest configured and ready to use,
**so that** I can write tests alongside implementation.

**Acceptance Criteria:**
1. Vitest installed and configured in package.json
2. vitest.config.ts created with coverage settings
3. tests/ directory structure created (unit/, integration/, e2e/)
4. Sample test file created to verify setup
5. `npm test`, `npm run test:watch`, and `npm run test:coverage` commands work
6. Coverage reporting configured

---

### 1.3 Configure Build and Development Scripts
**As a** developer,
**I want** npm scripts for building, testing, and development,
**so that** I have a consistent workflow.

**Acceptance Criteria:**
1. `npm run build` compiles TypeScript to dist/
2. `npm run dev` runs development mode with tsx
3. `npm run lint` checks code quality
4. `npm run format` formats code with Prettier
5. `npm run type-check` validates TypeScript without emitting
6. `npm run clean` removes build artifacts
7. bin/catalyst executable created with proper shebang

---

### 1.4 Create Core Utility Modules
**As a** developer,
**I want** core utility functions for filesystem, shell, and logging,
**so that** I can reuse common functionality across the codebase.

**Acceptance Criteria:**
1. src/utils/filesystem.ts created with fs-extra wrappers
2. src/utils/shell.ts created with execa wrappers
3. src/utils/logger.ts created with chalk-based logging
4. src/utils/errors.ts created with custom error classes
5. src/types/index.ts created with common TypeScript types
6. All utility modules have unit tests
7. Utility modules are properly exported

---

### 1.5 Set Up Local Development Workflow
**As a** developer,
**I want** documentation and scripts for local development,
**so that** I can efficiently develop and test locally.

**Acceptance Criteria:**
1. docs/guides/development.md created with setup instructions
2. `npm link` workflow documented for testing CLI globally
3. Local testing without Homebrew documented
4. Debugging instructions added
5. Common issues and solutions documented
6. Contributing guidelines created

---

### 1.6 Set Up Open-Source Community Foundation
**As a** project maintainer,
**I want** proper open-source governance files and configuration,
**so that** the project is ready for community contributions from day one.

**Acceptance Criteria:**
1. LICENSE file created (GNU AGPL v3.0 license - prevents commercial exploitation of forks)
2. CODE_OF_CONDUCT.md created (Contributor Covenant recommended)
3. CODEOWNERS file created with @azywicki as initial owner
4. .github/ISSUE_TEMPLATE/ created with bug report and feature request templates
5. .github/PULL_REQUEST_TEMPLATE.md created with PR checklist
6. SECURITY.md created with vulnerability reporting instructions
7. Author information in package.json set to "azywicki <81277290+NimbleEngineer21@users.noreply.github.com>"
8. Repository keywords and metadata configured for discoverability

---

### 1.7 Create Multi-Audience Top-Level README
**As a** visitor to the Catalyst repository,
**I want** a clear, accessible README that helps me understand the project regardless of my role,
**so that** I can quickly determine if Catalyst is useful for me and how to get started.

**Acceptance Criteria:**
1. README.md structured for multiple audiences (general public, end users, developers, contributors)
2. **Hero section**: Project name, tagline, and value proposition in plain language
3. **What is Catalyst**: Clear explanation for non-technical audience
4. **Quick Start**: Installation via Homebrew for end users
5. **Key Features**: Bullet points highlighting main capabilities
6. **Demo**: Asciicast or screenshot showing Catalyst in action
7. **For Users**: Link to user guide and getting started
8. **For Developers**: Link to architecture docs and API reference
9. **For Contributors**: Link to contributing guide and development setup
10. **Badges**: Build status, version, license, community links
11. **Community**: Links to discussions, Discord, issue tracker
12. **License**: MIT license badge and link
13. Language is accessible (avoid jargon, explain acronyms)
14. Follows standard open-source README best practices

---

### 1.8 Configure GitHub Repository for Community
**As a** project maintainer,
**I want** the GitHub repository configured for community engagement,
**so that** contributors can easily participate and collaborate.

**Acceptance Criteria:**
1. Repository description clearly explains Catalyst
2. Repository topics/tags added (ai, development-tools, mcp, homebrew, cli, etc.)
3. GitHub Discussions enabled for community Q&A
4. Issues enabled with labels (bug, enhancement, good-first-issue, help-wanted, documentation)
5. Wiki enabled (or disabled with note to use docs/)
6. Branch protection rules configured for main (require PR reviews)
7. Automatic label assignment configured
8. Repository social preview image created (1280x640 PNG)
9. Funding.yml configured (if applicable, or placeholder for future)
10. All links in README, docs point to correct locations

---

### 1.9 Initialize Git Repository and First Commit
**As a** developer,
**I want** the repository initialized with proper Git configuration,
**so that** we can track changes from the beginning.

**Acceptance Criteria:**
1. Git repository initialized
2. .gitignore properly configured (node_modules, dist, build, etc.)
3. Initial commit includes complete project structure
4. Initial commit includes all OSS governance files
5. Main branch established
6. Commit message follows conventions
7. Repository ready for GitHub push
8. Git author configured: azywicki <81277290+NimbleEngineer21@users.noreply.github.com>

---

## Epic Dependencies

**Depends On:** None (first epic)

**Enables:**
- Epic 2: Core CLI Implementation
- Epic 3: MCP Server Framework
- Epic 4: BMAD Integration
- Epic 5: Build & Release Pipeline
- Epic 6: Documentation

---

## Technical Notes

**Key Technologies:**
- TypeScript 5.3+
- Node.js 20+
- Vitest for testing
- Commander for CLI
- ESLint + Prettier for code quality

**Architecture References:**
- [Technology Stack](../architecture/02-technology-stack.md)
- [CLI Architecture](../architecture/03-cli-architecture.md)
- [Project Structure](../architecture/10-project-structure.md)
- [Development Workflow](../architecture/11-development-workflow.md)

---

## Definition of Done

- [ ] All 9 stories completed and acceptance criteria met
- [ ] Project can be cloned and `npm install` works
- [ ] `npm run build` produces compiled output
- [ ] `npm test` runs successfully (even if no tests yet)
- [ ] Local development workflow validated
- [ ] Code follows established patterns and conventions
- [ ] Documentation is accurate and helpful
- [ ] **All open-source governance files in place (LICENSE, CoC, CODEOWNERS)**
- [ ] **README serves multiple audiences effectively**
- [ ] **GitHub repository configured for community contributions**
- [ ] Initial commit pushed to repository
- [ ] Repository is public-ready (or ready for initial contributors)
