# Story 2.7: Implement `catalyst verify` Command

**Epic:** Epic 2 - Core CLI Implementation  
**Story ID:** 2.7  
**Priority:** P0 (Must Have)  
**Status:** Approved  
**Estimated Effort:** 4 hours

---

## User Story

**As a** user,  
**I want** to verify my Catalyst installation,  
**so that** I know everything is configured correctly.

---

## Context

Creates the `catalyst verify` command that validates the Catalyst installation, checking versions, configuration files, and dependencies.

**Dependencies:**
- Story 2.1: Main CLI Entry Point
- Story 2.2: Environment Detector
- Story 2.3: Configuration Manager

**Enables:**
- Installation troubleshooting
- Support diagnostics
- CI/CD validation

---

## Acceptance Criteria

### 1. Verify Command (`src/cli/commands/verify.ts`)
- [ ] Command registered: `catalyst verify`
- [ ] Runs comprehensive checks
- [ ] Shows ✅/❌ for each check
- [ ] Exits with code 0 (pass) or 1 (fail)

### 2. Verifier Module (`src/core/verifier.ts`)
- [ ] Module with verification functions
- [ ] Returns structured results
- [ ] Each check has: name, status, message, details

### 3. System Checks
- [ ] Node.js version >= 20.0.0
- [ ] npm version >= 9.0.0
- [ ] macOS version >= 13.0
- [ ] Catalyst version matches package.json

### 4. Configuration Checks
- [ ] `~/.catalyst/` directory exists
- [ ] `~/.catalyst/config.yaml` exists and valid
- [ ] Project `.catalyst/config.yaml` valid (if exists)
- [ ] Config schema validation passes

### 5. Tool Checks
- [ ] LM Studio detected (optional, warning if missing)
- [ ] IDE detected (optional, info if missing)
- [ ] MCP servers accessible (if configured)

### 6. Permissions Checks
- [ ] Can write to `~/.catalyst/`
- [ ] Can read configuration files
- [ ] Keychain access working (macOS)

### 7. Output Format
- [ ] Clear check names
- [ ] ✅ for pass, ❌ for fail, ⚠️ for warnings
- [ ] Helpful error messages with fix suggestions
- [ ] Summary at end (X/Y checks passed)

### 8. Command Options
- [ ] `--verbose` - Show detailed check info
- [ ] `--json` - Output as JSON (for scripts)
- [ ] `--fix` - Attempt to fix issues automatically

### 9. Unit/Integration Tests
- [ ] Test each verification check
- [ ] Test pass/fail scenarios
- [ ] Test output formatting
- [ ] >80% coverage

---

## Technical Implementation

