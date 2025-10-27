# Contributing to Catalyst

Thank you for your interest in contributing to Catalyst! We welcome contributions from the community and are excited to work with you.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How to Contribute

There are many ways to contribute to Catalyst:

- **Report bugs** - Help us identify and fix issues
- **Suggest features** - Share ideas for new functionality
- **Improve documentation** - Make our docs clearer and more comprehensive
- **Submit code** - Fix bugs or implement new features
- **Review pull requests** - Help others improve their contributions
- **Answer questions** - Help other users in Discussions

## Getting Started

### Reporting Issues

Before creating a new issue:

1. **Search existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide clear reproduction steps** for bugs
4. **Include system information:**
   - Operating System and version
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Catalyst version (`catalyst --version`)
5. **Add relevant labels** to help categorize the issue

### Submitting Pull Requests

Follow these steps to submit a pull request:

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/catalyst.git
cd catalyst
git remote add upstream https://github.com/your-org/catalyst.git
```

#### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

Use descriptive branch names:
- `feature/add-xyz` - New features
- `fix/issue-123` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/cleanup-utils` - Code refactoring
- `test/add-xyz-tests` - Adding tests

#### 3. Set Up Development Environment

Follow the comprehensive guide in [docs/guides/development.md](docs/guides/development.md):

```bash
npm install
npm run build
npm test
```

#### 4. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

#### 5. Test Your Changes

Run the full test suite:

```bash
npm run check
```

This runs:
- Type checking (`npm run type-check`)
- Linting (`npm run lint`)
- Code formatting check (`npm run format:check`)
- All tests (`npm test`)

#### 6. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git commit -m "feat: add amazing new feature"
git commit -m "fix: resolve issue with X"
git commit -m "docs: update installation guide"
git commit -m "test: add tests for utility functions"
git commit -m "refactor: simplify error handling"
git commit -m "chore: update dependencies"
```

**Commit message format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks (dependencies, build config, etc.)
- `perf` - Performance improvements
- `ci` - CI/CD changes

**Examples:**

```
feat(cli): add support for configuration file

Implements YAML-based configuration for the CLI, allowing users
to set default options and customize behavior.

Closes #123
```

```
fix(mcp): resolve connection timeout issue

The MCP server connection was timing out due to incorrect
initialization order. This fix ensures proper sequencing.

Fixes #456
```

#### 7. Push and Create Pull Request

```bash
git push origin feature/amazing-feature
```

Then create a Pull Request on GitHub:

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template
4. Link related issues
5. Request review from maintainers

### Pull Request Guidelines

**Good PRs:**
- Have a clear, descriptive title
- Include a detailed description of changes
- Reference related issues
- Include tests for new functionality
- Update documentation
- Pass all CI checks
- Are focused on a single concern

**PR Checklist:**

- [ ] Code follows project coding standards
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Commit messages follow Conventional Commits
- [ ] No merge conflicts
- [ ] All CI checks passing
- [ ] Changes are backwards compatible (or breaking changes documented)

## Coding Standards

### TypeScript

- **Use TypeScript strict mode** - All code must pass strict type checking
- **Avoid `any`** - Use proper types or `unknown` with type guards
- **Use interfaces for objects** - Prefer interfaces over type aliases for object shapes
- **Leverage type inference** - Don't over-annotate when types can be inferred
- **Use const assertions** - For readonly data: `as const`

### Code Style

We use ESLint and Prettier for consistent code style:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
npm run format      # Format code
npm run format:check # Check formatting
```

**Key conventions:**
- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings
- **Semicolons:** Required
- **Line length:** 100 characters (soft limit)
- **Trailing commas:** Always in multi-line objects/arrays

### Code Organization

