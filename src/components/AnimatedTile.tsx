import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AnimatedTileProps {
  value: number;
  isNew?: boolean;
  isMerged?: boolean;
  colorClass?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  shape?: 'square' | 'hex';
  showFloatingMergeTag?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function AnimatedTile({
  value,
  isNew = false,
  isMerged = false,
  colorClass = '',
  icon,
  className = '',
  style,
  shape = 'square',
  showFloatingMergeTag = true,
  onClick,
}: AnimatedTileProps) {
  const [justMerged, setJustMerged] = useState(isMerged);
  const [prevVal, setPrevVal] = useState(value);

  // Trigger merge pop whenever isMerged is set or value changes upwards
  useEffect(() => {
    if (isMerged || (value > prevVal && prevVal > 0)) {
      setJustMerged(true);
      const timer = setTimeout(() => setJustMerged(false), 600);
      setPrevVal(value);
      return () => clearTimeout(timer);
    }
    setPrevVal(value);
  }, [isMerged, value, prevVal]);

  const isHighTier = value >= 128;
  const isGrandTier = value >= 1024;

  // Font size responsive scaling based on number digits
  const getFontSize = (val: number) => {
    if (val >= 100000) return 'text-[11px] sm:text-xs';
    if (val >= 10000) return 'text-xs sm:text-sm';
    if (val >= 1000) return 'text-sm sm:text-base';
    if (val >= 100) return 'text-lg sm:text-xl';
    return 'text-xl sm:text-2xl';
  };

  return (
    <div
      onClick={onClick}
      style={style}
      className={`relative select-none flex items-center justify-center ${shape === 'hex' ? 'transform rotate-45' : ''} ${className}`}
    >
      {/* 1. Merge Shockwave Ripple Ring */}
      <AnimatePresence>
        {justMerged && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.95, borderWidth: '3px' }}
            animate={{ scale: 1.6, opacity: 0, borderWidth: '1px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.15, 0.85, 0.35, 1.2] }}
            className={`absolute inset-0 pointer-events-none z-30 border-cyan-300 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.9)] ${
              shape === 'hex' ? 'rounded-xl' : 'rounded-2xl'
            }`}
          />
        )}
      </AnimatePresence>

      {/* 2. Floating Merge Badge (+value) */}
      <AnimatePresence>
        {justMerged && showFloatingMergeTag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.25, y: -26 }}
            exit={{ opacity: 0, scale: 0.7, y: -40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -top-1 pointer-events-none z-50 flex items-center justify-center whitespace-nowrap"
          >
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.9)] border border-white/80">
              +{value}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Animated Block Container with Squash & Stretch */}
      <motion.div
        initial={isNew ? { scale: 0.1, opacity: 0, rotate: -6 } : false}
        animate={
          justMerged
            ? {
                scale: [1, 1.28, 0.93, 1.05, 1],
                rotate: [0, -3, 2, 0],
                opacity: 1,
              }
            : {
                scale: 1,
                rotate: 0,
                opacity: 1,
              }
        }
        transition={
          justMerged
            ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            : { type: 'spring', stiffness: 350, damping: 24 }
        }
        className={`w-full h-full relative overflow-hidden flex items-center justify-center font-black ${colorClass} ${
          shape === 'hex' ? 'rounded-xl' : 'rounded-2xl'
        } ${
          isGrandTier
            ? 'ring-2 ring-white/90 shadow-[0_0_35px_rgba(6,182,212,0.8),inset_0_2px_12px_rgba(255,255,255,0.9)]'
            : isHighTier
            ? 'ring-1 ring-amber-300/60 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
            : ''
        }`}
      >
        {/* Top 3D Gloss / Glass Highlight Rim */}
        <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-2xl" />

        {/* Ambient Shimmer for High-Tier Tiles */}
        {isHighTier && (
          <motion.div
            animate={{ x: ['-120%', '160%'] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] pointer-events-none"
          />
        )}

        {/* Merge Flash Burst Overlay */}
        <AnimatePresence>
          {justMerged && (
            <motion.div
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-white/70 pointer-events-none z-20"
            />
          )}
        </AnimatePresence>

        {/* 4. Animated Number / Icon with Spring Pop */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center leading-none ${
            shape === 'hex' ? 'transform -rotate-45' : ''
          }`}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={value}
              initial={{ scale: 0.4, y: 8, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 550,
                damping: 18,
                mass: 0.7,
              }}
              className={`flex items-center justify-center font-black ${getFontSize(
                value
              )} tracking-tight`}
            >
              {icon ? (
                <span className="text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                  {icon}
                </span>
              ) : (
                <span
                  className={`font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter ${
                    isGrandTier
                      ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-amber-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                      : ''
                  }`}
                >
                  {value}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
