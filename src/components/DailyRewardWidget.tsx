import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, Gift, Coins, Check, Gem, Zap, Star, Award } from 'lucide-react';
import { useEconomyStore } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { audio } from '../lib/audio';

export function DailyRewardWidget() {
  const store = useEconomyStore();
  const canClaim = store.canClaimDailyReward();
  const [showPopup, setShowPopup] = useState(false);
  const [popupReward, setPopupReward] = useState<any>(null);

  // Time remaining trick
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (canClaim) return;

    const interval = setInterval(() => {
        if (!store.dailyRewardClaimedAt) return;
        const now = Date.now();
        // Since cooldown resets at midnight in our implementation (checked by date string)
        // We calculate time until next midnight
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        const diff = tomorrow.getTime() - now;
        
        if (diff <= 0) {
            setTimeRemaining('Ready!');
        } else {
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeRemaining(`${h}h ${m}m ${s}s`);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [canClaim, store.dailyRewardClaimedAt]);
  
  // Make sure streak is updated if a new day has passed since login but they haven't claimed
  useEffect(() => {
     store.updateLoginStreak();
  }, []);

  const handleClaim = async () => {
    if (!canClaim) return;
    
    // Play claim sound
    audio.levelUp();
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 50, 100]);

    const result = await store.claimDailyReward();
    if (result.success) {
      setPopupReward(result.reward);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        // Trigger AdMob after popup closes
        useAdStore.getState().showInterstitial('AdMob');
      }, 3000); // auto close
    }
  };

  const getDayIcon = (type: string) => {
    if (type === 'coins') return <Coins className="w-5 h-5 text-amber-400" />;
    if (type === 'gems') return <Gem className="w-5 h-5 text-emerald-400" />;
    if (type === 'energy') return <Zap className="w-5 h-5 text-sky-400" />;
    if (type === 'xp') return <Award className="w-5 h-5 text-fuchsia-400" />;
    return <Gift className="w-5 h-5 text-pink-400" />;
  };

  // 7 days overview
  const currentHoverDay = ((store.streak - 1) % 7) + 1;

  return (
    <div className="w-full relative mt-4 mb-4">
      <div className="bg-[#0c0d28]/85 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/30 overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.2)] p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400">Daily Rewards</h2>
              <p className="text-[10px] text-slate-400 font-bold">Claim free rewards every 24h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-500/15 border border-amber-500/40 px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.25)] flex items-center gap-1">
               {store.streak} Days 🔥
            </span>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 hide-scrollbar snap-x">
          {store.adminRewardsConfig.map((config, index) => {
             const isPassed = index + 1 < currentHoverDay || (!canClaim && index + 1 === currentHoverDay);
             const isToday = index + 1 === currentHoverDay;
             
             return (
               <div 
                 key={config.day} 
                 className={`flex-shrink-0 snap-center w-[64px] h-[78px] rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-300 ${isToday ? 'bg-gradient-to-b from-cyan-500/25 via-fuchsia-500/20 to-[#0c0d28] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : isPassed ? 'bg-black/50 border-white/5 opacity-55' : 'bg-[#101238]/70 border-cyan-500/20 hover:border-cyan-400/40'}`}
               >
                 <div className="absolute top-1.5 left-0 w-full text-center text-[9px] font-black tracking-wider text-slate-300">DAY {config.day}</div>
                 <div className="mt-2 text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{getDayIcon(config.type)}</div>
                 <div className="text-[10px] font-black text-white/80 mt-0.5">+{config.amount}</div>
                 {isPassed && <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl"><Check className="w-6 h-6 text-emerald-400 drop-shadow" /></div>}
                 {isToday && canClaim && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-fuchsia-500 rounded-full animate-ping"></div>}
               </div>
             )
          })}
        </div>

        {/* Monthly Streak Tracking */}
        <div className="mb-3.5 bg-[#07081c]/90 rounded-2xl p-3 border border-fuchsia-500/20 shadow-inner">
           <div className="flex justify-between items-center mb-1.5">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
               <Gift className="w-3 h-3 text-fuchsia-400" />
               Monthly Cosmic Chest
             </span>
             <span className="text-xs font-black text-fuchsia-400">{store.streak % 30} / 30 Days</span>
           </div>
           <div className="h-2 w-full bg-black/80 rounded-full overflow-hidden border border-white/5 p-0.5">
             <div 
               className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 rounded-full shadow-[0_0_12px_rgba(217,70,239,0.7)] transition-all duration-500"
               style={{ width: `${Math.max(4, ((store.streak % 30) / 30) * 100)}%` }}
             ></div>
           </div>
           <div className="text-center mt-1.5 text-[10px] font-bold text-slate-400">Reach 30 days for 5,000 Gold Coins & 50 Cosmic Gems!</div>
        </div>

        <button 
           onClick={handleClaim}
           disabled={!canClaim}
           className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all relative overflow-hidden group active:scale-95 ${canClaim ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-300/50' : 'bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed'}`}
        >
           {canClaim ? (
             <span className="flex items-center justify-center gap-2 text-white drop-shadow">CLAIM DAILY REWARD <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-spin" /></span>
           ) : (
             <span className="flex items-center justify-center gap-2 text-slate-400">NEXT REWARD IN: {timeRemaining}</span>
           )}
           {canClaim && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
        </button>
      </div>

      <AnimatePresence>
         {showPopup && popupReward && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: -20 }}
             className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none p-4"
           >
             <div className="bg-gradient-to-b from-[#15163e] to-[#08091e] border-2 border-cyan-400 rounded-[32px] p-8 flex flex-col items-center gap-4 shadow-[0_0_60px_rgba(6,182,212,0.5)]">
                <div className="text-6xl animate-bounce drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">{getDayIcon(popupReward.type)}</div>
                <h3 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-500">Reward Claimed!</h3>
                <div className="bg-[#090b24] px-6 py-2 rounded-full border border-cyan-500/40 font-black text-lg text-white shadow-inner">
                  +{popupReward.amount} {popupReward.type.toUpperCase()}
                </div>
                <div className="text-sm font-bold text-amber-400 flex items-center gap-1.5">Streak: {store.streak} Days 🔥</div>
             </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
