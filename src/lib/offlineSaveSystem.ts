import { safeGetItem, safeSetItem, safeStorage } from './safeStorage';
import { App as CapApp } from '@capacitor/app';

export const SAVE_DATA_VERSION = 2;
export const SAVE_STORAGE_KEY = 'mergeverse_offline_save_v2';
export const LEGACY_STORAGE_KEY = 'economy-storage';

export interface LocalMatchRecord {
  id: string;
  score: number;
  highestTile: number;
  merges: number;
  combo: number;
  mode: string;
  date: string;
  timestamp: number;
}

export interface PlayerSaveData {
  version: number;
  profile: {
    nickname: string;
    avatarId: string;
    anonymousId: string;
  };
  currencies: {
    coins: number;
    gems: number;
    energy: number;
    premiumTokens: number;
  };
  progression: {
    level: number;
    xp: number;
    bestScore: number;
    highScores: LocalMatchRecord[];
  };
  inventory: {
    powerups: {
      undo: number;
      hammer: number;
      swap: number;
      shuffle: number;
      double: number;
      bomb?: number;
      colorChange?: number;
    };
    unlockedThemes: string[];
    vipLevel: number;
    vipXp: number;
  };
  missions: {
    missions: any[];
    missionsDate: string | null;
  };
  rewards: {
    dailyRewardClaimedAt: number | null;
    streak: number;
    longestStreak: number;
    lastLoginDate: string | null;
    vipDailyRewardClaimedAt: number | null;
    luckySpinUsedAt: number | null;
    luckySpinsAvailable: number;
  };
  settings: {
    muted: boolean;
    quickBuyEnabled: boolean;
    difficultyMode: 'easy' | 'medium' | 'hard' | 'extreme' | 'impossible';
    lowPowerMode: boolean;
    activeTheme: string;
  };
  statistics: {
    totalMerges: number;
    highestTile: number;
    bombsUsed: number;
    totalScore: number;
    matchesPlayed: number;
    maxCombo: number;
    bestSurvivalScore: number;
    bossesDefeated: number;
  };
  timestamps: {
    createdAt: number;
    lastSavedAt: number;
    lastEnergyUpdate: number;
  };
}

export function getDefaultSaveData(): PlayerSaveData {
  const generatedId = 'MV-' + Math.floor(1000 + Math.random() * 9000);
  const now = Date.now();
  return {
    version: SAVE_DATA_VERSION,
    profile: {
      nickname: 'Cosmic Pilot',
      avatarId: '1',
      anonymousId: generatedId,
    },
    currencies: {
      coins: 1000,
      gems: 50,
      energy: 50,
      premiumTokens: 0,
    },
    progression: {
      level: 1,
      xp: 0,
      bestScore: 12400,
      highScores: [
        {
          id: 'initial-run',
          score: 12400,
          highestTile: 512,
          merges: 88,
          combo: 4,
          mode: 'classic',
          date: new Date().toLocaleDateString(),
          timestamp: now - 3600000,
        },
      ],
    },
    inventory: {
      powerups: {
        undo: 3,
        hammer: 2,
        swap: 2,
        shuffle: 2,
        double: 1,
        bomb: 2,
        colorChange: 2,
      },
      unlockedThemes: ['classic', 'neon', 'cyber', 'sunset'],
      vipLevel: 0,
      vipXp: 0,
    },
    missions: {
      missions: [],
      missionsDate: null,
    },
    rewards: {
      dailyRewardClaimedAt: null,
      streak: 1,
      longestStreak: 1,
      lastLoginDate: new Date().toDateString(),
      vipDailyRewardClaimedAt: null,
      luckySpinUsedAt: null,
      luckySpinsAvailable: 1,
    },
    settings: {
      muted: false,
      quickBuyEnabled: false,
      difficultyMode: 'medium',
      lowPowerMode: false,
      activeTheme: 'classic',
    },
    statistics: {
      totalMerges: 0,
      highestTile: 2,
      bombsUsed: 0,
      totalScore: 0,
      matchesPlayed: 0,
      maxCombo: 0,
      bestSurvivalScore: 0,
      bossesDefeated: 0,
    },
    timestamps: {
      createdAt: now,
      lastSavedAt: now,
      lastEnergyUpdate: now,
    },
  };
}

/**
 * Migrates older data formats or legacy economy-storage keys into the unified v2 schema.
 */
