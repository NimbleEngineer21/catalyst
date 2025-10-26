# Story 2.8: Implement `catalyst config` Command

**Epic:** Epic 2 - Core CLI Implementation  
**Story ID:** 2.8  
**Priority:** P0 (Must Have)  
**Status:** Approved  
**Estimated Effort:** 4 hours

---

## User Story

**As a** user,  
**I want** to manage Catalyst configuration from the command line,  
**so that** I can view and update settings easily.

---

## Context

Creates the `catalyst config` command for viewing and managing both global and project-level configuration settings from the CLI.

**Dependencies:**
- Story 2.1: Main CLI Entry Point
- Story 2.3: Configuration Manager
- Story 2.4: Keychain Integration

**Enables:**
- Easy configuration management
- Scriptable config updates
- Troubleshooting config issues

---

## Acceptance Criteria

### 1. Config Command (`src/cli/commands/config.ts`)
- [ ] Base command: `catalyst config`
- [ ] Subcommands: `list`, `get`, `set`, `delete`
- [ ] Works with both global and project configs

### 2. List Subcommand
- [ ] `catalyst config list` - shows all settings
- [ ] `catalyst config list --global` - global only
- [ ] `catalyst config list --project` - project only
- [ ] Pretty-printed output with colors
- [ ] Groups settings by section

### 3. Get Subcommand
- [ ] `catalyst config get <key>` - get specific value
- [ ] Supports dot notation: `mcp_servers.docker.enabled`
- [ ] Shows which config file (global/project)
- [ ] Returns exit code 1 if key not found

### 4. Set Subcommand
- [ ] `catalyst config set <key> <value>` - set value
- [ ] Updates global config by default
- [ ] `--project` flag for project config
- [ ] Validates value before saving
- [ ] Creates nested keys if needed

### 5. Delete Subcommand
- [ ] `catalyst config delete <key>` - remove key
- [ ] Prompts for confirmation
- [ ] `--force` to skip confirmation
- [ ] Works with dot notation

### 6. Value Type Handling
- [ ] Strings: `catalyst config set key "value"`
- [ ] Numbers: `catalyst config set key 42`
- [ ] Booleans: `catalyst config set key true`
- [ ] Arrays: `catalyst config set key "item1,item2"`
- [ ] JSON: `catalyst config set key '{"foo":"bar"}'`

### 7. Validation
- [ ] Validates keys against schema
- [ ] Clear error messages for invalid keys
- [ ] Clear error messages for invalid values
- [ ] Suggests correct key names on typos

### 8. Output Formatting
- [ ] Human-readable by default
- [ ] `--json` flag for machine-readable output
- [ ] Colors for different value types
- [ ] Hierarchical display for nested values

### 9. Security
- [ ] Never displays API keys from Keychain
- [ ] Shows `[hidden]` for sensitive values
- [ ] `--show-secrets` flag to reveal (with warning)

### 10. Unit/Integration Tests
- [ ] Test list command
- [ ] Test get/set/delete
- [ ] Test validation
- [ ] Test error handling
- [ ] >80% coverage

---

## Technical Implementation

