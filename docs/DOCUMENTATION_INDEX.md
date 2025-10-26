# Catalyst Documentation Index

**Last Updated:** October 26, 2025
**Project Status:** Planning Phase (Pre-Implementation)
**Current Phase:** PRD Complete → Architecture Complete → Epic/Story Planning Complete → Ready for Story 1.1

---

## Quick Navigation

### For Users

- **[README.md](../README.md)** - Start here! Quick start guide and overview
- **[Project Brief](project_brief.md)** - High-level vision, what Catalyst does
- **[Installation Guide](#installation)** - Coming soon

### For Developers

- **[Architecture Documentation](architecture/README.md)** - Complete technical architecture (13 documents)
- **[PRD (Product Requirements)](prd/prd.md)** - Detailed product requirements (8 documents)
- **[Epic & Story Catalog](stories/README.md)** - Implementation plan (6 epics, 47 stories)
- **[Contributing Guide](#contributing)** - Coming in Story 1.5

### For Product/Business

- **[PRD: Vision & Goals](prd/01-vision-and-goals.md)** - Strategic objectives
- **[PRD: Users & Use Cases](prd/02-users-and-use-cases.md)** - Target audience
- **[PRD: Technical Architecture](prd/04-technical-architecture.md)** - Technology decisions

---

## Documentation Structure

```
docs/
├── DOCUMENTATION_INDEX.md          # This file
├── README.md (root)                # Quick start guide
├── project_brief.md                # High-level vision
│
├── architecture/                   # Technical Architecture (Sharded)
│   ├── README.md                   # Architecture index
│   ├── 01-overview.md              # High-level system design
│   ├── 02-technology-stack.md      # Tech stack and rationale
│   ├── 03-cli-architecture.md      # CLI design patterns
│   ├── 04-mcp-server-architecture.md
│   ├── 05-build-and-release.md
│   ├── 06-integration-architecture.md
│   ├── 07-data-architecture.md
│   ├── 08-security-architecture.md
│   ├── 09-testing-architecture.md
│   ├── 10-project-structure.md
│   ├── 11-development-workflow.md
│   ├── 12-deployment-architecture.md
│   └── 13-design-decisions.md
│
├── prd/                            # Product Requirements (Sharded)
│   ├── prd.md                      # Main PRD overview
│   ├── 01-vision-and-goals.md
│   ├── 02-users-and-use-cases.md
│   ├── 03-features-and-requirements.md
│   ├── 04-technical-architecture.md
│   ├── 05-mcp-servers.md
│   ├── 06-bmad-integration.md
│   ├── 07-user-experience.md
│   └── 08-metrics-and-launch.md
│
├── stories/                        # Epic and Story Definitions
│   ├── README.md                   # Story index (6 epics, 47 stories)
│   ├── IMPLEMENTATION_SEQUENCE.md  # Dependency graph and execution order
│   ├── OSS_COMMUNITY_READINESS.md  # OSS preparation guide
│   ├── epic-1-project-scaffolding.md
│   ├── epic-2-core-cli-implementation.md
│   ├── epic-3-mcp-server-framework.md
│   ├── epic-4-bmad-integration.md
│   ├── epic-5-build-release-pipeline.md
│   ├── epic-6-documentation-launch.md
│   └── templates/
│       └── README-template-example.md  # Template for Story 1.7
│
└── guides/                         # User & Operational Guides
    ├── README.md                   # Guide index
    ├── lm-studio-models.md         # Model recommendations for Apple Silicon
    ├── lm-studio-mcp-publishing.md # MCP server distribution guide
    ├── development.md              # [Story 1.5] Local dev setup
    ├── user-guide.md               # [Story 6.1] End user guide
    ├── api-reference.md            # [Story 6.3] CLI command reference
    └── troubleshooting.md          # [Story 6.6] Common issues
```

---

## Document Summaries

### Core Documents

#### [README.md](../README.md)
- **Audience:** Everyone
- **Purpose:** First introduction to Catalyst
- **Contents:**
  - What is Catalyst?
  - Quick start installation
  - Key features
  - Basic commands
  - Getting help

#### [Project Brief](project_brief.md)
- **Audience:** All stakeholders
- **Purpose:** High-level vision and architecture overview
- **Contents:**
  - Executive summary
  - System architecture
  - Distribution model (Homebrew)
  - MCP servers overview
  - BMAD integration
  - Repository structure
  - Build pipeline
  - Installation workflows

#### [Architecture Documentation](architecture/) (Sharded)
- **Audience:** Developers, architects, all technical roles
- **Purpose:** Complete technical specification organized by topic
- **Navigation:** [Architecture Index](architecture/README.md)
- **13 Focused Documents:**
  1. [Overview](architecture/01-overview.md) - High-level system design
  2. [Technology Stack](architecture/02-technology-stack.md) - Tech decisions and rationale
  3. [CLI Architecture](architecture/03-cli-architecture.md) - Command-line tool design
  4. [MCP Server Architecture](architecture/04-mcp-server-architecture.md) - Server patterns and tools
  5. [Build & Release](architecture/05-build-and-release.md) - GitHub Actions, scripts, versioning
  6. [Integration Architecture](architecture/06-integration-architecture.md) - BMAD, LM Studio, IDE
  7. [Data Architecture](architecture/07-data-architecture.md) - File layouts, configs, schemas
  8. [Security Architecture](architecture/08-security-architecture.md) - Keychain, sandboxing, secrets
  9. [Testing Architecture](architecture/09-testing-architecture.md) - Test strategy and frameworks
  10. [Project Structure](architecture/10-project-structure.md) - Directory organization
  11. [Development Workflow](architecture/11-development-workflow.md) - Setup and local testing
  12. [Deployment Architecture](architecture/12-deployment-architecture.md) - Homebrew distribution
  13. [Design Decisions](architecture/13-design-decisions.md) - Rationale and trade-offs

### Guides & Operational Documentation

#### [Guides Index](guides/README.md)
- **Audience:** All users
- **Purpose:** Navigation hub for user and operational guides
- **Contents:**
  - Guide organization by audience
  - Links to all available guides
  - Documentation standards

#### [LM Studio Model Recommendations](guides/lm-studio-models.md)
- **Audience:** Users, developers
- **Purpose:** Guide to optimal models for Apple Silicon
- **Contents:**
  - Recommended models by hardware (M1/M2/M3/M4)
  - Qwen 2.5 Coder, DeepSeek-R1, Codestral benchmarks
  - MLX optimization benefits
  - Quantization guide (4-bit recommended)
  - Installation instructions
  - Performance benchmarks
  - Model configuration settings
  - Automatic model detection/installation

#### [LM Studio MCP Publishing Guide](guides/lm-studio-mcp-publishing.md)
- **Audience:** Developers, contributors
- **Purpose:** How to publish and distribute Catalyst MCP servers
- **Contents:**
  - Custom MCP server overview
  - LM Studio mcp.json format
  - Distribution methods (Homebrew, npm, deeplinks)
  - Release process integration
  - GitHub Actions workflow for publishing
  - One-click installation via deeplinks
  - Security considerations
  - Testing and troubleshooting

### Epic & Story Documentation

#### [Stories Index](stories/README.md)
- **Audience:** Development team, PO
- **Purpose:** Complete epic and story catalog
- **Contents:**
  - 6 epics with 47 total stories
  - Story status tracking
  - Epic dependencies and relationships
  - Implementation progress

#### [Implementation Sequence](stories/IMPLEMENTATION_SEQUENCE.md)
- **Audience:** Development team, PM
- **Purpose:** Story execution order and dependencies
- **Contents:**
  - Complete dependency graph
  - Critical path identification
  - Parallel work opportunities
  - Epic-level dependencies

#### [OSS Community Readiness](stories/OSS_COMMUNITY_READINESS.md)
- **Audience:** Project maintainers
- **Purpose:** Open-source preparation guide
- **Contents:**
  - OSS infrastructure requirements (LICENSE, CoC, CODEOWNERS)
  - Multi-audience README approach
  - GitHub configuration for community
  - Community workflow and governance
  - Launch checklist and success metrics

### Product Requirements Documents (PRD)

#### [PRD Main](prd/prd.md)
- **Audience:** Product, development, QA teams
- **Purpose:** Central navigation for all requirements
- **Contents:**
  - Document organization
  - Executive summary
  - Success metrics
  - Product scope
  - Dependencies and constraints

#### [Vision & Goals](prd/01-vision-and-goals.md)
- **Focus:** Strategic direction
- **Key Topics:**
  - Product vision statement
  - Mission and core values
  - Strategic objectives (Year 1-2)
  - Success criteria
  - Market opportunity
  - Competitive positioning
  - Differentiation strategy

#### [Users & Use Cases](prd/02-users-and-use-cases.md)
- **Focus:** Who uses Catalyst and why
- **Key Topics:**
  - User personas
  - Use cases and scenarios
  - User journeys
  - Pain points addressed

#### [Features & Requirements](prd/03-features-and-requirements.md)
- **Focus:** What Catalyst does
- **Key Topics:**
  - Core features
  - Functional requirements
  - Non-functional requirements
  - Feature prioritization

#### [Technical Architecture](prd/04-technical-architecture.md)
- **Focus:** How Catalyst is built
- **Key Topics:**
  - System architecture
  - Technology stack
  - Component design
  - Data architecture
  - Build & release pipeline
  - Security architecture
  - Testing strategy

#### [MCP Servers](prd/05-mcp-servers.md)
- **Focus:** MCP server integrations
- **Key Topics:**
  - Essential servers (Tier 1)
  - Optional servers (Tier 2)
  - Specialized servers (Tier 3)
  - Custom implementations
  - Integration patterns

#### [BMAD Integration](prd/06-bmad-integration.md)
- **Focus:** Development methodology
- **Key Topics:**
  - BMAD framework overview
  - Agent roles and responsibilities
  - Task templates
  - Workflow integration
  - Installation and updates

#### [User Experience](prd/07-user-experience.md)
- **Focus:** How users interact with Catalyst
- **Key Topics:**
  - Setup wizard flow
  - CLI command design
  - IDE integration UX
  - Error handling
  - Help and documentation

#### [Metrics & Launch](prd/08-metrics-and-launch.md)
- **Focus:** Success measurement and go-to-market
- **Key Topics:**
  - Success metrics
  - KPIs and tracking
  - Launch plan
  - Rollout strategy
  - Post-launch monitoring

---

## Configuration Files

### Root Level

| File | Purpose |
|------|---------|
| `package.json` | Node.js project configuration, dependencies, scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `.gitignore` | Git ignore patterns (BMAD, build artifacts, etc.) |
| `Formula/catalyst.rb` | Homebrew formula for distribution |

### Scripts

| File | Purpose |
|------|---------|
| `scripts/build.sh` | Main build script - creates tarball |
| `scripts/build-mcp-servers.sh` | Builds all custom MCP servers |
| `scripts/install-bmad.sh` | Installs BMAD via npx |

---

## Key Decisions & Rationale

### Technology Stack: TypeScript/Node.js (Not Ruby)

**Decision:** Use TypeScript/Node.js for CLI instead of Ruby

**Rationale:**
1. Single runtime (MCP servers already require Node.js)
2. Type safety throughout codebase
3. Code sharing between CLI and MCP servers
4. Better alignment with target developer audience
5. Stronger ecosystem for CLI tools

**Impact:**
- Simplified distribution (no Ruby dependency)
- Faster development (one language, shared types)
- Easier for contributors (more TypeScript devs than Ruby devs)

### Distribution: Homebrew (Not npm)

**Decision:** Use Homebrew as primary distribution method

**Rationale:**
1. Standard for macOS developer tools
2. Built-in version management
3. Dependency resolution (auto-installs Node.js)
4. Clean installation and uninstallation
5. Better discoverability

**Impact:**
- Users get familiar `brew install catalyst` experience
- Automatic updates via `brew upgrade`
- Professional distribution model
- Native macOS integration

### BMAD: Bundled (Not Separate Installation)

**Decision:** Bundle BMAD in Catalyst distribution

**Rationale:**
1. Version control - BMAD version tied to Catalyst version
2. Offline installation after initial download
3. Consistency across all installations
4. Simplified user experience

**Impact:**
- Larger distribution size (~10MB)
- Guaranteed compatibility
- Easier updates (tied to Catalyst releases)

---

## Documentation Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| README.md | ✅ Complete | Oct 26, 2025 |
| project_brief.md | ✅ Complete | Oct 26, 2025 |
| architecture.md | ✅ Complete | Oct 26, 2025 |
| prd/prd.md | ✅ Complete | Oct 26, 2025 |
| prd/01-vision-and-goals.md | ✅ Complete | Oct 26, 2025 |
| prd/02-users-and-use-cases.md | ✅ Complete | Oct 26, 2025 |
| prd/03-features-and-requirements.md | ✅ Complete | Oct 26, 2025 |
| prd/04-technical-architecture.md | ✅ Complete | Oct 26, 2025 |
| prd/05-mcp-servers.md | ✅ Complete | Oct 26, 2025 |
| prd/06-bmad-integration.md | ✅ Complete | Oct 26, 2025 |
| prd/07-user-experience.md | ✅ Complete | Oct 26, 2025 |
| prd/08-metrics-and-launch.md | ✅ Complete | Oct 26, 2025 |
| package.json | ✅ Complete | Oct 26, 2025 |
| tsconfig.json | ✅ Complete | Oct 26, 2025 |
| Formula/catalyst.rb | ✅ Complete | Oct 26, 2025 |
| scripts/build.sh | ✅ Complete | Oct 26, 2025 |
| scripts/build-mcp-servers.sh | ✅ Complete | Oct 26, 2025 |
| scripts/install-bmad.sh | ✅ Complete | Oct 26, 2025 |
| .gitignore | ✅ Complete | Oct 26, 2025 |
| guides/README.md | ✅ Complete | Oct 26, 2025 |
| guides/lm-studio-models.md | ✅ Complete | Oct 26, 2025 |
| guides/lm-studio-mcp-publishing.md | ✅ Complete | Oct 26, 2025 |
| guides/development.md | ⏳ Story 1.5 | - |
| guides/user-guide.md | ⏳ Story 6.1 | - |
| guides/api-reference.md | ⏳ Story 6.3 | - |
| guides/troubleshooting.md | ⏳ Story 6.6 | - |
| stories/README.md | ✅ Complete | Oct 26, 2025 |
| stories/IMPLEMENTATION_SEQUENCE.md | ✅ Complete | Oct 26, 2025 |
| stories/OSS_COMMUNITY_READINESS.md | ✅ Complete | Oct 26, 2025 |
| stories/epic-*.md (6 epics) | ✅ Complete | Oct 26, 2025 |
| architecture/README.md | ✅ Complete | Oct 26, 2025 |
| architecture/*.md (13 docs) | ✅ Complete | Oct 26, 2025 |

---

## Current Status & Next Steps

### Planning Complete ✅

- ✅ **PRD Complete** - 8 comprehensive documents defining product vision, requirements, and scope
- ✅ **Architecture Complete** - 13 documents covering all technical aspects
- ✅ **Epic/Story Planning Complete** - 6 epics, 47 stories with acceptance criteria
- ✅ **OSS Community Foundation Planned** - LICENSE (AGPL-3.0), governance files, README structure
- ✅ **Documentation Structure Organized** - architecture/, prd/, stories/, guides/

### Ready to Begin Implementation 🚀

**Next Story:** Epic 1, Story 1.1 - Initialize TypeScript Project Structure

**When ready to start development:**

1. **Make Initial Commit**
   ```bash
   git add .
   git commit -m "Initial commit: Complete planning phase

   - PRD complete (8 documents)
   - Architecture complete (13 documents)
   - Epic/story planning complete (6 epics, 47 stories)
   - OSS foundation planned (AGPL-3.0 license)
   - Documentation structure organized

   Ready to begin Story 1.1: Initialize TypeScript Project Structure"
   ```

2. **Begin Story 1.1: Initialize TypeScript Project Structure**
   - Create src/ directory structure
   - Set up TypeScript configuration
   - Initialize package.json with dependencies
   - Configure ESLint and Prettier
   - Create .gitignore
   - Create initial README.md (using template from stories/templates/)

3. **Continue Through Epic 1**
   - Follow [Implementation Sequence](stories/IMPLEMENTATION_SEQUENCE.md)
   - Complete each story's acceptance criteria
   - Create commits for each completed story
   - Test as you build

### For Documentation

1. **User Guides**
   - Installation guide with screenshots
   - Configuration guide
   - Troubleshooting guide
   - FAQ

2. **Developer Guides**
   - Development setup
   - Contributing guidelines
   - MCP server development tutorial
   - Testing guide

3. **API Documentation**
   - CLI command reference
   - Configuration file reference
   - MCP server API specifications

---

## Getting Help

- **Questions:** Open a [GitHub Discussion](https://github.com/your-org/catalyst/discussions)
- **Issues:** Report bugs via [GitHub Issues](https://github.com/your-org/catalyst/issues)
- **Documentation:** Start with [README.md](../README.md)
- **Architecture:** See [architecture.md](architecture.md)
- **Requirements:** See [PRD](prd/prd.md)

---

**This documentation was created using the BMAD methodology with the Architect agent.**
