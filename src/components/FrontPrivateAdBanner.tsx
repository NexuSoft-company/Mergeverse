import React, { useMemo, useRef, useEffect, useState } from 'react';
import { ExternalLink, Rocket, Gamepad2, Gift, Star, Crown, Layers } from 'lucide-react';
import { useAdStore } from '../store/adStore';
import { motion, AnimatePresence } from 'motion/react';
import { ProgressiveImage } from './ProgressiveImage';

export function FrontPrivateAdBanner() {
  const privateAds = useAdStore(state => state.privateAds);
  const recordPrivateAdClick = useAdStore(state => state.recordPrivateAdClick);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Find all active ads, sorted by priority
  const activeAds = useMemo(() => {
    const active = privateAds.filter(ad => ad.active);
    return [...active].sort((a, b) => b.priority - a.priority);
  }, [privateAds]);

  // Auto-slide every 5 seconds if multiple ads exist
  useEffect(() => {
    if (activeAds.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeAds.length]);

  // Handle case where activeAds shrinks and currentIndex is out of bounds
  useEffect(() => {
    if (activeAds.length > 0 && currentIndex >= activeAds.length) {
      setCurrentIndex(0);
    }
  }, [activeAds.length, currentIndex]);

  const activeAd = activeAds[currentIndex >= activeAds.length ? 0 : currentIndex];

  const recordedAdIdRef = useRef<string | null>(null);

  // Record impression only once per active ad creative ID
  const activeAdId = activeAd?.id;
  useEffect(() => {
    if (activeAdId && recordedAdIdRef.current !== activeAdId) {
      recordedAdIdRef.current = activeAdId;
      useAdStore.getState().recordPrivateAdImpression(activeAdId);
    }
  }, [activeAdId]);

  if (!activeAd) {
    return null; // Collapse the space completely if no ad is active
  }

  const handleAdClick = () => {
    recordPrivateAdClick(activeAd.id);
    if (!activeAd.targetUrl) return;
    try {
      const link = document.createElement('a');
      link.href = activeAd.targetUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(activeAd.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const IconComponent = () => {
    switch (activeAd.iconType) {
      case 'game': return <Gamepad2 className="w-5 h-5 text-fuchsia-400" />;
      case 'app': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'gift': return <Gift className="w-5 h-5 text-emerald-400" />;
      case 'star': return <Star className="w-5 h-5 text-amber-400" />;
      case 'crown': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'rocket':
      default:
        return <Rocket className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="w-full shrink-0 z-20 mb-4 px-1 relative overflow-hidden rounded-[1.5rem]">
      <AnimatePresence mode="wait">
        <motion.button 
          key={activeAd.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={handleAdClick}
          className="w-full relative overflow-hidden bg-gradient-to-br from-[#0c0f2a] to-[#060818] border border-fuchsia-500/40 rounded-[1.5rem] p-4 flex flex-col items-start text-left shadow-[0_0_20px_rgba(217,70,239,0.15)] group transition-all hover:border-fuchsia-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.25)] active:scale-[0.98]"
        >
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.05)_50%,transparent_80%)] w-[200%] animate-shine-slow -left-full pointer-events-none" />

          {/* Background Overlay if Banner Image exists */}
          {activeAd.bannerImageUrl && (
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none transition-opacity group-hover:opacity-30" 
              style={{ backgroundImage: `url(${activeAd.bannerImageUrl})` }} 
            />
          )}

          {/* Badge & Category */}
          <div className="flex items-center justify-between w-full mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                {activeAd.iconUrl ? (
                  <ProgressiveImage src={activeAd.iconUrl} alt="icon" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <IconComponent />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest">{activeAd.badge || 'PROMOTION'}</span>
                <span className="text-[9px] text-slate-400 font-mono tracking-wide">{activeAd.subtitle}</span>
              </div>
            </div>
            <div className="px-2 py-0.5 bg-fuchsia-500/20 text-fuchsia-300 text-[8px] font-black uppercase tracking-wider rounded-md border border-fuchsia-500/30 flex items-center gap-1">
              Ad
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full mb-4">
            <h4 className="text-lg font-black text-white leading-tight mb-1">{activeAd.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2">
              {activeAd.description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="relative z-10 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 group-hover:bg-fuchsia-500/20 group-hover:border-fuchsia-500/40 transition-colors">
            <span className="text-xs font-black uppercase tracking-wider text-fuchsia-300 group-hover:text-fuchsia-200">
              {activeAd.ctaText || 'Learn More'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-fuchsia-400 group-hover:text-fuchsia-200 transition-colors" />
          </div>
        </motion.button>
      </AnimatePresence>

      {/* Pagination Dots (if multiple ads) */}
      {activeAds.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1.5 z-20 pointer-events-none">
          {activeAds.map((ad, idx) => (
            <div 
              key={`dot-${ad.id}`}
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]' : 'w-1 bg-white/20'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
