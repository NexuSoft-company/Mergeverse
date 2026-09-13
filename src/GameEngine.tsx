import { useAdStore } from "./store/adStore";
import { ProgressiveImage } from './components/ProgressiveImage';
import { FrontPrivateAdBanner } from "./components/FrontPrivateAdBanner";
import { BannerAd } from "./components/BannerAd";
import { DailyWinnerWidget } from "./components/DailyWinnerWidget";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MergeEngine } from './engine/GameEngine';
import { useEconomyStore } from './store/economyStore';
import { getTheme } from './themes';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, RotateCcw, Pause, Play, Trophy, Undo2, Volume2, VolumeX, Flame, HelpCircle, Star, Rocket, Gamepad2, Layers, ShieldAlert, Skull, Zap, Crown, Target, Coins, MonitorPlay, Cookie, Ghost, Hash, Swords, Gamepad, Activity, Grid3X3, Boxes, Hexagon, Bell, ShieldCheck, ShoppingBag, Hammer, Shuffle, ArrowLeftRight, ArrowLeft, ArrowDown, Clock, Sparkles } from 'lucide-react';
import { audio } from './lib/audio';
import { TutorialOverlay } from './components/TutorialOverlay';
import { NotificationsModal } from './components/NotificationsModal';
import { PolicyCenterModal } from './components/PolicyCenterModal';
import { ShopModal } from './components/ShopModal';
import { OurAppsModal } from './components/OurAppsModal';
import { AdMobBanner } from './components/AdMobBanner';
import { PowerupInventory, POWERUP_CONFIGS } from './store/economyStore';
import { useMissionStore } from './store/missionStore';
import { DailyMissionsWidget } from './components/DailyMissions';
import { ProfileSettings } from './components/ProfileSettings';
import { ParticleSystem, ParticleSystemRef } from './components/ParticleSystem';
import { AnimatedTile } from './components/AnimatedTile';
import appIconImg from './assets/images/app_icon.png';
import { safeGetItem, safeSetItem } from './lib/safeStorage';

const getHexColor = (val: number) => {
   const colors: Record<number, string> = {
      2: '#94a3b8',
      4: '#cbd5e1',
      8: '#f59e0b',
      16: '#f97316',
      32: '#ef4444',
      64: '#dc2626',
      128: '#eab308',
      256: '#facc15',
      512: '#84cc16',
      1024: '#22c55e',
      2048: '#10b981',
      4096: '#14b8a6',
      8192: '#06b6d4',
   };
   return colors[val] || '#a855f7';
};

