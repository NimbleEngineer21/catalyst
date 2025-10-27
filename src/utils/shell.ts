/**
 * Shell Utilities
 *
 * Type-safe wrappers around execa for executing shell commands.
 * Provides functions for silent execution, live output, and command existence checks.
 */

import { execa, type ExecaError } from 'execa';
import { CommandError } from './errors.js';

/**
 * Options for command execution
 */
export interface ExecOptions {
  /** Working directory for command execution */
  cwd?: string;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Environment variables */
  env?: Record<string, string>;
}

/**
 * Result of command execution
 */
export interface ExecResult {
  /** Standard output */
  stdout: string;
  /** Standard error */
  stderr: string;
  /** Exit code */
  exitCode: number;
}

/**
 * Execute shell command
 * @param command - Command to execute
 * @param args - Command arguments
 * @param options - Execution options
 * @returns Command result
 * @throws CommandError if execution fails
 */
export async function exec(
  command: string,
  args: string[] = [],
  options: ExecOptions = {}
): Promise<ExecResult> {
  try {
    const result = await execa(command, args, {
      cwd: options.cwd,
      timeout: options.timeout,
      env: options.env,
    });

    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    };
  } catch (error) {
    const execError = error as ExecaError;
    throw new CommandError(
      `Command failed: ${command} ${args.join(' ')}`,
      {
        command,
        args,
        exitCode: execError.exitCode,
        stderr: execError.stderr,
      }
    );
  }
}

/**
 * Execute command without output (silent)
 * @param command - Command to execute
 * @param args - Command arguments
 * @param options - Execution options
 * @returns Command result
 * @throws CommandError if execution fails
 */
export async function execSilent(
  command: string,
  args: string[] = [],
  options: ExecOptions = {}
): Promise<ExecResult> {
  try {
    const result = await execa(command, args, {
      cwd: options.cwd,
      timeout: options.timeout,
      env: options.env,
      stdio: 'pipe',
    });

    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    };
  } catch (error) {
    const execError = error as ExecaError;
    throw new CommandError(
      `Command failed: ${command} ${args.join(' ')}`,
      {
        command,
        args,
        exitCode: execError.exitCode,
        stderr: execError.stderr,
      }
    );
  }
}

/**
 * Execute command with live output (inherits stdio)
 * @param command - Command to execute
 * @param args - Command arguments
 * @param options - Execution options
 * @returns Command result
 * @throws CommandError if execution fails
 */
export async function execLive(
  command: string,
  args: string[] = [],
  options: ExecOptions = {}
): Promise<ExecResult> {
  try {
    const result = await execa(command, args, {
      cwd: options.cwd,
      timeout: options.timeout,
      env: options.env,
      stdio: 'inherit',
    });

    return {
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      exitCode: result.exitCode,
    };
  } catch (error) {
    const execError = error as ExecaError;
    throw new CommandError(
      `Command failed: ${command} ${args.join(' ')}`,
      {
        command,
        args,
        exitCode: execError.exitCode,
        stderr: execError.stderr || '',
      }
    );
  }
}

/**
 * Check if command exists in PATH
 * @param command - Command name to check
 * @returns True if command exists, false otherwise
 */
export async function commandExists(command: string): Promise<boolean> {
  try {
    await execa('which', [command]);
    return true;
  } catch {
    return false;
  }
}
