import React, { useEffect, useRef } from 'react';
import { useEconomyStore } from '../store/economyStore';
import { ADMOB_PRODUCTION_KEYS } from '../config/admobConfig';

interface AdMobBannerProps {
  adUnitId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export function AdMobBanner({ 
  adUnitId = ADMOB_PRODUCTION_KEYS.bannerAdUnitId,
  format = 'auto',
  className = ''
}: AdMobBannerProps) {
  const { vipLevel } = useEconomyStore();
  const adRef = useRef<HTMLModElement>(null);
  const isDev = process.env.NODE_ENV === 'development';
  const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
  const publisherId = ADMOB_PRODUCTION_KEYS.appId.split('~')[0] || 'ca-app-pub-1492562421327050';

  useEffect(() => {
    // If the user is VIP, don't attempt to load ads
    if (vipLevel > 0) return;

    // In a truly offline app, real Google Ads scripts will fail to load.
    // We try to push to adsbygoogle if the object exists (meaning internet was available at launch).
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
        adsbygoogle.push({});
      }
    } catch (e) {
      console.warn('[AdMob] Ad initialization failed or running fully offline', e);
    }
  }, [vipLevel, adUnitId]);

  if (vipLevel > 0) return null;

  return (
    <div className={`w-full flex items-center justify-center overflow-hidden bg-black/20 rounded-xl relative min-h-[50px] ${className}`}>
      {/* Offline/Dev Placeholder */}
      {(isDev || isOffline) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-2 text-center pointer-events-none">
          <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-2 py-0.5 rounded-full mb-1">
            AdMob Active Placement
          </span>
          <span className="text-[8px] text-slate-300 font-mono">
            Unit: {adUnitId}
          </span>
          <span className="text-[7px] text-slate-400 uppercase">
            {isOffline ? 'Offline Mode active • Auto-switches to live ads on WiFi' : 'Connected to AdMob Network'}
          </span>
        </div>
      )}

      {/* Actual AdMob tag */}
      <ins
        ref={adRef}
        className="adsbygoogle relative z-10 block"
        style={{ display: 'block', minWidth: '320px', width: '100%', height: format === 'rectangle' ? '250px' : '50px' }}
        data-ad-client={publisherId}
        data-ad-slot={adUnitId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
