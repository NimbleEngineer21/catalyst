# Project Structure

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## Complete Source Tree

```
catalyst/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Continuous integration
│       ├── release.yml            # Release automation
│       └── test.yml               # Test workflow
│
├── src/                           # TypeScript source
│   ├── index.ts                   # Main entry point
│   ├── cli/
│   │   ├── commands/
│   │   │   ├── setup.ts
│   │   │   ├── init.ts
│   │   │   ├── verify.ts
│   │   │   ├── update.ts
│   │   │   ├── doctor.ts
│   │   │   ├── mcp.ts
│   │   │   └── config.ts
│   │   └── index.ts
│   ├── core/
│   │   ├── installer.ts
│   │   ├── configurator.ts
│   │   ├── detector.ts
│   │   ├── updater.ts
│   │   └── verifier.ts
│   ├── mcp/
│   │   ├── manager.ts
│   │   ├── registry.ts
│   │   ├── installer.ts
│   │   └── tester.ts
│   ├── bmad/
│   │   ├── installer.ts
│   │   ├── linker.ts
│   │   └── updater.ts
│   ├── utils/
│   │   ├── filesystem.ts
│   │   ├── network.ts
│   │   ├── shell.ts
│   │   ├── logger.ts
│   │   ├── keychain.ts
│   │   └── errors.ts
│   └── types/
│       ├── config.ts
│       ├── mcp.ts
│       └── index.ts
│
├── mcp-servers/                   # Custom MCP server implementations
│   ├── docker/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── postgres/
│   ├── xcode/
│   ├── storybook/
│   └── vite/
│
├── bin/
│   └── catalyst                   # CLI executable (#!/usr/bin/env node)
│
├── templates/                     # Configuration templates
│   ├── continue/
│   │   └── config.template.json
│   ├── project/
│   │   ├── .catalyst/
│   │   │   └── config.template.yaml
│   │   └── .env.example
│   └── README.md
│
├── config/                        # Catalyst configuration
│   ├── mcp-defaults.yaml          # Default MCP server list
│   └── ide-paths.yaml             # IDE detection paths
│
├── scripts/                       # Build and utility scripts
│   ├── build.sh
│   ├── build-mcp-servers.sh
│   ├── install-bmad.sh
│   └── test-install.sh
│
├── tests/                         # Test suite
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                          # Documentation
│   ├── project_brief.md
│   ├── prd/
│   │   └── *.md
│   ├── architecture.md            # This file
│   └── guides/
│       ├── development.md
│       └── contributing.md
│
├── Formula/
│   └── catalyst.rb                # Homebrew formula
│
├── dist/                          # Compiled output (gitignored)
├── build/                         # Build artifacts (gitignored)
├── node_modules/                  # Dependencies (gitignored)
│
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── package.json
├── package-lock.json
├── tsconfig.json
├── vitest.config.ts
├── LICENSE
├── README.md
└── CHANGELOG.md
```

---

## Related Sections

- [CLI Architecture](03-cli-architecture.md) - Source code organization for CLI
- [MCP Server Architecture](04-mcp-server-architecture.md) - MCP server directory structure
- [Development Workflow](11-development-workflow.md) - Working with the project structure
