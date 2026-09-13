import React, { useState, useRef, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, Move, Compass, Snowflake, Shield } from 'lucide-react';
import { DirectionName } from './NumberSnacksTypes';

interface NumberSnacksMobileControlsProps {
  onDirection: (dir: DirectionName) => void;
  onHeading: (dx: number, dy: number) => void;
  onBoost: (boosting: boolean) => void;
  onTriggerMagnet?: () => void;
  onTriggerFreeze?: () => void;
  onTriggerShield?: () => void;
  isLandscape: boolean;
  isVirtualLandscape?: boolean;
  isMagnetActive?: boolean;
  isFreezeActive?: boolean;
}

export const NumberSnacksMobileControls: React.FC<NumberSnacksMobileControlsProps> = ({
  onDirection,
  onHeading,
  onBoost,
  onTriggerMagnet,
  onTriggerFreeze,
  onTriggerShield,
  isLandscape,
  isVirtualLandscape = false,
  isMagnetActive = false,
  isFreezeActive = false,
}) => {
  const [activeDir, setActiveDir] = useState<DirectionName | null>(null);
  const [isBoosting, setIsBoosting] = useState(false);
  const [stickOffset, setStickOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingStick, setIsDraggingStick] = useState(false);

  const joyBaseRef = useRef<HTMLDivElement>(null);
  const joyTouchIdRef = useRef<number | null>(null);

  const handleJoyStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingStick(true);

    const base = joyBaseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const point = 'touches' in e ? e.touches[0] : e;
    if ('touches' in e) {
      joyTouchIdRef.current = e.touches[0].identifier;
    }

    const rawDx = point.clientX - centerX;
    const rawDy = point.clientY - centerY;
    
    const dx = isVirtualLandscape ? rawDy : rawDx;
    const dy = isVirtualLandscape ? -rawDx : rawDy;

    updateJoyPosition(dx, dy);
  };

  const updateJoyPosition = (localDx: number, localDy: number) => {
    const maxRadius = 38;
    const dist = Math.hypot(localDx, localDy);
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(localDy, localDx);

    const clampedX = Math.cos(angle) * clampedDist;
    const clampedY = Math.sin(angle) * clampedDist;

    setStickOffset({ x: clampedX, y: clampedY });

    if (dist > 8) {
      onHeading(clampedX, clampedY);

      if (Math.abs(clampedX) > Math.abs(clampedY)) {
        setActiveDir(clampedX > 0 ? 'RIGHT' : 'LEFT');
        onDirection(clampedX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        setActiveDir(clampedY > 0 ? 'DOWN' : 'UP');
        onDirection(clampedY > 0 ? 'DOWN' : 'UP');
      }
    }
  };

  const handleJoyMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingStick) return;
    e.stopPropagation();

    const base = joyBaseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let point: { clientX: number; clientY: number } | null = null;
    if ('touches' in e) {
      for (let i = 0; i < e.touches.length; i++) {
        if (joyTouchIdRef.current === null || e.touches[i].identifier === joyTouchIdRef.current) {
          point = e.touches[i];
          break;
        }
      }
    } else {
      point = e;
    }

    if (!point) return;
    const rawDx = point.clientX - centerX;
    const rawDy = point.clientY - centerY;
    
    const dx = isVirtualLandscape ? rawDy : rawDx;
    const dy = isVirtualLandscape ? -rawDx : rawDy;

    updateJoyPosition(dx, dy);
  };

  const handleJoyEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingStick(false);
    setStickOffset({ x: 0, y: 0 });
    setActiveDir(null);
    joyTouchIdRef.current = null;
  };

  const handleBoostStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    setIsBoosting(true);
    onBoost(true);
  };

  const handleBoostEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    setIsBoosting(false);
    onBoost(false);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 select-none overflow-hidden">
      {/* Bottom-Left: Touch Thumb Stick / D-Pad */}
      <div 
        className={`absolute pointer-events-auto transition-all ${
          isLandscape 
            ? 'bottom-4 left-6 sm:left-10' 
            : 'bottom-6 left-4'
        }`}
      >
        <div
          ref={joyBaseRef}
          onTouchStart={handleJoyStart}
          onTouchMove={handleJoyMove}
          onTouchEnd={handleJoyEnd}
          onTouchCancel={handleJoyEnd}
          onMouseDown={handleJoyStart}
          onMouseMove={handleJoyMove}
          onMouseUp={handleJoyEnd}
          className="relative w-28 h-28 rounded-full bg-slate-900/60 backdrop-blur-md border-2 border-amber-500/30 flex items-center justify-center shadow-xl touch-none active:border-amber-400/80 cursor-grab"
        >
          {/* Subtle directional indicators */}
          <div className={`absolute top-2 ${activeDir === 'UP' ? 'text-amber-400 scale-125' : 'text-slate-500'} transition-all`}>
            <ArrowUp className="w-4 h-4" />
          </div>
          <div className={`absolute bottom-2 ${activeDir === 'DOWN' ? 'text-amber-400 scale-125' : 'text-slate-500'} transition-all`}>
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className={`absolute left-2 ${activeDir === 'LEFT' ? 'text-amber-400 scale-125' : 'text-slate-500'} transition-all`}>
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div className={`absolute right-2 ${activeDir === 'RIGHT' ? 'text-amber-400 scale-125' : 'text-slate-500'} transition-all`}>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Draggable Stick Knob */}
          <div
            style={{
              transform: `translate(${stickOffset.x}px, ${stickOffset.y}px)`,
              transition: isDraggingStick ? 'none' : 'transform 0.15s ease-out',
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 ${
              isDraggingStick 
                ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-yellow-200 text-slate-950 scale-110 shadow-amber-500/50' 
                : 'bg-slate-800/80 border-slate-600 text-slate-300'
            }`}
          >
            <Move className="w-5 h-5 opacity-90" />
          </div>
        </div>
      </div>

      {/* Bottom-Right: Action Cluster (Magnet, Freeze, Boost) */}
      <div 
        className={`absolute pointer-events-auto transition-all flex flex-col items-center gap-2.5 ${
          isLandscape 
            ? 'bottom-4 right-5 sm:right-8' 
            : 'bottom-6 right-3'
        }`}
      >
        {/* Play-Area Quick Powerup Buttons */}
        <div className="flex items-center gap-2">
          {onTriggerMagnet && (
            <button
              onClick={onTriggerMagnet}
              className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center border-2 shadow-lg transition-transform active:scale-95 ${
                isMagnetActive
                  ? 'bg-purple-600 border-purple-300 text-white shadow-[0_0_15px_rgba(168,85,247,0.8)] scale-105 animate-pulse'
                  : 'bg-slate-900/85 backdrop-blur-md border-purple-500/40 text-purple-300 hover:border-purple-400'
              }`}
              title="Super Magnet: Pull all nearby numbers"
            >
              <Compass className="w-5 h-5" />
              <span className="text-[7px] font-black uppercase tracking-wider">Magnet</span>
            </button>
          )}

          {onTriggerFreeze && (
            <button
              onClick={onTriggerFreeze}
              className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center border-2 shadow-lg transition-transform active:scale-95 ${
                isFreezeActive
                  ? 'bg-cyan-600 border-cyan-300 text-white shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-105 animate-pulse'
                  : 'bg-slate-900/85 backdrop-blur-md border-cyan-500/40 text-cyan-300 hover:border-cyan-400'
              }`}
              title="Time Stop: Freeze hazards & obstacles"
            >
              <Snowflake className="w-5 h-5" />
              <span className="text-[7px] font-black uppercase tracking-wider">Freeze</span>
            </button>
          )}
        </div>

        {/* Sprint Boost Button */}
        <button
          onTouchStart={handleBoostStart}
          onTouchEnd={handleBoostEnd}
          onTouchCancel={handleBoostEnd}
          onMouseDown={handleBoostStart}
          onMouseUp={handleBoostEnd}
          onMouseLeave={handleBoostEnd}
          className={`w-15 h-15 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center font-black text-[9px] tracking-wider uppercase border-2 shadow-2xl transition-transform active:scale-95 touch-none ${
            isBoosting
              ? 'bg-gradient-to-br from-amber-400 via-rose-500 to-orange-600 border-white text-white scale-105 shadow-[0_0_25px_rgba(245,158,11,0.8)]'
              : 'bg-slate-900/85 backdrop-blur-md border-amber-500/40 text-amber-300 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
          }`}
        >
          <Zap className={`w-5 h-5 ${isBoosting ? 'animate-bounce text-white' : 'text-amber-400'}`} />
          <span className="mt-0.5 leading-none font-bold">BOOST</span>
        </button>
      </div>
    </div>
  );
};
