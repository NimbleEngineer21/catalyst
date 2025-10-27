# Catalyst Development Guide

Welcome to the Catalyst development guide! This document provides everything you need to set up your local development environment and start contributing to the project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** - Verify with `node --version`
- **npm 9+** - Verify with `npm --version`
- **Git** - Verify with `git --version`
- **macOS** - Primary development target (Linux/Windows support coming soon)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/catalyst.git
cd catalyst
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including TypeScript, testing frameworks, and development tools.

### 3. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory and sets executable permissions on the CLI binary.

### 4. Run Tests

```bash
npm test
```

Verify everything is working by running the test suite.

## Development Workflow

### Rapid Development with `npm run dev`

For quick iteration during development without building:

```bash
npm run dev -- setup  # Run setup command
npm run dev -- --help # Show help
npm run dev -- init   # Run init command
```

The `dev` script uses `tsx` to execute TypeScript directly, providing faster feedback during development.

### Building and Testing Locally

**1. Make your changes** in `src/`

**2. Run type checking**
```bash
npm run type-check
```

**3. Run tests in watch mode** (recommended during development)
```bash
npm run test:watch
```

**4. Run linting**
```bash
npm run lint
```

**5. Build the project**
```bash
npm run build
```

### Global CLI Testing with npm link

Link your local development version globally to test the CLI as end users will use it:

```bash
npm link
```

Now you can run `catalyst` commands from anywhere:

```bash
catalyst --version
catalyst setup
catalyst --help
catalyst init
```

When you're done testing, unlink the global installation:

```bash
npm unlink -g catalyst
```

**Alternative:** Install locally without linking:

```bash
npm install -g .
```

Then uninstall when done:

```bash
npm uninstall -g catalyst
```

## Testing

### Run All Tests

```bash
npm test
```

Runs the complete test suite using Vitest.

### Run Tests in Watch Mode

```bash
npm run test:watch
```

Automatically re-runs tests when files change. Excellent for TDD workflow.

### Run Tests with Coverage

```bash
npm run test:coverage
```

Generates coverage reports in the `coverage/` directory.

### Run Specific Test File

```bash
npm test -- tests/unit/utils/filesystem.test.ts
```

### Run Tests with UI

```bash
npm run test:ui
```

Opens an interactive browser-based test UI.

### Test MCP Servers

```bash
npm run test:mcp-servers
```

Tests the bundled MCP servers functionality.

## Debugging

### VS Code Debugging

The project includes pre-configured launch configurations in `.vscode/launch.json`:

**To debug the CLI:**
1. Set breakpoints in your TypeScript source files
2. Press `F5` or select **Run > Start Debugging**
3. Choose **"Debug CLI"** from the dropdown
4. The debugger will stop at your breakpoints

**To debug tests:**
1. Set breakpoints in test files
2. Press `F5` or select **Run > Start Debugging**
3. Choose **"Debug Tests"** from the dropdown
4. Tests will run in watch mode with debugging enabled

### Console Debugging

Use the built-in utilities for logging:

```typescript
import { logger } from '@/utils';

logger.debug('Debugging info');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

Enable debug-level logging:

```bash
DEBUG=* npm run dev
```

### Debugging with Node Inspector

For advanced debugging:

```bash
node --inspect-brk ./dist/cli/index.js
```

Then open `chrome://inspect` in Chrome and click "inspect" on your process.

## Common Issues and Solutions

### Command not found after `npm link`

**Problem:** Running `catalyst` after `npm link` gives "command not found"

**Solutions:**
- Check your npm global bin directory: `npm bin -g`
- Ensure the directory is in your PATH
- Try running `npm link` again
- Restart your terminal
- On macOS with nvm, ensure your shell profile is configured correctly

### TypeScript Compilation Errors

**Problem:** Build fails with TypeScript errors

**Solutions:**
- Run `npm run type-check` for detailed error messages
- Check `tsconfig.json` settings
- Verify all imports use correct paths and aliases
- Clear build artifacts: `npm run clean && npm run build`
- Delete `node_modules` and reinstall: `npm run clean:all && npm install`

### Module Resolution Issues

**Problem:** Import statements fail or modules aren't found

**Solutions:**
- Check path aliases in `tsconfig.json` - `@/` should alias to `./src`
- Verify import paths are correct
- Ensure you're using `.js` extensions in import statements (ESM requirement)
- Run `npm run clean && npm run build`

