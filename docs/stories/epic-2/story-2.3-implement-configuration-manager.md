# Story 2.3: Implement Configuration Manager

**Epic:** Epic 2 - Core CLI Implementation
**Story ID:** 2.3
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 6 hours

---

## User Story

**As a** developer,
**I want** Catalyst to manage global and project configurations,
**so that** settings are persisted and easily managed.

---

## Context

Creates the configuration management system that handles global (`~/.catalyst/config.yaml`) and project-level (`.catalyst/config.yaml`) configurations with validation, hierarchical merging, and type-safe access.

**Dependencies:**
- Story 1.4: Create Core Utility Modules
- Story 2.1: Implement Main CLI Entry Point

**Enables:**
- Story 2.5: catalyst setup (writes config)
- Story 2.6: catalyst init (writes project config)
- Story 2.8: catalyst config (manages config)
- All commands that read configuration

---

## Acceptance Criteria

### 1. Configuration Manager Module (`src/core/configurator.ts`)
- [ ] Module created with config management functions
- [ ] Reads `~/.catalyst/config.yaml` (global config)
- [ ] Reads `.catalyst/config.yaml` (project config)
- [ ] Writes both global and project configs
- [ ] TypeScript types properly defined

### 2. Configuration Schema (`src/types/config.ts`)
- [ ] `CatalystConfig` interface defined with Zod schema
- [ ] Sections: `general`, `mcp_servers`, `bmad`, `preferences`
- [ ] All fields documented with JSDoc
- [ ] Example:
  ```typescript
  interface CatalystConfig {
    general: {
      version: string;
      project_type?: string;
    };
    mcp_servers: {
      enabled: string[];
      config: Record<string, any>;
    };
    bmad: {
      enabled: boolean;
      template_path?: string;
    };
    preferences: {
      auto_update: boolean;
      telemetry: boolean;
    };
  }
  ```

### 3. Config File Operations
- [ ] `loadGlobalConfig()` - Load ~/.catalyst/config.yaml
- [ ] `loadProjectConfig()` - Load .catalyst/config.yaml
- [ ] `saveGlobalConfig(config)` - Write global config
- [ ] `saveProjectConfig(config)` - Write project config
- [ ] `mergeConfigs(global, project)` - Hierarchical merge (project wins)
- [ ] Creates directories if they don't exist

### 4. Validation with Zod
- [ ] Zod schema validates all config fields
- [ ] Type coercion for common mistakes
- [ ] Clear validation error messages
- [ ] Returns validated, typed config object

### 5. Hierarchical Configuration
- [ ] Global config provides defaults
- [ ] Project config overrides global
- [ ] Dot notation for nested keys (e.g., `mcp_servers.docker.enabled`)
- [ ] Array merging strategy defined

### 6. Config Helper Functions
- [ ] `getConfig(key: string)` - Get value with dot notation
- [ ] `setConfig(key: string, value: any)` - Set value with dot notation
- [ ] `hasConfig(key: string)` - Check if key exists
- [ ] `deleteConfig(key: string)` - Remove key

### 7. Error Handling
- [ ] Missing config file returns defaults
- [ ] Invalid YAML shows helpful parse error
- [ ] Validation errors show which field failed
- [ ] Permission errors handled gracefully

### 8. Unit Tests
- [ ] Test loading global config
- [ ] Test loading project config
- [ ] Test config merging (project overrides global)
- [ ] Test validation (valid and invalid configs)
- [ ] Test get/set/has/delete helpers
- [ ] Test error scenarios
- [ ] >80% coverage

---

## Technical Implementation

