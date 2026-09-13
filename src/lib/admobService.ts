import { Capacitor } from '@capacitor/core';
import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  RewardAdOptions, 
  AdOptions,
  RewardAdPluginEvents,
  InterstitialAdPluginEvents
} from '@capacitor-community/admob';
import { ADMOB_PRODUCTION_KEYS } from '../config/admobConfig';

class AdMobService {
  private isInitialized = false;
  private isBannerVisible = false;

  private isOffline(): boolean {
    return typeof navigator !== 'undefined' && !navigator.onLine;
  }

  public async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    if (!Capacitor.isNativePlatform()) {
      this.isInitialized = true;
      return true;
    }

    if (this.isOffline()) {
      return false;
    }

    try {
      await AdMob.initialize({
        testingDevices: ADMOB_PRODUCTION_KEYS.testDeviceIds,
        initializeForTesting: false,
      });
      this.isInitialized = true;
      return true;
    } catch (err) {
      console.warn('[AdMob] Native initialization failed or offline:', err);
      return false;
    }
  }

  public async showBanner(): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || this.isOffline()) return false;
    try {
      await this.initialize();
      const options: BannerAdOptions = {
        adId: ADMOB_PRODUCTION_KEYS.bannerAdUnitId,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false,
      };
      await AdMob.showBanner(options);
      this.isBannerVisible = true;
      return true;
    } catch (err) {
      console.warn('[AdMob] showBanner error:', err);
      return false;
    }
  }

  public async hideBanner(): Promise<void> {
    if (!Capacitor.isNativePlatform() || !this.isBannerVisible) return;
    try {
      await AdMob.hideBanner();
      this.isBannerVisible = false;
    } catch (err) {
      console.warn('[AdMob] hideBanner error:', err);
    }
  }

  public async showInterstitial(onDismiss?: () => void): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || this.isOffline()) {
      if (onDismiss) onDismiss();
      return false;
    }
    try {
      await this.initialize();
      const options: AdOptions = {
        adId: ADMOB_PRODUCTION_KEYS.interstitialAdUnitId,
        isTesting: false,
      };

      // 2.5s timeout safety race
      const preparePromise = AdMob.prepareInterstitial(options);
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('AdMob prepare timeout')), 2500)
      );

      await Promise.race([preparePromise, timeoutPromise]);

      const dismissHandler = AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        dismissHandler.then(h => h.remove());
        if (onDismiss) onDismiss();
      });

      await AdMob.showInterstitial();
      return true;
    } catch (err) {
      console.warn('[AdMob] showInterstitial non-blocking fallback:', err);
      if (onDismiss) onDismiss();
      return false;
    }
  }

  public async showRewardedVideo(
    onReward: (amount: number, type: string) => void,
    onDismiss?: () => void
  ): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || this.isOffline()) {
      if (onDismiss) onDismiss();
      return false;
    }
    try {
      await this.initialize();
      const options: RewardAdOptions = {
        adId: ADMOB_PRODUCTION_KEYS.rewardedVideoAdUnitId,
        isTesting: false,
      };

      const preparePromise = AdMob.prepareRewardVideoAd(options);
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('AdMob prepare timeout')), 2500)
      );

      await Promise.race([preparePromise, timeoutPromise]);

      let rewarded = false;
      const rewardHandler = AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
        rewarded = true;
        rewardHandler.then(h => h.remove());
        onReward(reward.amount, reward.type);
      });

      const dismissHandler = AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        dismissHandler.then(h => h.remove());
        if (!rewarded && onDismiss) {
          onDismiss();
        }
      });

      await AdMob.showRewardVideoAd();
      return true;
    } catch (err) {
      console.warn('[AdMob] showRewardedVideo error:', err);
      if (onDismiss) onDismiss();
      return false;
    }
  }

  public async showRewardedInterstitial(
    onReward: (amount: number, type: string) => void,
    onDismiss?: () => void
  ): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || this.isOffline()) {
      if (onDismiss) onDismiss();
      return false;
    }
    try {
      await this.initialize();
      const options: RewardAdOptions = {
        adId: ADMOB_PRODUCTION_KEYS.rewardedInterstitialAdUnitId,
        isTesting: false,
      };

      const preparePromise = AdMob.prepareRewardInterstitialAd(options);
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('AdMob prepare timeout')), 2500)
      );

      await Promise.race([preparePromise, timeoutPromise]);

      let rewarded = false;
      const rewardHandler = AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
        rewarded = true;
        rewardHandler.then(h => h.remove());
        onReward(reward.amount, reward.type);
      });

      const dismissHandler = AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        dismissHandler.then(h => h.remove());
        if (!rewarded && onDismiss) {
          onDismiss();
        }
      });

      await AdMob.showRewardInterstitialAd();
      return true;
    } catch (err) {
      console.warn('[AdMob] showRewardedInterstitial error:', err);
      if (onDismiss) onDismiss();
      return false;
    }
  }

  public getKeys() {
    return ADMOB_PRODUCTION_KEYS;
  }
}

export const admobService = new AdMobService();
