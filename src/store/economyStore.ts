import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage, safeSetItem, safeGetItem } from '../lib/safeStorage';
import { loadPlayerSaveData, LocalMatchRecord } from '../lib/offlineSaveSystem';

export interface DailyRewardConfig {
  day: number;
  type: 'coins' | 'xp' | 'gems' | 'energy' | 'lucky';
  amount: number;
}

export const defaultDailyRewards: DailyRewardConfig[] = [
  { day: 1, type: 'coins', amount: 100 },
  { day: 2, type: 'xp', amount: 500 },
  { day: 3, type: 'gems', amount: 10 },
  { day: 4, type: 'energy', amount: 20 },
  { day: 5, type: 'lucky', amount: 1 },
  { day: 6, type: 'coins', amount: 500 },
  { day: 7, type: 'gems', amount: 50 },
];

export interface Mission {
  id: string;
  type: 'daily' | 'weekly' | 'achievement';
  title: string;
  description: string;
  target: number;
  progress: number;
  rewardType: 'coins' | 'xp' | 'gems' | 'energy';
  rewardAmount: number;
  completed: boolean;
  claimed: boolean;
}

export interface GameStatsTracker {
  totalMerges: number;
  highestTile: number;
  bombsUsed: number;
  totalScore: number;
  matchesPlayed: number;
  maxCombo: number;
  bestSurvivalScore: number;
  bossesDefeated: number;
}

export const defaultMissions: Mission[] = [
  // Daily
  { id: 'd1', type: 'daily', title: 'Merge Apprentice', description: 'Make 50 merges', target: 50, progress: 0, rewardType: 'coins', rewardAmount: 200, completed: false, claimed: false },
  { id: 'd2', type: 'daily', title: 'Explosive', description: 'Use a Bomb block 3 times', target: 3, progress: 0, rewardType: 'xp', rewardAmount: 500, completed: false, claimed: false },
  { id: 'd3', type: 'daily', title: 'Score Hunter', description: 'Earn 5,000 points', target: 5000, progress: 0, rewardType: 'coins', rewardAmount: 300, completed: false, claimed: false },
  
  // Weekly
  { id: 'w1', type: 'weekly', title: 'Dedicated', description: 'Play 20 matches', target: 20, progress: 0, rewardType: 'gems', rewardAmount: 20, completed: false, claimed: false },
  
  // Achievements
  { id: 'a1', type: 'achievement', title: 'First Merge', description: 'Merge your first blocks', target: 1, progress: 0, rewardType: 'xp', rewardAmount: 100, completed: false, claimed: false },
  { id: 'a2', type: 'achievement', title: 'Combo Master', description: 'Reach a 5x Combo', target: 5, progress: 0, rewardType: 'gems', rewardAmount: 10, completed: false, claimed: false },
  { id: 'a3', type: 'achievement', title: '2048 Legend', description: 'Reach the 2048 tile', target: 2048, progress: 0, rewardType: 'coins', rewardAmount: 1000, completed: false, claimed: false },
  { id: 'a4', type: 'achievement', title: 'Daily Grinder', description: 'Play 10 matches', target: 10, progress: 0, rewardType: 'gems', rewardAmount: 50, completed: false, claimed: false },
];

export interface SpinRewardConfig {
  id: string;
  type: 'coins' | 'gems' | 'xp' | 'energy' | 'jackpot' | 'mystery';
  amount: number;
  weight: number;
  color: string;
  label: string;
}

export const defaultSpinRewards: SpinRewardConfig[] = [
  { id: 'sw1', type: 'coins', amount: 100, weight: 400, color: '#f59e0b', label: '100 Coins' },
  { id: 'sw2', type: 'xp', amount: 50, weight: 300, color: '#d946ef', label: '50 XP' },
  { id: 'sw3', type: 'gems', amount: 5, weight: 150, color: '#10b981', label: '5 Gems' },
  { id: 'sw4', type: 'energy', amount: 10, weight: 100, color: '#0ea5e9', label: '10 Energy' },
  { id: 'sw5', type: 'mystery', amount: 1, weight: 40, color: '#8b5cf6', label: 'Mystery Box' },
  { id: 'sw6', type: 'jackpot', amount: 5000, weight: 10, color: '#e11d48', label: 'JACKPOT' },
];

export interface LiveEvent {
  id: string;
  title: string;
  type: 'double_xp' | 'coin_rush' | 'merge_madness' | 'community' | 'boss';
  description: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  rewardType: 'coins' | 'gems' | 'xp' | 'vip' | 'spins';
  rewardAmount: number;
  goalType: 'merges' | 'score' | 'matches' | 'coins_earned' | 'xp_earned' | 'community_score';
  target: number;
  progress: number;
  color: string;
  icon: string;
  completed: boolean;
  claimed: boolean;
}

export interface GameSeason {
  id: string;
  name: string;
  primaryColor: string;
  endTime: number;
}