function migrateSaveData(raw: any): PlayerSaveData {
  const defaults = getDefaultSaveData();
  if (!raw || typeof raw !== 'object') {
    return defaults;
  }

  // Handle zustand wrapped state: { state: { ... }, version: ... }
  const src = raw.state ? raw.state : raw;

  return {
    version: SAVE_DATA_VERSION,
    profile: {
      nickname: typeof src.nickname === 'string' && src.nickname.trim() ? src.nickname.trim() : defaults.profile.nickname,
      avatarId: typeof src.avatarId === 'string' ? src.avatarId : defaults.profile.avatarId,
      anonymousId: typeof src.anonymousId === 'string' ? src.anonymousId : defaults.profile.anonymousId,
    },
    currencies: {
      coins: Math.max(0, typeof src.coins === 'number' ? src.coins : defaults.currencies.coins),
      gems: Math.max(0, typeof src.gems === 'number' ? src.gems : defaults.currencies.gems),
      energy: Math.max(0, typeof src.energy === 'number' ? src.energy : defaults.currencies.energy),
      premiumTokens: Math.max(0, typeof src.premiumTokens === 'number' ? src.premiumTokens : defaults.currencies.premiumTokens),
    },
    progression: {
      level: Math.max(1, typeof src.level === 'number' ? src.level : defaults.progression.level),
      xp: Math.max(0, typeof src.xp === 'number' ? src.xp : defaults.progression.xp),
      bestScore: Math.max(0, typeof src.bestScore === 'number' ? src.bestScore : defaults.progression.bestScore),
      highScores: Array.isArray(src.highScores) ? src.highScores : defaults.progression.highScores,
    },
    inventory: {
      powerups: {
        undo: Math.max(0, typeof src.inventory?.undo === 'number' ? src.inventory.undo : defaults.inventory.powerups.undo),
        hammer: Math.max(0, typeof src.inventory?.hammer === 'number' ? src.inventory.hammer : defaults.inventory.powerups.hammer),
        swap: Math.max(0, typeof src.inventory?.swap === 'number' ? src.inventory.swap : defaults.inventory.powerups.swap),
        shuffle: Math.max(0, typeof src.inventory?.shuffle === 'number' ? src.inventory.shuffle : defaults.inventory.powerups.shuffle),
        double: Math.max(0, typeof src.inventory?.double === 'number' ? src.inventory.double : defaults.inventory.powerups.double),
      },
      unlockedThemes: Array.isArray(src.unlockedThemes) && src.unlockedThemes.length > 0 ? src.unlockedThemes : defaults.inventory.unlockedThemes,
      vipLevel: Math.max(0, typeof src.vipLevel === 'number' ? src.vipLevel : 0),
      vipXp: Math.max(0, typeof src.vipXp === 'number' ? src.vipXp : 0),
    },
    missions: {
      missions: Array.isArray(src.missions) ? src.missions : defaults.missions.missions,
      missionsDate: typeof src.missionsDate === 'string' ? src.missionsDate : defaults.missions.missionsDate,
    },
    rewards: {
      dailyRewardClaimedAt: typeof src.dailyRewardClaimedAt === 'number' ? src.dailyRewardClaimedAt : defaults.rewards.dailyRewardClaimedAt,
      streak: Math.max(1, typeof src.streak === 'number' ? src.streak : defaults.rewards.streak),
      longestStreak: Math.max(1, typeof src.longestStreak === 'number' ? src.longestStreak : defaults.rewards.longestStreak),
      lastLoginDate: typeof src.lastLoginDate === 'string' ? src.lastLoginDate : defaults.rewards.lastLoginDate,
      vipDailyRewardClaimedAt: typeof src.vipDailyRewardClaimedAt === 'number' ? src.vipDailyRewardClaimedAt : defaults.rewards.vipDailyRewardClaimedAt,
      luckySpinUsedAt: typeof src.luckySpinUsedAt === 'number' ? src.luckySpinUsedAt : defaults.rewards.luckySpinUsedAt,
      luckySpinsAvailable: Math.max(0, typeof src.luckySpinsAvailable === 'number' ? src.luckySpinsAvailable : defaults.rewards.luckySpinsAvailable),
    },
    settings: {
      muted: typeof src.muted === 'boolean' ? src.muted : defaults.settings.muted,
      quickBuyEnabled: typeof src.quickBuyEnabled === 'boolean' ? src.quickBuyEnabled : defaults.settings.quickBuyEnabled,
      difficultyMode: src.difficultyMode || defaults.settings.difficultyMode,
      lowPowerMode: typeof src.lowPowerMode === 'boolean' ? src.lowPowerMode : defaults.settings.lowPowerMode,
      activeTheme: src.activeTheme || defaults.settings.activeTheme,
    },
    statistics: {
      totalMerges: Math.max(0, typeof src.stats?.totalMerges === 'number' ? src.stats.totalMerges : (typeof src.totalMerges === 'number' ? src.totalMerges : defaults.statistics.totalMerges)),
      highestTile: Math.max(2, typeof src.stats?.highestTile === 'number' ? src.stats.highestTile : (typeof src.highestTile === 'number' ? src.highestTile : defaults.statistics.highestTile)),
      bombsUsed: Math.max(0, typeof src.stats?.bombsUsed === 'number' ? src.stats.bombsUsed : (typeof src.bombsUsed === 'number' ? src.bombsUsed : defaults.statistics.bombsUsed)),
      totalScore: Math.max(0, typeof src.stats?.totalScore === 'number' ? src.stats.totalScore : (typeof src.totalScore === 'number' ? src.totalScore : defaults.statistics.totalScore)),
      matchesPlayed: Math.max(0, typeof src.stats?.matchesPlayed === 'number' ? src.stats.matchesPlayed : (typeof src.matchesPlayed === 'number' ? src.matchesPlayed : defaults.statistics.matchesPlayed)),
      maxCombo: Math.max(0, typeof src.stats?.maxCombo === 'number' ? src.stats.maxCombo : (typeof src.maxCombo === 'number' ? src.maxCombo : defaults.statistics.maxCombo)),
      bestSurvivalScore: Math.max(0, typeof src.stats?.bestSurvivalScore === 'number' ? src.stats.bestSurvivalScore : defaults.statistics.bestSurvivalScore),
      bossesDefeated: Math.max(0, typeof src.stats?.bossesDefeated === 'number' ? src.stats.bossesDefeated : defaults.statistics.bossesDefeated),
    },
    timestamps: {
      createdAt: typeof src.timestamps?.createdAt === 'number' ? src.timestamps.createdAt : (typeof src.createdAt === 'number' ? src.createdAt : defaults.timestamps.createdAt),
      lastSavedAt: Date.now(),
      lastEnergyUpdate: typeof src.lastEnergyUpdate === 'number' ? src.lastEnergyUpdate : defaults.timestamps.lastEnergyUpdate,
    },
  };
}

