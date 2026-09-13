import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useEconomyStore } from '../store/economyStore';
import { useAdStore, PrivateAdCampaign } from '../store/adStore';
import { 
  Trophy, Gift, Star, ExternalLink, X, Rocket, Crown, 
  Gamepad2, Smartphone, ChevronRight, ChevronLeft, RefreshCw,
  Pause, Play, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface UnifiedBannerItem {
  id: string;
  type: 'private' | 'network';
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  targetUrl: string;
  network?: string;
  iconType: 'game' | 'app' | 'gift' | 'star' | 'rocket' | 'crown' | 'coin' | 'trophy' | 'sparkles';
  privateAdId?: string;
  bgGradient: string;
  accentBorder: string;
}

export function BannerAd({ network }: { network?: string }) {
  const { vipLevel } = useEconomyStore();
  const { 
    bannerConfig, 
    privateAds, 
    privateAdsMode, 
    recordImpression, 
    recordPrivateAdImpression, 
    recordPrivateAdClick 
  } = useAdStore();

  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const recordedItemRef = useRef<string | null>(null);

  // 5 to 7 seconds interval setting (default: 6 seconds)
  const rotationInterval = bannerConfig.rotationIntervalSeconds || 6;
  const isAutoRotate = bannerConfig.autoRotate !== false;
  const displayNetwork = network || bannerConfig.network || 'Google AdMob';

  const activePrivateAds = useMemo(() => {
    return privateAds.filter(a => a.active);
  }, [privateAds]);

  // Network sponsored creatives pool for continuous rotation
  const networkCreatives: UnifiedBannerItem[] = useMemo(() => [
    {
      id: 'net-promo-tournament',
      type: 'network',
      title: bannerConfig.title || 'MergeVerse Tournament Live!',
      subtitle: bannerConfig.subtitle || 'Compete for 50,000 Gold Coins today',
      badge: 'Live Event',
      ctaText: bannerConfig.buttonText || 'Join Free',
      targetUrl: bannerConfig.targetUrl || 'https://play.google.com/store',
      iconType: (bannerConfig.iconType as any) || 'gift',
      network: displayNetwork,
      bgGradient: 'from-[#0e122b]/95 via-[#181238]/95 to-[#0b0c26]/95',
      accentBorder: 'border-cyan-500/30',
    },
    {
      id: 'net-promo-playpass',
      type: 'network',
      title: 'Google Play Games Pass',
      subtitle: 'Unlock 1,000+ top mobile games without banner interruptions',
      badge: 'Featured Sponsor',
      ctaText: 'Learn More',
      targetUrl: 'https://play.google.com/store',
      iconType: 'star',
      network: 'Google Play',
      bgGradient: 'from-[#0b1b2b]/95 via-[#10223b]/95 to-[#091526]/95',
      accentBorder: 'border-blue-500/30',
    },
    {
      id: 'net-promo-cyberstrike',
      type: 'network',
      title: 'Cyber Strike: Tactical RPG',
      subtitle: 'Fast sci-fi puzzle combat with hero squads & multiplayer',
      badge: 'Trending Hit',
      ctaText: 'Install Free',
      targetUrl: 'https://play.google.com/store',
      iconType: 'game',
      network: 'Unity Ads',
      bgGradient: 'from-[#190d28]/95 via-[#231238]/95 to-[#130a21]/95',
      accentBorder: 'border-fuchsia-500/30',
    },
    {
      id: 'net-promo-booster',
      type: 'network',
      title: 'Ultra 120 FPS Speed Booster',
      subtitle: 'Zero input lag & battery optimization for smooth merging',
      badge: 'App Utility',
      ctaText: 'Get Booster',
      targetUrl: 'https://play.google.com/store',
      iconType: 'rocket',
      network: 'AppLovin MAX',
      bgGradient: 'from-[#0b1f1a]/95 via-[#122820]/95 to-[#0a1814]/95',
      accentBorder: 'border-emerald-500/30',
    },
    {
      id: 'net-promo-spin',
      type: 'network',
      title: 'Daily Super Spin Ready!',
      subtitle: 'Spin now for a chance at 10,000 Coins & Smash Hammers',
      badge: 'Daily Reward',
      ctaText: 'Spin Now',
      targetUrl: 'https://ai.studio/build',
      iconType: 'crown',
      network: 'Studio Bonus',
      bgGradient: 'from-[#22180b]/95 via-[#2d1e0d]/95 to-[#160f06]/95',
      accentBorder: 'border-amber-500/30',
    }
  ], [bannerConfig, displayNetwork]);

  // Combine items based on serving strategy:
  // - 'always': only active private ads
  // - 'network_only': only network ads
  // - 'mixed': interleave private ads and network ads so user sees both every 5-7s
  const items: UnifiedBannerItem[] = useMemo(() => {
    const privateItems: UnifiedBannerItem[] = activePrivateAds.map((ad: PrivateAdCampaign) => ({
      id: `private-${ad.id}`,
      type: 'private',
      title: ad.title,
      subtitle: ad.subtitle,
      badge: ad.badge || 'Featured App',
      ctaText: ad.ctaText || 'Get App',
      targetUrl: ad.targetUrl,
      iconType: ad.iconType,
      privateAdId: ad.id,
      bgGradient: 'from-[#130f2d]/95 via-[#1e133e]/95 to-[#100c28]/95',
      accentBorder: 'border-purple-500/40',
    }));

    if (privateAdsMode === 'always') {
      return privateItems;
    }

    if (privateAdsMode === 'network_only') {
      return networkCreatives;
    }

    // Mixed mode: interleave [Private, Network, Private, Network...]
    const combined: UnifiedBannerItem[] = [];
    const maxLen = Math.max(privateItems.length, networkCreatives.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < privateItems.length) combined.push(privateItems[i]);
      if (i < networkCreatives.length) combined.push(networkCreatives[i]);
    }
    return combined;
  }, [activePrivateAds, networkCreatives, privateAdsMode]);

  // Safe current item
  const currentItem = items[currentIndex % Math.max(items.length, 1)];

  // Automatic 5-7 seconds rotation cycle
  useEffect(() => {
    if (!isVisible || vipLevel > 0 || !bannerConfig.enabled) return;
    if (!isAutoRotate || isPaused || items.length <= 1) return;

    const intervalMs = rotationInterval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isVisible, vipLevel, bannerConfig.enabled, isAutoRotate, isPaused, items.length, rotationInterval]);

  // Record impression when creative changes
  const currentItemId = currentItem?.id;
  useEffect(() => {
    if (!isVisible || vipLevel > 0 || !bannerConfig.enabled || !currentItemId || !currentItem) return;
    if (recordedItemRef.current === currentItemId) return;
    recordedItemRef.current = currentItemId;

    if (currentItem.type === 'private' && currentItem.privateAdId) {
      useAdStore.getState().recordPrivateAdImpression(currentItem.privateAdId);
    } else {
      useAdStore.getState().recordImpression('banner');
    }
  }, [currentItemId, isVisible, vipLevel, bannerConfig.enabled, currentItem]);

  if (vipLevel > 0 || !isVisible || !bannerConfig.enabled || !currentItem) return null;

  const handleAction = () => {
    if (currentItem.type === 'private' && currentItem.privateAdId) {
      recordPrivateAdClick(currentItem.privateAdId);
    }
    if (currentItem.targetUrl) {
      window.open(currentItem.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'game':
        return <Gamepad2 className="w-5 h-5 text-emerald-300" />;
      case 'rocket':
        return <Rocket className="w-5 h-5 text-amber-300" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-amber-200" />;
      case 'gift':
        return <Gift className="w-5 h-5 text-rose-300" />;
      case 'star':
        return <Star className="w-5 h-5 text-amber-300 fill-amber-300" />;
      case 'sparkles':
        return <Zap className="w-5 h-5 text-cyan-300" />;
      default:
        return <Smartphone className="w-5 h-5 text-cyan-300" />;
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className={`w-full bg-gradient-to-r ${currentItem.bgGradient} border-t ${currentItem.accentBorder} px-3 py-2 flex items-center justify-between relative z-40 backdrop-blur-md shadow-[0_-4px_25px_rgba(0,0,0,0.6)] select-none overflow-hidden`}
    >
      {/* 5-7s Animated Linear Progress Countdown Bar */}
      {isAutoRotate && !isPaused && items.length > 1 && (
        <motion.div
          key={`bar-${currentIndex}-${rotationInterval}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: rotationInterval, ease: 'linear' }}
          className="h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 absolute bottom-0 left-0 z-50 pointer-events-none"
        />
      )}

      {/* Top Metadata Header Line */}
      <div className="text-[8px] font-black uppercase tracking-widest absolute top-1 left-3 flex items-center gap-1.5 z-10">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-cyan-300/90 font-bold">
            {currentItem.badge}
          </span>
        </span>
        <span className="text-white/20">•</span>
        <span className="text-slate-400">
          {currentItem.type === 'private' ? 'Direct Studio Promotion' : `Sponsored • ${currentItem.network}`}
        </span>
        <span className="text-white/20">•</span>
        <span className="text-cyan-400/75 font-mono">
          {isAutoRotate ? `${rotationInterval}s Auto` : 'Manual'}
        </span>
      </div>

      {/* Animated Creative Block */}
      <div className="flex-1 min-w-0 pr-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center gap-2.5 py-1 mt-2.5"
          >
            {/* Clickable Icon */}
            <div 
              onClick={handleAction}
              className="cursor-pointer w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.35)] border border-white/20 active:scale-95 transition hover:scale-105"
            >
              {renderIcon(currentItem.iconType)}
            </div>

            {/* Title & Subtitle */}
            <div 
              onClick={handleAction}
              className="flex-1 min-w-0 cursor-pointer"
            >
              <div className="text-xs font-black text-white truncate leading-tight flex items-center gap-1.5">
                <span>{currentItem.title}</span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono font-bold">
                  FREE
                </span>
              </div>
              <div className="text-[10px] text-slate-300 truncate leading-tight font-medium mt-0.5">
                {currentItem.subtitle}
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleAction}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-lg shadow-md hover:shadow-emerald-500/40 transition active:scale-95 shrink-0 uppercase tracking-wider flex items-center gap-1 ml-1"
            >
              <span>{currentItem.ctaText}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rotation Controls & Close Button */}
      <div className="flex items-center gap-1 shrink-0 ml-1 mt-2.5">
        {items.length > 1 && (
          <div className="flex items-center gap-0.5 bg-black/40 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={handlePrev}
              className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition"
              title="Previous Creative"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            <button
              onClick={() => setIsPaused(p => !p)}
              className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition"
              title={isPaused ? "Resume 5-7s Auto Rotation" : "Pause Auto Rotation"}
            >
              {isPaused ? <Play className="w-2.5 h-2.5 text-emerald-400" /> : <Pause className="w-2.5 h-2.5" />}
            </button>

            <button
              onClick={handleNext}
              className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition"
              title="Next Creative"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        <button 
          onClick={() => {
            if (items.length > 1) {
              // Cycle to next ad
              setCurrentIndex(prev => (prev + 1) % items.length);
            } else {
              setIsVisible(false);
            }
          }} 
          className="text-white/40 hover:text-white p-1 rounded-md hover:bg-white/10 transition shrink-0"
          title={items.length > 1 ? "Next Banner Ad" : "Dismiss Banner"}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
