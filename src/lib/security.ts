// Security helper module for MergeVerse Studio Control
const MASTER_PIN_SALT = 'mergeverse_salt_998dd_';
// Pre-computed SHA-256 hash of (MASTER_PIN_SALT + '312048')
const MASTER_PIN_HASH = '0b7305d48583bb749fc51f3b1d1d8504131789d20a8be0ef6555a3a8c7b5f896';

// Synchronous SHA-256 fallback / Web Crypto implementation
async function sha256Hex(message: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Node.js crypto fallback
  try {
    const nodeCrypto = await import('crypto');
    return nodeCrypto.createHash('sha256').update(message).digest('hex');
  } catch {
    return '';
  }
}

// In-memory rate limiting for brute-force protection
let failedAttempts = 0;
let lockoutUntil = 0;

export async function verifyMasterPin(pin: string): Promise<{ valid: boolean; error?: string; remainingLockoutSeconds?: number }> {
  const now = Date.now();
  if (now < lockoutUntil) {
    const remaining = Math.ceil((lockoutUntil - now) / 1000);
    return { valid: false, error: `Too many failed attempts. Lockout active for ${remaining} seconds.`, remainingLockoutSeconds: remaining };
  }

  const cleanPin = pin.trim();
  if (!cleanPin) {
    return { valid: false, error: 'Passcode cannot be empty.' };
  }

  const computedHash = await sha256Hex(MASTER_PIN_SALT + cleanPin);
  
  if (computedHash === MASTER_PIN_HASH) {
    failedAttempts = 0;
    lockoutUntil = 0;
    return { valid: true };
  }

  failedAttempts++;
  if (failedAttempts >= 5) {
    lockoutUntil = now + 60000; // 60 seconds lockout
    return { valid: false, error: 'Too many failed attempts. System locked for 60 seconds.', remainingLockoutSeconds: 60 };
  }

  return { valid: false, error: `Invalid Master PIN. (${5 - failedAttempts} attempts remaining before lockout)` };
}

export function resetSecurityRateLimit() {
  failedAttempts = 0;
  lockoutUntil = 0;
}
