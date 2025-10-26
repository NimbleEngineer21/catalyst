# Technology Stack

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## Definitive Technology Selection

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **CLI Language** | TypeScript | 5.3+ | Type-safe CLI implementation | Single runtime with MCP servers, type safety |
| **Runtime** | Node.js | 20 LTS | JavaScript execution | Already required for MCP servers |
| **CLI Framework** | Commander | 11.x | Command-line parsing | Most popular, simple API, well-documented |
| **Interactive Prompts** | Inquirer | 9.x | User interactions | Rich prompt types, excellent UX |
| **Terminal Styling** | Chalk | 5.x | Colored output | De facto standard for terminal colors |
| **Type Validation** | Zod | 3.x | Runtime type checking | Best TypeScript integration, clear errors |
| **File Operations** | fs-extra | 11.x | Enhanced file I/O | Promisified, additional utilities |
| **Shell Execution** | execa | 8.x | Running shell commands | Better than child_process, cross-platform |
| **YAML Parsing** | js-yaml | 4.x | Configuration files | Standard YAML parser for Node.js |
| **HTTP Client** | axios | 1.x | HTTP requests | Well-established, good error handling |
| **MCP SDK** | @modelcontextprotocol/sdk | latest | MCP protocol | Official Anthropic SDK |
| **Testing Framework** | Vitest | 1.x | Unit/integration tests | Fast, TypeScript native, Vite integration |
| **Mocking** | vitest mocks | built-in | Test mocks | Built into Vitest |
| **Build Tool** | tsc (TypeScript compiler) | 5.3+ | Compilation | Standard TypeScript compilation |
| **Bundler** | esbuild | 0.19+ | Fast bundling (optional) | Fast builds for distribution |
| **Linting** | ESLint | 8.x | Code quality | TypeScript support, customizable |
| **Formatting** | Prettier | 3.x | Code formatting | Consistent code style |
| **Package Manager** | npm | 10+ | Dependency management | Built into Node.js, widely supported |
| **CI/CD** | GitHub Actions | N/A | Automated builds/releases | Free for open source, excellent integration |
| **Distribution** | Homebrew | N/A | macOS package distribution | Standard for macOS developer tools |

---

## Technology Decisions

### Why TypeScript over JavaScript?
- Type safety prevents runtime errors
- Better IDE support and autocomplete
- Easier refactoring
- Shared types between CLI and MCP servers

### Why Commander over alternatives (yargs, oclif)?
- Simpler API than oclif
- More intuitive than yargs
- Large community, well-documented
- Sufficient for our needs

### Why Vitest over Jest?
- Native TypeScript support
- Faster execution
- Better watch mode
- Modern API

---

## Related Sections

- [Overview](01-overview.md) - Architectural goals and patterns
- [CLI Architecture](03-cli-architecture.md) - How these technologies are used in the CLI
- [Build & Release](05-build-and-release.md) - Build tools and deployment
