# Testing Architecture

**Version:** 0.1.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## Test Organization

```
tests/
├── unit/                          # Unit tests
│   ├── cli/
│   │   ├── commands/
│   │   │   ├── setup.test.ts
│   │   │   └── verify.test.ts
│   │   └── index.test.ts
│   ├── core/
│   │   ├── installer.test.ts
│   │   ├── configurator.test.ts
│   │   └── detector.test.ts
│   ├── mcp/
│   │   └── manager.test.ts
│   └── utils/
│       ├── filesystem.test.ts
│       └── keychain.test.ts
│
├── integration/                   # Integration tests
│   ├── setup-flow.test.ts
│   ├── mcp-connectivity.test.ts
│   └── bmad-integration.test.ts
│
└── e2e/                          # End-to-end tests
    ├── fresh-install.test.ts
    └── update-flow.test.ts
```

---

## Testing Strategy

### Unit Tests (Vitest)

```typescript
// tests/unit/core/detector.test.ts
import { describe, it, expect, vi } from 'vitest';
import { Detector } from '../../../src/core/detector';

describe('Detector', () => {
  describe('detectIDE', () => {
    it('should detect VS Code when installed', async () => {
      const detector = new Detector();

      // Mock file system
      vi.spyOn(detector, 'checkPath').mockResolvedValue(true);

      const result = await detector.detectIDE();

      expect(result).toContain('vscode');
    });

    it('should return empty array when no IDE found', async () => {
      const detector = new Detector();

      vi.spyOn(detector, 'checkPath').mockResolvedValue(false);

      const result = await detector.detectIDE();

      expect(result).toEqual([]);
    });
  });
});
```

### Integration Tests

```typescript
// tests/integration/setup-flow.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setupCommand } from '../../src/cli/commands/setup';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

describe('Setup Flow', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'catalyst-test-'));
    process.env.HOME = tempDir;
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  it('should create configuration files', async () => {
    // Mock user input
    const mockAnswers = {
      ide: 'vscode',
      mcpServers: ['github', 'docker'],
      installBMAD: true,
    };

    await setupCommand(mockAnswers);

    // Verify files created
    const configPath = path.join(tempDir, '.catalyst/config.yaml');
    expect(await fs.pathExists(configPath)).toBe(true);

    const continueConfig = path.join(tempDir, '.continue/config.json');
    expect(await fs.pathExists(continueConfig)).toBe(true);
  });
});
```

---

## Test Coverage Goals

- **Unit tests:** 80%+ coverage
- **Integration tests:** Critical paths
- **E2E tests:** Major user flows

---

## Related Sections

- [Technology Stack](02-technology-stack.md) - Testing frameworks and tools
- [Development Workflow](11-development-workflow.md) - Running tests during development
- [CLI Architecture](03-cli-architecture.md) - Command testing strategies
