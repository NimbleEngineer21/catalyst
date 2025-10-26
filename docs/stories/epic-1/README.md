# Epic 1: Project Scaffolding & Development Environment

**Status:** Approved - Ready for Implementation
**Priority:** P0 (Must Have)
**Total Stories:** 9
**Estimated Total Effort:** 34 hours

---

## Overview

Epic 1 establishes the complete foundational project structure, development tooling, testing infrastructure, and open-source community foundation for Catalyst. Upon completion, developers can immediately begin implementing features with proper type safety, testing, and community engagement.

---

## Epic Goal

Establish the foundational project structure, development tooling, and local development environment for Catalyst, enabling the team to begin implementing CLI and MCP server functionality with proper type safety, testing, and build capabilities.

---

## Stories

| ID | Story | Effort | Status | Dependencies |
|----|-------|--------|--------|--------------|
| **1.1** | [Initialize TypeScript Project Structure](story-1.1-initialize-typescript-project.md) | 4h | Not Started | None |
| **1.2** | [Set Up Testing Infrastructure](story-1.2-setup-testing-infrastructure.md) | 3h | Not Started | 1.1 |
| **1.3** | [Configure Build and Development Scripts](story-1.3-configure-build-development-scripts.md) | 3h | Not Started | 1.1, 1.2 |
| **1.4** | [Create Core Utility Modules](story-1.4-create-core-utility-modules.md) | 6h | Not Started | 1.1, 1.2, 1.3 |
| **1.5** | [Set Up Local Development Workflow](story-1.5-setup-local-development-workflow.md) | 4h | Not Started | 1.1-1.4 |
| **1.6** | [Set Up Open-Source Community Foundation](story-1.6-setup-oss-community-foundation.md) | 5h | Not Started | 1.1, 1.5 |
| **1.7** | [Create Multi-Audience Top-Level README](story-1.7-create-multi-audience-readme.md) | 4h | Not Started | 1.5, 1.6 |
| **1.8** | [Configure GitHub Repository for Community](story-1.8-configure-github-repository.md) | 3h | Not Started | 1.6, 1.7, 1.9 |
| **1.9** | [Initialize Git Repository and First Commit](story-1.9-initialize-git-repository.md) | 2h | Not Started | 1.1-1.7 |

**Total Estimated Effort:** 34 hours (~1 week of focused work)

---

## Implementation Sequence

### Phase 1: Core Setup (Stories 1.1-1.3)
**Duration:** ~1-2 days
**Goal:** Basic project structure and build system

1. **Story 1.1** - Initialize TypeScript project, create directories, configure tooling
2. **Story 1.2** - Set up Vitest testing infrastructure
3. **Story 1.3** - Configure build scripts and CLI executable

**Milestone:** Project can be built and tested

---

### Phase 2: Utilities & Documentation (Stories 1.4-1.5)
**Duration:** ~2 days
**Goal:** Foundational utilities and developer docs

4. **Story 1.4** - Create core utility modules (filesystem, shell, logger, errors)
5. **Story 1.5** - Document local development workflow and contributing guidelines

**Milestone:** Developers can build, test, and contribute effectively

---

### Phase 3: Open Source Foundation (Stories 1.6-1.7)
**Duration:** ~1-2 days
**Goal:** Community-ready governance and documentation

6. **Story 1.6** - Set up OSS governance files (LICENSE, CODE_OF_CONDUCT, CODEOWNERS, templates)
7. **Story 1.7** - Create multi-audience README with proper structure and content

**Milestone:** Project is welcoming and ready for community engagement

---

### Phase 4: Git & GitHub (Stories 1.9, 1.8)
**Duration:** ~1 day
**Goal:** Version control and GitHub configuration

8. **Story 1.9** - Initialize Git repository and create initial commit
9. **Story 1.8** - Configure GitHub repository settings (topics, discussions, labels, protection)

**Note:** Story 1.9 happens before 1.8 (must commit before configuring GitHub)

**Milestone:** Project is on GitHub and ready for public access

---

## Success Criteria

Epic 1 is complete when:

- [ ] All 9 stories completed with acceptance criteria met
- [ ] Project can be cloned and `npm install` works
- [ ] `npm run build` produces compiled output
- [ ] `npm test` runs successfully with sample tests passing
- [ ] Local development workflow validated and documented
- [ ] Code follows established patterns and conventions
- [ ] Documentation is accurate and helpful
- [ ] All open-source governance files in place (LICENSE, CoC, CODEOWNERS)
- [ ] README serves multiple audiences effectively
- [ ] GitHub repository configured for community contributions
- [ ] Initial commit pushed to repository
- [ ] Repository is public-ready (or ready for initial contributors)

---

## Deliverables

### Configuration Files
- `package.json` - Project metadata and dependencies
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting rules
- `vitest.config.ts` - Testing configuration
- `.gitignore` - Git ignore patterns