export function Game({ 
  isOverlay, 
  onExit, 
  onMinimize, 
  themeId = 'classic', 
  isActive = true, 
  gameMode = 'classic', 
  bossType = null 
}: { 
  isOverlay: boolean; 
  onExit: () => void; 
  onMinimize: () => void; 
  themeId?: string; 
  isActive?: boolean; 
  gameMode?: 'classic' | 'survival' | 'boss' | 'drop'; 
  bossType?: string | null; 
}) {
  const { trackStat, addCoins, addXp, useEnergy, inventory, usePowerup, buyPowerup, coins, gems } = useEconomyStore();
  const { updateProgress } = useMissionStore();
  const theme = getTheme(themeId);
  
  const engineRef = useRef<MergeEngine>(new MergeEngine(4));
  const [grid, setGrid] = useState(engineRef.current.grid);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [paused, setPaused] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [comboPopups, setComboPopups] = useState<{id: number, text: string, x: number, y: number}[]>([]);
  const [movesCount, setMovesCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isMuted, setIsMuted] = useState(audio.isMuted);
  const [nextTileValue, setNextTileValue] = useState(engineRef.current.nextTileValue || 2);
  
  // Mode-specific state
  const [survivalTime, setSurvivalTime] = useState(75);
  const [survivalTimePopups, setSurvivalTimePopups] = useState<{ id: number; text: string }[]>([]);
  const [bossHp, setBossHp] = useState(25000);
  const [bossMaxHp, setBossMaxHp] = useState(25000);
  const [bossRage, setBossRage] = useState(0);
  const [bossLevel, setBossLevel] = useState(1);
  const [bossDefeated, setBossDefeated] = useState(false);
  const [bossHitFlash, setBossHitFlash] = useState(false);
  const [damagePopups, setDamagePopups] = useState<{ id: number; damage: number; isCrit: boolean }[]>([]);

  const [showShop, setShowShop] = useState(false);
  const [activeTool, setActiveTool] = useState<'hammer' | 'double' | null>(null);
  const [quickPrompt, setQuickPrompt] = useState<{ type: keyof PowerupInventory; cost: number } | null>(null);
  const [toolFeedback, setToolFeedback] = useState<string | null>(null);
  
  const particleSystemRef = useRef<ParticleSystemRef>(null);

  const sessionStatsRef = useRef({
    merges: 0,
    scoreGained: 0,
    highestTile: 0,
    combo: 0,
    startTime: Date.now()
  });

  const sendMatchResults = useCallback(() => {
     if (sessionStatsRef.current.scoreGained === 0 && sessionStatsRef.current.merges === 0) return;
     try {
        const stats = sessionStatsRef.current;
        const currentScore = engineRef.current.score;
        const finalScore = currentScore > 0 ? currentScore : stats.scoreGained;
        
        // Record match in local offline store & leaderboard
        useEconomyStore.getState().recordMatch(
          finalScore,
          stats.merges,
          stats.highestTile,
          stats.combo,
          gameMode
        );

        sessionStatsRef.current = {
          merges: 0,
          scoreGained: 0,
          highestTile: 0,
          combo: 0,
          startTime: Date.now()
        };
        
        // Trigger AdMob on match resolution
        useAdStore.getState().showInterstitial('AdMob');
     } catch (e) {
       console.error("Local match save error:", e);
     }
  }, [gameMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !gameOver) {
        setSessionTime(Math.floor((Date.now() - sessionStatsRef.current.startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [paused, gameOver]);

  // Survival Mode Timer Countdown
  useEffect(() => {
    if (gameMode !== 'survival' || paused || gameOver || !isActive) return;
    const timer = setInterval(() => {
      setSurvivalTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          audio.error();
          sendMatchResults();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameMode, paused, gameOver, isActive, sendMatchResults]);

  // Initialize
  useEffect(() => {
    let shouldInit = true;
    const cacheKey = `mergeverse_save_${gameMode}`;
    const savedLocal = safeGetItem(cacheKey, '');
    if (savedLocal) {
      try {
        const parsed = JSON.parse(savedLocal);
        const TEN_MINUTES_MS = 10 * 60 * 1000;
        
        // Ensure game is from within the last 10 minutes (only if score exists or timestamp available)
        if (!parsed.timestamp || Date.now() - parsed.timestamp <= TEN_MINUTES_MS) {
           engineRef.current.grid = parsed.grid;
           engineRef.current.score = parsed.score;
           engineRef.current.bestScore = parsed.bestScore;
           shouldInit = false;
        }
      } catch (e) {
        // Parse error, init normally
      }
    }
    
    if (shouldInit) {
       engineRef.current.init();
    }
    syncState();
    trackStat('matchesPlayed', 1);
  }, [gameMode]);

  const syncState = useCallback(() => {
    const s = engineRef.current.getState();
    const wasGameOver = gameOver;
    const wasWon = hasWon;
    setGrid([...s.grid]);
    setScore(s.score);
    setBestScore(s.bestScore);
    setCombo(s.combo);
    setGameOver(s.gameOver);
    setHasWon(s.won);
    setNextTileValue(s.nextTileValue || 2);
    setCanUndo(engineRef.current.previousState !== null);
    
    if (s.gameOver && !wasGameOver) {
      audio.error();
      useAdStore.getState().showInterstitial('AdMob');
    }
    
    if (s.won && !wasWon) {
      audio.levelUp(); // Or a specific win sound
      useAdStore.getState().showInterstitial('AdMob');
    }

    // Auto save
    safeSetItem(`mergeverse_save_${gameMode}`, JSON.stringify({
      grid: s.grid,
      score: s.score,
      bestScore: s.bestScore,
      timestamp: Date.now()
    }));
  }, [gameOver, hasWon]);

  const handleUseUndo = useCallback(() => {
    if (gameOver || paused || !canUndo) return;
    const count = inventory?.undo || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'undo', cost: 200 });
      return;
    }
    if (usePowerup('undo')) {
      if (engineRef.current.undo()) {
        syncState();
        audio.click();
        setToolFeedback('Move Undone!');
        setTimeout(() => setToolFeedback(null), 1500);
      }
    }
  }, [gameOver, paused, canUndo, inventory?.undo, usePowerup, syncState]);

  const handleUseHammer = useCallback(() => {
    if (gameOver || paused) return;
    const count = inventory?.hammer || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'hammer', cost: 450 });
      return;
    }
    setActiveTool(prev => prev === 'hammer' ? null : 'hammer');
    audio.click();
  }, [gameOver, paused, inventory?.hammer]);

  const handleUseShuffle = useCallback(() => {
    if (gameOver || paused) return;
    const count = inventory?.shuffle || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'shuffle', cost: 350 });
      return;
    }
    if (usePowerup('shuffle')) {
      if (engineRef.current.shuffleBoard()) {
        syncState();
        audio.powerUp();
        setToolFeedback('Board Shuffled! Fresh Combos Ready!');
        setTimeout(() => setToolFeedback(null), 2000);
        if (particleSystemRef.current) {
          particleSystemRef.current.triggerExplosion(0.5, 0.5, '#a855f7');
        }
      }
    }
  }, [gameOver, paused, inventory?.shuffle, usePowerup, syncState]);

  const handleUseDouble = useCallback(() => {
    if (gameOver || paused) return;
    const count = inventory?.double || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'double', cost: 600 });
      return;
    }
    setActiveTool(prev => prev === 'double' ? null : 'double');
    audio.click();
  }, [gameOver, paused, inventory?.double]);

  const handleUseSwap = useCallback(() => {
    if (gameOver || paused) return;
    const count = inventory?.swap || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'swap', cost: 150 });
      return;
    }
    if (usePowerup('swap')) {
      const newVal = engineRef.current.swapNextTile();
      setNextTileValue(newVal);
      audio.click();
      setToolFeedback(`Next tile swapped to ${newVal}!`);
      setTimeout(() => setToolFeedback(null), 1500);
    }
  }, [gameOver, paused, inventory?.swap, usePowerup]);

  const handleTileTargetClick = useCallback((r: number, c: number) => {
    if (!activeTool || gameOver || paused) return;
    const cell = engineRef.current.grid[r][c];
    if (!cell) return;

    if (activeTool === 'hammer') {
      if (usePowerup('hammer')) {
        engineRef.current.removeTile(r, c);
        setActiveTool(null);
        syncState();
        audio.drop();
        if (particleSystemRef.current) {
          const xNorm = (c + 0.5) / 4;
          const yNorm = (r + 0.5) / 4;
          particleSystemRef.current.triggerExplosion(xNorm, yNorm, '#ef4444');
        }
        setToolFeedback('Tile Smashed!');
        setTimeout(() => setToolFeedback(null), 1500);
      }
    } else if (activeTool === 'double') {
      if (usePowerup('double')) {
        engineRef.current.doubleTile(r, c);
        setActiveTool(null);
        syncState();
        audio.powerUp();
        if (particleSystemRef.current) {
          const xNorm = (c + 0.5) / 4;
          const yNorm = (r + 0.5) / 4;
          particleSystemRef.current.triggerExplosion(xNorm, yNorm, '#10b981');
        }
        setToolFeedback(`Tile Doubled to ${cell.value * 2}!`);
        setTimeout(() => setToolFeedback(null), 1500);
      }
    }
  }, [activeTool, gameOver, paused, usePowerup, syncState]);

  const postMove = useCallback((result: ReturnType<typeof engineRef.current.move>) => {
    if (result.moved) {
      setMovesCount(prev => prev + 1);
      syncState();
      
      if (engineRef.current.combo > 1) {
        const newPopup = { 
          id: Date.now(), 
          text: `${engineRef.current.combo}x Combo!`, 
          x: Math.floor(Math.random() * 60 - 30), 
          y: Math.floor(Math.random() * 60 - 30) 
        };
        setComboPopups(prev => [...prev, newPopup]);
        setTimeout(() => {
          setComboPopups(prev => prev.filter(p => p.id !== newPopup.id));
        }, 1200);
      }

      if (result.merges > 0) {
        audio.merge(engineRef.current.combo);
        if ('vibrate' in navigator) {
          navigator.vibrate(result.merges > 1 ? [30, 50, 40] : 30);
        }
        trackStat('totalMerges', result.merges);
        trackStat('maxCombo', engineRef.current.maxCombo, true);
        trackStat('totalScore', result.scoreGained); 
        trackStat('highestTile', result.highestTileGained, true);
        
        sessionStatsRef.current.merges += result.merges;
        sessionStatsRef.current.scoreGained += result.scoreGained;
        sessionStatsRef.current.highestTile = Math.max(sessionStatsRef.current.highestTile, result.highestTileGained);
        sessionStatsRef.current.combo = Math.max(sessionStatsRef.current.combo, engineRef.current.maxCombo);

        updateProgress('TOTAL_MERGERS', result.merges);
        updateProgress('REACH_COMBO', engineRef.current.combo);
        updateProgress('SCORE', result.scoreGained);
        result.mergedValues.forEach(val => {
          updateProgress('MERGE_TILE', 1, val);
        });

        // Mode: Survival bonus seconds
        if (gameMode === 'survival') {
          const bonusSeconds = result.merges * 2 + (result.highestTileGained >= 64 ? 3 : 0) + Math.min(4, engineRef.current.combo);
          setSurvivalTime(prev => Math.min(99, prev + bonusSeconds));
          const pId = Date.now() + Math.random();
          setSurvivalTimePopups(prev => [...prev.slice(-2), { id: pId, text: `+${bonusSeconds}s` }]);
          setTimeout(() => {
            setSurvivalTimePopups(prev => prev.filter(p => p.id !== pId));
          }, 1100);
        }

        // Mode: Boss combat mechanics
        if (gameMode === 'boss' && !bossDefeated) {
          const comboMult = 1 + (engineRef.current.combo * 0.35);
          const damageDealt = Math.max(150, Math.floor(result.scoreGained * comboMult));
          const isCrit = result.highestTileGained >= 64 || engineRef.current.combo > 1;

          setBossHitFlash(true);
          setTimeout(() => setBossHitFlash(false), 250);

          setBossHp(prev => {
            const nextHp = Math.max(0, prev - damageDealt);
            if (nextHp === 0) {
              setBossDefeated(true);
              audio.levelUp();
              useEconomyStore.getState().addCoins(500);
              useEconomyStore.getState().addGems(30);
              useEconomyStore.getState().trackStat('bossesDefeated', 1);
              useMissionStore.getState().updateProgress('TOTAL_MERGERS', 5);
              if (particleSystemRef.current) {
                particleSystemRef.current.triggerExplosion(0.5, 0.2, '#f43f5e');
                particleSystemRef.current.triggerExplosion(0.5, 0.2, '#fbbf24');
              }
            }
            return nextHp;
          });

          const dId = Date.now() + Math.random();
          setDamagePopups(prev => [...prev.slice(-2), { id: dId, damage: damageDealt, isCrit }]);
          setTimeout(() => {
            setDamagePopups(prev => prev.filter(p => p.id !== dId));
          }, 1100);

          setBossRage(prev => {
            const nextRage = prev + (result.merges * 12);
            if (nextRage >= 100) {
              setToolFeedback('⚠️ BOSS RAGE: Board Shockwave!');
              setTimeout(() => setToolFeedback(null), 2000);
              if (particleSystemRef.current) {
                particleSystemRef.current.triggerExplosion(0.5, 0.5, '#ef4444');
              }
              return 0;
            }
            return nextRage;
          });
        }

        if (particleSystemRef.current && result.mergedPositions) {
          result.mergedPositions.forEach(({ r, c, value }) => {
            const xNorm = (c + 0.5) / 4;
            const yNorm = (r + 0.5) / 4;
            particleSystemRef.current!.triggerExplosion(xNorm, yNorm, getHexColor(value));
          });
        }
      } else {
        audio.drop();
        if ('vibrate' in navigator) {
          navigator.vibrate(15);
        }
      }
    }
  }, [syncState, trackStat, updateProgress, gameMode, bossDefeated]);

  const handleMove = useCallback((dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    try {
      if (gameOver || paused || !isActive || gameMode === 'drop') return;
      const result = engineRef.current.move(dir);
      postMove(result);
    } catch (err) {
      console.error('[Diagnostic] Error in handleMove:', err);
    }
  }, [gameOver, paused, isActive, gameMode, postMove]);

  // Touch and Mouse Event Handling
  const interactionStartRef = useRef<{ x: number, y: number, time: number } | null>(null);
  
  const handleInteractionStart = useCallback((clientX: number, clientY: number) => {
    if (gameOver || paused || !isActive) return;
    interactionStartRef.current = { x: clientX, y: clientY, time: Date.now() };
  }, [gameOver, paused, isActive]);

  const handleInteractionEnd = useCallback((clientX: number, clientY: number, currentTarget: HTMLElement) => {
    if (!interactionStartRef.current) return;
    const dx = clientX - interactionStartRef.current.x;
    const dy = clientY - interactionStartRef.current.y;
    const dt = Date.now() - interactionStartRef.current.time;
    
    // Determine swipe vs click
    if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
      if (gameMode !== 'drop') {
        if (Math.abs(dx) > Math.abs(dy)) {
          handleMove(dx > 0 ? 'RIGHT' : 'LEFT');
        } else {
          handleMove(dy > 0 ? 'DOWN' : 'UP');
        }
      }
    } else if (dt < 500 && Math.abs(dx) < 15 && Math.abs(dy) < 15) {
      // Tap detected (for Drop Mode)
      if (gameMode === 'drop') {
         const rect = currentTarget.getBoundingClientRect();
         const x = clientX - rect.left;
         const colWidth = rect.width / 4;
         const col = Math.max(0, Math.min(3, Math.floor(x / colWidth)));
         try {
           const result = engineRef.current.drop(col);
           postMove(result);
         } catch (err) {
           console.error('[Diagnostic] Error in drop tap:', err);
         }
      }
    }
    
    interactionStartRef.current = null;
  }, [gameOver, paused, isActive, gameMode, handleMove, postMove]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches.length > 0) {
      handleInteractionEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY, e.currentTarget);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleInteractionStart(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    handleInteractionEnd(e.clientX, e.clientY, e.currentTarget);
  };

  const handleDropCol = useCallback((col: number) => {
    if (gameOver || paused || !isActive) return;
    try {
      const result = engineRef.current.drop(col);
      if (result.moved) {
        audio.click();
        postMove(result);
      } else {
        audio.error();
        setToolFeedback(`Column ${col + 1} is full! Pick another.`);
        setTimeout(() => setToolFeedback(null), 1500);
      }
    } catch (err) {
      console.error('[Diagnostic] Error in handleDropCol:', err);
    }
  }, [gameOver, paused, isActive, postMove]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': case 'w': handleMove('UP'); break;
        case 'ArrowDown': case 's': handleMove('DOWN'); break;
        case 'ArrowLeft': case 'a': handleMove('LEFT'); break;
        case 'ArrowRight': case 'd': handleMove('RIGHT'); break;
        case '1': if (gameMode === 'drop') handleDropCol(0); break;
        case '2': if (gameMode === 'drop') handleDropCol(1); break;
        case '3': if (gameMode === 'drop') handleDropCol(2); break;
        case '4': if (gameMode === 'drop') handleDropCol(3); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, handleDropCol, gameMode]);

  const restart = () => {
    sendMatchResults();
    engineRef.current.init();
    syncState();
    setPaused(false);
    setMovesCount(0);
    setSessionTime(0);
    if (gameMode === 'survival') {
      setSurvivalTime(75);
    }
    if (gameMode === 'boss') {
      setBossHp(bossMaxHp);
      setBossRage(0);
      setBossDefeated(false);
    }
    sessionStatsRef.current.startTime = Date.now();
    trackStat('matchesPlayed', 1);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 ${theme.backgroundClass} flex flex-col items-center justify-center p-4 z-50 text-white select-none`}>
      {/* Session Stats Overlay */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-100 shadow-xl z-50">
        <div className="flex items-center gap-1.5"><span className="text-white/50">TIME</span> <span className="text-white">{formatTime(sessionTime)}</span></div>
        <div className="w-px h-3 bg-white/20"></div>
        <div className="flex items-center gap-1.5"><span className="text-white/50">MOVES</span> <span className="text-white">{movesCount}</span></div>
      </div>

      {/* Streamlined Game Header */}
      <div className="w-full max-w-sm flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => { sendMatchResults(); onExit(); }} 
            className="p-2.5 bg-[#090b24]/90 border border-white/10 rounded-full hover:border-cyan-400 hover:bg-cyan-500/20 active:scale-95 transition text-slate-200"
            title="Exit to Modes"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setPaused(true)} 
            className="p-2.5 bg-[#090b24]/90 border border-white/10 rounded-full hover:border-cyan-400 hover:bg-cyan-500/20 active:scale-95 transition text-cyan-300"
            title="Pause Game"
          >
            <Pause className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsMuted(audio.toggleMute())} 
            className="p-2.5 bg-[#090b24]/90 border border-white/10 rounded-full hover:border-fuchsia-400 hover:bg-fuchsia-500/20 active:scale-95 transition text-fuchsia-300"
            title="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setShowShop(true)}
            className="p-2.5 bg-gradient-to-r from-fuchsia-600/30 to-pink-600/30 border border-fuchsia-400/50 rounded-full hover:bg-fuchsia-600/50 text-fuchsia-300 active:scale-95 transition shadow-[0_0_10px_rgba(217,70,239,0.3)]"
            title="Cosmic Shop"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">
            {score.toLocaleString()}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center justify-end gap-1">
            <Trophy className="w-3 h-3 text-amber-400" /> {bestScore.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Next Tile & Status Row */}
      <div className="w-full max-w-sm flex justify-between items-center mb-2.5 px-1">
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2.5 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Next</span>
          <div className={`w-7 h-7 rounded shrink-0 flex items-center justify-center font-black text-xs ${theme.getColor(nextTileValue)}`}>
            {nextTileValue}
          </div>
          <button
            onClick={handleUseSwap}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 active:scale-95 transition"
            title="Swap Next Tile (Reroll)"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-black/40 backdrop-blur-sm border border-amber-500/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-black text-amber-300 shadow">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{coins.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Interactive Power-Up Action Bar */}
      <div className="w-full max-w-sm mb-3 px-1 z-20">
        <div className="bg-[#090b24]/90 border border-white/10 rounded-2xl p-1.5 flex items-center justify-between gap-1 shadow-lg backdrop-blur-md">
          {/* Undo */}
          <button
            onClick={handleUseUndo}
            disabled={!canUndo}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
              canUndo
                ? 'bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 active:scale-95 text-cyan-300'
                : 'opacity-40 border border-transparent text-slate-500'
            }`}
            title="Undo Move (Item)"
          >
            <div className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[9px] font-black uppercase">Undo</span>
            </div>
            <span className="text-[8px] font-bold text-slate-400">x{inventory?.undo || 0}</span>
          </button>

          {/* Smash Hammer (Remove) */}
          <button
            onClick={handleUseHammer}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
              activeTool === 'hammer'
                ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] border border-rose-400 scale-105'
                : 'bg-rose-500/10 border border-rose-500/40 hover:bg-rose-500/20 active:scale-95 text-rose-300'
            }`}
            title="Smash / Remove Tile"
          >
            <div className="flex items-center gap-1">
              <Hammer className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[9px] font-black uppercase">Smash</span>
            </div>
            <span className="text-[8px] font-bold text-slate-400">x{inventory?.hammer || 0}</span>
          </button>

          {/* Shuffle (Combo Change) */}
          <button
            onClick={handleUseShuffle}
            className="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center bg-purple-500/10 border border-purple-500/40 hover:bg-purple-500/20 active:scale-95 transition-all text-purple-300"
            title="Shuffle Board / Combo Change"
          >
            <div className="flex items-center gap-1">
              <Shuffle className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[9px] font-black uppercase">Shuffle</span>
            </div>
            <span className="text-[8px] font-bold text-slate-400">x{inventory?.shuffle || 0}</span>
          </button>

          {/* Double Multiplier */}
          <button
            onClick={handleUseDouble}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
              activeTool === 'double'
                ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)] border border-emerald-400 scale-105'
                : 'bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-500/20 active:scale-95 text-emerald-300'
            }`}
            title="2x Double Tile Value"
          >
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[9px] font-black uppercase">2x Mult</span>
            </div>
            <span className="text-[8px] font-bold text-slate-400">x{inventory?.double || 0}</span>
          </button>

          {/* Tile Swap */}
          <button
            onClick={handleUseSwap}
            className="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 active:scale-95 transition-all text-amber-300"
            title="Swap Next Tile"
          >
            <div className="flex items-center gap-1">
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[9px] font-black uppercase">Swap</span>
            </div>
            <span className="text-[8px] font-bold text-slate-400">x{inventory?.swap || 0}</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={() => setShowShop(true)}
            className="py-1.5 px-2 rounded-xl flex flex-col items-center justify-center bg-gradient-to-r from-fuchsia-600/30 to-pink-600/30 border border-fuchsia-400/50 hover:bg-fuchsia-600/40 active:scale-95 transition-all text-fuchsia-300 shadow-sm"
            title="Open Cosmic Shop"
          >
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-fuchsia-400" />
              <span className="text-[9px] font-black uppercase">Shop</span>
            </div>
            <span className="text-[8px] font-bold text-amber-300">{coins > 9999 ? `${Math.floor(coins/1000)}k` : coins}</span>
          </button>
        </div>

        {/* Tool Active Banner */}
        <AnimatePresence>
          {activeTool && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-2 py-1.5 px-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                activeTool === 'hammer'
                  ? 'bg-rose-500/20 border-rose-400/60 text-rose-200'
                  : 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200'
              }`}
            >
              <span>
                {activeTool === 'hammer'
                  ? '🔨 Smash Mode: Tap any tile on the board to remove it!'
                  : '⚡ 2x Double: Tap any tile on the board to double its value!'}
              </span>
              <button
                onClick={() => setActiveTool(null)}
                className="text-white/70 hover:text-white text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/40 border border-white/20 ml-2 shrink-0"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Toast */}
        <AnimatePresence>
          {toolFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-1.5 py-1 px-3 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-black text-center"
            >
              {toolFeedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode Specific Headers */}
      {/* Survival Timer Bar */}
      {gameMode === 'survival' && (
        <div className="w-full max-w-sm mb-2.5 px-1">
          <div className={`p-2.5 rounded-2xl border backdrop-blur-md transition-all ${
            survivalTime <= 15
              ? 'bg-rose-950/70 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse'
              : survivalTime <= 30
              ? 'bg-amber-950/50 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
              : 'bg-emerald-950/40 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
          }`}>
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider mb-1.5">
              <div className="flex items-center gap-1.5">
                <Clock className={`w-4 h-4 ${survivalTime <= 15 ? 'text-rose-400 animate-spin' : survivalTime <= 30 ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span className="text-white">Survival Mode Timer</span>
              </div>
              <span className={`text-sm font-black font-mono ${survivalTime <= 15 ? 'text-rose-400' : survivalTime <= 30 ? 'text-amber-300' : 'text-emerald-300'}`}>
                {survivalTime}s REMAINING
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  survivalTime <= 15
                    ? 'bg-gradient-to-r from-rose-600 to-red-500'
                    : survivalTime <= 30
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                }`}
                style={{ width: `${Math.min(100, (survivalTime / 75) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Boss Raid Header */}
      {gameMode === 'boss' && (
        <div className="w-full max-w-sm mb-2.5 px-1 relative z-20">
          <div className={`p-3 rounded-2xl border backdrop-blur-md transition-all ${
            bossHitFlash
              ? 'bg-rose-600/40 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.8)] scale-[1.02]'
              : 'bg-gradient-to-r from-rose-950/70 to-indigo-950/70 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 border border-white/20 flex items-center justify-center text-white shadow-lg animate-pulse">
                  <Skull className="w-5 h-5 text-white drop-shadow" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-rose-300 flex items-center gap-1">
                    <span>CYBER OVERLORD</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-200 border border-rose-400/40 font-mono">T{bossLevel}</span>
                  </div>
                  <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider">
                    {bossDefeated ? '🎉 DEFEATED!' : 'RAID BOSS'}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-xs font-black font-mono text-rose-300 block">
                  {bossHp.toLocaleString()} / {bossMaxHp.toLocaleString()} HP
                </span>
                <span className="text-[9px] font-bold text-amber-300 font-mono">
                  RAGE: {bossRage}%
                </span>
              </div>
            </div>

            {/* Boss HP Bar */}
            <div className="w-full h-2.5 bg-black/70 rounded-full overflow-hidden border border-white/10 mb-1.5 relative">
              <div
                className="h-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-400 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                style={{ width: `${Math.max(0, (bossHp / bossMaxHp) * 100)}%` }}
              />
            </div>

            {/* Boss Rage Bar */}
            <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-amber-400 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, bossRage)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Drop Mode Dedicated Column Buttons */}
      {gameMode === 'drop' && !gameOver && !paused && (
        <div className="w-full max-w-sm mb-2 px-1 grid grid-cols-4 gap-2 z-20">
          {[0, 1, 2, 3].map((colIndex) => {
            const isFull = grid[0][colIndex] !== null;
            return (
              <button
                key={`drop-btn-${colIndex}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropCol(colIndex);
                }}
                disabled={isFull}
                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isFull
                    ? 'bg-red-500/10 border border-red-500/30 opacity-40 cursor-not-allowed text-red-400'
                    : 'bg-amber-500/15 border border-amber-400/50 hover:bg-amber-500/30 active:scale-95 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] group'
                }`}
                title={`Drop into column ${colIndex + 1}`}
              >
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-amber-400" />
                  <span className="text-[10px] font-black uppercase">Col {colIndex + 1}</span>
                </div>
                {isFull ? (
                  <span className="text-[8px] font-bold text-red-400 uppercase tracking-wider">FULL</span>
                ) : (
                  <span className="text-[8px] font-mono text-amber-200/70">DROP</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid container */}
      <div 
        className={`relative w-full max-w-sm aspect-square ${theme.boardClass} rounded-3xl p-2.5 touch-none select-none overflow-hidden shadow-2xl border border-white/10 ${gameMode === 'drop' ? 'cursor-pointer' : ''}`}
        style={{ touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Inner Playfield Layer */}
        <div className="relative w-full h-full">
          {/* Background cells (4x4) */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-full h-full p-1">
                <div className={`rounded-2xl ${theme.gridLineClass} w-full h-full shadow-inner`} />
              </div>
            ))}
          </div>

          {/* Foreground Animated Cells */}
          <div className="absolute inset-0 pointer-events-none">
            {grid.map((row, r) => 
              row.map((cell, c) => {
                if (!cell) return null;
                return (
                  <motion.div
                    key={cell.id}
                    initial={cell.isNew ? { scale: 0.1, opacity: 0 } : false}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      x: `${cell.position.c * 100}%`,
                      y: `${cell.position.r * 100}%`
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
                    className="absolute w-1/4 h-1/4 top-0 left-0 p-1 pointer-events-none z-10"
                  >
                    <AnimatedTile
                      value={cell.value}
                      isNew={cell.isNew}
                      isMerged={cell.isMerged || !!cell.mergedFrom}
                      colorClass={`w-full h-full shadow-lg border-b-4 ${theme.getColor(cell.value)}`}
                      icon={theme.getIcon ? theme.getIcon(cell.value) : undefined}
                      className="w-full h-full"
                    />
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <ParticleSystem ref={particleSystemRef} />

        {/* Interactive Power-Up Target Overlay */}
        {activeTool && (
          <div className="absolute inset-0 z-30 p-2.5 pointer-events-auto">
            <div className="relative w-full h-full grid grid-cols-4 grid-rows-4">
              {grid.map((row, r) =>
                row.map((cell, c) => (
                  <div key={`target-${r}-${c}`} className="w-full h-full p-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTileTargetClick(r, c);
                      }}
                      disabled={!cell}
                      className={`w-full h-full rounded-2xl transition-all flex items-center justify-center ${
                        cell
                          ? activeTool === 'hammer'
                            ? 'bg-rose-500/30 border-2 border-rose-400/90 hover:bg-rose-500/50 hover:scale-105 shadow-[0_0_15px_rgba(244,63,94,0.7)] cursor-pointer animate-pulse'
                            : 'bg-emerald-500/30 border-2 border-emerald-400/90 hover:bg-emerald-500/50 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.7)] cursor-pointer animate-pulse'
                          : 'opacity-0 cursor-default'
                      }`}
                      title={cell ? `${activeTool === 'hammer' ? 'Smash' : 'Double'} Tile ${cell.value}` : ''}
                    >
                      {cell && (
                        <div className={`p-2 rounded-full ${activeTool === 'hammer' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'} shadow-lg scale-110`}>
                          {activeTool === 'hammer' ? <Hammer className="w-4 h-4 animate-bounce" /> : <Zap className="w-4 h-4 animate-bounce" />}
                        </div>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Boss Damage Popups */}
        <AnimatePresence>
          {damagePopups.map(popup => (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1.25, y: -45 }}
              exit={{ opacity: 0, scale: 0.8, y: -70 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute top-1/4 inset-x-0 mx-auto flex items-center justify-center pointer-events-none z-50"
            >
              <span className={`px-3 py-1 rounded-full font-black text-sm tracking-wider uppercase shadow-xl ${
                popup.isCrit
                  ? 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-400 text-white border-2 border-white drop-shadow-[0_0_15px_rgba(244,63,94,1)]'
                  : 'bg-rose-900/90 text-rose-200 border border-rose-400/50 drop-shadow'
              }`}>
                💥 -{popup.damage.toLocaleString()} {popup.isCrit ? 'CRIT!' : ''}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Survival Time Popups */}
        <AnimatePresence>
          {survivalTimePopups.map(popup => (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, scale: 0.6, y: 0 }}
              animate={{ opacity: 1, scale: 1.2, y: -35 }}
              exit={{ opacity: 0, scale: 0.7, y: -60 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute top-1/3 inset-x-0 mx-auto flex items-center justify-center pointer-events-none z-50"
            >
              <span className="px-3 py-1 rounded-full font-black text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.9)] border border-white">
                ⏱️ {popup.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Boss Defeated Victory Modal */}
        <AnimatePresence>
          {gameMode === 'boss' && bossDefeated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 rounded-2xl"
            >
              <div className="w-full max-w-xs bg-[#0c1033] border-2 border-rose-500/60 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(244,63,94,0.4)]">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-xl mb-3 animate-bounce">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-300 to-white">
                  Boss Defeated!
                </h3>
                <p className="text-xs text-slate-300 mt-1 mb-4">
                  You conquered Tier {bossLevel} Cyber Overlord! Massive raid rewards unlocked!
                </p>
                <div className="bg-black/50 border border-white/10 rounded-2xl p-3 flex justify-around mb-4">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Reward</span>
                    <span className="text-base font-black text-amber-400 flex items-center justify-center gap-1">
                      +500 <Coins className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Gems</span>
                    <span className="text-base font-black text-fuchsia-400 flex items-center justify-center gap-1">
                      +30 <Sparkles className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setBossLevel(l => l + 1);
                      const newHp = Math.floor(bossMaxHp * 1.4);
                      setBossMaxHp(newHp);
                      setBossHp(newHp);
                      setBossRage(0);
                      setBossDefeated(false);
                      engineRef.current.init();
                      syncState();
                      audio.levelUp();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition"
                  >
                    Summon Next Boss (Tier {bossLevel + 1})
                  </button>
                  <button
                    onClick={() => { sendMatchResults(); onExit(); }}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl active:scale-95 transition"
                  >
                    Exit Raid
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dedicated Pause Modal */}
        <AnimatePresence>
          {paused && !gameOver && !hasWon && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#04040e]/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 rounded-2xl"
            >
              <div className="w-full max-w-xs bg-[#0b0e2c] border-2 border-cyan-500/40 rounded-3xl p-6 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg">
                  <Pause className="w-7 h-7" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-white">
                    Game Paused
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-1 text-xs text-slate-400 font-bold">
                    <span>Score: <b className="text-cyan-300">{score.toLocaleString()}</b></span>
                    <span>Best: <b className="text-amber-400">{bestScore.toLocaleString()}</b></span>
                  </div>
                </div>

                <div className="w-full space-y-2.5 mt-2">
                  <button
                    onClick={() => setPaused(false)}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl font-black uppercase tracking-widest text-sm text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <Play className="w-4 h-4 fill-white" /> Resume Game
                  </button>

                  <button
                    onClick={() => { restart(); setPaused(false); }}
                    className="w-full py-3 bg-[#131640] hover:bg-[#1b2059] border border-cyan-500/30 rounded-2xl font-black uppercase tracking-wider text-xs text-slate-200 flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-400" /> Restart Board
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsMuted(audio.toggleMute())}
                      className="flex-1 py-3 bg-[#131640] hover:bg-[#1b2059] border border-white/10 rounded-2xl font-black uppercase tracking-wider text-xs text-slate-300 flex items-center justify-center gap-2 active:scale-95 transition"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-fuchsia-400" />}
                      {isMuted ? 'Muted' : 'Sound On'}
                    </button>

                    <button
                      onClick={() => { setPaused(false); setShowShop(true); }}
                      className="flex-1 py-3 bg-[#131640] hover:bg-[#1b2059] border border-fuchsia-500/30 rounded-2xl font-black uppercase tracking-wider text-xs text-fuchsia-300 flex items-center justify-center gap-2 active:scale-95 transition"
                    >
                      <ShoppingBag className="w-4 h-4" /> Shop
                    </button>
                  </div>

                  <button
                    onClick={() => { sendMatchResults(); setPaused(false); onExit(); }}
                    className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl font-black uppercase tracking-wider text-xs text-rose-300 flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Exit to Menu
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dedicated Game Over / Victory Modal */}
        <AnimatePresence>
          {(gameOver || hasWon) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-[#04040e]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 rounded-2xl"
            >
              <div className="w-full max-w-xs bg-[#0b0e2c] border-2 border-fuchsia-500/50 rounded-3xl p-6 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(217,70,239,0.3)] text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                  hasWon 
                    ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300' 
                    : 'bg-rose-500/20 border border-rose-400/50 text-rose-400'
                }`}>
                  {hasWon ? <Trophy className="w-8 h-8 animate-bounce" /> : <Skull className="w-8 h-8" />}
                </div>

                <div>
                  <h3 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300">
                    {hasWon ? 'Victory!' : 'Game Over'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {gameMode === 'survival'
                      ? `Survival time expired! You lasted ${formatTime(sessionTime)}.`
                      : hasWon 
                      ? 'You reached the legendary cosmic tile!' 
                      : 'No more legal moves on the grid.'}
                  </p>
                </div>

                <div className="w-full bg-[#06081e] border border-white/10 rounded-2xl p-3 flex justify-around items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Final Score</span>
                    <span className="text-lg font-black text-cyan-300">{score.toLocaleString()}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">High Score</span>
                    <span className="text-lg font-black text-amber-400">{bestScore.toLocaleString()}</span>
                  </div>
                </div>

                <div className="w-full space-y-2 mt-1">
                  <button
                    onClick={restart}
                    className="w-full py-3.5 bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:from-fuchsia-400 hover:to-indigo-500 rounded-2xl font-black uppercase tracking-widest text-sm text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <RotateCcw className="w-4 h-4" /> Play Again
                  </button>

                  <button
                    onClick={() => { sendMatchResults(); onExit(); }}
                    className="w-full py-3 bg-[#131640] hover:bg-[#1b2059] border border-white/10 rounded-2xl font-black uppercase tracking-wider text-xs text-slate-300 flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Exit to Modes
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Combo Popups */}
        <AnimatePresence>
          {comboPopups.map(popup => (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1.2, y: popup.y }}
              exit={{ opacity: 0, scale: 0.8, y: popup.y - 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 m-auto flex items-center justify-center z-[100] text-4xl font-black italic tracking-tighter"
              style={{ left: popup.x, top: popup.y }}
            >
              <div className="relative">
                 <span className="absolute inset-0 text-black text-stroke-2 text-stroke-black z-0 pointer-events-none" aria-hidden="true" style={{ WebkitTextStroke: '6px black' }}>
                    {popup.text}
                 </span>
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] filter brightness-125 saturate-150 pointer-events-none">
                    {popup.text}
                 </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Combo Indicator */}
      <div className="h-12 mt-6 flex items-center justify-center text-xl font-black text-white/50">
        {combo > 1 && (
          <motion.div 
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            key={combo}
            className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          >
            {combo}X COMBO!
          </motion.div>
        )}
      </div>
      {isActive && <TutorialOverlay />}
      
      {/* Quick Power-Up Refill Modal */}
      <AnimatePresence>
        {quickPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#090b26] border-2 border-cyan-500/40 rounded-3xl p-6 max-w-xs w-full text-center shadow-[0_0_40px_rgba(6,182,212,0.4)] relative"
            >
              <button 
                onClick={() => setQuickPrompt(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-3 shadow-lg">
                {quickPrompt.type === 'undo' && <RotateCcw className="w-7 h-7" />}
                {quickPrompt.type === 'hammer' && <Hammer className="w-7 h-7" />}
                {quickPrompt.type === 'shuffle' && <Shuffle className="w-7 h-7" />}
                {quickPrompt.type === 'double' && <Zap className="w-7 h-7" />}
                {quickPrompt.type === 'swap' && <ArrowLeftRight className="w-7 h-7" />}
              </div>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1">
                Refill {quickPrompt.type.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                You're out of {quickPrompt.type} items. Refill now to boost your score!
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    const res = buyPowerup(quickPrompt.type, 1, 'coins');
                    if (res.success) {
                      setQuickPrompt(null);
                      setToolFeedback(res.message);
                      setTimeout(() => setToolFeedback(null), 2500);
                    } else {
                      setToolFeedback(res.message);
                    }
                  }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Coins className="w-4 h-4" /> Buy 1x ({quickPrompt.cost} Coins)
                </button>

                <button
                  onClick={() => {
                    setQuickPrompt(null);
                    setShowShop(true);
                  }}
                  className="w-full py-2.5 px-4 bg-[#121642] hover:bg-[#1a1f5c] border border-cyan-500/40 text-cyan-300 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" /> Open Cosmic Shop
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* In-Game Cosmic Shop Modal */}
      <AnimatePresence>
        {showShop && <ShopModal onClose={() => setShowShop(false)} />}
      </AnimatePresence>

      <BannerAd />
    </div>
  );
}

export function FrontPage({ 
  onPlay, 
  onSurvivalPlay, 
  onBossPlay, 
  onDropPlay, 
  onPlayMiniMergeNumbers, 
  onPlayMiniMergeBlocks, 
  onPlayMiniHexagon, 
  onPlayMiniNumberSnacks,
  hideTopBar = false
}: { 
  onPlay: () => void, 
  onSurvivalPlay: () => void, 
  onBossPlay: () => void, 
  onDropPlay: () => void, 
  onPlayMiniMergeNumbers?: () => void, 
  onPlayMiniMergeBlocks?: () => void, 
  onPlayMiniHexagon?: () => void, 
  onPlayMiniNumberSnacks?: () => void,
  hideTopBar?: boolean
}) {
  const { coins, level, xp, streak, nickname, avatarId, numberSnacksConfig } = useEconomyStore();
  const [isMuted, setIsMuted] = useState(audio.isMuted);
  const [showProfile, setShowProfile] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPolicyCenter, setShowPolicyCenter] = useState(false);
  const [showOurApps, setShowOurApps] = useState(false);
  const { notifications } = useAdStore();
  const unreadCount = notifications.filter(n => !n.read).length;
  const particleRef = useRef<ParticleSystemRef>(null);

  // Trigger ambient particles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (particleRef.current && Math.random() > 0.5) {
        const colors = ['#22d3ee', '#e879f9', '#fbbf24', '#34d399', '#f43f5e'];
        particleRef.current.triggerExplosion(
           Math.random(),
           Math.random(),
           colors[Math.floor(Math.random() * colors.length)]
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Get matching avatar
  const avatarEmoji = ['🧑‍🚀', '👽', '🤖', '👻', '🧙‍♂️', '🥷', '🧜‍♀️', '🧛‍♂️'][parseInt(avatarId) - 1] || '🧑‍🚀';

  return (
    <div className="min-h-full bg-[#03040c] flex flex-col items-center pt-8 justify-start p-6 text-white w-full max-w-md mx-auto overflow-y-auto pb-12 relative">
      {/* Animated Classic Gaming / Number Block Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0715] via-[#050616] to-[#010105]" />
        
        {/* Dynamic moving gradients */}
        <motion.div 
          animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-fuchsia-600/15 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-cyan-500/15 rounded-full blur-[120px]"
        />
        
        {/* Number Block Floating Silhouettes */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-4 w-12 h-12 bg-cyan-500/10 rounded-xl border border-cyan-500/20 rotate-12 flex items-center justify-center font-black text-cyan-500/20 text-xl blur-[1px]"
        >
          2
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-8 w-16 h-16 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20 -rotate-12 flex items-center justify-center font-black text-fuchsia-500/20 text-2xl blur-[1px]"
        >
          2048
        </motion.div>
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-amber-500/10 rounded-xl border border-amber-500/20 rotate-45 flex items-center justify-center font-black text-amber-500/20 text-3xl blur-[2px]"
        >
          8
        </motion.div>
        
        {/* Retro Gaming Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
      </div>

      <ParticleSystem ref={particleRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50" />

      {/* Top Bar for settings */}
      {!hideTopBar && (
        <div className="w-full flex justify-between items-center mb-6 z-20">
          <button 
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2.5 bg-[#080b2a]/90 backdrop-blur-md border border-cyan-500/50 rounded-full pr-4 p-1.5 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95 group"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center text-sm shadow-[0_0_10px_rgba(217,70,239,0.5)] group-hover:scale-110 transition-transform">
               {avatarEmoji}
            </div>
            <span className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 uppercase">{nickname}</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowNotifications(true)} 
              className="relative p-3 bg-[#080b2a]/90 backdrop-blur-md border border-amber-500/50 rounded-full hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all cursor-pointer text-amber-300"
              title="Notifications & Gifts"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 border-2 border-[#080b2a] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow">
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowTutorial(true)} 
              className="p-3 bg-[#080b2a]/90 backdrop-blur-md border border-cyan-500/50 rounded-full hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all cursor-pointer text-cyan-300"
              title="Tutorial"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowPolicyCenter(true)} 
              className="p-3 bg-[#080b2a]/90 backdrop-blur-md border border-emerald-500/50 rounded-full hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all cursor-pointer text-emerald-300"
              title="Privacy & Policy Center"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowOurApps(true)} 
              className="p-3 bg-[#080b2a]/90 backdrop-blur-md border border-purple-500/50 rounded-full hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all cursor-pointer text-purple-300"
              title="Our Other Games & Apps"
            >
              <Rocket className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMuted(audio.toggleMute())} 
              className="p-3 bg-[#080b2a]/90 backdrop-blur-md border border-fuchsia-500/50 rounded-full hover:border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all text-fuchsia-300"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* MergeVerse Official Logo with Floating Animation */}
      <motion.div 
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center mb-4 shrink-0 z-20"
      >
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-fuchsia-600 rounded-3xl p-0.5 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
            <ProgressiveImage 
              src={appIconImg} 
              alt="MergeVerse" 
              referrerPolicy="no-referrer"
              className="relative w-20 h-20 rounded-[1.4rem] object-cover bg-black"
            />
          </div>
        </div>
        
        <h1 className="text-3xl font-black uppercase tracking-widest mt-4 mb-0.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 drop-shadow-md">
          MergeVerse
        </h1>
        
        <div className="flex items-center gap-2 mt-0.5 bg-[#050510]/80 px-3 py-1 rounded-full border border-fuchsia-500/30 shadow-sm">
          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
          <p className="text-cyan-300 text-[8px] font-black uppercase tracking-[0.2em] drop-shadow">
            THE ULTIMATE EVOLUTION
          </p>
          <Star className="w-2.5 h-2.5 text-fuchsia-400 fill-fuchsia-400 animate-pulse" />
        </div>
      </motion.div>
      
      {/* Private Promo Ad Banner (Replaces previous stats/widgets) */}
      <FrontPrivateAdBanner />

      {/* Select Game Mode Grid */}
      <div className="w-full shrink-0 z-20 mb-5">
        <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5 px-1">
          <Gamepad2 className="w-3.5 h-3.5" /> ARCADE SELECTION
        </h3>
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* 1. Number Snacks */}
          {(!numberSnacksConfig || numberSnacksConfig.enabled) && (
            <button onClick={onPlayMiniNumberSnacks} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-yellow-500/30 rounded-[20px] shadow-[0_6px_0_rgba(234,179,8,0.2)] hover:shadow-[0_3px_0_rgba(234,179,8,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
              <Ghost className="w-8 h-8 text-yellow-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
              <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Number Snacks</span>
            </button>
          )}

          {/* 2. Merge Numbers (2048) */}
          <button onClick={onPlayMiniMergeNumbers} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-fuchsia-500/30 rounded-[20px] shadow-[0_6px_0_rgba(217,70,239,0.2)] hover:shadow-[0_3px_0_rgba(217,70,239,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
             <Grid3X3 className="w-8 h-8 text-fuchsia-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">2048 Numbers</span>
          </button>

          {/* 3. Merge Blocks */}
          <button onClick={onPlayMiniMergeBlocks} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-emerald-500/30 rounded-[20px] shadow-[0_6px_0_rgba(16,185,129,0.2)] hover:shadow-[0_3px_0_rgba(16,185,129,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
            <Boxes className="w-8 h-8 text-emerald-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Merge Blocks</span>
          </button>

          {/* 4. Hexagon Puzzle */}
          <button onClick={onPlayMiniHexagon} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-purple-500/30 rounded-[20px] shadow-[0_6px_0_rgba(168,85,247,0.2)] hover:shadow-[0_3px_0_rgba(168,85,247,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
            <Hexagon className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Hexagon Puzzle</span>
          </button>

          {/* 5. Classic Merge */}
          <button onClick={onPlay} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-cyan-500/30 rounded-[20px] shadow-[0_6px_0_rgba(6,182,212,0.2)] hover:shadow-[0_3px_0_rgba(6,182,212,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
            <Gamepad className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Classic Merge</span>
          </button>
          
          {/* 6. Drop Merge */}
          <button onClick={onDropPlay} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-amber-500/30 rounded-[20px] shadow-[0_6px_0_rgba(245,158,11,0.2)] hover:shadow-[0_3px_0_rgba(245,158,11,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
            <ArrowDown className="w-8 h-8 text-amber-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Drop Merge</span>
          </button>

          {/* 7. Survival Mode */}
          <button onClick={onSurvivalPlay} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-indigo-500/30 rounded-[20px] shadow-[0_6px_0_rgba(99,102,241,0.2)] hover:shadow-[0_3px_0_rgba(99,102,241,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
            <Flame className="w-8 h-8 text-indigo-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Survival Mode</span>
          </button>

          {/* 8. Boss Raid */}
          <button onClick={onBossPlay} className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1c29] to-[#0d0e15] border-2 border-rose-500/30 rounded-[20px] shadow-[0_6px_0_rgba(244,63,94,0.2)] hover:shadow-[0_3px_0_rgba(244,63,94,0.4)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all group relative overflow-hidden">
            <Swords className="w-8 h-8 text-rose-400 mb-2 group-hover:scale-110 group-hover:animate-pulse transition-transform drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <span className="text-[11px] font-black uppercase text-white tracking-wider drop-shadow-md">Boss Raid</span>
          </button>
        </div>
      </div>

      {/* Rewarded Ad Button */}
      <div className="w-full shrink-0 z-20 mb-5">
         <button 
           onClick={() => {
             const adStore = useAdStore.getState();
             adStore.showRewardedVideo('Unity', 'coins', 500, () => {
                useEconomyStore.getState().addCoins(500);
             });
           }}
           className="w-full relative overflow-hidden py-3 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-indigo-400/50 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white shadow-sm hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
         >
           <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-[200%] animate-shine -left-full" />
           <MonitorPlay className="w-4 h-4 text-indigo-300 group-hover:scale-110 transition-transform" />
           Watch Ad for <span className="text-amber-400 flex items-center gap-1">500 <Coins className="w-3.5 h-3.5" /></span>
         </button>
      </div>

      {/* Standard AdMob Banner Placement */}
      <div className="w-full shrink-0 z-20 mb-5">
         <AdMobBanner />
      </div>

      <AnimatePresence>
        {showProfile && <ProfileSettings onClose={() => setShowProfile(false)} />}
        {showTutorial && <TutorialOverlay forceShow={true} onClose={() => setShowTutorial(false)} />}
        {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
        {showPolicyCenter && <PolicyCenterModal onClose={() => setShowPolicyCenter(false)} />}
        {showOurApps && <OurAppsModal onClose={() => setShowOurApps(false)} />}
      </AnimatePresence>
    </div>
  );
}
