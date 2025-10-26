# Story 2.4: Implement macOS Keychain Integration

**Epic:** Epic 2 - Core CLI Implementation  
**Story ID:** 2.4  
**Priority:** P0 (Must Have)  
**Status:** Approved  
**Estimated Effort:** 4 hours

---

## User Story

**As a** user,  
**I want** my API keys stored securely in macOS Keychain,  
**so that** my credentials are protected.

---

## Context

Implements secure credential storage using macOS Keychain Services, ensuring API keys and sensitive data are never stored in plaintext configuration files.

**Dependencies:**
- Story 1.4: Create Core Utility Modules
- Story 2.3: Implement Configuration Manager

**Enables:**
- Story 2.5: catalyst setup (stores API keys)
- Story 2.8: catalyst config (manages secrets)
- All features requiring secure credential storage

---

## Acceptance Criteria

### 1. Keychain Module (`src/utils/keychain.ts`)
- [ ] Module created with Keychain operations
- [ ] Uses macOS `security` command-line tool
- [ ] TypeScript types properly defined

### 2. Store Credentials
- [ ] `store(service: string, account: string, password: string): Promise<void>`
- [ ] Creates or updates Keychain item
- [ ] Service name: `com.catalyst.{service}`
- [ ] Handles duplicate items (updates existing)

### 3. Retrieve Credentials
- [ ] `retrieve(service: string, account: string): Promise<string | null>`
- [ ] Returns password if found
- [ ] Returns null if not found
- [ ] Handles "not found" gracefully

### 4. Delete Credentials
- [ ] `delete(service: string, account: string): Promise<void>`
- [ ] Removes Keychain item
- [ ] No error if item doesn't exist

### 5. List Credentials
- [ ] `list(): Promise<KeychainItem[]>`  
- [ ] Lists all Catalyst-related Keychain items
- [ ] Returns service and account names (not passwords)

### 6. Error Handling
- [ ] Keychain access denied shows helpful message
- [ ] User cancellation handled gracefully
- [ ] Command not found (non-macOS) returns clear error
- [ ] All errors logged appropriately

### 7. Environment Variable Fallback
- [ ] If Keychain fails, check environment variables
- [ ] Document fallback behavior
- [ ] Warn user when using fallback

### 8. Unit Tests
- [ ] Test store operation (mocked `security` command)
- [ ] Test retrieve operation
- [ ] Test delete operation
- [ ] Test error handling
- [ ] >80% coverage

---

## Technical Implementation

```typescript
// src/utils/keychain.ts
import { exec } from '@/utils/shell';
import { logger } from '@/utils';

const SERVICE_PREFIX = 'com.catalyst';

export async function store(
  service: string,
  account: string,
  password: string
): Promise<void> {
  const serviceName = `${SERVICE_PREFIX}.${service}`;
  
  try {
    await exec('security', [
      'add-generic-password',
      '-s', serviceName,
      '-a', account,
      '-w', password,
      '-U', // Update if exists
    ]);
    
    logger.debug(`Stored credential: ${service}/${account}`);
  } catch (error) {
    throw new Error(`Failed to store credential in Keychain: ${error}`);
  }
}

export async function retrieve(
  service: string,
  account: string
): Promise<string | null> {
  const serviceName = `${SERVICE_PREFIX}.${service}`;
  
  try {
    const { stdout } = await exec('security', [
      'find-generic-password',
      '-s', serviceName,
      '-a', account,
      '-w', // Return password only
    ]);
    
    return stdout.trim();
  } catch (error) {
    // Item not found
    return null;
  }
}

export async function deleteCredential(
  service: string,
  account: string
): Promise<void> {
  const serviceName = `${SERVICE_PREFIX}.${service}`;

  try {
    await exec('security', [
      'delete-generic-password',
      '-s', serviceName,
      '-a', account,
    ]);

    logger.debug(`Deleted credential: ${service}/${account}`);
  } catch (error) {
    // Ignore if not found
  }
}

export interface KeychainItem {
  service: string;
  account: string;
}

/**
 * List all Catalyst-related Keychain items
 * @returns Array of keychain items (without passwords)
 */
export async function list(): Promise<KeychainItem[]> {
  try {
    const { stdout } = await exec('security', [
      'dump-keychain',
    ]);

    const items: KeychainItem[] = [];
    const lines = stdout.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Look for service names that match our prefix
      if (line.includes('svce') && line.includes(SERVICE_PREFIX)) {
        const serviceMatch = line.match(/"([^"]+)"/);
        const service = serviceMatch ? serviceMatch[1].replace(`${SERVICE_PREFIX}.`, '') : '';

        // Look ahead for account name
        let account = '';
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          if (lines[j].includes('acct')) {
            const accountMatch = lines[j].match(/"([^"]+)"/);
            if (accountMatch) {
              account = accountMatch[1];
              break;
            }
          }
        }

        if (service && account) {
          items.push({ service, account });
        }
      }
    }

    return items;
  } catch (error) {
    logger.warn('Failed to list Keychain items:', error);
    return [];
  }
}

/**
 * Retrieve credential with environment variable fallback
 * First tries Keychain, then falls back to environment variable
 * @param service - Service name
 * @param account - Account name
 * @param envVarName - Optional environment variable name (e.g., 'ANTHROPIC_API_KEY')
 * @returns Credential value or null if not found
 */
export async function retrieveWithFallback(
  service: string,
  account: string,
  envVarName?: string
): Promise<string | null> {
  // Try Keychain first
  const keychainValue = await retrieve(service, account);

  if (keychainValue) {
    return keychainValue;
  }

  // Fall back to environment variable if specified
  if (envVarName && process.env[envVarName]) {
    logger.warn(
      `Using environment variable ${envVarName} for ${service}/${account}. ` +
      `Consider storing in Keychain with 'catalyst config set --secret ${service}.${account}'`
    );
    return process.env[envVarName];
  }

  return null;
}

/**
 * Store credential with automatic service detection
 * Convenience function that also sets environment variable hint
 * @param service - Service name (e.g., 'anthropic', 'openai')
 * @param account - Account name (e.g., 'api_key')
 * @param password - The credential value
 * @param envVarName - Optional environment variable name for documentation
 */
export async function storeWithMetadata(
  service: string,
  account: string,
  password: string,
  envVarName?: string
): Promise<void> {
  await store(service, account, password);

  if (envVarName) {
    logger.info(
      `Credential stored in Keychain. You can also use environment variable ${envVarName} as fallback.`
    );
  }
}
```

---

## Architecture References

- [Security Architecture](../../architecture/08-security-architecture.md) - Keychain integration
- [CLI Architecture](../../architecture/03-cli-architecture.md) - Credential management

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Keychain module implemented
- [ ] Store/retrieve/delete working
- [ ] Error handling comprehensive
- [ ] Unit tests passing (>80% coverage)
- [ ] Manual testing on macOS
- [ ] Code committed
- [ ] Story reviewed and accepted

---

**Created:** October 26, 2025
