# Publishing Catalyst MCP Servers to LM Studio

**Last Updated:** October 26, 2025
**LM Studio Version:** 0.3.17+
**Target:** Custom MCP Server Distribution

---

## Overview

Catalyst includes **5 custom MCP servers** that extend LM Studio's capabilities for development workflows. This document outlines how to package and distribute these servers for easy installation by LM Studio users.

---

## Catalyst Custom MCP Servers

### 1. **Docker MCP Server**
- **Purpose:** Container lifecycle management
- **Tools:** `docker_ps`, `docker_start`, `docker_stop`, `docker_logs`, `docker_build`
- **Package:** `@catalyst/mcp-docker`

### 2. **PostgreSQL MCP Server**
- **Purpose:** Database operations and schema management
- **Tools:** `postgres_query`, `postgres_schema`, `postgres_migrations`
- **Package:** `@catalyst/mcp-postgres`

### 3. **Xcode MCP Server**
- **Purpose:** iOS/macOS development automation
- **Tools:** `xcode_build`, `xcode_test`, `xcode_simulate`
- **Package:** `@catalyst/mcp-xcode`

### 4. **Storybook MCP Server**
- **Purpose:** Component documentation and testing
- **Tools:** `storybook_build`, `storybook_test`, `storybook_stories`
- **Package:** `@catalyst/mcp-storybook`

### 5. **Vite MCP Server**
- **Purpose:** Frontend build tooling
- **Tools:** `vite_build`, `vite_dev`, `vite_preview`
- **Package:** `@catalyst/mcp-vite`

---

## LM Studio MCP Configuration Format

LM Studio uses `mcp.json` configuration files located at:
- **macOS/Linux:** `~/.lmstudio/mcp.json`
- **Windows:** `%USERPROFILE%/.lmstudio/mcp.json`

### Basic Structure

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

---

## Catalyst MCP Server Configurations

### For Users Who Installed via Homebrew

```json
{
  "mcpServers": {
    "catalyst-docker": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/0.1.0/mcp-servers/docker/dist/index.js"]
    },
    "catalyst-postgres": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/0.1.0/mcp-servers/postgres/dist/index.js"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "catalyst-xcode": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/0.1.0/mcp-servers/xcode/dist/index.js"]
    },
    "catalyst-storybook": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/0.1.0/mcp-servers/storybook/dist/index.js"]
    },
    "catalyst-vite": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/0.1.0/mcp-servers/vite/dist/index.js"]
    }
  }
}
```

### For Users Who Installed via npm (Alternative Distribution)

```json
{
  "mcpServers": {
    "catalyst-docker": {
      "command": "npx",
      "args": ["-y", "@catalyst/mcp-docker"]
    },
    "catalyst-postgres": {
      "command": "npx",
      "args": ["-y", "@catalyst/mcp-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

---

## Distribution Methods

### Method 1: Homebrew Installation (Primary)

**Automatic Configuration via Catalyst CLI:**

```bash
# After installing Catalyst via Homebrew
catalyst setup

# Wizard will:
# 1. Detect LM Studio installation
# 2. Check existing mcp.json
# 3. Offer to add Catalyst MCP servers
# 4. Update ~/.lmstudio/mcp.json automatically
```

**Implementation:**

```typescript
// src/core/lmstudio-configurator.ts
export class LMStudioConfigurator {
  async configureMCPServers(): Promise<void> {
    const mcpConfigPath = path.join(os.homedir(), '.lmstudio/mcp.json');

    // Read existing config
    let config = { mcpServers: {} };
    if (await fs.pathExists(mcpConfigPath)) {
      config = await fs.readJson(mcpConfigPath);
    }

    // Add Catalyst servers
    const catalystPath = this.getCatalystInstallPath();
    config.mcpServers = {
      ...config.mcpServers,
      'catalyst-docker': {
        command: 'node',
        args: [`${catalystPath}/mcp-servers/docker/dist/index.js`]
      },
      'catalyst-postgres': {
        command: 'node',
        args: [`${catalystPath}/mcp-servers/postgres/dist/index.js`],
        env: {
          DATABASE_URL: '${DATABASE_URL}'
        }
      },
      // ... other servers
    };

    // Write updated config
    await fs.ensureDir(path.dirname(mcpConfigPath));
    await fs.writeJson(mcpConfigPath, config, { spaces: 2 });

    logger.success('LM Studio MCP servers configured!');
  }
}
```

---

### Method 2: One-Click Installation (Deeplink)

**Create "Add to LM Studio" Buttons:**

LM Studio supports custom deeplinks for one-click MCP server installation:

```
lmstudio://add_mcp?name=catalyst-docker&config=<base64-encoded-config>
```

**Example Deeplink Generation:**

```typescript
// scripts/generate-lmstudio-links.ts
function generateLMStudioDeeplink(serverName: string, config: object): string {
  const encodedConfig = Buffer.from(JSON.stringify(config)).toString('base64');
  return `lmstudio://add_mcp?name=${serverName}&config=${encodedConfig}`;
}

