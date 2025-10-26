# .catalyst/ Directory

**Purpose:** Configuration files for AI agents and tooling supporting Catalyst development

---

## Overview

This directory contains configuration files that enable AI-powered development tools to understand and work with the Catalyst project effectively. These files are **essential for BMAD methodology** and **Memory MCP integration**.

---

## Configuration Files

### memory-mcp-config.json

**Purpose:** Configures the Memory MCP server to provide relevant context to AI agents

**What it does:**
- Defines which documentation directories to load (prd/, architecture/, stories/, guides/)
- Sets priority and loading strategies for different contexts
- Maps agent profiles (PO, Architect, Developer, QA, Analyst) to their primary contexts
- Enables knowledge graph relationships between documents
- Configures semantic search and caching

**Used by:**
- Memory MCP server
- AI agents needing project context
- Continue.dev integration
- Claude Code integration

**When to update:**
- When adding new documentation directories
- When restructuring project documentation
- When adding new BMAD agent roles
- After major project phase changes

---

### bmad-context.json

**Purpose:** Configures BMAD agent context awareness for the Catalyst project

**What it does:**
- Maps all project documentation files to agent roles
- Defines agent responsibilities and working files
- Specifies workflow integration for story implementation, architecture decisions, epic planning
- Tracks project status and readiness
- Documents planned codebase structure

**Used by:**
- BMAD agents (Sarah, Mike, Alex, Mary, Quinn, Diana, Taylor)
- Workflow orchestration tools
- Project status dashboards
- Agent context loading

**When to update:**
- After completing an epic or major milestone
- When adding new agents or roles
- When documentation structure changes
- After project phase transitions (planning → implementation → testing → release)

---

## Agent Context Mapping

### Quick Reference

| Agent | Role | Primary Context | Working Files |
|-------|------|----------------|---------------|
| **Sarah (PO)** | Product Owner | PRD, Stories | docs/stories/, docs/prd/ |
| **Mike (Architect)** | Architect | Architecture, PRD | docs/architecture/ |
| **Alex (Developer)** | Developer | Stories, Architecture | src/, tests/, docs/stories/ |
| **Mary (Analyst)** | Analyst | PRD, Architecture | docs/prd/, docs/architecture/ |
| **Quinn (QA)** | QA Engineer | Stories, Architecture | tests/, docs/stories/ |
| **Diana (DevOps)** | DevOps | Architecture | scripts/, .github/workflows/ |
| **Taylor (Writer)** | Tech Writer | Guides, PRD | docs/guides/, README.md |

---

## Current Project Status

**Phase:** Planning Complete (Pre-Implementation)

**Completed:**
- ✅ PRD Complete (8 documents)
- ✅ Architecture Complete (13 documents)
- ✅ Epic/Story Planning Complete (6 epics, 47 stories)
- ✅ OSS Foundation Planned (AGPL-3.0, governance)
- ✅ Documentation Structure Organized

**Next Step:** Epic 1, Story 1.1 - Initialize TypeScript Project Structure

**Readiness Score:** 91%

**Critical Blockers:** 0

---

## Integration with Tools

### Memory MCP Server

```bash
# Memory MCP will read memory-mcp-config.json to load project context
# Configured in ~/.lmstudio/mcp.json or Continue.dev config

{
  "mcpServers": {
    "catalyst-memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_CONFIG": "/Users/dev/Projects/catalyst/.catalyst/memory-mcp-config.json"
      }
    }
  }
}
```

### BMAD Method

```bash
# BMAD agents will read bmad-context.json for project awareness
# Configured via BMAD CLI or in project settings

catalyst bmad --config .catalyst/bmad-context.json
```

### Continue.dev

```json
// .continuerc.json
{
  "contextProviders": [
    {
      "name": "catalyst-memory",
      "params": {
        "configPath": ".catalyst/memory-mcp-config.json"
      }
    }
  ]
}
```

---

## Maintenance

### After Completing Epic 1

Update `bmad-context.json`:
```json
{
  "projectStatus": {
    "currentPhase": "epic-1-complete",
    "nextMilestone": "Epic 2, Story 2.1 - Implement CLI Entry Point"
  },
  "codebaseStructure": {
    "status": "initialized",
    "existingDirectories": {
      "src/": "Source code initialized",
      "tests/": "Test infrastructure ready",
      "bin/": "CLI entry point created"
    }
  }
}
```

Update `memory-mcp-config.json`:
```json
{
  "contextPaths": {
    "source": {
      "path": "src",
      "description": "TypeScript source code",
      "include": ["**/*.ts"],
      "priority": "high",
      "loadStrategy": "lazy"
    }
  }
}
```

### After Major Documentation Changes

1. Review `memory-mcp-config.json` → Ensure all new docs are in `contextPaths`
2. Review `bmad-context.json` → Update `contextFiles` with new file paths
3. Test with Memory MCP → Verify agents can access new contexts

---

## File Versioning

Both configuration files follow semantic versioning:
- **Major version:** Breaking changes to schema or structure
- **Minor version:** New features or contexts added
- **Patch version:** Bug fixes or documentation updates

Current versions:
- `memory-mcp-config.json`: 1.0.0
- `bmad-context.json`: 1.0.0

---

## Related Documentation

- [BMAD Method Documentation](https://bmad-method.dev)
- [Memory MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Catalyst Documentation Index](../docs/DOCUMENTATION_INDEX.md)

---

**Last Updated:** October 26, 2025
**Maintained By:** Catalyst Team