```typescript
// src/cli/commands/verify.ts
import { Command } from 'commander';
import { runVerification } from '@/core/verifier';
import { logger } from '@/utils';

export const verifyCommand = new Command('verify')
  .description('Verify Catalyst installation')
  .option('-v, --verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    logger.info('🔍 Verifying Catalyst installation...\n');
    
    const results = await runVerification();
    
    if (options.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }
    
    // Display results
    for (const check of results.checks) {
      const icon = check.status === 'pass' ? '✅' : 
                   check.status === 'fail' ? '❌' : '⚠️';
      logger.info(`${icon} ${check.name}`);
      if (options.verbose || check.status !== 'pass') {
        logger.info(`   ${check.message}`);
      }
    }
    
    // Summary
    const passed = results.checks.filter(c => c.status === 'pass').length;
    const total = results.checks.length;
    logger.info(`\n${passed}/${total} checks passed`);
    
    process.exit(results.allPassed ? 0 : 1);
  });

// src/core/verifier.ts
export interface VerificationResult {
  allPassed: boolean;
  checks: CheckResult[];
}

export interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

export async function runVerification(): Promise<VerificationResult> {
  const checks: CheckResult[] = [];
  
  // Check Node.js version
  checks.push(await checkNodeVersion());
  
  // Check config files
  checks.push(await checkGlobalConfig());
  
  // Check permissions
  checks.push(await checkPermissions());
  
  // More checks...
  
  const allPassed = checks.every(c => c.status === 'pass');
  
  return { allPassed, checks };
}

async function checkNodeVersion(): Promise<CheckResult> {
  const { stdout } = await exec('node', ['--version']);
  const version = stdout.trim().replace('v', '');
  const [major] = version.split('.');

  if (parseInt(major) >= 20) {
    return {
      name: 'Node.js version',
      status: 'pass',
      message: `Node.js ${version} (>= 20.0.0 required)`,
    };
  }

  return {
    name: 'Node.js version',
    status: 'fail',
    message: `Node.js ${version} is too old. Please upgrade to 20.0.0 or newer.`,
  };
}

/**
 * Check if global config file exists and is valid
 */
async function checkConfigFile(): Promise<CheckResult> {
  const configPath = path.join(os.homedir(), '.catalyst', 'config.yaml');

  try {
    if (!(await exists(configPath))) {
      return {
        name: 'Global configuration',
        status: 'fail',
        message: 'Config file not found. Run: catalyst setup',
        details: { path: configPath },
      };
    }

    // Try to load and validate the config
    const config = await loadGlobalConfig();

    // Basic validation
    if (!config.general || !config.general.version) {
      return {
        name: 'Global configuration',
        status: 'fail',
        message: 'Config file is invalid or corrupted',
        details: { path: configPath },
      };
    }

    return {
      name: 'Global configuration',
      status: 'pass',
      message: `Config v${config.general.version} loaded successfully`,
      details: { path: configPath },
    };
  } catch (error) {
    return {
      name: 'Global configuration',
      status: 'fail',
      message: `Error reading config: ${error.message}`,
      details: { path: configPath, error: error.message },
    };
  }
}

/**
 * Check if Keychain access is working (macOS only)
 */
async function checkKeychainAccess(): Promise<CheckResult> {
  if (process.platform !== 'darwin') {
    return {
      name: 'Keychain access',
      status: 'warning',
      message: 'Keychain is only available on macOS',
    };
  }

  try {
    // Try to access the keychain with a test read
    // This verifies that the security command is available
    await exec('security', ['find-generic-password', '-h']);

    return {
      name: 'Keychain access',
      status: 'pass',
      message: 'macOS Keychain is accessible',
    };
  } catch (error) {
    return {
      name: 'Keychain access',
      status: 'fail',
      message: 'Cannot access macOS Keychain',
      details: { error: error.message },
    };
  }
}

/**
 * Check if .catalyst directory has correct permissions
 */
async function checkDirectoryPermissions(): Promise<CheckResult> {
  const catalystDir = path.join(os.homedir(), '.catalyst');

  try {
    // Check if directory exists
    if (!(await exists(catalystDir))) {
      return {
        name: 'Directory permissions',
        status: 'fail',
        message: '.catalyst directory does not exist. Run: catalyst setup',
        details: { path: catalystDir },
      };
    }

    // Try to write a test file
    const testFile = path.join(catalystDir, '.permission-test');
    try {
      await writeFile(testFile, 'test');
      await remove(testFile);

      return {
        name: 'Directory permissions',
        status: 'pass',
        message: '.catalyst directory is writable',
        details: { path: catalystDir },
      };
    } catch (writeError) {
      return {
        name: 'Directory permissions',
        status: 'fail',
        message: 'Cannot write to .catalyst directory',
        details: {
          path: catalystDir,
          error: writeError.message,
          suggestion: `Run: chmod u+w ${catalystDir}`,
        },
      };
    }
  } catch (error) {
    return {
      name: 'Directory permissions',
      status: 'fail',
      message: `Error checking permissions: ${error.message}`,
      details: { path: catalystDir, error: error.message },
    };
  }
}
```

---

## Testing Examples

**Test Coverage Requirements:**
- Unit tests for each verification check function
- Test pass, fail, and warning scenarios
- Test error handling for missing dependencies
- Test output formatting (plain text and JSON)
- Aim for >80% code coverage

**Example Unit Tests:**

