import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Gift, Check, Trash2, Coins, Gem, Hammer, RotateCcw } from 'lucide-react';
import { useAdStore, NotificationItem } from '../store/adStore';

export function NotificationsModal({ onClose }: { onClose: () => void }) {
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification, claimNotificationReward } = useAdStore();

  const getRewardIcon = (type?: string) => {
    switch (type) {
      case 'coins': return <Coins className="w-4 h-4 text-amber-400" />;
      case 'gems': return <Gem className="w-4 h-4 text-fuchsia-400" />;
      case 'undo': return <RotateCcw className="w-4 h-4 text-cyan-400" />;
      case 'hammer': return <Hammer className="w-4 h-4 text-rose-400" />;
      default: return <Gift className="w-4 h-4 text-emerald-400" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="fixed inset-0 z-[2500] flex flex-col pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ y: '100%' }} 
        animate={{ y: 0 }} 
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 w-full h-[80vh] bg-gradient-to-t from-[#04040e] via-[#090b24] to-[#12143a] rounded-t-[36px] shadow-[0_-20px_60px_rgba(6,182,212,0.3)] border-t-2 border-cyan-500/40 flex flex-col overflow-hidden"
      >
        {/* Handle Bar */}
        <div className="flex justify-center p-3 min-h-[30px] flex-shrink-0">
          <div className="w-14 h-1.5 bg-cyan-400/40 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 mb-4 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                Inbox & News
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">Broadcasts, rewards & community gifts</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.some(n => !n.read) && (
              <button 
                onClick={markAllNotificationsRead}
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-300 hover:bg-white/10 transition"
              >
                Read All
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2 bg-[#0d0f2f] rounded-full border border-white/10 hover:border-rose-400/50 hover:bg-rose-500/20 transition text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-3">
                <Bell className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-white font-black text-base uppercase tracking-wider mb-1">All Caught Up!</p>
              <p className="text-xs text-slate-400 max-w-xs">No active announcements right now. Check back soon for rewards and live events.</p>
            </div>
          ) : (
            notifications.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border transition-all ${item.read ? 'bg-[#080922]/70 border-white/10' : 'bg-gradient-to-r from-[#12163b]/90 to-[#0a0c28]/90 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)] shrink-0" />
                    )}
                    <h4 className="text-sm font-black text-white">{item.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold shrink-0">{formatTime(item.timestamp)}</span>
                </div>

                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-3">
                  {item.message}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  {item.rewardType && item.rewardAmount ? (
                    item.claimed ? (
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Claimed ({item.rewardAmount} {item.rewardType})
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          claimNotificationReward(item.id);
                          useAdStore.getState().showInterstitial('AdMob');
                        }}
                        className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 transition active:scale-95"
                      >
                        {getRewardIcon(item.rewardType)}
                        Claim +{item.rewardAmount} {item.rewardType.toUpperCase()}
                      </button>
                    )
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-2">
                    {!item.read && (
                      <button
                        onClick={() => markNotificationRead(item.id)}
                        className="text-[10px] text-cyan-400 font-bold hover:underline"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Delete notification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
