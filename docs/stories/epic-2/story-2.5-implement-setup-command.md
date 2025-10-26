# Story 2.5: Implement `catalyst setup` Command

**Epic:** Epic 2 - Core CLI Implementation  
**Story ID:** 2.5  
**Priority:** P0 (Must Have)  
**Status:** Approved  
**Estimated Effort:** 6 hours

---

## User Story

**As a** user,  
**I want** an interactive setup wizard,  
**so that** Catalyst is configured for my environment.

---

## Context

Creates the interactive `catalyst setup` command that guides users through initial configuration, detects their environment, and sets up global Catalyst settings.

**Dependencies:**
- Story 2.1: Main CLI Entry Point
- Story 2.2: Environment Detector
- Story 2.3: Configuration Manager
- Story 2.4: Keychain Integration

**Enables:**
- Users can configure Catalyst for first use
- Story 2.6: catalyst init (references global setup)
- Story 2.7: catalyst verify (validates setup)

---

## Acceptance Criteria

### 1. Setup Command (`src/cli/commands/setup.ts`)
- [ ] Command registered: `catalyst setup`
- [ ] Interactive prompts using Inquirer
- [ ] Progress indicators using Ora spinners
- [ ] Can be re-run to reconfigure

### 2. Environment Detection
- [ ] Runs environment detector
- [ ] Shows detected IDE, extensions, tools
- [ ] Asks user to confirm detection
- [ ] Allows manual override

### 3. Project Type Selection
- [ ] Prompts for primary project types:
  - TypeScript/JavaScript
  - Python
  - Ruby
  - Go
  - Multi-language
- [ ] Saves preference to config

### 4. MCP Server Selection
- [ ] Shows available MCP servers
- [ ] Explains what each server does
- [ ] Prompts which to enable by default
- [ ] Saves selections to config

### 5. LM Studio Configuration
- [ ] Detects if LM Studio installed
- [ ] Prompts for model preferences
- [ ] Offers to install recommended models
- [ ] Links to model guide

### 6. API Keys (Optional)
- [ ] Prompts for API keys (Anthropic, OpenAI, etc.)
- [ ] Explains what each key is used for
- [ ] Stores in Keychain (not config file)
- [ ] Allows skipping

### 7. Configuration Generation
- [ ] Creates `~/.catalyst/` directory
- [ ] Generates `config.yaml` with selections
- [ ] Creates `.catalyst/memory-mcp-config.json`
- [ ] Creates `.catalyst/bmad-context.json`

### 8. Summary and Next Steps
- [ ] Shows configuration summary
- [ ] Displays next steps (run `catalyst init` in project)
- [ ] Links to documentation
- [ ] Success message with checkmarks

### 9. Command Options
- [ ] `--reset` - Reset to defaults
- [ ] `--skip-detection` - Skip environment detection
- [ ] `--non-interactive` - Use defaults (CI/CD)

### 10. Unit/Integration Tests
- [ ] Test interactive flow (mocked prompts)
- [ ] Test config generation
- [ ] Test error handling
- [ ] >80% coverage

---

## Technical Implementation

