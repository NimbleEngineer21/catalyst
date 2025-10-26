# Catalyst Architecture Documentation

**Version:** 2.0.0
**Last Updated:** October 26, 2025
**Status:** Complete - Ready for Implementation

---

## Quick Navigation

### For New Developers
Start here to understand Catalyst:
1. [Overview](01-overview.md) - What is Catalyst? High-level architecture
2. [Project Structure](10-project-structure.md) - Directory organization
3. [Development Workflow](11-development-workflow.md) - How to build and test locally

### For Implementation
Pick the area you're working on:
- **CLI Development:** [CLI Architecture](03-cli-architecture.md)
- **MCP Servers:** [MCP Server Architecture](04-mcp-server-architecture.md)
- **Build/Release:** [Build & Release](05-build-and-release.md)
- **Integration:** [Integration Architecture](06-integration-architecture.md)

### For Review
- **Tech Decisions:** [Technology Stack](02-technology-stack.md)
- **Security Review:** [Security Architecture](08-security-architecture.md)
- **Testing Strategy:** [Testing Architecture](09-testing-architecture.md)

---

## Complete Architecture Index

| # | Document | Audience | What's Inside |
|---|----------|----------|---------------|
| 01 | [Overview](01-overview.md) | Everyone | Introduction, goals, high-level system design |
| 02 | [Technology Stack](02-technology-stack.md) | Developers, Architects | Tech choices, versions, rationale |
| 03 | [CLI Architecture](03-cli-architecture.md) | CLI Developers | Command structure, modules, implementation |
| 04 | [MCP Server Architecture](04-mcp-server-architecture.md) | MCP Developers | Server design, tool patterns, protocols |
| 05 | [Build & Release](05-build-and-release.md) | DevOps, Release Mgmt | GitHub Actions, scripts, versioning |
| 06 | [Integration Architecture](06-integration-architecture.md) | All Developers | BMAD, LM Studio, IDE integration |
| 07 | [Data Architecture](07-data-architecture.md) | Developers | File layouts, configs, schemas |
| 08 | [Security Architecture](08-security-architecture.md) | Security, Developers | Keychain, sandboxing, secrets management |
| 09 | [Testing Architecture](09-testing-architecture.md) | QA, Developers | Test strategy, frameworks, coverage goals |
| 10 | [Project Structure](10-project-structure.md) | All Developers | Complete source tree, organization |
| 11 | [Development Workflow](11-development-workflow.md) | Developers | Setup, commands, local testing |
| 12 | [Deployment Architecture](12-deployment-architecture.md) | DevOps | Homebrew distribution, releases |
| 13 | [Design Decisions](13-design-decisions.md) | Architects, Leads | Rationale, trade-offs, future plans |

---

