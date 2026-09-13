import { useEffect } from 'react';
import { useEconomyStore } from '../store/economyStore';
import { setupOfflineSaveHooks, savePlayerSaveData } from './offlineSaveSystem';

/**
 * 100% Offline Game Lifecycle & Sync Hook
 * - Binds app state & backgrounding auto-save hooks
 * - Handles offline energy regeneration interval
 * - Checks daily login streaks
 * - Guarantees zero network calls or cloud dependencies
 */
export function useAuthAndDataSync() {
  useEffect(() => {
    // 1. Mark authLoading as complete immediately for offline mode
    useEconomyStore.setState({ authLoading: false });

    // 2. Refresh login streak
    useEconomyStore.getState().updateLoginStreak();

    // 3. Initial energy recovery check
    useEconomyStore.getState().recoverEnergy();

    // 4. Energy recovery interval (every 60 seconds checks if 3m has elapsed)
    const energyTimer = setInterval(() => {
      useEconomyStore.getState().recoverEnergy();
    }, 60000);

    // 5. Setup offline save hooks (backgrounding, beforeunload, appStateChange)
    const teardownHooks = setupOfflineSaveHooks(() => {
      const state = useEconomyStore.getState();
      return {
        version: 2,
        profile: {
          nickname: state.nickname,
          avatarId: state.avatarId,
          anonymousId: state.anonymousId,
        },
        currencies: {
          coins: state.coins,
          gems: state.gems,
          energy: state.energy,
          premiumTokens: state.premiumTokens,
        },
        progression: {
          level: state.level,
          xp: state.xp,
          bestScore: state.bestScore,
          highScores: state.highScores || [],
        },
        inventory: {
          powerups: {
            undo: state.inventory?.undo || 0,
            hammer: state.inventory?.hammer || 0,
            swap: state.inventory?.swap || 0,
            shuffle: state.inventory?.shuffle || 0,
            double: state.inventory?.double || 0,
          },
          unlockedThemes: state.unlockedThemes || ['classic'],
          vipLevel: state.vipLevel || 0,
          vipXp: state.vipXp || 0,
        },
        missions: {
          missions: state.missions || [],
          missionsDate: null,
        },
        rewards: {
          dailyRewardClaimedAt: state.dailyRewardClaimedAt,
          streak: state.streak,
          longestStreak: state.longestStreak,
          lastLoginDate: state.lastLoginDate,
          vipDailyRewardClaimedAt: state.vipDailyRewardClaimedAt,
          luckySpinUsedAt: state.luckySpinUsedAt,
          luckySpinsAvailable: state.luckySpinsAvailable,
        },
        settings: {
          muted: false,
          quickBuyEnabled: state.quickBuyEnabled,
          difficultyMode: state.difficultyMode,
          lowPowerMode: false,
          activeTheme: 'classic',
        },
        statistics: { ...state.stats },
        timestamps: {
          createdAt: Date.now(),
          lastSavedAt: Date.now(),
          lastEnergyUpdate: state.lastEnergyUpdate,
        },
      };
    });

    return () => {
      clearInterval(energyTimer);
      teardownHooks();
    };
  }, []);
}
