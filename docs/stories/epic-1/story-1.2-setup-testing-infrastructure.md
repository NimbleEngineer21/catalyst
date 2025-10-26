# Story 1.2: Set Up Testing Infrastructure

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.2
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 3 hours

---

## User Story

**As a** developer,
**I want** Vitest configured and ready to use,
**so that** I can write tests alongside implementation.

---

## Context

This story establishes the testing infrastructure for Catalyst using Vitest, a fast unit test framework built on Vite. This enables test-driven development and ensures code quality from the start.

**Dependencies:**
- Story 1.1: Initialize TypeScript Project Structure (must be completed first)

**Enables:**
- Story 1.4: Create Core Utility Modules (will add unit tests)
- All future stories requiring test coverage
- Epic 2, 3, 4 development with proper testing

---

## Acceptance Criteria

### 1. Vitest Installation
- [ ] `vitest` installed as dev dependency
- [ ] `@vitest/ui` installed for visual test interface
- [ ] `@vitest/coverage-v8` installed for coverage reporting
- [ ] `happy-dom` or `jsdom` installed for DOM testing (if needed)

### 2. Vitest Configuration
- [ ] `vitest.config.ts` created in project root
- [ ] Test file patterns configured (`**/*.test.ts`, `**/*.spec.ts`)
- [ ] Coverage settings configured:
  - Coverage provider: `v8`
  - Coverage reporters: `text`, `json`, `html`
  - Coverage thresholds set (optional for now, recommend 80% for future)
- [ ] Test environment configured (node by default)
- [ ] Global setup/teardown configured (if needed)

### 3. Test Directory Structure
- [ ] `tests/` directory structure created:
  ```
  tests/
  ├── unit/
  │   └── .gitkeep
  ├── integration/
  │   └── .gitkeep
  ├── e2e/
  │   └── .gitkeep
  ├── fixtures/
  │   └── .gitkeep
  └── helpers/
      └── .gitkeep
  ```
- [ ] Each subdirectory has `.gitkeep` or README explaining its purpose

### 4. Sample Test File
- [ ] Sample test file created to verify setup: `tests/unit/sample.test.ts`
- [ ] Sample test includes:
  - Basic assertion test
  - Test for TypeScript type checking
  - Example of test structure/organization
- [ ] Sample test passes successfully

### 5. NPM Scripts
- [ ] `npm test` - runs all tests
- [ ] `npm run test:watch` - runs tests in watch mode
- [ ] `npm run test:coverage` - runs tests with coverage report
- [ ] `npm run test:ui` - opens Vitest UI interface
- [ ] All scripts execute successfully

### 6. Coverage Reporting
- [ ] Coverage reports generated in `coverage/` directory
- [ ] `coverage/` added to `.gitignore`
- [ ] HTML coverage report accessible and readable
- [ ] Coverage summary displayed in terminal after test run

---

## Technical Implementation Notes

### Vitest Configuration Example

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/types/**',
      ],
      // Optional thresholds for future enforcement
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 80,
      //   statements: 80,
      // },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Sample Test File

```typescript
// tests/unit/sample.test.ts
import { describe, it, expect } from 'vitest';

describe('Sample Test Suite', () => {
  it('should perform basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('should verify TypeScript types', () => {
    const message: string = 'Hello, Catalyst!';
    expect(typeof message).toBe('string');
  });

  it('should test array operations', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });
});
```

### Package.json Scripts Addition

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## Architecture References

- [Testing Architecture](../../architecture/09-testing-architecture.md) - Complete testing strategy
- [Technology Stack](../../architecture/02-technology-stack.md) - Why Vitest was chosen
- [Development Workflow](../../architecture/11-development-workflow.md) - Testing in the dev workflow

---

## Testing Strategy

**For this story:**
- Run `npm test` - should execute sample test successfully
- Run `npm run test:watch` - should start watch mode
- Run `npm run test:coverage` - should generate coverage report
- Run `npm run test:ui` - should open Vitest UI
- Verify coverage report is readable in `coverage/index.html`

**Success Criteria:**
- All test commands execute without errors
- Sample test passes
- Coverage report generated successfully

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] Vitest installed and configured
- [ ] Test directory structure created
- [ ] Sample test created and passes
- [ ] All npm test scripts work correctly
- [ ] Coverage reporting functional
- [ ] `.gitignore` updated with `coverage/`
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- **Vitest vs Jest:** Vitest chosen for faster performance and native ESM support
- **Coverage thresholds:** Not enforced initially, will be added in future stories
- **Test organization:**
  - `tests/unit/` - Unit tests for individual functions/modules
  - `tests/integration/` - Integration tests for component interactions
  - `tests/e2e/` - End-to-end tests for complete workflows
  - `tests/fixtures/` - Test data and fixtures
  - `tests/helpers/` - Test utilities and helpers
- Sample test will be removed once real tests are added in Story 1.4

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