export const defaultSeason: GameSeason = {
  id: 's1',
  name: 'Cosmic Season',
  primaryColor: 'fuchsia',
  endTime: Date.now() + 86400000 * 14 // 14 days
};

export const defaultEvents: LiveEvent[] = [
  {
    id: 'e1',
    title: 'Neon Coin Rush',
    type: 'coin_rush',
    description: 'Double base coins while event is active! Reach 100 merges for the cosmic prize.',
    startTime: Date.now(),
    endTime: Date.now() + 86400000 * 3, // 3 days
    isActive: true,
    rewardType: 'gems',
    rewardAmount: 100,
    goalType: 'merges',
    target: 100,
    progress: 0,
    color: '#eab308',
    icon: '⚡',
    completed: false,
    claimed: false
  }
];

export interface PowerupInventory {
  undo: number;
  hammer: number;
  swap: number;
  shuffle: number;
  double: number;
  bomb: number;
  colorChange: number;
}

export const POWERUP_CONFIGS: Record<keyof PowerupInventory, { 
  name: string; 
  description: string; 
  coinCost: number; 
  gemCost: number; 
  icon: string;
  badge: string;
}> = {
  bomb: {
    name: 'Area Bomb',
    description: 'Obliterate a 3x3 blast area to clear crowded columns and escape game over.',
    coinCost: 500,
    gemCost: 20,
    icon: 'Bomb',
    badge: 'Blast',
  },
  colorChange: {
    name: 'Color Morph',
    description: 'Transform any block or your ready tile into an Omni-Color Wildcard that merges with any color.',
    coinCost: 400,
    gemCost: 15,
    icon: 'Palette',
    badge: 'Chameleon',
  },
  undo: {
    name: 'Undo Move',
    description: 'Revert your previous move when stuck or in danger.',
    coinCost: 200,
    gemCost: 10,
    icon: 'RotateCcw',
    badge: 'Popular'
  },
  hammer: {
    name: 'Smash Hammer',
    description: 'Target and smash any obstacle or blocking tile off the board.',
    coinCost: 450,
    gemCost: 20,
    icon: 'Hammer',
    badge: 'Essential'
  },
  swap: {
    name: 'Tile Swap',
    description: 'Swap your current block with the upcoming queued block.',
    coinCost: 150,
    gemCost: 8,
    icon: 'ArrowLeftRight',
    badge: 'Tactical'
  },
  shuffle: {
    name: 'Board Shuffle',
    description: 'Shuffle and realign lower numbers into high-merge opportunities.',
    coinCost: 350,
    gemCost: 15,
    icon: 'Shuffle',
    badge: 'Rescue'
  },
  double: {
    name: '2x Multiplier',
    description: 'Instantly double the value of any selected tile on the grid.',
    coinCost: 600,
    gemCost: 25,
    icon: 'Zap',
    badge: 'Boost'
  }
};

export interface EconomyState {
  authUser: any | null;
  authLoading: boolean;
  isAdmin: boolean;
  anonymousId: string;
  dailyWinner: { id: string; name: string; score: number; date: string } | null;
  
  coins: number;
  gems: number;
  energy: number;
  premiumTokens: number;
  level: number;
  xp: number;
  streak: number;
  longestStreak: number;
  lastLoginDate: string | null;
  vipLevel: number;
  vipXp: number;
  difficultyMode: 'easy' | 'medium' | 'hard' | 'extreme' | 'impossible';

  // Power-up inventory system
  inventory: PowerupInventory;
  buyPowerup: (powerup: keyof PowerupInventory, quantity?: number, currency?: 'coins' | 'gems') => { success: boolean; message: string };
  usePowerup: (powerup: keyof PowerupInventory) => boolean;
  addPowerup: (powerup: keyof PowerupInventory, amount: number) => void;
  
  nickname: string;
  avatarId: string;
  setProfile: (nickname: string, avatarId: string) => void;

  rankPoints: number;
  rankTier: string;
  seasonHighestRank: string;
  globalPosition: number;
  countryPosition: number;
  
  // Local records & hall of fame
  bestScore: number;
  highScores: LocalMatchRecord[];
  recordMatch: (score: number, merges: number, highestTile: number, combo: number, mode?: string) => void;
  clearMatchHistory: () => void;

  unlockedThemes: string[];
  unlockTheme: (themeId: string) => void;
  
  quickBuyEnabled: boolean;
  toggleQuickBuy: () => void;

  stats: GameStatsTracker;
  missions: Mission[];
  
  // Timings
  lastEnergyUpdate: number;
  dailyRewardClaimedAt: number | null;
  luckySpinUsedAt: number | null;
  luckySpinsAvailable: number;
  vipDailyRewardClaimedAt: number | null;
  
  rankThresholds: Record<string, number>;
  setRankThresholds: (thresholds: Record<string, number>) => void;
  