- **File naming:** Use kebab-case (`my-file.ts`)
- **Class naming:** PascalCase (`MyClass`)
- **Function naming:** camelCase (`myFunction`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **One export per file** for main functionality (helpers can be co-located)
- **Barrel exports:** Use `index.ts` files to re-export from directories

### Documentation

- **JSDoc comments** for all public functions, classes, and interfaces
- **Inline comments** for complex logic
- **README updates** for user-facing changes
- **Architecture docs** for significant design changes

**Example JSDoc:**

```typescript
/**
 * Validates a configuration file against the schema.
 *
 * @param configPath - Path to the configuration file
 * @param schema - Zod schema to validate against
 * @returns Parsed and validated configuration object
 * @throws {ValidationError} If configuration is invalid
 *
 * @example
 * ```typescript
 * const config = validateConfig('./catalyst.yaml', configSchema);
 * ```
 */
export function validateConfig<T>(
  configPath: string,
  schema: z.ZodSchema<T>
): T {
  // Implementation
}
```

## Testing Requirements

### Test Coverage

- **Aim for >80% coverage** on all new code
- **100% coverage** for utility functions
- **Integration tests** for CLI commands
- **Unit tests** for individual functions and classes

### Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('FeatureName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  describe('functionName', () => {
    it('should handle the happy path', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toBe('expected');
    });

    it('should handle edge cases', () => {
      // Test edge cases
    });

    it('should throw on invalid input', () => {
      // Test error cases
      expect(() => functionName(null)).toThrow();
    });
  });
});
```

### Running Tests

```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
npm run test:ui         # Interactive UI
```

## Documentation Requirements

Update documentation when:

- Adding new features
- Changing existing behavior
- Modifying CLI commands or options
- Updating dependencies with breaking changes
- Changing configuration options

**Documentation to update:**

- `README.md` - User-facing features and installation
- `docs/guides/development.md` - Development workflow changes
- `docs/architecture/` - Architectural decisions and system design
- JSDoc comments - Public API documentation
- Inline comments - Complex implementation details

## Development Setup

See the comprehensive [Development Guide](docs/guides/development.md) for:

- Prerequisites and installation
- Development workflow
- Testing strategies
- Debugging techniques
- Troubleshooting common issues

## Project Structure

```
catalyst/
├── src/               # Source code
│   ├── cli/          # CLI implementation
│   ├── core/         # Core functionality
│   ├── mcp/          # MCP server management
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── tests/            # Test files
│   ├── unit/         # Unit tests
│   ├── integration/  # Integration tests
│   └── fixtures/     # Test fixtures
├── docs/             # Documentation
│   ├── architecture/ # Architecture docs
│   ├── guides/       # User and developer guides
│   ├── prd/          # Product requirements
│   └── stories/      # Development stories
├── templates/        # Project templates
├── mcp-servers/      # Bundled MCP servers
└── bin/              # CLI entry point
```

## Release Process

Releases are managed by project maintainers:

1. Version bump following [Semantic Versioning](https://semver.org/)
2. Update CHANGELOG.md
3. Create release tag
4. Publish to npm (when ready)
5. Update Homebrew formula

## Getting Help

### Documentation

- **[Documentation Index](docs/DOCUMENTATION_INDEX.md)** - All documentation
- **[Development Guide](docs/guides/development.md)** - Development workflow
- **[Architecture](docs/architecture/)** - System design
- **[PRD](docs/prd/)** - Product requirements

### Community

- **Questions:** [GitHub Discussions](https://github.com/your-org/catalyst/discussions)
- **Bug Reports:** [GitHub Issues](https://github.com/your-org/catalyst/issues)
- **Real-time Chat:** [Discord Server](#) *(coming soon)*

### Maintainers

- **@NimbleEngineer21** - Project Lead

## Recognition

Contributors are recognized in:

- Release notes
- CHANGELOG.md
- GitHub contributors page
- Project README

## License

By contributing to Catalyst, you agree that your contributions will be licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

This is a strong copyleft license that requires:
- Source code availability for derivative works
- Same license for modifications
- Network use triggers distribution requirements
- Patent grant to users

See [LICENSE](LICENSE) for full details.

---

**Thank you for contributing to Catalyst!** 🚀

Your contributions help make AI-powered development accessible to everyone.
