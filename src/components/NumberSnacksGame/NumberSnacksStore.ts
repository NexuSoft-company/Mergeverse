import { create } from 'zustand';
import { NumberSnacksStats, DailyChallenge, PowerUpType } from './NumberSnacksTypes';
import { useEconomyStore } from '../../store/economyStore';
import { syncMatchResultSecure } from '../../lib/gameSync';
import { safeGetItem, safeSetItem } from '../../lib/safeStorage';

const STATS_KEY = 'number_snacks_v2_stats';
const DISCOVERIES_KEY = 'number_snacks_v2_discoveries';
const DAILY_KEY = 'number_snacks_v2_daily';

const defaultStats: NumberSnacksStats = {
  gamesPlayed: 0,
  highestScore: 0,
  highestNumber: 2,
  bestCombo: 0,
  totalSnacksCollected: 0,
  totalDistance: 0,
  totalPlayTimeSeconds: 0,
  longestSurvivalTime: 0,
  retryCount: 0,
  gameOverCount: 0,
  dailyChallengesCompleted: 0,
  specialSnacksUsed: 0,
  powerUpsUsed: {
    rainbow: 0,
    golden: 0,
    magnet: 0,
    speed: 0,
    shield: 0,
    slowmo: 0,
  },
  discoveredSnacks: [2, 4],
  lastPlayedDate: '',
  dailyGamesCount: 0,
};

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function generateDailyChallenge(dateStr: string): DailyChallenge {
  const challenges: Omit<DailyChallenge, 'id' | 'dateStr' | 'current' | 'completed' | 'claimed'>[] = [
    {
      title: 'Power Surge',
      description: 'Reach Power 128 in a single run',
      type: 'reach_power',
      target: 128,
      rewardCoins: 350,
      rewardXp: 400,
      rewardGems: 15,
    },
    {
      title: 'Snack Feast',
      description: 'Collect 80 Number Snacks',
      type: 'collect_snacks',
      target: 80,
      rewardCoins: 300,
      rewardXp: 350,
      rewardGems: 10,
    },
    {
      title: 'Garden Marathon',
      description: 'Survive for 90 seconds in one run',
      type: 'survive_time',
      target: 90,
      rewardCoins: 400,
      rewardXp: 450,
      rewardGems: 20,
    },
    {
      title: 'Combo Maestro',
      description: 'Trigger a MEGA COMBO (x5 or higher)',
      type: 'reach_combo',
      target: 5,
      rewardCoins: 350,
      rewardXp: 400,
      rewardGems: 15,
    },
    {
      title: 'Cosmic Nibbler',
      description: 'Reach Power 512 in the Snack Garden',
      type: 'reach_power',
      target: 512,
      rewardCoins: 600,
      rewardXp: 800,
      rewardGems: 30,
    },
  ];

  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % challenges.length;
  const c = challenges[index];

  return {
    id: `dc_v2_${dateStr}`,
    dateStr,
    title: c.title,
    description: c.description,
    type: c.type,
    target: c.target,
    current: 0,
    completed: false,
    claimed: false,
    rewardCoins: c.rewardCoins,
    rewardXp: c.rewardXp,
    rewardGems: c.rewardGems,
  };
}

interface NumberSnacksStoreState {
  stats: NumberSnacksStats;
  dailyChallenge: DailyChallenge;
  discoveredSnacks: number[];

  recordGameEnd: (data: {
    score: number;
    power: number;
    maxCombo: number;
    snacksCollected: number;
    survivalTimeSeconds: number;
    distanceTraveled: number;
  }) => { isNewRecord: boolean; coinsEarned: number; xpEarned: number };

  updateDailyProgress: (type: DailyChallenge['type'], amount: number) => void;
  claimDailyReward: () => { success: boolean; coins: number; xp: number; gems: number };
  trackPowerUpUsage: (type: PowerUpType) => void;
  trackRetry: () => void;
}

