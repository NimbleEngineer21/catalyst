# Story 1.3: Configure Build and Development Scripts

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.3
**Priority:** P0 (Must Have)
**Status:** Done
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
- [x] `npm run build` - compiles TypeScript to `dist/`
  - Runs `tsc` with production settings
  - Generates declaration files
  - Creates source maps
  - Completes without errors (even with no source files yet)
- [x] `npm run build:watch` - rebuilds on file changes
  - Uses `tsc --watch`
  - Provides feedback on compilation status

### 2. Development Scripts
- [x] `npm run dev` - runs development mode with `tsx`
  - Executes `src/cli/index.ts` (or main entry point)
  - Hot-reloads on file changes
  - Provides clear error messages
- [x] `npm run type-check` - validates TypeScript without emitting
  - Runs `tsc --noEmit`
  - Faster than full build for checking types

### 3. Code Quality Scripts
- [x] `npm run lint` - checks code quality with ESLint
  - Lints all `.ts` files in `src/`
  - Reports errors and warnings
  - Exits with error code if issues found
- [x] `npm run lint:fix` - automatically fixes linting issues
  - Applies auto-fixable ESLint rules
  - Reports unfixable issues
- [x] `npm run format` - formats code with Prettier
  - Formats all TypeScript files
  - Overwrites files with correct formatting
- [x] `npm run format:check` - checks if code is formatted
  - Verifies formatting without changing files
  - Used in CI/CD pipeline (future)

### 4. Utility Scripts
- [x] `npm run clean` - removes build artifacts
  - Deletes `dist/` directory
  - Deletes `coverage/` directory
  - Deletes `*.tsbuildinfo` files
  - Uses cross-platform compatible commands
- [x] `npm run clean:all` - removes all generated files
  - Runs `clean` script
  - Also removes `node_modules/`
  - Useful for fresh installs

### 5. Combined Scripts
- [x] `npm run check` - runs all checks (type-check, lint, format:check, test)
  - Sequential execution
  - Stops on first error
  - Useful before committing
- [x] `npm run prepare` - runs after `npm install` (optional)
  - Can be used for post-install setup
  - Currently runs build after install

### 6. CLI Executable
- [x] `bin/catalyst` executable created
  - Contains proper shebang: `#!/usr/bin/env node`
  - Points to compiled entry point: `../dist/cli/index.js`
  - Has executable permissions (`chmod +x`)
  - Works when installed globally via `npm link`

### 7. Package.json Configuration
- [x] `main` field points to `dist/cli/index.js`
- [x] `bin` field configured: `{ "catalyst": "./bin/catalyst" }`
- [x] `types` field points to `dist/cli/index.d.ts`
- [x] `files` array includes distribution files:
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

- [x] All acceptance criteria met and verified
- [x] All npm scripts configured and tested
- [x] `bin/catalyst` executable created and working
- [x] Package.json `main`, `bin`, `files` fields configured
- [x] Cross-platform compatibility considered (use rimraf if needed)
- [x] Scripts documented in comments or README
- [x] Code committed with clear commit message
- [x] Story reviewed and accepted by PO

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

---

## QA Results

### Review Date: 2025-10-26

### Reviewed By: Quinn (Test Architect)

**Validation Tests:**
- Build scripts: PASS (build, build:watch, type-check)
- Development scripts: PASS (dev)
- Code quality scripts: PASS (lint, lint:fix, format, format:check)
- Utility scripts: PASS (clean, clean:all)
- Combined check script: PASS (all steps sequential)
- bin/catalyst executable: PASS

**Findings:**
All acceptance criteria successfully met. Complete npm script ecosystem configured with:
- 17 npm scripts covering build, development, code quality, testing, and utilities
- Package.json properly configured with main, types, bin, and files fields for distribution
- bin/catalyst executable functional with ES module import compatibility
- Minimal CLI entry point created as placeholder for Epic 2
- All validation tests passing: build completes, dev runs, lint passes, format validated, clean removes artifacts, check runs all steps, bin/catalyst executes

Build and development workflow is production-ready for subsequent development stories.

### Gate Status

Gate: PASS → [docs/qa/gates/1.3-configure-build-development-scripts.yml](../../qa/gates/1.3-configure-build-development-scripts.yml)

---

## Dev Agent Record

### Agent Model Used
Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Tasks Completed
- [x] Updated package.json scripts with all required build, dev, quality, utility, and combined scripts
- [x] Configured package.json main, types, bin, and files fields
- [x] Updated bin/catalyst executable to load compiled CLI from dist/cli/index.js
- [x] Set executable permissions on bin/catalyst
- [x] Created minimal src/cli/index.ts entry point with placeholder output
- [x] Tested all build scripts (build, build:watch, type-check)
- [x] Tested all development scripts (dev)
- [x] Tested all code quality scripts (lint, lint:fix, format, format:check)
- [x] Tested all utility scripts (clean, clean:all)
- [x] Tested combined check script (type-check + lint + format:check + test)
- [x] Verified bin/catalyst executable runs successfully

### Debug Log References
None - all tasks completed successfully

### Completion Notes
- All npm scripts configured and operational
- bin/catalyst uses ES module import for dist/cli/index.js compatibility
- Minimal CLI entry point created with placeholder messages for Epic 2
- Cross-platform clean scripts use standard rm -rf (macOS/Linux compatible)
- prepare script configured to run build after npm install
- All validation tests passing: build, dev, lint, format:check, clean, check, bin/catalyst

### File List
**Created:**
- [src/cli/index.ts](../../../src/cli/index.ts)

**Modified:**
- [package.json](../../../package.json) - Added all npm scripts, updated main/types/bin/files fields
- [bin/catalyst](../../../bin/catalyst) - Updated to load compiled CLI with ES module import

### Change Log
- 2025-10-26: All npm scripts configured (build, dev, quality, utility, combined)
- 2025-10-26: Package.json fields updated for distribution
- 2025-10-26: bin/catalyst executable updated and tested
- 2025-10-26: Minimal CLI entry point created
- 2025-10-26: All validation tests passing
- 2025-10-26: Story marked Ready for Review