```typescript
// src/cli/commands/setup.ts
import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import { detectEnvironment } from '@/core/detector';
import { saveGlobalConfig } from '@/core/configurator';
import { store as storeInKeychain } from '@/utils/keychain';
import { logger } from '@/utils';
import { ensureDir, writeJson } from '@/utils/filesystem';
import path from 'path';
import os from 'os';

export const setupCommand = new Command('setup')
  .description('Interactive setup wizard for Catalyst')
  .option('--reset', 'Reset configuration to defaults')
  .option('--skip-detection', 'Skip environment detection')
  .option('--non-interactive', 'Use defaults without prompts (for CI/CD)')
  .action(async (options) => {
    logger.info('🚀 Welcome to Catalyst Setup!');

    // Detect environment
    let env;
    if (!options.skipDetection) {
      const spinner = ora('Detecting environment...').start();
      env = await detectEnvironment();
      spinner.succeed('Environment detected');

      // Show what was detected
      logger.info('\nDetected:');
      if (env.ides.vscode) logger.info(`  ✓ VS Code ${env.ides.vscode.version}`);
      if (env.tools.lmStudio) logger.info(`  ✓ LM Studio`);
      logger.info(`  ✓ Node.js ${env.system.nodeVersion}`);
    }

    // Handle non-interactive mode
    let answers;
    if (options.nonInteractive) {
      answers = {
        projectTypes: ['TypeScript/JavaScript'],
        mcpServers: ['github'],
        enableBMAD: true,
        setupApiKeys: false,
      };
      logger.info('Running in non-interactive mode with defaults');
    } else {
      // Interactive prompts
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'projectTypes',
          message: 'What languages do you primarily work with?',
          choices: [
            'TypeScript/JavaScript',
            'Python',
            'Ruby',
            'Go',
            'Other',
          ],
        },
        {
          type: 'checkbox',
          name: 'mcpServers',
          message: 'Which MCP servers would you like to enable?',
          choices: [
            { name: 'GitHub (repository operations)', value: 'github', checked: true },
            { name: 'Docker (container management)', value: 'docker' },
            { name: 'PostgreSQL (database operations)', value: 'postgres' },
          ],
        },
        {
          type: 'confirm',
          name: 'enableBMAD',
          message: 'Enable BMAD methodology integration?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'setupApiKeys',
          message: 'Would you like to set up API keys now? (optional)',
          default: false,
        },
      ]);
    }

    // API keys (if requested)
    if (answers.setupApiKeys) {
      const apiKeyAnswers = await inquirer.prompt([
        {
          type: 'password',
          name: 'anthropicKey',
          message: 'Anthropic API key (optional):',
        },
      ]);

      if (apiKeyAnswers.anthropicKey) {
        await storeInKeychain('anthropic', 'api-key', apiKeyAnswers.anthropicKey);
        logger.success('API key stored securely in Keychain');
      }
    }

    // Generate config
    const spinner = ora('Generating configuration...').start();

    const catalystDir = path.join(os.homedir(), '.catalyst');
    await ensureDir(catalystDir);

    const config = {
      general: {
        version: '2.0.0',
        project_types: answers.projectTypes,
      },
      mcp_servers: {
        enabled: answers.mcpServers,
        config: {},
      },
      bmad: {
        enabled: answers.enableBMAD,
      },
      preferences: {
        auto_update: true,
        telemetry: false,
      },
    };

    await saveGlobalConfig(config);

    // Create Memory MCP config
    await createMemoryMcpConfig(catalystDir);

    // Create BMAD context
    if (answers.enableBMAD) {
      await createBmadContext(catalystDir);
    }

    spinner.succeed('Configuration saved');

    // Summary
    logger.info('\n✨ Setup complete!');
    logger.info('\nNext steps:');
    logger.info('  1. Navigate to your project directory');
    logger.info('  2. Run: catalyst init');
    logger.info('  3. Check out the docs: https://docs.catalyst.dev');
  });

/**
 * Create Memory MCP server configuration
 */
async function createMemoryMcpConfig(catalystDir: string): Promise<void> {
  const memoryConfig = {
    mcpServers: {
      memory: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-memory"],
        description: "MCP server for persistent memory across sessions",
        env: {
          MEMORY_DIR: path.join(catalystDir, "memory")
        }
      }
    }
  };

  await writeJson(
    path.join(catalystDir, 'memory-mcp-config.json'),
    memoryConfig
  );
}

/**
 * Create BMAD context file
 */
async function createBmadContext(catalystDir: string): Promise<void> {
  const bmadContext = {
    version: "1.0.0",
    created: new Date().toISOString(),
    context: {
      methodology: "BMAD",
      principles: [
        "Business value drives technical decisions",
        "Measurable outcomes for every feature",
        "Agile iterations with continuous feedback",
        "Design before implementation"
      ]
    },
    workspace: {
      docsPath: "docs",
      architecturePath: "docs/architecture",
      prdPath: "docs/prd",
      storiesPath: "docs/stories"
    },
    templates: {
      story: "story-template.md",
      prd: "prd-template.md",
      adr: "adr-template.md"
    }
  };

  await writeJson(
    path.join(catalystDir, 'bmad-context.json'),
    bmadContext
  );
}
```

