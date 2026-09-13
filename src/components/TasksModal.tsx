import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Trophy, Award, Coins, Gem, Zap, CheckCircle2, ChevronRight, X, Circle, Gift } from 'lucide-react';
import { useEconomyStore, Mission } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { audio } from '../lib/audio';

export function TasksModal({ onClose, asTab = false }: { onClose: () => void; asTab?: boolean }) {
  const store = useEconomyStore();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'achievements'>('daily');
  const [showClaimPopup, setShowClaimPopup] = useState<any>(null);
  
  const handleClaim = async (missionId: string) => {
     const result = await store.claimMission(missionId);
     if (result.success) {
        audio.levelUp();
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
        
        const m = store.missions.find(x => x.id === missionId);
        if (m) {
          setShowClaimPopup(m);
          setTimeout(() => {
            setShowClaimPopup(null);
            useAdStore.getState().showInterstitial('AdMob');
          }, 3000);
        }
     }
  };

  const handleClaimAll = async (category: 'daily' | 'weekly' | 'achievements') => {
    const missionsToClaim = store.missions.filter(m => 
      (category === 'daily' ? m.type === 'daily' : category === 'weekly' ? m.type === 'weekly' : m.type === 'achievement') && 
      m.progress >= m.target && !m.claimed
    );
    
    if (missionsToClaim.length === 0) return;

    for (const m of missionsToClaim) {
       await store.claimMission(m.id);
    }

    audio.levelUp();
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    
    setShowClaimPopup({
       rewardType: 'multi',
       title: 'Tasks',
       rewardAmount: 'Multiple'
    });
    setTimeout(() => {
      setShowClaimPopup(null);
      useAdStore.getState().showInterstitial('AdMob');
    }, 3000);
  };

  const getRewardIcon = (type: string) => {
    if (type === 'coins') return <Coins className="w-3.5 h-3.5" />;
    if (type === 'gems') return <Gem className="w-3.5 h-3.5" />;
    if (type === 'xp') return <Award className="w-3.5 h-3.5" />;
    if (type === 'energy') return <Zap className="w-3.5 h-3.5" />;
    return <Gift className="w-3.5 h-3.5" />;
  };

  const renderMission = (m: Mission) => {
     const percent = Math.min(100, (m.progress / m.target) * 100);
     return (
        <div key={m.id} className="relative bg-[#070921]/90 border border-white/10 hover:border-cyan-500/40 transition-all rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-inner mb-3 overflow-hidden">
           {m.claimed && <div className="absolute inset-0 bg-[#030412]/80 z-10 flex items-center justify-center backdrop-blur-[2px]">
             <div className="flex flex-col items-center gap-1">
               <CheckCircle2 className="w-7 h-7 text-emerald-400" />
               <span className="text-[11px] font-black text-emerald-300 uppercase tracking-widest">Completed</span>
             </div>
           </div>}
           
           <div className="flex justify-between items-start z-0">
             <div className="flex-1 pr-2">
               <h4 className="font-black text-white text-sm">{m.title}</h4>
               <p className="text-xs text-slate-300 font-medium">{m.description}</p>
             </div>
             
             <div className="bg-amber-500/10 px-2.5 py-1 flex items-center gap-1.5 rounded-xl border border-amber-400/30 font-black text-amber-300 text-xs shrink-0 shadow">
                {getRewardIcon(m.rewardType)} +{m.rewardAmount}
             </div>
           </div>
           
           <div className="flex items-center gap-3 mt-0.5 z-0">
             <div className="flex-1 h-2.5 bg-black/70 rounded-full border border-white/10 shadow-inner overflow-hidden p-[1px]">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${percent}%` }}
                 className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
               />
             </div>
             <span className="text-[11px] font-black text-slate-300 shrink-0">
               {m.progress >= m.target && !m.claimed ? (
                 <button 
                   onClick={() => handleClaim(m.id)}
                   className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black px-3 py-1 rounded-lg uppercase tracking-wider animate-pulse hover:from-emerald-400 hover:to-teal-300 shadow-[0_0_15px_rgba(16,185,129,0.6)] cursor-pointer"
                 >Claim</button>
               ) : (
                 <span className="text-cyan-300">{m.progress} / {m.target}</span>
               )}
             </span>
           </div>
        </div>
     );
  };

  const dailyMissions = store.missions.filter(m => m.type === 'daily');
  const weeklyMissions = store.missions.filter(m => m.type === 'weekly');
  const achMissions = store.missions.filter(m => m.type === 'achievement');

  const content = (
    <div className={`w-full flex flex-col h-full overflow-hidden ${asTab ? 'max-w-md mx-auto pb-24 pt-2' : ''}`}>
      {!asTab && (
        <div className="flex justify-center p-3 min-h-[30px] flex-shrink-0">
          <div className="w-14 h-1.5 bg-cyan-400/40 rounded-full" />
        </div>
      )}

      <div className="flex items-center justify-between px-4 sm:px-6 mb-3 flex-shrink-0">
        <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-500 uppercase tracking-wider flex items-center gap-2 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400" />
          Cosmic Quests
        </h2>
        {!asTab ? (
          <button onClick={onClose} className="p-2 bg-[#0d0f2f] rounded-full border border-white/10 hover:border-rose-400/50 hover:bg-rose-500/20 transition text-slate-300">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        ) : (
          <button 
            onClick={() => handleClaimAll(activeTab)} 
            className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-black uppercase tracking-wider hover:bg-emerald-500/30 transition"
          >
            Claim All
          </button>
        )}
      </div>

      <div className="flex px-4 sm:px-6 gap-2 mb-4 flex-shrink-0">
        <button 
          onClick={() => setActiveTab('daily')}
          className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-xl border font-black text-xs uppercase tracking-wider transition-all ${activeTab === 'daily' ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-[#080922]/80 border-white/10 text-slate-400 hover:text-white'}`}
        >
          <Target className="w-3.5 h-3.5" /> Daily
        </button>
        <button 
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-xl border font-black text-xs uppercase tracking-wider transition-all ${activeTab === 'weekly' ? 'bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'bg-[#080922]/80 border-white/10 text-slate-400 hover:text-white'}`}
        >
          <Target className="w-3.5 h-3.5" /> Weekly
        </button>
        <button 
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-xl border font-black text-xs uppercase tracking-wider transition-all ${activeTab === 'achievements' ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-[#080922]/80 border-white/10 text-slate-400 hover:text-white'}`}
        >
          <Trophy className="w-3.5 h-3.5" /> Trophies
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24 space-y-3">
        {activeTab === 'daily' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Daily Tasks</h3>
              {dailyMissions.some(m => m.progress >= m.target && !m.claimed) && (
                <button 
                  onClick={() => handleClaimAll('daily')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-400 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-transform animate-pulse cursor-pointer"
                >
                  Claim All
                </button>
              )}
            </div>
            {dailyMissions.map(renderMission)}
            {dailyMissions.length === 0 && (
              <div className="text-center py-12 text-slate-500 font-bold text-sm">
                All daily missions complete! Return tomorrow for more.
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'weekly' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Weekly Tasks</h3>
              {weeklyMissions.some(m => m.progress >= m.target && !m.claimed) && (
                <button 
                  onClick={() => handleClaimAll('weekly')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-400 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-transform animate-pulse cursor-pointer"
                >
                  Claim All
                </button>
              )}
            </div>
            {weeklyMissions.map(renderMission)}
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Lifetime Achievements</h3>
              {achMissions.some(m => m.progress >= m.target && !m.claimed) && (
                <button 
                  onClick={() => handleClaimAll('achievements')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border border-emerald-400 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-transform animate-pulse cursor-pointer"
                >
                  Claim All
                </button>
              )}
            </div>
            {achMissions.map(renderMission)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showClaimPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
          >
            <div className="bg-gradient-to-b from-[#1a1b26] to-[#0f1015] border border-emerald-500/50 rounded-[32px] p-8 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <div className="text-6xl animate-bounce">{getRewardIcon(showClaimPopup.rewardType)}</div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-center">{showClaimPopup.title}<br/>Completed!</h3>
              <div className="bg-black/50 px-6 py-2 rounded-full border border-white/10 font-black text-lg text-white">
                {showClaimPopup.rewardAmount === 'Multiple' ? 'Rewards Claimed!' : `+${showClaimPopup.rewardAmount} ${showClaimPopup.rewardType.toUpperCase()}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (asTab) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col pointer-events-auto">
      <div className="absolute inset-0 bg-[#04040e]/85 backdrop-blur-xl" onClick={onClose} />
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 w-full h-[88vh] bg-gradient-to-t from-[#04040e] via-[#090b24] to-[#12143a] rounded-t-[36px] shadow-[0_-20px_60px_rgba(6,182,212,0.3)] border-t-2 border-cyan-500/40 flex flex-col overflow-hidden"
      >
        {content}
      </motion.div>
    </div>
  );
}
