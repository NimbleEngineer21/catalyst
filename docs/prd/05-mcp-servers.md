# PRD Shard 05: MCP Servers Specifications

**Parent Document:** [prd.md](prd.md)
**Last Updated:** October 26, 2025

---

## Table of Contents

1. [MCP Server Overview](#mcp-server-overview)
2. [Essential Servers (Tier 1)](#essential-servers-tier-1)
3. [Development Tool Servers (Tier 2)](#development-tool-servers-tier-2)
4. [Custom Server Specifications](#custom-server-specifications)
5. [Server Configuration](#server-configuration)
6. [Testing & Quality](#testing--quality)

---

## MCP Server Overview

### MCP Protocol Basics

**Model Context Protocol (MCP)** is a standardized protocol for connecting AI models to external tools and data sources.

**Key Concepts:**
- **Server:** Exposes tools, resources, and prompts
- **Client:** AI model that can invoke tools
- **Tools:** Callable functions with defined schemas
- **Resources:** Data sources (files, databases, APIs)
- **Prompts:** Pre-defined prompt templates

**Transport Mechanisms:**
- **stdio:** Communication via standard input/output
- **SSE:** Server-Sent Events over HTTP

### Server Classification

**Tier 1: Essential (P0)**
- Installed by default
- Core development functionality
- Must be stable and reliable
- 7 servers total

**Tier 2: Development Tools (P1)**
- Optional, installed based on project type
- Enhance specific workflows
- Can be added later
- 10+ servers

**Tier 3: Specialized (P2)**
- Community or third-party
- Domain-specific use cases
- Not bundled with Catalyst
- 15+ available

---

## Essential Servers (Tier 1)

### 1. GitHub MCP Server

**Status:** Official (@modelcontextprotocol/server-github)
**Priority:** P0
**Transport:** stdio

**Purpose:**
Complete GitHub integration for repository operations, issue tracking, pull requests, and CI/CD workflows.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `create_issue` | Create new issue | title, body, labels, assignees | issue number, URL |
| `update_issue` | Update existing issue | issue_number, title, body, state | success |
| `list_issues` | Search/list issues | repo, state, labels, assignee | issue list |
| `create_pull_request` | Create PR | title, body, head, base | PR number, URL |
| `update_pull_request` | Update PR | pr_number, title, body, state | success |
| `merge_pull_request` | Merge PR | pr_number, merge_method | success |
| `list_pull_requests` | List PRs | repo, state, head, base | PR list |
| `get_file_contents` | Read file from repo | repo, path, ref | file contents |
| `create_or_update_file` | Write file to repo | repo, path, content, message | commit SHA |
| `create_branch` | Create new branch | repo, branch, from_branch | success |
| `list_commits` | Get commit history | repo, branch, since, until | commit list |
| `get_workflow_runs` | Get GitHub Actions runs | repo, workflow_id, status | run list |

**Configuration:**
```yaml
name: GitHub
type: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-github"]
env:
  GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"
```

**Requirements:**
- REQ-MCP-GH-1: GitHub personal access token with repo scope
- REQ-MCP-GH-2: Handle API rate limiting gracefully
- REQ-MCP-GH-3: Support both personal and organization repositories
- REQ-MCP-GH-4: Cache responses where appropriate

---

### 2. Git MCP Server

**Status:** Official (@modelcontextprotocol/server-git)
**Priority:** P0
**Transport:** stdio

**Purpose:**
Local Git repository operations for version control.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `git_status` | Show working tree status | repo_path | status output |
| `git_diff` | Show changes | repo_path, file, staged | diff output |
| `git_log` | Show commit history | repo_path, max_count, since | commit list |
| `git_add` | Stage changes | repo_path, files | success |
| `git_commit` | Create commit | repo_path, message, author | commit SHA |
| `git_branch` | List/create branches | repo_path, name, checkout | branch list |
| `git_checkout` | Switch branches | repo_path, branch, create | success |
| `git_merge` | Merge branches | repo_path, branch, message | success |
| `git_pull` | Pull from remote | repo_path, remote, branch | success |
| `git_push` | Push to remote | repo_path, remote, branch, force | success |

**Configuration:**
```yaml
name: Git
type: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-git"]
```

**Requirements:**
- REQ-MCP-GIT-1: Detect Git repository automatically
- REQ-MCP-GIT-2: Handle merge conflicts gracefully
- REQ-MCP-GIT-3: Support Git hooks
- REQ-MCP-GIT-4: Provide clear error messages

---

### 3. Filesystem MCP Server

**Status:** Official (@modelcontextprotocol/server-filesystem)
**Priority:** P0
**Transport:** stdio

**Purpose:**
Safe file system operations with access controls.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `read_file` | Read file contents | path | file contents |
| `write_file` | Write file contents | path, contents | success |
| `list_directory` | List directory contents | path, recursive | file list |
| `create_directory` | Create directory | path | success |
| `delete_file` | Delete file | path | success |
| `move_file` | Move/rename file | from_path, to_path | success |
| `search_files` | Search for files | pattern, directory | matching files |
| `get_file_info` | Get file metadata | path | size, modified, permissions |

**Configuration:**
```yaml
name: Filesystem
type: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-filesystem"]
env:
  ALLOWED_DIRECTORIES: "${HOME}/Projects,/tmp"
```

**Requirements:**
- REQ-MCP-FS-1: Restrict access to allowed directories only
- REQ-MCP-FS-2: Prevent writes to system directories
- REQ-MCP-FS-3: Handle large files efficiently
- REQ-MCP-FS-4: Support binary and text files

---

### 4. Docker MCP Server (Custom)

**Status:** Custom Built
**Priority:** P0
**Transport:** stdio
**Language:** TypeScript

**Purpose:**
Container and image management for local development environments.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `docker_ps` | List containers | all, filters | container list |
| `docker_start` | Start container | container_id | success |
| `docker_stop` | Stop container | container_id, timeout | success |
| `docker_restart` | Restart container | container_id | success |
| `docker_logs` | Get container logs | container_id, tail, follow | logs |
| `docker_exec` | Execute command | container_id, command | output |
| `docker_images` | List images | filters | image list |
| `docker_pull` | Pull image | image_name, tag | success |
| `docker_build` | Build image | dockerfile_path, tag, args | image_id |
| `docker_compose_up` | Start services | compose_file, services | success |
| `docker_compose_down` | Stop services | compose_file, volumes | success |
| `docker_stats` | Container stats | container_id | CPU, memory, network |

**Configuration:**
```yaml
name: Docker
type: stdio
command: /opt/homebrew/opt/catalyst/libexec/mcp-servers/docker/bin/docker-mcp
```

**Implementation:**
```typescript
// mcp-servers/docker/src/tools/docker-ps.ts
import Docker from 'dockerode';
import { z } from 'zod';

const InputSchema = z.object({
  all: z.boolean().optional(),
  filters: z.record(z.string()).optional(),
});

export async function dockerPs(input: z.infer<typeof InputSchema>) {
  const docker = new Docker();
  const containers = await docker.listContainers({
    all: input.all ?? false,
    filters: input.filters ?? {},
  });

  return {
    containers: containers.map(c => ({
      id: c.Id.substring(0, 12),
      name: c.Names[0].replace(/^\//, ''),
      image: c.Image,
      status: c.Status,
      state: c.State,
      ports: c.Ports,
    })),
  };
}
```

**Requirements:**
- REQ-MCP-DOCKER-1: Require Docker Desktop installed and running
- REQ-MCP-DOCKER-2: Handle Docker daemon errors gracefully
- REQ-MCP-DOCKER-3: Support Docker Compose files
- REQ-MCP-DOCKER-4: Stream logs efficiently

---

### 5. PostgreSQL MCP Server (Custom)

**Status:** Custom Built
**Priority:** P0
**Transport:** stdio
**Language:** TypeScript

**Purpose:**
Database operations, schema management, and query execution.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `pg_query` | Execute SQL query | query, params | rows, row_count |
| `pg_schema` | Get database schema | table_name | columns, indexes, constraints |
| `pg_tables` | List all tables | schema | table list |
| `pg_explain` | Explain query plan | query | execution plan |
| `pg_transaction` | Execute transaction | queries | success |
| `pg_create_table` | Create table | table_def | success |
| `pg_insert` | Insert rows | table, rows | inserted_count |
| `pg_update` | Update rows | table, set, where | updated_count |
| `pg_delete` | Delete rows | table, where | deleted_count |

**Configuration:**
```yaml
name: PostgreSQL
type: stdio
command: /opt/homebrew/opt/catalyst/libexec/mcp-servers/postgres/bin/postgres-mcp
env:
  DATABASE_URL: "${DATABASE_URL}"
```

**Implementation:**
```typescript
// mcp-servers/postgres/src/tools/pg-query.ts
import { Pool } from 'pg';
import { z } from 'zod';

const InputSchema = z.object({
  query: z.string(),
  params: z.array(z.any()).optional(),
});

export async function pgQuery(input: z.infer<typeof InputSchema>) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const result = await pool.query(input.query, input.params);
    return {
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields.map(f => ({
        name: f.name,
        dataType: f.dataTypeID,
      })),
    };
  } finally {
    await pool.end();
  }
}
```

**Requirements:**
- REQ-MCP-PG-1: Require DATABASE_URL environment variable
- REQ-MCP-PG-2: Use connection pooling for performance
- REQ-MCP-PG-3: Support prepared statements
- REQ-MCP-PG-4: Prevent SQL injection
- REQ-MCP-PG-5: Handle large result sets

---

### 6. Fetch MCP Server

**Status:** Official (@modelcontextprotocol/server-fetch)
**Priority:** P0
**Transport:** stdio

**Purpose:**
Web content retrieval and API requests.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `fetch` | HTTP GET request | url, headers | response body |
| `fetch_html_to_markdown` | Convert HTML to MD | url | markdown content |
| `post` | HTTP POST request | url, body, headers | response |

**Configuration:**
```yaml
name: Fetch
type: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-fetch"]
```

**Requirements:**
- REQ-MCP-FETCH-1: Follow redirects by default
- REQ-MCP-FETCH-2: Handle various content types
- REQ-MCP-FETCH-3: Respect robots.txt
- REQ-MCP-FETCH-4: Rate limit requests

---

### 7. Memory MCP Server

**Status:** Official (@modelcontextprotocol/server-memory)
**Priority:** P0
**Transport:** stdio

**Purpose:**
Persistent knowledge graph for context across sessions.

**Tools:**

| Tool Name | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| `store_entity` | Store entity | name, type, properties | entity_id |
| `retrieve_entity` | Get entity | entity_id | entity data |
| `create_relationship` | Link entities | from_id, to_id, type | relationship_id |
| `query_graph` | Query knowledge graph | query | matching entities |
| `forget` | Remove entity | entity_id | success |

**Configuration:**
```yaml
name: Memory
type: stdio
command: npx
args: ["-y", "@modelcontextprotocol/server-memory"]
```

**Requirements:**
- REQ-MCP-MEM-1: Persist data between sessions
- REQ-MCP-MEM-2: Support graph queries
- REQ-MCP-MEM-3: Handle large knowledge bases
- REQ-MCP-MEM-4: Provide data export/import

---

## Development Tool Servers (Tier 2)

### 8. Vite MCP Server (Custom)

**Status:** Custom Built
**Priority:** P1
**Transport:** stdio

**Purpose:**
Frontend development with Vite, Vitest testing, and build operations.

**Tools:**
- `vite_test` - Run Vitest tests
- `vite_coverage` - Generate coverage report
- `vite_build` - Build for production
- `vite_preview` - Preview production build
- `vite_dev_start` - Start dev server
- `vite_dev_stop` - Stop dev server

**Requirements:**
- REQ-MCP-VITE-1: Detect Vite projects automatically
- REQ-MCP-VITE-2: Stream test output in real-time
- REQ-MCP-VITE-3: Support custom Vite configs
- REQ-MCP-VITE-4: Handle build errors gracefully

---

### 9. Storybook MCP Server (Custom)

**Status:** Custom Built
**Priority:** P1
**Transport:** stdio

**Purpose:**
Component development, testing, and documentation.

**Tools:**
- `storybook_list_stories` - List all stories
- `storybook_test` - Run interaction tests
- `storybook_build` - Build static Storybook
- `storybook_start` - Start dev server

**Requirements:**
- REQ-MCP-SB-1: Support React, Vue, Angular
- REQ-MCP-SB-2: Run interaction tests
- REQ-MCP-SB-3: Generate accessibility reports
- REQ-MCP-SB-4: Export component docs

---

### 10. Xcode MCP Server (Custom)

**Status:** Custom Built
**Priority:** P1
**Transport:** stdio
**Platform:** macOS only

**Purpose:**
iOS/macOS development with Xcode.

**Tools:**
- `xcode_build` - Build project
- `xcode_test` - Run tests
- `xcode_simulator_list` - List simulators
- `xcode_simulator_boot` - Start simulator
- `xcode_archive` - Create archive

**Requirements:**
- REQ-MCP-XCODE-1: Require Xcode installed
- REQ-MCP-XCODE-2: Support Swift Package Manager
- REQ-MCP-XCODE-3: Handle code signing
- REQ-MCP-XCODE-4: Stream build output

---

### 11. Playwright MCP Server

**Status:** Official (@playwright/mcp)
**Priority:** P1
**Transport:** stdio

**Purpose:**
Browser automation and E2E testing.

**Tools:**
- `playwright_navigate` - Navigate to URL
- `playwright_click` - Click element
- `playwright_screenshot` - Capture screenshot
- `playwright_evaluate` - Execute JavaScript
- `playwright_test` - Run E2E tests

**Configuration:**
```yaml
name: Playwright
type: stdio
command: npx
args: ["@playwright/mcp", "--browser", "chromium"]
```

---

### 12. Figma MCP Server

**Status:** Official (@figma/mcp-server-figma)
**Priority:** P1
**Transport:** sse

**Purpose:**
Design-to-code automation.

**Tools:**
- `figma_get_file` - Get Figma file data
- `figma_get_components` - Extract components
- `figma_generate_code` - Generate code from design
- `figma_get_styles` - Get design tokens

**Configuration:**
```yaml
name: Figma
type: sse
url: "http://127.0.0.1:3845/sse"
```

---

### 13. Atlassian MCP Server

**Status:** Official (Atlassian-maintained)
**Priority:** P1
**Transport:** stdio

**Purpose:**
Integration with Jira and Confluence for project management and documentation.

**Tools - Jira:**
- `jira_create_issue` - Create new issue
- `jira_update_issue` - Update existing issue
- `jira_search_issues` - Search issues with JQL
- `jira_get_issue` - Get issue details
- `jira_add_comment` - Add comment to issue
- `jira_transition_issue` - Move issue to different status
- `jira_get_board` - Get board information
- `jira_get_sprint` - Get sprint details

**Tools - Confluence:**
- `confluence_create_page` - Create new page
- `confluence_update_page` - Update existing page
- `confluence_get_page` - Get page content
- `confluence_search` - Search Confluence content
- `confluence_get_space` - Get space information
- `confluence_attach_file` - Attach file to page

**Configuration:**
```yaml
name: Atlassian
type: stdio
command: npx
args: ["-y", "@atlassian/mcp-server"]
env:
  JIRA_URL: "${JIRA_URL}"
  JIRA_EMAIL: "${JIRA_EMAIL}"
  JIRA_API_TOKEN: "${JIRA_API_TOKEN}"
  CONFLUENCE_URL: "${CONFLUENCE_URL}"
  CONFLUENCE_EMAIL: "${CONFLUENCE_EMAIL}"
  CONFLUENCE_API_TOKEN: "${CONFLUENCE_API_TOKEN}"
```

**Requirements:**
- REQ-MCP-ATLASSIAN-1: Support both Jira Cloud and Server
- REQ-MCP-ATLASSIAN-2: Support both Confluence Cloud and Server
- REQ-MCP-ATLASSIAN-3: Handle pagination for large result sets
- REQ-MCP-ATLASSIAN-4: Support custom fields in Jira
- REQ-MCP-ATLASSIAN-5: Preserve formatting in Confluence pages

**Use Cases:**
- Create Jira issues from user stories
- Update issue status during development
- Document architecture in Confluence
- Search existing tickets for context
- Link PRs to Jira issues

---

## Custom Server Specifications

### Development Standards

**All custom MCP servers must:**

1. **Follow MCP Protocol**
   - Use official TypeScript SDK
   - Implement standard tool schemas
   - Handle errors according to spec

2. **TypeScript Implementation**
   - TypeScript 5.0+
   - Strict type checking
   - Zod for runtime validation

3. **Testing**
   - Unit tests for all tools
   - Integration tests with MCP client
   - 80%+ code coverage

4. **Documentation**
   - README with setup instructions
   - Tool documentation with examples
   - API reference

5. **Error Handling**
   - Validate all inputs
   - Clear error messages
   - Graceful degradation

### Project Structure Template

```
mcp-servers/<server-name>/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # MCP server setup
│   ├── tools/
│   │   ├── tool1.ts
│   │   └── tool2.ts
│   ├── types.ts              # TypeScript types
│   ├── schemas.ts            # Zod schemas
│   └── utils.ts              # Helpers
├── tests/
│   ├── server.test.ts
│   └── tools/
│       ├── tool1.test.ts
│       └── tool2.test.ts
└── dist/                     # Built files (gitignored)
```

---

## Server Configuration

### Configuration File Format

**Continue.dev Configuration (~/.continue/config.yaml):**

```yaml
mcpServers:
  github:
    command: npx
    args:
      - "-y"
      - "@modelcontextprotocol/server-github"
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"

  docker:
    command: /opt/homebrew/opt/catalyst/libexec/mcp-servers/docker/bin/docker-mcp

  postgres:
    command: /opt/homebrew/opt/catalyst/libexec/mcp-servers/postgres/bin/postgres-mcp
    env:
      DATABASE_URL: "${DATABASE_URL}"
```

### Environment Variable Management

**Storage:** macOS Keychain (secure)
**Access:** Via Catalyst CLI

```bash
# Store API key
catalyst config set github.token ghp_xxxxxxxxxxxx

# Retrieve (for internal use)
catalyst config get github.token

# List all keys
catalyst config list
```

---

## Testing & Quality

### Testing Requirements

**Unit Tests:**
- Test each tool individually
- Mock external dependencies
- Cover error cases

**Integration Tests:**
- Test with real MCP client
- Validate tool schemas
- Test error handling

**E2E Tests:**
- Test in actual IDE
- Verify AI can use tools
- Test complete workflows

### Quality Metrics

| Metric | Target | Enforcement |
|--------|--------|-------------|
| Code Coverage | 80%+ | CI check |
| Type Safety | 100% | TypeScript strict mode |
| Response Time | < 2s | Performance tests |
| Error Rate | < 1% | Monitoring |

### CI/CD Pipeline

```yaml
# Per MCP server
test:
  - npm run lint
  - npm run type-check
  - npm run test
  - npm run build
```

---

**Next:** Read [06-bmad-integration.md](06-bmad-integration.md) for BMAD methodology integration details.