## Architecture Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                 Tier 1: Distribution Layer                   │
│                      (Homebrew)                              │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              Tier 2: Global Configuration                    │
│                                                             │
│  Catalyst CLI (TypeScript/Node.js)                         │
│  MCP Servers (TypeScript/Node.js)                          │
│  BMAD Framework                                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│           Tier 3: Per-Project Configuration                 │
│              (.catalyst/, .bmad-core/)                      │
└─────────────────────────────────────────────────────────────┘
```

See [Overview](01-overview.md) for detailed architecture diagrams.

---

## Reading Guides by Role

### Backend/CLI Developer
1. [Overview](01-overview.md) - Understand the system
2. [Technology Stack](02-technology-stack.md) - Know the tools
3. [CLI Architecture](03-cli-architecture.md) - **Primary focus**
4. [Data Architecture](07-data-architecture.md) - File layouts
5. [Security Architecture](08-security-architecture.md) - Keychain, secrets
6. [Development Workflow](11-development-workflow.md) - Get started

### MCP Server Developer
1. [Overview](01-overview.md) - Understand the system
2. [Technology Stack](02-technology-stack.md) - Know the tools
3. [MCP Server Architecture](04-mcp-server-architecture.md) - **Primary focus**
4. [Security Architecture](08-security-architecture.md) - Sandboxing
5. [Testing Architecture](09-testing-architecture.md) - Test your servers
6. [Development Workflow](11-development-workflow.md) - Get started

### DevOps/Release Engineer
1. [Overview](01-overview.md) - Understand the system
2. [Build & Release](05-build-and-release.md) - **Primary focus**
3. [Deployment Architecture](12-deployment-architecture.md) - **Primary focus**
4. [Project Structure](10-project-structure.md) - What gets built
5. [Testing Architecture](09-testing-architecture.md) - CI/CD testing

### QA/Test Engineer
1. [Overview](01-overview.md) - Understand what to test
2. [Testing Architecture](09-testing-architecture.md) - **Primary focus**
3. [CLI Architecture](03-cli-architecture.md) - What commands exist
4. [MCP Server Architecture](04-mcp-server-architecture.md) - What tools exist
5. [Development Workflow](11-development-workflow.md) - Run tests locally

### Technical Lead/Architect
1. [Overview](01-overview.md) - High-level design
2. [Technology Stack](02-technology-stack.md) - Tech decisions
3. [Design Decisions](13-design-decisions.md) - **Rationale**
4. [Integration Architecture](06-integration-architecture.md) - How it all fits
5. All other sections - Skim for completeness

### Security Reviewer
1. [Security Architecture](08-security-architecture.md) - **Primary focus**
2. [Data Architecture](07-data-architecture.md) - What data exists where
3. [CLI Architecture](03-cli-architecture.md) - Command security
4. [MCP Server Architecture](04-mcp-server-architecture.md) - Server sandboxing

---

## Key Architectural Principles

1. **Single Runtime** - TypeScript/Node.js for CLI and MCP servers
2. **Type Safety** - TypeScript throughout for reliability
3. **Simple Distribution** - Homebrew-native packaging
4. **Extensibility** - Easy to add new MCP servers
5. **Developer Experience** - Simple setup, clear commands
6. **Privacy-First** - Local AI, optional cloud APIs
7. **Security in Depth** - Keychain, sandboxing, validation

See [Design Decisions](13-design-decisions.md) for complete rationale.

---

## Technology Stack Summary

| Component | Technology | Version |
|-----------|-----------|---------|
| **CLI** | TypeScript/Node.js | 20+ |
| **MCP Servers** | TypeScript/Node.js | 20+ |
| **Distribution** | Homebrew | - |
| **AI Models** | MLX-optimized (Qwen, DeepSeek) | Latest |
| **Testing** | Vitest | 1.x |
| **Build** | tsc + esbuild | Latest |

See [Technology Stack](02-technology-stack.md) for complete details.

---

## Cross-Cutting Concerns

### Model Management
- **Where:** [Integration Architecture](06-integration-architecture.md#lm-studio-integration)
- **What:** LM Studio model detection, recommendations, installation
- **Models:** Qwen 2.5 Coder 7B, DeepSeek-R1 32B, etc.

### MCP Server Publishing
- **Where:** [Integration Architecture](06-integration-architecture.md#mcp-server-publishing)
- **What:** Publishing to LM Studio, npm packages, deeplinks
- **Process:** Automated via GitHub Actions

### Environment Configuration
- **Where:** [Data Architecture](07-data-architecture.md#configuration-schema)
- **What:** Global config, project config, environment variables
- **Security:** [Security Architecture](08-security-architecture.md#environment-variable-handling)

### Error Handling
- **Where:** [CLI Architecture](03-cli-architecture.md#cli-error-handling)
- **What:** Error classes, user-friendly messages, recovery

---

## Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Architecture Documentation | ✅ Complete | This document |
| CLI Scaffolding | 🔄 Next | Implement src/index.ts |
| MCP Servers | 🔄 Next | Implement 5 custom servers |
| Build Scripts | ✅ Complete | scripts/ directory |
| GitHub Actions | 📋 Planned | .github/workflows/ |
| Tests | 📋 Planned | tests/ directory |

---

## Related Documentation

- **[Project Brief](../project_brief.md)** - High-level vision
- **[PRD](../prd/prd.md)** - Product requirements
- **[LM Studio Models](../LM_STUDIO_MODELS.md)** - Model recommendations
- **[LM Studio MCP Publishing](../LM_STUDIO_MCP_PUBLISHING.md)** - MCP distribution
- **[Documentation Index](../DOCUMENTATION_INDEX.md)** - All docs

---

## Contributing to Architecture

When updating architecture:

1. **Update the relevant shard** (01-13)
2. **Add cross-references** to related sections
3. **Update this README** if adding new sections
4. **Keep design decisions** in [Design Decisions](13-design-decisions.md)
5. **Update diagrams** using Mermaid format

---

**This architecture was created using the BMAD methodology with the Architect agent.**

**Questions?** See [DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md) or open a GitHub Discussion.
