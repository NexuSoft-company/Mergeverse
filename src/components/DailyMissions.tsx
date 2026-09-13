import React, { useEffect } from 'react';
import { useMissionStore } from '../store/missionStore';
import { useEconomyStore } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { Target, CheckCircle2, Coins } from 'lucide-react';

export function DailyMissionsWidget() {
  const { missions, generateMissions, claimMission } = useMissionStore();
  const { addCoins } = useEconomyStore();

  useEffect(() => {
    generateMissions();
  }, [generateMissions]);

  if (missions.length === 0) return null;

  return (
    <div className="w-full mt-4 bg-[#090b24]/85 border-2 border-indigo-500/30 rounded-3xl p-4.5 relative overflow-hidden backdrop-blur-xl shadow-[0_0_25px_rgba(99,102,241,0.2)]">
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-white uppercase tracking-wider text-xs">Cosmic Missions</h3>
            <p className="text-[10px] text-slate-400 font-bold">Complete for bonus coins</p>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase text-indigo-300 bg-indigo-500/15 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
          Daily Quests
        </span>
      </div>

      <div className="space-y-2.5 relative z-10">
        {missions.map((mission) => {
          const progressPercent = Math.min(100, Math.round((mission.currentProgress / mission.targetValue) * 100));
          
          return (
            <div key={mission.id} className="bg-[#050616]/90 rounded-2xl p-3 flex flex-col gap-2 border border-white/10 hover:border-indigo-500/40 transition-colors">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-200 leading-tight">
                    {mission.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-amber-300 font-black tracking-wider uppercase flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      <Coins className="w-3 h-3 text-amber-400" /> +{mission.rewardCoins}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {mission.currentProgress} / {mission.targetValue}
                    </span>
                  </div>
                </div>
                
                {mission.completed ? (
                  mission.claimed ? (
                    <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Claimed
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        claimMission(mission.id, addCoins);
                        useAdStore.getState().showInterstitial('AdMob');
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white px-3.5 py-1 rounded-full text-xs font-black transition-transform active:scale-95 shadow-[0_0_15px_rgba(217,70,239,0.5)] border border-cyan-300/60 animate-pulse cursor-pointer"
                    >
                      Claim
                    </button>
                  )
                ) : (
                  <div className="w-9 h-9 border border-indigo-500/30 bg-[#0d0f2f] rounded-xl flex items-center justify-center shrink-0">
                    <div className="text-[10px] font-black text-cyan-300">{progressPercent}%</div>
                  </div>
                )}
              </div>
              
              {!mission.completed && (
                <div className="h-1.5 bg-black/60 rounded-full overflow-hidden w-full border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
