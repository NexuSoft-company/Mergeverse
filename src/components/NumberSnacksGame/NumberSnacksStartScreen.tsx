import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Play, ArrowLeft, Trophy, BookOpen, RotateCw, Smartphone } from 'lucide-react';
import { audio } from '../../lib/audio';

interface NumberSnacksStartScreenProps {
  bestScore: number;
  highestPower: number;
  isRotated?: boolean;
  isLandscape?: boolean;
  onToggleRotation?: () => void;
  onStartGame: () => void;
  onOpenDiscoveries: () => void;
  onExit: () => void;
}

export const NumberSnacksStartScreen: React.FC<NumberSnacksStartScreenProps> = ({
  bestScore,
  highestPower,
  isRotated = false,
  isLandscape = false,
  onToggleRotation,
  onStartGame,
  onOpenDiscoveries,
  onExit,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  const handlePressPlay = () => {
    audio.pop();
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      audio.drop();
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      audio.levelUp();
      const timer = setTimeout(() => {
        onStartGame();
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [countdown, onStartGame]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/40 text-white select-none overflow-y-auto">
      {/* Top Navigation */}
      <div className="w-full max-w-2xl flex items-center justify-between shrink-0">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 shadow-md transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        {/* Orientation Toggle Button */}
        {onToggleRotation && (
          <button
            onClick={onToggleRotation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-all active:scale-95 shadow-md ${
              isRotated
                ? 'bg-amber-500/25 border-amber-400/80 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotated ? 'rotate-90 text-amber-300' : ''}`} />
            <span>{isRotated ? 'Widescreen (90°)' : 'Rotate Screen'}</span>
          </button>
        )}

        <button
          onClick={onOpenDiscoveries}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 shadow-md transition-transform active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>Snack Book</span>
        </button>
      </div>

      {/* Center Hero Character & Title - Responsive for Landscape & Portrait */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center my-auto py-2">
        <AnimatePresence mode="wait">
          {countdown === null ? (
            <motion.div
              key="intro"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-full flex ${isLandscape ? 'flex-row items-center justify-center gap-8' : 'flex-col items-center'}`}
            >
              {/* Animated Cute Cookie Mascot */}
              <div className="shrink-0 mb-3 sm:mb-0">
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className={`relative ${isLandscape ? 'w-28 h-28 sm:w-36 sm:h-36' : 'w-32 h-32 sm:w-40 sm:h-40'} rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-2 shadow-2xl border-4 border-amber-300/80 flex items-center justify-center cursor-pointer`}
                  onClick={() => audio.pop()}
                >
                  {/* Chocolate chips */}
                  <div className="absolute top-5 left-7 w-3.5 h-3.5 rounded-full bg-[#451a03] shadow-inner" />
                  <div className="absolute bottom-6 right-7 w-3.5 h-3.5 rounded-full bg-[#451a03] shadow-inner" />
                  <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-[#451a03] shadow-inner" />

                  {/* Big cute animated face */}
                  <div className="relative flex flex-col items-center">
                    {/* Eyes */}
                    <div className="flex items-center gap-5">
                      <div className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center relative shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-white absolute top-0.5 left-1" />
                      </div>
                      <div className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center relative shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-white absolute top-0.5 left-1" />
                      </div>
                    </div>
                    {/* Rosy Blush */}
                    <div className="flex items-center justify-between w-16 px-1 -mt-1">
                      <div className="w-3.5 h-1.5 rounded-full bg-rose-400/70 blur-[1px]" />
                      <div className="w-3.5 h-1.5 rounded-full bg-rose-400/70 blur-[1px]" />
                    </div>
                    {/* Mouth */}
                    <div className="w-5 h-2.5 rounded-b-full bg-[#451a03] border-t border-[#451a03] mt-0.5" />
                  </div>

                  {/* Power Badge */}
                  <div className="absolute -top-2 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md border-2 border-white">
                    POWER 2
                  </div>
                </motion.div>
              </div>

              {/* Title and details */}
              <div className={`flex flex-col ${isLandscape ? 'items-start text-left max-w-xs' : 'items-center text-center'}`}>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>NUMBER SNACKS</span>
                  <Flame className="w-5 h-5 text-amber-400" />
                </h1>
                
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Swipe or drag to guide <strong className="text-amber-300">Bitey the Cookie</strong>! Eat numbers to grow your power!
                </p>

                {/* Best Records Pill */}
                <div className="flex items-center gap-3 mt-3 bg-slate-900/90 px-3.5 py-1.5 rounded-2xl border border-slate-800 shadow-inner">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Best: <strong className="text-white font-extrabold">{bestScore.toLocaleString()}</strong></span>
                  </div>
                  <div className="w-px h-3.5 bg-slate-700" />
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <span>Power: <strong className="text-amber-300 font-extrabold">{highestPower}</strong></span>
                  </div>
                </div>

                {/* Screen Orientation Hint */}
                <div className="mt-2 text-[10px] text-amber-300/90 font-medium flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{isLandscape || isRotated ? 'Widescreen view active! Enjoy the wide arena.' : 'Tip: Landscape mode gives a wider view!'}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <span className="text-sm font-bold text-amber-300 uppercase tracking-widest mb-2">Ready?</span>
              <span className="text-7xl sm:text-8xl font-black text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.8)]">
                {countdown === 0 ? 'GO!' : countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Start Button */}
      {countdown === null && (
        <div className="w-full max-w-xs pb-2 shrink-0">
          <button
            onClick={handlePressPlay}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-[0_8px_25px_-4px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 border-2 border-yellow-200 transition-all active:scale-95"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>PLAY NOW</span>
          </button>
        </div>
      )}
    </div>
  );
};
