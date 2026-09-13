// Bulletproof storage wrapper that gracefully falls back to memory if localStorage is restricted
// (e.g., inside sandboxed iframes, cross-origin restrictions, or privacy modes).

class MemoryStorage implements Storage {
  private store: Map<string, string> = new Map();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] || null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

const memoryFallback = new MemoryStorage();

function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const storageAvailable = isStorageAvailable();

export const safeStorage: Storage = {
  get length(): number {
    if (storageAvailable) {
      try {
        return window.localStorage.length;
      } catch {
        return memoryFallback.length;
      }
    }
    return memoryFallback.length;
  },

  clear(): void {
    if (storageAvailable) {
      try {
        window.localStorage.clear();
        return;
      } catch {
        // Fall back
      }
    }
    memoryFallback.clear();
  },

  getItem(key: string): string | null {
    if (storageAvailable) {
      try {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      } catch {
        // Fall back
      }
    }
    return memoryFallback.getItem(key);
  },

  key(index: number): string | null {
    if (storageAvailable) {
      try {
        return window.localStorage.key(index);
      } catch {
        // Fall back
      }
    }
    return memoryFallback.key(index);
  },

  removeItem(key: string): void {
    if (storageAvailable) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Fall back
      }
    }
    memoryFallback.removeItem(key);
  },

  setItem(key: string, value: string): void {
    if (storageAvailable) {
      try {
        window.localStorage.setItem(key, String(value));
        return;
      } catch {
        // Fall back
      }
    }
    memoryFallback.setItem(key, String(value));
  }
};

// Safe helper functions for direct component usage
export function safeGetItem(key: string, defaultValue = ''): string {
  try {
    const val = safeStorage.getItem(key);
    return val !== null ? val : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    safeStorage.setItem(key, value);
  } catch {
    // Graceful noop
  }
}

export function safeRemoveItem(key: string): void {
  try {
    safeStorage.removeItem(key);
  } catch {
    // Graceful noop
  }
}

// Intercept window.localStorage if it throws in sandboxed iframes
if (typeof window !== 'undefined' && !storageAvailable) {
  try {
    Object.defineProperty(window, 'localStorage', {
      value: safeStorage,
      writable: true,
      configurable: true,
    });
  } catch {
    // Cannot override window.localStorage directly in some runtimes, helper methods should be preferred
  }
}
