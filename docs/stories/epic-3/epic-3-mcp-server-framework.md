# Epic 3: MCP Server Framework & Essential Servers

**Status:** Draft
**Priority:** P0 (Must Have)
**Estimated Stories:** 10
**Dependencies:** Epic 1 (Project Scaffolding), Epic 2 (Core CLI - for MCP management commands)

---

## Epic Goal

Implement the MCP server management framework and all 5 custom MCP servers (Docker, PostgreSQL, Xcode, Storybook, Vite), plus integration with official MCP servers (GitHub, Git, Filesystem, Fetch, Memory), providing users with comprehensive tool integration for AI-assisted development.

---

## Epic Description

This epic delivers the complete MCP server ecosystem for Catalyst, including:

- MCP server registry and management framework
- 5 custom-built MCP servers (Docker, PostgreSQL, Xcode, Storybook, Vite)
- Integration with official MCP servers
- MCP server installation and testing tools
- IDE configuration generation for MCP servers

**Success Criteria:**
- All 5 custom MCP servers are functional
- MCP servers can be installed and tested via CLI
- IDE configurations (Continue.dev, Claude Code) include MCP servers
- Each MCP server has comprehensive tool implementations
- All MCP servers have unit and integration tests
- MCP servers follow consistent architectural patterns

---

## Stories

### 3.1 Implement MCP Server Registry and Manager
**As a** developer,
**I want** a centralized registry of available MCP servers,
**so that** Catalyst can install and manage them consistently.

**Acceptance Criteria:**
1. src/mcp/registry.ts created with server definitions
2. Defines all 12 MCP servers (5 custom + 7 official/community)
3. Server metadata includes name, type, description, dependencies
4. src/mcp/manager.ts created for lifecycle management
5. Supports npm-based servers (npx @modelcontextprotocol/...)
6. Supports binary servers (custom implementations)
7. Server status tracking (installed, active, failed)
8. Unit tests for registry and manager

---

### 3.2 Implement `catalyst mcp` Commands
**As a** user,
**I want** CLI commands to manage MCP servers,
**so that** I can install, remove, and test servers easily.

**Acceptance Criteria:**
1. src/cli/commands/mcp.ts created
2. `catalyst mcp list` shows all servers with status
3. `catalyst mcp install <server>` installs server
4. `catalyst mcp remove <server>` removes server
5. `catalyst mcp test <server>` validates server connectivity
6. src/mcp/installer.ts handles server installation
7. src/mcp/tester.ts validates server functionality
8. Clear progress indicators and error messages

---

### 3.3 Implement MCP IDE Configuration Generator
**As a** user,
**I want** Catalyst to generate IDE-specific MCP configurations,
**so that** my IDE can connect to MCP servers automatically.

**Acceptance Criteria:**
1. Generates Continue.dev config with MCP servers
2. Generates Claude Code config with MCP servers
3. Handles IDE-specific configuration formats
4. Includes only installed/active servers
5. Preserves user customizations during updates
6. Validates generated configurations
7. Creates backup before overwriting configs

---

### 3.4 Build Docker MCP Server
**As a** user,
**I want** to control Docker containers via AI,
**so that** I can manage my development environment through conversation.

**Acceptance Criteria:**
1. mcp-servers/docker/ project created
2. Implements tools: ps, start, stop, restart, logs, build, pull, push
3. Docker Compose support
4. Volume and network management
5. Container stats and health checks
6. Uses dockerode client library
7. Comprehensive error handling
8. Unit tests for all tools
9. Integration tests with real Docker

---

### 3.5 Build PostgreSQL MCP Server
**As a** user,
**I want** to query and manage PostgreSQL databases via AI,
**so that** I can inspect schemas and data through conversation.

**Acceptance Criteria:**
1. mcp-servers/postgres/ project created
2. Implements tools: query, schema_info, list_tables, describe_table, explain_query
3. Connection management with connection pooling
4. Transaction support
5. Query parameterization for security
6. Migration assistance tools
7. Uses pg client library
8. Unit tests for all tools
9. Integration tests with test database

---

### 3.6 Build Xcode MCP Server
**As a** user,
**I want** to build and test iOS/macOS projects via AI,
**so that** I can manage Xcode workflows through conversation.

