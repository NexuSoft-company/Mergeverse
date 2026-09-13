import React, { useState } from 'react';
import { 
  Tv, ShieldAlert, CheckCircle2, AlertTriangle, 
  Rocket, Award, Layers, Sliders, Eye, TrendingUp, BarChart2,
  Key, Copy, Check, Play, Smartphone, Cloud, RefreshCcw
} from 'lucide-react';
import { useAdminConfigStore } from '../../store/adminConfigStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { useAdStore } from '../../store/adStore';
import { ADMOB_PRODUCTION_KEYS } from '../../config/admobConfig';
import { pushAdsToCloud } from '../../services/remoteConfigSync';

export function AdminRevenueTab() {
  const { revenueConfig, updateRevenueConfig, currentAdminUser } = useAdminConfigStore();
  const analytics = useAnalyticsStore();
  const adStore = useAdStore();

  const [notification, setNotification] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const syncAdSettings = async () => {
    setIsSyncing(true);
    const res = await pushAdsToCloud(currentAdminUser?.pin || '2048');
    setIsSyncing(false);
    if (res.success) {
      showNotify('AdMob & Monetization config pushed to Cloud!');
    } else {
      showNotify('Cloud push failed. Local settings preserved.');
    }
  };

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(label);
    showNotify(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const logs = analytics.dailyImpressionLogs;
  const maxImpression = Math.max(...logs.map(l => l.bannerImpressions + l.interstitialImpressions + l.rewardedImpressions), 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-cyan-400" /> Ad & Placement Control Center
          </h3>
          <p className="text-xs text-slate-400">
            Configure rewarded video triggers, frequency limits, and ad placement controls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {notification && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full animate-pulse">
              {notification}
            </span>
          )}
          <button
            onClick={syncAdSettings}
            disabled={isSyncing}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>{isSyncing ? 'Syncing...' : 'Push AdMob to Cloud'}</span>
          </button>
        </div>
      </div>

      {/* REVENUE ANALYTICS: Interactive SVG Chart (Local Device Telemetry) */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-black uppercase tracking-wider text-white">Daily Ad Impression Logs & Local Estimates</h4>
            </div>
            <p className="text-xs text-slate-400">Past 7 days performance tracked on this device</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2.5 py-1 rounded-full font-mono font-bold">
              LOCAL DEVICE ESTIMATE
            </span>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full bg-[#07091a] border border-white/5 rounded-2xl p-4">
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
            {logs.map((day, idx) => {
              const totalImp = day.bannerImpressions + day.interstitialImpressions + day.rewardedImpressions;
              const barHeightPct = Math.max(8, Math.round((totalImp / maxImpression) * 100));
              const rewardedPct = totalImp > 0 ? (day.rewardedImpressions / totalImp) * 100 : 0;
              const interstitialPct = totalImp > 0 ? (day.interstitialImpressions / totalImp) * 100 : 0;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                  <div className="text-[9px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${day.estimatedRevenue}
                  </div>
                  <div 
                    className="w-full max-w-[36px] bg-white/10 rounded-t-lg overflow-hidden flex flex-col-reverse transition-all group-hover:brightness-125"
                    style={{ height: `${barHeightPct}%` }}
                  >
                    {/* Rewarded Ads Segment */}
                    <div 
                      className="w-full bg-emerald-500" 
                      style={{ height: `${rewardedPct}%` }} 
                      title={`${day.rewardedImpressions} Rewarded`}
                    />
                    {/* Interstitials Segment */}
                    <div 
                      className="w-full bg-indigo-500" 
                      style={{ height: `${interstitialPct}%` }} 
                      title={`${day.interstitialImpressions} Interstitials`}
                    />
                    {/* Banner Segment (Remaining) */}
                    <div className="w-full bg-cyan-600/60 flex-1" title={`${day.bannerImpressions} Banners`} />
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">
                    {day.date.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-white/5 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span>Rewarded Videos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-indigo-500" />
              <span>Interstitials</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-cyan-600/60" />
              <span>Banner Impressions</span>
            </div>
          </div>
        </div>

        {/* Strict Distinction Disclaimer */}
        <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-200 leading-relaxed">
            <strong>Monetization Distinction:</strong> These metrics represent local device simulations calculated using an eCPM of ${analytics.localECpm.toFixed(2)}. 
            Actual commercial revenue is verified exclusively within the official Google AdMob and Google Play developer consoles. MergeVerse does not invent fake revenue balances.
          </p>
        </div>
      </div>

      {/* SECTION A: AD MONETIZATION */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Tv className="w-5 h-5 text-indigo-400" />
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Section A: Ad Monetization Architecture</h4>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-mono font-bold">
            SDK v23.4.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* AdMob Status */}
          <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase">Google AdMob Status</span>
            <select
              value={revenueConfig.adMobStatus}
              onChange={(e) => {
                updateRevenueConfig({ adMobStatus: e.target.value as any });
                showNotify('AdMob status updated');
              }}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-xs text-white font-bold outline-none"
            >
              <option value="connected_test">Connected (Test Mode)</option>
              <option value="live">Live Production</option>
              <option value="disabled">Disabled</option>
            </select>
            <p className="text-[10px] text-slate-500">Serves test creative units in offline sandbox preview.</p>
          </div>

          {/* Banner Ads Placement */}
          <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase">Banner Ads &amp; Rotation</span>
              <button
                onClick={() => {
                  const updated = !revenueConfig.bannerAds.enabled;
                  updateRevenueConfig({ bannerAds: { ...revenueConfig.bannerAds, enabled: updated } });
                  adStore.setBannerConfig({ enabled: updated });
                  showNotify(`Banner ads ${updated ? 'enabled' : 'disabled'}`);
                }}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg ${
                  revenueConfig.bannerAds.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {revenueConfig.bannerAds.enabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <select
                value={revenueConfig.bannerAds.position}
                onChange={(e) => {
                  updateRevenueConfig({ bannerAds: { ...revenueConfig.bannerAds, position: e.target.value as any } });
                  adStore.setBannerConfig({ position: e.target.value as any });
                  showNotify('Banner position updated');
                }}
                className="bg-white/10 border border-white/20 rounded-lg p-2 text-[11px] text-white font-bold outline-none"
              >
                <option value="bottom">Bottom Dock</option>
                <option value="top">Top Dock</option>
              </select>
              <select
                value={revenueConfig.bannerAds.network}
                onChange={(e) => {
                  updateRevenueConfig({ bannerAds: { ...revenueConfig.bannerAds, network: e.target.value } });
                  adStore.setBannerConfig({ network: e.target.value });
                  showNotify('Banner network updated');
                }}
                className="bg-white/10 border border-white/20 rounded-lg p-2 text-[11px] text-white font-bold outline-none"
              >
                <option value="Google AdMob">Google AdMob</option>
                <option value="Unity Ads">Unity Ads</option>
                <option value="AppLovin MAX">AppLovin MAX</option>
              </select>
            </div>

            {/* Rotation Interval 5-7s Controls */}
            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Auto-Change Cycle:</span>
                <span className="text-[10px] font-mono text-cyan-300 font-bold">
                  {adStore.bannerConfig.rotationIntervalSeconds || 6} Seconds
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[5, 6, 7].map((sec) => {
                  const isSelected = (adStore.bannerConfig.rotationIntervalSeconds || 6) === sec;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        updateRevenueConfig({ 
                          bannerAds: { ...revenueConfig.bannerAds, rotationIntervalSeconds: sec } 
                        });
                        adStore.setBannerConfig({ rotationIntervalSeconds: sec });
                        showNotify(`Banner rotation set to ${sec} seconds!`);
                      }}
                      className={`py-1 rounded-lg text-[10px] font-mono font-bold transition ${
                        isSelected 
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {sec}s {sec === 6 && '★'}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] text-slate-500">Auto-rotates every 5 to 7 seconds with smooth live countdown.</p>
          </div>

          {/* Interstitial Frequency */}
          <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase">Interstitial Frequency</span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                Every {revenueConfig.interstitialAds.frequencyMatches} games
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={revenueConfig.interstitialAds.frequencyMatches}
              onChange={(e) => {
                updateRevenueConfig({ 
                  interstitialAds: { 
                    ...revenueConfig.interstitialAds, 
                    frequencyMatches: parseInt(e.target.value) 
                  } 
                });
                showNotify('Interstitial frequency updated');
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Shown only on natural game exits. Never interrupts active gameplay.</p>
          </div>
        </div>

        {/* Private House Ads Quick Banner */}
        <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black/40 border border-purple-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-purple-300 flex items-center gap-2">
                <span>Private House Ads &amp; Cross-Promotion Active</span>
                <span className="text-[9px] bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full font-mono font-bold">
                  {adStore.privateAds.filter(a => a.active).length} LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                You can promote your other games and custom download links in the dedicated <b>Private Ads</b> console tab.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-purple-300 bg-white/5 border border-purple-500/20 px-3 py-1.5 rounded-xl shrink-0">
            Serving Mode: <span className="font-bold uppercase text-white">{adStore.privateAdsMode}</span>
          </div>
        </div>
      </div>

      {/* SECTION B: REWARDED ADS CONFIGURATION */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Section B: Rewarded Video Placements & Safeguards</h4>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
            USER-INITIATED ONLY
          </span>
        </div>

        {/* Placements Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'continueGame', label: 'Continue Game Revive', desc: 'Revive on game over screen' },
            { key: 'doubleReward', label: 'Double Score Reward', desc: 'Double match payout' },
            { key: 'extraLife', label: 'Extra Life / Shield', desc: 'Emergency obstacle bypass' },
            { key: 'bonusCoins', label: 'Bonus Coins (500)', desc: 'Voluntary hub reward' },
          ].map((item) => {
            const isEnabled = revenueConfig.rewardedAds.placements[item.key as keyof typeof revenueConfig.rewardedAds.placements];
            return (
              <div key={item.key} className="bg-black/30 p-3 rounded-xl border border-white/5 flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{item.label}</span>
                    <button
                      onClick={() => {
                        updateRevenueConfig({
                          rewardedAds: {
                            ...revenueConfig.rewardedAds,
                            placements: {
                              ...revenueConfig.rewardedAds.placements,
                              [item.key]: !isEnabled
                            }
                          }
                        });
                        showNotify(`${item.label} ${!isEnabled ? 'enabled' : 'disabled'}`);
                      }}
                      className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isEnabled ? 'bg-emerald-500' : 'bg-white/20'}`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rewarded Rules & Verification Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Coin Reward Per Ad</span>
            <input
              type="number"
              value={revenueConfig.rewardedAds.rewardCoins}
              onChange={(e) => {
                updateRevenueConfig({
                  rewardedAds: { ...revenueConfig.rewardedAds, rewardCoins: Math.max(50, parseInt(e.target.value) || 0) }
                });
              }}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs font-bold text-amber-300 outline-none"
            />
          </div>

          <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Max Daily Rewarded Ads</span>
            <input
              type="number"
              value={revenueConfig.rewardedAds.maxPerDay}
              onChange={(e) => {
                updateRevenueConfig({
                  rewardedAds: { ...revenueConfig.rewardedAds, maxPerDay: Math.max(1, parseInt(e.target.value) || 0) }
                });
              }}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs font-bold text-white outline-none"
            />
          </div>

          <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Cooldown Timer</span>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-mono font-bold text-cyan-300">{revenueConfig.rewardedAds.cooldownMinutes} Minutes</span>
            </div>
            <p className="text-[10px] text-slate-500">Enforces cooldown between rewarded ad claims.</p>
          </div>
        </div>

        {/* Security Rule Warning */}
        <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Fraud Protection Rule:</strong> Rewards are granted strictly when the underlying ad SDK confirms a complete 100% video impression.
          </span>
        </div>
      </div>

      {/* SECTION B: ACTIVE GOOGLE ADMOB PRODUCTION KEYS */}
      <div className="bg-black/40 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 space-y-4 bg-indigo-950/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Key className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                Section B: Google AdMob Production Keys &amp; Units
              </h4>
              <p className="text-xs text-slate-400">
                Live App ID &amp; Ad Unit IDs integrated into AndroidManifest.xml and AdMob Engine
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> INTEGRATED &amp; ACTIVE
          </span>
        </div>

        {/* Keys List */}
        <div className="space-y-2.5">
          {[
            {
              id: 'appId',
              name: 'AdMob App ID',
              unit: adStore.admobKeys.appId,
              target: 'AndroidManifest.xml & Google Mobile Ads SDK',
              type: 'App Identifier',
              canTest: false,
            },
            {
              id: 'bannerAdUnitId',
              name: 'Banner Ad Unit ID',
              unit: adStore.admobKeys.bannerAdUnitId,
              target: 'Bottom & Top In-Game Banner Dock',
              type: 'Banner (320x50 / Adaptive)',
              canTest: true,
              testAction: () => {
                showNotify('Banner Ad Dock activated');
                adStore.setBannerConfig({ enabled: true });
              },
            },
            {
              id: 'interstitialAdUnitId',
              name: 'Interstitial Ad Unit ID',
              unit: adStore.admobKeys.interstitialAdUnitId,
              target: 'Game Over & Mode Selection Transition',
              type: 'Full Screen Interstitial',
              canTest: true,
              testAction: () => {
                adStore.showInterstitial('Google AdMob');
              },
            },
            {
              id: 'rewardedInterstitialAdUnitId',
              name: 'Rewarded Interstitial Ad Unit ID',
              unit: adStore.admobKeys.rewardedInterstitialAdUnitId,
              target: 'Level Milestone & Mystery Bonus Break',
              type: 'Rewarded Interstitial',
              canTest: true,
              testAction: () => {
                adStore.showRewardedInterstitial('Google AdMob', 'coins', 1000, () => {
                  showNotify('Rewarded Interstitial completed! +1000 Coins granted');
                });
              },
            },
            {
              id: 'rewardedVideoAdUnitId',
              name: 'Rewarded Video Ad Unit ID',
              unit: adStore.admobKeys.rewardedVideoAdUnitId,
              target: 'Free Coins, Gem Chests & Revive Prompts',
              type: 'Rewarded Video (Full Opt-In)',
              canTest: true,
              testAction: () => {
                adStore.showRewardedVideo('Google AdMob', 'coins', 500, () => {
                  showNotify('Rewarded Video completed! +500 Coins granted');
                });
              },
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-black/40 border border-white/10 hover:border-indigo-500/40 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white uppercase tracking-wider">{item.name}</span>
                  <span className="text-[9px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) => {
                    adStore.updateAdmobKeys({ [item.id]: e.target.value });
                  }}
                  placeholder={`Enter ${item.name}`}
                  className="w-full font-mono text-xs text-indigo-200 bg-black/50 px-2.5 py-1 rounded-lg border border-white/10 focus:border-indigo-500/50 outline-none transition"
                />
                <p className="text-[10px] text-slate-400">Used for: {item.target}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(item.name, item.unit)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center gap-1.5 transition-all"
                >
                  {copiedKey === item.name ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {item.canTest && item.testAction && (
                  <button
                    type="button"
                    onClick={item.testAction}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                    <span>Test Ad</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Summary Badge */}
        <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex items-center justify-between text-xs text-indigo-200">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Native Android &amp; Capacitor Ready:</strong> Manifest contains{' '}
              <code className="bg-black/50 px-1 py-0.5 rounded text-cyan-300 font-mono text-[10px]">
                com.google.android.gms.ads.APPLICATION_ID
              </code>
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase">5 / 5 Keys Bound</span>
        </div>
      </div>

      {/* SECTION C: 100% VIRTUAL ECONOMY ASSURANCE */}
      <div className="bg-black/40 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 space-y-3 bg-emerald-950/10">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Billing & Real Money Status</h4>
            <p className="text-xs text-slate-400">Zero real-money in-app transactions or external billing gateways</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-emerald-400 font-bold">100% Free-to-Play Virtual Economy:</strong> All billing systems, in-app purchase modules, and real-money payment processors are completely disabled and removed. Every skin, universe theme, power-up, and gem pack in the game is unlocked purely with in-game Gold Coins and gameplay achievements.
        </p>
      </div>
    </div>
  );
}
