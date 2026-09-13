import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEconomyStore } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { Trophy, Star } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export function LevelUpOverlay() {
  const { levelUpData, clearLevelUp } = useEconomyStore();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (levelUpData) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [levelUpData]);

  if (!levelUpData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#a855f7', '#ec4899', '#3b82f6', '#f59e0b']} />}
        
        <motion.div
          initial={{ scale: 0.5, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          className="relative max-w-sm w-full bg-gradient-to-b from-indigo-900/90 to-black border border-indigo-500/50 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(79,70,229,0.5)] overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-indigo-500/20 to-transparent blur-2xl -z-10" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(99,102,241,0)_0%,rgba(99,102,241,0.2)_50%,rgba(99,102,241,0)_100%)] -z-20"
          />

          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="relative w-32 h-32 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.5)] border-4 border-indigo-200/20"
            >
              <Trophy className="w-16 h-16 text-white" />
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 rounded-full border border-white/50"
              />
            </motion.div>
          </div>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 tracking-widest uppercase"
          >
            Level Up!
          </motion.h2>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          >
            {levelUpData.level}
          </motion.div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-indigo-200 font-bold tracking-widest uppercase text-sm mb-6"
          >
            Rewards Unlocked
          </motion.p>

          <div className="flex gap-4 justify-center mb-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-black/50 border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center flex-1 shadow-inner shadow-amber-500/10"
            >
              <span className="text-2xl font-black text-amber-400 mb-1">+{levelUpData.coins}</span>
              <span className="text-[10px] uppercase font-bold text-amber-400/70 tracking-widest">Coins</span>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-black/50 border border-fuchsia-500/30 rounded-2xl p-4 flex flex-col items-center flex-1 shadow-inner shadow-fuchsia-500/10"
            >
              <span className="text-2xl font-black text-fuchsia-400 mb-1">+{levelUpData.gems}</span>
              <span className="text-[10px] uppercase font-bold text-fuchsia-400/70 tracking-widest">Gems</span>
            </motion.div>
          </div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => {
              clearLevelUp();
              useAdStore.getState().showInterstitial('AdMob');
            }}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 border border-white/20 rounded-xl font-black uppercase text-sm tracking-widest text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            Awesome!
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
