import React, { useState } from 'react';
import { Star, Gift, Crown, Zap, Flame, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LuckySpinWidget } from '../LuckySpinWidget';
import { LuckySpinModal } from '../LuckySpinModal';
import { VipWidget } from '../VipWidget';
import { VipModal } from '../VipModal';
import { LiveEventWidget } from '../LiveEventWidget';
import { LiveEventModal } from '../LiveEventModal';
import { DailyRewardWidget } from '../DailyRewardWidget';
import { DailyWinnerWidget } from '../DailyWinnerWidget';

export function EventsHubView() {
  const [showLuckySpin, setShowLuckySpin] = useState(false);
  const [showVip, setShowVip] = useState(false);
  const [showLiveEvent, setShowLiveEvent] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 pb-24 space-y-4 text-white">
      {/* Header */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-1.5 bg-fuchsia-500/15 border border-fuchsia-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-fuchsia-300 mb-1">
          <Star className="w-3 h-3 text-fuchsia-400 fill-fuchsia-400 animate-pulse" />
          Special Rewards &amp; Tournaments
        </div>
        <h2 className="text-xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-400 to-amber-300">
          Events &amp; Rewards
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          Spin the wheel, join live events, and collect daily streak gifts
        </p>
      </div>

      {/* Lucky Spin Wheel Card */}
      <div className="bg-[#0b0e2d]/90 border border-fuchsia-500/30 rounded-3xl p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300">
              <Gift className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Daily Lucky Wheel
            </h3>
          </div>
          <span className="text-[10px] font-mono text-fuchsia-300 bg-fuchsia-500/10 px-2 py-0.5 rounded-full border border-fuchsia-500/20">
            Free Daily
          </span>
        </div>
        <LuckySpinWidget onOpen={() => setShowLuckySpin(true)} />
      </div>

      {/* VIP Club Membership Card */}
      <div className="bg-[#0b0e2d]/90 border border-amber-500/30 rounded-3xl p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Crown className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Cosmic VIP Lounge
            </h3>
          </div>
          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Multiplier Perks
          </span>
        </div>
        <VipWidget onOpen={() => setShowVip(true)} />
      </div>

      {/* Live Event Widget */}
      <div className="bg-[#0b0e2d]/90 border border-cyan-500/30 rounded-3xl p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Live Tournament
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
            Time-Limited
          </span>
        </div>
        <LiveEventWidget onOpen={() => setShowLiveEvent(true)} />
      </div>

      {/* Daily Login Streak Rewards */}
      <div className="bg-[#0b0e2d]/90 border border-white/10 rounded-3xl p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              7-Day Login Streak
            </h3>
          </div>
          <span className="text-[10px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
            Daily Bonus
          </span>
        </div>
        <DailyRewardWidget />
      </div>

      {/* Daily Winner Showcase */}
      <div className="bg-[#0b0e2d]/90 border border-white/10 rounded-3xl p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Hall of Champions
            </h3>
          </div>
        </div>
        <DailyWinnerWidget />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showLuckySpin && <LuckySpinModal onClose={() => setShowLuckySpin(false)} />}
        {showVip && <VipModal onClose={() => setShowVip(false)} />}
        {showLiveEvent && <LiveEventModal onClose={() => setShowLiveEvent(false)} />}
      </AnimatePresence>
    </div>
  );
}