**Acceptance Criteria:**
1. mcp-servers/xcode/ project created
2. Implements tools: build, test, clean, run_simulator, list_schemes, list_simulators
3. Xcode command-line tools integration
4. Swift Package Manager support
5. Build log parsing and error reporting
6. Simulator management
7. Uses execa for xcodebuild commands
8. Unit tests for all tools
9. Integration tests with sample Xcode project

---

### 3.7 Build Storybook MCP Server
**As a** user,
**I want** to manage Storybook components via AI,
**so that** I can interact with component documentation through conversation.

**Acceptance Criteria:**
1. mcp-servers/storybook/ project created
2. Implements tools: list_stories, run_tests, build, start_server
3. Story metadata extraction
4. Interaction test execution
5. Visual regression test support
6. Static build export
7. Storybook CLI integration
8. Unit tests for all tools
9. Integration tests with sample Storybook project

---

### 3.8 Build Vite MCP Server
**As a** user,
**I want** to run Vite builds and tests via AI,
**so that** I can manage frontend tooling through conversation.

**Acceptance Criteria:**
1. mcp-servers/vite/ project created
2. Implements tools: build, test, coverage, dev_server, preview
3. Vitest test execution
4. Coverage report generation
5. Build optimization info
6. Dev server management
7. Vite CLI integration
8. Unit tests for all tools
9. Integration tests with sample Vite project

---

### 3.9 Configure Official MCP Servers
**As a** user,
**I want** access to official MCP servers (GitHub, Git, Filesystem, Fetch, Memory),
**so that** I have comprehensive tool integration.

**Acceptance Criteria:**
1. GitHub MCP configured (@modelcontextprotocol/server-github)
2. Git MCP configured (@modelcontextprotocol/server-git)
3. Filesystem MCP configured (@modelcontextprotocol/server-filesystem)
4. Fetch MCP configured (@modelcontextprotocol/server-fetch)
5. Memory MCP configured (@modelcontextprotocol/server-memory)
6. Installation scripts handle npm-based servers
7. Configuration includes necessary environment variables
8. Testing validates connectivity for each server

---

### 3.10 Implement MCP Server Testing Framework
**As a** developer,
**I want** a consistent testing approach for all MCP servers,
**so that** we can ensure reliability and quality.

**Acceptance Criteria:**
1. scripts/test-mcp-servers.sh created
2. Tests each MCP server independently
3. Uses MCP Inspector for validation
4. Verifies tool list requests
5. Tests sample tool invocations
6. Validates error handling
7. Integration with CI/CD pipeline
8. Generates test reports

---

## Epic Dependencies

**Depends On:**
- Epic 1: Project Scaffolding (TypeScript setup, build tools)
- Epic 2: Core CLI (MCP management commands)

**Enables:**
- Epic 4: BMAD Integration (BMAD agents use MCP servers)
- Epic 6: Documentation (MCP server documentation)

---

## Technical Notes

**Key Technologies:**
- @modelcontextprotocol/sdk - Official MCP SDK
- dockerode - Docker API client
- pg - PostgreSQL client
- execa - Shell command execution for Xcode, Storybook, Vite
- Zod - Runtime type validation

**Architecture References:**
- [MCP Server Architecture](../architecture/04-mcp-server-architecture.md)
- [PRD Features: MCP Servers](../prd/03-features-and-requirements.md#mcp-server-features)
- [Integration Architecture](../architecture/06-integration-architecture.md)

**MCP Server Standards:**
- Each server has consistent structure (src/, tests/, package.json, tsconfig.json)
- All tools use Zod for input validation
- All tools return MCP-compliant responses
- Error handling follows MCP protocol
- Each server is independently testable

**Testing Standards:**
- Unit tests for each tool
- Integration tests with real services where possible
- Mock external dependencies in unit tests
- Test error scenarios comprehensively

---

## Definition of Done

- [ ] All 10 stories completed and acceptance criteria met
- [ ] 5 custom MCP servers fully implemented and tested
- [ ] 7 official MCP servers configured and validated
- [ ] `catalyst mcp list` shows all servers
- [ ] `catalyst mcp test <server>` passes for all servers
- [ ] IDE configurations include all MCP servers
- [ ] Unit tests achieve 80%+ coverage for MCP servers
- [ ] Integration tests validate real-world usage
- [ ] MCP server documentation complete
- [ ] All servers follow consistent architectural patterns
