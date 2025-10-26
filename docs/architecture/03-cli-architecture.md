# CLI Architecture

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## CLI Component Structure

```
src/
├── index.ts                   # Main entry point with commander setup
├── cli/
│   ├── commands/              # Command implementations
│   │   ├── setup.ts          # catalyst setup
│   │   ├── init.ts           # catalyst init
│   │   ├── verify.ts         # catalyst verify
│   │   ├── update.ts         # catalyst update
│   │   ├── doctor.ts         # catalyst doctor
│   │   ├── mcp.ts            # catalyst mcp <subcommand>
│   │   └── config.ts         # catalyst config <subcommand>
│   └── index.ts              # CLI setup and command registration
│
├── core/                      # Core business logic
│   ├── installer.ts          # Installation orchestration
│   ├── configurator.ts       # Config file generation
│   ├── detector.ts           # IDE/extension detection
│   ├── updater.ts            # Update management
│   └── verifier.ts           # Installation verification
│
├── mcp/                       # MCP server management
│   ├── manager.ts            # Server lifecycle management
│   ├── registry.ts           # Available servers catalog
│   ├── installer.ts          # Server installation logic
│   └── tester.ts             # Server connectivity validation
│
├── bmad/                      # BMAD integration
│   ├── installer.ts          # npx bmad-method wrapper
│   ├── linker.ts             # Symlink management
│   └── updater.ts            # BMAD version management
│
├── utils/                     # Shared utilities
│   ├── filesystem.ts         # File operations
│   ├── network.ts            # HTTP/downloads
│   ├── shell.ts              # Shell command execution
│   ├── logger.ts             # Logging utilities
│   └── keychain.ts           # macOS Keychain integration
│
└── types/                     # TypeScript types
    ├── config.ts             # Configuration schemas
    ├── mcp.ts                # MCP server types
    └── index.ts              # Exported types
```

---

## Key CLI Commands

### 1. `catalyst setup`

**Purpose:** Interactive setup wizard for first-time installation

**Flow:**
```typescript
async function setupCommand() {
  // 1. Detect environment
  const env = await detector.detectEnvironment();

  // 2. Prompt user for preferences
  const config = await promptSetupQuestions(env);

  // 3. Install BMAD
  await bmadInstaller.install(config.bmadOptions);

  // 4. Configure IDE extensions
  await configurator.generateIDEConfig(config);

  // 5. Install MCP servers
  await mcpManager.installServers(config.mcpServers);

  // 6. Verify installation
  await verifier.runChecks();

  // 7. Display next steps
  displayNextSteps();
}
```

**Dependencies:**
- `core/detector.ts` - Environment detection
- `bmad/installer.ts` - BMAD installation
- `core/configurator.ts` - Config generation
- `mcp/installer.ts` - MCP server installation
- `core/verifier.ts` - Verification checks

### 2. `catalyst init`

**Purpose:** Initialize Catalyst in a project directory

**Flow:**
```typescript
async function initCommand(options) {
  // 1. Detect project type (or ask user)
  const projectType = await detectOrAskProjectType();

  // 2. Create .catalyst/ directory
  await fs.ensureDir('.catalyst');

  // 3. Generate project config
  const config = await configurator.generateProjectConfig(projectType);
  await fs.writeFile('.catalyst/config.yaml', config);

  // 4. Create BMAD core-config.yaml
  const bmadConfig = await configurator.generateBMADConfig(projectType);
  await fs.ensureDir('.bmad-core');
  await fs.writeFile('.bmad-core/core-config.yaml', bmadConfig);

  // 5. Create .env.example
  await configurator.createEnvExample(projectType);

  // 6. Display success message
  logger.success('Project initialized!');
  displayProjectCommands();
}
```

### 3. `catalyst verify`

**Purpose:** Verify installation and configuration

**Flow:**
```typescript
async function verifyCommand() {
  const results = [];

  // Check Catalyst installation
  results.push(await verifier.checkCatalystVersion());

  // Check BMAD installation
  results.push(await verifier.checkBMADInstallation());

  // Check MCP servers
  for (const server of config.mcpServers) {
    results.push(await verifier.checkMCPServer(server));
  }

  // Check IDE configuration
  results.push(await verifier.checkIDEConfig());

  // Display results
  displayVerificationResults(results);

  // Exit with appropriate code
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}
```

---

## CLI Error Handling

```typescript
// src/utils/errors.ts
export class CatalystError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = 'CatalystError';
  }
}

// Example usage
try {
  await installer.install();
} catch (error) {
  if (error instanceof CatalystError) {
    logger.error(error.message);
    if (error.recoverable) {
      logger.info('Try running: catalyst doctor');
    }
    process.exit(1);
  }
  throw error;
}
```

---

## Related Sections

- [Technology Stack](02-technology-stack.md) - CLI frameworks and libraries used
- [MCP Server Architecture](04-mcp-server-architecture.md) - MCP integration from CLI
- [Development Workflow](11-development-workflow.md) - Testing CLI commands locally
