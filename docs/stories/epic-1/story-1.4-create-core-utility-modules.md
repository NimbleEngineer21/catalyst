# Story 1.4: Create Core Utility Modules

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.4
**Priority:** P0 (Must Have)
**Status:** Accepted
**Estimated Effort:** 6 hours

---

## User Story

**As a** developer,
**I want** core utility functions for filesystem, shell, and logging,
**so that** I can reuse common functionality across the codebase.

---

## Context

This story creates the foundational utility modules that will be used throughout Catalyst. These utilities provide type-safe, tested wrappers around common operations like filesystem access, shell command execution, logging, and error handling.

**Dependencies:**
- Story 1.1: Initialize TypeScript Project Structure
- Story 1.2: Set Up Testing Infrastructure
- Story 1.3: Configure Build and Development Scripts

**Enables:**
- Epic 2: Core CLI Implementation (will use these utilities extensively)
- Epic 3: MCP Server Framework (will use logging and filesystem utilities)
- Epic 4: BMAD Integration (will use shell and filesystem utilities)
- All future development work

---

## Acceptance Criteria

### 1. Filesystem Utilities (`src/utils/filesystem.ts`)
- [x] Module created with fs-extra wrappers
- [x] Functions implemented:
  - `readFile(path: string): Promise<string>` - Read file as string
  - `readJson(path: string): Promise<any>` - Read and parse JSON
  - `writeFile(path: string, content: string): Promise<void>` - Write file
  - `writeJson(path: string, data: any): Promise<void>` - Write JSON with formatting
  - `exists(path: string): Promise<boolean>` - Check if path exists
  - `ensureDir(path: string): Promise<void>` - Create directory if not exists
  - `remove(path: string): Promise<void>` - Remove file or directory
  - `copy(src: string, dest: string): Promise<void>` - Copy file or directory
- [x] All functions have JSDoc comments
- [x] All functions handle errors gracefully
- [x] TypeScript types properly defined

### 2. Shell Utilities (`src/utils/shell.ts`)
- [x] Module created with execa wrappers
- [x] Functions implemented:
  - `exec(command: string, args?: string[], options?: ExecOptions): Promise<ExecResult>` - Execute command
  - `execSilent(command: string, args?: string[]): Promise<ExecResult>` - Execute without output
  - `execLive(command: string, args?: string[]): Promise<ExecResult>` - Execute with live output
  - `commandExists(command: string): Promise<boolean>` - Check if command available
- [x] Types defined:
  - `ExecOptions` - Options for command execution
  - `ExecResult` - Result with stdout, stderr, exitCode
- [x] Error handling for command failures
- [x] Timeout support
- [x] Working directory support

### 3. Logger Utilities (`src/utils/logger.ts`)
- [x] Module created with chalk-based logging
- [x] Functions implemented:
  - `info(message: string): void` - Info level log (blue)
  - `success(message: string): void` - Success log (green)
  - `warn(message: string): void` - Warning log (yellow)
  - `error(message: string): void` - Error log (red)
  - `debug(message: string): void` - Debug log (gray, only if DEBUG=true)
  - `spinner(text: string): Spinner` - Create ora spinner
- [x] Spinner interface:
  - `start()` - Start spinner
  - `succeed(text?: string)` - Success state
  - `fail(text?: string)` - Failure state
  - `stop()` - Stop spinner
- [x] Log levels configurable via environment variable
- [x] Timestamps optional

### 4. Error Utilities (`src/utils/errors.ts`)
- [x] Custom error classes created:
  - `CatalystError` - Base error class
  - `ValidationError` - For validation failures
  - `FileSystemError` - For filesystem operations
  - `CommandError` - For shell command failures
  - `ConfigError` - For configuration issues
- [x] Each error class has:
  - `name: string` - Error type name
  - `message: string` - Error description
  - `code: string` - Machine-readable error code
  - `details?: any` - Additional error context
- [x] Error factory functions:
  - `createError(type: ErrorType, message: string, details?: any): CatalystError`
- [x] Error formatting for CLI display

