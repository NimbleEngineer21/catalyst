# Story 2.6: Implement `catalyst init` Command

**Epic:** Epic 2 - Core CLI Implementation  
**Story ID:** 2.6  
**Priority:** P0 (Must Have)  
**Status:** Approved  
**Estimated Effort:** 5 hours

---

## User Story

**As a** user,  
**I want** to initialize Catalyst in my project directory,  
**so that** I have project-specific configuration.

---

## Context

Creates the `catalyst init` command that initializes Catalyst in a project directory, detecting project type and creating appropriate configuration files and directory structure.

**Dependencies:**
- Story 2.1: Main CLI Entry Point
- Story 2.2: Environment Detector
- Story 2.3: Configuration Manager
- Story 2.5: Setup Command (global config exists)

**Enables:**
- Project-specific Catalyst configuration
- BMAD integration in projects
- MCP server configuration per project

---

## Acceptance Criteria

### 1. Init Command (`src/cli/commands/init.ts`)
- [ ] Command registered: `catalyst init`
- [ ] Detects project type from files
- [ ] Creates `.catalyst/` directory
- [ ] Interactive prompts for project settings
- [ ] Handles existing files gracefully

### 2. Project Type Detection
- [ ] Detects TypeScript/JavaScript (package.json)
- [ ] Detects Python (requirements.txt, pyproject.toml)
- [ ] Detects Ruby (Gemfile)
- [ ] Detects Go (go.mod)
- [ ] Prompts for confirmation/override

### 3. Directory Structure Creation
- [ ] Creates `.catalyst/` directory
- [ ] Creates `.bmad-core/` directory (if BMAD enabled)
- [ ] Creates `docs/` directory structure:
  - `docs/architecture/`
  - `docs/prd/`
  - `docs/stories/`
  - `docs/guides/`
- [ ] Preserves existing directories

### 4. Configuration File Generation
- [ ] Creates `.catalyst/config.yaml` (project config)
- [ ] Creates `.bmad-core/core-config.yaml` (BMAD config)
- [ ] Creates `.catalyst/memory-mcp-config.json`
- [ ] Creates `.catalyst/bmad-context.json`
- [ ] Prompts before overwriting existing files

### 5. Template Files
- [ ] Creates `.env.example` with placeholder values
- [ ] Creates `.gitignore` additions (if not exists)
- [ ] Creates README.md template (if not exists)

### 6. Interactive Prompts
- [ ] Project name (defaults to directory name)
- [ ] Project description
- [ ] Enable BMAD? (defaults to global setting)
- [ ] Which MCP servers to enable?
- [ ] Create documentation structure?

### 7. Git Integration
- [ ] Adds `.catalyst/` entries to `.gitignore`
- [ ] Adds `.bmad/` to `.gitignore`
- [ ] Stages new files (if git repo)

### 8. Summary Output
- [ ] Shows created files
- [ ] Shows next steps
- [ ] Links to relevant documentation

### 9. Command Options
- [ ] `--force` - Overwrite existing files
- [ ] `--template <name>` - Use specific template
- [ ] `--skip-docs` - Don't create docs structure

### 10. Unit/Integration Tests
- [ ] Test project type detection
- [ ] Test directory creation
- [ ] Test config generation
- [ ] Test existing file handling
- [ ] >80% coverage

---

## Technical Implementation

