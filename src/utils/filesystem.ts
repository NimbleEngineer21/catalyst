/**
 * Filesystem Utilities
 *
 * Type-safe wrappers around fs-extra for common filesystem operations.
 * All functions handle errors gracefully and throw FileSystemError on failure.
 */

import fs from 'fs-extra';
import { FileSystemError } from './errors.js';

/**
 * Read file content as string
 * @param path - File path to read
 * @returns File content as string
 * @throws FileSystemError if read fails
 */
export async function readFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf-8');
  } catch (error) {
    throw new FileSystemError(`Failed to read file: ${path}`, { cause: error });
  }
}

/**
 * Read and parse JSON file
 * @param path - JSON file path
 * @returns Parsed JSON object
 * @throws FileSystemError if read or parse fails
 */
export async function readJson<T = any>(path: string): Promise<T> {
  try {
    return await fs.readJson(path);
  } catch (error) {
    throw new FileSystemError(`Failed to read JSON: ${path}`, { cause: error });
  }
}

/**
 * Write content to file
 * @param path - File path to write
 * @param content - Content to write
 * @throws FileSystemError if write fails
 */
export async function writeFile(path: string, content: string): Promise<void> {
  try {
    await fs.writeFile(path, content, 'utf-8');
  } catch (error) {
    throw new FileSystemError(`Failed to write file: ${path}`, { cause: error });
  }
}

/**
 * Write JSON to file with formatting
 * @param path - File path to write
 * @param data - Data to write as JSON
 * @throws FileSystemError if write fails
 */
export async function writeJson(path: string, data: any): Promise<void> {
  try {
    await fs.writeJson(path, data, { spaces: 2 });
  } catch (error) {
    throw new FileSystemError(`Failed to write JSON: ${path}`, { cause: error });
  }
}

/**
 * Check if path exists
 * @param path - Path to check
 * @returns True if path exists, false otherwise
 */
export async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create directory if it doesn't exist
 * @param path - Directory path to create
 * @throws FileSystemError if creation fails
 */
export async function ensureDir(path: string): Promise<void> {
  try {
    await fs.ensureDir(path);
  } catch (error) {
    throw new FileSystemError(`Failed to ensure directory: ${path}`, {
      cause: error,
    });
  }
}

/**
 * Remove file or directory
 * @param path - Path to remove
 * @throws FileSystemError if removal fails
 */
export async function remove(path: string): Promise<void> {
  try {
    await fs.remove(path);
  } catch (error) {
    throw new FileSystemError(`Failed to remove: ${path}`, { cause: error });
  }
}

/**
 * Copy file or directory
 * @param src - Source path
 * @param dest - Destination path
 * @throws FileSystemError if copy fails
 */
export async function copy(src: string, dest: string): Promise<void> {
  try {
    await fs.copy(src, dest);
  } catch (error) {
    throw new FileSystemError(`Failed to copy from ${src} to ${dest}`, {
      cause: error,
    });
  }
}