### 5. Type Definitions (`src/types/index.ts`)
- [x] Common types defined:
  - `Config` - Catalyst configuration structure
  - `CommandOptions` - CLI command options
  - `ServerConfig` - MCP server configuration
  - `BMadConfig` - BMAD configuration
- [x] Type exports organized
- [x] JSDoc comments for all types

### 6. Module Exports (`src/utils/index.ts`)
- [x] Barrel export file created
- [x] All utility modules re-exported
- [x] Clean import paths enabled: `import { logger } from '@/utils'`

### 7. Unit Tests
- [x] `tests/unit/utils/filesystem.test.ts` - Test all filesystem functions
- [x] `tests/unit/utils/shell.test.ts` - Test shell execution
- [x] `tests/unit/utils/logger.test.ts` - Test logging functions
- [x] `tests/unit/utils/errors.test.ts` - Test error classes
- [x] All tests pass
- [x] Code coverage >80% for utils

---

## Technical Implementation Notes

### Filesystem Utilities Example

```typescript
// src/utils/filesystem.ts
import fs from 'fs-extra';
import { FileSystemError } from './errors';

/**
 * Read file content as string
 * @param path - File path to read
 * @returns File content as string
 */
export async function readFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf-8');
  } catch (error) {
    throw new FileSystemError(`Failed to read file: ${path}`, { cause: error });
  }
}

/**
 * Read and parse JSON file
 * @param path - JSON file path
 * @returns Parsed JSON object
 */
export async function readJson<T = any>(path: string): Promise<T> {
  try {
    return await fs.readJson(path);
  } catch (error) {
    throw new FileSystemError(`Failed to read JSON: ${path}`, { cause: error });
  }
}

// ... more functions
```

### Shell Utilities Example

```typescript
// src/utils/shell.ts
import { execa, ExecaError } from 'execa';
import { CommandError } from './errors';

export interface ExecOptions {
  cwd?: string;
  timeout?: number;
  env?: Record<string, string>;
}

export interface ExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * Execute shell command
 * @param command - Command to execute
 * @param args - Command arguments
 * @param options - Execution options
 * @returns Command result
 */
export async function exec(
  command: string,
  args: string[] = [],
  options: ExecOptions = {}
): Promise<ExecResult> {
  try {
    const result = await execa(command, args, {
      cwd: options.cwd,
      timeout: options.timeout,
      env: options.env,
    });

    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    };
  } catch (error) {
    const execError = error as ExecaError;
    throw new CommandError(
      `Command failed: ${command} ${args.join(' ')}`,
      {
        command,
        args,
        exitCode: execError.exitCode,
        stderr: execError.stderr,
      }
    );
  }
}

// ... more functions
```

### Logger Utilities Example

```typescript
// src/utils/logger.ts
import chalk from 'chalk';
import ora, { Ora } from 'ora';

/**
 * Log info message
 */
export function info(message: string): void {
  console.log(chalk.blue('ℹ'), message);
}

/**
 * Log success message
 */
export function success(message: string): void {
  console.log(chalk.green('✔'), message);
}

/**
 * Log warning message
 */
export function warn(message: string): void {
  console.warn(chalk.yellow('⚠'), message);
}

/**
 * Log error message
 */
export function error(message: string): void {
  console.error(chalk.red('✖'), message);
}

/**
 * Create spinner for long-running operations
 */
export function spinner(text: string): Ora {
  return ora(text);
}
```

### Error Classes Example

```typescript
// src/utils/errors.ts

export class CatalystError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class FileSystemError extends CatalystError {
  constructor(message: string, details?: any) {
    super(message, 'FILESYSTEM_ERROR', details);
  }
}

export class CommandError extends CatalystError {
  constructor(message: string, details?: any) {
    super(message, 'COMMAND_ERROR', details);
  }
}

// ... more error classes
```

---

## Architecture References

- [Technology Stack](../../architecture/02-technology-stack.md) - Library choices
- [CLI Architecture](../../architecture/03-cli-architecture.md) - How utilities fit into CLI
- [Testing Architecture](../../architecture/09-testing-architecture.md) - Testing strategy

---

## Testing Strategy

**Test Coverage Requirements:**
- All utility functions must have unit tests
- Test success paths and error paths
- Mock filesystem and shell operations where appropriate
- Aim for >80% code coverage on utils