```typescript
// src/cli/commands/init.ts
import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import { ensureDir, writeFile, exists, readFile } from '@/utils/filesystem';
import { saveProjectConfig } from '@/core/configurator';
import { logger } from '@/utils';
import { exec } from '@/utils/shell';
import path from 'path';

export const initCommand = new Command('init')
  .description('Initialize Catalyst in current directory')
  .option('--force', 'Overwrite existing files')
  .option('--skip-docs', 'Skip documentation structure')
  .action(async (options) => {
    logger.info('🎯 Initializing Catalyst in current directory...');

    // Detect project type
    const projectType = await detectProjectType();
    logger.info(`Detected project type: ${projectType}`);

    // Interactive prompts
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: path.basename(process.cwd()),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
      },
      {
        type: 'confirm',
        name: 'enableBMAD',
        message: 'Enable BMAD methodology?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'createDocs',
        message: 'Create documentation structure?',
        default: !options.skipDocs,
      },
    ]);

    // Create directories
    const spinner = ora('Creating directories...').start();
    await ensureDir('.catalyst');
    if (answers.enableBMAD) {
      await ensureDir('.bmad-core');
    }
    if (answers.createDocs) {
      await ensureDir('docs/architecture');
      await ensureDir('docs/prd');
      await ensureDir('docs/stories');
      await ensureDir('docs/guides');
    }
    spinner.succeed('Directories created');

    // Generate config
    const config = {
      general: {
        project_name: answers.projectName,
        project_type: projectType,
        description: answers.description,
      },
      bmad: {
        enabled: answers.enableBMAD,
      },
    };

    await saveProjectConfig(config);

    // Create Memory MCP config
    await createMemoryMcpConfig();

    // Create BMAD context
    if (answers.enableBMAD) {
      await createBmadContext(answers.projectName);
    }

    // Create template files
    await createTemplateFiles(projectType, options.force);

    // Update .gitignore
    await updateGitignore();

    // Stage files if git repo
    await stageFilesIfGitRepo();

    spinner.succeed('Configuration saved');

    // Summary
    logger.success('\n✨ Catalyst initialized!');
    logger.info('\nCreated:');
    logger.info('  ✓ .catalyst/config.yaml');
    logger.info('  ✓ .catalyst/memory-mcp-config.json');
    if (answers.enableBMAD) {
      logger.info('  ✓ .bmad-core/core-config.yaml');
      logger.info('  ✓ .catalyst/bmad-context.json');
    }
    if (answers.createDocs) logger.info('  ✓ docs/ structure');
    logger.info('  ✓ .gitignore updated');
  });

async function detectProjectType(): Promise<string> {
  if (await exists('package.json')) return 'typescript';
  if (await exists('requirements.txt')) return 'python';
  if (await exists('Gemfile')) return 'ruby';
  if (await exists('go.mod')) return 'go';
  return 'unknown';
}

/**
 * Create Memory MCP server configuration for project
 */
async function createMemoryMcpConfig(): Promise<void> {
  const memoryConfig = {
    mcpServers: {
      memory: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-memory"],
        description: "MCP server for persistent memory across sessions",
        env: {
          MEMORY_DIR: ".catalyst/memory"
        }
      }
    }
  };

  await writeFile(
    '.catalyst/memory-mcp-config.json',
    JSON.stringify(memoryConfig, null, 2)
  );
}

/**
 * Create BMAD context file for project
 */
async function createBmadContext(projectName: string): Promise<void> {
  const bmadContext = {
    version: "1.0.0",
    project: projectName,
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

  await writeFile(
    '.catalyst/bmad-context.json',
    JSON.stringify(bmadContext, null, 2)
  );
}

/**
 * Create template files (.env.example, etc.)
 */
async function createTemplateFiles(projectType: string, force: boolean): Promise<void> {
  // Create .env.example if it doesn't exist
  const envExamplePath = '.env.example';
  if (force || !(await exists(envExamplePath))) {
    const envContent = generateEnvExample(projectType);
    await writeFile(envExamplePath, envContent);
  }
}

/**
 * Generate .env.example content based on project type
 */
function generateEnvExample(projectType: string): string {
  const commonVars = `# Catalyst Configuration
CATALYST_ENV=development
LOG_LEVEL=info

# MCP Server Configuration
MCP_ENABLED=true

# BMAD Configuration
BMAD_ENABLED=true
`;

  const typeSpecific: Record<string, string> = {
    typescript: `
# Node.js Configuration
NODE_ENV=development
PORT=3000
`,
    python: `
# Python Configuration
PYTHONPATH=.
FLASK_ENV=development
`,
    ruby: `
# Ruby Configuration
RACK_ENV=development
RAILS_ENV=development
`,
    go: `
# Go Configuration
GO_ENV=development
`,
  };

  return commonVars + (typeSpecific[projectType] || '');
}

/**
 * Update .gitignore with Catalyst-specific entries
 */
async function updateGitignore(): Promise<void> {
  const gitignorePath = '.gitignore';
  const catalystEntries = `
# Catalyst
.catalyst/memory/
.catalyst/*.log
.bmad/
.bmad-core/local/

# Environment
.env
.env.local
`;

  let gitignoreContent = '';
  if (await exists(gitignorePath)) {
    gitignoreContent = await readFile(gitignorePath);
  }

  // Only add if not already present
  if (!gitignoreContent.includes('# Catalyst')) {
    await writeFile(gitignorePath, gitignoreContent + catalystEntries);
  }
}

/**
 * Stage new files if this is a git repository
 */
