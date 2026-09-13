import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, ChevronRight, Clock, Star, Gift, CheckCircle2 } from 'lucide-react';
import { useEconomyStore } from '../store/economyStore';

export function LiveEventWidget({ onOpen }: { onOpen: () => void }) {
  const store = useEconomyStore();
  const [now, setNow] = useState(Date.now());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeEvent = store.activeEvents.find(e => e.isActive && now >= e.startTime && now <= e.endTime);
  const pendingClaims = store.activeEvents.filter(e => e.completed && !e.claimed);

  if (!activeEvent && pendingClaims.length === 0) return null;
  
  const displayEvent = pendingClaims.length > 0 ? pendingClaims[0] : activeEvent!;

  const timeLeft = Math.max(0, displayEvent.endTime - now);
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  const formatTime = (v: number) => v.toString().padStart(2, '0');

  return (
    <motion.button 
      onClick={onOpen}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full relative overflow-hidden rounded-[24px] mb-4 text-left p-0 shadow-[0_10px_30px_rgba(217,70,239,0.25)] group bg-gradient-to-br from-[#0a061e] via-[#120a2e] to-[#04040e] border border-fuchsia-500/40 hover:border-fuchsia-400 transition-all cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-transparent pointer-events-none" />
      
      {/* Animated Glow Border */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[150%] -left-[50%] w-[300%] h-[300%] opacity-25 pointer-events-none" 
        style={{ background: `conic-gradient(from 0deg, transparent 0 320deg, ${displayEvent.color || '#ec4899'} 360deg)` }}
      />

      <div className="p-4 flex items-center justify-between z-10 relative">
         <div className="flex items-center gap-3.5">
            <div className="relative w-13 h-13 rounded-2xl flex items-center justify-center border-2 shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0" style={{ backgroundColor: `${displayEvent.color}30`, borderColor: `${displayEvent.color}` }}>
               <span className="text-2xl drop-shadow-md">{displayEvent.icon}</span>
               {displayEvent.completed && !displayEvent.claimed && (
                 <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#090b24] flex items-center justify-center animate-ping"></div>
               )}
               {displayEvent.completed && !displayEvent.claimed && (
                 <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#090b24] flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                 </div>
               )}
            </div>
            
            <div className="flex flex-col">
               <h3 className="font-black text-base uppercase tracking-wider flex items-center gap-2 drop-shadow-md text-white">
                 {displayEvent.title}
                 {displayEvent.completed && !displayEvent.claimed && (
                   <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 rounded-full text-[9px] font-black tracking-wider uppercase ml-1 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                     Ready!
                   </span>
                 )}
               </h3>
               
               <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mt-0.5 text-cyan-300">
                 {timeLeft > 0 ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                      <span>{hours}h {formatTime(minutes)}m {formatTime(seconds)}s Left</span>
                   </>
                 ) : (
                    <span className="text-slate-400">Event Ended</span>
                 )}
               </div>
            </div>
         </div>
         
         <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-all border border-white/10 shrink-0">
             {displayEvent.completed && !displayEvent.claimed ? (
               <Gift className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
             ) : (
               <ChevronRight className="w-5 h-5 text-cyan-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
             )}
         </div>
      </div>
    </motion.button>
  );
}
