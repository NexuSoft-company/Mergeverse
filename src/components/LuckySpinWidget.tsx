import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Star, ChevronRight, Coins } from 'lucide-react';
import { useEconomyStore } from '../store/economyStore';

export function LuckySpinWidget({ onOpen }: { onOpen: () => void }) {
  const store = useEconomyStore();
  const canFree = store.canSpinFree();
  const [timeText, setTimeText] = useState('READY NOW');

  useEffect(() => {
    if (canFree) {
       setTimeText('READY NOW');
       return;
    }
    const interval = setInterval(() => {
        if (!store.luckySpinUsedAt) return;
        const now = Date.now();
        const diff = (store.luckySpinUsedAt + 86400000) - now;
        
        if (diff <= 0) {
            setTimeText('READY NOW');
        } else {
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeText(`${h}H ${m}M`);
        }
    }, 60000); // update every minute
    
    // run initial
    if (store.luckySpinUsedAt) {
       const diff = (store.luckySpinUsedAt + 86400000) - Date.now();
       if (diff > 0) {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeText(`${h}H ${m}M`);
       }
    }
    return () => clearInterval(interval);
  }, [canFree, store.luckySpinUsedAt]);

  const spinsLeft = store.luckySpinsAvailable;

  return (
    <motion.button 
      onClick={onOpen}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full relative overflow-hidden rounded-[24px] mb-3.5 text-left p-0 border-2 border-fuchsia-500/30 hover:border-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.2)] group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#12082b]/95 via-[#1b0933]/90 to-[#0c0926]/95 backdrop-blur-md -z-10" />
      
      {/* Animated Glow */}
      {(canFree || spinsLeft > 0) && (
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(217,70,239,0.4)_360deg)] -z-10 pointer-events-none" 
        />
      )}

      <div className="p-4 flex items-center justify-between">
         <div className="flex items-center gap-3.5">
            <div className={`relative w-13 h-13 rounded-2xl flex items-center justify-center border-2 border-fuchsia-400/40 shadow-inner ${canFree ? 'bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 shadow-[0_0_20px_rgba(217,70,239,0.6)] animate-pulse border-white/60' : 'bg-fuchsia-950/40'}`}>
               <Gift className={`w-6 h-6 ${canFree ? 'text-white' : 'text-fuchsia-300'}`} />
               {(canFree || spinsLeft > 0) && (
                 <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full border-2 border-[#12082b] flex items-center justify-center shadow">
                    <span className="text-[10px] font-black text-white">{spinsLeft > 0 && !canFree ? spinsLeft : '!'}</span>
                 </div>
               )}
            </div>
            
            <div className="flex flex-col">
               <h3 className="font-black text-base text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-fuchsia-300 to-cyan-300 uppercase tracking-wider flex items-center gap-2">
                 Lucky Cosmic Wheel
                 {(canFree || spinsLeft > 0) && <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-spin" />}
               </h3>
               <p className="text-xs font-bold text-slate-300">
                 {canFree ? (
                   <span className="text-emerald-400 flex items-center gap-1 font-black">
                     FREE SPIN READY!
                   </span>
                 ) : spinsLeft > 0 ? (
                   <span className="text-cyan-400 font-bold">Extra Spins: {spinsLeft}</span>
                 ) : (
                   <span className="text-slate-400 uppercase tracking-wider text-[11px]">Next free: <strong className="text-amber-300">{timeText}</strong></span>
                 )}
               </p>
               {!canFree && spinsLeft <= 0 && (
                 <span className="text-[10px] text-amber-400 mt-0.5 font-black uppercase flex items-center gap-1">
                   Or use 200 <Coins className="w-3 h-3" />
                 </span>
               )}
            </div>
         </div>
         
         <div className="w-9 h-9 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30 flex items-center justify-center group-hover:bg-fuchsia-500 group-hover:text-white transition">
            <ChevronRight className="w-5 h-5 text-fuchsia-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
         </div>
      </div>
    </motion.button>
  );
}