```typescript
// src/core/configurator.ts
import { z } from 'zod';
import { readFile, writeFile, ensureDir, exists } from '@/utils/filesystem';
import { parse, stringify } from 'yaml';
import os from 'os';
import path from 'path';

// Zod schema
export const CatalystConfigSchema = z.object({
  general: z.object({
    version: z.string(),
    project_type: z.string().optional(),
  }),
  mcp_servers: z.object({
    enabled: z.array(z.string()).default([]),
    config: z.record(z.any()).default({}),
  }),
  bmad: z.object({
    enabled: z.boolean().default(true),
    template_path: z.string().optional(),
  }),
  preferences: z.object({
    auto_update: z.boolean().default(true),
    telemetry: z.boolean().default(false),
  }),
});

export type CatalystConfig = z.infer<typeof CatalystConfigSchema>;

// Default config
const DEFAULT_CONFIG: CatalystConfig = {
  general: { version: '2.0.0' },
  mcp_servers: { enabled: [], config: {} },
  bmad: { enabled: true },
  preferences: { auto_update: true, telemetry: false },
};

// Paths
const GLOBAL_CONFIG_PATH = path.join(os.homedir(), '.catalyst', 'config.yaml');
const PROJECT_CONFIG_PATH = path.join(process.cwd(), '.catalyst', 'config.yaml');

export async function loadGlobalConfig(): Promise<CatalystConfig> {
  if (!(await exists(GLOBAL_CONFIG_PATH))) {
    return DEFAULT_CONFIG;
  }
  
  const content = await readFile(GLOBAL_CONFIG_PATH);
  const parsed = parse(content);
  return CatalystConfigSchema.parse(parsed);
}

export async function loadProjectConfig(): Promise<Partial<CatalystConfig>> {
  if (!(await exists(PROJECT_CONFIG_PATH))) {
    return {};
  }
  
  const content = await readFile(PROJECT_CONFIG_PATH);
  return parse(content);
}

export async function mergeConfigs(): Promise<CatalystConfig> {
  const global = await loadGlobalConfig();
  const project = await loadProjectConfig();
  
  return {
    ...global,
    ...project,
    mcp_servers: {
      ...global.mcp_servers,
      ...project.mcp_servers,
    },
    bmad: {
      ...global.bmad,
      ...project.bmad,
    },
    preferences: {
      ...global.preferences,
      ...project.preferences,
    },
  } as CatalystConfig;
}

export async function saveGlobalConfig(config: CatalystConfig): Promise<void> {
  await ensureDir(path.dirname(GLOBAL_CONFIG_PATH));
  const yaml = stringify(config);
  await writeFile(GLOBAL_CONFIG_PATH, yaml);
}

export async function saveProjectConfig(config: Partial<CatalystConfig>): Promise<void> {
  await ensureDir(path.dirname(PROJECT_CONFIG_PATH));
  const yaml = stringify(config);
  await writeFile(PROJECT_CONFIG_PATH, yaml);
}

// Helper function to get nested value using dot notation
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

// Helper function to set nested value using dot notation
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
}

// Helper function to delete nested value using dot notation
function deleteNestedValue(obj: any, path: string): boolean {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;

  for (const key of keys) {
    if (!(key in current)) {
      return false;
    }
    current = current[key];
  }

  if (lastKey in current) {
    delete current[lastKey];
    return true;
  }

  return false;
}

// Helper function to check if nested key exists
function hasNestedValue(obj: any, path: string): boolean {
  return getNestedValue(obj, path) !== undefined;
}

/**
 * Get configuration value by key (supports dot notation)
 * @param key - Config key (e.g., 'mcp_servers.enabled' or 'bmad.enabled')
 * @returns Configuration value or undefined
 */
export async function getConfig(key: string): Promise<any> {
  const config = await mergeConfigs();
  return getNestedValue(config, key);
}

/**
 * Set configuration value by key (supports dot notation)
 * Updates project config by default
 * @param key - Config key (e.g., 'preferences.auto_update')
 * @param value - Value to set
 * @param scope - 'global' or 'project' (default: 'project')
 */
export async function setConfig(
  key: string,
  value: any,
  scope: 'global' | 'project' = 'project'
): Promise<void> {
  if (scope === 'global') {
    const config = await loadGlobalConfig();
    setNestedValue(config, key, value);
    await saveGlobalConfig(config);
  } else {
    const config = await loadProjectConfig();
    setNestedValue(config, key, value);
    await saveProjectConfig(config);
  }
}

/**
 * Check if configuration key exists (supports dot notation)
 * @param key - Config key to check
 * @returns True if key exists
 */
export async function hasConfig(key: string): Promise<boolean> {
  const config = await mergeConfigs();
  return hasNestedValue(config, key);
}

/**
 * Delete configuration key (supports dot notation)
 * Deletes from project config by default
 * @param key - Config key to delete
 * @param scope - 'global' or 'project' (default: 'project')
 * @returns True if key was deleted, false if not found
 */
export async function deleteConfig(
  key: string,
  scope: 'global' | 'project' = 'project'
): Promise<boolean> {
  if (scope === 'global') {
    const config = await loadGlobalConfig();
    const deleted = deleteNestedValue(config, key);
    if (deleted) {
      await saveGlobalConfig(config);
    }
    return deleted;
  } else {
    const config = await loadProjectConfig();
    const deleted = deleteNestedValue(config, key);
    if (deleted) {
      await saveProjectConfig(config);
    }
    return deleted;
  }
}
```

---

## Architecture References

- [Data Architecture](../../architecture/07-data-architecture.md) - Config file structure
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Config usage

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Config manager module implemented
- [ ] Zod validation working
- [ ] Hierarchical config merging works
- [ ] Helper functions implemented
- [ ] Unit tests passing (>80% coverage)
- [ ] Code committed with clear message
- [ ] Story reviewed and accepted

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
