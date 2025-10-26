# Integration Architecture

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## BMAD Integration

### How Catalyst Uses BMAD

1. **During Build** - BMAD is installed via `npx bmad-method install`
2. **In Distribution** - BMAD bundles are packaged with Catalyst
3. **On User Setup** - Catalyst creates symlinks from `~/.bmad-core` to bundled files
4. **In Projects** - `catalyst init` creates `.bmad-core/core-config.yaml`

```typescript
// src/bmad/installer.ts
export class BMADInstaller {
  async install(options: BMADInstallOptions): Promise<void> {
    const bmadPath = path.join(os.homedir(), '.bmad-core');

    // Check if already installed
    if (await fs.pathExists(bmadPath)) {
      logger.info('BMAD already installed');
      return;
    }

    // Create symlinks to bundled BMAD
    const bundlePath = this.getBundlePath();

    await this.createSymlinks(bundlePath, bmadPath);

    logger.success('BMAD installed successfully');
  }

  private async createSymlinks(source: string, target: string): Promise<void> {
    const items = await fs.readdir(source);

    for (const item of items) {
      const sourcePath = path.join(source, item);
      const targetPath = path.join(target, item);

      await fs.ensureSymlink(sourcePath, targetPath);
    }
  }

  private getBundlePath(): string {
    // Path to bundled BMAD in Homebrew installation
    return path.join(
      '/opt/homebrew/Cellar/catalyst',
      this.getCatalystVersion(),
      'bundles/bmad-core'
    );
  }
}
```

---

## LM Studio Integration

**LM Studio Version:** 0.3.17+ (with MCP support)

### Model Management

Catalyst automatically detects hardware and recommends optimal MLX models:

**Recommended Models by Hardware:**

| Hardware | Essential Model | Optional Models |
|----------|----------------|-----------------|
| M1/M2 (16GB) | Qwen 2.5 Coder 7B-4bit | DeepSeek Coder 6.7B-4bit |
| M2 Pro/M3 (24-32GB) | Qwen 2.5 Coder 7B-4bit | Qwen 2.5 32B-4bit |
| M3/M4 Max (48GB+) | Qwen 2.5 Coder 7B-4bit | DeepSeek-R1 32B-4bit, Qwen MoE 30B |

**See [LM_STUDIO_MODELS.md](LM_STUDIO_MODELS.md) for complete model recommendations**

```typescript
// src/core/model-manager.ts
export class ModelManager {
  async detectInstalledModels(): Promise<InstalledModel[]> {
    const lmStudioPath = path.join(os.homedir(), '.cache/lm-studio/models');

    if (!await fs.pathExists(lmStudioPath)) {
      return [];
    }

    // Scan for MLX models
    const models = await this.scanModelsDirectory(lmStudioPath);

    return models.filter(m => m.format === 'mlx');
  }

  async recommendModels(hardware: HardwareSpec): Promise<ModelRecommendation[]> {
    const { chip, ramGB } = hardware;

    const recommendations: ModelRecommendation[] = [
      {
        id: 'mlx-community/Qwen2.5-Coder-7B-Instruct-4bit',
        name: 'Qwen 2.5 Coder 7B',
        priority: 'essential',
        reason: 'Best coding performance, 92 languages, 128K context',
        ramRequired: 6,
        speed: '70-80 t/s'
      }
    ];

    if (ramGB >= 32 && chip.includes('Pro')) {
      recommendations.push({
        id: 'mlx-community/Qwen2.5-32B-Instruct-4bit',
        name: 'Qwen 2.5 32B',
        priority: 'recommended',
        reason: 'Advanced reasoning for architecture/design',
        ramRequired: 20,
        speed: '30-40 t/s'
      });
    }

    if (ramGB >= 48 && chip.includes('Max')) {
      recommendations.push({
        id: 'mlx-community/DeepSeek-R1-Distill-Qwen-32B-4bit',
        name: 'DeepSeek-R1 32B',
        priority: 'recommended',
        reason: 'Chain-of-thought reasoning for complex problems',
        ramRequired: 20,
        speed: '35-45 t/s'
      });
    }

    return recommendations;
  }

  async installModel(modelId: string): Promise<void> {
    logger.info(`Downloading ${modelId}...`);

    // Use LM Studio CLI if available, otherwise provide instructions
    try {
      await execa('lms', ['download', modelId]);
      logger.success(`Model ${modelId} installed!`);
    } catch (error) {
      logger.warn('LM Studio CLI not found');
      logger.info(`Please install manually in LM Studio:`);
      logger.info(`  1. Open LM Studio`);
      logger.info(`  2. Search for: ${modelId}`);
      logger.info(`  3. Click Download`);
    }
  }
}
```

### MCP Server Publishing to LM Studio

