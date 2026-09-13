import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Star, Shield, Lock, Coins, Gem, X, Gift, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useEconomyStore } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { audio } from '../lib/audio';

export function VipModal({ onClose }: { onClose: () => void }) {
  const store = useEconomyStore();
  const [selectedLevel, setSelectedLevel] = useState(store.vipLevel > 0 ? store.vipLevel : 1);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);

  const vipCosts = { 1: 50, 2: 150, 3: 300, 4: 500, 5: 1000 };
  const currentCost = vipCosts[selectedLevel as keyof typeof vipCosts] || 0;
  
  const thresholds = [0, 100, 300, 600, 1000, 1500];
  const maxVipXp = thresholds[5];
  const progressPercent = Math.min(100, (store.vipXp / maxVipXp) * 100);

  const handlePurchase = () => {
     if (store.gems < currentCost) {
         setPurchaseStatus("Not enough Gems!");
         setTimeout(() => setPurchaseStatus(null), 2000);
         audio.error();
         return;
     }
     
     const success = store.buyVip(selectedLevel);
     if (success) {
         audio.levelUp();
         if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 50, 100]);
         setPurchaseStatus("VIP Unlocked!");
         setTimeout(() => setPurchaseStatus(null), 2000);
     }
  };

  const claimDaily = () => {
      const res = store.claimVipDaily();
      if (res.success) {
          audio.levelUp();
          if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
          useAdStore.getState().showInterstitial('AdMob');
      }
  };

  const getPerksForLevel = (lvl: number) => {
     return [
       { id: '1', text: `${lvl * 10}% Coin & XP Multiplier` },
       { id: '2', text: `Max Energy increased to 100` },
       { id: '3', text: `Exclusive VIP Profile Border` },
       { id: '4', text: `Daily Bonus: ${lvl * 200} Coins, ${lvl * 5} Gems` },
       ...(lvl >= 3 ? [{ id: '5', text: `${lvl === 5 ? 2 : 1} Extra Daily Lucky Spin` }] : [])
     ];
  };

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col pointer-events-auto">
       <div className="absolute inset-0 bg-[#04040e]/85 backdrop-blur-xl" onClick={onClose} />
       
       <motion.div 
         initial={{ y: '100%' }}
         animate={{ y: 0 }}
         exit={{ y: '100%' }}
         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
         className="absolute bottom-0 left-0 w-full h-[90vh] bg-gradient-to-t from-[#04040e] via-[#140b08] to-[#241306] rounded-t-[36px] shadow-[0_-20px_60px_rgba(245,158,11,0.3)] border-t-2 border-amber-400/50 flex flex-col overflow-hidden"
       >
         {/* Handle Bar */}
         <div className="flex justify-center p-3 min-h-[30px] flex-shrink-0">
           <div className="w-14 h-1.5 bg-amber-400/40 rounded-full" />
         </div>

         {/* Header */}
         <div className="flex items-center justify-between px-6 mb-4 flex-shrink-0">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 uppercase tracking-wider flex items-center gap-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]">
               <Crown className="w-7 h-7 text-amber-400 fill-amber-400" />
               Imperial VIP Club
            </h2>
            <button onClick={onClose} className="p-2 bg-[#1b0e04] rounded-full border border-amber-500/20 hover:border-rose-400/50 hover:bg-rose-500/20 transition text-slate-300">
               <X className="w-5 h-5" />
            </button>
         </div>

         <div className="flex-1 overflow-y-auto px-6 pb-28 hide-scrollbar">
            {/* VIP Status Badge & Progress */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1f1003]/90 to-[#0c0602]/90 border-2 border-amber-400/40 rounded-3xl p-5 mb-5 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
               <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                 <Crown className="w-32 h-32 text-amber-400" />
               </div>
               
               <div className="relative z-10 flex flex-col items-center mb-4">
                 <span className="text-[10px] font-black text-amber-400/80 uppercase tracking-widest mb-1">Your Rank</span>
                 <div className="flex items-end gap-2">
                   <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                     {store.vipLevel > 0 ? `ROYAL VIP ${store.vipLevel}` : 'CITIZEN'}
                   </h3>
                 </div>
               </div>

               <div className="relative z-10 mb-2">
                 <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-wider mb-1.5">
                   <span>VIP Experience</span>
                   <span className="text-amber-300">{store.vipXp} / {maxVipXp} XP</span>
                 </div>
                 <div className="h-2.5 w-full bg-black/70 rounded-full overflow-hidden border border-white/10 shadow-inner p-[1px]">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progressPercent}%` }}
                     className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 rounded-full relative shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                   />
                 </div>
               </div>
               
               {store.vipLevel > 0 && (
                 <div className="mt-4 flex flex-col items-center">
                    <button 
                      onClick={claimDaily}
                      disabled={!store.canClaimVipDaily()}
                      className={`w-full py-3 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${store.canClaimVipDaily() ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse' : 'bg-[#150a04] border border-amber-500/20 text-slate-500'}`}
                    >
                      <Gift className="w-4 h-4" />
                      {store.canClaimVipDaily() ? 'Claim Daily VIP Treasure!' : 'Daily Bonus Claimed'}
                    </button>
                    {!store.canClaimVipDaily() && <span className="text-[9px] uppercase text-amber-500/60 mt-1.5 font-bold tracking-widest">Resets at midnight</span>}
                 </div>
               )}
            </div>

            {/* Level Selector */}
            <div className="flex justify-between gap-2 mb-5 overflow-x-auto hide-scrollbar pb-1">
               {[1, 2, 3, 4, 5].map(lvl => {
                  const isCurrent = store.vipLevel >= lvl;
                  const isSelected = selectedLevel === lvl;
                  return (
                    <button 
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`flex flex-col items-center justify-center min-w-[58px] py-2.5 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-gradient-to-b from-amber-500/30 to-orange-500/30 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] text-white' : 'bg-[#0e0703]/80 border-white/10 text-slate-400 hover:border-amber-500/30'} ${isCurrent ? 'opacity-100' : 'opacity-70'}`}
                    >
                      <Crown className={`w-5 h-5 mb-1 ${isSelected ? 'text-amber-300 fill-amber-300' : 'text-slate-400'}`} />
                      <span className={`text-xs font-black uppercase ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>V{lvl}</span>
                      {isCurrent && <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,1)]" />}
                    </button>
                  );
               })}
            </div>

            {/* Perks Display */}
            <div className="bg-[#0e0703]/90 border border-amber-400/20 rounded-3xl p-5 mb-4">
               <h3 className="text-sm font-black text-amber-300 flex items-center gap-2 mb-3 uppercase tracking-wider">
                 VIP Tier {selectedLevel} Privileges
               </h3>
               <div className="space-y-2.5">
                 {getPerksForLevel(selectedLevel).map(perk => (
                   <div key={perk.id} className="flex items-center gap-3 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/20">
                     <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                       <CheckCircle2 className="w-4 h-4 text-amber-300" />
                     </div>
                     <span className="text-xs font-bold text-slate-200">{perk.text}</span>
                   </div>
                 ))}
               </div>
            </div>
         </div>

         {/* Purchase Footer */}
         {store.vipLevel < selectedLevel && (
            <div className="absolute bottom-0 left-0 w-full bg-[#070301]/95 border-t-2 border-amber-500/30 p-4 pb-6 z-20 backdrop-blur-xl">
               <div className="flex items-center justify-between gap-4">
                 <div className="flex flex-col shrink-0">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Upgrade Cost</span>
                   <div className="flex items-center gap-1">
                     <Gem className="w-4 h-4 text-emerald-400" />
                     <span className="text-xl font-black text-emerald-300">{currentCost}</span>
                   </div>
                 </div>
                 
                 <button 
                   onClick={handlePurchase}
                   className="flex-1 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 rounded-2xl font-black uppercase text-sm tracking-wider text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 transform active:scale-95 transition-all relative overflow-hidden cursor-pointer"
                 >
                   Unlock VIP {selectedLevel}
                 </button>
               </div>
               {purchaseStatus && (
                 <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#04040e] text-amber-300 px-4 py-1 rounded-full text-xs font-black tracking-wider whitespace-nowrap border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-bounce">
                   {purchaseStatus}
                 </div>
               )}
            </div>
         )}
       </motion.div>
    </div>
  );
}
