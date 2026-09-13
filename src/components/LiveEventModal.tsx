import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Zap, Star, Coins, Gift, Trophy, CheckCircle2, ChevronRight, Gem } from 'lucide-react';
import { useEconomyStore, LiveEvent } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { audio } from '../lib/audio';

export function LiveEventModal({ onClose }: { onClose: () => void }) {
  const store = useEconomyStore();
  const [now, setNow] = useState(Date.now());
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeEvents = store.activeEvents.filter(e => e.isActive && now >= e.startTime && now <= e.endTime);
  const pendingClaims = store.activeEvents.filter(e => e.completed && !e.claimed);
  
  // Combine unique
  const displayEvents = Array.from(new Set([...activeEvents, ...pendingClaims]));

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const claimReward = (eventId: string) => {
     const res = store.claimEventReward(eventId);
     if (res.success) {
         audio.levelUp();
         if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 50, 100]);
         setClaimStatus("Reward Claimed!");
         setTimeout(() => {
           setClaimStatus(null);
           useAdStore.getState().showInterstitial('AdMob');
         }, 2000);
     }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col pointer-events-auto">
      <div className="absolute inset-0 bg-[#04040e]/85 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
         initial={{ y: '100%' }}
         animate={{ y: 0 }}
         exit={{ y: '100%' }}
         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
         className="absolute bottom-0 left-0 w-full h-[90vh] bg-gradient-to-t from-[#04040e] via-[#090b24] to-[#12143a] rounded-t-[36px] shadow-[0_-20px_60px_rgba(217,70,239,0.3)] border-t-2 border-fuchsia-500/40 flex flex-col overflow-hidden"
       >
         {/* Handle Bar */}
         <div className="flex justify-center p-3 min-h-[30px] flex-shrink-0">
           <div className="w-14 h-1.5 bg-fuchsia-400/40 rounded-full" />
         </div>

         {/* Header */}
         <div className="flex items-center justify-between px-6 mb-4 flex-shrink-0">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-400 uppercase tracking-wider flex items-center gap-2 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
               <Zap className="w-7 h-7 text-fuchsia-400" />
               Galactic Events
            </h2>
            <button onClick={onClose} className="p-2 bg-[#0d0f2f] rounded-full border border-white/10 hover:border-rose-400/50 hover:bg-rose-500/20 transition text-slate-300">
               <X className="w-5 h-5" />
            </button>
         </div>

         <div className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar space-y-3.5">
            {displayEvents.length === 0 && (
               <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                 <Clock className="w-16 h-16 text-cyan-400 mb-4 animate-pulse" />
                 <h3 className="text-xl font-black text-white uppercase">No Active Events</h3>
                 <p className="text-xs font-bold text-slate-400">Check back soon for cosmic challenges!</p>
               </div>
            )}

            {displayEvents.map((ev) => {
               const timeLeft = Math.max(0, ev.endTime - now);
               const progressPercent = Math.min(100, (ev.progress / Math.max(1, ev.target)) * 100);
               const isReady = ev.completed && !ev.claimed;
               
               return (
                 <div key={ev.id} className="relative overflow-hidden rounded-[24px] border border-fuchsia-500/30 p-4 bg-[#070921]/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)]" style={{ boxShadow: `inset 0 0 30px ${ev.color || '#ec4899'}15` }}>
                    <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                       <span className="text-7xl">{ev.icon}</span>
                    </div>

                    <div className="flex justify-between items-start mb-3 relative z-10">
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-inner shrink-0" style={{ backgroundColor: `${ev.color}30`, border: `1px solid ${ev.color}80` }}>
                            <span className="text-2xl">{ev.icon}</span>
                         </div>
                         <div>
                            <h3 className="text-base font-black uppercase text-white tracking-wide drop-shadow-md">{ev.title}</h3>
                            <div className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 mt-0.5 text-cyan-300">
                              <Clock className="w-3 h-3 text-fuchsia-400" />
                              {timeLeft > 0 ? `${formatTime(timeLeft)} left` : 'Finished'}
                            </div>
                         </div>
                       </div>
                    </div>

                    <p className="text-xs text-slate-300 font-medium mb-3 relative z-10 leading-relaxed">{ev.description}</p>

                    <div className="mb-3 relative z-10">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                         <span>Progress</span>
                         <span className="text-cyan-300">{ev.progress} / {ev.target}</span>
                       </div>
                       <div className="h-2.5 w-full bg-black/70 rounded-full overflow-hidden border border-white/10 shadow-inner p-[1px]">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${progressPercent}%` }}
                           className="h-full rounded-full relative shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                           style={{ backgroundColor: ev.color || '#ec4899' }}
                         />
                       </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 border-t border-white/10 pt-3 relative z-10">
                       <div className="flex flex-col">
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Reward</span>
                         <div className="flex items-center gap-1.5">
                           {ev.rewardType === 'coins' && <Coins className="w-4 h-4 text-amber-400" />}
                           {ev.rewardType === 'gems' && <Gem className="w-4 h-4 text-emerald-400" />}
                           {ev.rewardType === 'xp' && <Star className="w-4 h-4 text-fuchsia-400" />}
                           {ev.rewardType === 'spins' && <Zap className="w-4 h-4 text-cyan-400" />}
                           {ev.rewardType === 'vip' && <Trophy className="w-4 h-4 text-amber-500" />}
                           <span className="text-sm font-black text-amber-300">{ev.rewardAmount} {ev.rewardType.toUpperCase()}</span>
                         </div>
                       </div>

                       {ev.claimed ? (
                          <div className="px-3.5 py-1.5 bg-white/5 rounded-xl border border-white/10 text-slate-400 font-black uppercase text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Claimed
                          </div>
                       ) : isReady ? (
                          <button 
                            onClick={() => claimReward(ev.id)}
                            className="px-5 py-2.5 rounded-xl font-black uppercase tracking-wider text-xs text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition transform active:scale-95 animate-pulse flex items-center gap-1.5 cursor-pointer"
                          >
                            <Gift className="w-4 h-4" /> Claim!
                          </button>
                       ) : (
                          <div className="px-3.5 py-1.5 bg-cyan-500/10 rounded-xl border border-cyan-400/30 text-cyan-300 font-black uppercase text-[10px] tracking-wider">
                            In Progress
                          </div>
                       )}
                    </div>
                 </div>
               );
            })}
         </div>
         
         {/* Toast Notification */}
         <AnimatePresence>
            {claimStatus && (
               <motion.div 
                 initial={{ opacity: 0, y: -20, x: '-50%' }}
                 animate={{ opacity: 1, y: 0, x: '-50%' }}
                 exit={{ opacity: 0, y: -20, x: '-50%' }}
                 className="absolute top-10 left-1/2 z-[3000] bg-emerald-500 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(16,185,129,0.5)] border border-emerald-400"
               >
                 {claimStatus}
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
    </div>
  );
}
