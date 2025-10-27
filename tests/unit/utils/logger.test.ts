import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { info, success, warn, error, debug, spinner } from '../../../src/utils/logger.js';

describe('Logger Utilities', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    delete process.env.DEBUG;
  });

  describe('info', () => {
    it('should log info message', () => {
      info('Test info message');

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('ℹ'),
        'Test info message'
      );
    });
  });

  describe('success', () => {
    it('should log success message', () => {
      success('Test success message');

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('✔'),
        'Test success message'
      );
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      warn('Test warning message');

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠'),
        'Test warning message'
      );
    });
  });

  describe('error', () => {
    it('should log error message', () => {
      error('Test error message');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('✖'),
        'Test error message'
      );
    });
  });

  describe('debug', () => {
    it('should not log when DEBUG is not set', () => {
      delete process.env.DEBUG;
      debug('Test debug message');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log when DEBUG=true', () => {
      process.env.DEBUG = 'true';
      debug('Test debug message');

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('🐛'),
        'Test debug message'
      );
    });

    it('should log when DEBUG=1', () => {
      process.env.DEBUG = '1';
      debug('Test debug message');

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('🐛'),
        'Test debug message'
      );
    });

    it('should not log when DEBUG=false', () => {
      process.env.DEBUG = 'false';
      debug('Test debug message');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe('spinner', () => {
    it('should create spinner with text', () => {
      const spin = spinner('Loading...');

      expect(spin).toBeDefined();
      expect(spin.text).toBe('Loading...');
    });

    it('should have start/stop methods', () => {
      const spin = spinner('Test');

      expect(typeof spin.start).toBe('function');
      expect(typeof spin.stop).toBe('function');
      expect(typeof spin.succeed).toBe('function');
      expect(typeof spin.fail).toBe('function');
    });

    it('should allow updating spinner text', () => {
      const spin = spinner('Initial');
      spin.text = 'Updated';

      expect(spin.text).toBe('Updated');
    });
  });
});