async function stageFilesIfGitRepo(): Promise<void> {
  try {
    // Check if this is a git repo
    await exec('git', ['rev-parse', '--git-dir']);

    // Stage Catalyst files
    const filesToStage = [
      '.catalyst/config.yaml',
      '.catalyst/memory-mcp-config.json',
      '.catalyst/bmad-context.json',
      '.env.example',
      '.gitignore',
    ];

    for (const file of filesToStage) {
      if (await exists(file)) {
        try {
          await exec('git', ['add', file]);
        } catch {
          // Ignore errors for individual files
        }
      }
    }

    logger.info('Staged new files in git');
  } catch {
    // Not a git repo, skip
  }
}
```

### Template File Examples

**.env.example (TypeScript/JavaScript):**
```bash
# Catalyst Configuration
CATALYST_ENV=development
LOG_LEVEL=info

# MCP Server Configuration
MCP_ENABLED=true

# BMAD Configuration
BMAD_ENABLED=true

# Node.js Configuration
NODE_ENV=development
PORT=3000
```

**.gitignore additions:**
```gitignore
# Catalyst
.catalyst/memory/
.catalyst/*.log
.bmad/
.bmad-core/local/

# Environment
.env
.env.local
```

### Git Integration Example

```typescript
// Git integration helper functions

/**
 * Check if current directory is a git repository
 */
async function isGitRepo(): Promise<boolean> {
  try {
    await exec('git', ['rev-parse', '--git-dir']);
    return true;
  } catch {
    return false;
  }
}

/**
 * Add files to git staging area
 */
async function gitAdd(files: string[]): Promise<void> {
  for (const file of files) {
    if (await exists(file)) {
      await exec('git', ['add', file]);
    }
  }
}

/**
 * Check git status for a file
 */
async function getGitStatus(file: string): Promise<'untracked' | 'modified' | 'staged' | 'committed'> {
  try {
    const { stdout } = await exec('git', ['status', '--porcelain', file]);
    if (stdout.startsWith('??')) return 'untracked';
    if (stdout.startsWith(' M')) return 'modified';
    if (stdout.startsWith('M ')) return 'staged';
    return 'committed';
  } catch {
    return 'untracked';
  }
}
```

---

## Testing Examples

**Test Coverage Requirements:**
- Integration tests for the complete init flow
- Test project type detection
- Test directory and file creation
- Test git integration
- Test template file generation
- Test error handling
- Aim for >80% code coverage

**Example Integration Test:**

```typescript
// tests/integration/cli/init.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initCommand } from '@/cli/commands/init';
import { readFile, readJson, exists, remove, writeFile } from '@/utils/filesystem';
import inquirer from 'inquirer';
import path from 'path';
import os from 'os';

