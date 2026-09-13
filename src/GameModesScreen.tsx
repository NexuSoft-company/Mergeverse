import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowLeft, Trophy, Lock, Target } from 'lucide-react';
import { THEMES, THEME_IDS } from './themes';
import { useEconomyStore } from './store/economyStore';
import appIconImg from './assets/images/app_icon.png';

import { ProgressiveImage } from './components/ProgressiveImage';

export function GameModesScreen({ onBack, onSelectMode, level, bestScore }: { onBack: () => void, onSelectMode: (themeId: string) => void, level: number, bestScore: number }) {
  const { difficultyMode, setDifficultyMode, unlockedThemes } = useEconomyStore();
  
  return (
    <div className="min-h-full h-full w-full bg-[#060614] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-950/40 via-[#0a0b26] to-[#04040e] text-white overflow-y-auto pb-12">
      <div className="sticky top-0 z-50 bg-[#060614]/80 backdrop-blur-xl border-b border-cyan-500/20 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2.5 bg-[#0e1030]/80 border border-white/10 rounded-xl hover:border-cyan-400/50 hover:bg-white/10 transition">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <ProgressiveImage src={appIconImg} alt="MergeVerse" referrerPolicy="no-referrer" className="w-7 h-7 rounded-lg border border-cyan-400/50 shadow" />
          <h1 className="text-lg font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-500">
            MergeVerse
          </h1>
        </div>
        <div className="w-9" />
      </div>
      
      <div className="p-4 space-y-6 max-w-md mx-auto mt-2">
        <div className="text-center mb-6">
          <h2 className="text-lg font-black uppercase tracking-widest text-slate-200 mb-3 flex items-center justify-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            Select Difficulty
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {(['easy', 'medium', 'hard', 'extreme', 'impossible'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setDifficultyMode(mode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${difficultyMode === mode ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-cyan-300/60 scale-105' : 'bg-[#0d0f2b]/80 border border-white/10 text-slate-300 hover:border-cyan-400/40'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-2">
          <h2 className="text-lg font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400">
            Cosmic Universes
          </h2>
        </div>

        <div className="space-y-3.5">
          {THEME_IDS.map((id, index) => {
            const theme = THEMES[id];
            const isUnlocked = level >= theme.unlockLevel || unlockedThemes.includes(id);
            
            return (
              <motion.div 
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`group relative rounded-3xl overflow-hidden border transition-all ${isUnlocked ? 'border-cyan-500/25 bg-[#090b24]/70 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] cursor-pointer' : 'border-white/5 bg-black/40 opacity-60 grayscale-[0.8]'}`}
                onClick={() => {
                  if (isUnlocked) onSelectMode(id);
                }}
              >
                <div className={`absolute inset-0 opacity-40 ${theme.backgroundClass}`}></div>
                <div className="relative p-4 backdrop-blur-md flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black/60 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                    {theme.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-black tracking-wide text-white drop-shadow-md flex items-center gap-2">
                       {theme.name}
                       {!isUnlocked && <Lock className="w-4 h-4 text-rose-400" />}
                    </h3>
                    <p className="text-xs font-medium text-slate-300 mt-0.5 mb-2 mix-blend-screen">{theme.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg bg-black/60 border border-white/10 ${theme.difficulty === 'Normal' ? 'text-emerald-400 border-emerald-500/30' : theme.difficulty === 'Hard' ? 'text-amber-400 border-amber-500/30' : 'text-rose-400 border-rose-500/30'}`}>
                        {theme.difficulty}
                      </span>
                      {isUnlocked ? (
                         <span className="text-[10px] text-cyan-200 font-bold flex items-center gap-1">
                           <Trophy className="w-3 h-3 text-amber-400" /> Best: {bestScore.toLocaleString()}
                         </span>
                      ) : (
                         <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">
                           Unlocks at Lvl {theme.unlockLevel}
                         </span>
                      )}
                    </div>
                  </div>
                  
                  {isUnlocked && (
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/40 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
                      <Play className="w-4 h-4 text-cyan-200 group-hover:text-white ml-0.5" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
