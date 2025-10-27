import { describe, it, expect } from 'vitest';
import {
  exec,
  execSilent,
  execLive,
  commandExists,
  type ExecResult,
} from '../../../src/utils/shell.js';
import { CommandError } from '../../../src/utils/errors.js';

describe('Shell Utilities', () => {
  describe('exec', () => {
    it('should execute command successfully', async () => {
      const result = await exec('echo', ['hello']);

      expect(result.stdout).toBe('hello');
      expect(result.exitCode).toBe(0);
    });

    it('should pass arguments correctly', async () => {
      const result = await exec('echo', ['foo', 'bar']);

      expect(result.stdout.trim()).toBe('foo bar');
    });

    it('should support cwd option', async () => {
      const result = await exec('pwd', [], { cwd: '/tmp' });

      // On macOS, /tmp is a symlink to /private/tmp
      expect(result.stdout.trim()).toMatch(/\/(private\/)?tmp/);
    });

    it('should support env option', async () => {
      const result = await exec('node', ['-e', 'console.log(process.env.TEST_VAR)'], {
        env: { TEST_VAR: 'test-value' },
      });

      expect(result.stdout.trim()).toBe('test-value');
    });

    it('should throw CommandError on failure', async () => {
      await expect(exec('false')).rejects.toThrow(CommandError);
    });

    it('should include error details on failure', async () => {
      try {
        await exec('sh', ['-c', 'exit 42']);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(CommandError);
        const cmdError = error as CommandError;
        expect(cmdError.details.exitCode).toBe(42);
        expect(cmdError.details.command).toBe('sh');
      }
    });
  });

  describe('execSilent', () => {
    it('should execute command silently', async () => {
      const result = await execSilent('echo', ['silent']);

      expect(result.stdout).toBe('silent');
      expect(result.exitCode).toBe(0);
    });

    it('should throw CommandError on failure', async () => {
      await expect(execSilent('false')).rejects.toThrow(CommandError);
    });
  });

  describe('execLive', () => {
    it('should execute command with live output', async () => {
      // Note: stdout/stderr will be empty when stdio is inherited
      const result = await execLive('echo', ['live']);

      expect(result.exitCode).toBe(0);
    });

    it('should throw CommandError on failure', async () => {
      await expect(execLive('false')).rejects.toThrow(CommandError);
    });
  });

  describe('commandExists', () => {
    it('should return true for existing command', async () => {
      const result = await commandExists('node');

      expect(result).toBe(true);
    });

    it('should return false for non-existing command', async () => {
      const result = await commandExists('nonexistent-command-xyz');

      expect(result).toBe(false);
    });

    it('should check common commands', async () => {
      const commands = ['ls', 'pwd', 'echo'];

      for (const cmd of commands) {
        const result = await commandExists(cmd);
        expect(result).toBe(true);
      }
    });
  });

  describe('ExecResult type', () => {
    it('should have correct result structure', async () => {
      const result: ExecResult = await exec('echo', ['test']);

      expect(result).toHaveProperty('stdout');
      expect(result).toHaveProperty('stderr');
      expect(result).toHaveProperty('exitCode');
      expect(typeof result.stdout).toBe('string');
      expect(typeof result.stderr).toBe('string');
      expect(typeof result.exitCode).toBe('number');
    });
  });

  describe('timeout option', () => {
    it('should timeout long-running commands', async () => {
      await expect(
        exec('sleep', ['10'], { timeout: 100 })
      ).rejects.toThrow();
    });
  });
});