Catalyst publishes custom MCP servers for use in LM Studio.

**Distribution Methods:**

1. **Automatic (via Catalyst CLI)**
   ```bash
   catalyst setup
   # Automatically configures ~/.lmstudio/mcp.json
   ```

2. **npm Packages**
   ```bash
   npm install -g @catalyst/mcp-docker
   npm install -g @catalyst/mcp-postgres
   ```

3. **One-Click Deeplinks**
   ```
   lmstudio://add_mcp?name=catalyst-docker&config=<base64>
   ```

**LM Studio mcp.json Configuration:**

```json
{
  "mcpServers": {
    "catalyst-docker": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/2.0.0/mcp-servers/docker/dist/index.js"]
    },
    "catalyst-postgres": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/2.0.0/mcp-servers/postgres/dist/index.js"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "catalyst-xcode": {
      "command": "node",
      "args": ["/opt/homebrew/Cellar/catalyst/2.0.0/mcp-servers/xcode/dist/index.js"]
    }
  }
}
```

**See [LM_STUDIO_MCP_PUBLISHING.md](LM_STUDIO_MCP_PUBLISHING.md) for complete publishing guide**

```typescript
// src/core/lmstudio-configurator.ts
export class LMStudioConfigurator {
  async configureMCPServers(): Promise<void> {
    const mcpConfigPath = path.join(os.homedir(), '.lmstudio/mcp.json');

    let config = { mcpServers: {} };
    if (await fs.pathExists(mcpConfigPath)) {
      config = await fs.readJson(mcpConfigPath);
    }

    const catalystPath = this.getCatalystInstallPath();

    // Add Catalyst MCP servers
    const servers = ['docker', 'postgres', 'xcode', 'storybook', 'vite'];

    for (const server of servers) {
      config.mcpServers[`catalyst-${server}`] = {
        command: 'node',
        args: [`${catalystPath}/mcp-servers/${server}/dist/index.js`]
      };

      // Add environment variables if needed
      if (server === 'postgres') {
        config.mcpServers[`catalyst-${server}`].env = {
          DATABASE_URL: '${DATABASE_URL}'
        };
      }
    }

    await fs.ensureDir(path.dirname(mcpConfigPath));
    await fs.writeJson(mcpConfigPath, config, { spaces: 2 });

    logger.success('LM Studio MCP servers configured!');
  }

  async verifyLMStudioInstallation(): Promise<boolean> {
    const appPath = '/Applications/LM Studio.app';

    if (!await fs.pathExists(appPath)) {
      logger.warn('LM Studio not found');
      logger.info('Download from: https://lmstudio.ai');
      return false;
    }

    // Check version (requires 0.3.17+ for MCP support)
    const version = await this.getLMStudioVersion(appPath);
    if (version && version < '0.3.17') {
      logger.warn(`LM Studio ${version} detected - update required`);
      logger.info('MCP support requires v0.3.17 or later');
      return false;
    }

    logger.success(`LM Studio ${version || 'detected'}`);
    return true;
  }
}
```

---

## IDE Integration

**Supported IDEs:**
- VS Code with Continue.dev
- VS Code with Claude Code
- Cursor
- Windsurf
- Others via Continue.dev protocol

**Configuration Generation:**

```typescript
// src/core/configurator.ts
export class Configurator {
  async generateContinueConfig(): Promise<void> {
    const config = {
      models: [
        {
          title: "LM Studio - Qwen Coder",
          provider: "lmstudio",
          model: "mlx-community/Qwen2.5-Coder-7B-Instruct-4bit",
          apiBase: "http://localhost:1234/v1"
        },
        {
          title: "LM Studio - DeepSeek R1",
          provider: "lmstudio",
          model: "mlx-community/DeepSeek-R1-Distill-Qwen-32B-4bit",
          apiBase: "http://localhost:1234/v1"
        }
      ],
      mcpServers: this.getMCPServerConfig(),
      customCommands: this.getBMADCommands(),
    };

    const configPath = path.join(os.homedir(), '.continue/config.json');
    await fs.ensureDir(path.dirname(configPath));
    await fs.writeJson(configPath, config, { spaces: 2 });

    logger.success('Continue.dev config generated');
  }

  private getMCPServerConfig(): Record<string, MCPServerConfig> {
    return {
      github: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        env: {
          GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN || ''
        }
      },
      docker: {
        command: 'node',
        args: [this.getMCPServerPath('docker')],
      },
      // ... other servers
    };
  }
}
```

---

## Related Sections

- [MCP Server Architecture](04-mcp-server-architecture.md) - Custom MCP server implementations
- [Data Architecture](07-data-architecture.md) - Configuration file locations and schemas
- [Security Architecture](08-security-architecture.md) - API key and credential management