  // Admin Configuration
  adminRewardsConfig: DailyRewardConfig[];
  adminSpinRewardsConfig: SpinRewardConfig[];
  
  // Adaptive Gameplay Engine Settings
  engineSettings: {
    enabled: boolean;
    adaptiveDifficulty: boolean;
    smartSpawning: boolean;
    smartAssist: boolean;
    dynamicEvents: boolean;
    baseIntensity: number;
  };

  // Live Events & Seasons
  activeEvents: LiveEvent[];
  currentSeason: GameSeason;

  // Number Snacks Config
  numberSnacksConfig: {
    enabled: boolean;
    rewardMultiplier: number;
  };
  setNumberSnacksConfig: (config: Partial<{ enabled: boolean; rewardMultiplier: number }>) => void;

  setAdminRewardsConfig: (config: DailyRewardConfig[]) => void;
  setAdminSpinRewardsConfig: (config: SpinRewardConfig[]) => void;
  setStoreState: (state: Partial<EconomyState>) => void;
  updateEventProgress: (goalType: string, amount: number) => void;
  claimEventReward: (eventId: string) => { success: boolean; message: string; reward: any | null };
  getActiveEventModifier: (type: string) => number;

  resetUserStatsMock: () => void;
  setEngineSettings: (config: Partial<EconomyState['engineSettings']>) => void;
  setDifficultyMode: (mode: EconomyState['difficultyMode']) => void;

  // Actions
  levelUpData: { level: number; coins: number; gems: number } | null;
  clearLevelUp: () => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean;
  addGems: (amount: number) => void;
  deductGems: (amount: number) => boolean;
  addPremiumTokens: (amount: number) => void;
  deductPremiumTokens: (amount: number) => boolean;
  
  useEnergy: (amount: number) => boolean;
  addEnergy: (amount: number) => void;
  
  addXp: (amount: number) => void;
  addRankPoints: (amount: number) => { newTier: string | null; currentPoints: number };
  addVipXp: (amount: number) => void;
  buyVip: (level: number) => boolean;
  canClaimVipDaily: () => boolean;
  claimVipDaily: () => { success: boolean; reward: any; message: string };
  getMultiplier: () => number;
  
  canClaimDailyReward: () => boolean;
  claimDailyReward: () => Promise<{ success: boolean; reward: any; message: string }>;
  updateLoginStreak: () => void;
  
  trackStat: (key: keyof GameStatsTracker, value: number, isMax?: boolean) => void;
  claimMission: (missionId: string) => Promise<{ success: boolean; message: string }>;
  
  canSpinFree: () => boolean;
  spinWheel: () => Promise<{ success: boolean; reward: SpinRewardConfig | null; message: string }>;
  buySpin: () => boolean;
  addSpins: (amount: number) => void;
  
  // Loops
  recoverEnergy: () => void;
}

// Load initial state safely from offline storage
const initialOfflineData = loadPlayerSaveData();