### Memory MCP Config Structure

```json
// .catalyst/memory-mcp-config.json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "MCP server for persistent memory across sessions",
      "env": {
        "MEMORY_DIR": "~/.catalyst/memory"
      }
    }
  }
}
```

### BMAD Context Structure

```json
// .catalyst/bmad-context.json
{
  "version": "1.0.0",
  "created": "2025-10-26T12:00:00.000Z",
  "context": {
    "methodology": "BMAD",
    "principles": [
      "Business value drives technical decisions",
      "Measurable outcomes for every feature",
      "Agile iterations with continuous feedback",
      "Design before implementation"
    ]
  },
  "workspace": {
    "docsPath": "docs",
    "architecturePath": "docs/architecture",
    "prdPath": "docs/prd",
    "storiesPath": "docs/stories"
  },
  "templates": {
    "story": "story-template.md",
    "prd": "prd-template.md",
    "adr": "adr-template.md"
  }
}
```

---

## Testing Examples

**Test Coverage Requirements:**
- Integration tests for the complete setup flow
- Test interactive mode with mocked prompts
- Test non-interactive mode with defaults
- Test config file generation
- Test error handling for missing permissions
- Aim for >80% code coverage

**Example Integration Test:**

```typescript
// tests/integration/cli/setup.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setupCommand } from '@/cli/commands/setup';
import { readJson, exists, remove } from '@/utils/filesystem';
import inquirer from 'inquirer';
import path from 'path';
import os from 'os';

describe('Setup Command Integration Tests', () => {
  let testCatalystDir: string;
  const originalHome = os.homedir();

  beforeEach(async () => {
    // Create temporary home directory for testing
    testCatalystDir = path.join(os.tmpdir(), `catalyst-test-${Date.now()}`);
    vi.spyOn(os, 'homedir').mockReturnValue(testCatalystDir);
  });

  afterEach(async () => {
    // Cleanup
    if (await exists(testCatalystDir)) {
      await remove(testCatalystDir);
    }
    vi.restoreAllMocks();
  });

  it('should create config files in interactive mode', async () => {
    // Mock inquirer prompts
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectTypes: ['TypeScript/JavaScript', 'Python'],
      mcpServers: ['github', 'docker'],
      enableBMAD: true,
      setupApiKeys: false,
    });

    // Mock environment detection
    const mockEnv = {
      ides: { vscode: { version: '1.85.0' } },
      tools: { lmStudio: true },
      system: { nodeVersion: '20.0.0' },
    };
    vi.mock('@/core/detector', () => ({
      detectEnvironment: vi.fn().mockResolvedValue(mockEnv),
    }));

    // Run setup command
    await setupCommand.parseAsync(['node', 'catalyst', 'setup']);

    // Verify config files were created
    const catalystDir = path.join(testCatalystDir, '.catalyst');
    expect(await exists(catalystDir)).toBe(true);
    expect(await exists(path.join(catalystDir, 'config.yaml'))).toBe(true);
    expect(await exists(path.join(catalystDir, 'memory-mcp-config.json'))).toBe(true);
    expect(await exists(path.join(catalystDir, 'bmad-context.json'))).toBe(true);

    // Verify config content
    const config = await readJson(path.join(catalystDir, 'config.yaml'));
    expect(config.general.project_types).toContain('TypeScript/JavaScript');
    expect(config.general.project_types).toContain('Python');
    expect(config.mcp_servers.enabled).toContain('github');
    expect(config.mcp_servers.enabled).toContain('docker');
    expect(config.bmad.enabled).toBe(true);
  });

  it('should use defaults in non-interactive mode', async () => {
    // Run setup with --non-interactive flag
    await setupCommand.parseAsync(['node', 'catalyst', 'setup', '--non-interactive']);

    // Verify default config was created
    const catalystDir = path.join(testCatalystDir, '.catalyst');
    const config = await readJson(path.join(catalystDir, 'config.yaml'));

    expect(config.general.project_types).toEqual(['TypeScript/JavaScript']);
    expect(config.mcp_servers.enabled).toEqual(['github']);
    expect(config.bmad.enabled).toBe(true);
  });

  it('should create valid memory MCP config', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectTypes: ['TypeScript/JavaScript'],
      mcpServers: ['github'],
      enableBMAD: false,
      setupApiKeys: false,
    });

    await setupCommand.parseAsync(['node', 'catalyst', 'setup']);

    const catalystDir = path.join(testCatalystDir, '.catalyst');
    const memoryConfig = await readJson(
      path.join(catalystDir, 'memory-mcp-config.json')
    );

    expect(memoryConfig.mcpServers.memory).toBeDefined();
    expect(memoryConfig.mcpServers.memory.command).toBe('npx');
    expect(memoryConfig.mcpServers.memory.args).toContain('-y');
    expect(memoryConfig.mcpServers.memory.args).toContain(
      '@modelcontextprotocol/server-memory'
    );
    expect(memoryConfig.mcpServers.memory.env.MEMORY_DIR).toBeDefined();
  });

  it('should create valid BMAD context when enabled', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectTypes: ['TypeScript/JavaScript'],
      mcpServers: ['github'],
      enableBMAD: true,
      setupApiKeys: false,
    });

    await setupCommand.parseAsync(['node', 'catalyst', 'setup']);

    const catalystDir = path.join(testCatalystDir, '.catalyst');
    const bmadContext = await readJson(
      path.join(catalystDir, 'bmad-context.json')
    );

    expect(bmadContext.version).toBe('1.0.0');
    expect(bmadContext.context.methodology).toBe('BMAD');
    expect(bmadContext.context.principles).toHaveLength(4);
    expect(bmadContext.workspace.docsPath).toBe('docs');
    expect(bmadContext.templates.story).toBe('story-template.md');
  });

  it('should skip BMAD context when disabled', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectTypes: ['TypeScript/JavaScript'],
      mcpServers: ['github'],
      enableBMAD: false,
      setupApiKeys: false,
    });

    await setupCommand.parseAsync(['node', 'catalyst', 'setup']);

    const catalystDir = path.join(testCatalystDir, '.catalyst');
    const bmadExists = await exists(
      path.join(catalystDir, 'bmad-context.json')
    );

    expect(bmadExists).toBe(false);
  });

  it('should skip environment detection when flag is set', async () => {
    const detectEnvSpy = vi.fn();
    vi.mock('@/core/detector', () => ({
      detectEnvironment: detectEnvSpy,
    }));

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectTypes: ['TypeScript/JavaScript'],
      mcpServers: ['github'],
      enableBMAD: false,
      setupApiKeys: false,
    });

    await setupCommand.parseAsync([
      'node',
      'catalyst',
      'setup',
      '--skip-detection',
    ]);

    expect(detectEnvSpy).not.toHaveBeenCalled();
  });

  it('should handle API key setup', async () => {
    const mockStore = vi.fn();
    vi.mock('@/utils/keychain', () => ({
      store: mockStore,
    }));

    vi.spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce({
        projectTypes: ['TypeScript/JavaScript'],
        mcpServers: ['github'],
        enableBMAD: false,
        setupApiKeys: true,
      })
      .mockResolvedValueOnce({
        anthropicKey: 'test-api-key-12345',
      });

    await setupCommand.parseAsync(['node', 'catalyst', 'setup']);

    expect(mockStore).toHaveBeenCalledWith(
      'anthropic',
      'api-key',
      'test-api-key-12345'
    );
  });

  it('should handle errors gracefully', async () => {
    // Mock filesystem error
    vi.spyOn(require('@/utils/filesystem'), 'ensureDir').mockRejectedValue(
      new Error('Permission denied')
    );

    await expect(
      setupCommand.parseAsync(['node', 'catalyst', 'setup', '--non-interactive'])
    ).rejects.toThrow('Permission denied');
  });
});
```

---

## Architecture References

- [PRD: User Experience](../../prd/07-user-experience.md) - Setup wizard flow
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Command structure

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Setup command implemented
- [ ] Interactive prompts working
- [ ] Config generation working
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Code committed
- [ ] Story reviewed and accepted

---

**Created:** October 26, 2025
