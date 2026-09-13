import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NumberSnacksEngine, ActivePowerUpState } from './NumberSnacksEngine';
import { NumberSnacksHUD } from './NumberSnacksHUD';
import { NumberSnacksStartScreen } from './NumberSnacksStartScreen';
import { NumberSnacksGameOverModal } from './NumberSnacksGameOverModal';
import { NumberSnacksDiscoveriesModal } from './NumberSnacksDiscoveriesModal';
import { NumberSnacksMobileControls } from './NumberSnacksMobileControls';
import { useNumberSnacksStore } from './NumberSnacksStore';
import { useAdStore } from '../../store/adStore';
import { useScreenRotation } from './useScreenRotation';
import { audio } from '../../lib/audio';
import { CameraMode } from './NumberSnacksWorld';
import { Play, RotateCcw, Home, RotateCw } from 'lucide-react';

interface NumberSnacksGameProps {
  onExit: () => void;
}

export const NumberSnacksGame: React.FC<NumberSnacksGameProps> = ({ onExit }) => {
  const { stats, recordGameEnd, trackRetry } = useNumberSnacksStore();

  // Screen orientation and responsive rotation hook
  const {
    isMobile,
    isPortrait,
    isNaturalLandscape,
    isVirtualLandscape,
    viewportWidth,
    viewportHeight,
    renderWidth,
    renderHeight,
    toggleVirtualRotation,
    requestDeviceLandscape,
  } = useScreenRotation(true);

  const outerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<NumberSnacksEngine | null>(null);

  // UI States
  const [gameState, setGameState] = useState<'start' | 'playing' | 'paused' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [power, setPower] = useState(2);
  const [nextPower, setNextPower] = useState(4);
  const [progressRatio, setProgressRatio] = useState(0);
  const [currentCombo, setCurrentCombo] = useState(0);
  const [comboLabel, setComboLabel] = useState('');
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [activePowerUps, setActivePowerUps] = useState<ActivePowerUpState[]>([]);
  const [milestoneAlert, setMilestoneAlert] = useState<{ power: number; title: string } | null>(null);
  const [showDiscoveries, setShowDiscoveries] = useState(false);
  const [isMuted, setIsMuted] = useState(audio.isMuted);
  const [canSecondChance, setCanSecondChance] = useState(true);
  const [showRotateBanner, setShowRotateBanner] = useState(false);
  const [cameraMode, setCameraMode] = useState<CameraMode>('centered');

  // Final game-over run summary
  const [runSummary, setRunSummary] = useState<{
    score: number;
    power: number;
    maxCombo: number;
    snacksCollected: number;
    survivalTimeSeconds: number;
    coinsEarned: number;
    xpEarned: number;
    isNewRecord: boolean;
  } | null>(null);

  // Resize canvas to match render dimensions with devicePixelRatio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = renderWidth;
    const height = renderHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (engineRef.current) {
      engineRef.current.setViewport(width, height, dpr);
      if (!engineRef.current.isRunning || engineRef.current.isPaused) {
        engineRef.current.renderFrame();
      }
    }
  }, [renderWidth, renderHeight]);

  // Refs for callbacks to avoid re-binding engine
  const callbacksRef = useRef({
    recordGameEnd,
    setScore,
    setPower,
    setNextPower,
    setProgressRatio,
    setCurrentCombo,
    setComboLabel,
    setComboMultiplier,
    setActivePowerUps,
    setMilestoneAlert,
    setRunSummary,
    setGameState,
  });

  useEffect(() => {
    callbacksRef.current = {
      recordGameEnd,
      setScore,
      setPower,
      setNextPower,
      setProgressRatio,
      setCurrentCombo,
      setComboLabel,
      setComboMultiplier,
      setActivePowerUps,
      setMilestoneAlert,
      setRunSummary,
      setGameState,
    };
  });

  // Initialize engine once canvas is mounted
  useEffect(() => {
    if (!canvasRef.current || engineRef.current) return;

    const engine = new NumberSnacksEngine(canvasRef.current, {
      onScoreUpdate: (newScore, newPower, nextP, ratio) => {
        callbacksRef.current.setScore(newScore);
        callbacksRef.current.setPower(newPower);
        callbacksRef.current.setNextPower(nextP);
        callbacksRef.current.setProgressRatio(ratio);
      },
      onComboUpdate: (c, label, multi) => {
        callbacksRef.current.setCurrentCombo(c);
        callbacksRef.current.setComboLabel(label);
        callbacksRef.current.setComboMultiplier(multi);
      },
      onPowerUpsUpdate: (powerUps) => {
        callbacksRef.current.setActivePowerUps(powerUps);
      },
      onMilestoneAlert: (milestonePower, title) => {
        callbacksRef.current.setMilestoneAlert({ power: milestonePower, title });
        setTimeout(() => {
          callbacksRef.current.setMilestoneAlert(null);
        }, 2200);
      },
      onGameOver: (finalStats) => {
        const result = callbacksRef.current.recordGameEnd(finalStats);
        callbacksRef.current.setRunSummary({
          ...finalStats,
          coinsEarned: result.coinsEarned,
          xpEarned: result.xpEarned,
          isNewRecord: result.isNewRecord,
        });
        callbacksRef.current.setGameState('gameover');
        // Trigger AdMob on game over
        useAdStore.getState().showInterstitial('AdMob');
      },
    });

    engineRef.current = engine;

    // Apply current dimensions immediately
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      engine.setViewport(rect.width, rect.height, dpr);
    }
    
    // Force a render so the canvas isn't black before start
    engine.renderFrame?.(); // We will add renderFrame to engine or just let it sit

    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
    };
  }, []); // Only run once on mount

  // When dimensions change, update canvas
  useEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);


  // Show a brief rotation banner when virtual landscape is enabled
  useEffect(() => {
    if (isVirtualLandscape) {
      setShowRotateBanner(true);
      const timer = setTimeout(() => setShowRotateBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVirtualLandscape]);

  // Direct steering toward touch point relative to center of screen (where snake is fixed)
  const steerTowardPoint = (clientX: number, clientY: number) => {
    if (!engineRef.current || gameState !== 'playing') return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const rawDx = clientX - (rect.left + rect.width / 2);
    const rawDy = clientY - (rect.top + rect.height / 2);

    const dx = isVirtualLandscape ? rawDy : rawDx;
    const dy = isVirtualLandscape ? -rawDx : rawDy;

    if (Math.hypot(dx, dy) > 18) {
      engineRef.current.setHeading(dx, dy);
    }
  };

  // Touch & Swipe Controls with coordinate rotation support
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const point = 'touches' in e ? e.touches[0] : e;
    touchStartRef.current = { x: point.clientX, y: point.clientY };
    steerTowardPoint(point.clientX, point.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartRef.current || !engineRef.current || gameState !== 'playing') return;
    const point = 'touches' in e ? e.touches[0] : e;
    const rawDx = point.clientX - touchStartRef.current.x;
    const rawDy = point.clientY - touchStartRef.current.y;

    // Transform touch vectors if screen is virtually rotated 90deg clockwise:
    const dx = isVirtualLandscape ? rawDy : rawDx;
    const dy = isVirtualLandscape ? -rawDx : rawDy;

    const threshold = 12;
    if (Math.hypot(dx, dy) > threshold) {
      // Direct heading vector for fluid analog steering
      engineRef.current.setHeading(dx, dy);

      // Also support 4-way swipe thresholds
      if (Math.abs(dx) > Math.abs(dy)) {
        engineRef.current.setDirection(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        engineRef.current.setDirection(dy > 0 ? 'DOWN' : 'UP');
      }
    } else {
      steerTowardPoint(point.clientX, point.clientY);
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!engineRef.current || gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          engineRef.current.setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          engineRef.current.setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          engineRef.current.setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          engineRef.current.setDirection('RIGHT');
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          engineRef.current.triggerSuperMagnet();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          engineRef.current.triggerTimeStop();
          break;
        case ' ':
          e.preventDefault();
          handleTogglePause();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!engineRef.current) return;
      if (e.key === 'Shift') {
        engineRef.current.setBoost(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Start game flow
  const handleStartGame = () => {
    // Attempt device landscape lock on mobile
    requestDeviceLandscape();
    setCanSecondChance(true);
    setGameState('playing');
    if (engineRef.current) {
      engineRef.current.reset(2);
      engineRef.current.start();
    }
  };

  // Restart after game over
  const handleRestart = () => {
    trackRetry();
    setCanSecondChance(true);
    setGameState('playing');
    if (engineRef.current) {
      engineRef.current.reset(2);
      engineRef.current.start();
    }
  };

  // Second chance revive
  const handleSecondChance = () => {
    setCanSecondChance(false);
    setGameState('playing');
    if (engineRef.current) {
      engineRef.current.reviveSecondChance();
    }
  };

  // Toggle pause
  const handleTogglePause = () => {
    if (!engineRef.current) return;
    if (gameState === 'playing') {
      engineRef.current.pause();
      setGameState('paused');
    } else if (gameState === 'paused') {
      engineRef.current.resume();
      setGameState('playing');
    }
  };

  // Toggle audio
  const handleToggleMute = () => {
    audio.toggleMute();
    setIsMuted(audio.isMuted);
  };

  // Toggle camera follow / rotation mode
  const handleToggleCameraMode = () => {
    if (engineRef.current) {
      const nextMode = engineRef.current.world.toggleCameraMode();
      setCameraMode(nextMode);
      audio.click();
    }
  };

  // Calculate transformation for virtual landscape (90 deg clockwise)
  const containerStyle: React.CSSProperties = isVirtualLandscape
    ? {
        width: `${viewportHeight}px`,
        height: `${viewportWidth}px`,
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'rotate(90deg) translateY(-100%)',
        transformOrigin: 'top left',
        overflow: 'hidden',
      }
    : {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      };

  return (
    <div
      ref={outerRef}
      className="relative w-full h-full min-h-screen bg-slate-950 overflow-hidden select-none touch-none flex items-center justify-center"
    >
      {/* Rotatable Game Container */}
      <div
        ref={containerRef}
        style={containerStyle}
        className="bg-slate-950 select-none flex flex-col items-center justify-center touch-none transition-all duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        {/* 2D Canvas Viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Temporary Banner on Virtual Rotate */}
        <AnimatePresence>
          {showRotateBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-40 bg-amber-500/90 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black shadow-xl flex items-center gap-2 border border-white"
            >
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span>لینڈ اسکیپ موڈ فعال ہے (Widescreen Active)</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* In-Game HUD overlay */}
        {gameState === 'playing' && (
          <NumberSnacksHUD
            score={score}
            bestScore={stats.highestScore}
            power={power}
            nextPower={nextPower}
            progressRatio={progressRatio}
            currentCombo={currentCombo}
            comboLabel={comboLabel}
            comboMultiplier={comboMultiplier}
            activePowerUps={activePowerUps}
            isPaused={false}
            isMuted={isMuted}
            milestoneAlert={milestoneAlert}
            isRotated={isVirtualLandscape}
            cameraMode={cameraMode}
            onTogglePause={handleTogglePause}
            onToggleMute={handleToggleMute}
            onToggleRotation={toggleVirtualRotation}
            onToggleCameraMode={handleToggleCameraMode}
          />
        )}

        {/* Mobile Touch Joypad & Boost Button */}
        {gameState === 'playing' && (
          <NumberSnacksMobileControls
            onDirection={(dir) => engineRef.current?.setDirection(dir)}
            onHeading={(dx, dy) => engineRef.current?.setHeading(dx, dy)}
            onBoost={(boosting) => engineRef.current?.setBoost(boosting)}
            onTriggerMagnet={() => engineRef.current?.triggerSuperMagnet()}
            onTriggerFreeze={() => engineRef.current?.triggerTimeStop()}
            isLandscape={isNaturalLandscape || isVirtualLandscape}
            isVirtualLandscape={isVirtualLandscape}
            isMagnetActive={activePowerUps.some(p => p.type === 'magnet')}
            isFreezeActive={activePowerUps.some(p => p.type === 'slowmo')}
          />
        )}

        {/* Start Screen */}
        <AnimatePresence>
          {gameState === 'start' && (
            <NumberSnacksStartScreen
              bestScore={stats.highestScore}
              highestPower={stats.highestNumber}
              isRotated={isVirtualLandscape}
              isLandscape={isNaturalLandscape || isVirtualLandscape}
              onToggleRotation={toggleVirtualRotation}
              onStartGame={handleStartGame}
              onOpenDiscoveries={() => setShowDiscoveries(true)}
              onExit={onExit}
            />
          )}
        </AnimatePresence>

        {/* Paused Screen Overlay */}
        <AnimatePresence>
          {gameState === 'paused' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="w-full max-w-xs bg-slate-900 rounded-3xl border border-slate-700/80 p-6 flex flex-col items-center text-center shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-2">GAME PAUSED</h3>
                <p className="text-xs text-slate-400 mb-6">Take a breather, snack master!</p>

                <div className="w-full space-y-3">
                  <button
                    onClick={handleTogglePause}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>RESUME</span>
                  </button>

                  <button
                    onClick={toggleVirtualRotation}
                    className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isVirtualLandscape ? 'Switch to Portrait' : 'Rotate to Widescreen (90°)'}</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>RESTART RUN</span>
                  </button>

                  <button
                    onClick={onExit}
                    className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Home className="w-4 h-4" />
                    <span>HOME</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over Modal */}
        <AnimatePresence>
          {gameState === 'gameover' && runSummary && (
            <NumberSnacksGameOverModal
              score={runSummary.score}
              bestScore={stats.highestScore}
              power={runSummary.power}
              maxCombo={runSummary.maxCombo}
              snacksCollected={runSummary.snacksCollected}
              survivalTimeSeconds={runSummary.survivalTimeSeconds}
              coinsEarned={runSummary.coinsEarned}
              xpEarned={runSummary.xpEarned}
              isNewRecord={runSummary.isNewRecord}
              canSecondChance={canSecondChance}
              onRestart={handleRestart}
              onSecondChance={handleSecondChance}
              onExit={onExit}
            />
          )}
        </AnimatePresence>

        {/* Discoveries Catalog Modal */}
        <AnimatePresence>
          {showDiscoveries && (
            <NumberSnacksDiscoveriesModal onClose={() => setShowDiscoveries(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
