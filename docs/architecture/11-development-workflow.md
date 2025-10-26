# Development Workflow

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## Prerequisites

- macOS 13.0+ (Ventura or later)
- Node.js 20+
- Git
- Homebrew (for testing installation)

---

## Initial Setup

```bash
# Clone repository
git clone https://github.com/your-org/catalyst.git
cd catalyst

# Install dependencies
npm install

# Build CLI
npm run build

# Install BMAD for development
./scripts/install-bmad.sh

# Build MCP servers
./scripts/build-mcp-servers.sh
```

---

## Development Commands

```bash
# Development mode (with watch)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

## Testing Locally

### Option 1: Development Mode
```bash
# Run CLI in dev mode with ts-node
npm run dev -- setup
npm run dev -- verify
```

### Option 2: Compiled Version
```bash
# Build and run compiled version
npm run build
node dist/index.js setup
```

### Option 3: Global Link
```bash
# Link globally
npm link

# Now can run from anywhere
catalyst setup
catalyst verify

# Unlink when done
npm unlink
```

---

## Package.json Scripts

```json
{
  "name": "catalyst",
  "version": "2.0.0",
  "description": "AI-powered development environment",
  "main": "dist/index.js",
  "bin": {
    "catalyst": "./bin/catalyst"
  },
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc && chmod +x bin/catalyst",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist build",
    "prepare": "npm run build"
  },
  "keywords": ["ai", "development", "mcp", "bmad", "cli"],
  "author": "Catalyst Team",
  "license": "MIT",
  "engines": {
    "node": ">=20.0.0"
  },
  "dependencies": {
    "commander": "^11.1.0",
    "inquirer": "^9.2.12",
    "chalk": "^5.3.0",
    "zod": "^3.22.4",
    "fs-extra": "^11.2.0",
    "execa": "^8.0.1",
    "js-yaml": "^4.1.0",
    "axios": "^1.6.2",
    "@modelcontextprotocol/sdk": "latest"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/fs-extra": "^11.0.4",
    "@types/js-yaml": "^4.0.9",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "vitest": "^1.1.0",
    "@vitest/coverage-v8": "^1.1.0",
    "eslint": "^8.56.0",
    "@typescript-eslint/parser": "^6.15.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "prettier": "^3.1.1"
  }
}
```

---

## Related Sections

- [Technology Stack](02-technology-stack.md) - Development tools and frameworks
- [Testing Architecture](09-testing-architecture.md) - Testing strategies and commands
- [Build & Release](05-build-and-release.md) - Build scripts and CI/CD
