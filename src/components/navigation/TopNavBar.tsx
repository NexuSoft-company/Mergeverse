import React from 'react';
import { Coins, Gem, Bell, Settings, Volume2, VolumeX, HelpCircle, ShieldCheck } from 'lucide-react';
import { useEconomyStore } from '../../store/economyStore';
import { useAdStore } from '../../store/adStore';
import { audio } from '../../lib/audio';

interface TopNavBarProps {
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onGoToShop: () => void;
  onOpenAdmin?: () => void;
  onOpenTutorial?: () => void;
}

export function TopNavBar({
  onOpenProfile,
  onOpenNotifications,
  onGoToShop,
  onOpenAdmin,
  onOpenTutorial,
}: TopNavBarProps) {
  const { coins, gems, xp, level, nickname, avatarId } = useEconomyStore();
  const { notifications } = useAdStore();
  const [isMuted, setIsMuted] = React.useState(audio.isMuted);

  const unreadCount = (notifications || []).filter((n) => !n.read).length;
  const avatarEmoji =
    ['🧑‍🚀', '👽', '🤖', '👻', '🧙‍♂️', '🥷', '🧜‍♀️', '🧛‍♂️'][
      parseInt(avatarId) - 1
    ] || '🧑‍🚀';

  const toggleAudio = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      id="mergeverse-top-nav"
      className="sticky top-0 z-30 w-full bg-[#040514]/95 backdrop-blur-md border-b border-cyan-500/20 px-1 sm:px-2 py-1.5 shadow-md"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {/* Left: Player Stats & Currencies */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Profile & Level */}
          <button
            id="btn-top-profile"
            onClick={onOpenProfile}
            className="flex items-center gap-1 bg-white/5 border border-cyan-500/30 rounded-full pl-0.5 pr-2 py-0.5 hover:bg-white/10 transition-all active:scale-95 cursor-pointer h-[32px] shrink-0"
          >
            <div className="w-6 h-6 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center text-[10px] shadow">
              {avatarEmoji}
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-black text-slate-100 max-w-[40px] truncate">
                {nickname}
              </span>
              <span className="text-[9px] font-bold text-cyan-400 uppercase">
                LVL {level}
              </span>
            </div>
          </button>

          {/* XP */}
          <button
            onClick={onOpenProfile}
            className="flex flex-col items-center justify-center bg-white/5 border border-emerald-500/30 hover:bg-white/10 px-1.5 py-0.5 rounded-lg h-[32px] min-w-[36px] shrink-0 transition-all active:scale-95"
            title="Experience Points"
          >
            <span className="text-[8px] text-emerald-400/80 font-bold uppercase leading-none">XP</span>
            <span className="font-mono text-[10px] font-black text-emerald-300 leading-none mt-0.5">
              {xp > 999 ? `${(xp / 1000).toFixed(1)}K` : xp}
            </span>
          </button>

          {/* Coins */}
          <button
            id="btn-top-coins"
            onClick={onGoToShop}
            className="flex flex-col items-center justify-center bg-white/5 border border-amber-500/30 hover:bg-white/10 px-1.5 py-0.5 rounded-lg h-[32px] min-w-[40px] shrink-0 transition-all active:scale-95"
            title="Gold Coins (Tap for Shop)"
          >
            <Coins className="w-3 h-3 text-amber-400 fill-amber-400/20 mb-0.5" />
            <span className="font-mono text-[10px] font-black text-amber-300 leading-none">
              {coins > 999999 ? `${(coins / 1000000).toFixed(1)}M` : coins > 999 ? `${(coins / 1000).toFixed(1)}K` : coins}
            </span>
          </button>

          {/* Gems */}
          <button
            id="btn-top-gems"
            onClick={onGoToShop}
            className="flex flex-col items-center justify-center bg-white/5 border border-indigo-500/30 hover:bg-white/10 px-1.5 py-0.5 rounded-lg h-[32px] min-w-[36px] shrink-0 transition-all active:scale-95"
            title="Cosmic Gems (Tap for Shop)"
          >
            <Gem className="w-3 h-3 text-fuchsia-400 fill-fuchsia-400/20 mb-0.5" />
            <span className="font-mono text-[10px] font-black text-indigo-300 leading-none">
              {gems > 999 ? `${(gems / 1000).toFixed(1)}K` : gems}
            </span>
          </button>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Notifications */}
          <button
            id="btn-top-notifications"
            onClick={onOpenNotifications}
            className="relative p-1.5 rounded-lg bg-white/5 border border-amber-500/30 hover:bg-white/10 text-amber-300 transition-all active:scale-95 cursor-pointer w-[32px] h-[32px] shrink-0 flex items-center justify-center"
            title="Notifications & Gifts"
          >
            <Bell className="w-3.5 h-3.5 fill-amber-400/20" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-bounce shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-top-audio"
            onClick={toggleAudio}
            className="p-1.5 rounded-lg bg-white/5 border border-indigo-500/30 hover:bg-white/10 text-indigo-300 transition-all active:scale-95 cursor-pointer w-[32px] h-[32px] shrink-0 flex items-center justify-center"
            title="Audio Mute/Unmute"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 fill-indigo-400/20" />
            )}
          </button>

          {/* Privacy Policy / Tutorial Help */}
          {onOpenTutorial && (
            <button
              id="btn-top-tutorial"
              onClick={onOpenTutorial}
              className="p-1.5 rounded-lg bg-white/5 border border-cyan-500/30 hover:bg-white/10 text-cyan-300 transition-all active:scale-95 cursor-pointer w-[32px] h-[32px] shrink-0 flex items-center justify-center"
              title="Privacy Policy & Help"
            >
              <HelpCircle className="w-3.5 h-3.5 fill-cyan-400/20" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
