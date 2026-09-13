import { syncMatchResultSecure } from "../../lib/gameSync";
import { BannerAd } from "../../components/BannerAd";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCcw, Trophy, RotateCcw, Hammer, ArrowLeftRight, Zap, ShoppingBag, Play, Coins, Shuffle } from 'lucide-react';
import { useEconomyStore } from '../../store/economyStore';
import { useAdStore } from '../../store/adStore';
import { safeGetItem, safeSetItem } from '../../lib/safeStorage';
import { audio } from '../../lib/audio';
import { ShopModal } from '../ShopModal';
import { AnimatedTile } from '../AnimatedTile';

const GRID_SIZE = 5;

// To simulate hexagon adjacency, we use odd-r offset coordinates
const getNeighbors = (r: number, c: number): [number, number][] => {
  const neighbors: [number, number][] = [
    [r, c - 1], [r, c + 1],
    [r - 1, c], [r + 1, c]
  ];
  if (r % 2 !== 0) {
    neighbors.push([r - 1, c + 1], [r + 1, c + 1]);
  } else {
    neighbors.push([r - 1, c - 1], [r + 1, c - 1]);
  }
  return neighbors.filter(([nr, nc]) => nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE);
};

interface HistoryState {
  grid: (number | null)[][];
  score: number;
  nextBlock: number;
}

