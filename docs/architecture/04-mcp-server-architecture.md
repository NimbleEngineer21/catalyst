# MCP Server Architecture

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## MCP Server Structure

Each custom MCP server follows this pattern:

```
mcp-servers/<server-name>/
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # MCP Server implementation
│   ├── tools/                # Tool implementations
│   │   ├── tool1.ts
│   │   ├── tool2.ts
│   │   └── index.ts
│   ├── types.ts              # TypeScript interfaces
│   ├── client.ts             # External service client
│   └── utils.ts              # Helper functions
├── tests/
│   ├── server.test.ts
│   └── tools/
│       ├── tool1.test.ts
│       └── tool2.test.ts
├── package.json
├── tsconfig.json
├── README.md
└── dist/                     # Compiled output (gitignored)
```

---

## MCP Server Implementation Pattern

```typescript
// mcp-servers/docker/src/server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { dockerTools } from './tools/index.js';

export class DockerMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'docker-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: dockerTools.map(tool => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      })),
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const tool = dockerTools.find(t => t.name === request.params.name);

      if (!tool) {
        throw new Error(`Unknown tool: ${request.params.name}`);
      }

      return await tool.handler(request.params.arguments);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}
```

---

## MCP Tool Implementation Pattern

```typescript
// mcp-servers/docker/src/tools/ps.ts
import { z } from 'zod';
import { dockerClient } from '../client.js';

export const dockerPsTool = {
  name: 'docker_ps',
  description: 'List Docker containers',
  inputSchema: {
    type: 'object',
    properties: {
      all: {
        type: 'boolean',
        description: 'Show all containers (default shows just running)',
      },
      format: {
        type: 'string',
        enum: ['table', 'json'],
        description: 'Output format',
      },
    },
  },

  handler: async (args: unknown) => {
    // Validate input
    const schema = z.object({
      all: z.boolean().optional().default(false),
      format: z.enum(['table', 'json']).optional().default('table'),
    });

    const params = schema.parse(args);

    // Execute Docker operation
    const containers = await dockerClient.listContainers({
      all: params.all,
    });

    // Format output
    if (params.format === 'json') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(containers, null, 2),
          },
        ],
      };
    }

    // Table format
    const table = formatContainersTable(containers);
    return {
      content: [
        {
          type: 'text',
          text: table,
        },
      ],
    };
  },
};
```

---

## Custom MCP Servers

| Server | Purpose | Key Tools | Status |
|--------|---------|-----------|--------|
| **docker** | Container management | ps, start, stop, logs, build | Custom |
| **postgres** | Database operations | query, schema, migrations | Custom |
| **xcode** | iOS/macOS development | build, test, simulate | Custom |
| **storybook** | Component documentation | build, test, stories | Custom |
| **vite** | Frontend tooling | build, test, dev | Custom |

---

## Related Sections

- [CLI Architecture](03-cli-architecture.md) - How CLI manages MCP servers
- [Integration Architecture](06-integration-architecture.md) - MCP integration with IDEs and LM Studio
- [Testing Architecture](09-testing-architecture.md) - Testing MCP servers
