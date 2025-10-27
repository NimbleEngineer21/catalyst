import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  readFile,
  readJson,
  writeFile,
  writeJson,
  exists,
  ensureDir,
  remove,
  copy,
} from '../../../src/utils/filesystem.js';
import { FileSystemError } from '../../../src/utils/errors.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('Filesystem Utilities', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create temporary test directory
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'catalyst-test-'));
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.remove(testDir);
  });

  describe('readFile', () => {
    it('should read file content as string', async () => {
      const filePath = path.join(testDir, 'test.txt');
      const content = 'Hello, Catalyst!';
      await fs.writeFile(filePath, content);

      const result = await readFile(filePath);

      expect(result).toBe(content);
    });

    it('should throw FileSystemError if file does not exist', async () => {
      const filePath = path.join(testDir, 'nonexistent.txt');

      await expect(readFile(filePath)).rejects.toThrow(FileSystemError);
    });
  });

  describe('readJson', () => {
    it('should read and parse JSON file', async () => {
      const filePath = path.join(testDir, 'test.json');
      const data = { name: 'Catalyst', version: '1.0.0' };
      await fs.writeJson(filePath, data);

      const result = await readJson(filePath);

      expect(result).toEqual(data);
    });

    it('should throw FileSystemError if JSON is invalid', async () => {
      const filePath = path.join(testDir, 'invalid.json');
      await fs.writeFile(filePath, 'invalid json');

      await expect(readJson(filePath)).rejects.toThrow(FileSystemError);
    });
  });

  describe('writeFile', () => {
    it('should write content to file', async () => {
      const filePath = path.join(testDir, 'output.txt');
      const content = 'Test content';

      await writeFile(filePath, content);

      const result = await fs.readFile(filePath, 'utf-8');
      expect(result).toBe(content);
    });

    it('should overwrite existing file', async () => {
      const filePath = path.join(testDir, 'output.txt');
      await fs.writeFile(filePath, 'old content');

      await writeFile(filePath, 'new content');

      const result = await fs.readFile(filePath, 'utf-8');
      expect(result).toBe('new content');
    });
  });

  describe('writeJson', () => {
    it('should write JSON with formatting', async () => {
      const filePath = path.join(testDir, 'output.json');
      const data = { name: 'Test', value: 123 };

      await writeJson(filePath, data);

      const result = await fs.readJson(filePath);
      expect(result).toEqual(data);

      // Check formatting (should be pretty-printed)
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('\n');
    });
  });

  describe('exists', () => {
    it('should return true if file exists', async () => {
      const filePath = path.join(testDir, 'exists.txt');
      await fs.writeFile(filePath, 'content');

      const result = await exists(filePath);

      expect(result).toBe(true);
    });

    it('should return false if file does not exist', async () => {
      const filePath = path.join(testDir, 'nonexistent.txt');

      const result = await exists(filePath);

      expect(result).toBe(false);
    });

    it('should return true if directory exists', async () => {
      const result = await exists(testDir);

      expect(result).toBe(true);
    });
  });

  describe('ensureDir', () => {
    it('should create directory if it does not exist', async () => {
      const dirPath = path.join(testDir, 'new-dir');

      await ensureDir(dirPath);

      const stat = await fs.stat(dirPath);
      expect(stat.isDirectory()).toBe(true);
    });

    it('should not fail if directory already exists', async () => {
      const dirPath = path.join(testDir, 'existing-dir');
      await fs.mkdir(dirPath);

      await expect(ensureDir(dirPath)).resolves.not.toThrow();
    });

    it('should create nested directories', async () => {
      const dirPath = path.join(testDir, 'a', 'b', 'c');

      await ensureDir(dirPath);

      const stat = await fs.stat(dirPath);
      expect(stat.isDirectory()).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove file', async () => {
      const filePath = path.join(testDir, 'to-remove.txt');
      await fs.writeFile(filePath, 'content');

      await remove(filePath);

      expect(await fs.pathExists(filePath)).toBe(false);
    });

    it('should remove directory', async () => {
      const dirPath = path.join(testDir, 'to-remove-dir');
      await fs.mkdir(dirPath);
      await fs.writeFile(path.join(dirPath, 'file.txt'), 'content');

      await remove(dirPath);

      expect(await fs.pathExists(dirPath)).toBe(false);
    });

    it('should not fail if path does not exist', async () => {
      const filePath = path.join(testDir, 'nonexistent.txt');

      await expect(remove(filePath)).resolves.not.toThrow();
    });
  });

  describe('copy', () => {
    it('should copy file', async () => {
      const srcPath = path.join(testDir, 'source.txt');
      const destPath = path.join(testDir, 'dest.txt');
      const content = 'Test content';
      await fs.writeFile(srcPath, content);

      await copy(srcPath, destPath);

      const result = await fs.readFile(destPath, 'utf-8');
      expect(result).toBe(content);
    });

    it('should copy directory', async () => {
      const srcDir = path.join(testDir, 'src-dir');
      const destDir = path.join(testDir, 'dest-dir');
      await fs.mkdir(srcDir);
      await fs.writeFile(path.join(srcDir, 'file.txt'), 'content');

      await copy(srcDir, destDir);

      expect(await fs.pathExists(path.join(destDir, 'file.txt'))).toBe(true);
    });

    it('should throw FileSystemError if source does not exist', async () => {
      const srcPath = path.join(testDir, 'nonexistent.txt');
      const destPath = path.join(testDir, 'dest.txt');

      await expect(copy(srcPath, destPath)).rejects.toThrow(FileSystemError);
    });
  });
});