### Permission Errors on `bin/catalyst`

**Problem:** Permission denied when running the CLI

**Solutions:**
- The build script should set permissions automatically
- Manually set: `chmod +x bin/catalyst`
- Check file ownership: `ls -la bin/catalyst`

### Tests Failing Unexpectedly

**Problem:** Tests pass locally but fail in CI, or vice versa

**Solutions:**
- Check Node.js version matches (use `node --version`)
- Clear coverage and rebuild: `npm run clean && npm install && npm test`
- Check for test isolation issues (tests depending on each other)
- Review Vitest configuration in `vitest.config.ts`

### Port Conflicts

**Problem:** Development server or MCP server fails to start

**Solutions:**
- Check what's using the port: `lsof -i :PORT_NUMBER`
- Kill the conflicting process
- Configure alternative ports in your local config

### Environment Variable Issues

**Problem:** CLI can't find templates or configuration

**Solutions:**
- Check environment variables are set correctly
- For local development, the CLI should use relative paths
- Verify `.catalyst/` directory exists in test locations
- Check file permissions

## Best Practices

### Code Quality

- **Write tests first** - Follow TDD when possible
- **Run `npm run check`** before committing - This runs type-check, lint, format-check, and tests
- **Use TypeScript strict mode** - No implicit `any`, proper null checks
- **Leverage utility functions** - Use helpers from `src/utils/` for common operations
- **Document complex logic** - Add JSDoc comments for public APIs

### Testing

- **Unit test all utilities** - Aim for >80% coverage on utility modules
- **Integration test CLI commands** - Ensure commands work end-to-end
- **Mock external dependencies** - Use Vitest mocks for file system, network calls
- **Test error cases** - Don't just test the happy path

### Git Workflow

- **Create feature branches** - `git checkout -b feature/my-feature`
- **Commit often** - Small, focused commits
- **Write clear commit messages** - Follow Conventional Commits format
- **Keep PR scope small** - Easier to review and merge

### Code Organization

- Keep files focused and single-purpose
- Use barrel exports (`index.ts`) for clean imports
- Follow the established project structure
- Place tests alongside source files or in `tests/` mirror structure

## Troubleshooting Checklist

When something isn't working, try these steps in order:

1. **Clean build artifacts**
   ```bash
   npm run clean
   ```

2. **Rebuild the project**
   ```bash
   npm run build
   ```

3. **Run type checking**
   ```bash
   npm run type-check
   ```

4. **Check for linting errors**
   ```bash
   npm run lint
   ```

5. **Run tests**
   ```bash
   npm test
   ```

6. **Full clean and reinstall**
   ```bash
   npm run clean:all
   npm install
   npm run build
   npm test
   ```

## Getting Help

### Documentation

- **[Documentation Index](../DOCUMENTATION_INDEX.md)** - Complete documentation map
- **[Architecture Docs](../architecture/)** - System design and technical architecture
- **[PRD](../prd/)** - Product requirements and specifications
- **[Stories](../stories/)** - Development stories and tasks

### Community

- **Questions & Discussions:** [GitHub Discussions](https://github.com/your-org/catalyst/discussions)
- **Bug Reports:** [GitHub Issues](https://github.com/your-org/catalyst/issues)
- **Contributing:** See [CONTRIBUTING.md](../../CONTRIBUTING.md)

### Quick Reference

| Task | Command |
|------|---------|
| Run CLI in dev mode | `npm run dev -- [args]` |
| Build project | `npm run build` |
| Run all tests | `npm test` |
| Run tests in watch mode | `npm run test:watch` |
| Run linter | `npm run lint` |
| Fix linting issues | `npm run lint:fix` |
| Format code | `npm run format` |
| Type check | `npm run type-check` |
| Run all checks | `npm run check` |
| Clean build artifacts | `npm run clean` |
| Link globally | `npm link` |
| Unlink globally | `npm unlink -g catalyst` |

## Next Steps

Now that you have your development environment set up:

1. **Read the [Architecture Documentation](../architecture/)** to understand the system design
2. **Review [CONTRIBUTING.md](../../CONTRIBUTING.md)** for contribution guidelines
3. **Check [GitHub Issues](https://github.com/your-org/catalyst/issues)** for tasks to work on
4. **Join our [Discussions](https://github.com/your-org/catalyst/discussions)** to connect with the community

Happy coding! 🚀