// Generate for Docker MCP
const dockerConfig = {
  command: 'npx',
  args: ['-y', '@catalyst/mcp-docker']
};

const dockerLink = generateLMStudioDeeplink('catalyst-docker', dockerConfig);
console.log(dockerLink);
// lmstudio://add_mcp?name=catalyst-docker&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteS...
```

**Usage in Documentation:**

```markdown
## Quick Install for LM Studio

Click to add Catalyst MCP servers:

- [Add Docker MCP](lmstudio://add_mcp?name=catalyst-docker&config=...)
- [Add PostgreSQL MCP](lmstudio://add_mcp?name=catalyst-postgres&config=...)
- [Add Xcode MCP](lmstudio://add_mcp?name=catalyst-xcode&config=...)
- [Add Storybook MCP](lmstudio://add_mcp?name=catalyst-storybook&config=...)
- [Add Vite MCP](lmstudio://add_mcp?name=catalyst-vite&config=...)
```

---

### Method 3: npm Package Distribution (Alternative)

**Publish to npm for standalone usage:**

```bash
# In mcp-servers/docker/
npm publish --access public

# Package name: @catalyst/mcp-docker
```

**package.json for each server:**

```json
{
  "name": "@catalyst/mcp-docker",
  "version": "0.1.0",
  "description": "Catalyst MCP Server for Docker management",
  "main": "dist/index.js",
  "bin": {
    "catalyst-mcp-docker": "./dist/index.js"
  },
  "keywords": ["mcp", "docker", "catalyst", "lm-studio"],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/catalyst.git",
    "directory": "mcp-servers/docker"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

**Users can then install via:**

```bash
npm install -g @catalyst/mcp-docker
# or use via npx
npx @catalyst/mcp-docker
```

---

## Release Process Integration

### GitHub Actions Workflow for MCP Server Publishing

Add to `.github/workflows/release.yml`:

```yaml
jobs:
  publish-mcp-servers:
    runs-on: ubuntu-latest
    needs: build-and-release

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Build MCP Servers
        run: ./scripts/build-mcp-servers.sh

      - name: Publish Docker MCP
        working-directory: mcp-servers/docker
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Publish PostgreSQL MCP
        working-directory: mcp-servers/postgres
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Publish Xcode MCP
        working-directory: mcp-servers/xcode
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Publish Storybook MCP
        working-directory: mcp-servers/storybook
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Publish Vite MCP
        working-directory: mcp-servers/vite
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Generate LM Studio Deeplinks
        run: node scripts/generate-lmstudio-links.js > docs/LMSTUDIO_INSTALL.md

      - name: Commit Updated Links
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add docs/LMSTUDIO_INSTALL.md
          git commit -m "Update LM Studio installation links for v${{ github.ref_name }}" || true
          git push || true
```

---

## Documentation for End Users

### docs/LMSTUDIO_INSTALL.md (Auto-Generated)

```markdown
# Install Catalyst MCP Servers in LM Studio

## Method 1: Automatic (via Catalyst CLI)

If you installed Catalyst via Homebrew:

\`\`\`bash
catalyst setup
# Follow the wizard to configure LM Studio
\`\`\`

## Method 2: One-Click Installation

Click the buttons below to add servers to LM Studio:

- [🐳 Add Docker MCP](lmstudio://add_mcp?name=catalyst-docker&config=...)
- [🐘 Add PostgreSQL MCP](lmstudio://add_mcp?name=catalyst-postgres&config=...)
- [📱 Add Xcode MCP](lmstudio://add_mcp?name=catalyst-xcode&config=...)
- [📚 Add Storybook MCP](lmstudio://add_mcp?name=catalyst-storybook&config=...)
- [⚡ Add Vite MCP](lmstudio://add_mcp?name=catalyst-vite&config=...)

## Method 3: Manual Configuration

1. Open LM Studio
2. Navigate to **Plugins** tab (right sidebar)
3. Click **Install > Edit mcp.json**
4. Add the following configuration:

\`\`\`json
{
  "mcpServers": {
    "catalyst-docker": {
      "command": "npx",
      "args": ["-y", "@catalyst/mcp-docker"]
    },
    "catalyst-postgres": {
      "command": "npx",
      "args": ["-y", "@catalyst/mcp-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
\`\`\`

5. Save and restart LM Studio

## Verification

After installation, verify the servers are working:

1. Open LM Studio chat
2. Type: "List available Docker containers"
3. The model should use the Docker MCP server to respond

Or use the Catalyst CLI:

\`\`\`bash
catalyst verify --lmstudio
\`\`\`
```

---

## Security Considerations

### Code Signing (macOS)

For production distribution, sign the MCP server binaries:

```bash
# Sign each MCP server
codesign --sign "Developer ID Application: Your Name" \
  mcp-servers/docker/dist/index.js

# Verify signature
codesign --verify --verbose mcp-servers/docker/dist/index.js
```

### Environment Variables

**Never hardcode secrets in mcp.json:**

```json
{
  "mcpServers": {
    "catalyst-postgres": {
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",  // ✅ Use variable
        "API_KEY": "${CATALYST_API_KEY}"     // ✅ Use variable
      }
    }
  }
}
```

Users should set these in their shell:

```bash
# ~/.zshrc or ~/.bashrc
export DATABASE_URL="postgresql://user:pass@localhost:5432/db"
export CATALYST_API_KEY="your-api-key"
```

---

## Testing MCP Servers with LM Studio

### Manual Testing

```bash
# 1. Start LM Studio local server
# (In LM Studio UI: Local Server tab → Start Server)

# 2. Test MCP server via Continue.dev or Claude Code
# Open VS Code, use the extension chat:
"Use Docker MCP to list running containers"

# 3. Verify tools are available
catalyst mcp test catalyst-docker
```

### Automated Testing

```typescript
// tests/integration/lmstudio-mcp.test.ts
describe('LM Studio MCP Integration', () => {
  it('should list available tools from Docker MCP', async () => {
    const mcpClient = new MCPClient('catalyst-docker');
    const tools = await mcpClient.listTools();

    expect(tools).toContainEqual(
      expect.objectContaining({
        name: 'docker_ps',
        description: expect.any(String)
      })
    );
  });
});
```

---

## Troubleshooting

### MCP Server Not Appearing in LM Studio

1. **Check mcp.json location:**
   ```bash
   cat ~/.lmstudio/mcp.json
   ```

2. **Verify Node.js is accessible:**
   ```bash
   which node
   node --version  # Should be 20+
   ```

3. **Test server directly:**
   ```bash
   node /opt/homebrew/Cellar/catalyst/0.1.0/mcp-servers/docker/dist/index.js
   ```

4. **Restart LM Studio** completely

### Permission Denied Errors

```bash
# Make server executable
chmod +x /path/to/mcp-server/index.js

# Verify
ls -l /path/to/mcp-server/index.js
```

### Environment Variables Not Working

LM Studio loads environment from the shell that launched it. Ensure:

```bash
# 1. Set variables in shell config
echo 'export DATABASE_URL="..."' >> ~/.zshrc

# 2. Reload shell
source ~/.zshrc

# 3. Launch LM Studio from this shell
open -a "LM Studio"
```

---

## Resources

- **LM Studio MCP Docs:** https://lmstudio.ai/docs/app/plugins/mcp
- **MCP Protocol Spec:** https://modelcontextprotocol.io
- **Catalyst MCP Source:** https://github.com/your-org/catalyst/tree/main/mcp-servers

---

**This document is maintained by the Catalyst team and updated with each release.**
