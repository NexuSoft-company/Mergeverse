import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Pause, Play, Star, Zap, Shield, Flame, Compass, Snowflake, RotateCw, Smartphone, Crosshair, Navigation, Crown } from 'lucide-react';
import { ActivePowerUpState } from './NumberSnacksEngine';
import { getPowerMilestone, POWER_UPS } from './NumberSnacksConfig';
import { CameraMode } from './NumberSnacksWorld';

interface NumberSnacksHUDProps {
  score: number;
  bestScore: number;
  power: number;
  nextPower: number;
  progressRatio: number;
  currentCombo: number;
  comboLabel: string;
  comboMultiplier: number;
  activePowerUps: ActivePowerUpState[];
  isPaused: boolean;
  isMuted: boolean;
  milestoneAlert: { power: number; title: string } | null;
  isRotated?: boolean;
  cameraMode?: CameraMode;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onToggleRotation?: () => void;
  onToggleCameraMode?: () => void;
}

export const NumberSnacksHUD: React.FC<NumberSnacksHUDProps> = ({
  score,
  bestScore,
  power,
  nextPower,
  progressRatio,
  currentCombo,
  comboLabel,
  comboMultiplier,
  activePowerUps,
  isPaused,
  isMuted,
  milestoneAlert,
  isRotated = false,
  cameraMode = 'centered',
  onTogglePause,
  onToggleMute,
  onToggleRotation,
  onToggleCameraMode,
}) => {
  const milestone = getPowerMilestone(power);
  const isAlmostNext = progressRatio >= 0.8;

  const renderPowerUpIcon = (type: string) => {
    switch (type) {
      case 'rainbow': return <Zap className="w-3.5 h-3.5" />;
      case 'golden': return <Star className="w-3.5 h-3.5 text-amber-300" />;
      case 'magnet': return <Compass className="w-3.5 h-3.5" />;
      case 'speed': return <Flame className="w-3.5 h-3.5" />;
      case 'shield': return <Shield className="w-3.5 h-3.5" />;
      case 'slowmo': return <Snowflake className="w-3.5 h-3.5" />;
      default: return <Star className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none z-20 flex flex-col select-none">
      
      {/* Power Progression Bar - Ultra thin at the very top */}
      <div className="w-full h-1.5 bg-slate-900/50 relative overflow-hidden backdrop-blur-sm">
        <motion.div
          className="absolute top-0 left-0 bottom-0 transition-all duration-300"
          style={{
            width: `${Math.min(100, Math.max(0, progressRatio * 100))}%`,
            background: `linear-gradient(90deg, ${milestone.baseColor}, #fbbf24)`,
            boxShadow: isAlmostNext ? '0 0 10px #fbbf24' : 'none',
          }}
        />
      </div>

      <div className="w-full flex justify-between items-start p-2 gap-2">
        {/* Top-Left: POWER & Next */}
        <div className="flex flex-col gap-1 items-start">
          <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg pointer-events-auto">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs text-white shadow-sm"
              style={{ backgroundColor: milestone.baseColor }}
            >
              🍪
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Power</span>
              <span className="text-sm font-black text-amber-300 leading-tight">
                {power} <span className="text-[9px] text-slate-500 font-normal">/ {nextPower}</span>
              </span>
            </div>
          </div>
          
          {/* Active Power-up Badges */}
          <div className="flex flex-col items-start gap-1">
            <AnimatePresence>
              {activePowerUps.map((pu) => {
                const meta = POWER_UPS[pu.type];
                return (
                  <motion.div
                    key={pu.type}
                    initial={{ scale: 0.8, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.8, opacity: 0, x: -20 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-black text-[10px] shadow-md border border-white/20 backdrop-blur-md pointer-events-auto"
                    style={{ backgroundColor: meta.color }}
                  >
                    {renderPowerUpIcon(pu.type)}
                    <span>{meta.badge}</span>
                    <span className="text-[9px] opacity-90 font-mono ml-1">
                      {Math.ceil(pu.remainingMs / 1000)}s
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Top-Center: Score & Combos */}
        <div className="flex flex-col items-center gap-1 pointer-events-auto">
          <div className="flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-1.5 rounded-xl border border-slate-700/60 shadow-lg">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Score</span>
              <span className="text-base font-black text-white leading-tight">
                {score.toLocaleString()}
              </span>
            </div>
          </div>
          <AnimatePresence>
            {currentCombo >= 2 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -10 }}
                className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300/60"
              >
                <Flame className="w-3 h-3 text-amber-200 animate-pulse" />
                <span>{comboLabel}</span>
                <span className="text-[9px] opacity-90">({comboMultiplier}x)</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top-Right: Action Buttons */}
        <div className="flex items-start gap-2 pointer-events-auto">
          {onToggleCameraMode && (
            <button
              onClick={onToggleCameraMode}
              title={cameraMode === 'heading_up' ? "Chase View Active" : "Fixed Center Active"}
              className={`w-7 h-7 rounded-lg backdrop-blur-md border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                cameraMode === 'heading_up'
                  ? 'bg-cyan-500/30 border-cyan-400/70 text-cyan-300'
                  : 'bg-slate-900/85 border-slate-700/60 text-slate-300'
              }`}
            >
              {cameraMode === 'heading_up' ? (
                <Navigation className="w-3.5 h-3.5 text-cyan-300" />
              ) : (
                <Crosshair className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
          )}
          {onToggleRotation && (
            <button
              onClick={onToggleRotation}
              className={`w-7 h-7 rounded-lg backdrop-blur-md border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                isRotated 
                  ? 'bg-amber-500/30 border-amber-400/70 text-amber-300'
                  : 'bg-slate-900/85 border-slate-700/60 text-slate-300'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotated ? 'rotate-90 text-amber-300' : ''}`} />
            </button>
          )}
          <button
            onClick={onToggleMute}
            className="w-7 h-7 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 active:scale-95 shadow-lg"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
          </button>
          <button
            onClick={onTogglePause}
            className="w-7 h-7 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 active:scale-95 shadow-lg"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Milestone Level Up Alert - Positioned cleanly at top side so it never blocks playfield */}
      <AnimatePresence>
        {milestoneAlert && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0, x: 20 }}
            className="absolute top-2.5 right-28 sm:right-32 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-black px-3 py-1 rounded-full shadow-xl border border-white/40 flex items-center gap-1.5 pointer-events-auto z-30"
          >
            <Crown className="w-3.5 h-3.5 text-yellow-200 animate-bounce" />
            <span className="text-[11px] tracking-wide uppercase font-black">
              P{milestoneAlert.power}: {milestoneAlert.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