```typescript
// tests/unit/core/verifier.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  runVerification,
  checkNodeVersion,
  checkConfigFile,
  checkKeychainAccess,
  checkDirectoryPermissions,
} from '@/core/verifier';
import { exec } from '@/utils/shell';
import { exists, writeFile, remove } from '@/utils/filesystem';
import { loadGlobalConfig } from '@/core/configurator';
import path from 'path';
import os from 'os';

vi.mock('@/utils/shell');
vi.mock('@/utils/filesystem');
vi.mock('@/core/configurator');

describe('Verifier Module', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('checkNodeVersion', () => {
    it('should pass for Node.js v20+', async () => {
      vi.mocked(exec).mockResolvedValue({
        stdout: 'v20.10.0',
        stderr: '',
        exitCode: 0,
      });

      const result = await checkNodeVersion();

      expect(result.status).toBe('pass');
      expect(result.name).toBe('Node.js version');
      expect(result.message).toContain('20.10.0');
    });

    it('should pass for Node.js v22+', async () => {
      vi.mocked(exec).mockResolvedValue({
        stdout: 'v22.1.0',
        stderr: '',
        exitCode: 0,
      });

      const result = await checkNodeVersion();

      expect(result.status).toBe('pass');
      expect(result.message).toContain('22.1.0');
    });

    it('should fail for Node.js v18', async () => {
      vi.mocked(exec).mockResolvedValue({
        stdout: 'v18.19.0',
        stderr: '',
        exitCode: 0,
      });

      const result = await checkNodeVersion();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('too old');
      expect(result.message).toContain('18.19.0');
    });

    it('should fail for Node.js v16', async () => {
      vi.mocked(exec).mockResolvedValue({
        stdout: 'v16.20.0',
        stderr: '',
        exitCode: 0,
      });

      const result = await checkNodeVersion();

      expect(result.status).toBe('fail');
    });
  });

  describe('checkConfigFile', () => {
    const configPath = path.join(os.homedir(), '.catalyst', 'config.yaml');

    it('should pass when config exists and is valid', async () => {
      vi.mocked(exists).mockResolvedValue(true);
      vi.mocked(loadGlobalConfig).mockResolvedValue({
        general: { version: '2.0.0' },
        mcp_servers: {},
        bmad: {},
      });

      const result = await checkConfigFile();

      expect(result.status).toBe('pass');
      expect(result.message).toContain('v2.0.0');
      expect(result.details.path).toBe(configPath);
    });

    it('should fail when config file does not exist', async () => {
      vi.mocked(exists).mockResolvedValue(false);

      const result = await checkConfigFile();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('not found');
      expect(result.message).toContain('catalyst setup');
    });

    it('should fail when config is invalid', async () => {
      vi.mocked(exists).mockResolvedValue(true);
      vi.mocked(loadGlobalConfig).mockResolvedValue({
        // Missing general.version
        mcp_servers: {},
      });

      const result = await checkConfigFile();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('invalid or corrupted');
    });

    it('should fail when config cannot be loaded', async () => {
      vi.mocked(exists).mockResolvedValue(true);
      vi.mocked(loadGlobalConfig).mockRejectedValue(
        new Error('YAML parse error')
      );

      const result = await checkConfigFile();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('Error reading config');
      expect(result.details.error).toContain('YAML parse error');
    });
  });

  describe('checkKeychainAccess', () => {
    it('should pass on macOS when keychain is accessible', async () => {
      Object.defineProperty(process, 'platform', {
        value: 'darwin',
        writable: true,
      });

      vi.mocked(exec).mockResolvedValue({
        stdout: '',
        stderr: '',
        exitCode: 0,
      });

      const result = await checkKeychainAccess();

      expect(result.status).toBe('pass');
      expect(result.message).toContain('Keychain is accessible');
    });

    it('should warn on non-macOS platforms', async () => {
      Object.defineProperty(process, 'platform', {
        value: 'linux',
        writable: true,
      });

      const result = await checkKeychainAccess();

      expect(result.status).toBe('warning');
      expect(result.message).toContain('only available on macOS');
    });

    it('should fail when security command is not available', async () => {
      Object.defineProperty(process, 'platform', {
        value: 'darwin',
        writable: true,
      });

      vi.mocked(exec).mockRejectedValue(new Error('Command not found'));

      const result = await checkKeychainAccess();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('Cannot access');
    });
  });

  describe('checkDirectoryPermissions', () => {
    const catalystDir = path.join(os.homedir(), '.catalyst');
    const testFile = path.join(catalystDir, '.permission-test');

    it('should pass when directory is writable', async () => {
      vi.mocked(exists).mockImplementation(async (p) => {
        if (p === catalystDir) return true;
        return false;
      });
      vi.mocked(writeFile).mockResolvedValue(undefined);
      vi.mocked(remove).mockResolvedValue(undefined);

      const result = await checkDirectoryPermissions();

      expect(result.status).toBe('pass');
      expect(result.message).toContain('writable');
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(testFile, 'test');
      expect(vi.mocked(remove)).toHaveBeenCalledWith(testFile);
    });

    it('should fail when directory does not exist', async () => {
      vi.mocked(exists).mockResolvedValue(false);

      const result = await checkDirectoryPermissions();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('does not exist');
      expect(result.message).toContain('catalyst setup');
    });

    it('should fail when directory is not writable', async () => {
      vi.mocked(exists).mockResolvedValue(true);
      vi.mocked(writeFile).mockRejectedValue(
        new Error('EACCES: permission denied')
      );

      const result = await checkDirectoryPermissions();

      expect(result.status).toBe('fail');
      expect(result.message).toContain('Cannot write');
      expect(result.details.suggestion).toContain('chmod');
    });
  });

  describe('runVerification', () => {
    it('should run all checks and return results', async () => {
      vi.mocked(exec).mockResolvedValue({
        stdout: 'v20.10.0',
        stderr: '',
        exitCode: 0,
      });
      vi.mocked(exists).mockResolvedValue(true);
      vi.mocked(loadGlobalConfig).mockResolvedValue({
        general: { version: '2.0.0' },
      });
      vi.mocked(writeFile).mockResolvedValue(undefined);
      vi.mocked(remove).mockResolvedValue(undefined);

      const results = await runVerification();

      expect(results.checks.length).toBeGreaterThan(0);
      expect(results.allPassed).toBeDefined();
    });

    it('should set allPassed to false when any check fails', async () => {
      vi.mocked(exec).mockResolvedValue({
        stdout: 'v18.0.0', // Old Node version
        stderr: '',
        exitCode: 0,
      });
      vi.mocked(exists).mockResolvedValue(false); // Config missing

      const results = await runVerification();

      expect(results.allPassed).toBe(false);
      const failedChecks = results.checks.filter((c) => c.status === 'fail');
      expect(failedChecks.length).toBeGreaterThan(0);
    });

    it('should set allPassed to true when all checks pass', async () => {
      Object.defineProperty(process, 'platform', {
        value: 'darwin',
        writable: true,
      });

      vi.mocked(exec).mockResolvedValue({
        stdout: 'v20.10.0',
        stderr: '',
        exitCode: 0,
      });
      vi.mocked(exists).mockResolvedValue(true);
      vi.mocked(loadGlobalConfig).mockResolvedValue({
        general: { version: '2.0.0' },
      });
      vi.mocked(writeFile).mockResolvedValue(undefined);
      vi.mocked(remove).mockResolvedValue(undefined);

      const results = await runVerification();

      expect(results.allPassed).toBe(true);
      const passedChecks = results.checks.filter((c) => c.status === 'pass');
      expect(passedChecks.length).toBe(results.checks.length);
    });
  });
});

// tests/integration/cli/verify.test.ts
describe('Verify Command Integration Tests', () => {
  it('should output results in human-readable format', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    await verifyCommand.parseAsync(['node', 'catalyst', 'verify']);

    const output = consoleSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('✅'); // Pass emoji
    expect(output).toContain('checks passed');
  });

  it('should output results in JSON format with --json flag', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    await verifyCommand.parseAsync(['node', 'catalyst', 'verify', '--json']);

    const output = consoleSpy.mock.calls[0][0];
    const json = JSON.parse(output);

    expect(json.checks).toBeDefined();
    expect(json.allPassed).toBeDefined();
    expect(Array.isArray(json.checks)).toBe(true);
  });

  it('should show detailed info in verbose mode', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    await verifyCommand.parseAsync(['node', 'catalyst', 'verify', '--verbose']);

    const output = consoleSpy.mock.calls.map((c) => c[0]).join('\n');
    // Verbose mode should show details for all checks
    expect(output.split('\n').length).toBeGreaterThan(5);
  });

  it('should exit with code 1 when checks fail', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit');
    });

    // Mock a failing check
    vi.mocked(exists).mockResolvedValue(false);

    await expect(
      verifyCommand.parseAsync(['node', 'catalyst', 'verify'])
    ).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('should exit with code 0 when all checks pass', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit');
    });

    // Mock all passing checks
    vi.mocked(exec).mockResolvedValue({
      stdout: 'v20.10.0',
      stderr: '',
      exitCode: 0,
    });
    vi.mocked(exists).mockResolvedValue(true);
    vi.mocked(loadGlobalConfig).mockResolvedValue({
      general: { version: '2.0.0' },
    });

    await expect(
      verifyCommand.parseAsync(['node', 'catalyst', 'verify'])
    ).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});
```

---

## Architecture References

- [Testing Architecture](../../architecture/09-testing-architecture.md) - Verification approach
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Command structure

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Verify command implemented
- [ ] All checks working
- [ ] Output formatting clear
- [ ] Unit tests passing
- [ ] Manual testing completed
- [ ] Code committed
- [ ] Story reviewed and accepted

---

**Created:** October 26, 2025
