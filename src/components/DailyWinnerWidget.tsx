import React from 'react';
import { useEconomyStore } from '../store/economyStore';
import { Trophy, Crown, Star, Award } from 'lucide-react';

export function DailyWinnerWidget() {
  const { bestScore, nickname } = useEconomyStore();

  if (bestScore <= 0) return null;

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#180f2b] to-[#11091e] border border-amber-400/40 p-3 mb-5 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-between z-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.1)_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-3">
        <div className="relative">
           <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-fuchsia-500 rounded-full blur-md opacity-40 animate-pulse" />
           <div className="relative bg-gradient-to-br from-amber-300 to-amber-500 w-10 h-10 rounded-full flex items-center justify-center border border-amber-200 shadow-sm">
             <Crown className="w-5 h-5 text-[#1a0f02]" />
           </div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-[9px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1">
            Personal Best
          </h3>
          <h2 className="text-[13px] font-black text-white uppercase tracking-wider drop-shadow-md">
            {nickname}
          </h2>
        </div>
      </div>
      
      <div className="relative z-10 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-1.5 shadow-inner">
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-sm font-black text-amber-300 tracking-wider">
          {bestScore > 999999 ? `${(bestScore / 1000000).toFixed(1)}M` : bestScore > 999 ? `${(bestScore / 1000).toFixed(1)}K` : bestScore} PTS
        </span>
      </div>
    </div>
  );
}
