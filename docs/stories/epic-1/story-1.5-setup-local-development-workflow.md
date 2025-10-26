# Story 1.5: Set Up Local Development Workflow

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.5
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 4 hours

---

## User Story

**As a** developer,
**I want** documentation and scripts for local development,
**so that** I can efficiently develop and test locally.

---

## Context

This story creates comprehensive documentation for the local development workflow, enabling developers to quickly get started, understand the development process, and contribute effectively to Catalyst.

**Dependencies:**
- Story 1.1: Initialize TypeScript Project Structure
- Story 1.2: Set Up Testing Infrastructure
- Story 1.3: Configure Build and Development Scripts
- Story 1.4: Create Core Utility Modules

**Enables:**
- Story 1.6, 1.7, 1.8: OSS Community setup (references this guide)
- Epic 2-6: All future development (developers use this workflow)
- New contributor onboarding

---

## Acceptance Criteria

### 1. Development Guide (`docs/guides/development.md`)
- [ ] Guide created with comprehensive local dev instructions
- [ ] Sections included:
  - Prerequisites
  - Initial Setup
  - Development Workflow
  - Testing Locally
  - Debugging
  - Common Issues and Solutions
  - Best Practices
- [ ] Step-by-step instructions with command examples
- [ ] Screenshots or terminal output examples (optional)
- [ ] Links to relevant architecture docs

### 2. npm link Workflow Documentation
- [ ] `npm link` workflow explained step-by-step:
  1. Clone repository
  2. Install dependencies
  3. Build project
  4. Link globally
  5. Test CLI commands
  6. Unlink when done
- [ ] Troubleshooting section for common `npm link` issues
- [ ] Alternative: Using `npm install -g .` for local testing

### 3. Local Testing Without Homebrew
- [ ] Instructions for testing without Homebrew installation
- [ ] Using `npm run dev` for rapid development
- [ ] Using `node dist/cli/index.js` for compiled testing
- [ ] Environment variable configuration
- [ ] Path to local BMAD templates and MCP servers

### 4. Debugging Instructions
- [ ] VS Code debug configuration (`.vscode/launch.json`)
- [ ] Breakpoint debugging setup
- [ ] Debugging TypeScript source (not compiled JS)
- [ ] Debugging tests with Vitest
- [ ] Console logging best practices
- [ ] Using `DEBUG=*` environment variable

### 5. Common Issues Documentation
- [ ] Common issues and solutions documented:
  - `npm link` not working / command not found
  - TypeScript compilation errors
  - Module resolution issues
  - Permission errors on bin/catalyst
  - Port conflicts (if applicable)
  - Environment variable issues
- [ ] Troubleshooting checklist
- [ ] Where to get help (GitHub Issues, Discussions)

### 6. Contributing Guidelines (`CONTRIBUTING.md`)
- [ ] Contributing guide created in project root
- [ ] Sections included:
  - Code of Conduct reference
  - How to contribute (issues, PRs, discussions)
  - Development setup (link to development.md)
  - Coding standards
  - Commit message conventions
  - Pull request process
  - Testing requirements
  - Documentation requirements
- [ ] Clear, welcoming tone for new contributors
- [ ] Links to relevant docs (architecture, PRD, stories)

---

## Technical Implementation Notes

### Development Guide Structure

```markdown
# Catalyst Development Guide

## Prerequisites

- Node.js 20+ (verify with `node --version`)
- npm 9+ (verify with `npm --version`)
- Git (verify with `git --version`)
- macOS (primary development target)

## Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/catalyst.git
   cd catalyst
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Development Workflow

### Rapid Development with `npm run dev`

For quick iteration without building:

```bash
npm run dev -- setup  # Run setup command
npm run dev -- --help # Show help
```

### Building and Testing Locally

1. **Make your changes** in `src/`

2. **Run type check**
   ```bash
   npm run type-check
   ```

3. **Run tests**
   ```bash
   npm run test:watch
   ```

4. **Build**
   ```bash
   npm run build
   ```

### Global CLI Testing with npm link

Link your local development version globally:

```bash
npm link
```

Now you can run `catalyst` commands:

```bash
catalyst --version
catalyst setup
catalyst --help
```

When done, unlink:

```bash
npm unlink -g catalyst
```

## Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test -- tests/unit/utils/filesystem.test.ts
```

## Debugging

### VS Code Debugging

Use the provided launch configurations in `.vscode/launch.json`:

1. Set breakpoints in TypeScript source
2. Press F5 or select "Debug: Start Debugging"
3. Choose "Debug CLI" or "Debug Tests"

### Console Debugging

Use the logger utility:

```typescript
import { logger } from '@/utils';

logger.debug('Debugging info');
logger.info('Info message');
```

Enable debug logging:

```bash
DEBUG=* npm run dev
```

## Common Issues

### Command not found after npm link

**Solution:**
- Check npm global bin directory: `npm bin -g`
- Ensure it's in your PATH
- Try `npm link` again
- Restart terminal

### TypeScript compilation errors

**Solution:**
- Run `npm run type-check` for detailed errors
- Check `tsconfig.json` settings
- Verify all imports are correct

### Module resolution issues

**Solution:**
- Check path aliases in `tsconfig.json`
- Verify `@/` alias points to `./src`
- Run `npm run clean && npm run build`

## Best Practices

- Write tests for all new functionality
- Run `npm run check` before committing
- Follow TypeScript strict mode
- Use utility functions from `src/utils/`
- Document complex logic with JSDoc comments

## Getting Help

- **Questions:** [GitHub Discussions](https://github.com/your-org/catalyst/discussions)
- **Bugs:** [GitHub Issues](https://github.com/your-org/catalyst/issues)
- **Documentation:** [docs/DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md)
```

### VS Code Launch Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CLI",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["-r", "tsx"],
      "args": ["${workspaceFolder}/src/cli/index.ts"],
      "cwd": "${workspaceFolder}",
      "internalConsoleOptions": "openOnSessionStart",
      "skipFiles": ["<node_internals>/**", "node_modules/**"]
    },
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "test:watch"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### CONTRIBUTING.md Structure

```markdown
# Contributing to Catalyst

Thank you for your interest in contributing to Catalyst! We welcome contributions from the community.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Issues

- Check if the issue already exists
- Use the issue templates
- Provide clear reproduction steps
- Include system information (OS, Node version, etc.)

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the development workflow in [docs/guides/development.md](docs/guides/development.md)
4. Write tests for your changes
5. Ensure all tests pass (`npm test`)
6. Run code quality checks (`npm run check`)
7. Commit with clear messages (see below)
8. Push to your fork
9. Open a Pull Request

### Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `test: add tests`
- `chore: update build scripts`

### Coding Standards

- Follow TypeScript strict mode
- Use ESLint and Prettier (run `npm run lint` and `npm run format`)
- Write JSDoc comments for public APIs
- Write unit tests for new functionality
- Aim for >80% code coverage

### Testing Requirements

- All new features must include tests
- All tests must pass
- Run `npm run test:coverage` to check coverage

### Documentation Requirements

- Update README.md if adding user-facing features
- Update architecture docs if changing system design
- Add JSDoc comments for all public functions/classes
- Update guides if changing development workflow

## Development Setup

See [Development Guide](docs/guides/development.md) for complete setup instructions.

## Getting Help

- **Questions:** [GitHub Discussions](https://github.com/your-org/catalyst/discussions)
- **Real-time chat:** [Discord Server](#) (coming soon)
- **Documentation:** [Documentation Index](docs/DOCUMENTATION_INDEX.md)

## License

By contributing, you agree that your contributions will be licensed under the GNU AGPL v3.0 license.
```

---

## Architecture References

- [Development Workflow](../../architecture/11-development-workflow.md) - Complete workflow details
- [Testing Architecture](../../architecture/09-testing-architecture.md) - Testing strategy
- [Project Structure](../../architecture/10-project-structure.md) - Codebase organization

---

## Testing Strategy

**For this story:**
- Manual verification: Follow development.md guide end-to-end
- Verify `npm link` workflow works correctly
- Test VS Code debug configurations
- Verify all links in documentation are correct
- Ask a team member to follow the guide (if possible)

**Success Criteria:**
- A new developer can follow the guide and start contributing
- All common issues are documented
- VS Code debugging works out of the box

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] `docs/guides/development.md` created and comprehensive
- [ ] `CONTRIBUTING.md` created in project root
- [ ] `.vscode/launch.json` created with debug configurations
- [ ] All documentation tested by following steps
- [ ] Links verified and working
- [ ] Tone is welcoming and clear for new contributors
- [ ] Code committed with clear commit message
- [ ] Story reviewed and accepted by PO

---

## Notes

- **Screenshots:** Consider adding terminal screenshots for clarity
- **Video Tutorial:** Future enhancement - create video walkthrough
- **Dev Containers:** Future enhancement - add .devcontainer for VS Code
- **GitHub Codespaces:** Future enhancement - add Codespaces configuration
- **Update Regularly:** This guide should be updated as development workflow evolves
- **Feedback Loop:** Collect feedback from new contributors and improve guide

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
