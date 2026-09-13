import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage } from '../lib/safeStorage';
import { useEconomyStore } from './economyStore';
import { Capacitor } from '@capacitor/core';
import { admobService } from '../lib/admobService';
import { ADMOB_PRODUCTION_KEYS, AdMobUnitConfig } from '../config/admobConfig';
export type { AdMobUnitConfig };

export interface AdConfig {
  rewardedCoins: number;
  rewardedGems: number;
  interstitialFrequency: number;
  activeNetworks: string[];
  testMode: boolean;
  eCpm: number;
  impressions: number;
  estimatedRevenue: number;
}

export interface BannerConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  targetUrl: string;
  network: string;
  iconType: 'app' | 'gift' | 'star' | 'coin';
  position?: 'top' | 'bottom';
  rotationIntervalSeconds?: number;
  autoRotate?: boolean;
}

export interface PrivateAdCampaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  iconType: 'game' | 'app' | 'gift' | 'star' | 'rocket' | 'crown';
  iconUrl?: string;
  bannerImageUrl?: string;
  targetUrl: string;
  ctaText: string;
  active: boolean;
  category: 'cross_promo' | 'direct_sponsor' | 'affiliate' | 'custom';
  impressions: number;
  clicks: number;
  priority: number;
  createdAt: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'announcement' | 'gift' | 'update' | 'event';
  rewardType?: 'coins' | 'gems' | 'undo' | 'hammer';
  rewardAmount?: number;
  claimed?: boolean;
}

interface AdStore {
  adOverlayVisible: boolean;
  adType: 'rewarded' | 'interstitial' | 'offerwall' | null;
  adNetwork: string;
  rewardAmount?: number;
  rewardType?: 'coins' | 'gems' | 'energy';
  onComplete?: () => void;
  onClose?: () => void;

  adConfig: AdConfig;
  bannerConfig: BannerConfig;
  notifications: NotificationItem[];

  // Private Ads & Cross-Promotion
  privateAds: PrivateAdCampaign[];
  privateAdsMode: 'always' | 'mixed' | 'network_only';

  // AdMob Production & Test Keys
  admobKeys: AdMobUnitConfig;
  updateAdmobKeys: (keys: Partial<AdMobUnitConfig>) => void;

  showRewardedVideo: (network: string, rewardType: 'coins' | 'gems' | 'energy', rewardAmount: number, onComplete: () => void, onClose?: () => void) => void;
  showRewardedInterstitial: (network: string, rewardType: 'coins' | 'gems' | 'energy', rewardAmount: number, onComplete: () => void, onClose?: () => void) => void;
  showInterstitial: (network: string, onClose?: () => void) => void;
  showOfferwall: (network: string, onClose?: () => void) => void;
  
  completeAd: () => void;
  closeAd: () => void;

  // Admin controls
  setAdConfig: (config: Partial<AdConfig>) => void;
  setBannerConfig: (config: Partial<BannerConfig>) => void;
  broadcastNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read' | 'claimed'>) => void;
  deleteNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  claimNotificationReward: (id: string) => { success: boolean; message: string };
  recordImpression: (type: 'banner' | 'interstitial' | 'rewarded') => void;

  // Private Ads Actions
  addPrivateAd: (ad: Omit<PrivateAdCampaign, 'id' | 'impressions' | 'clicks' | 'createdAt'>) => void;
  updatePrivateAd: (id: string, updates: Partial<PrivateAdCampaign>) => void;
  deletePrivateAd: (id: string) => void;
  togglePrivateAd: (id: string) => void;
  setPrivateAdsMode: (mode: 'always' | 'mixed' | 'network_only') => void;
  recordPrivateAdImpression: (id: string) => void;
  recordPrivateAdClick: (id: string) => void;
}