```typescript
// src/cli/commands/config.ts
import { Command } from 'commander';
import { 
  loadGlobalConfig, 
  loadProjectConfig,
  saveGlobalConfig,
  saveProjectConfig,
  mergeConfigs 
} from '@/core/configurator';
import { logger } from '@/utils';
import chalk from 'chalk';

export const configCommand = new Command('config')
  .description('Manage Catalyst configuration');

// List subcommand
configCommand
  .command('list')
  .description('List all configuration settings')
  .option('--global', 'Show global config only')
  .option('--project', 'Show project config only')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    const config = options.global ? await loadGlobalConfig() :
                   options.project ? await loadProjectConfig() :
                   await mergeConfigs();
    
    if (options.json) {
      console.log(JSON.stringify(config, null, 2));
      return;
    }
    
    // Pretty print
    logger.info(chalk.bold('Catalyst Configuration:\n'));
    printConfig(config);
  });

// Get subcommand
configCommand
  .command('get <key>')
  .description('Get configuration value')
  .action(async (key) => {
    const config = await mergeConfigs();
    const value = getNestedValue(config, key);
    
    if (value === undefined) {
      logger.error(`Key not found: ${key}`);
      process.exit(1);
    }
    
    console.log(value);
  });

// Set subcommand
configCommand
  .command('set <key> <value>')
  .description('Set configuration value')
  .option('--project', 'Set in project config')
  .action(async (key, value, options) => {
    const parsedValue = parseValue(value);
    
    if (options.project) {
      const config = await loadProjectConfig();
      setNestedValue(config, key, parsedValue);
      await saveProjectConfig(config);
    } else {
      const config = await loadGlobalConfig();
      setNestedValue(config, key, parsedValue);
      await saveGlobalConfig(config);
    }
    
    logger.success(`Set ${key} = ${value}`);
  });

// Delete subcommand
configCommand
  .command('delete <key>')
  .description('Delete configuration key')
  .option('-f, --force', 'Skip confirmation')
  .action(async (key, options) => {
    if (!options.force) {
      // Prompt for confirmation
      const confirmed = await confirm(`Delete ${key}?`);
      if (!confirmed) return;
    }
    
    const config = await loadGlobalConfig();
    deleteNestedValue(config, key);
    await saveGlobalConfig(config);
    
    logger.success(`Deleted ${key}`);
  });

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function parseValue(value: string): any {
  // Try boolean
  if (value === 'true') return true;
  if (value === 'false') return false;

  // Try number
  if (/^\d+$/.test(value)) return parseInt(value);
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value);

  // Try JSON
  if (value.startsWith('{') || value.startsWith('[')) {
    try {
      return JSON.parse(value);
    } catch {}
  }

  // Return as string
  return value;
}

/**
 * Delete a nested value from an object using dot notation
 */
function deleteNestedValue(obj: any, path: string): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;

  // Navigate to the parent object
  const parent = keys.reduce((current, key) => {
    if (!current || typeof current !== 'object') {
      throw new Error(`Cannot delete ${path}: parent path does not exist`);
    }
    return current[key];
  }, obj);

  if (parent && typeof parent === 'object') {
    delete parent[lastKey];
  } else {
    throw new Error(`Cannot delete ${path}: parent is not an object`);
  }
}

/**
 * Pretty-print configuration with proper indentation and colors
 */
function printConfig(config: any, indent: number = 0, showSecrets: boolean = false): void {
  const indentStr = '  '.repeat(indent);

  for (const [key, value] of Object.entries(config)) {
    // Check if this is a sensitive field
    const isSensitive = ['api_key', 'secret', 'token', 'password'].some(
      (sensitive) => key.toLowerCase().includes(sensitive)
    );

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Nested object
      logger.info(`${indentStr}${chalk.cyan(key)}:`);
      printConfig(value, indent + 1, showSecrets);
    } else if (Array.isArray(value)) {
      // Array
      logger.info(`${indentStr}${chalk.cyan(key)}: ${chalk.yellow(JSON.stringify(value))}`);
    } else if (isSensitive && !showSecrets) {
      // Sensitive value - mask it
      logger.info(`${indentStr}${chalk.cyan(key)}: ${chalk.gray('[hidden]')}`);
    } else if (typeof value === 'boolean') {
      // Boolean
      logger.info(`${indentStr}${chalk.cyan(key)}: ${chalk.magenta(value)}`);
    } else if (typeof value === 'number') {
      // Number
      logger.info(`${indentStr}${chalk.cyan(key)}: ${chalk.green(value)}`);
    } else {
      // String or other
      logger.info(`${indentStr}${chalk.cyan(key)}: ${value}`);
    }
  }
}

/**
 * Prompt user for confirmation
 */
async function confirm(message: string): Promise<boolean> {
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message,
      default: false,
    },
  ]);
  return confirmed;
}
```

### Security Features

```typescript
// Enhanced list command with --show-secrets flag
configCommand
  .command('list')
  .description('List all configuration settings')
  .option('--global', 'Show global config only')
  .option('--project', 'Show project config only')
  .option('--json', 'Output as JSON')
  .option('--show-secrets', 'Show sensitive values (use with caution)')
  .action(async (options) => {
    const config = options.global ? await loadGlobalConfig() :
                   options.project ? await loadProjectConfig() :
                   await mergeConfigs();

    if (options.json) {
      // In JSON mode, never show secrets unless explicitly requested
      const output = options.showSecrets ? config : maskSecrets(config);
      console.log(JSON.stringify(output, null, 2));
      return;
    }

    // Show warning if displaying secrets
    if (options.showSecrets) {
      logger.warn('⚠️  Displaying sensitive values - use caution!');
    }

    // Pretty print
    logger.info(chalk.bold('Catalyst Configuration:\n'));
    printConfig(config, 0, options.showSecrets);
  });

/**
 * Mask sensitive values in configuration
 */
function maskSecrets(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(maskSecrets);
  }

  const masked: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const isSensitive = ['api_key', 'secret', 'token', 'password'].some(
      (sensitive) => key.toLowerCase().includes(sensitive)
    );

    if (isSensitive) {
      masked[key] = '[hidden]';
    } else if (typeof value === 'object') {
      masked[key] = maskSecrets(value);
    } else {
      masked[key] = value;
    }
  }

  return masked;
}
```

