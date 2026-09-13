import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, Gem, Zap, Gift, X, Star } from 'lucide-react';
import { useEconomyStore, SpinRewardConfig } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { audio } from '../lib/audio';

export function LuckySpinModal({ onClose }: { onClose: () => void }) {
  const store = useEconomyStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showReward, setShowReward] = useState<SpinRewardConfig | null>(null);
  const [mysteryPhase, setMysteryPhase] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const canFree = store.canSpinFree();
  const spinsLeft = store.luckySpinsAvailable;
  
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (canFree) {
       setTimeRemaining('Ready!');
       return;
    }
    const interval = setInterval(() => {
        if (!store.luckySpinUsedAt) return;
        const now = Date.now();
        const diff = (store.luckySpinUsedAt + 86400000) - now;
        
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
  }, [canFree, store.luckySpinUsedAt]);

  const handleSpin = async () => {
     if (isSpinning) return;
     
     let hasCost = false;
     if (!canFree) {
        if (spinsLeft > 0) {
           // use token
        } else if (store.coins >= 200) {
           const buyResult = store.buySpin();
           if (!buyResult) return;
           hasCost = true;
        } else {
           alert("Not enough coins to spin!");
           return;
        }
     }

     setIsSpinning(true);
     audio.drop(); // optional spin sound start
     
     const result = await store.spinWheel();
     if (!result.success || !result.reward) {
        setIsSpinning(false);
        return;
     }

     const rewards = store.adminSpinRewardsConfig;
     const rewardIndex = rewards.findIndex(r => r.id === result.reward!.id);
     const segmentAngle = 360 / rewards.length;
     const stopAngle = 360 - (rewardIndex * segmentAngle + (segmentAngle / 2));
     const newRotation = rotation + (360 * 5) + stopAngle - (rotation % 360);
     
     setRotation(newRotation);

     setTimeout(() => {
        setIsSpinning(false);
        if (result.reward!.type === 'mystery') {
           setMysteryPhase(true);
           setShowReward(result.reward);
        } else {
           setShowReward(result.reward);
           audio.levelUp();
           if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 100, 100]);
        }
     }, 4000);
  };

  const openMysteryBox = () => {
     setMysteryPhase(false);
     audio.levelUp();
     if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 100, 200]);
  };

  const rewards = store.adminSpinRewardsConfig;

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center pointer-events-auto p-4">
       <div className="absolute inset-0 bg-[#04040e]/85 backdrop-blur-xl" onClick={() => !isSpinning && onClose()} />
       
       <div className="relative z-10 w-full max-w-sm flex flex-col items-center p-6 bg-gradient-to-b from-[#140b2e]/95 via-[#0e0926]/95 to-[#050616]/95 border-2 border-fuchsia-500/40 rounded-[36px] shadow-[0_0_60px_rgba(217,70,239,0.35)]">
         <button 
           onClick={onClose} 
           disabled={isSpinning}
           className={`absolute top-4 right-4 p-2 bg-[#090b24] border border-white/10 hover:border-rose-400/50 hover:bg-rose-500/20 rounded-full text-slate-300 hover:text-white transition cursor-pointer ${isSpinning ? 'opacity-50' : 'opacity-100'}`}
         >
           <X className="w-5 h-5" />
         </button>

         <div className="mb-4 flex flex-col items-center">
            <h2 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-fuchsia-400 to-cyan-300 text-center filter drop-shadow-[0_0_20px_rgba(217,70,239,0.6)]">
              Lucky Cosmic Wheel
            </h2>
            <p className="text-xs font-black text-cyan-300 uppercase tracking-widest mt-0.5">Spin & Win Legendary Loot</p>
         </div>

         {/* Wheel Area */}
         <div className="relative w-[280px] h-[280px] mb-6 drop-shadow-[0_0_35px_rgba(217,70,239,0.4)]">
            {/* Pointer */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-8 h-10 flex justify-center">
               <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-transparent border-t-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"></div>
            </div>

            {/* The Wheel */}
            <motion.div 
               ref={wheelRef}
               className="w-full h-full rounded-full border-[6px] border-cyan-400/40 overflow-hidden relative shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
               initial={{ rotate: 0 }}
               animate={{ rotate: rotation }}
               transition={{ duration: 4, type: 'spring', damping: 20, stiffness: 40 }}
            >
               {rewards.map((r, i) => {
                  const angle = (360 / rewards.length) * i;
                  return (
                    <div 
                      key={r.id}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      {/* Triangle Segment */}
                      <div 
                         className="absolute top-0 left-1/2 origin-bottom w-1/2 h-1/2 border-r border-white/20"
                         style={{ 
                            transformOrigin: '0% 100%',
                            transform: `rotate(${360 / rewards.length / 2}deg) skewY(${90 - (360 / rewards.length)}deg)`,
                            background: `linear-gradient(to bottom right, ${r.color} 0%, rgba(10,5,30,0.8) 100%)`
                         }}
                      />
                      {/* Label Area */}
                      <div className="absolute top-3.5 left-0 w-full flex justify-center drop-shadow-md z-10" style={{ transform: `rotate(${360 / rewards.length / 2}deg)` }}>
                         <span className="text-[11px] font-black uppercase text-white truncate max-w-[55px] text-center tracking-tight" style={{ textShadow: "0px 1px 3px black, 0 0 5px rgba(255,255,255,0.5)" }}>
                           {r.label}
                         </span>
                      </div>
                    </div>
                  );
               })}
               <div className="absolute inset-0 rounded-full border-[3px] border-amber-400/60 pointer-events-none"></div>
               {/* Center Knob */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(251,191,36,0.9)] z-20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-950 fill-amber-950" />
               </div>
            </motion.div>
         </div>

         {/* Spin Control Button */}
         <div className="flex flex-col items-center gap-2.5 w-full">
            <button 
              onClick={handleSpin}
              disabled={isSpinning || (!canFree && spinsLeft <= 0 && store.coins < 200)}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 rounded-2xl font-black uppercase text-lg text-white tracking-widest shadow-[0_0_30px_rgba(217,70,239,0.6)] transform active:scale-95 transition-all disabled:opacity-50 disabled:grayscale cursor-pointer border border-cyan-300/40"
            >
              {isSpinning ? 'SPINNING WHEEL...' : 'SPIN THE WHEEL'}
            </button>
            <div className="text-white font-bold text-xs bg-[#080a22] px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm text-center w-full">
                {canFree ? (
                   <span className="text-emerald-400 flex items-center justify-center gap-1.5 font-black"><Star className="w-4 h-4 fill-emerald-400 animate-spin" /> FREE SPIN AVAILABLE!</span>
                ) : spinsLeft > 0 ? (
                   <span className="text-cyan-400 font-bold">Bonus Tokens: {spinsLeft} Left</span>
                ) : (
                   <span className="text-amber-300 flex items-center justify-center gap-1 font-bold">Cost: 200 Coins (Free in: {timeRemaining})</span>
                )}
            </div>
         </div>
       </div>

       {/* Reward Popup */}
       <AnimatePresence>
         {mysteryPhase && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
             className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg"
           >
             <div className="flex flex-col items-center gap-6">
                <motion.div 
                  animate={{ y: [0, -20, 0], rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl filter drop-shadow-[0_0_40px_rgba(139,92,246,0.8)]"
                >
                  🎁
                </motion.div>
                <h3 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 text-center animate-pulse">
                  Mystery Box<br/>Discovered!
                </h3>
                <button 
                  onClick={openMysteryBox}
                  className="mt-4 px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-full font-black uppercase tracking-widest text-lg text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] transform active:scale-95 transition-all"
                >
                  Open Box
                </button>
             </div>
           </motion.div>
         )}

         {showReward && !mysteryPhase && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: -20 }}
             className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
           >
             <div className="bg-gradient-to-b from-[#1a1b26] to-[#0f1015] border border-fuchsia-500/50 rounded-[32px] p-8 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(217,70,239,0.3)] min-w-[280px]">
                <div className="text-6xl animate-bounce drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                   {showReward.type === 'coins' ? '💰' : 
                    showReward.type === 'gems' ? '💎' : 
                    showReward.type === 'xp' ? '⭐' : 
                    showReward.type === 'jackpot' ? '🎉' :
                    showReward.type === 'mystery' ? '🎁' : '⚡'}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-fuchsia-400 text-center">
                  You Won!
                </h3>
                <div 
                   className="px-6 py-3 rounded-full border-2 font-black text-xl text-white shadow-[0_0_20px_currentColor]"
                   style={{ borderColor: showReward.color, color: showReward.color }}
                >
                  {showReward.label}
                </div>
                
                <button 
                  onClick={() => {
                    setShowReward(null);
                    useAdStore.getState().showInterstitial('AdMob');
                  }}
                  className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase tracking-widest text-sm text-white transition-all"
                >
                  Awesome!
                </button>
             </div>
             
             {/* Simple fireworks effect */}
             <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-transparent to-transparent animate-pulse" />
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
