export interface AdMobUnitConfig {
  appId: string;
  bannerAdUnitId: string;
  interstitialAdUnitId: string;
  rewardedInterstitialAdUnitId: string;
  rewardedVideoAdUnitId: string;
  testDeviceIds?: string[];
}

export const ADMOB_PRODUCTION_KEYS: AdMobUnitConfig = {
  appId: 'ca-app-pub-1492562421327050~9400146124',
  bannerAdUnitId: 'ca-app-pub-1492562421327050/4307601544',
  interstitialAdUnitId: 'ca-app-pub-1492562421327050/9115602917',
  rewardedInterstitialAdUnitId: 'ca-app-pub-1492562421327050/1521656108',
  rewardedVideoAdUnitId: 'ca-app-pub-1492562421327050/9643206201',
  testDeviceIds: [],
};