**Example Test:**
```typescript
// tests/unit/utils/filesystem.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFile, writeFile, exists } from '@/utils/filesystem';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('Filesystem Utilities', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'catalyst-test-'));
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should write and read file', async () => {
    const filePath = path.join(testDir, 'test.txt');
    const content = 'Hello, Catalyst!';

    await writeFile(filePath, content);
    const result = await readFile(filePath);

    expect(result).toBe(content);
  });

  it('should check if file exists', async () => {
    const filePath = path.join(testDir, 'test.txt');

    expect(await exists(filePath)).toBe(false);
    await writeFile(filePath, 'content');
    expect(await exists(filePath)).toBe(true);
  });
});
```

---

## Definition of Done

- [x] All acceptance criteria met and verified
- [x] All utility modules implemented
- [x] All functions have JSDoc comments
- [x] All functions have TypeScript types
- [x] All utility modules have comprehensive unit tests
- [x] Tests pass with >80% coverage
- [x] Code follows ESLint and Prettier standards
- [x] Barrel export file created (`src/utils/index.ts`)
- [ ] Code committed with clear commit message
- [x] Story reviewed and accepted by PO

---

## Dev Agent Record

**Agent Model Used:** Claude Sonnet 4.5

### File List
- `src/utils/errors.ts` - Custom error classes (created)
- `src/utils/filesystem.ts` - Filesystem utilities (created)
- `src/utils/shell.ts` - Shell command utilities (created)
- `src/utils/logger.ts` - Logging utilities (created)
- `src/types/index.ts` - Type definitions (created)
- `src/utils/index.ts` - Barrel exports (created)
- `tests/unit/utils/errors.test.ts` - Error tests (created)
- `tests/unit/utils/filesystem.test.ts` - Filesystem tests (created)
- `tests/unit/utils/shell.test.ts` - Shell tests (created)
- `tests/unit/utils/logger.test.ts` - Logger tests (created)

### Completion Notes
- All 4 utility modules implemented with comprehensive JSDoc comments
- All functions use TypeScript types and throw typed errors
- Barrel export created for clean imports
- Type definitions created for Config, ServerConfig, BMadConfig, CommandOptions
- Comprehensive test suites written for all modules (63 tests total)
- Test coverage: 94.06% for utils (exceeds 80% requirement)
  - errors.ts: 99.13%
  - filesystem.ts: 91.86%
  - logger.ts: 100%
  - shell.ts: 100%
- All tests passing
- Build successful with no TypeScript errors
- ESLint passing (warnings only for `any` types in error details, which is acceptable)

### Change Log
- 2025-10-26: Implemented all core utility modules
- 2025-10-26: Created comprehensive test suites with >94% coverage
- 2025-10-26: All acceptance criteria met

---

## QA Results

### Review Date: 2025-10-26

### Reviewed By: James (Full Stack Developer)

**Implementation Quality:** Excellent

- All 4 utility modules implemented with comprehensive JSDoc
- 63 tests total with 94.06% coverage (exceeds 80% requirement)
- All quality checks passing (lint, build, tests)
- Production-ready code with proper error handling

**Test Coverage:**

- errors.ts: 99.13%
- filesystem.ts: 91.86%
- logger.ts: 100%
- shell.ts: 100%

**Code Quality:**

- 0 linting errors (9 acceptable warnings for `any` types)
- TypeScript compilation clean
- Consistent patterns across all modules
- Proper async/await usage throughout

### Gate Status

Gate: PASS → docs/qa/gates/1.4-create-core-utility-modules.yml

---

## Notes

- **Path Aliases:** Use `@/` alias for clean imports (configured in tsconfig.json)
- **Error Handling:** All utilities should throw typed errors, not generic Errors
- **Async Operations:** All I/O operations should be async (return Promises)
- **Testing:** Use temporary directories for filesystem tests (clean up after)
- **Logging Levels:** Consider adding `LOG_LEVEL` environment variable support
- **Future Enhancements:**
  - Progress bars for long operations
  - Parallel filesystem operations
  - Retry logic for shell commands
  - Structured logging (JSON output for CI/CD)

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
