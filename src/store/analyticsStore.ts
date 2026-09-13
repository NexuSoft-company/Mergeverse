import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeStorage } from '../lib/safeStorage';

export interface DailyImpressionLog {
  date: string; // YYYY-MM-DD
  bannerImpressions: number;
  interstitialImpressions: number;
  rewardedImpressions: number;
  estimatedRevenue: number; // calculated locally from eCPM formula (impressions * ecpm / 1000)
}

export interface LocalMonetizationEvent {
  id: string;
  type: 'ad_impression' | 'rewarded_ad_complete' | 'reward_claimed' | 'shop_view' | 'item_purchased';
  network?: string;
  placement?: string;
  reward?: string;
  timestamp: number;
}

export interface GameAnalytics {
  plays: number;
  totalPlayTimeSeconds: number;
  highScore: number;
  lastPlayed: number;
}

export interface AnalyticsState {
  // Device-level local analytics
  deviceSessionCount: number;
  deviceTotalPlayTimeSeconds: number;
  deviceFirstInstalledDate: string;
  deviceLastSessionDate: string;
  
  // Game breakdowns (This Device)
  gameStats: {
    '2048_classic': GameAnalytics;
    'number_snacks': GameAnalytics;
    'drop_numbers': GameAnalytics;
    'merge_blocks': GameAnalytics;
    'hexagon': GameAnalytics;
  };

  // Local aggregates
  totalMergesMade: number;
  totalSnacksCollected: number;
  highestPowerReached: number;
  totalRewardsClaimed: number;
  dailyChallengesCompleted: number;

  // Local Monetization tracking
  totalAdsWatched: number;
  totalRewardedAdsWatched: number;
  totalMonetizationEventsCount: number;
  localECpm: number; // e.g. $4.50 used for local estimate calculation
  dailyImpressionLogs: DailyImpressionLog[];
  recentEvents: LocalMonetizationEvent[];

  // Actions
  recordGameSession: (gameId: '2048_classic' | 'number_snacks' | 'drop_numbers' | 'merge_blocks' | 'hexagon', durationSeconds: number, score: number) => void;
  recordMerge: (count?: number) => void;
  recordSnackCollection: (count?: number, power?: number) => void;
  recordRewardClaimed: () => void;
  recordDailyChallengeCompleted: () => void;
  recordAdWatch: (type: 'banner' | 'interstitial' | 'rewarded', network?: string, placement?: string) => void;
  recordMonetizationEvent: (event: Omit<LocalMonetizationEvent, 'id' | 'timestamp'>) => void;
  clearLocalAnalytics: () => void;
  setLocalECpm: (ecpm: number) => void;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      deviceSessionCount: 12,
      deviceTotalPlayTimeSeconds: 4820,
      deviceFirstInstalledDate: '2026-08-20',
      deviceLastSessionDate: getToday(),

      gameStats: {
        '2048_classic': { plays: 18, totalPlayTimeSeconds: 2400, highScore: 16384, lastPlayed: Date.now() - 3600000 },
        'number_snacks': { plays: 24, totalPlayTimeSeconds: 1560, highScore: 8420, lastPlayed: Date.now() - 1200000 },
        'drop_numbers': { plays: 9, totalPlayTimeSeconds: 420, highScore: 3850, lastPlayed: Date.now() - 86400000 },
        'merge_blocks': { plays: 7, totalPlayTimeSeconds: 310, highScore: 2940, lastPlayed: Date.now() - 172800000 },
        'hexagon': { plays: 11, totalPlayTimeSeconds: 580, highScore: 5120, lastPlayed: Date.now() - 7200000 },
      },

      totalMergesMade: 432,
      totalSnacksCollected: 295,
      highestPowerReached: 512,
      totalRewardsClaimed: 14,
      dailyChallengesCompleted: 5,

      totalAdsWatched: 28,
      totalRewardedAdsWatched: 12,
      totalMonetizationEventsCount: 45,
      localECpm: 4.80,

      dailyImpressionLogs: [
        { date: '2026-08-30', bannerImpressions: 14, interstitialImpressions: 3, rewardedImpressions: 2, estimatedRevenue: 0.09 },
        { date: '2026-08-31', bannerImpressions: 22, interstitialImpressions: 4, rewardedImpressions: 3, estimatedRevenue: 0.14 },
        { date: '2026-09-01', bannerImpressions: 18, interstitialImpressions: 2, rewardedImpressions: 1, estimatedRevenue: 0.10 },
        { date: '2026-09-02', bannerImpressions: 30, interstitialImpressions: 5, rewardedImpressions: 4, estimatedRevenue: 0.19 },
        { date: '2026-09-03', bannerImpressions: 25, interstitialImpressions: 3, rewardedImpressions: 3, estimatedRevenue: 0.15 },
        { date: '2026-09-04', bannerImpressions: 35, interstitialImpressions: 6, rewardedImpressions: 5, estimatedRevenue: 0.22 },
        { date: '2026-09-05', bannerImpressions: 16, interstitialImpressions: 2, rewardedImpressions: 2, estimatedRevenue: 0.10 },
      ],

      recentEvents: [
        { id: 'evt-1', type: 'rewarded_ad_complete', network: 'AdMob', placement: 'Bonus Coins', timestamp: Date.now() - 1800000 },
        { id: 'evt-2', type: 'item_purchased', reward: 'Hammer Booster', timestamp: Date.now() - 3600000 },
        { id: 'evt-3', type: 'ad_impression', network: 'Unity Ads', placement: 'Game Exit Interstitial', timestamp: Date.now() - 7200000 },
      ],

