import { syncMatchResultSecure } from "../../lib/gameSync";
import { BannerAd } from "../../components/BannerAd";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCcw, Trophy, RotateCcw, Hammer, Zap, Shuffle, ShoppingBag, Play, Coins } from 'lucide-react';
import { useEconomyStore } from '../../store/economyStore';
import { useAdStore } from '../../store/adStore';
import { safeGetItem, safeSetItem } from '../../lib/safeStorage';
import { audio } from '../../lib/audio';
import { ShopModal } from '../ShopModal';
import { AnimatedTile } from '../AnimatedTile';

const SIZE = 4;
type Grid = number[][];

interface FloatingScore {
  id: number;
  text: string;
  x: number;
  y: number;
}

export function MergeNumbersGame({ onExit, onSwitchGame }: { onExit: () => void; onSwitchGame?: (game: string) => void }) {
  const [grid, setGrid] = useState<Grid>(() => getInitialGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(safeGetItem('game_merge_numbers_best', '0'), 10) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<{ grid: Grid; score: number }[]>([]);
  const [activeTool, setActiveTool] = useState<'hammer' | 'double' | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [mergedCells, setMergedCells] = useState<Set<string>>(new Set());
  const [quickPrompt, setQuickPrompt] = useState<{ type: 'undo' | 'hammer' | 'shuffle' | 'double'; cost: number } | null>(null);

  const { coins, addCoins, addXp, inventory, usePowerup, buyPowerup } = useEconomyStore();
  const { showRewardedVideo } = useAdStore();

  useEffect(() => {
    safeSetItem('game_merge_numbers_best', bestScore.toString());
  }, [bestScore]);

  // Handle game over check
  useEffect(() => {
    if (!hasMoves(grid)) {
      setGameOver(true);
      syncMatchResultSecure(score, 0, 0, 0, 0);
      const earnedCoins = Math.max(10, Math.floor(score / 10));
      const earnedXp = Math.max(5, Math.floor(score / 20));
      addCoins(earnedCoins);
      addXp(earnedXp);
      audio.play(220, 'sawtooth', 0.4, 0.15, 110);
      // Trigger AdMob on game over
      useAdStore.getState().showInterstitial('AdMob');
    }
  }, [grid]);

  function getInitialGrid(): Grid {
    let newGrid = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
    newGrid = spawnTile(spawnTile(newGrid));
    return newGrid;
  }

  function spawnTile(currentGrid: Grid): Grid {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentGrid;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  }

  function hasMoves(currentGrid: Grid): boolean {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (currentGrid[r][c] === 0) return true;
        if (c < SIZE - 1 && currentGrid[r][c] === currentGrid[r][c + 1]) return true;
        if (r < SIZE - 1 && currentGrid[r][c] === currentGrid[r + 1][c]) return true;
      }
    }
    return false;
  }

  const triggerScorePopup = (pts: number) => {
    const id = Date.now() + Math.random();
    setFloatingScores(prev => [...prev.slice(-4), {
      id,
      text: `+${pts}`,
      x: 40 + Math.random() * 20,
      y: 35 + Math.random() * 20
    }]);
    setTimeout(() => {
      setFloatingScores(prev => prev.filter(f => f.id !== id));
    }, 900);
  };

  const move = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (activeTool) {
      setActiveTool(null);
      return;
    }

    let newGrid = grid.map(row => [...row]);
    let points = 0;
    let moved = false;
    let mergeCount = 0;
    const newMerged = new Set<string>();

    const processLine = (line: number[]) => {
      let filtered = line.filter(val => val !== 0);
      let result: number[] = [];
      let mergedIndices: number[] = [];
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          const val = filtered[i] * 2;
          result.push(val);
          points += val;
          mergeCount++;
          mergedIndices.push(result.length - 1);
          i++;
        } else {
          result.push(filtered[i]);
        }
      }
      while (result.length < SIZE) result.push(0);
      return { result, mergedIndices };
    };

    if (direction === 'LEFT') {
      for (let r = 0; r < SIZE; r++) {
        const { result, mergedIndices } = processLine(newGrid[r]);
        if (newGrid[r].join(',') !== result.join(',')) moved = true;
        newGrid[r] = result;
        mergedIndices.forEach(idx => newMerged.add(`${r}-${idx}`));
      }
    } else if (direction === 'RIGHT') {
      for (let r = 0; r < SIZE; r++) {
        const reversed = [...newGrid[r]].reverse();
        const { result, mergedIndices } = processLine(reversed);
        const finalRow = [...result].reverse();
        if (newGrid[r].join(',') !== finalRow.join(',')) moved = true;
        newGrid[r] = finalRow;
        mergedIndices.forEach(idx => newMerged.add(`${r}-${SIZE - 1 - idx}`));
      }
    } else if (direction === 'UP') {
      for (let c = 0; c < SIZE; c++) {
        const col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        const { result, mergedIndices } = processLine(col);
        for (let r = 0; r < SIZE; r++) {
          if (newGrid[r][c] !== result[r]) moved = true;
          newGrid[r][c] = result[r];
        }
        mergedIndices.forEach(idx => newMerged.add(`${idx}-${c}`));
      }
    } else if (direction === 'DOWN') {
      for (let c = 0; c < SIZE; c++) {
        const col = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]];
        const { result, mergedIndices } = processLine(col);
        const finalCol = [...result].reverse();
        for (let r = 0; r < SIZE; r++) {
          if (newGrid[r][c] !== finalCol[r]) moved = true;
          newGrid[r][c] = finalCol[r];
        }
        mergedIndices.forEach(idx => newMerged.add(`${SIZE - 1 - idx}-${c}`));
      }
    }

    if (moved) {
      setMergedCells(newMerged);
      // Save for Undo history (limit to last 8 states)
      setHistory(prev => [...prev.slice(-7), { grid: grid.map(r => [...r]), score }]);
      
      newGrid = spawnTile(newGrid);
      setGrid(newGrid);
      
      if (points > 0) {
        const newScore = score + points;
        setScore(newScore);
        if (newScore > bestScore) setBestScore(newScore);
        triggerScorePopup(points);
        setStreakCount(s => s + 1);
        audio.play(440 + Math.min(600, mergeCount * 80), 'sine', 0.12, 0.1, 580);
      } else {
        setStreakCount(0);
        audio.play(260, 'triangle', 0.05, 0.05);
      }
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    switch (e.key) {
      case 'ArrowUp': move('UP'); break;
      case 'ArrowDown': move('DOWN'); break;
      case 'ArrowLeft': move('LEFT'); break;
      case 'ArrowRight': move('RIGHT'); break;
    }
  }, [grid, gameOver, activeTool]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Pointer drag handling for swipe
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartRef.current || gameOver) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) move(dx > 0 ? 'RIGHT' : 'LEFT');
    } else {
      if (Math.abs(dy) > 30) move(dy > 0 ? 'DOWN' : 'UP');
    }

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    pointerStartRef.current = null;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      pointerStartRef.current = null;
    }
  };

  // Power-up Handlers
  const handleUndo = () => {
    if (history.length === 0) return;
    const count = inventory?.undo || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'undo', cost: 200 });
      return;
    }

    if (usePowerup('undo')) {
      const lastState = history[history.length - 1];
      setGrid(lastState.grid);
      setScore(lastState.score);
      setHistory(h => h.slice(0, -1));
      setGameOver(false);
      audio.play(350, 'sine', 0.15, 0.15, 480);
    }
  };

  const handleHammerClick = () => {
    const count = inventory?.hammer || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'hammer', cost: 450 });
      return;
    }
    setActiveTool(activeTool === 'hammer' ? null : 'hammer');
    audio.click();
  };

  const handleDoubleMultiplier = () => {
    const count = inventory?.double || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'double', cost: 600 });
      return;
    }
    setActiveTool(activeTool === 'double' ? null : 'double');
    audio.click();
  };

  const handleShuffle = () => {
    const count = inventory?.shuffle || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'shuffle', cost: 350 });
      return;
    }

    if (usePowerup('shuffle')) {
      // Gather non-zero numbers
      const nonZero: number[] = [];
      grid.forEach(row => row.forEach(v => { if (v > 0) nonZero.push(v); }));
      
      // Shuffle array
      for (let i = nonZero.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nonZero[i], nonZero[j]] = [nonZero[j], nonZero[i]];
      }

      // Re-fill grid
      let idx = 0;
      const newGrid = grid.map(row => row.map(v => (v > 0 ? nonZero[idx++] : 0)));
      setGrid(newGrid);
      audio.play(500, 'sine', 0.2, 0.15, 750);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    const val = grid[r][c];
    if (val === 0) return;

    if (activeTool === 'hammer') {
      if (usePowerup('hammer')) {
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = 0;
        setGrid(newGrid);
        setActiveTool(null);
        audio.play(180, 'sawtooth', 0.25, 0.25, 60);
      }
    } else if (activeTool === 'double') {
      if (usePowerup('double')) {
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = val * 2;
        setGrid(newGrid);
        setScore(s => s + val * 2);
        setActiveTool(null);
        triggerScorePopup(val * 2);
        audio.play(520, 'sine', 0.2, 0.2, 880);
      }
    }
  };

  const handleQuickBuy = (type: 'undo' | 'hammer' | 'shuffle' | 'double', cost: number) => {
    if (coins >= cost) {
      buyPowerup(type, 1, 'coins');
      setQuickPrompt(null);
      audio.play(600, 'sine', 0.15, 0.15, 750);
    } else {
      setShowShop(true);
      setQuickPrompt(null);
    }
  };

  const handleWatchAdForPowerup = (type: 'undo' | 'hammer' | 'shuffle' | 'double') => {
    showRewardedVideo('AdMob', 'coins', 0, () => {
      useEconomyStore.getState().addPowerup(type, 1);
      setQuickPrompt(null);
      audio.play(700, 'sine', 0.2, 0.2, 900);
    });
  };

  const restart = () => {
    setGrid(getInitialGrid());
    setScore(0);
    setHistory([]);
    setGameOver(false);
    setActiveTool(null);
    setStreakCount(0);
  };

  const getTileColor = (val: number) => {
    const colors: Record<number, string> = {
      2: 'bg-gradient-to-br from-[#1e2352] to-[#12163b] text-cyan-200 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
      4: 'bg-gradient-to-br from-[#2a1a54] to-[#1a113a] text-fuchsia-200 border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.25)]',
      8: 'bg-gradient-to-br from-[#3b174a] to-[#250d32] text-pink-200 border-pink-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
      16: 'bg-gradient-to-br from-[#4d143c] to-[#300924] text-rose-200 border-rose-500/50 shadow-[0_0_18px_rgba(244,63,94,0.35)]',
      32: 'bg-gradient-to-br from-[#5e1927] to-[#3a0b14] text-red-200 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      64: 'bg-gradient-to-br from-[#662810] to-[#3d1506] text-orange-200 border-orange-500/60 shadow-[0_0_22px_rgba(249,115,22,0.45)]',
      128: 'bg-gradient-to-br from-[#6b3d0c] to-[#422304] text-amber-200 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.5)]',
      256: 'bg-gradient-to-br from-[#735308] to-[#453102] text-yellow-100 border-yellow-400 shadow-[0_0_28px_rgba(234,179,8,0.6)] ring-1 ring-yellow-300/60',
      512: 'bg-gradient-to-br from-[#0e4d46] to-[#072f2a] text-emerald-100 border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.7)] ring-1 ring-teal-300/70',
      1024: 'bg-gradient-to-br from-[#1b3d63] to-[#0b223d] text-cyan-100 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.8)] ring-2 ring-cyan-300',
      2048: 'bg-gradient-to-br from-[#3b0764] via-[#581c87] to-[#1e1b4b] text-white border-fuchsia-400 shadow-[0_0_40px_rgba(217,70,239,0.9)] ring-2 ring-fuchsia-300 animate-pulse'
    };
    return colors[val] || 'bg-gradient-to-br from-fuchsia-600 via-purple-700 to-cyan-600 text-white border-cyan-300 shadow-[0_0_45px_rgba(6,182,212,1)] ring-4 ring-amber-400 animate-pulse';
  };

  return (
    <div className="fixed inset-0 bg-[#04040e] z-[100] flex flex-col items-center pt-safe pb-safe overflow-hidden select-none">
      
      {/* Header */}
      <div className="w-full max-w-md px-6 py-3 flex items-center justify-between z-10">
        <button 
          onClick={onExit} 
          className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 uppercase tracking-widest drop-shadow">
            Merge 2048
          </h1>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {streakCount > 1 ? `🔥 ${streakCount}x Combo Streak!` : 'Swipe to slide & merge'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowShop(true)} 
            className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 hover:bg-amber-500/20 transition active:scale-95"
            title="Open Shop"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button 
            onClick={restart} 
            className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition active:scale-95"
            title="Restart"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Score Board */}
      <div className="w-full max-w-md px-6 mb-3 z-10 flex gap-3">
        <div className="flex-1 bg-black/40 border border-cyan-500/30 rounded-2xl p-3 flex flex-col items-center shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-0.5">Current Score</span>
          <span className="text-2xl font-black text-white">{score.toLocaleString()}</span>
        </div>
        <div className="flex-1 bg-black/40 border border-amber-500/30 rounded-2xl p-3 flex flex-col items-center shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-0.5 flex items-center gap-1">
            <Trophy className="w-3 h-3" /> Best Highscore
          </span>
          <span className="text-2xl font-black text-white">{bestScore.toLocaleString()}</span>
        </div>
      </div>

      {/* Interactive Powerup Bar */}
      <div className="w-full max-w-md px-6 mb-3 z-10">
        <div className="bg-[#090b24]/90 border border-white/10 rounded-2xl p-2 flex items-center justify-between gap-2 shadow-lg backdrop-blur-md">
          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all relative ${history.length > 0 ? 'bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 active:scale-95' : 'opacity-40 border border-transparent'}`}
          >
            <div className="flex items-center gap-1">
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase text-cyan-300">Undo</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">x{inventory?.undo || 0}</span>
          </button>

          {/* Hammer Button */}
          <button
            onClick={handleHammerClick}
            className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all relative ${activeTool === 'hammer' ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] border border-rose-400 scale-105' : 'bg-rose-500/10 border border-rose-500/40 hover:bg-rose-500/20 active:scale-95'}`}
          >
            <div className="flex items-center gap-1">
              <Hammer className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-black uppercase text-rose-300">Smash</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">x{inventory?.hammer || 0}</span>
          </button>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            className="flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center bg-purple-500/10 border border-purple-500/40 hover:bg-purple-500/20 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-1">
              <Shuffle className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-black uppercase text-purple-300">Shuffle</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">x{inventory?.shuffle || 0}</span>
          </button>

          {/* Double Multiplier */}
          <button
            onClick={handleDoubleMultiplier}
            className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all relative ${activeTool === 'double' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)] border border-emerald-400 scale-105' : 'bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-500/20 active:scale-95'}`}
          >
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase text-emerald-300">2x Mult</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">x{inventory?.double || 0}</span>
          </button>
        </div>

        {/* Active Tool Banner */}
        <AnimatePresence>
          {activeTool && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 py-1 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/50 flex items-center justify-between text-xs"
            >
              <span className="text-cyan-300 font-bold">
                {activeTool === 'hammer' ? '🔨 Smash Mode: Tap any tile on the board to destroy it!' : '⚡ 2x Mode: Tap any tile to double its value!'}
              </span>
              <button 
                onClick={() => setActiveTool(null)}
                className="text-white/60 hover:text-white text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/10"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Board */}
      <div 
        className="w-full max-w-md px-6 z-10 relative touch-none select-none flex-1 flex flex-col justify-center"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className="aspect-square w-full bg-[#080922] border-2 border-white/10 rounded-3xl p-3 grid grid-cols-4 grid-rows-4 gap-2.5 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden">
          
          {/* Background Grid Cells */}
          {Array(16).fill(0).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-2xl border border-white/5 shadow-inner" />
          ))}

          {/* Foreground Interactive Tiles */}
          {grid.map((row, r) => row.map((val, c) => {
            if (val === 0) return null;
            const isMerged = mergedCells.has(`${r}-${c}`);
            return (
              <div
                key={`${r}-${c}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCellClick(r, c);
                }}
                style={{
                  gridColumn: c + 1,
                  gridRow: r + 1,
                }}
                className={`w-full h-full relative cursor-pointer active:scale-95 transition-transform ${activeTool ? 'hover:scale-105 hover:ring-2 hover:ring-white animate-bounce' : ''}`}
              >
                <AnimatedTile
                  value={val}
                  isMerged={isMerged}
                  colorClass={`w-full h-full border-2 ${getTileColor(val)}`}
                  className="w-full h-full"
                />
              </div>
            );
          }))}

          {/* Floating Score Indicators */}
          {floatingScores.map(scoreItem => (
            <motion.div
              key={scoreItem.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -40, scale: 1.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ left: `${scoreItem.x}%`, top: `${scoreItem.y}%` }}
              className="absolute pointer-events-none text-amber-300 font-black text-xl drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] z-30"
            >
              {scoreItem.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Powerup Prompt Modal */}
      <AnimatePresence>
        {quickPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0b0d2a] border-2 border-cyan-500/40 rounded-3xl p-6 w-full max-w-xs text-center shadow-[0_0_40px_rgba(6,182,212,0.3)] relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 mx-auto flex items-center justify-center mb-3 text-cyan-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1">
                Out of {quickPrompt.type.toUpperCase()}!
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Refill this booster now with your earned coins or watch a fast video ad!
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleQuickBuy(quickPrompt.type, quickPrompt.cost)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Coins className="w-4 h-4 text-slate-950" /> Buy 1x ({quickPrompt.cost} Coins)
                </button>

                <button
                  onClick={() => handleWatchAdForPowerup(quickPrompt.type)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/50 text-indigo-200 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  Watch Ad for Free Refill
                </button>

                <button
                  onClick={() => setQuickPrompt(null)}
                  className="w-full py-1.5 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Modal with Cross-Game Next Recommendation */}
      <AnimatePresence>
        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0b0c28] border-2 border-rose-500/50 rounded-3xl p-6 w-full max-w-sm text-center shadow-[0_0_50px_rgba(244,63,94,0.3)] relative overflow-hidden"
            >
              <h2 className="text-3xl font-black text-rose-500 uppercase tracking-widest mb-1 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]">
                Game Over
              </h2>
              <p className="text-slate-400 font-bold mb-4 uppercase text-xs tracking-wider">No more moves possible</p>
              
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-black/50 rounded-2xl p-3 border border-white/5">
                  <div className="text-[9px] text-cyan-400 font-black uppercase tracking-widest mb-0.5">Final Score</div>
                  <div className="text-2xl font-black text-white">{score.toLocaleString()}</div>
                </div>
                <div className="bg-black/50 rounded-2xl p-3 border border-amber-500/30">
                  <div className="text-[9px] text-amber-400 font-black uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1">
                    <Coins className="w-3 h-3" /> Coins Won
                  </div>
                  <div className="text-2xl font-black text-amber-300">+{Math.max(10, Math.floor(score / 10))}</div>
                </div>
              </div>

              {/* Up Next Recommendation (Keeps user playing game after game!) */}
              <div className="bg-gradient-to-r from-[#170e38] to-[#250d3a] border border-fuchsia-500/40 rounded-2xl p-3 mb-4 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-fuchsia-300 uppercase tracking-widest">Recommended Next</span>
                  <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    +50 Bonus Coins
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white">Drop Blocks</h4>
                    <p className="text-[10px] text-slate-300">Fast-paced column dropper puzzle</p>
                  </div>
                  <button
                    onClick={() => {
                      if (onSwitchGame) onSwitchGame('mini_merge_blocks');
                      else onExit();
                    }}
                    className="px-3 py-1.5 bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Play
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={restart}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all text-sm shadow-md"
                >
                  Play Again
                </button>
                <button 
                  onClick={onExit}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest active:scale-95 transition-all text-sm"
                >
                  Hub
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BannerAd />

      {/* Shop Modal */}
      {showShop && (
        <ShopModal onClose={() => setShowShop(false)} />
      )}
    </div>
  );
}
