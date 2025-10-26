# PRD Shard 04: Technical Architecture

**Parent Document:** [prd.md](prd.md)
**Last Updated:** October 26, 2025

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Component Design](#component-design)
4. [Data Architecture](#data-architecture)
5. [Build & Release Pipeline](#build--release-pipeline)
6. [Security Architecture](#security-architecture)
7. [Scalability & Performance](#scalability--performance)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Tier 1: Distribution Layer                   │
│                      (Homebrew)                              │
│  • Package management via brew                              │
│  • Version resolution and dependencies                      │
│  • Global installation at /opt/homebrew/                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              Tier 2: Global Configuration                    │
│                 (~/.catalyst, ~/.bmad-core)                  │
│                                                             │
│  Catalyst CLI (Ruby)                                        │
│  ├── Installation Manager                                   │
│  ├── Configuration Manager                                  │
│  ├── MCP Server Manager                                     │
│  ├── BMAD Installer                                         │
│  ├── IDE Detector                                           │
│  └── Verification Tools                                     │
│                                                             │
│  MCP Servers (TypeScript/Node.js)                          │
│  ├── Docker MCP (custom)                                    │
│  ├── PostgreSQL MCP (custom)                               │
│  ├── Xcode MCP (custom)                                     │
│  ├── Storybook MCP (custom)                                │
│  ├── Vite MCP (custom)                                      │
│  └── Official/Community MCPs                               │
│                                                             │
│  BMAD Framework                                             │
│  ├── 10 Agent Definitions                                   │
│  ├── 24 Task Templates                                      │
│  ├── 14 Document Templates                                  │
│  └── 6 Workflows                                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│           Tier 3: Per-Project Configuration                 │
│                  (Lightweight)                              │
│                                                             │
│  Project Settings                                           │
│  ├── .catalyst/config.yaml                                  │
│  ├── .bmad-core/core-config.yaml                           │
│  └── .env                                                   │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Principles

1. **Separation of Concerns**
   - CLI tool handles orchestration
   - MCP servers handle tool integration
   - BMAD provides methodology
   - IDE extensions handle UI

2. **Loose Coupling**
   - Components communicate via standard protocols
   - MCP protocol for AI-tool integration
   - YAML for configuration
   - JSON for data exchange

3. **Single Responsibility**
   - Each MCP server handles one domain
   - Each BMAD agent has clear role
   - CLI commands do one thing well

4. **Open/Closed Principle**
   - Open for extension (new MCP servers)
   - Closed for modification (stable core)

5. **Dependency Inversion**
   - Depend on abstractions (MCP protocol)
   - Not concrete implementations
   - Pluggable architecture

---

## Technology Stack

### Core Technologies

#### CLI Tool (TypeScript/Node.js)

**Choice:** TypeScript 5.0+, Node.js 20+
**Rationale:**
- Already required for MCP servers (single runtime)
- Type safety for robust CLI operations
- Excellent ecosystem for CLI tools
- Easy YAML/JSON parsing with type validation
- Good integration with shell commands
- Consistent language across entire codebase
- Lower barrier for contributors (same stack as MCP servers)

**Libraries:**
- `commander` - CLI framework
- `inquirer` or `prompts` - Interactive prompts
- `chalk` - Terminal colors
- `zod` - Runtime type validation
- `yaml` - Configuration parsing
- `fs-extra` - Enhanced file operations
- `execa` - Shell command execution

#### MCP Servers (TypeScript/Node.js)

**Choice:** TypeScript 5.0+, Node.js 20+
**Rationale:**
- Official MCP SDK in TypeScript
- Type safety for complex integrations
- Async/await for I/O operations
- Large ecosystem for integrations
- Cross-platform compatibility

**Libraries:**
- `@modelcontextprotocol/sdk` - MCP SDK
- `zod` - Runtime type validation
- `dockerode` - Docker API client
- `pg` - PostgreSQL client
- Various API clients per server

#### BMAD Integration

**Choice:** npx distribution via `bmad-method`
**Rationale:**
- Official BMAD installation method
- Handles versioning and updates
- Includes all expansion packs
- Well-tested distribution

#### Build System

**Choice:** npm scripts + Bash + GitHub Actions
**Rationale:**
- Simple, auditable build process
- Native to Unix systems
- Easy to debug
- GitHub Actions integration
- npm handles all compilation and dependencies

**Tools:**
- `npm` - Dependency management, build orchestration
- `tsc` - TypeScript compilation
- `tar` - Archive creation
- `shasum` - Checksums

---

## Component Design

### Catalyst CLI

**Location:** `src/index.ts`
**Language:** TypeScript
**Entry Point:** `#!/usr/bin/env node`

**Architecture:**
```
src/
├── index.ts               # Main entry point
├── cli/
│   ├── index.ts           # CLI setup with commander
│   └── commands/
│       ├── setup.ts       # Setup command
│       ├── init.ts        # Init command
│       ├── verify.ts      # Verify command
│       ├── update.ts      # Update command
│       ├── doctor.ts      # Doctor command
│       ├── mcp.ts         # MCP command
│       └── config.ts      # Config command
│
├── core/                  # Core business logic
│   ├── installer.ts       # Installation orchestration
│   ├── configurator.ts    # Config file generation
│   ├── detector.ts        # IDE/extension detection
│   ├── updater.ts         # Update management
│   └── verifier.ts        # Installation verification
│
├── mcp/                   # MCP server management
│   ├── manager.ts         # Server lifecycle
│   ├── registry.ts        # Available servers
│   ├── installer.ts       # Server installation
│   └── tester.ts          # Server validation
│
├── bmad/                  # BMAD integration
│   ├── installer.ts       # npx bmad-method install
│   ├── linker.ts          # Symlink management
│   └── updater.ts         # BMAD version management
│
├── utils/                 # Utilities
│   ├── filesystem.ts      # File operations
│   ├── network.ts         # HTTP/downloads
│   ├── shell.ts           # Shell command execution
│   └── logger.ts          # Logging
│
└── types/                 # TypeScript types
    ├── config.ts          # Configuration types
    └── index.ts           # Exported types
```

**Key Implementation:**

```typescript
// src/index.ts
#!/usr/bin/env node
import { program } from 'commander';
import { setupCommand } from './cli/commands/setup';
import { initCommand } from './cli/commands/init';
import { verifyCommand } from './cli/commands/verify';

program
  .name('catalyst')
  .description('AI-powered development environment')
  .version('2.0.0');

program
  .command('setup')
  .description('Run interactive setup wizard')
  .action(setupCommand);

program
  .command('init')
  .description('Initialize project configuration')
  .action(initCommand);

program
  .command('verify')
  .description('Verify installation')
  .action(verifyCommand);

program.parse();
```

### MCP Servers

Each MCP server follows this structure:

```
mcp-servers/<server-name>/
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # MCP server implementation
│   ├── tools/             # Tool implementations
│   │   ├── tool1.ts
│   │   └── tool2.ts
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
├── tests/
│   ├── server.test.ts
│   └── tools.test.ts
├── dist/                  # Compiled JavaScript (gitignored)
└── README.md
```

**Example Server (Docker MCP):**

```typescript
// mcp-servers/docker/src/server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

export class DockerMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server({
      name: 'docker-mcp-server',
      version: '1.0.0',
    }, {
      capabilities: {
        tools: {},
      },
    });

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => ({
        tools: [
          {
            name: 'docker_ps',
            description: 'List Docker containers',
            inputSchema: { /* ... */ },
          },
          // ... more tools
        ],
      })
    );

    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        // Route to appropriate tool handler
      }
    );
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}
```

### Configuration Files

**Global Configuration (~/.catalyst/config.yaml):**

```yaml
version: "2.0.0"
installed_at: "2025-10-26T12:00:00Z"

ides:
  detected:
    - vscode
    - cursor
  active: vscode

extensions:
  continue:
    enabled: true
    version: "0.8.52"
    config_path: ~/.continue

mcp_servers:
  essential:
    - github
    - git
    - filesystem
    - docker
    - postgres
    - fetch
    - memory

  optional:
    - vite
    - playwright

bmad:
  version: "4.44.1"
  expansion_packs:
    - bmad-2d-unity-game-dev
    - bmad-creative-writing

api_keys:
  github_token: "${CATALYST_GITHUB_TOKEN}"  # References keychain

preferences:
  telemetry: false
  auto_update: true
  log_level: info
```

**Project Configuration (project/.catalyst/config.yaml):**

```yaml
project:
  name: "my-app"
  type: fullstack
  initialized_at: "2025-10-26T14:30:00Z"

tech_stack:
  frontend: react
  backend: nodejs
  database: postgresql

mcp_servers:
  enabled:
    - github
    - docker
    - postgres
    - vite

  config:
    postgres:
      database_url: "${DATABASE_URL}"

bmad:
  workflows:
    - greenfield-fullstack

overrides:
  # Project-specific overrides of global config
```

---

## Data Architecture

### File System Layout

**Global Installation:**
```
/opt/homebrew/Cellar/catalyst/2.0.0/
├── bin/
│   └── catalyst                    # Main executable (Node.js shebang)
├── libexec/
│   ├── dist/                       # Compiled TypeScript CLI
│   │   ├── index.js
│   │   ├── cli/
│   │   ├── core/
│   │   ├── mcp/
│   │   ├── bmad/
│   │   └── utils/
│   ├── node_modules/               # CLI dependencies
│   └── mcp-servers/                # Compiled MCP servers
│       ├── docker/
│       ├── postgres/
│       ├── xcode/
│       ├── storybook/
│       └── vite/
└── share/catalyst/
    ├── bundles/                    # BMAD bundles
    │   ├── bmad-core/
    │   └── bmad-<expansion>/
    └── templates/                  # Config templates
        ├── continue/
        ├── project/
        └── env/
```

**User Home Directory:**
```
~/.catalyst/
├── config.yaml                     # Global configuration
├── cache/                          # Downloaded models, etc.
│   └── lm-studio/
├── logs/                           # Installation logs
│   ├── setup.log
│   └── update.log
└── backups/                        # Configuration backups
    └── bmad_customizations_*.yaml

~/.bmad-core/                       # BMAD installation
├── agents/                         # → symlink to Catalyst bundle
├── tasks/                          # → symlink to Catalyst bundle
├── templates/                      # → symlink to Catalyst bundle
└── workflows/                      # → symlink to Catalyst bundle

~/.continue/                        # Continue.dev config (if used)
├── config.yaml                     # Generated by Catalyst
└── mcp-servers.yaml                # MCP configurations
```

**Project Directory:**
```
project/
├── .catalyst/
│   ├── config.yaml                 # Project configuration
│   └── cache/                      # Project-specific cache
├── .bmad-core/
│   └── core-config.yaml            # BMAD project settings
├── .env                            # Secrets (gitignored)
├── .env.example                    # Template
└── docs/                           # Generated documentation
    ├── prd.md
    ├── architecture.md
    └── stories/
```

### Data Flow

**Installation Flow:**
```
User runs: brew install catalyst
  ↓
Homebrew downloads tarball from GitHub Releases
  ↓
Homebrew extracts to /opt/homebrew/Cellar/catalyst/
  ↓
Homebrew runs post_install script
  ↓
Creates ~/.catalyst/ directory structure
  ↓
User runs: catalyst setup
  ↓
CLI detects environment (IDE, extensions, tools)
  ↓
CLI prompts for configuration
  ↓
CLI runs: npx bmad-method install
  ↓
CLI creates symlinks: ~/.bmad-core → Catalyst bundles
  ↓
CLI generates IDE config files
  ↓
CLI generates MCP server configurations
  ↓
CLI runs verification checks
  ↓
Setup complete
```

**Agent Invocation Flow:**
```
User types: @dev create user model
  ↓
IDE extension (Continue.dev/Claude Code) receives input
  ↓
Extension routes to configured AI model (LM Studio or cloud)
  ↓
AI model receives prompt + available tools (MCP servers)
  ↓
AI decides which tools to use
  ↓
AI calls MCP server (e.g., Filesystem MCP)
  ↓
MCP server executes operation
  ↓
MCP server returns result
  ↓
AI incorporates result into response
  ↓
AI generates code/documentation
  ↓
User sees complete response
```

---

## Build & Release Pipeline

### Build Process

**Triggered by:** Git tag push (e.g., `v2.0.0`)

**GitHub Actions Workflow:**

```yaml
# .github/workflows/release.yml
name: Build and Release Catalyst

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm ci

      - name: Build CLI
        run: npm run build

      - name: Run Tests
        run: npm test

      - name: Install BMAD Method
        run: |
          chmod +x scripts/*.sh
          ./scripts/install-bmad.sh

      - name: Build MCP Servers
        run: ./scripts/build-mcp-servers.sh

      - name: Build Release
        run: ./scripts/build.sh

      - name: Calculate SHA256
        id: sha
        run: |
          SHA=$(shasum -a 256 build/catalyst-*.tar.gz | awk '{print $1}')
          echo "SHA256=$SHA" >> $GITHUB_OUTPUT

      - name: Update Homebrew Formula
        run: |
          VERSION=${GITHUB_REF#refs/tags/v}
          sed -i '' "s/version \".*\"/version \"$VERSION\"/" Formula/catalyst.rb
          sed -i '' "s/sha256 \".*\"/sha256 \"${{ steps.sha.outputs.SHA256 }}\"/" Formula/catalyst.rb

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: build/catalyst-*.tar.gz
          body_path: CHANGELOG.md

      - name: Update Homebrew Tap
        run: |
          git clone https://${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository_owner }}/homebrew-catalyst.git
          cd homebrew-catalyst
          cp ../Formula/catalyst.rb Formula/
          git add Formula/catalyst.rb
          git commit -m "catalyst $VERSION"
          git push
```

### Build Scripts

**scripts/build.sh:**
```bash
#!/bin/bash
set -e

VERSION=$(node -p "require('./package.json').version")

echo "Building Catalyst ${VERSION}..."

# 1. Clean
rm -rf build/
mkdir -p build/catalyst

# 2. Install dependencies (if not already done)
npm ci

# 3. Build CLI
npm run build

# 4. BMAD already installed by install-bmad.sh

# 5. Copy compiled CLI
mkdir -p build/catalyst/dist
cp -r dist/* build/catalyst/dist/

# 6. Copy node_modules (production only)
npm ci --production
cp -r node_modules build/catalyst/

# 7. Copy source files
cp -r bin templates config scripts docs build/catalyst/
cp Formula/catalyst.rb package.json package-lock.json LICENSE README.md build/catalyst/

# 8. Copy MCP servers
mkdir -p build/catalyst/mcp-servers
for server in docker postgres xcode storybook vite; do
  cp -r mcp-servers/${server}/dist build/catalyst/mcp-servers/${server}
done

# 9. Copy BMAD bundles
mkdir -p build/catalyst/bundles
cp -r .bmad-* build/catalyst/bundles/

# 10. Create tarball
cd build
tar -czf "catalyst-${VERSION}.tar.gz" catalyst/

echo "Build complete: build/catalyst-${VERSION}.tar.gz"
```

### Version Management

**Versioning:** Semantic Versioning (SemVer)
- MAJOR: Breaking changes
- MINOR: New features, backwards compatible
- PATCH: Bug fixes

**Version File (package.json):**
```json
{
  "name": "catalyst",
  "version": "2.0.0",
  "description": "AI-powered development environment",
  "bmadVersion": "4.44.1"
}
```

---

## Security Architecture

### Security Principles

1. **Principle of Least Privilege**
   - MCP servers run with minimal permissions
   - File operations restricted to safe paths
   - Network requests validated

2. **Defense in Depth**
   - Multiple layers of validation
   - Input sanitization
   - Output encoding

3. **Secure by Default**
   - Telemetry off by default
   - API keys not required
   - Safe defaults for all options

### API Key Management

**Storage:** macOS Keychain
**Access:** Via security framework

```typescript
// src/utils/keychain.ts
import { execa } from 'execa';

export class Keychain {
  static async store(service: string, account: string, password: string): Promise<void> {
    await execa('security', [
      'add-generic-password',
      '-s', service,
      '-a', account,
      '-w', password,
      '-U'
    ]);
  }

  static async retrieve(service: string, account: string): Promise<string> {
    const { stdout } = await execa('security', [
      'find-generic-password',
      '-s', service,
      '-a', account,
      '-w'
    ], { reject: false });
    return stdout.trim();
  }

  static async delete(service: string, account: string): Promise<void> {
    await execa('security', [
      'delete-generic-password',
      '-s', service,
      '-a', account
    ], { reject: false });
  }
}
```

### MCP Server Sandboxing

**File Access:**
- Restricted to project directory
- Explicit allow-list for system directories
- No write access to system files

**Network Access:**
- HTTPS only for external requests
- Certificate validation required
- Rate limiting on API calls

**Process Isolation:**
- Each MCP server runs in separate process
- No inter-server communication
- Clean shutdown on errors

---

## Scalability & Performance

### Performance Targets

| Operation | Target | Measured |
|-----------|--------|----------|
| CLI startup | < 1s | TBD |
| `catalyst verify` | < 30s | TBD |
| `catalyst setup` | < 5min | TBD |
| MCP tool call | < 2s | TBD |
| BMAD agent response | < 5s | TBD |

### Optimization Strategies

**CLI Optimization:**
- Lazy loading of libraries
- Minimal startup dependencies
- Caching of expensive operations

**MCP Server Optimization:**
- Connection pooling (databases)
- Request caching
- Async operations
- Stream large responses

**BMAD Integration:**
- Symlinks instead of copies
- Lazy template loading
- Incremental updates

### Scalability Considerations

**User Scale:**
- Support 100,000+ installations
- Handle diverse Mac configurations
- Accommodate slow/unreliable networks

**MCP Server Scale:**
- Support 100+ concurrent MCP servers
- Handle large project repositories
- Manage multiple AI model requests

**Data Scale:**
- Large project configurations (1000+ files)
- Extensive BMAD customizations
- Historical update backups

---

## Local Development & Testing

### Development Environment Setup

**Prerequisites:**
- macOS 13.0+ (Ventura or later)
- Homebrew installed
- Xcode Command Line Tools
- Node.js 20+

**Initial Setup:**
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

### Local Testing Without Homebrew

**Option 1: Development Mode (ts-node)**
```bash
# Run CLI in development mode (with TypeScript)
npm run dev -- --version
npm run dev setup --help

# Test setup wizard
npm run dev setup

# Test project initialization
cd /tmp/test-project
/path/to/catalyst/npm run dev init
```

**Option 2: Compiled Version**
```bash
# Build first
npm run build

# Run compiled version
node dist/index.js --version
node dist/index.js setup

# Or use the bin script
./bin/catalyst --version
```

**Option 3: Global Symlink**
```bash
# Link globally for easier testing
npm link

# Now can run from anywhere
catalyst --version
catalyst verify

# Unlink when done
npm unlink
```

### Testing Homebrew Installation Locally

**Step 1: Create Local Tap**
```bash
# Create local Homebrew tap directory
mkdir -p $(brew --prefix)/Homebrew/Library/Taps/local/homebrew-catalyst
cd $(brew --prefix)/Homebrew/Library/Taps/local/homebrew-catalyst

# Copy formula
cp /path/to/catalyst/Formula/catalyst.rb ./
```

**Step 2: Build Local Tarball**
```bash
# In catalyst repository
./scripts/build.sh

# This creates: build/catalyst-2.0.0.tar.gz
```

**Step 3: Update Formula for Local Testing**
```ruby
# Edit Formula/catalyst.rb for local testing
class Catalyst < Formula
  desc "AI-powered development environment"
  homepage "https://github.com/your-org/catalyst"

  # Point to local tarball
  url "file:///path/to/catalyst/build/catalyst-2.0.0.tar.gz"
  sha256 "..." # Run: shasum -a 256 build/catalyst-2.0.0.tar.gz
  version "2.0.0"

  # ... rest of formula
end
```

**Step 4: Test Installation**
```bash
# Install from local tap
brew install local/catalyst/catalyst

# Verify installation
catalyst --version
catalyst verify

# Test full setup
catalyst setup

# Uninstall for clean testing
brew uninstall catalyst
```

### Testing Strategy

**Unit Tests (CLI - TypeScript)**
```bash
# Run CLI unit tests
npm test

# Run specific test file
npm test -- src/core/installer.test.ts

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Unit Tests (MCP Servers)**
```bash
# Test individual MCP server
cd mcp-servers/docker
npm test

# Test all MCP servers (from root)
npm run test:mcp-servers

# Watch mode for development
cd mcp-servers/docker
npm run test:watch
```

**Integration Tests**
```bash
# Test full installation flow
./scripts/test-install.sh

# Test MCP server connectivity
./scripts/test-mcp-servers.sh

# Test BMAD integration
./scripts/test-bmad.sh
```

**E2E Tests**
```bash
# Create test project
mkdir -p /tmp/catalyst-e2e-test
cd /tmp/catalyst-e2e-test

# Run full workflow
catalyst init --type fullstack
# Verify files created
# Test agent invocation (manual in IDE)
# Test MCP servers
catalyst verify

# Cleanup
cd ..
rm -rf /tmp/catalyst-e2e-test
```

### Testing MCP Servers Independently

**Test Docker MCP:**
```bash
cd mcp-servers/docker

# Start MCP server
npm run dev

# In another terminal, test with MCP client
npx @modelcontextprotocol/inspector \
  --server "node dist/index.js"

# Or test specific tool
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | \
  node dist/index.js
```

**Test PostgreSQL MCP:**
```bash
# Set up test database
export DATABASE_URL="postgresql://localhost/catalyst_test"
createdb catalyst_test

cd mcp-servers/postgres
npm run test

# Cleanup
dropdb catalyst_test
```

### Debugging

**Enable Verbose Logging:**
```bash
# CLI verbose mode
catalyst --verbose setup

# MCP server debug mode
DEBUG=mcp:* catalyst verify
```

**Check Configuration:**
```bash
# View global config
cat ~/.catalyst/config.yaml

# View project config
cat .catalyst/config.yaml

# View generated Continue config
cat ~/.continue/config.yaml

# Check BMAD installation
ls -la ~/.bmad-core
```

**Common Issues:**

**Issue: BMAD not found**
```bash
# Solution: Re-run BMAD installation
./scripts/install-bmad.sh

# Verify
ls -la ~/.bmad-core/agents
```

**Issue: MCP server not connecting**
```bash
# Solution: Test server individually
catalyst mcp test docker

# Check logs
tail -f ~/.catalyst/logs/mcp-docker.log
```

**Issue: Homebrew install fails**
```bash
# Solution: Check formula syntax
brew audit --strict Formula/catalyst.rb

# Test formula
brew install --build-from-source Formula/catalyst.rb
```

### Continuous Integration Testing

**GitHub Actions Workflow:**
```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm ci

      - name: Build CLI
        run: npm run build

      - name: Run CLI Tests
        run: npm test

      - name: Install BMAD
        run: ./scripts/install-bmad.sh

      - name: Build MCP Servers
        run: ./scripts/build-mcp-servers.sh

      - name: Run MCP Server Tests
        run: npm run test:mcp-servers

      - name: Build Package
        run: ./scripts/build.sh

      - name: Test Installation
        run: ./scripts/test-install.sh
```

### Manual Testing Checklist

**Pre-Release Testing:**
- [ ] Clean macOS installation test
- [ ] Test with VS Code + Continue.dev
- [ ] Test with Cursor
- [ ] Test with Claude Code
- [ ] Test without any IDE (error handling)
- [ ] Test on Apple Silicon Mac
- [ ] Test on Intel Mac
- [ ] Test with existing BMAD installation
- [ ] Test with existing Catalyst installation (upgrade path)
- [ ] Test project init in various project types
- [ ] Test each MCP server individually
- [ ] Test BMAD agent invocations
- [ ] Test update process
- [ ] Test rollback process
- [ ] Test uninstallation
- [ ] Verify documentation accuracy

---

**Next:** Read [05-mcp-servers.md](05-mcp-servers.md) for detailed MCP server specifications.
