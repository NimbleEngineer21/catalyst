import { describe, it, expect } from 'vitest';
import {
  CatalystError,
  ValidationError,
  FileSystemError,
  CommandError,
  ConfigError,
  ErrorType,
  createError,
  formatError,
} from '../../../src/utils/errors.js';

describe('Error Classes', () => {
  describe('CatalystError', () => {
    it('should create base error with code and details', () => {
      const error = new CatalystError('Test error', 'TEST_ERROR', {
        foo: 'bar',
      });

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(CatalystError);
      expect(error.name).toBe('CatalystError');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_ERROR');
      expect(error.details).toEqual({ foo: 'bar' });
    });

    it('should work without details', () => {
      const error = new CatalystError('Test error', 'TEST_ERROR');

      expect(error.details).toBeUndefined();
    });
  });

  describe('ValidationError', () => {
    it('should create validation error', () => {
      const error = new ValidationError('Invalid input', { field: 'email' });

      expect(error).toBeInstanceOf(CatalystError);
      expect(error.name).toBe('ValidationError');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toBe('Invalid input');
      expect(error.details).toEqual({ field: 'email' });
    });
  });

  describe('FileSystemError', () => {
    it('should create filesystem error', () => {
      const error = new FileSystemError('File not found', { path: '/test' });

      expect(error).toBeInstanceOf(CatalystError);
      expect(error.name).toBe('FileSystemError');
      expect(error.code).toBe('FILESYSTEM_ERROR');
      expect(error.message).toBe('File not found');
      expect(error.details).toEqual({ path: '/test' });
    });
  });

  describe('CommandError', () => {
    it('should create command error', () => {
      const error = new CommandError('Command failed', {
        command: 'test',
        exitCode: 1,
      });

      expect(error).toBeInstanceOf(CatalystError);
      expect(error.name).toBe('CommandError');
      expect(error.code).toBe('COMMAND_ERROR');
      expect(error.message).toBe('Command failed');
      expect(error.details).toEqual({ command: 'test', exitCode: 1 });
    });
  });

  describe('ConfigError', () => {
    it('should create config error', () => {
      const error = new ConfigError('Invalid config', {
        key: 'missingValue',
      });

      expect(error).toBeInstanceOf(CatalystError);
      expect(error.name).toBe('ConfigError');
      expect(error.code).toBe('CONFIG_ERROR');
      expect(error.message).toBe('Invalid config');
      expect(error.details).toEqual({ key: 'missingValue' });
    });
  });
});

describe('createError Factory', () => {
  it('should create ValidationError', () => {
    const error = createError(ErrorType.VALIDATION, 'Test', { foo: 'bar' });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.code).toBe('VALIDATION_ERROR');
  });

  it('should create FileSystemError', () => {
    const error = createError(ErrorType.FILESYSTEM, 'Test', { foo: 'bar' });

    expect(error).toBeInstanceOf(FileSystemError);
    expect(error.code).toBe('FILESYSTEM_ERROR');
  });

  it('should create CommandError', () => {
    const error = createError(ErrorType.COMMAND, 'Test', { foo: 'bar' });

    expect(error).toBeInstanceOf(CommandError);
    expect(error.code).toBe('COMMAND_ERROR');
  });

  it('should create ConfigError', () => {
    const error = createError(ErrorType.CONFIG, 'Test', { foo: 'bar' });

    expect(error).toBeInstanceOf(ConfigError);
    expect(error.code).toBe('CONFIG_ERROR');
  });
});

describe('formatError', () => {
  it('should format error with details', () => {
    const error = new ValidationError('Test error', { field: 'email' });
    const formatted = formatError(error);

    expect(formatted).toContain('ValidationError: Test error');
    expect(formatted).toContain('Details:');
    expect(formatted).toContain('"field": "email"');
  });

  it('should format error without details', () => {
    const error = new ValidationError('Test error');
    const formatted = formatError(error);

    expect(formatted).toContain('ValidationError: Test error');
  });

  it('should include stack trace', () => {
    const error = new ValidationError('Test error');
    const formatted = formatError(error);

    expect(formatted).toContain('Stack:');
  });
});
