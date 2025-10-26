# Story 2.1: Implement Main CLI Entry Point

**Epic:** Epic 2 - Core CLI Implementation
**Story ID:** 2.1
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 4 hours

---

## User Story

**As a** user,
**I want** a functional `catalyst` command with help and version info,
**so that** I can access all Catalyst functionality from the command line.

---

## Context

This story creates the main CLI entry point using Commander.js, establishing the foundation for all CLI commands. It provides basic version and help functionality, and sets up the command structure that will be expanded in subsequent stories.

**Dependencies:**
- Epic 1 Complete (Project Scaffolding)
- Story 1.1: Initialize TypeScript Project Structure
- Story 1.3: Configure Build and Development Scripts
- Story 1.4: Create Core Utility Modules

**Enables:**
- Story 2.5: Implement `catalyst setup` Command (registers setup command)
- Story 2.6: Implement `catalyst init` Command (registers init command)
- Story 2.7: Implement `catalyst verify` Command (registers verify command)
- Story 2.8: Implement `catalyst config` Command (registers config command)
- All future CLI commands

---

## Acceptance Criteria

### 1. Main Entry Point (`src/cli/index.ts`)
- [ ] File created as main CLI entry point
- [ ] Imports Commander.js and configures program
- [ ] Program name set to "catalyst"
- [ ] Program description set with clear, concise explanation
- [ ] Program version extracted from package.json
- [ ] Error handling for uncaught exceptions
- [ ] TypeScript types properly defined

### 2. Commander.js Configuration
- [ ] Program configured with:
  ```typescript
  program
    .name('catalyst')
    .description('AI-powered development environment with BMAD methodology')
    .version(version, '-v, --version', 'Display version number')
  ```
- [ ] Global options configured (if any)
- [ ] Help command customization (if needed)
- [ ] Unknown command handler implemented

### 3. Version Command
- [ ] `catalyst --version` displays version from package.json
- [ ] `catalyst -v` works as alias
- [ ] Version format: `0.1.0` (semver)
- [ ] Version read dynamically from package.json

### 4. Help Command
- [ ] `catalyst --help` shows available commands
- [ ] `catalyst -h` works as alias
- [ ] Help output is clear and well-formatted
- [ ] Lists all registered commands with descriptions
- [ ] Shows usage examples
- [ ] Shows available options

### 5. Executable Configuration
- [ ] `bin/catalyst` properly points to compiled output
- [ ] Shebang is correct: `#!/usr/bin/env node`
- [ ] File has executable permissions
- [ ] Works when installed globally via `npm link`
- [ ] Works when installed via Homebrew (verified after Epic 5)

### 6. Error Handling
- [ ] Unknown commands show helpful error message
- [ ] Suggests closest matching command (fuzzy match)
- [ ] Exits with code 1 on error
- [ ] Uncaught exceptions handled gracefully
- [ ] Stack traces shown only in debug mode

### 7. Command Registration Structure
- [ ] Command registration pattern established
- [ ] Placeholder for future commands:
  ```typescript
  // Future commands will be registered here
  // program.command('setup').description('...').action(...)
  // program.command('init').description('...').action(...)
  ```
- [ ] Clean separation of concerns (commands in separate files)

---

## Technical Implementation Notes

### Main Entry Point Example

```typescript
// src/cli/index.ts
#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';
import { logger } from '@/utils';

// Read version from package.json
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf-8')
);
const version = packageJson.version;

// Create CLI program
const program = new Command();

program
  .name('catalyst')
  .description('AI-powered development environment with BMAD methodology and MCP servers')
  .version(version, '-v, --version', 'Display version number');

// Global options
program.option('-d, --debug', 'Enable debug output');

// Command registration (placeholders for future commands)
// TODO: Story 2.5 - Register 'setup' command
// TODO: Story 2.6 - Register 'init' command
// TODO: Story 2.7 - Register 'verify' command
// TODO: Story 2.8 - Register 'config' command
// TODO: Epic 3 - Register 'mcp' commands
// TODO: Epic 4 - Register 'bmad' commands

// Unknown command handler
program.on('command:*', (operands) => {
  logger.error(`Unknown command: ${operands[0]}`);
  logger.info('Run "catalyst --help" to see available commands');
  process.exit(1);
});

// Error handling
process.on('uncaughtException', (error) => {
  logger.error(`Unexpected error: ${error.message}`);
  if (program.opts().debug) {
    console.error(error.stack);
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled promise rejection: ${reason}`);
  process.exit(1);
});

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
```

### bin/catalyst Executable

```javascript
#!/usr/bin/env node

