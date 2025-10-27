/**
 * Catalyst CLI - Main Entry Point
 *
 * This is a minimal placeholder for Story 1.3.
 * Full CLI implementation will be added in Epic 2.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../../package.json');

console.log(`🚀 Catalyst CLI v${version}`);
console.log('Development environment initializing...');
console.log('Full implementation coming in Epic 2!');

export {};
