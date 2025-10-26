# Story 1.1: Initialize TypeScript Project Structure

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.1
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 4 hours

---

## User Story

**As a** developer,
**I want** the project scaffolded with TypeScript configuration and core directories,
**so that** I can begin implementing features with proper type safety.

---

## Context

This is the foundational story for the entire Catalyst project. It establishes the TypeScript project structure, dependency management, code quality tooling, and core directory organization that all future development will build upon.

**Dependencies:**
- None (first story in the project)

**Enables:**
- Story 1.2: Set Up Testing Infrastructure
- Story 1.3: Configure Build and Development Scripts
- Story 1.4: Create Core Utility Modules
- All subsequent stories in Epic 1

---

## Acceptance Criteria

### 1. TypeScript Configuration
- [ ] `tsconfig.json` created with configuration matching [architecture spec](../../architecture/02-technology-stack.md)
- [ ] Strict mode enabled (`strict: true`)
- [ ] Module resolution set to `node16` or `bundler`
- [ ] Output directory configured to `dist/`
- [ ] Source map generation enabled
- [ ] Declaration files enabled (`declaration: true`)

### 2. Package Configuration
- [ ] `package.json` created with project metadata
- [ ] Name: `catalyst`
- [ ] Version: `2.0.0`
- [ ] License: `AGPL-3.0-or-later`
- [ ] Author: `azywicki <81277290+NimbleEngineer21@users.noreply.github.com>`
- [ ] Dependencies installed:
  - `commander` (CLI framework)
  - `chalk` (terminal colors)
  - `execa` (shell command execution)
  - `fs-extra` (enhanced filesystem operations)
  - `inquirer` (interactive prompts)
  - `ora` (terminal spinners)
  - `yaml` (YAML parsing)
- [ ] Dev dependencies installed:
  - `typescript` (5.3+)
  - `tsx` (TypeScript execution)
  - `@types/node` (Node.js types)
  - `eslint` (linting)
  - `prettier` (formatting)
  - `@typescript-eslint/parser`
  - `@typescript-eslint/eslint-plugin`

### 3. Directory Structure
- [ ] Core directories created:
  ```
  catalyst/
  ├── src/
  │   ├── cli/
  │   ├── core/
  │   ├── mcp/
  │   ├── bmad/
  │   ├── utils/
  │   └── types/
  ├── mcp-servers/
  │   ├── docker/
  │   ├── postgres/
  │   ├── xcode/
  │   ├── storybook/
  │   └── vite/
  ├── bin/
  ├── templates/
  ├── config/
  ├── scripts/
  ├── tests/
  ├── docs/
  └── Formula/
  ```
- [ ] Each directory has proper README.md or placeholder file

### 4. Code Quality Tooling
- [ ] ESLint configured with TypeScript support
- [ ] `.eslintrc.json` or `.eslintrc.js` created
- [ ] Prettier configured
- [ ] `.prettierrc` created with consistent formatting rules
- [ ] `.prettierignore` created (ignore dist/, node_modules/, etc.)
- [ ] ESLint and Prettier rules aligned (no conflicts)

### 5. Git Configuration
- [ ] `.gitignore` created with entries for:
  - `node_modules/`
  - `dist/`
  - `build/`
  - `*.log`
  - `.DS_Store`
  - `.env`
  - `.env.local`
  - `.bmad/` (BMAD working directory)
  - `.ai/` (AI agent logs)
  - `coverage/`
- [ ] `.gitattributes` created (if needed for line endings)

### 6. Initial README
- [ ] Basic `README.md` created with:
  - Project name and tagline
  - Brief description
  - Installation placeholder
  - Development setup placeholder
  - License badge

---

## Technical Implementation Notes

### TypeScript Configuration Example

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "lib": ["ES2022"],
    "moduleResolution": "node16",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### Package.json Scripts (Initial)

```json
{
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\""
  }
}
```

### ESLint Configuration Example

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

---

## Architecture References

- [Technology Stack](../../architecture/02-technology-stack.md) - Full technology decisions
- [Project Structure](../../architecture/10-project-structure.md) - Directory organization
- [Development Workflow](../../architecture/11-development-workflow.md) - Development process

---

## Testing Strategy

**For this story:**
- Manual verification: `npm install` completes successfully
- Manual verification: `tsc` compiles without errors (no source files yet, should succeed)
- Manual verification: `npm run lint` runs without errors
- Manual verification: `npm run format:check` runs successfully

**Future stories will add:**
- Unit tests for utilities (Story 1.4)
- Integration tests (Story 1.2)

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] `npm install` completes successfully
- [ ] TypeScript compiles without errors
- [ ] ESLint and Prettier run without errors
- [ ] All core directories exist with placeholder files
- [ ] `.gitignore` properly configured
- [ ] README.md created with basic content
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- This story sets up the **structure only** - no implementation code yet
- Placeholder README will be replaced in Story 1.7
- Some directories (like `mcp-servers/`) will be populated in Epic 3
- BMAD templates will be added in Story 4.2
- Homebrew formula will be created in Story 5.5

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
