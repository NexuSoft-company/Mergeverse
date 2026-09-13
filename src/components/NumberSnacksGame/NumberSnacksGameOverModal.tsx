import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Home, Coins, Flame, Play, Shield, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getPowerMilestone } from './NumberSnacksConfig';
import { useAdStore } from '../../store/adStore';
import { audio } from '../../lib/audio';

interface NumberSnacksGameOverModalProps {
  score: number;
  bestScore: number;
  power: number;
  maxCombo: number;
  snacksCollected: number;
  survivalTimeSeconds: number;
  coinsEarned: number;
  xpEarned: number;
  isNewRecord: boolean;
  canSecondChance: boolean;
  onRestart: () => void;
  onSecondChance: () => void;
  onExit: () => void;
}

export const NumberSnacksGameOverModal: React.FC<NumberSnacksGameOverModalProps> = ({
  score,
  bestScore,
  power,
  maxCombo,
  snacksCollected,
  survivalTimeSeconds,
  coinsEarned,
  xpEarned,
  isNewRecord,
  canSecondChance,
  onRestart,
  onSecondChance,
  onExit,
}) => {
  const [doubleClaimed, setDoubleClaimed] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(coinsEarned);
  const [currentXp, setCurrentXp] = useState(xpEarned);
  const milestone = getPowerMilestone(power);

  // Motivational contextual message
  let motivationalMessage = "Great run! Can you beat your record?";
  const nextTarget = power * 2;
  if (isNewRecord) {
    motivationalMessage = "NEW PERSONAL BEST! You're a snack superstar!";
  } else if (score >= bestScore * 0.85) {
    motivationalMessage = `SO CLOSE! Only ${(bestScore - score).toLocaleString()} points from your best!`;
  } else if (power >= 512) {
    motivationalMessage = `Incredible! Can you reach ${nextTarget} on the next run?`;
  } else {
    motivationalMessage = `Getting stronger! Aim for Power ${nextTarget} next time!`;
  }

  useEffect(() => {
    if (isNewRecord) {
      audio.levelUp();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isNewRecord]);

  const handleDoubleRewardAd = () => {
    const adStore = useAdStore.getState();
    adStore.showRewardedVideo(
      'admob',
      'coins',
      currentCoins,
      () => {
        audio.levelUp();
        setCurrentCoins(prev => prev * 2);
        setCurrentXp(prev => prev * 2);
        setDoubleClaimed(true);
        confetti({ particleCount: 50, spread: 60 });
      },
      () => {}
    );
  };

  return (
    <div className="absolute inset-0 z-40 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none overflow-y-auto">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-sm sm:max-w-md max-h-[94vh] overflow-y-auto bg-slate-900 rounded-3xl border border-slate-700/80 shadow-2xl p-4 sm:p-5 flex flex-col items-center text-center relative"
      >
        {/* Mascot Face (Funny / Sad Dazed Reaction) */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-1.5 shadow-lg border-2 border-amber-300 flex items-center justify-center mb-1.5 shrink-0">
          {/* Swirly / Dazed Eyes */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-slate-950">@</span>
            <span className="text-xl font-bold text-slate-950">@</span>
          </div>
          {/* Dazed mouth */}
          <div className="absolute bottom-3 w-5 h-1.5 rounded-full bg-[#451a03]" />
          {/* Small bump / bandage */}
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded-full shadow">
            OUCH
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-white tracking-tight">
          {isNewRecord ? 'NEW HIGH SCORE!' : 'OH NO!'}
        </h2>
        <p className="text-xs font-semibold text-amber-300 mt-1 max-w-[260px] leading-relaxed">
          {motivationalMessage}
        </p>

        {/* Primary Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4">
          <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/50 flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Final Power</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-black text-amber-400">{power}</span>
              <span className="text-[10px] font-semibold text-slate-300">({milestone.name})</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/50 flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
            <span className="text-lg font-black text-white mt-0.5">{score.toLocaleString()}</span>
          </div>

          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700/50 flex flex-col items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Max Combo</span>
            <span className="text-sm font-black text-cyan-400">x{maxCombo}</span>
          </div>

          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700/50 flex flex-col items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Snacks Eaten</span>
            <span className="text-sm font-black text-emerald-400">{snacksCollected}</span>
          </div>
        </div>

        {/* Rewards Earned */}
        <div className="w-full flex items-center justify-center gap-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl py-2 px-3 mt-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>+{currentCoins} Coins</span>
          </div>
          <div className="w-px h-3.5 bg-amber-500/30" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
            <Award className="w-4 h-4 text-purple-400" />
            <span>+{currentXp} XP</span>
          </div>
        </div>

        {/* Double Reward with Ad */}
        {!doubleClaimed && (
          <button
            onClick={handleDoubleRewardAd}
            className="w-full mt-2.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 text-xs font-bold border border-purple-500/40 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 text-purple-300" />
            <span>Watch Ad to Double Rewards!</span>
          </button>
        )}

        {/* Second Chance (if available) */}
        {canSecondChance && (
          <button
            onClick={onSecondChance}
            className="w-full mt-2 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg flex items-center justify-center gap-1.5 transition-transform active:scale-95 border border-emerald-400"
          >
            <Shield className="w-4 h-4" />
            <span>CONTINUE WITH SHIELD!</span>
          </button>
        )}

        {/* Primary Action Buttons */}
        <div className="w-full flex items-center gap-2 mt-4">
          <button
            onClick={onExit}
            className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={onRestart}
            className="flex-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-[0_4px_18px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 border border-yellow-200 transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>TRY AGAIN</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