export const useAdStore = create<AdStore>()(
  persist(
    (set, get) => ({
      adOverlayVisible: false,
      adType: null,
      adNetwork: 'admob',

      adConfig: {
        rewardedCoins: 500,
        rewardedGems: 25,
        interstitialFrequency: 3,
        activeNetworks: ['AdMob', 'Unity Ads', 'AppLovin', 'IronSource'],
        testMode: false,
        eCpm: 5.20,
        impressions: 142,
        estimatedRevenue: 0.74,
      },

      bannerConfig: {
        enabled: true,
        title: 'MergeVerse Tournament Live!',
        subtitle: 'Compete for 50,000 Gold Coins today',
        buttonText: 'Join Now',
        targetUrl: 'https://play.google.com/store',
        network: 'AdMob Premium',
        iconType: 'gift',
        rotationIntervalSeconds: 6,
        autoRotate: true,
      },

      privateAdsMode: 'mixed',

      privateAds: [],

      notifications: [],

      admobKeys: ADMOB_PRODUCTION_KEYS,
      updateAdmobKeys: (keys) => {
        set(s => ({
          admobKeys: { ...s.admobKeys, ...keys }
        }));
      },

      showRewardedVideo: (network, rewardType, rewardAmount, onComplete, onClose) => {
        const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
        if (isOffline) {
          if (onClose) onClose();
          return;
        }

        get().recordImpression('rewarded');

        // If running in Android native capacitor shell, invoke Google AdMob SDK
        if (Capacitor.isNativePlatform()) {
          admobService.showRewardedVideo(
            () => {
              if (onComplete) onComplete();
            },
            () => {
              if (onClose) onClose();
            }
          ).then((shown) => {
            if (!shown) {
              if (onClose) onClose();
            }
          }).catch(() => {
            if (onClose) onClose();
          });
          return;
        }

        // Web preview fallback
        set({
          adOverlayVisible: true,
          adType: 'rewarded',
          adNetwork: network,
          rewardType,
          rewardAmount,
          onComplete,
          onClose,
        });
      },

      showRewardedInterstitial: (network, rewardType, rewardAmount, onComplete, onClose) => {
        const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
        if (isOffline) {
          if (onClose) onClose();
          return;
        }

        get().recordImpression('rewarded');

        if (Capacitor.isNativePlatform()) {
          admobService.showRewardedInterstitial(
            () => {
              if (onComplete) onComplete();
            },
            () => {
              if (onClose) onClose();
            }
          ).then((shown) => {
            if (!shown) {
              if (onClose) onClose();
            }
          }).catch(() => {
            if (onClose) onClose();
          });
          return;
        }

        set({
          adOverlayVisible: true,
          adType: 'rewarded',
          adNetwork: network,
          rewardType,
          rewardAmount,
          onComplete,
          onClose,
        });
      },

      showInterstitial: (network, onClose) => {
        const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
        if (isOffline) {
          if (onClose) onClose();
          return;
        }

        get().recordImpression('interstitial');

        if (Capacitor.isNativePlatform()) {
          admobService.showInterstitial(onClose).then((shown) => {
            if (!shown) {
              if (onClose) onClose();
            }
          }).catch(() => {
            if (onClose) onClose();
          });
          return;
        }

        set({
          adOverlayVisible: true,
          adType: 'interstitial',
          adNetwork: network,
          onClose,
          onComplete: undefined,
        });
      },

      showOfferwall: (network, onClose) => {
        set({
          adOverlayVisible: true,
          adType: 'offerwall',
          adNetwork: network,
          onClose,
          onComplete: undefined,
        });
      },

      completeAd: () => {
        const { onComplete, onClose } = get();
        if (onComplete) onComplete();
        if (onClose) onClose();
        set({ adOverlayVisible: false, adType: null });
      },

      closeAd: () => {
        const { onClose } = get();
        if (onClose) onClose();
        set({ adOverlayVisible: false, adType: null });
      },

      setAdConfig: (config) => {
        set(s => ({
          adConfig: { ...s.adConfig, ...config }
        }));
      },

      setBannerConfig: (config) => {
        set(s => ({
          bannerConfig: { ...s.bannerConfig, ...config }
        }));
      },

      broadcastNotification: (notif) => {
        const newNotification: NotificationItem = {
          ...notif,
          id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: Date.now(),
          read: false,
          claimed: false,
        };
        set(s => ({
          notifications: [newNotification, ...s.notifications]
        }));
      },

      deleteNotification: (id) => {
        set(s => ({
          notifications: s.notifications.filter(n => n.id !== id)
        }));
      },

      markNotificationRead: (id) => {
        set(s => ({
          notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
        }));
      },

      markAllNotificationsRead: () => {
        set(s => ({
          notifications: s.notifications.map(n => ({ ...n, read: true }))
        }));
      },

      claimNotificationReward: (id) => {
        const notif = get().notifications.find(n => n.id === id);
        if (!notif) return { success: false, message: 'Notification not found.' };
        if (notif.claimed) return { success: false, message: 'Reward already claimed.' };
        if (!notif.rewardType || !notif.rewardAmount) return { success: false, message: 'No reward attached.' };

        const eco = useEconomyStore.getState();
        if (notif.rewardType === 'coins') {
          eco.addCoins(notif.rewardAmount);
        } else if (notif.rewardType === 'gems') {
          eco.addGems(notif.rewardAmount);
        } else if (notif.rewardType === 'undo') {
          eco.addPowerup('undo', notif.rewardAmount);
        } else if (notif.rewardType === 'hammer') {
          eco.addPowerup('hammer', notif.rewardAmount);
        }

        set(s => ({
          notifications: s.notifications.map(n => n.id === id ? { ...n, claimed: true, read: true } : n)
        }));

        return { success: true, message: `Claimed ${notif.rewardAmount}x ${notif.rewardType.toUpperCase()}!` };
      },

      addPrivateAd: (ad) => {
        const newCampaign: PrivateAdCampaign = {
          ...ad,
          id: `house-ad-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          impressions: 0,
          clicks: 0,
          createdAt: Date.now(),
        };
        set(s => ({
          privateAds: [newCampaign, ...s.privateAds]
        }));
      },

      updatePrivateAd: (id, updates) => {
        set(s => ({
          privateAds: s.privateAds.map(ad => ad.id === id ? { ...ad, ...updates } : ad)
        }));
      },

      deletePrivateAd: (id) => {
        set(s => ({
          privateAds: s.privateAds.filter(ad => ad.id !== id)
        }));
      },

      togglePrivateAd: (id) => {
        set(s => ({
          privateAds: s.privateAds.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad)
        }));
      },

      setPrivateAdsMode: (mode) => {
        set({ privateAdsMode: mode });
      },

      recordPrivateAdImpression: (id) => {
        set(s => ({
          privateAds: s.privateAds.map(ad => ad.id === id ? { ...ad, impressions: ad.impressions + 1 } : ad)
        }));
      },

      recordPrivateAdClick: (id) => {
        set(s => ({
          privateAds: s.privateAds.map(ad => ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad)
        }));
      },

      recordImpression: (type) => {
        set(s => {
          const newImp = s.adConfig.impressions + 1;
          const revInc = (s.adConfig.eCpm / 1000) * (type === 'rewarded' ? 2.5 : type === 'interstitial' ? 1.5 : 0.3);
          return {
            adConfig: {
              ...s.adConfig,
              impressions: newImp,
              estimatedRevenue: Number((s.adConfig.estimatedRevenue + revInc).toFixed(2))
            }
          };
        });
      }
    }),
    {
      name: 'ad-store-storage',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
