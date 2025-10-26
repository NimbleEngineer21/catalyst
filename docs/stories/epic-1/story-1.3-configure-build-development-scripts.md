# Story 1.3: Configure Build and Development Scripts

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.3
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 3 hours

---

## User Story

**As a** developer,
**I want** npm scripts for building, testing, and development,
**so that** I have a consistent workflow.

---

## Context

This story establishes the complete build and development script ecosystem for Catalyst. It enables developers to build, develop, lint, format, and clean the project using standard npm commands.

**Dependencies:**
- Story 1.1: Initialize TypeScript Project Structure (must be completed first)
- Story 1.2: Set Up Testing Infrastructure (test scripts depend on this)

**Enables:**
- Story 1.4: Create Core Utility Modules (will use build scripts)
- Story 1.5: Set Up Local Development Workflow (documents these scripts)
- All future development work

---

## Acceptance Criteria

### 1. Build Scripts
- [ ] `npm run build` - compiles TypeScript to `dist/`
  - Runs `tsc` with production settings
  - Generates declaration files
  - Creates source maps
  - Completes without errors (even with no source files yet)
- [ ] `npm run build:watch` - rebuilds on file changes
  - Uses `tsc --watch`
  - Provides feedback on compilation status

### 2. Development Scripts
- [ ] `npm run dev` - runs development mode with `tsx`
  - Executes `src/cli/index.ts` (or main entry point)
  - Hot-reloads on file changes
  - Provides clear error messages
- [ ] `npm run type-check` - validates TypeScript without emitting
  - Runs `tsc --noEmit`
  - Faster than full build for checking types

### 3. Code Quality Scripts
- [ ] `npm run lint` - checks code quality with ESLint
  - Lints all `.ts` files in `src/`
  - Reports errors and warnings
  - Exits with error code if issues found
- [ ] `npm run lint:fix` - automatically fixes linting issues
  - Applies auto-fixable ESLint rules
  - Reports unfixable issues
- [ ] `npm run format` - formats code with Prettier
  - Formats all TypeScript files
  - Overwrites files with correct formatting
- [ ] `npm run format:check` - checks if code is formatted
  - Verifies formatting without changing files
  - Used in CI/CD pipeline (future)

### 4. Utility Scripts
- [ ] `npm run clean` - removes build artifacts
  - Deletes `dist/` directory
  - Deletes `coverage/` directory
  - Deletes `*.tsbuildinfo` files
  - Uses cross-platform compatible commands
- [ ] `npm run clean:all` - removes all generated files
  - Runs `clean` script
  - Also removes `node_modules/`
  - Useful for fresh installs

### 5. Combined Scripts
- [ ] `npm run check` - runs all checks (type-check, lint, format:check, test)
  - Sequential execution
  - Stops on first error
  - Useful before committing
- [ ] `npm run prepare` - runs after `npm install` (optional)
  - Can be used for post-install setup
  - Currently placeholder for future use

### 6. CLI Executable
- [ ] `bin/catalyst` executable created
  - Contains proper shebang: `#!/usr/bin/env node`
  - Points to compiled entry point: `../dist/cli/index.js`
  - Has executable permissions (`chmod +x`)
  - Works when installed globally via `npm link`

### 7. Package.json Configuration
- [ ] `main` field points to `dist/cli/index.js`
- [ ] `bin` field configured: `{ "catalyst": "./bin/catalyst" }`
- [ ] `types` field points to `dist/cli/index.d.ts`
- [ ] `files` array includes distribution files:
  - `dist/`
  - `bin/`
  - `templates/`
  - `LICENSE`
  - `README.md`

---

## Technical Implementation Notes

### Complete Package.json Scripts Section

```json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "dev": "tsx src/cli/index.ts",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\"",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "clean": "rm -rf dist coverage *.tsbuildinfo",
    "clean:all": "npm run clean && rm -rf node_modules",
    "check": "npm run type-check && npm run lint && npm run format:check && npm test",
    "prepare": "echo 'Post-install setup placeholder'"
  }
}
```

### bin/catalyst Executable

```bash
#!/usr/bin/env node

// Load the compiled CLI entry point
require('../dist/cli/index.js');
```

### Package.json Main/Bin/Files Configuration

```json
{
  "name": "catalyst",
  "version": "0.1.0",
  "description": "AI-powered development environment with BMAD methodology and MCP servers",
  "main": "dist/cli/index.js",
  "types": "dist/cli/index.d.ts",
  "bin": {
    "catalyst": "./bin/catalyst"
  },
  "files": [
    "dist",
    "bin",
    "templates",
    "LICENSE",
    "README.md"
  ],
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### Cross-Platform Clean Script

For Windows compatibility, consider using `rimraf`:

```bash
npm install --save-dev rimraf
```

Then update clean script:
```json
{
  "scripts": {
    "clean": "rimraf dist coverage *.tsbuildinfo"
  }
}
```

---

## Architecture References

- [Build & Release](../../architecture/05-build-and-release.md) - Complete build strategy
- [Development Workflow](../../architecture/11-development-workflow.md) - How scripts fit into workflow
- [CLI Architecture](../../architecture/03-cli-architecture.md) - CLI entry point structure

---

## Testing Strategy

**For this story:**
- Run `npm run build` - should complete successfully (even with no source files)
- Run `npm run type-check` - should pass
- Run `npm run lint` - should run without errors
- Run `npm run format:check` - should pass
- Run `npm run clean` - should remove dist/ directory
- Run `npm run check` - should execute all checks sequentially
- Create placeholder `src/cli/index.ts` file and verify `npm run dev` works
- Verify `bin/catalyst` is executable and has correct permissions

**Success Criteria:**
- All scripts execute without errors
- Scripts provide clear output/feedback
- Cross-platform compatibility verified (macOS initially, Windows/Linux documented)

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] All npm scripts configured and tested
- [ ] `bin/catalyst` executable created and working
- [ ] Package.json `main`, `bin`, `files` fields configured
- [ ] Cross-platform compatibility considered (use rimraf if needed)
- [ ] Scripts documented in comments or README
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- **tsx vs ts-node:** `tsx` chosen for faster startup and better ESM support
- **rimraf:** Consider adding for Windows compatibility in clean scripts
- **Placeholder CLI:** May need to create minimal `src/cli/index.ts` to test `dev` script:
  ```typescript
  // src/cli/index.ts
  console.log('Catalyst CLI - Coming soon!');
  ```
- **npm link testing:** After Story 1.3, developers can run `npm link` to test CLI globally
- **CI/CD:** These scripts will be used in GitHub Actions workflows (Epic 5)
- **Build optimization:** Future stories may add esbuild or other bundlers for faster builds

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
