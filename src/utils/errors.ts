/**
 * Catalyst Error Classes
 *
 * Custom error classes for different error types across the application.
 * All errors extend CatalystError base class with error codes and details.
 */

/**
 * Base error class for all Catalyst errors
 */
export class CatalystError extends Error {
  /** Machine-readable error code */
  code: string;
  /** Additional error context */
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for validation failures
 */
export class ValidationError extends CatalystError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

/**
 * Error for filesystem operations
 */
export class FileSystemError extends CatalystError {
  constructor(message: string, details?: any) {
    super(message, 'FILESYSTEM_ERROR', details);
  }
}

/**
 * Error for shell command failures
 */
export class CommandError extends CatalystError {
  constructor(message: string, details?: any) {
    super(message, 'COMMAND_ERROR', details);
  }
}

/**
 * Error for configuration issues
 */
export class ConfigError extends CatalystError {
  constructor(message: string, details?: any) {
    super(message, 'CONFIG_ERROR', details);
  }
}

/**
 * Error type enumeration
 */
export enum ErrorType {
  VALIDATION = 'validation',
  FILESYSTEM = 'filesystem',
  COMMAND = 'command',
  CONFIG = 'config',
}

/**
 * Factory function to create typed errors
 * @param type - Error type
 * @param message - Error message
 * @param details - Additional error context
 * @returns Typed CatalystError instance
 */
export function createError(
  type: ErrorType,
  message: string,
  details?: any
): CatalystError {
  switch (type) {
    case ErrorType.VALIDATION:
      return new ValidationError(message, details);
    case ErrorType.FILESYSTEM:
      return new FileSystemError(message, details);
    case ErrorType.COMMAND:
      return new CommandError(message, details);
    case ErrorType.CONFIG:
      return new ConfigError(message, details);
    default:
      return new CatalystError(message, 'UNKNOWN_ERROR', details);
  }
}

/**
 * Format error for CLI display
 * @param error - Error to format
 * @returns Formatted error message
 */
export function formatError(error: CatalystError): string {
  let output = `${error.name}: ${error.message}`;

  if (error.details) {
    output += `\n\nDetails:\n${JSON.stringify(error.details, null, 2)}`;
  }

  if (error.stack) {
    output += `\n\nStack:\n${error.stack}`;
  }

  return output;
}
