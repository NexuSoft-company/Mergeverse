import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ShieldCheck, Star, Zap, Clock, ExternalLink } from 'lucide-react';
import { useAdStore } from '../store/adStore';

export function AdOverlay() {
  const { adOverlayVisible, adType, adNetwork, rewardType, rewardAmount, completeAd, closeAd } = useAdStore();
  const [timeLeft, setTimeLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (adOverlayVisible && adType !== 'offerwall') {
      const isRewarded = adType === 'rewarded';
      const duration = isRewarded ? 15 : 5; // 15s for rewarded, 5s for interstitial
      setTimeLeft(duration);
      setCanSkip(false);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [adOverlayVisible, adType]);

  if (!adOverlayVisible) return null;

  const getNetworkLogo = () => {
    switch (adNetwork.toLowerCase()) {
      case 'admob': return 'Google AdMob';
      case 'unity': return 'Unity Ads';
      case 'applovin': return 'AppLovin MAX';
      default: return 'Ad Network';
    }
  };

  if (adType === 'offerwall') {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#05050f]/95 backdrop-blur-md flex flex-col font-sans">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-black text-white">{getNetworkLogo()} Offerwall</span>
          </div>
          <button onClick={closeAd} className="p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center mb-6 mt-4">
            <h2 className="text-2xl font-black text-white mb-2">Complete Offers for Huge Rewards</h2>
            <p className="text-slate-400 text-sm">Download apps, play games, and complete surveys to earn premium currency.</p>
          </div>
          
          {[
            { id: 1, title: 'Raid: Shadow Legends', desc: 'Reach Level 25 in 7 days', reward: '1500 Gems', icon: Star, color: 'fuchsia' },
            { id: 2, title: 'Lords Mobile', desc: 'Unlock Tier 2 Troops', reward: '800 Gems', icon: ShieldCheck, color: 'blue' },
            { id: 3, title: 'Playable Survey', desc: 'Complete your profile (3 mins)', reward: '250 Gems', icon: ExternalLink, color: 'emerald' },
            { id: 4, title: 'TikTok', desc: 'Install and open the app', reward: '100 Gems', icon: Play, color: 'rose' }
          ].map((offer) => (
            <div key={offer.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center">
               <div className={`w-16 h-16 rounded-[16px] bg-${offer.color}-500/20 flex items-center justify-center shrink-0`}>
                 <offer.icon className={`w-8 h-8 text-${offer.color}-400`} />
               </div>
               <div className="flex-1">
                 <h3 className="font-black text-white text-lg">{offer.title}</h3>
                 <p className="text-slate-400 text-xs">{offer.desc}</p>
               </div>
               <button onClick={closeAd} className="bg-emerald-500 text-emerald-950 font-black px-4 py-2 rounded-xl text-sm whitespace-nowrap whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                 {offer.reward}
               </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-sans">
      <div className="absolute top-4 left-4 text-[10px] text-white/50 font-black uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-black/50 backdrop-blur-md z-10 flex gap-2 items-center">
        <span>Ad</span>
        <span className="opacity-50">•</span>
        <span>{getNetworkLogo()}</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {adType === 'rewarded' && (
           <div className="bg-black/50 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-black text-white">
             Reward in {timeLeft}s
           </div>
        )}
        
        {canSkip ? (
          <button 
            onClick={adType === 'rewarded' ? completeAd : closeAd}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <div className="h-8 px-3 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 text-xs font-black border border-white/5">
            Skip in {timeLeft}s
          </div>
        )}
      </div>

      {/* Simulated Ad Content */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
         <div className="w-full max-w-sm px-6 relative z-10 text-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-32 h-32 bg-rose-500 rounded-[32px] mx-auto mb-8 shadow-[0_20px_50px_rgba(244,63,94,0.5)] flex items-center justify-center border-4 border-white/20"
            >
              <Zap className="w-16 h-16 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">EPIC HERO<br/>BATTLES</h1>
            <p className="text-indigo-200 font-bold mb-8 text-lg">Play the #1 RPG of 2026. Download now and get 50 free summons!</p>
            
            <button className="bg-gradient-to-r from-rose-400 to-rose-600 text-white font-black text-xl py-4 px-12 rounded-full shadow-[0_10px_30px_rgba(244,63,94,0.6)] border-b-4 border-rose-700 active:translate-y-[4px] active:border-b-0 transition-all uppercase tracking-wider">
               Play Now
            </button>
         </div>
      </div>
      
      {/* ProgressBar for video */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
         <motion.div 
           initial={{ width: '0%' }}
           animate={{ width: '100%' }}
           transition={{ duration: adType === 'rewarded' ? 15 : 5, ease: 'linear' }}
           className="h-full bg-rose-500"
         />
      </div>
    </div>
  );
}