describe('Init Command Integration Tests', () => {
  let testProjectDir: string;

  beforeEach(async () => {
    // Create temporary project directory
    testProjectDir = path.join(os.tmpdir(), `catalyst-init-test-${Date.now()}`);
    await ensureDir(testProjectDir);
    process.chdir(testProjectDir);
  });

  afterEach(async () => {
    // Cleanup
    process.chdir(os.homedir());
    if (await exists(testProjectDir)) {
      await remove(testProjectDir);
    }
    vi.restoreAllMocks();
  });

  it('should detect TypeScript project type', async () => {
    // Create package.json to simulate TypeScript project
    await writeFile(
      path.join(testProjectDir, 'package.json'),
      JSON.stringify({ name: 'test-project' })
    );

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: true,
      createDocs: true,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const config = await readJson('.catalyst/config.yaml');
    expect(config.general.project_type).toBe('typescript');
  });

  it('should create all required directories', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: true,
      createDocs: true,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    // Verify directories were created
    expect(await exists('.catalyst')).toBe(true);
    expect(await exists('.bmad-core')).toBe(true);
    expect(await exists('docs/architecture')).toBe(true);
    expect(await exists('docs/prd')).toBe(true);
    expect(await exists('docs/stories')).toBe(true);
    expect(await exists('docs/guides')).toBe(true);
  });

  it('should skip docs when --skip-docs flag is used', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init', '--skip-docs']);

    expect(await exists('.catalyst')).toBe(true);
    expect(await exists('docs')).toBe(false);
  });

  it('should create memory MCP config', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const memoryConfig = await readJson('.catalyst/memory-mcp-config.json');
    expect(memoryConfig.mcpServers.memory).toBeDefined();
    expect(memoryConfig.mcpServers.memory.command).toBe('npx');
    expect(memoryConfig.mcpServers.memory.env.MEMORY_DIR).toBe('.catalyst/memory');
  });

  it('should create BMAD context when enabled', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'my-awesome-project',
      description: 'A test project',
      enableBMAD: true,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const bmadContext = await readJson('.catalyst/bmad-context.json');
    expect(bmadContext.version).toBe('1.0.0');
    expect(bmadContext.project).toBe('my-awesome-project');
    expect(bmadContext.context.methodology).toBe('BMAD');
    expect(bmadContext.workspace.docsPath).toBe('docs');
  });

  it('should skip BMAD context when disabled', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    expect(await exists('.bmad-core')).toBe(false);
    expect(await exists('.catalyst/bmad-context.json')).toBe(false);
  });

  it('should create .env.example for TypeScript projects', async () => {
    await writeFile(
      path.join(testProjectDir, 'package.json'),
      JSON.stringify({ name: 'test-project' })
    );

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const envContent = await readFile('.env.example');
    expect(envContent).toContain('CATALYST_ENV=development');
    expect(envContent).toContain('NODE_ENV=development');
    expect(envContent).toContain('PORT=3000');
  });

  it('should create .env.example for Python projects', async () => {
    await writeFile(
      path.join(testProjectDir, 'requirements.txt'),
      'flask==0.1.0'
    );

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const envContent = await readFile('.env.example');
    expect(envContent).toContain('CATALYST_ENV=development');
    expect(envContent).toContain('PYTHONPATH=.');
    expect(envContent).toContain('FLASK_ENV=development');
  });

  it('should update .gitignore with Catalyst entries', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: true,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const gitignoreContent = await readFile('.gitignore');
    expect(gitignoreContent).toContain('# Catalyst');
    expect(gitignoreContent).toContain('.catalyst/memory/');
    expect(gitignoreContent).toContain('.bmad/');
    expect(gitignoreContent).toContain('.env');
  });

  it('should not duplicate .gitignore entries', async () => {
    // Create existing .gitignore with Catalyst entries
    const existingGitignore = `# Existing
node_modules/

# Catalyst
.catalyst/memory/
`;
    await writeFile('.gitignore', existingGitignore);

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const gitignoreContent = await readFile('.gitignore');
    const catalystMatches = (gitignoreContent.match(/# Catalyst/g) || []).length;
    expect(catalystMatches).toBe(1); // Only one occurrence
  });

  it('should stage files in git repository', async () => {
    // Initialize git repo
    await exec('git', ['init']);
    await exec('git', ['config', 'user.name', 'Test User']);
    await exec('git', ['config', 'user.email', 'test@example.com']);

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: true,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    // Check git status to see if files are staged
    const { stdout } = await exec('git', ['status', '--porcelain']);
    expect(stdout).toContain('.catalyst/config.yaml');
    expect(stdout).toContain('.gitignore');
  });

  it('should handle non-git directories gracefully', async () => {
    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    // Should not throw error even though not a git repo
    await expect(
      initCommand.parseAsync(['node', 'catalyst', 'init'])
    ).resolves.not.toThrow();

    // Files should still be created
    expect(await exists('.catalyst/config.yaml')).toBe(true);
  });

  it('should respect --force flag for overwriting files', async () => {
    // Create existing .env.example
    await writeFile('.env.example', 'EXISTING=true');

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: 'test-project',
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init', '--force']);

    const envContent = await readFile('.env.example');
    expect(envContent).not.toContain('EXISTING=true');
    expect(envContent).toContain('CATALYST_ENV=development');
  });

  it('should use directory name as default project name', async () => {
    const projectName = path.basename(testProjectDir);

    vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({
      projectName: projectName, // Using default
      description: 'A test project',
      enableBMAD: false,
      createDocs: false,
    });

    await initCommand.parseAsync(['node', 'catalyst', 'init']);

    const config = await readJson('.catalyst/config.yaml');
    expect(config.general.project_name).toContain('catalyst-init-test-');
  });
});
```

---

## Architecture References

- [PRD: User Experience](../../prd/07-user-experience.md) - Init workflow
- [Data Architecture](../../architecture/07-data-architecture.md) - Project config structure

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Init command implemented
- [ ] Project type detection working
- [ ] Directory/file creation working
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Code committed
- [ ] Story reviewed and accepted

---

**Created:** October 26, 2025