export const useEconomyStore = create<EconomyState>()(
  persist(
    (set, get) => ({
      authUser: null,
      authLoading: false,
      isAdmin: false,
      anonymousId: initialOfflineData.profile.anonymousId || `MV-${Math.floor(1000 + Math.random() * 9000)}`,
      dailyWinner: null,
      
      levelUpData: null,
      clearLevelUp: () => set({ levelUpData: null }),
      
      coins: initialOfflineData.currencies.coins,
      gems: initialOfflineData.currencies.gems,
      energy: initialOfflineData.currencies.energy,
      premiumTokens: initialOfflineData.currencies.premiumTokens,
      level: initialOfflineData.progression.level,
      xp: initialOfflineData.progression.xp,
      streak: initialOfflineData.rewards.streak,
      longestStreak: initialOfflineData.rewards.longestStreak,
      lastLoginDate: initialOfflineData.rewards.lastLoginDate,
      vipLevel: initialOfflineData.inventory.vipLevel,
      vipXp: initialOfflineData.inventory.vipXp,
      difficultyMode: initialOfflineData.settings.difficultyMode || 'medium',
      
      nickname: initialOfflineData.profile.nickname || 'Cosmic Pilot',
      avatarId: initialOfflineData.profile.avatarId || '1',
      setProfile: (nickname, avatarId) => set({ nickname, avatarId }),

      // Local records
      bestScore: initialOfflineData.progression.bestScore,
      highScores: initialOfflineData.progression.highScores || [],
      recordMatch: (score: number, merges: number, highestTile: number, combo: number, mode = 'classic') => {
        const state = get();
        const now = Date.now();
        
        // 1. Update stats
        const newTotalMerges = state.stats.totalMerges + merges;
        const newTotalScore = state.stats.totalScore + score;
        const newHighestTile = Math.max(state.stats.highestTile, highestTile);
        const newMaxCombo = Math.max(state.stats.maxCombo, combo);
        const newMatchesPlayed = state.stats.matchesPlayed + 1;
        
        const newStats: GameStatsTracker = {
          ...state.stats,
          totalMerges: newTotalMerges,
          totalScore: newTotalScore,
          highestTile: newHighestTile,
          maxCombo: newMaxCombo,
          matchesPlayed: newMatchesPlayed,
          bestSurvivalScore: mode === 'survival' ? Math.max(state.stats.bestSurvivalScore, score) : state.stats.bestSurvivalScore,
        };

        // 2. High score calculation
        const isNewBest = score > state.bestScore;
        const updatedBestScore = Math.max(state.bestScore, score);
        if (isNewBest) {
          safeSetItem('dp_best_score', updatedBestScore.toString());
        }

        // 3. Record local run entry
        const newRun: LocalMatchRecord = {
          id: `run-${now}-${Math.floor(Math.random() * 1000)}`,
          score,
          highestTile,
          merges,
          combo,
          mode,
          date: new Date().toLocaleDateString(),
          timestamp: now,
        };

        const updatedHighScores = [newRun, ...(state.highScores || [])]
          .sort((a, b) => b.score - a.score)
          .slice(0, 25); // Top 25 runs

        set({
          stats: newStats,
          bestScore: updatedBestScore,
          highScores: updatedHighScores,
        });

        // 4. Update missions progression
        state.trackStat('totalMerges', merges);
        state.trackStat('totalScore', score);
        state.trackStat('highestTile', highestTile, true);
        state.trackStat('maxCombo', combo, true);
        state.trackStat('matchesPlayed', 1);

        // 5. Offline gameplay earnings
        const earnedCoins = Math.max(15, Math.floor(merges * 2.5 + score / 80));
        const earnedXp = Math.max(30, Math.floor(merges * 3.5 + score / 40));
        state.addCoins(earnedCoins);
        state.addXp(earnedXp);

        if (highestTile >= 2048) {
          state.addGems(5);
        } else if (highestTile >= 1024) {
          state.addGems(2);
        }
      },
      clearMatchHistory: () => {
        set(s => ({
          highScores: [{
            id: 'init-record',
            score: s.bestScore,
            highestTile: Math.max(2, s.stats.highestTile),
            merges: s.stats.totalMerges,
            combo: s.stats.maxCombo,
            mode: 'classic',
            date: new Date().toLocaleDateString(),
            timestamp: Date.now(),
          }]
        }));
      },

      // Power-up Inventory
      inventory: {
        undo: initialOfflineData.inventory?.powerups?.undo ?? 3,
        hammer: initialOfflineData.inventory?.powerups?.hammer ?? 2,
        swap: initialOfflineData.inventory?.powerups?.swap ?? 2,
        shuffle: initialOfflineData.inventory?.powerups?.shuffle ?? 2,
        double: initialOfflineData.inventory?.powerups?.double ?? 1,
        bomb: (initialOfflineData.inventory?.powerups as any)?.bomb ?? 2,
        colorChange: (initialOfflineData.inventory?.powerups as any)?.colorChange ?? 2,
      },

      buyPowerup: (powerup, quantity = 1, currency = 'coins') => {
        const config = POWERUP_CONFIGS[powerup];
        if (!config) return { success: false, message: 'Invalid powerup item.' };
        const state = get();
        if (currency === 'coins') {
          const totalCost = config.coinCost * quantity;
          if (state.coins < totalCost) {
            return { success: false, message: `Need ${totalCost - state.coins} more Coins!` };
          }
          set(s => ({
            coins: Math.max(0, s.coins - totalCost),
            inventory: {
              ...s.inventory,
              [powerup]: (s.inventory[powerup] || 0) + quantity
            }
          }));
          return { success: true, message: `Acquired ${quantity}x ${config.name}!` };
        } else {
          const totalCost = config.gemCost * quantity;
          if (state.gems < totalCost) {
            return { success: false, message: `Need ${totalCost - state.gems} more Gems!` };
          }
          set(s => ({
            gems: Math.max(0, s.gems - totalCost),
            inventory: {
              ...s.inventory,
              [powerup]: (s.inventory[powerup] || 0) + quantity
            }
          }));
          return { success: true, message: `Acquired ${quantity}x ${config.name}!` };
        }
      },

      usePowerup: (powerup) => {
        const state = get();
        const current = state.inventory?.[powerup] || 0;
        if (current <= 0) return false;
        set(s => ({
          inventory: {
            ...s.inventory,
            [powerup]: Math.max(0, (s.inventory[powerup] || 0) - 1)
          }
        }));
        return true;
      },

      addPowerup: (powerup, amount) => {
        if (amount <= 0) return;
        set(s => ({
          inventory: {
            ...s.inventory,
            [powerup]: (s.inventory[powerup] || 0) + amount
          }
        }));
      },

      rankPoints: 0,
      rankTier: 'Bronze',
      seasonHighestRank: 'Bronze',
      globalPosition: 1,
      countryPosition: 1,
      
      unlockedThemes: initialOfflineData.inventory.unlockedThemes || ['classic', 'neon', 'cyber', 'sunset'],
      unlockTheme: (themeId) => set(s => ({ unlockedThemes: [...new Set([...s.unlockedThemes, themeId])] })),
      
      quickBuyEnabled: initialOfflineData.settings.quickBuyEnabled ?? false,
      toggleQuickBuy: () => set(s => ({ quickBuyEnabled: !s.quickBuyEnabled })),
      
      stats: {
        totalMerges: initialOfflineData.statistics.totalMerges,
        highestTile: initialOfflineData.statistics.highestTile,
        bombsUsed: initialOfflineData.statistics.bombsUsed,
        totalScore: initialOfflineData.statistics.totalScore,
        matchesPlayed: initialOfflineData.statistics.matchesPlayed,
        maxCombo: initialOfflineData.statistics.maxCombo,
        bestSurvivalScore: initialOfflineData.statistics.bestSurvivalScore,
        bossesDefeated: initialOfflineData.statistics.bossesDefeated,
      },
      missions: defaultMissions,
      
      lastEnergyUpdate: initialOfflineData.timestamps.lastEnergyUpdate || Date.now(),
      dailyRewardClaimedAt: initialOfflineData.rewards.dailyRewardClaimedAt,
      luckySpinUsedAt: initialOfflineData.rewards.luckySpinUsedAt,
      luckySpinsAvailable: initialOfflineData.rewards.luckySpinsAvailable ?? 1,
      vipDailyRewardClaimedAt: initialOfflineData.rewards.vipDailyRewardClaimedAt,
      
      rankThresholds: {
        'Silver': 1000,
        'Gold': 3000,
        'Platinum': 6000,
        'Diamond': 10000,
        'Master': 15000,
        'Grandmaster': 25000,
        'Legend': 50000
      },
      setRankThresholds: (thresholds) => set({ rankThresholds: thresholds }),
      
      adminRewardsConfig: defaultDailyRewards,
      adminSpinRewardsConfig: defaultSpinRewards,
      engineSettings: {
        enabled: true,
        adaptiveDifficulty: true,
        smartSpawning: true,
        smartAssist: true,
        dynamicEvents: true,
        baseIntensity: 1
      },
      activeEvents: defaultEvents,
      currentSeason: defaultSeason,
      numberSnacksConfig: {
        enabled: true,
        rewardMultiplier: 1.0,
      },
      setNumberSnacksConfig: (config) => set((s) => ({ numberSnacksConfig: { ...s.numberSnacksConfig, ...config } })),
      setAdminRewardsConfig: (config) => set({ adminRewardsConfig: config }),
      setAdminSpinRewardsConfig: (config) => set({ adminSpinRewardsConfig: config }),
      setEngineSettings: (config) => set((s) => ({ engineSettings: { ...s.engineSettings, ...config } })),
      setDifficultyMode: (mode) => set({ difficultyMode: mode }),
      setStoreState: (s) => set(s),
      
      updateEventProgress: (goalType, amount) => {
         const now = Date.now();
         set((state) => {
            let updated = false;
            const newEvents = state.activeEvents.map(ev => {
               if (ev.isActive && ev.goalType === goalType && !ev.completed && now >= ev.startTime && now <= ev.endTime) {
                  updated = true;
                  const newProgress = Math.min(ev.target, ev.progress + amount);
                  return { ...ev, progress: newProgress, completed: newProgress >= ev.target };
               }
               return ev;
            });
            return updated ? { activeEvents: newEvents } : state;
         });
      },

      claimEventReward: (eventId) => {
         const state = get();
         const ev = state.activeEvents.find(e => e.id === eventId);
         if (!ev || !ev.completed || ev.claimed) return { success: false, message: 'Cannot claim this event reward.', reward: null };
         
         if (ev.rewardType === 'coins') get().addCoins(ev.rewardAmount);
         if (ev.rewardType === 'gems') get().addGems(ev.rewardAmount);
         if (ev.rewardType === 'xp') get().addXp(ev.rewardAmount);

         set(s => ({
            activeEvents: s.activeEvents.map(e => e.id === eventId ? { ...e, claimed: true } : e)
         }));

         return { success: true, message: `Claimed ${ev.rewardAmount} ${ev.rewardType.toUpperCase()}!`, reward: ev.rewardAmount };
      },

      getActiveEventModifier: (type) => {
         const state = get();
         const now = Date.now();
         const ev = state.activeEvents.find(e => e.isActive && e.type === type && now >= e.startTime && now <= e.endTime);
         if (ev) return 2.0;
         return 1.0;
      },

      getMultiplier: () => {
         const state = get();
         let multi = 1.0;
         if (state.vipLevel > 0) {
            multi += (state.vipLevel * 0.1);
         }
         return multi;
      },

      resetUserStatsMock: () => {
        set({
           coins: 1000,
           gems: 50,
           energy: 50,
           stats: {
              totalMerges: 0,
              highestTile: 0,
              bombsUsed: 0,
              totalScore: 0,
              matchesPlayed: 0,
              maxCombo: 0,
              bestSurvivalScore: 0,
              bossesDefeated: 0
           }
        });
      },

      addCoins: (amount) => {
          if (amount <= 0 || !isFinite(amount)) return;
          const multi = get().getMultiplier();
          const eventMulti = get().getActiveEventModifier('coin_rush');
          const finalAmount = Math.floor(amount * multi * eventMulti);
          get().updateEventProgress('coins_earned', finalAmount);
          set((state) => ({ coins: Math.max(0, state.coins + finalAmount) }));
      },
      deductCoins: (amount) => {
        if (amount <= 0 || !isFinite(amount)) return false;
        const state = get();
        if (state.coins >= amount) {
          set({ coins: Math.max(0, state.coins - amount) });
          return true;
        }
        return false;
      },

      addGems: (amount) => {
         if (amount <= 0 || !isFinite(amount)) return;
         set((state) => ({ gems: Math.max(0, state.gems + amount) }));
      },
      deductGems: (amount) => {
        if (amount <= 0 || !isFinite(amount)) return false;
        const state = get();
        if (state.gems >= amount) {
          set({ gems: Math.max(0, state.gems - amount) });
          return true;
        }
        return false;
      },

      addPremiumTokens: (amount) => {
        if (amount <= 0) return;
        set((state) => ({ premiumTokens: Math.max(0, state.premiumTokens + amount) }));
      },
      deductPremiumTokens: (amount) => {
        const state = get();
        if (state.premiumTokens >= amount) {
          set({ premiumTokens: Math.max(0, state.premiumTokens - amount) });
          return true;
        }
        return false;
      },

      useEnergy: (amount) => {
        const state = get();
        if (state.energy >= amount) {
          set({ energy: Math.max(0, state.energy - amount) });
          return true;
        }
        return false;
      },
      addEnergy: (amount) => set((state) => ({ energy: Math.min(state.vipLevel > 0 ? 100 : 50, state.energy + amount) })),

      addXp: (amount) => {
        if (amount <= 0) return;
        const multi = get().getMultiplier();
        const eventMulti = get().getActiveEventModifier('double_xp');
        const finalAmount = Math.floor(amount * multi * eventMulti);
        get().updateEventProgress('xp_earned', finalAmount);
        
        let leveledUpCoins = 0;
        let leveledUpGems = 0;
        
        set((state) => {
          let newXp = state.xp + finalAmount;
          let newLevel = state.level;
          const xpNeeded = newLevel * 1000;
          if (newXp >= xpNeeded) {
            newLevel++;
            newXp -= xpNeeded;
            leveledUpCoins = (newLevel * 500);
            leveledUpGems = 5;
            return { 
               xp: newXp, 
               level: newLevel, 
               coins: state.coins + leveledUpCoins, 
               gems: state.gems + leveledUpGems,
               levelUpData: { level: newLevel, coins: leveledUpCoins, gems: leveledUpGems }
            };
          }
          return { xp: newXp };
        });
      },
      
      addRankPoints: (amount) => {
        let newTierPrompt: string | null = null;
        let newScore = 0;
        set((state) => {
           let pts = state.rankPoints + amount;
           newScore = pts;
           let tier = 'Bronze';
           const t = state.rankThresholds;
           if (pts >= t['Legend']) tier = 'Legend';
           else if (pts >= t['Grandmaster']) tier = 'Grandmaster';
           else if (pts >= t['Master']) tier = 'Master';
           else if (pts >= t['Diamond']) tier = 'Diamond';
           else if (pts >= t['Platinum']) tier = 'Platinum';
           else if (pts >= t['Gold']) tier = 'Gold';
           else if (pts >= t['Silver']) tier = 'Silver';
           
           if (tier !== state.rankTier) {
              newTierPrompt = tier;
           }
           
           return { rankPoints: pts, rankTier: tier };
        });
        return { newTier: newTierPrompt, currentPoints: newScore };
      },

      canClaimVipDaily: () => {
         const state = get();
         if (state.vipLevel === 0) return false;
         if (!state.vipDailyRewardClaimedAt) return true;
         const claimedDate = new Date(state.vipDailyRewardClaimedAt).toDateString();
         const today = new Date().toDateString();
         return claimedDate !== today;
      },
      claimVipDaily: () => {
         const state = get();
         if (!state.canClaimVipDaily()) {
             return { success: false, reward: null, message: "VIP Daily already claimed or not a VIP." };
         }
         const lvl = state.vipLevel;
         const coinsReward = lvl * 200;
         const gemsReward = lvl * 5;
         const spinsReward = lvl === 5 ? 2 : (lvl >= 3 ? 1 : 0);
         
         set(s => ({ 
             coins: s.coins + coinsReward,
             gems: s.gems + gemsReward,
             luckySpinsAvailable: s.luckySpinsAvailable + spinsReward,
             vipDailyRewardClaimedAt: Date.now()
         }));
         
         return { 
             success: true, 
             reward: { coins: coinsReward, gems: gemsReward, spins: spinsReward }, 
             message: `Claimed VIP Daily: ${coinsReward} Coins, ${gemsReward} Gems${spinsReward > 0 ? `, ${spinsReward} Spins` : ''}!`
         };
      },
      addVipXp: (amount) => {
         set(state => {
             let newXp = state.vipXp + amount;
             let newLevel = state.vipLevel;
             const thresholds = [0, 100, 300, 600, 1000, 1500];
             while (newLevel < 5 && newXp >= thresholds[newLevel + 1]) {
                newLevel++;
             }
             return { vipXp: newXp, vipLevel: newLevel };
         });
      },
      buyVip: (level) => {
         const state = get();
         const costs = { 1: 50, 2: 150, 3: 300, 4: 500, 5: 1000 };
         const cost = costs[level as keyof typeof costs];
         if (!cost || state.vipLevel >= level) return false;
         
         if (state.gems >= cost) {
             set({ gems: state.gems - cost, vipLevel: level, vipXp: [0, 100, 300, 600, 1000, 1500][level] });
             return true;
         }
         return false;
      },
      
      updateLoginStreak: () => {
        const today = new Date().toDateString();
        const state = get();
        
        if (state.lastLoginDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (state.lastLoginDate === yesterday.toDateString()) {
             const newStreak = state.streak + 1;
             set({ 
               streak: newStreak, 
               longestStreak: Math.max(state.longestStreak, newStreak),
               lastLoginDate: today 
             });
          } else if (state.lastLoginDate !== today) {
             set({ streak: 1, lastLoginDate: today });
          }
        }
      },
      
      canClaimDailyReward: () => {
        const now = Date.now();
        const state = get();
        
        if (state.dailyRewardClaimedAt) {
           const claimedDate = new Date(state.dailyRewardClaimedAt).toDateString();
           const today = new Date(now).toDateString();
           if (claimedDate === today) {
              return false;
           }
        }
        return true;
      },

      claimDailyReward: async () => {
        const state = get();
        const now = Date.now();
        
        if (!state.canClaimDailyReward()) {
           return { success: false, reward: null, message: "Already claimed today!" };
        }
        
        // Ensure streak is up to date
        state.updateLoginStreak();
        const currentStreak = get().streak;
        
        // Find today's reward configuration (cycle every 7 days)
        const rewardDay = ((currentStreak - 1) % 7) + 1;
        const config = get().adminRewardsConfig.find(r => r.day === rewardDay) || defaultDailyRewards[0];
        
        let extraMessage = '';
        if (currentStreak > 0 && currentStreak % 30 === 0) {
           set(s => ({ coins: s.coins + 5000, gems: s.gems + 50 }));
           extraMessage = ' + 🎉 30-Day Monthly Bonus (5000 Coins, 50 Gems)!';
        }
        
        // Apply reward locally
        if (config.type === 'coins') {
          set(s => ({ coins: s.coins + config.amount }));
        } else if (config.type === 'gems') {
          set(s => ({ gems: s.gems + config.amount }));
        } else if (config.type === 'xp') {
          get().addXp(config.amount);
        } else if (config.type === 'energy') {
          get().addEnergy(config.amount);
        } else if (config.type === 'lucky') {
          set(s => ({ luckySpinsAvailable: s.luckySpinsAvailable + config.amount }));
        }
        
        set({ dailyRewardClaimedAt: now });
        
        return { 
          success: true, 
          reward: config,
          message: `Claimed Day ${rewardDay} Reward: +${config.amount} ${config.type.toUpperCase()}${extraMessage}`
        };
      },
      
      trackStat: (key, value, isMax = false) => {
        set(state => {
          const newStats = { ...state.stats };
          if (isMax) {
            newStats[key] = Math.max(newStats[key] as number, value);
          } else {
            newStats[key] = (newStats[key] as number) + value;
          }
          
          let updatedMissions = false;
          const newMissions = state.missions.map(m => {
            if (m.completed) return m;
            let currentProgress = m.progress;
            
            if (key === 'totalMerges' && (m.id === 'd1' || m.id === 'a1')) {
              currentProgress = newStats.totalMerges;
            } else if (key === 'bombsUsed' && m.id === 'd2') {
              currentProgress = newStats.bombsUsed;
            } else if (key === 'totalScore' && m.id === 'd3') {
              currentProgress += value;
            } else if (key === 'maxCombo' && m.id === 'a2') {
              currentProgress = newStats.maxCombo;
            } else if (key === 'highestTile' && m.id === 'a3') {
              currentProgress = newStats.highestTile;
            } else if (key === 'matchesPlayed' && (m.id === 'w1' || m.id === 'a4')) {
               currentProgress = newStats.matchesPlayed;
            }
            
            const newCompleted = currentProgress >= m.target;
            if (newCompleted || currentProgress !== m.progress) {
               updatedMissions = true;
               return {
                 ...m,
                 progress: Math.min(currentProgress, m.target),
                 completed: newCompleted
               };
            }
            return m;
          });
          
          if (updatedMissions) {
             return { stats: newStats, missions: newMissions };
          }
          return { stats: newStats };
        });
      },
      
      claimMission: async (missionId) => {
         const state = get();
         const mission = state.missions.find(m => m.id === missionId);
         if (!mission) return { success: false, message: 'Mission not found' };
         if (!mission.completed) return { success: false, message: 'Mission not completed yet' };
         if (mission.claimed) return { success: false, message: 'Mission already claimed' };

         // Apply reward locally
         if (mission.rewardType === 'coins') {
           set(s => ({ coins: s.coins + mission.rewardAmount }));
         } else if (mission.rewardType === 'gems') {
           set(s => ({ gems: s.gems + mission.rewardAmount }));
         } else if (mission.rewardType === 'xp') {
           get().addXp(mission.rewardAmount);
         } else if (mission.rewardType === 'energy') {
           get().addEnergy(mission.rewardAmount);
         }
         
         // Mark as claimed
         set(s => ({
            missions: s.missions.map(m => m.id === missionId ? { ...m, claimed: true } : m)
         }));
         
         return { success: true, message: `Reward claimed: +${mission.rewardAmount} ${mission.rewardType.toUpperCase()}!` };
      },
      
      canSpinFree: () => {
         const state = get();
         if (!state.luckySpinUsedAt) return true;
         return Date.now() - state.luckySpinUsedAt > 86400000;
      },
      
      addSpins: (amount) => {
        if (amount <= 0) return;
        set(s => ({ luckySpinsAvailable: s.luckySpinsAvailable + amount }));
      },
      
      buySpin: () => {
         const state = get();
         const cost = 200;
         if (state.coins >= cost) {
            set({ coins: state.coins - cost, luckySpinsAvailable: state.luckySpinsAvailable + 1 });
            return true;
         }
         return false;
      },
      
      spinWheel: async () => {
         const state = get();
         const canFree = state.canSpinFree();
         
         if (!canFree && state.luckySpinsAvailable <= 0) {
            return { success: false, reward: null, message: "No spins available. Wait or buy more!" };
         }
         
         if (canFree) {
            set({ luckySpinUsedAt: Date.now() });
         } else {
            set({ luckySpinsAvailable: Math.max(0, state.luckySpinsAvailable - 1) });
         }
         
         // Calculate reward based on weights
         const rewards = state.adminSpinRewardsConfig;
         const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
         let randomStr = Math.random() * totalWeight;
         
         let selectedReward = rewards[rewards.length - 1];
         for (const r of rewards) {
            if (randomStr < r.weight) {
               selectedReward = r;
               break;
            }
            randomStr -= r.weight;
         }
         
         // Apply reward locally
         if (selectedReward.type === 'coins') {
            set(s => ({ coins: s.coins + selectedReward.amount }));
         } else if (selectedReward.type === 'gems') {
            set(s => ({ gems: s.gems + selectedReward.amount }));
         } else if (selectedReward.type === 'xp') {
            get().addXp(selectedReward.amount);
         } else if (selectedReward.type === 'energy') {
            get().addEnergy(selectedReward.amount);
         } else if (selectedReward.type === 'jackpot') {
            set(s => ({ coins: s.coins + selectedReward.amount, gems: s.gems + 20 }));
         } else if (selectedReward.type === 'mystery') {
            const amounts = [500, 1000, 1500];
            const mCoins = amounts[Math.floor(Math.random() * amounts.length)];
            set(s => ({ coins: s.coins + mCoins }));
            selectedReward = { ...selectedReward, label: `Mystery: +${mCoins} Coins` };
         }
         
         return { success: true, reward: selectedReward, message: `You won ${selectedReward.label}!` };
      },
      
      recoverEnergy: () => {
        const now = Date.now();
        const state = get();
        const timePassed = now - state.lastEnergyUpdate;
        const maxEnergy = state.vipLevel > 0 ? 100 : 50;
        
        // 1 energy per 3 minutes (180000 ms)
        if (timePassed >= 180000 && state.energy < maxEnergy) {
          const energyToRecover = Math.floor(timePassed / 180000);
          set({ 
             energy: Math.min(maxEnergy, state.energy + energyToRecover),
             lastEnergyUpdate: now - (timePassed % 180000)
          });
        }
      }
    }),
    {
      name: 'economy-storage',
      version: 2,
      storage: createJSONStorage(() => safeStorage),
      migrate: (persistedState: any, version: number) => {
        if (!persistedState) return {} as any;
        return persistedState;
      }
    }
  )
);
