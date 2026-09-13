import React from 'react';
import { motion } from 'motion/react';
import { Crown, ChevronRight, Gift } from 'lucide-react';
import { useEconomyStore } from '../store/economyStore';

export function VipWidget({ onOpen }: { onOpen: () => void }) {
  const store = useEconomyStore();
  const vipLevel = store.vipLevel;
  const isVip = vipLevel > 0;
  
  const canClaim = store.canClaimVipDaily();

  return (
    <motion.button 
      onClick={onOpen}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full relative overflow-hidden rounded-[24px] mb-3.5 text-left p-0 border-2 shadow-[0_0_25px_rgba(245,158,11,0.25)] group cursor-pointer transition-all ${isVip ? 'bg-gradient-to-br from-[#2a1705]/90 via-[#3d2008]/85 to-[#1c0f05]/95 border-amber-400/50 hover:border-amber-400' : 'bg-gradient-to-br from-[#12132e]/90 via-[#181136]/90 to-[#0c0d24]/95 border-amber-500/30 hover:border-amber-400/60'}`}
    >
      {isVip && (
         <motion.div 
           animate={{ rotate: 360 }} 
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(251,191,36,0.3)_360deg)] -z-10 pointer-events-none" 
         />
      )}

      <div className="p-4 flex items-center justify-between z-10 relative">
         <div className="flex items-center gap-3.5">
            <div className={`relative w-13 h-13 rounded-2xl flex items-center justify-center border-2 shadow-inner ${isVip ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] border-white/60 animate-pulse' : 'bg-amber-950/40 border-amber-500/30'}`}>
               <Crown className={`w-6 h-6 ${isVip ? 'text-amber-950 fill-amber-950' : 'text-amber-400'}`} />
               {isVip && canClaim && (
                 <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full border-2 border-[#2a1705] flex items-center justify-center animate-bounce">
                    <Gift className="w-3 h-3 text-white" />
                 </div>
               )}
            </div>
            
            <div className="flex flex-col">
               <h3 className={`font-black text-base uppercase tracking-wider flex items-center gap-2 ${isVip ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-amber-300'}`}>
                 {isVip ? `VIP LEVEL ${vipLevel} CLUB` : 'COSMIC VIP PASS'}
               </h3>
               <p className="text-xs font-bold text-slate-300">
                 {isVip ? (
                   canClaim ? <span className="text-emerald-400 font-black">Daily VIP Bonus Ready!</span> : <span className="text-amber-300/90 font-medium">All VIP Multipliers Active</span>
                 ) : (
                   <span className="text-slate-400 font-medium">Unlock 2x Multipliers & Exclusive Badges</span>
                 )}
               </p>
            </div>
         </div>
         
         <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition">
            <ChevronRight className="w-5 h-5 text-amber-300 group-hover:text-amber-950 group-hover:translate-x-0.5 transition-transform" />
         </div>
      </div>
    </motion.button>
  );
}