      recordGameSession: (gameId, durationSeconds, score) => {
        set(state => {
          const current = state.gameStats[gameId] || { plays: 0, totalPlayTimeSeconds: 0, highScore: 0, lastPlayed: 0 };
          return {
            deviceSessionCount: state.deviceSessionCount + 1,
            deviceTotalPlayTimeSeconds: state.deviceTotalPlayTimeSeconds + durationSeconds,
            deviceLastSessionDate: getToday(),
            gameStats: {
              ...state.gameStats,
              [gameId]: {
                plays: current.plays + 1,
                totalPlayTimeSeconds: current.totalPlayTimeSeconds + durationSeconds,
                highScore: Math.max(current.highScore, score),
                lastPlayed: Date.now(),
              }
            }
          };
        });
      },

      recordMerge: (count = 1) => {
        set(state => ({ totalMergesMade: state.totalMergesMade + count }));
      },

      recordSnackCollection: (count = 1, power = 0) => {
        set(state => ({
          totalSnacksCollected: state.totalSnacksCollected + count,
          highestPowerReached: Math.max(state.highestPowerReached, power)
        }));
      },

      recordRewardClaimed: () => {
        set(state => ({ totalRewardsClaimed: state.totalRewardsClaimed + 1 }));
      },

      recordDailyChallengeCompleted: () => {
        set(state => ({ dailyChallengesCompleted: state.dailyChallengesCompleted + 1 }));
      },

      recordAdWatch: (type, network = 'AdMob', placement = 'Default') => {
        const today = getToday();
        set(state => {
          const isRewarded = type === 'rewarded';
          const newTotalAds = state.totalAdsWatched + 1;
          const newRewardedAds = isRewarded ? state.totalRewardedAdsWatched + 1 : state.totalRewardedAdsWatched;
          
          // Update daily logs
          const existingLogs = [...state.dailyImpressionLogs];
          const todayIdx = existingLogs.findIndex(l => l.date === today);
          if (todayIdx >= 0) {
            const entry = { ...existingLogs[todayIdx] };
            if (type === 'banner') entry.bannerImpressions += 1;
            if (type === 'interstitial') entry.interstitialImpressions += 1;
            if (type === 'rewarded') entry.rewardedImpressions += 1;
            const totalImp = entry.bannerImpressions + entry.interstitialImpressions + entry.rewardedImpressions;
            entry.estimatedRevenue = parseFloat(((totalImp * state.localECpm) / 1000).toFixed(2));
            existingLogs[todayIdx] = entry;
          } else {
            existingLogs.push({
              date: today,
              bannerImpressions: type === 'banner' ? 1 : 0,
              interstitialImpressions: type === 'interstitial' ? 1 : 0,
              rewardedImpressions: type === 'rewarded' ? 1 : 0,
              estimatedRevenue: parseFloat(((1 * state.localECpm) / 1000).toFixed(2)),
            });
          }

          const newEvent: LocalMonetizationEvent = {
            id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            type: isRewarded ? 'rewarded_ad_complete' : 'ad_impression',
            network,
            placement,
            timestamp: Date.now()
          };

          return {
            totalAdsWatched: newTotalAds,
            totalRewardedAdsWatched: newRewardedAds,
            totalMonetizationEventsCount: state.totalMonetizationEventsCount + 1,
            dailyImpressionLogs: existingLogs.slice(-14),
            recentEvents: [newEvent, ...state.recentEvents.slice(0, 24)]
          };
        });
      },

      recordMonetizationEvent: (event) => {
        set(state => ({
          totalMonetizationEventsCount: state.totalMonetizationEventsCount + 1,
          recentEvents: [
            {
              ...event,
              id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              timestamp: Date.now()
            },
            ...state.recentEvents.slice(0, 24)
          ]
        }));
      },

      clearLocalAnalytics: () => {
        set({
          deviceSessionCount: 0,
          deviceTotalPlayTimeSeconds: 0,
          totalMergesMade: 0,
          totalSnacksCollected: 0,
          highestPowerReached: 0,
          totalRewardsClaimed: 0,
          dailyChallengesCompleted: 0,
          totalAdsWatched: 0,
          totalRewardedAdsWatched: 0,
          totalMonetizationEventsCount: 0,
          dailyImpressionLogs: [{
            date: getToday(),
            bannerImpressions: 0,
            interstitialImpressions: 0,
            rewardedImpressions: 0,
            estimatedRevenue: 0
          }],
          recentEvents: [],
          gameStats: {
            '2048_classic': { plays: 0, totalPlayTimeSeconds: 0, highScore: 0, lastPlayed: 0 },
            'number_snacks': { plays: 0, totalPlayTimeSeconds: 0, highScore: 0, lastPlayed: 0 },
            'drop_numbers': { plays: 0, totalPlayTimeSeconds: 0, highScore: 0, lastPlayed: 0 },
            'merge_blocks': { plays: 0, totalPlayTimeSeconds: 0, highScore: 0, lastPlayed: 0 },
            'hexagon': { plays: 0, totalPlayTimeSeconds: 0, highScore: 0, lastPlayed: 0 },
          }
        });
      },

      setLocalECpm: (ecpm) => set({ localECpm: Math.max(0.1, ecpm) }),
    }),
    {
      name: 'mergeverse_device_analytics_v1',
      storage: {
        getItem: (name) => {
          const val = safeStorage.getItem(name);
          return val ? JSON.parse(val) : null;
        },
        setItem: (name, val) => safeStorage.setItem(name, JSON.stringify(val)),
        removeItem: (name) => safeStorage.removeItem(name),
      }
    }
  )
);