export function HexagonGame({ onExit, onSwitchGame }: { onExit: () => void; onSwitchGame?: (game: string) => void }) {
  const [grid, setGrid] = useState<(number | null)[][]>(() => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
  const [nextBlock, setNextBlock] = useState<number>(2);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(safeGetItem('game_hexagon_best', '0'), 10) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [activeTool, setActiveTool] = useState<'hammer' | 'double' | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [quickPrompt, setQuickPrompt] = useState<{ type: 'undo' | 'hammer' | 'swap' | 'double' | 'shuffle'; cost: number } | null>(null);
  const [floatingScores, setFloatingScores] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [mergedCells, setMergedCells] = useState<Set<string>>(new Set());

  const { coins, addCoins, addXp, inventory, usePowerup, buyPowerup } = useEconomyStore();
  const { showRewardedVideo } = useAdStore();

  useEffect(() => {
    safeSetItem('game_hexagon_best', bestScore.toString());
  }, [bestScore]);

  const generateBlock = () => {
    const vals = [2, 4, 8, 16];
    return vals[Math.floor(Math.random() * vals.length)];
  };

  const triggerScorePopup = (pts: number, c: number, r: number) => {
    const id = Date.now() + Math.random();
    setFloatingScores(prev => [...prev.slice(-3), {
      id,
      text: `+${pts}`,
      x: 15 + c * 16,
      y: 20 + r * 12
    }]);
    setTimeout(() => {
      setFloatingScores(prev => prev.filter(f => f.id !== id));
    }, 800);
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameOver) return;

    // Tool usage: Hammer
    if (activeTool === 'hammer') {
      if (grid[r][c] !== null) {
        audio.pop();
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = null;
        setGrid(newGrid);
        setActiveTool(null);
      }
      return;
    }

    // Tool usage: Double
    if (activeTool === 'double') {
      if (grid[r][c] !== null) {
        audio.powerUp();
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = (newGrid[r][c] as number) * 2;
        setGrid(newGrid);
        setActiveTool(null);
        triggerScorePopup(newGrid[r][c] as number, c, r);
      }
      return;
    }

    if (grid[r][c] !== null) return;

    // Save history for Undo
    setHistory(prev => [...prev.slice(-4), {
      grid: grid.map(row => [...row]),
      score,
      nextBlock
    }]);

    let newGrid = grid.map(row => [...row]);
    newGrid[r][c] = nextBlock;
    audio.tap();

    let pointsAdded = 0;
    let hasMerged = true;
    let activeCells = [{ r, c }];
    const newMerged = new Set<string>();

    while (hasMerged) {
      hasMerged = false;
      let toMerge: [number, number][] = [];
      let val = 0;
      let mergeTarget: [number, number] | null = null;

      // 1. Check around active cells first
      for (let { r: activeR, c: activeC } of activeCells) {
        if (newGrid[activeR][activeC] === null) continue;
        const myVal = newGrid[activeR][activeC] as number;

        let queue = [[activeR, activeC]];
        let visited = new Set<string>();
        visited.add(`${activeR},${activeC}`);
        let connected: [number, number][] = [[activeR, activeC]];

        while (queue.length > 0) {
          const [currR, currC] = queue.shift()!;
          const neighbors = getNeighbors(currR, currC);
          for (const [nr, nc] of neighbors) {
            if (newGrid[nr][nc] === myVal && !visited.has(`${nr},${nc}`)) {
              visited.add(`${nr},${nc}`);
              connected.push([nr, nc]);
              queue.push([nr, nc]);
            }
          }
        }

        if (connected.length >= 3) {
          toMerge = connected;
          val = myVal;
          mergeTarget = [activeR, activeC];
          break;
        }
      }

      // 2. Full sweep if needed
      if (toMerge.length === 0) {
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            if (newGrid[i][j] === null) continue;
            const myVal = newGrid[i][j] as number;

            let queue = [[i, j]];
            let visited = new Set<string>();
            visited.add(`${i},${j}`);
            let connected: [number, number][] = [[i, j]];

            while (queue.length > 0) {
              const [currR, currC] = queue.shift()!;
              const neighbors = getNeighbors(currR, currC);
              for (const [nr, nc] of neighbors) {
                if (newGrid[nr][nc] === myVal && !visited.has(`${nr},${nc}`)) {
                  visited.add(`${nr},${nc}`);
                  connected.push([nr, nc]);
                  queue.push([nr, nc]);
                }
              }
            }

            if (connected.length >= 3) {
              toMerge = connected;
              val = myVal;
              mergeTarget = [i, j];
              break;
            }
          }
          if (toMerge.length > 0) break;
        }
      }

      if (toMerge.length >= 3) {
        hasMerged = true;
        toMerge.forEach(([mr, mc]) => { newGrid[mr][mc] = null; });
        const [mr, mc] = mergeTarget!;
        newGrid[mr][mc] = val * 2;
        pointsAdded += val * 2;
        activeCells = [{ r: mr, c: mc }];
        newMerged.add(`${mr}-${mc}`);
        audio.merge();
        triggerScorePopup(val * 2, mc, mr);
      } else {
        activeCells = [];
      }
    }

    setMergedCells(newMerged);
    setGrid(newGrid);
    setNextBlock(generateBlock());

    if (pointsAdded > 0) {
      setScore(s => {
        const ns = s + pointsAdded;
        if (ns > bestScore) setBestScore(ns);
        return ns;
      });
    }

    // Check game over
    let isFull = true;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === null) isFull = false;
      }
    }

    if (isFull) {
      setGameOver(true);
      syncMatchResultSecure(score + pointsAdded, 0, 0, 0, 0);
      addCoins(Math.max(15, Math.floor((score + pointsAdded) / 10)));
      addXp(Math.max(25, Math.floor((score + pointsAdded) / 20)));
      audio.gameOver();
      // Trigger AdMob on game over
      useAdStore.getState().showInterstitial('AdMob');
    }
  };

  // Powerup Handlers
  const handleUseUndo = () => {
    if (history.length === 0) return;
    if (inventory.undo <= 0) {
      setQuickPrompt({ type: 'undo', cost: 100 });
      return;
    }
    const success = usePowerup('undo');
    if (!success) return;
    audio.click();
    const last = history[history.length - 1];
    setGrid(last.grid);
    setScore(last.score);
    setNextBlock(last.nextBlock);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleUseHammer = () => {
    if (inventory.hammer <= 0) {
      setQuickPrompt({ type: 'hammer', cost: 200 });
      return;
    }
    if (activeTool === 'hammer') {
      setActiveTool(null);
    } else {
      const success = usePowerup('hammer');
      if (success) {
        setActiveTool('hammer');
        audio.click();
      }
    }
  };

  const handleUseSwap = () => {
    if (inventory.swap <= 0) {
      setQuickPrompt({ type: 'swap', cost: 150 });
      return;
    }
    const success = usePowerup('swap');
    if (success) {
      audio.powerUp();
      const options = [4, 8, 16, 32];
      const nextChoice = options[Math.floor(Math.random() * options.length)];
      setNextBlock(nextChoice);
    }
  };

  const handleUseDouble = () => {
    if (inventory.double <= 0) {
      setQuickPrompt({ type: 'double', cost: 250 });
      return;
    }
    if (activeTool === 'double') {
      setActiveTool(null);
    } else {
      const success = usePowerup('double');
      if (success) {
        setActiveTool('double');
        audio.click();
      }
    }
  };

  const handleUseShuffle = () => {
    if (inventory.shuffle <= 0) {
      setQuickPrompt({ type: 'shuffle', cost: 350 });
      return;
    }
    const filledCoords: { r: number, c: number, val: number }[] = [];
    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell !== null) filledCoords.push({ r, c, val: cell });
      });
    });
    if (filledCoords.length <= 1) return;
    const success = usePowerup('shuffle');
    if (!success) return;
    
    // Save state to history for undo
    setHistory(prev => [...prev.slice(-10), { grid: grid.map(row => [...row]), score, nextBlock }]);
    
    const vals = filledCoords.map(f => f.val);
    for (let i = vals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [vals[i], vals[j]] = [vals[j], vals[i]];
    }
    const newGrid = grid.map(row => [...row]);
    filledCoords.forEach((coord, idx) => {
      newGrid[coord.r][coord.c] = vals[idx];
    });
    setGrid(newGrid);
    audio.powerUp();
  };

  const handleQuickBuy = (type: 'undo' | 'hammer' | 'swap' | 'double' | 'shuffle', cost: number) => {
    if (coins < cost) {
      setShowShop(true);
      setQuickPrompt(null);
      return;
    }
    const bought = buyPowerup(type, cost);
    if (bought) {
      audio.powerUp();
      setQuickPrompt(null);
    }
  };

  const handleWatchAdForPowerup = (type: 'undo' | 'hammer' | 'swap' | 'double' | 'shuffle') => {
    showRewardedVideo('Unity Ads', 'coins', 0, () => {
      useEconomyStore.getState().addPowerup(type, 1);
      audio.powerUp();
      setQuickPrompt(null);
    });
  };

  const restart = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
    setScore(0);
    setNextBlock(2);
    setGameOver(false);
    setHistory([]);
    setActiveTool(null);
    audio.click();
  };

  const getTileColor = (val: number | null) => {
    if (val === null) return 'bg-[#0f113a] border border-[#2a2d64] hover:bg-[#1a1d50]';
    const colors: Record<number, string> = {
      2: 'bg-amber-600 border-amber-400',
      4: 'bg-orange-600 border-orange-400',
      8: 'bg-rose-600 border-rose-400',
      16: 'bg-pink-600 border-pink-400',
      32: 'bg-fuchsia-600 border-fuchsia-400',
      64: 'bg-purple-600 border-purple-400',
      128: 'bg-violet-600 border-violet-400',
      256: 'bg-indigo-600 border-indigo-400',
      512: 'bg-blue-600 border-blue-400',
      1024: 'bg-cyan-600 border-cyan-400',
      2048: 'bg-teal-600 border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.8)]',
    };
    return colors[val] || 'bg-emerald-600 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse';
  };

  return (
    <div className="fixed inset-0 bg-[#04040e] z-[100] flex flex-col items-center pt-safe pb-safe overflow-hidden select-none">
      
      {/* Top Navigation Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-10">
        <button 
          onClick={onExit} 
          className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
          title="Back to Hub"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 uppercase tracking-widest drop-shadow">
            Hexa Merge
          </h1>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Connect 3 to Upgrade</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowShop(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 hover:bg-amber-500/30 transition-all text-xs font-black"
            title="Open Shop"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{coins.toLocaleString()}</span>
          </button>
          <button 
            onClick={restart} 
            className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
            title="Restart Board"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Score Board */}
      <div className="w-full max-w-md px-4 mb-3 z-10 flex gap-3">
        <div className="flex-1 bg-black/40 border border-amber-500/30 rounded-2xl p-2.5 flex flex-col items-center shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Score</span>
          <span className="text-xl font-black text-white">{score.toLocaleString()}</span>
        </div>
        <div className="flex-1 bg-black/40 border border-orange-500/30 rounded-2xl p-2.5 flex flex-col items-center shadow-[0_0_20px_rgba(249,115,22,0.15)]">
          <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-1">
            <Trophy className="w-3 h-3" /> Best
          </span>
          <span className="text-xl font-black text-white">{bestScore.toLocaleString()}</span>
        </div>
      </div>

      {/* In-Game Power-ups Bar */}
      <div className="w-full max-w-md px-4 mb-3 z-20 flex items-center justify-between gap-2">
        <button
          onClick={handleUseUndo}
          disabled={history.length === 0}
          className={`flex-1 py-2 px-1 rounded-2xl border flex flex-col items-center justify-center transition-all ${
            history.length === 0
              ? 'opacity-40 border-slate-800 bg-slate-900/40 text-slate-500'
              : 'border-cyan-500/40 bg-[#0c133a]/80 text-cyan-300 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] active:scale-95'
          }`}
          title="Undo Last Move"
        >
          <div className="flex items-center gap-1">
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px] font-black">{inventory.undo}</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">Undo</span>
        </button>

        <button
          onClick={handleUseHammer}
          className={`flex-1 py-2 px-1 rounded-2xl border flex flex-col items-center justify-center transition-all ${
            activeTool === 'hammer'
              ? 'border-rose-400 bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-105 animate-pulse'
              : 'border-rose-500/40 bg-[#250b18]/80 text-rose-300 hover:border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)] active:scale-95'
          }`}
          title="Smash any tile"
        >
          <div className="flex items-center gap-1">
            <Hammer className="w-4 h-4" />
            <span className="text-[10px] font-black">{inventory.hammer}</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">
            {activeTool === 'hammer' ? 'Tap Tile' : 'Smash'}
          </span>
        </button>

        <button
          onClick={handleUseSwap}
          className="flex-1 py-2 px-1 rounded-2xl border border-amber-500/40 bg-[#241608]/80 text-amber-300 hover:border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center transition-all active:scale-95"
          title="Swap/Reroll Next Block"
        >
          <div className="flex items-center gap-1">
            <ArrowLeftRight className="w-4 h-4" />
            <span className="text-[10px] font-black">{inventory.swap}</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">Reroll</span>
        </button>

        <button
          onClick={handleUseShuffle}
          className="flex-1 py-2 px-1 rounded-2xl border border-purple-500/40 bg-[#1c0d2b]/80 text-purple-300 hover:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)] flex flex-col items-center justify-center transition-all active:scale-95"
          title="Shuffle Board / Combo Change"
        >
          <div className="flex items-center gap-1">
            <Shuffle className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-black">{inventory.shuffle}</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">Shuffle</span>
        </button>

        <button
          onClick={handleUseDouble}
          className={`flex-1 py-2 px-1 rounded-2xl border flex flex-col items-center justify-center transition-all ${
            activeTool === 'double'
              ? 'border-emerald-400 bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)] scale-105 animate-pulse'
              : 'border-emerald-500/40 bg-[#082218]/80 text-emerald-300 hover:border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-95'
          }`}
          title="Double selected tile"
        >
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black">{inventory.double}</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">
            {activeTool === 'double' ? 'Tap 2x' : 'Double'}
          </span>
        </button>

        <button
          onClick={() => setShowShop(true)}
          className="p-2 rounded-2xl border border-fuchsia-500/40 bg-fuchsia-600/20 text-fuchsia-300 hover:bg-fuchsia-600/30 flex items-center justify-center transition-all active:scale-95"
          title="Shop Boosters"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Active Tool Mode Indicator */}
      {activeTool && (
        <div className="w-full max-w-md px-4 mb-2 z-20">
          <div className="bg-amber-500/20 border border-amber-400/50 rounded-xl py-1 px-3 flex items-center justify-between text-amber-200 text-xs font-black animate-pulse">
            <span>Tap any board tile to {activeTool === 'hammer' ? 'SMASH' : 'DOUBLE'} it!</span>
            <button onClick={() => setActiveTool(null)} className="text-white hover:text-rose-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Next Block Preview */}
      <div className="w-full max-w-md px-4 mb-4 z-10 flex items-center justify-center gap-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Tile:</span>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform rotate-45 ${getTileColor(nextBlock)}`}>
          <div className="transform -rotate-45">{nextBlock}</div>
        </div>
      </div>

      {/* Hex Grid with Floating Animations */}
      <div className="relative w-full max-w-md px-2 z-10 flex flex-col items-center justify-center flex-1">
        <div className="relative">
          {grid.map((row, r) => (
            <div 
              key={`row-${r}`} 
              className="flex justify-center -mt-2"
              style={{ paddingLeft: r % 2 !== 0 ? '36px' : '0' }}
            >
              {row.map((val, c) => {
                if (val === null) {
                  return (
                    <div
                      key={`cell-${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className="w-13 h-13 mx-1 rounded-xl transform rotate-45 flex items-center justify-center cursor-pointer transition-all border-2 border-white/5 bg-white/[0.02] hover:bg-white/[0.06]"
                    />
                  );
                }
                return (
                  <AnimatedTile
                    key={`cell-${r}-${c}`}
                    value={val}
                    isMerged={mergedCells.has(`${r}-${c}`)}
                    shape="hex"
                    colorClass={`w-full h-full border-3 ${getTileColor(val)}`}
                    className={`w-13 h-13 mx-1 cursor-pointer ${
                      activeTool ? 'hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.7)]' : ''
                    }`}
                    onClick={() => handleCellClick(r, c)}
                  />
                );
              })}
            </div>
          ))}

          {/* Floating Scores */}
          {floatingScores.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -30, scale: 1.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className="absolute pointer-events-none text-amber-300 font-black text-lg drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] z-40"
            >
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Powerup Prompt */}
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
              className="bg-[#0b0d2a] border-2 border-fuchsia-500/40 rounded-3xl p-6 w-full max-w-xs text-center shadow-[0_0_40px_rgba(217,70,239,0.3)] relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/40 mx-auto flex items-center justify-center mb-3 text-fuchsia-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1">
                Refill {quickPrompt.type.toUpperCase()}!
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Keep your merge streak alive! Buy an instant booster with coins or watch a fast video ad.
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

      {/* Game Over Modal with Cross-Game Recommendation */}
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
              className="bg-[#0a0a1a] border-2 border-rose-500/50 rounded-3xl p-6 w-full max-w-sm text-center shadow-[0_0_50px_rgba(244,63,94,0.3)] relative overflow-hidden"
            >
              <h2 className="text-3xl font-black text-rose-500 uppercase tracking-widest mb-1 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]">
                Game Over
              </h2>
              <p className="text-slate-400 font-bold mb-4 uppercase text-xs tracking-wider">Hexagon board is full!</p>
              
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-black/50 rounded-2xl p-3 border border-white/5">
                  <div className="text-[9px] text-amber-400 font-black uppercase tracking-widest mb-0.5">Final Score</div>
                  <div className="text-2xl font-black text-white">{score.toLocaleString()}</div>
                </div>
                <div className="bg-black/50 rounded-2xl p-3 border border-amber-500/30">
                  <div className="text-[9px] text-amber-400 font-black uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1">
                    <Coins className="w-3 h-3" /> Coins Earned
                  </div>
                  <div className="text-2xl font-black text-amber-300">+{Math.max(15, Math.floor(score / 10))}</div>
                </div>
              </div>

              {/* Up Next Recommendation (Play next game seamlessly!) */}
              <div className="bg-gradient-to-r from-[#170e38] to-[#250d3a] border border-cyan-500/40 rounded-2xl p-3 mb-4 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest">Recommended Next</span>
                  <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    +50 Bonus Coins
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white">Number Snacks</h4>
                    <p className="text-[10px] text-slate-300">Snake garden merge arena</p>
                  </div>
                  <button
                    onClick={() => {
                      if (onSwitchGame) onSwitchGame('mini_number_snacks');
                      else onExit();
                    }}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Play
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={restart}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all text-sm shadow-md"
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
