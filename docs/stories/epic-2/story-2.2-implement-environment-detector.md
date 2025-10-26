# Story 2.2: Implement Environment Detector

**Epic:** Epic 2 - Core CLI Implementation
**Story ID:** 2.2
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 5 hours

---

## User Story

**As a** developer,
**I want** Catalyst to detect my installed IDEs and extensions,
**so that** setup is automated and intelligent.

---

## Context

This story creates the environment detection system that identifies installed IDEs (VS Code, Cursor, Claude Code), extensions (Continue.dev), LM Studio, Node.js version, and macOS version. This enables intelligent setup and configuration based on the user's actual environment.

**Dependencies:**
- Story 1.4: Create Core Utility Modules (uses filesystem and shell utilities)
- Story 2.1: Implement Main CLI Entry Point (detector will be used by CLI commands)

**Enables:**
- Story 2.5: Implement `catalyst setup` Command (uses detector for intelligent setup)
- Story 2.7: Implement `catalyst verify` Command (uses detector for verification)
- All commands that need environment awareness

---

## Acceptance Criteria

### 1. Environment Detector Module (`src/core/detector.ts`)
- [ ] Module created with environment detection functions
- [ ] Exports `detectEnvironment()` as main function
- [ ] Returns structured `EnvironmentInfo` object
- [ ] All detection functions are async
- [ ] TypeScript types properly defined

### 2. IDE Detection
- [ ] Detects **VS Code** (Visual Studio Code):
  - Check: `/Applications/Visual Studio Code.app`
  - Returns: installed version if found
- [ ] Detects **Cursor**:
  - Check: `/Applications/Cursor.app`
  - Returns: installed version if found
- [ ] Detects **Claude Code**:
  - Check: Extension/app installation path
  - Returns: installed version if found
- [ ] Returns null/undefined for IDEs not found
- [ ] Handles permission errors gracefully

### 3. Extension Detection
- [ ] Detects **Continue.dev extension** in VS Code:
  - Check: `~/.vscode/extensions/continue.*`
  - Returns: version if found
- [ ] Detects Continue.dev in Cursor:
  - Check: Cursor extensions directory
  - Returns: version if found
- [ ] Returns null if extension not found

### 4. LM Studio Detection
- [ ] Detects **LM Studio** installation:
  - Check: `/Applications/LM Studio.app`
  - Returns: version if found
- [ ] Checks if LM Studio is running:
  - Check: Process list or API endpoint
  - Returns: running status
- [ ] Detects installed models:
  - Check: `~/.cache/lm-studio/models/`
  - Returns: list of model IDs (optional)

### 5. System Information Detection
- [ ] Detects **Node.js version**:
  - Execute: `node --version`
  - Parse and return semver
  - Validates >= 20.0.0
- [ ] Detects **npm version**:
  - Execute: `npm --version`
  - Parse and return semver
- [ ] Detects **macOS version**:
  - Execute: `sw_vers -productVersion`
  - Parse and return version
  - Validates >= 13.0
- [ ] Detects **macOS chip** (Intel vs Apple Silicon):
  - Execute: `uname -m`
  - Returns: `x86_64` or `arm64`

### 6. Type Definitions
- [ ] `EnvironmentInfo` interface defined:
  ```typescript
  interface EnvironmentInfo {
    system: SystemInfo;
    ides: IDEInfo;
    extensions: ExtensionInfo;
    tools: ToolInfo;
  }
  ```
- [ ] All sub-interfaces properly typed
- [ ] Optional fields marked with `?`
- [ ] Version fields use semver format

### 7. Error Handling
- [ ] Detection failures don't crash the program
- [ ] Missing tools return null/undefined, not errors
- [ ] Permission errors logged but not fatal
- [ ] Network timeouts handled gracefully
- [ ] Returns partial results if some detections fail

### 8. Unit Tests
- [ ] Test VS Code detection (mocked)
- [ ] Test Cursor detection (mocked)
- [ ] Test Continue.dev detection (mocked)
- [ ] Test LM Studio detection (mocked)
- [ ] Test Node.js version detection
- [ ] Test macOS version detection
- [ ] Test chip architecture detection
- [ ] Test error handling (missing tools, permission errors)
- [ ] All tests pass with >80% coverage

---

## Technical Implementation Notes

### Environment Detector Implementation

