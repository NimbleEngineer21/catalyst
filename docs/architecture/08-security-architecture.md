# Security Architecture

**Version:** 2.0.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## API Key Management

### Storage: macOS Keychain via `security` command

```typescript
// src/utils/keychain.ts
import { execa } from 'execa';

export class Keychain {
  private static SERVICE = 'com.catalyst.cli';

  static async store(account: string, password: string): Promise<void> {
    await execa('security', [
      'add-generic-password',
      '-s', Keychain.SERVICE,
      '-a', account,
      '-w', password,
      '-U', // Update if exists
    ]);
  }

  static async retrieve(account: string): Promise<string | null> {
    try {
      const { stdout } = await execa('security', [
        'find-generic-password',
        '-s', Keychain.SERVICE,
        '-a', account,
        '-w',
      ]);
      return stdout.trim();
    } catch {
      return null;
    }
  }

  static async delete(account: string): Promise<void> {
    try {
      await execa('security', [
        'delete-generic-password',
        '-s', Keychain.SERVICE,
        '-a', account,
      ]);
    } catch {
      // Ignore if not found
    }
  }
}
```

---

## Environment Variable Handling

**Never store secrets in config files:**

```typescript
// ❌ BAD
const config = {
  githubToken: 'ghp_xxxxxxxxxxxxx',
};

// ✅ GOOD
const config = {
  githubToken: process.env.GITHUB_TOKEN,
};

// ✅ BETTER
const config = {
  githubToken: await Keychain.retrieve('github-token'),
};
```

---

## MCP Server Sandboxing

### Principles

1. Each MCP server runs in isolated process
2. File access restricted to project directory
3. Network access validated
4. No inter-server communication

### Implementation

```typescript
// src/mcp/manager.ts
export class MCPManager {
  async startServer(serverName: string): Promise<ChildProcess> {
    const serverPath = this.getServerPath(serverName);
    const config = this.getServerConfig(serverName);

    // Spawn isolated process
    const child = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        ...process.env,
        ...config.env,
        // Restrict file access
        ALLOWED_PATHS: config.allowedPaths?.join(':'),
      },
      // Set working directory
      cwd: config.workingDir || process.cwd(),
    });

    return child;
  }
}
```

---

## Related Sections

- [Data Architecture](07-data-architecture.md) - Configuration file structure and storage
- [MCP Server Architecture](04-mcp-server-architecture.md) - Server isolation and sandboxing
- [Integration Architecture](06-integration-architecture.md) - Secure credential management