/**
 * Loads the player's saved offline game data with robust corrupted data recovery.
 */
export function loadPlayerSaveData(): PlayerSaveData {
  try {
    // 1. Check current v2 storage key
    const rawV2 = safeGetItem(SAVE_STORAGE_KEY, '');
    if (rawV2) {
      try {
        const parsed = JSON.parse(rawV2);
        if (parsed && typeof parsed === 'object') {
          return migrateSaveData(parsed);
        }
      } catch (parseErr) {
        console.warn('[OfflineSave] Corrupt v2 save found, attempting recovery from legacy storage:', parseErr);
      }
    }

    // 2. Fallback to legacy economy-storage
    const rawLegacy = safeGetItem(LEGACY_STORAGE_KEY, '');
    if (rawLegacy) {
      try {
        const parsedLegacy = JSON.parse(rawLegacy);
        const migrated = migrateSaveData(parsedLegacy);
        // Persist migrated format
        savePlayerSaveData(migrated);
        return migrated;
      } catch (legacyErr) {
        console.warn('[OfflineSave] Legacy storage unparseable:', legacyErr);
      }
    }

    // 3. First time player default profile
    const freshData = getDefaultSaveData();
    savePlayerSaveData(freshData);
    return freshData;
  } catch (err) {
    console.error('[OfflineSave] Critical error in loadPlayerSaveData, recovering with defaults:', err);
    return getDefaultSaveData();
  }
}

/**
 * Atomically writes player data to local safeStorage.
 */
export function savePlayerSaveData(data: PlayerSaveData): boolean {
  try {
    const toSave: PlayerSaveData = {
      ...data,
      version: SAVE_DATA_VERSION,
      timestamps: {
        ...data.timestamps,
        lastSavedAt: Date.now(),
      },
    };
    const serialized = JSON.stringify(toSave);
    safeSetItem(SAVE_STORAGE_KEY, serialized);
    return true;
  } catch (err) {
    console.warn('[OfflineSave] Failed to save game data locally:', err);
    return false;
  }
}

/**
 * Registers lifecycle hooks to ensure progress is committed before exit or app backgrounding.
 */
export function setupOfflineSaveHooks(getSaveData: () => PlayerSaveData): () => void {
  const saveCurrent = () => {
    try {
      const data = getSaveData();
      savePlayerSaveData(data);
    } catch (e) {
      console.warn('[OfflineSave] Error in lifecycle save:', e);
    }
  };

  // Browser / WebView page visibility change
  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      saveCurrent();
    }
  };

  // Browser beforeunload
  const handleBeforeUnload = () => {
    saveCurrent();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  // Capacitor Native App state change (handles phone home button, app switching, lock screen)
  let capacitorStateRemover: (() => void) | null = null;
  try {
    CapApp.addListener('appStateChange', (state) => {
      if (!state.isActive) {
        saveCurrent();
      }
    }).then((listener) => {
      capacitorStateRemover = () => listener.remove();
    }).catch(() => {
      // Non-capacitor environment
    });
  } catch {
    // Graceful fallback
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
    if (capacitorStateRemover) {
      capacitorStateRemover();
    }
  };
}
