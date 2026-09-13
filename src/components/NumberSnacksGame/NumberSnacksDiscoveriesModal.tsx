import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Lock } from 'lucide-react';
import { SNACK_TIERS } from './NumberSnacksConfig';
import { useNumberSnacksStore } from './NumberSnacksStore';

interface NumberSnacksDiscoveriesModalProps {
  onClose: () => void;
}

export const NumberSnacksDiscoveriesModal: React.FC<NumberSnacksDiscoveriesModalProps> = ({ onClose }) => {
  const { discoveredSnacks } = useNumberSnacksStore();
  const allTiers = Object.values(SNACK_TIERS);

  return (
    <div className="fixed inset-0 z-[2600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md max-h-[85vh] bg-gradient-to-b from-[#161a38] via-[#0e1128] to-[#070817] rounded-[32px] border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Snack Recipe Book</h3>
              <p className="text-[11px] text-cyan-300 font-bold">
                {discoveredSnacks.length} / {allTiers.length} Snacks Discovered
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {allTiers.map((tier) => {
            const isUnlocked = discoveredSnacks.includes(tier.power);

            return (
              <div
                key={tier.power}
                className={`rounded-2xl p-3 border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-white/5 to-white/10 border-white/15 shadow-sm'
                    : 'bg-black/30 border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Snack Visual Avatar */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center relative shrink-0 shadow-md ${
                      isUnlocked
                        ? 'border-2 border-white/40'
                        : 'bg-slate-900 border-2 border-slate-700'
                    }`}
                    style={{ backgroundColor: isUnlocked ? tier.baseColor : undefined }}
                  >
                    {isUnlocked ? (
                      <>
                        <span className="text-base font-black text-white">
                          {tier.power}
                        </span>
                        <span className="text-[8px] font-bold text-white/90 uppercase">
                          PWR {tier.power}
                        </span>
                      </>
                    ) : (
                      <Lock className="w-5 h-5 text-slate-500" />
                    )}
                  </div>

                  {/* Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-sm font-black text-white truncate">
                        {isUnlocked ? tier.name : `Power ${tier.power} (Locked)`}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {isUnlocked ? tier.category : 'Undiscovered'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {isUnlocked
                        ? tier.flavorText
                        : `Reach Power ${tier.power} in any game run to reveal this snack creation.`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