### Source Code
- `src/utils/filesystem.ts` - Filesystem utilities
- `src/utils/shell.ts` - Shell command utilities
- `src/utils/logger.ts` - Logging utilities
- `src/utils/errors.ts` - Custom error classes
- `src/types/index.ts` - Type definitions
- `bin/catalyst` - CLI executable

### Tests
- `tests/unit/utils/*.test.ts` - Utility function tests
- `tests/unit/sample.test.ts` - Sample test (temporary)

### Documentation
- `README.md` - Multi-audience project overview
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community code of conduct
- `SECURITY.md` - Security policy
- `docs/guides/development.md` - Development workflow guide
- `.vscode/launch.json` - VS Code debug configuration

### GitHub Configuration
- `.github/CODEOWNERS` - Code ownership
- `.github/ISSUE_TEMPLATE/*.yml` - Issue templates (bug, feature, question)
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template
- `.github/FUNDING.yml` - Funding options (placeholder)

### BMAD/Memory MCP
- `.catalyst/memory-mcp-config.json` - Memory MCP context configuration
- `.catalyst/bmad-context.json` - BMAD agent context mapping
- `.catalyst/README.md` - Configuration documentation

---

## Technical Notes

### Key Technologies
- **TypeScript 5.3+** - Type-safe development
- **Node.js 20+** - Runtime environment
- **Vitest** - Fast unit testing
- **Commander** - CLI framework (configured, not yet used)
- **ESLint + Prettier** - Code quality and formatting

### Directory Structure Created
```
catalyst/
├── .catalyst/              # BMAD and Memory MCP configs
├── .github/                # GitHub templates and workflows
├── .vscode/                # VS Code configuration
├── bin/                    # CLI executable
├── docs/                   # Documentation (already exists)
├── src/
│   ├── cli/                # CLI commands (placeholder)
│   ├── core/               # Core functionality (placeholder)
│   ├── mcp/                # MCP integration (placeholder)
│   ├── bmad/               # BMAD integration (placeholder)
│   ├── utils/              # Utility modules (implemented)
│   └── types/              # Type definitions (implemented)
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   ├── e2e/                # End-to-end tests
│   ├── fixtures/           # Test data
│   └── helpers/            # Test utilities
├── mcp-servers/            # Custom MCP servers (Epic 3)
├── templates/              # BMAD templates (Epic 4)
├── config/                 # Configuration files
├── scripts/                # Build and automation scripts
└── Formula/                # Homebrew formula (Epic 5)
```

---

## Architecture References

- [Technology Stack](../../architecture/02-technology-stack.md) - Full tech decisions
- [CLI Architecture](../../architecture/03-cli-architecture.md) - CLI structure
- [Testing Architecture](../../architecture/09-testing-architecture.md) - Testing strategy
- [Project Structure](../../architecture/10-project-structure.md) - Directory organization
- [Development Workflow](../../architecture/11-development-workflow.md) - Dev process
- [OSS Community Readiness](../OSS_COMMUNITY_READINESS.md) - OSS setup guide

---

## Dependencies

**Depends On:** None (first epic)

**Enables:**
- **Epic 2:** Core CLI Implementation
- **Epic 3:** MCP Server Framework
- **Epic 4:** BMAD Integration
- **Epic 5:** Build & Release Pipeline
- **Epic 6:** Documentation & Launch

---

## Notes

- **First Epic:** This is the foundational epic - everything else builds on this
- **Estimated Timeline:** ~1 week of focused development (34 hours)
- **Parallel Work:** Stories 1.6 and 1.7 can be worked in parallel after 1.5
- **Story 1.8 Timing:** Completed AFTER Story 1.9 (after initial commit)
- **No Breaking Changes:** Since this is initial setup, no breaking changes possible
- **Test Coverage:** Aim for >80% coverage on utility modules
- **Documentation Quality:** Critical that docs are clear for community adoption
- **OSS Readiness:** Project will be community-ready from first commit

---

## Definition of Done

- [ ] All 9 stories completed and acceptance criteria met
- [ ] Project can be cloned and `npm install` works
- [ ] `npm run build` produces compiled output
- [ ] `npm test` runs successfully (even if minimal tests)
- [ ] Local development workflow validated
- [ ] Code follows established patterns and conventions
- [ ] Documentation is accurate and helpful
- [ ] All open-source governance files in place (LICENSE, CoC, CODEOWNERS)
- [ ] README serves multiple audiences effectively
- [ ] GitHub repository configured for community contributions
- [ ] Initial commit pushed to repository
- [ ] Repository is public-ready (or ready for initial contributors)

---

**Epic Created:** October 26, 2025
**Last Updated:** October 26, 2025
**Ready for Implementation:** ✅ Yes