// Load the compiled CLI entry point
require('../dist/cli/index.js');
```

### Package.json Updates

Ensure bin field is configured:

```json
{
  "bin": {
    "catalyst": "./bin/catalyst"
  },
  "main": "dist/cli/index.js"
}
```

### Commander.js Command Structure

For future stories, commands will be registered like:

```typescript
import { setupCommand } from './commands/setup';
import { initCommand } from './commands/init';
import { verifyCommand } from './commands/verify';
import { configCommand } from './commands/config';

// Register commands
program.addCommand(setupCommand);
program.addCommand(initCommand);
program.addCommand(verifyCommand);
program.addCommand(configCommand);
```

---

## Architecture References

- [CLI Architecture](../../architecture/03-cli-architecture.md) - Complete CLI design
- [Technology Stack](../../architecture/02-technology-stack.md) - Why Commander.js
- [PRD: User Experience](../../prd/07-user-experience.md) - CLI command design

---

## Testing Strategy

### Unit Tests

```typescript
// tests/unit/cli/index.test.ts
import { describe, it, expect, vi } from 'vitest';
import { exec } from '@/utils/shell';

describe('CLI Entry Point', () => {
  it('should display version with --version', async () => {
    const { stdout } = await exec('node', ['dist/cli/index.js', '--version']);
    expect(stdout).toMatch(/\d+\.\d+\.\d+/);
  });

  it('should display help with --help', async () => {
    const { stdout } = await exec('node', ['dist/cli/index.js', '--help']);
    expect(stdout).toContain('catalyst');
    expect(stdout).toContain('Usage:');
  });

  it('should show error for unknown command', async () => {
    try {
      await exec('node', ['dist/cli/index.js', 'unknown-command']);
    } catch (error: any) {
      expect(error.stderr).toContain('Unknown command');
    }
  });
});
```

### Manual Testing

```bash
# Build the project
npm run build

# Link CLI globally
npm link

# Test version
catalyst --version
catalyst -v

# Test help
catalyst --help
catalyst -h

# Test unknown command
catalyst invalid-command
# Should show error and suggest help

# Test no arguments
catalyst
# Should show help

# Clean up
npm unlink -g catalyst
```

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] `src/cli/index.ts` created with Commander.js setup
- [ ] `catalyst --version` displays correct version
- [ ] `catalyst --help` shows clear help output
- [ ] Unknown commands handled gracefully
- [ ] Error handling for uncaught exceptions
- [ ] `bin/catalyst` executable configured correctly
- [ ] Unit tests written and passing
- [ ] Manual testing completed with `npm link`
- [ ] Code follows ESLint and Prettier standards
- [ ] TypeScript compiles without errors
- [ ] Documentation comments added
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- **No Commands Yet:** This story only sets up the CLI framework - actual commands are added in Stories 2.5-2.8
- **Commander.js Version:** Using Commander v11+ with TypeScript support
- **Global Options:** `-d, --debug` flag can be expanded in future stories
- **Help Customization:** Commander.js provides good defaults, customize if needed
- **Version Source:** Always read from package.json (single source of truth)
- **Error Codes:** Follow Unix convention (0 = success, 1 = error)
- **Future Enhancements:**
  - Add `--quiet` flag for suppressing output
  - Add `--json` flag for machine-readable output
  - Add command aliases (e.g., `cat setup` → `catalyst setup`)
  - Add shell completion generation
  - Add update notification (check for newer versions)

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