```typescript
// src/core/detector.ts
import { exists } from '@/utils/filesystem';
import { exec, commandExists } from '@/utils/shell';
import { logger } from '@/utils';
import os from 'os';
import path from 'path';

export interface EnvironmentInfo {
  system: SystemInfo;
  ides: IDEInfo;
  extensions: ExtensionInfo;
  tools: ToolInfo;
}

export interface SystemInfo {
  platform: string;
  arch: string;
  macOSVersion?: string;
  nodeVersion: string;
  npmVersion: string;
}

export interface IDEInfo {
  vscode?: {
    installed: boolean;
    version?: string;
    path?: string;
  };
  cursor?: {
    installed: boolean;
    version?: string;
    path?: string;
  };
  claudeCode?: {
    installed: boolean;
    version?: string;
    path?: string;
  };
}

export interface ExtensionInfo {
  continueDev?: {
    installed: boolean;
    version?: string;
    ide?: string; // 'vscode' | 'cursor'
  };
}

export interface ToolInfo {
  lmStudio?: {
    installed: boolean;
    version?: string;
    running?: boolean;
    modelsPath?: string;
  };
}

/**
 * Detect complete environment information
 */
export async function detectEnvironment(): Promise<EnvironmentInfo> {
  logger.debug('Detecting environment...');

  const [system, ides, extensions, tools] = await Promise.all([
    detectSystem(),
    detectIDEs(),
    detectExtensions(),
    detectTools(),
  ]);

  return {
    system,
    ides,
    extensions,
    tools,
  };
}

/**
 * Detect system information
 */
async function detectSystem(): Promise<SystemInfo> {
  const platform = os.platform();
  const arch = os.arch();

  let macOSVersion: string | undefined;
  if (platform === 'darwin') {
    try {
      const { stdout } = await exec('sw_vers', ['-productVersion']);
      macOSVersion = stdout.trim();
    } catch (error) {
      logger.debug('Failed to detect macOS version');
    }
  }

  let nodeVersion = '';
  try {
    const { stdout } = await exec('node', ['--version']);
    nodeVersion = stdout.trim().replace('v', '');
  } catch (error) {
    logger.warn('Node.js not found');
  }

  let npmVersion = '';
  try {
    const { stdout } = await exec('npm', ['--version']);
    npmVersion = stdout.trim();
  } catch (error) {
    logger.debug('npm not found');
  }

  return {
    platform,
    arch,
    macOSVersion,
    nodeVersion,
    npmVersion,
  };
}

/**
 * Detect installed IDEs
 */
async function detectIDEs(): Promise<IDEInfo> {
  const vscodeInfo = await detectVSCode();
  const cursorInfo = await detectCursor();
  const claudeCodeInfo = await detectClaudeCode();

  return {
    vscode: vscodeInfo,
    cursor: cursorInfo,
    claudeCode: claudeCodeInfo,
  };
}

/**
 * Detect VS Code
 */
async function detectVSCode() {
  const vscPath = '/Applications/Visual Studio Code.app';

  if (await exists(vscPath)) {
    // Try to get version
    let version: string | undefined;
    try {
      const { stdout } = await exec('code', ['--version']);
      version = stdout.split('\n')[0];
    } catch (error) {
      // code command might not be in PATH
      logger.debug('VS Code found but version not detected');
    }

    return {
      installed: true,
      version,
      path: vscPath,
    };
  }

  return undefined;
}

/**
 * Detect Cursor
 */
async function detectCursor() {
  const cursorPath = '/Applications/Cursor.app';

  if (await exists(cursorPath)) {
    return {
      installed: true,
      path: cursorPath,
    };
  }

  return undefined;
}

/**
 * Detect Claude Code
 */
async function detectClaudeCode() {
  // TODO: Determine Claude Code installation path
  // This may be a VS Code extension or standalone app
  return undefined;
}

/**
 * Detect installed extensions
 */
async function detectExtensions(): Promise<ExtensionInfo> {
  const continueDevInfo = await detectContinueDev();

  return {
    continueDev: continueDevInfo,
  };
}

/**
 * Detect Continue.dev extension
 */
async function detectContinueDev() {
  const homeDir = os.homedir();
  const vscodeExtDir = path.join(homeDir, '.vscode', 'extensions');

  // Check VS Code extensions
  if (await exists(vscodeExtDir)) {
    try {
      const { stdout } = await exec('ls', [vscodeExtDir]);
      const extensions = stdout.split('\n');
      const continueExt = extensions.find((ext) => ext.startsWith('continue.'));

      if (continueExt) {
        // Extract version from directory name (e.g., continue.continue-0.8.0)
        const versionMatch = continueExt.match(/(\d+\.\d+\.\d+)/);
        return {
          installed: true,
          version: versionMatch ? versionMatch[1] : undefined,
          ide: 'vscode',
        };
      }
    } catch (error) {
      logger.debug('Failed to check VS Code extensions');
    }
  }

  // TODO: Check Cursor extensions directory

  return undefined;
}

/**
 * Detect installed tools
 */
async function detectTools(): Promise<ToolInfo> {
  const lmStudioInfo = await detectLMStudio();

  return {
    lmStudio: lmStudioInfo,
  };
}

/**
 * Detect LM Studio
 */
async function detectLMStudio() {
  const lmStudioPath = '/Applications/LM Studio.app';

  if (await exists(lmStudioPath)) {
    // Check if running
    let running = false;
    try {
      const { stdout } = await exec('pgrep', ['-f', 'LM Studio']);
      running = stdout.trim().length > 0;
    } catch (error) {
      // Not running
    }

    // Check models directory
    const homeDir = os.homedir();
    const modelsPath = path.join(homeDir, '.cache', 'lm-studio', 'models');

    return {
      installed: true,
      running,
      modelsPath: (await exists(modelsPath)) ? modelsPath : undefined,
    };
  }

  return undefined;
}
```