---

## Testing Examples

**Test Coverage Requirements:**
- Integration tests for all config subcommands
- Test dot notation for nested keys
- Test value type parsing (strings, numbers, booleans, JSON)
- Test secret masking functionality
- Test error handling for invalid keys
- Aim for >80% code coverage

**Example Integration Tests:**

```typescript
// tests/integration/cli/config.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { configCommand } from '@/cli/commands/config';
import { readFile, writeFile, exists, remove } from '@/utils/filesystem';
import path from 'path';
import os from 'os';
import inquirer from 'inquirer';

describe('Config Command Integration Tests', () => {
  let testConfigDir: string;
  let configPath: string;

  beforeEach(async () => {
    // Create temporary config directory
    testConfigDir = path.join(os.tmpdir(), `catalyst-config-test-${Date.now()}`);
    configPath = path.join(testConfigDir, 'config.yaml');

    // Mock os.homedir to return test directory
    vi.spyOn(os, 'homedir').mockReturnValue(testConfigDir.replace('/.catalyst', ''));

    // Create test config
    const testConfig = {
      general: {
        version: '2.0.0',
        project_types: ['TypeScript', 'Python'],
      },
      mcp_servers: {
        enabled: ['github', 'docker'],
        config: {
          github: {
            api_key: 'secret-key-123',
          },
        },
      },
      preferences: {
        auto_update: true,
        telemetry: false,
      },
    };

    await ensureDir(testConfigDir);
    await writeFile(configPath, JSON.stringify(testConfig));
  });

  afterEach(async () => {
    if (await exists(testConfigDir)) {
      await remove(testConfigDir);
    }
    vi.restoreAllMocks();
  });

  describe('list subcommand', () => {
    it('should list all configuration settings', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync(['node', 'catalyst', 'config', 'list']);

      const output = consoleSpy.mock.calls.map((c) => c[0]).join('\n');
      expect(output).toContain('general');
      expect(output).toContain('version');
      expect(output).toContain('2.0.0');
    });

    it('should output JSON with --json flag', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync(['node', 'catalyst', 'config', 'list', '--json']);

      const output = consoleSpy.mock.calls[0][0];
      const json = JSON.parse(output);

      expect(json.general.version).toBe('2.0.0');
      expect(json.preferences.auto_update).toBe(true);
    });

    it('should mask secrets by default', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync(['node', 'catalyst', 'config', 'list']);

      const output = consoleSpy.mock.calls.map((c) => c[0]).join('\n');
      expect(output).toContain('[hidden]');
      expect(output).not.toContain('secret-key-123');
    });

    it('should show secrets with --show-secrets flag', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'list',
        '--show-secrets',
      ]);

      const output = consoleSpy.mock.calls.map((c) => c[0]).join('\n');
      expect(output).toContain('secret-key-123');
    });

    it('should show warning when displaying secrets', async () => {
      const warnSpy = vi.spyOn(console, 'warn');

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'list',
        '--show-secrets',
      ]);

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Displaying sensitive values')
      );
    });
  });

  describe('get subcommand', () => {
    it('should get simple value', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'get',
        'general.version',
      ]);

      expect(consoleSpy).toHaveBeenCalledWith('2.0.0');
    });

    it('should get nested value with dot notation', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'get',
        'preferences.auto_update',
      ]);

      expect(consoleSpy).toHaveBeenCalledWith(true);
    });

    it('should get array value', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'get',
        'general.project_types',
      ]);

      const output = consoleSpy.mock.calls[0][0];
      expect(output).toContain('TypeScript');
      expect(output).toContain('Python');
    });

    it('should exit with code 1 when key not found', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit');
      });

      await expect(
        configCommand.parseAsync([
          'node',
          'catalyst',
          'config',
          'get',
          'nonexistent.key',
        ])
      ).rejects.toThrow('process.exit');

      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('set subcommand', () => {
    it('should set string value', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'general.author',
        'John Doe',
      ]);

      const config = await readFile(configPath);
      expect(config).toContain('author');
      expect(config).toContain('John Doe');
    });

    it('should set boolean value', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'preferences.telemetry',
        'true',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.preferences.telemetry).toBe(true);
    });

    it('should set number value', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'preferences.timeout',
        '5000',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.preferences.timeout).toBe(5000);
    });

    it('should set float value', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'preferences.threshold',
        '0.75',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.preferences.threshold).toBe(0.75);
    });

    it('should set JSON value', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'custom.options',
        '{"foo":"bar","num":42}',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.custom.options.foo).toBe('bar');
      expect(config.custom.options.num).toBe(42);
    });

    it('should create nested keys if needed', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'new.nested.key',
        'value',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.new.nested.key).toBe('value');
    });

    it('should update project config with --project flag', async () => {
      const projectConfigPath = path.join(process.cwd(), '.catalyst', 'config.yaml');
      await ensureDir(path.dirname(projectConfigPath));
      await writeFile(projectConfigPath, JSON.stringify({ general: {} }));

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'set',
        'general.name',
        'My Project',
        '--project',
      ]);

      const config = JSON.parse(await readFile(projectConfigPath));
      expect(config.general.name).toBe('My Project');

      await remove(projectConfigPath);
    });
  });

  describe('delete subcommand', () => {
    it('should delete key with confirmation', async () => {
      vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ confirmed: true });

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'delete',
        'preferences.telemetry',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.preferences.telemetry).toBeUndefined();
    });

    it('should not delete when confirmation is declined', async () => {
      vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ confirmed: false });

      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'delete',
        'preferences.telemetry',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.preferences.telemetry).toBe(false);
    });

    it('should delete without confirmation with --force flag', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'delete',
        'preferences.auto_update',
        '--force',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.preferences.auto_update).toBeUndefined();
    });

    it('should delete nested key', async () => {
      await configCommand.parseAsync([
        'node',
        'catalyst',
        'config',
        'delete',
        'mcp_servers.config.github',
        '--force',
      ]);

      const config = JSON.parse(await readFile(configPath));
      expect(config.mcp_servers.config.github).toBeUndefined();
    });
  });

  describe('helper functions', () => {
    it('should parse different value types correctly', () => {
      expect(parseValue('true')).toBe(true);
      expect(parseValue('false')).toBe(false);
      expect(parseValue('42')).toBe(42);
      expect(parseValue('3.14')).toBe(3.14);
      expect(parseValue('{"foo":"bar"}')).toEqual({ foo: 'bar' });
      expect(parseValue('hello')).toBe('hello');
    });

    it('should mask secrets in nested objects', () => {
      const config = {
        general: { version: '1.0.0' },
        api: {
          api_key: 'secret-123',
          endpoint: 'https://api.example.com',
          auth_token: 'token-456',
        },
      };

      const masked = maskSecrets(config);

      expect(masked.general.version).toBe('1.0.0');
      expect(masked.api.api_key).toBe('[hidden]');
      expect(masked.api.endpoint).toBe('https://api.example.com');
      expect(masked.api.auth_token).toBe('[hidden]');
    });

    it('should delete nested values correctly', () => {
      const obj = {
        a: {
          b: {
            c: 'value',
            d: 'another',
          },
        },
      };

      deleteNestedValue(obj, 'a.b.c');

      expect(obj.a.b.c).toBeUndefined();
      expect(obj.a.b.d).toBe('another');
    });

    it('should throw error when deleting non-existent path', () => {
      const obj = { a: { b: 'value' } };

      expect(() => {
        deleteNestedValue(obj, 'a.c.d');
      }).toThrow('parent path does not exist');
    });
  });
});
```

---

## Architecture References

- [Data Architecture](../../architecture/07-data-architecture.md) - Config structure
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Command patterns

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Config command with all subcommands implemented
- [ ] List/get/set/delete working
- [ ] Dot notation working
- [ ] Validation working
- [ ] Unit tests passing
- [ ] Manual testing completed
- [ ] Code committed
- [ ] Story reviewed and accepted

---

**Created:** October 26, 2025
