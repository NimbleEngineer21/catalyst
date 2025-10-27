/**
 * Logger Utilities
 *
 * Colored console logging with chalk and spinner support with ora.
 * Supports different log levels and debug mode via environment variables.
 */

import chalk from 'chalk';
import ora, { type Ora } from 'ora';

/**
 * Check if debug mode is enabled
 */
const isDebugEnabled = (): boolean => {
  return process.env.DEBUG === 'true' || process.env.DEBUG === '1';
};

/**
 * Log info message (blue)
 * @param message - Message to log
 */
export function info(message: string): void {
  console.log(chalk.blue('ℹ'), message);
}

/**
 * Log success message (green)
 * @param message - Message to log
 */
export function success(message: string): void {
  console.log(chalk.green('✔'), message);
}

/**
 * Log warning message (yellow)
 * @param message - Message to log
 */
export function warn(message: string): void {
  console.warn(chalk.yellow('⚠'), message);
}

/**
 * Log error message (red)
 * @param message - Message to log
 */
export function error(message: string): void {
  console.error(chalk.red('✖'), message);
}

/**
 * Log debug message (gray, only if DEBUG=true)
 * @param message - Message to log
 */
export function debug(message: string): void {
  if (isDebugEnabled()) {
    console.log(chalk.gray('🐛'), message);
  }
}

/**
 * Create spinner for long-running operations
 * @param text - Initial spinner text
 * @returns Ora spinner instance
 */
export function spinner(text: string): Ora {
  return ora(text);
}