---

## Architecture References

- [Technology Stack](../../architecture/02-technology-stack.md) - Runtime detection
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Environment awareness
- [PRD: User Experience](../../prd/07-user-experience.md) - Setup wizard flow

---

## Testing Strategy

### Unit Tests

```typescript
// tests/unit/core/detector.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectEnvironment, detectSystem } from '@/core/detector';
import * as fs from '@/utils/filesystem';
import * as shell from '@/utils/shell';

vi.mock('@/utils/filesystem');
vi.mock('@/utils/shell');

describe('Environment Detector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('detectSystem', () => {
    it('should detect Node.js version', async () => {
      vi.mocked(shell.exec).mockResolvedValueOnce({
        stdout: 'v20.10.0\n',
        stderr: '',
        exitCode: 0,
      });

      const system = await detectSystem();
      expect(system.nodeVersion).toBe('20.10.0');
    });

    it('should detect macOS version', async () => {
      vi.mocked(shell.exec).mockResolvedValueOnce({
        stdout: '14.0\n',
        stderr: '',
        exitCode: 0,
      });

      const system = await detectSystem();
      expect(system.macOSVersion).toBe('14.0');
    });
  });

  describe('detectIDEs', () => {
    it('should detect VS Code if installed', async () => {
      vi.mocked(fs.exists).mockResolvedValue(true);
      vi.mocked(shell.exec).mockResolvedValue({
        stdout: '1.85.0\n',
        stderr: '',
        exitCode: 0,
      });

      const env = await detectEnvironment();
      expect(env.ides.vscode?.installed).toBe(true);
      expect(env.ides.vscode?.version).toBe('1.85.0');
    });

    it('should return undefined if VS Code not installed', async () => {
      vi.mocked(fs.exists).mockResolvedValue(false);

      const env = await detectEnvironment();
      expect(env.ides.vscode).toBeUndefined();
    });
  });
});
```

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] `src/core/detector.ts` created with all detection functions
- [ ] Detects VS Code, Cursor, Claude Code (when available)
- [ ] Detects Continue.dev extension
- [ ] Detects LM Studio and models
- [ ] Detects Node.js, npm, macOS versions
- [ ] Detects chip architecture (Intel vs ARM)
- [ ] All TypeScript interfaces defined
- [ ] Error handling for all detection failures
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Manual testing on actual system
- [ ] Code follows ESLint and Prettier standards
- [ ] Documentation comments added
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- **Async Detection:** All detection is async for consistency
- **Parallel Detection:** Use `Promise.all()` for speed
- **Graceful Degradation:** Missing tools don't fail the entire detection
- **Cross-Platform:** Focus on macOS, but structure for future platforms
- **Performance:** Detection should complete in <2 seconds
- **Future Enhancements:**
  - Cache detection results (with TTL)
  - Detect more IDEs (IntelliJ, WebStorm, etc.)
  - Detect Docker, Git, Homebrew
  - Detect Python, Ruby, Go versions
  - Detect available AI models (not just LM Studio)
  - Web API for remote detection (for support/debugging)

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