export const useNumberSnacksStore = create<NumberSnacksStoreState>((set, get) => {
  let initialStats = defaultStats;
  try {
    const raw = safeGetItem(STATS_KEY, '');
    if (raw) {
      initialStats = { ...defaultStats, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load Number Snacks stats:', e);
  }

  let initialDiscoveries = [2, 4];
  try {
    const raw = safeGetItem(DISCOVERIES_KEY, '');
    if (raw) {
      initialDiscoveries = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load Number Snacks discoveries:', e);
  }

  const todayStr = getTodayStr();
  let initialDaily = generateDailyChallenge(todayStr);
  try {
    const raw = safeGetItem(DAILY_KEY, '');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.dateStr === todayStr) {
        initialDaily = parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load daily challenge:', e);
  }

  return {
    stats: initialStats,
    dailyChallenge: initialDaily,
    discoveredSnacks: initialDiscoveries,

    recordGameEnd: ({ score, power, maxCombo, snacksCollected, survivalTimeSeconds, distanceTraveled }) => {
      const { stats, discoveredSnacks } = get();
      const today = getTodayStr();
      const isNewRecord = score > stats.highestScore;
      const newHighestScore = Math.max(stats.highestScore, score);
      const newHighestPower = Math.max(stats.highestNumber, power);
      const newBestCombo = Math.max(stats.bestCombo, maxCombo);
      const newLongestSurvival = Math.max(stats.longestSurvivalTime, survivalTimeSeconds);
      const dailyGames = stats.lastPlayedDate === today ? stats.dailyGamesCount + 1 : 1;

      // Fair reward calculation for run
      const coinsEarned = Math.max(20, Math.floor(score / 15) + (maxCombo * 5) + Math.floor(snacksCollected / 2));
      const xpEarned = Math.max(35, Math.floor(score / 10) + (power * 2));

      // Secure economy updates
      const eco = useEconomyStore.getState();
      eco.addCoins(coinsEarned);
      eco.addXp(xpEarned);
      eco.trackStat('totalMerges', snacksCollected); // reusing metric for global activity
      eco.trackStat('highestTile', power, true);
      eco.trackStat('totalScore', score);
      eco.trackStat('matchesPlayed', 1);

      // Secure match result sync
      syncMatchResultSecure(score, snacksCollected, power, maxCombo, survivalTimeSeconds);

      // Update discoveries if new power reached
      const updatedDiscoveries = [...discoveredSnacks];
      if (!updatedDiscoveries.includes(power) && power >= 2) {
        updatedDiscoveries.push(power);
        updatedDiscoveries.sort((a, b) => a - b);
        try {
          safeSetItem(DISCOVERIES_KEY, JSON.stringify(updatedDiscoveries));
        } catch (e) {}
      }

      const updatedStats: NumberSnacksStats = {
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
        highestScore: newHighestScore,
        highestNumber: newHighestPower,
        bestCombo: newBestCombo,
        totalSnacksCollected: stats.totalSnacksCollected + snacksCollected,
        totalDistance: stats.totalDistance + distanceTraveled,
        totalPlayTimeSeconds: stats.totalPlayTimeSeconds + survivalTimeSeconds,
        longestSurvivalTime: newLongestSurvival,
        gameOverCount: stats.gameOverCount + 1,
        discoveredSnacks: updatedDiscoveries,
        lastPlayedDate: today,
        dailyGamesCount: dailyGames,
      };

      try {
        safeSetItem(STATS_KEY, JSON.stringify(updatedStats));
      } catch (e) {}

      // Update daily challenges
      get().updateDailyProgress('reach_score', score);
      get().updateDailyProgress('reach_power', power);
      get().updateDailyProgress('reach_combo', maxCombo);
      get().updateDailyProgress('collect_snacks', snacksCollected);
      get().updateDailyProgress('survive_time', survivalTimeSeconds);

      set({
        stats: updatedStats,
        discoveredSnacks: updatedDiscoveries,
      });

      return { isNewRecord, coinsEarned, xpEarned };
    },

    updateDailyProgress: (type, amount) => {
      const { dailyChallenge } = get();
      if (dailyChallenge.completed || dailyChallenge.type !== type) return;

      let newCurrent = dailyChallenge.current;
      if (type === 'reach_score' || type === 'reach_power' || type === 'reach_combo' || type === 'survive_time') {
        newCurrent = Math.max(dailyChallenge.current, amount);
      } else {
        newCurrent = dailyChallenge.current + amount;
      }

      const completed = newCurrent >= dailyChallenge.target;
      const updated: DailyChallenge = {
        ...dailyChallenge,
        current: newCurrent,
        completed,
      };

      try {
        safeSetItem(DAILY_KEY, JSON.stringify(updated));
      } catch (e) {}

      set({ dailyChallenge: updated });
    },

    claimDailyReward: () => {
      const { dailyChallenge, stats } = get();
      if (!dailyChallenge.completed || dailyChallenge.claimed) {
        return { success: false, coins: 0, xp: 0, gems: 0 };
      }

      const eco = useEconomyStore.getState();
      eco.addCoins(dailyChallenge.rewardCoins);
      eco.addXp(dailyChallenge.rewardXp);
      eco.addGems(dailyChallenge.rewardGems);

      const updatedDaily: DailyChallenge = { ...dailyChallenge, claimed: true };
      const updatedStats: NumberSnacksStats = {
        ...stats,
        dailyChallengesCompleted: stats.dailyChallengesCompleted + 1,
      };

      try {
        safeSetItem(DAILY_KEY, JSON.stringify(updatedDaily));
        safeSetItem(STATS_KEY, JSON.stringify(updatedStats));
      } catch (e) {}

      set({ dailyChallenge: updatedDaily, stats: updatedStats });

      return {
        success: true,
        coins: dailyChallenge.rewardCoins,
        xp: dailyChallenge.rewardXp,
        gems: dailyChallenge.rewardGems,
      };
    },

    trackPowerUpUsage: (type) => {
      set((state) => {
        const stats = { ...state.stats };
        stats.specialSnacksUsed += 1;
        stats.powerUpsUsed[type] = (stats.powerUpsUsed[type] || 0) + 1;
        try {
          safeSetItem(STATS_KEY, JSON.stringify(stats));
        } catch (e) {}
        return { stats };
      });
    },

    trackRetry: () => {
      set((state) => {
        const stats = { ...state.stats, retryCount: state.stats.retryCount + 1 };
        try {
          safeSetItem(STATS_KEY, JSON.stringify(stats));
        } catch (e) {}
        return { stats };
      });
    },
  };
});
