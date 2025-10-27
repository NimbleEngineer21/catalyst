/**
 * Type Definitions
 *
 * Common types used throughout the Catalyst application.
 * Includes configuration types for CLI, MCP servers, and BMAD integration.
 */

/**
 * Catalyst configuration structure
 */
export interface Config {
  /** Project name */
  name: string;
  /** Project version */
  version: string;
  /** MCP server configuration */
  mcpServers?: ServerConfig[];
  /** BMAD configuration */
  bmad?: BMadConfig;
  /** CLI options */
  cli?: CommandOptions;
}

/**
 * MCP server configuration
 */
export interface ServerConfig {
  /** Server name/identifier */
  name: string;
  /** Server command to execute */
  command: string;
  /** Command arguments */
  args?: string[];
  /** Environment variables */
  env?: Record<string, string>;
  /** Working directory */
  cwd?: string;
  /** Auto-start on catalyst init */
  autoStart?: boolean;
}

/**
 * BMAD configuration
 */
export interface BMadConfig {
  /** BMAD core directory path */
  corePath?: string;
  /** BMAD agents to enable */
  agents?: string[];
  /** BMAD templates directory */
  templatesPath?: string;
  /** BMAD tasks directory */
  tasksPath?: string;
}

/**
 * CLI command options
 */
export interface CommandOptions {
  /** Verbose output */
  verbose?: boolean;
  /** Debug mode */
  debug?: boolean;
  /** Force operation */
  force?: boolean;
  /** Config file path */
  config?: string;
}
