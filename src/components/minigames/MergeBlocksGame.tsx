import { syncMatchResultSecure } from "../../lib/gameSync";
import { BannerAd } from "../../components/BannerAd";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, RefreshCcw, Trophy, RotateCcw, Hammer, ArrowLeftRight, 
  Zap, ShoppingBag, Play, Coins, Shuffle, Bomb, Palette, Star, Sparkles 
} from 'lucide-react';
import { useEconomyStore, PowerupInventory } from '../../store/economyStore';
import { useAdStore } from '../../store/adStore';
import { safeGetItem, safeSetItem } from '../../lib/safeStorage';
import { audio } from '../../lib/audio';
import { ShopModal } from '../ShopModal';
import { AnimatedTile } from '../AnimatedTile';

const COLS = 5;
const ROWS = 7;

export interface BlockTile {
  id: string;
  val: number;
  isWildcard?: boolean;
  multiplier?: number;
}

type Grid = (BlockTile | null)[][];

interface HistoryState {
  grid: Grid;
  score: number;
  currentBlock: BlockTile;
  nextBlock: BlockTile;
}

export function MergeBlocksGame({ onExit, onSwitchGame }: { onExit: () => void; onSwitchGame?: (game: string) => void }) {
  const [grid, setGrid] = useState<Grid>(() => Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [currentBlock, setCurrentBlock] = useState<BlockTile>(() => ({
    id: 'init-1',
    val: 2,
  }));
  const [nextBlock, setNextBlock] = useState<BlockTile>(() => ({
    id: 'init-2',
    val: 4,
  }));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(safeGetItem('game_merge_blocks_best', '0'), 10) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [activeTool, setActiveTool] = useState<'bomb' | 'colorChange' | 'hammer' | 'double' | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [quickPrompt, setQuickPrompt] = useState<{ type: keyof PowerupInventory; cost: number } | null>(null);
  const [floatingScores, setFloatingScores] = useState<{ id: number; text: string; x: number; y: number; isSpecial?: boolean }[]>([]);
  const [mergedCells, setMergedCells] = useState<Set<string>>(new Set());
  const [bombExplosionCoords, setBombExplosionCoords] = useState<{ r: number; c: number } | null>(null);
  const [isBoardShaking, setIsBoardShaking] = useState(false);

  const { coins, addCoins, addXp, inventory, usePowerup, buyPowerup } = useEconomyStore();
  const { showRewardedVideo } = useAdStore();

  useEffect(() => {
    safeSetItem('game_merge_blocks_best', bestScore.toString());
  }, [bestScore]);

  // Block Spawner with Special Blocks: Wildcard (★) & Multiplier (2X)
  const generateBlock = (forceType?: 'wildcard' | 'multiplier'): BlockTile => {
    const vals = [2, 4, 8, 16, 32, 64];
    const maxIdx = Math.min(3 + Math.floor(score / 5000), vals.length);
    const baseVal = vals[Math.floor(Math.random() * maxIdx)];
    const id = `tile-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    if (forceType === 'wildcard') {
      return { id, val: baseVal, isWildcard: true };
    }
    if (forceType === 'multiplier') {
      return { id, val: baseVal, multiplier: 2 };
    }

    const roll = Math.random();
    // ~8% chance for Wildcard block
    if (roll < 0.08) {
      return { id, val: baseVal, isWildcard: true };
    }
    // ~8% chance for Multiplier block
    if (roll < 0.16) {
      return { id, val: baseVal, multiplier: 2 };
    }

    return { id, val: baseVal };
  };

  const triggerScorePopup = (pts: number, c: number, r: number, customText?: string) => {
    const id = Date.now() + Math.random();
    setFloatingScores(prev => [...prev.slice(-4), {
      id,
      text: customText || `+${pts}`,
      x: 10 + c * 18,
      y: 10 + r * 12,
      isSpecial: Boolean(customText)
    }]);
    setTimeout(() => {
      setFloatingScores(prev => prev.filter(f => f.id !== id));
    }, 900);
  };

  // Helper: check if two tiles can merge
  const canMerge = (a: BlockTile | null, b: BlockTile | null): boolean => {
    if (!a || !b) return false;
    if (a.isWildcard || b.isWildcard) return true;
    return a.val === b.val;
  };

  // Helper: calculate merge result with Wildcard and Multiplier support
  const calculateMerge = (
    source: BlockTile,
    target: BlockTile
  ): { result: BlockTile; points: number; tag: string } => {
    let baseVal: number;
    const isWild = Boolean(source.isWildcard || target.isWildcard);
    if (source.isWildcard && !target.isWildcard) {
      baseVal = target.val;
    } else if (!source.isWildcard && target.isWildcard) {
      baseVal = source.val;
    } else if (source.isWildcard && target.isWildcard) {
      baseVal = Math.max(source.val, target.val, 32);
    } else {
      baseVal = target.val;
    }

    const multi = Math.max(source.multiplier || 1, target.multiplier || 1);
    const isMulti = multi > 1;

    // "Multiplier block that doubles the value of the next merge"
    const finalVal = isMulti ? baseVal * 4 : baseVal * 2;
    const points = finalVal * (isMulti ? 2 : 1);

    let tag = `+${points}`;
    if (isWild && isMulti) tag = `⚡★ WILD 2X! +${points}`;
    else if (isWild) tag = `★ WILD! +${points}`;
    else if (isMulti) tag = `⚡ 2X! +${points}`;

    return {
      result: {
        id: `tile-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        val: finalVal,
      },
      points,
      tag,
    };
  };

  const handleColumnClick = async (colIndex: number) => {
    if (gameOver || isProcessing) return;

    if (activeTool) {
      setActiveTool(null);
      return;
    }

    // Find the lowest empty row in this column
    let targetRow = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (grid[r][colIndex] === null) {
        targetRow = r;
        break;
      }
    }

    if (targetRow === -1) {
      setGameOver(true);
      syncMatchResultSecure(score, 0, 0, 0, 0);
      addCoins(Math.max(10, Math.floor(score / 10)));
      addXp(Math.max(5, Math.floor(score / 20)));
      audio.play(200, 'sawtooth', 0.3, 0.2, 90);
      useAdStore.getState().showInterstitial('AdMob');
      return;
    }

    // Save undo state
    setHistory(prev => [...prev.slice(-6), {
      grid: grid.map(row => row.map(cell => cell ? { ...cell } : null)),
      score,
      currentBlock: { ...currentBlock },
      nextBlock: { ...nextBlock }
    }]);

    setIsProcessing(true);
    let newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
    newGrid[targetRow][colIndex] = { ...currentBlock };
    setGrid(newGrid);

    audio.play(380, 'sine', 0.08, 0.08);

    // Shift to next block
    setCurrentBlock(nextBlock);
    setNextBlock(generateBlock());

    // Process merges
    await processMerges(newGrid, targetRow, colIndex);
  };

  const processMerges = async (currentGrid: Grid, activeRow: number, activeCol: number) => {
    let tempGrid = currentGrid.map(row => row.map(cell => cell ? { ...cell } : null));
    let pointsAdded = 0;
    
    let activeBlocks = [{ r: activeRow, c: activeCol }];
    let isStable = false;
    
    while (!isStable) {
       isStable = true;
       let nextActiveBlocks: { r: number; c: number }[] = [];
       let mergeHappened = false;
       
       // 1. Try to merge active blocks first
       for (let i = 0; i < activeBlocks.length; i++) {
          let { r, c } = activeBlocks[i];
          if (tempGrid[r][c] === null) continue;
          
          let sourceTile = tempGrid[r][c]!;
          let merged = false;
          
          // Down
          if (r < ROWS - 1 && canMerge(sourceTile, tempGrid[r + 1][c])) {
             const { result, points, tag } = calculateMerge(sourceTile, tempGrid[r + 1][c]!);
             tempGrid[r + 1][c] = result;
             tempGrid[r][c] = null;
             pointsAdded += points;
             triggerScorePopup(points, c, r + 1, tag);
             nextActiveBlocks.push({ r: r + 1, c });
             setMergedCells(prev => new Set([...prev, `${r + 1}-${c}`]));
             merged = true;
          }
          // Left merges INTO this block
          else if (!merged && c > 0 && canMerge(sourceTile, tempGrid[r][c - 1])) {
             const { result, points, tag } = calculateMerge(tempGrid[r][c - 1]!, sourceTile);
             tempGrid[r][c] = result;
             tempGrid[r][c - 1] = null;
             pointsAdded += points;
             triggerScorePopup(points, c, r, tag);
             nextActiveBlocks.push({ r, c });
             setMergedCells(prev => new Set([...prev, `${r}-${c}`]));
             merged = true;
          }
          // Right merges INTO this block
          else if (!merged && c < COLS - 1 && canMerge(sourceTile, tempGrid[r][c + 1])) {
             const { result, points, tag } = calculateMerge(tempGrid[r][c + 1]!, sourceTile);
             tempGrid[r][c] = result;
             tempGrid[r][c + 1] = null;
             pointsAdded += points;
             triggerScorePopup(points, c, r, tag);
             nextActiveBlocks.push({ r, c });
             setMergedCells(prev => new Set([...prev, `${r}-${c}`]));
             merged = true;
          }
          // Up merges INTO this block
          else if (!merged && r > 0 && canMerge(sourceTile, tempGrid[r - 1][c])) {
             const { result, points, tag } = calculateMerge(tempGrid[r - 1][c]!, sourceTile);
             tempGrid[r][c] = result;
             tempGrid[r - 1][c] = null;
             pointsAdded += points;
             triggerScorePopup(points, c, r, tag);
             nextActiveBlocks.push({ r, c });
             setMergedCells(prev => new Set([...prev, `${r}-${c}`]));
             merged = true;
          }
          
          if (merged) {
             mergeHappened = true;
             isStable = false;
             audio.play(480 + Math.min(400, sourceTile.val * 4), 'sine', 0.12, 0.1, 620);
             break;
          }
       }
       
       // 2. Full sweep for any other adjacent merges
       if (!mergeHappened) {
           for (let r = ROWS - 1; r >= 0; r--) {
               for (let c = 0; c < COLS; c++) {
                   if (tempGrid[r][c] === null) continue;
                   let sourceTile = tempGrid[r][c]!;
                   if (r < ROWS - 1 && canMerge(sourceTile, tempGrid[r + 1][c])) {
                       const { result, points, tag } = calculateMerge(sourceTile, tempGrid[r + 1][c]!);
                       tempGrid[r + 1][c] = result;
                       tempGrid[r][c] = null;
                       pointsAdded += points;
                       triggerScorePopup(points, c, r + 1, tag);
                       nextActiveBlocks.push({ r: r + 1, c });
                       setMergedCells(prev => new Set([...prev, `${r + 1}-${c}`]));
                       mergeHappened = true;
                       isStable = false;
                       audio.play(540, 'sine', 0.12, 0.1, 680);
                       break;
                   } else if (c < COLS - 1 && canMerge(sourceTile, tempGrid[r][c + 1])) {
                       const { result, points, tag } = calculateMerge(tempGrid[r][c + 1]!, sourceTile);
                       tempGrid[r][c] = result;
                       tempGrid[r][c + 1] = null;
                       pointsAdded += points;
                       triggerScorePopup(points, c, r, tag);
                       nextActiveBlocks.push({ r, c });
                       setMergedCells(prev => new Set([...prev, `${r}-${c}`]));
                       mergeHappened = true;
                       isStable = false;
                       audio.play(540, 'sine', 0.12, 0.1, 680);
                       break;
                   }
               }
               if (mergeHappened) break;
           }
       }

       if (mergeHappened) {
           setGrid(tempGrid.map(row => row.map(cell => cell ? { ...cell } : null)));
           await new Promise(res => setTimeout(res, 130));
       }

       // 3. Apply gravity
       let gravityHappened = false;
       for (let c = 0; c < COLS; c++) {
           let col: (BlockTile | null)[] = [];
           for (let r = 0; r < ROWS; r++) {
               if (tempGrid[r][c] !== null) col.push(tempGrid[r][c]);
           }
           let newCol: (BlockTile | null)[] = [];
           while (newCol.length + col.length < ROWS) newCol.push(null);
           newCol = newCol.concat(col);
           
           for (let r = 0; r < ROWS; r++) {
               if (tempGrid[r][c]?.id !== newCol[r]?.id) {
                   tempGrid[r][c] = newCol[r];
                   if (newCol[r] !== null) {
                       if (!nextActiveBlocks.some(b => b.r === r && b.c === c)) {
                           nextActiveBlocks.push({ r, c });
                       }
                       gravityHappened = true;
                       isStable = false;
                   }
               }
           }
       }
       
       if (gravityHappened) {
           setGrid(tempGrid.map(row => row.map(cell => cell ? { ...cell } : null)));
           await new Promise(res => setTimeout(res, 130));
       }
       
       activeBlocks = nextActiveBlocks;
    }

    if (pointsAdded > 0) {
       setScore(s => {
         const ns = s + pointsAdded;
         if (ns > bestScore) setBestScore(ns);
         return ns;
       });
    }

    // Check if full
    if (tempGrid[0].some(val => val !== null)) {
       setGameOver(true);
       syncMatchResultSecure(score + pointsAdded, 0, 0, 0, 0);
       addCoins(Math.max(10, Math.floor((score + pointsAdded) / 10)));
       addXp(Math.max(5, Math.floor((score + pointsAdded) / 20)));
       useAdStore.getState().showInterstitial('AdMob');
    }
    
    setIsProcessing(false);
  };

  // Power-up 1: BOMB (Clears 3x3 blast area)
  const handleBombClick = () => {
    const count = inventory?.bomb || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'bomb', cost: 500 });
      return;
    }
    setActiveTool(activeTool === 'bomb' ? null : 'bomb');
    audio.click();
  };

  // Power-up 2: COLOR CHANGE (Allows block to merge with any color/number)
  const handleColorChangeClick = () => {
    const count = inventory?.colorChange || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'colorChange', cost: 400 });
      return;
    }
    setActiveTool(activeTool === 'colorChange' ? null : 'colorChange');
    audio.click();
  };

  // Power-up 3: HAMMER (Smashes single tile)
  const handleHammerClick = () => {
    const count = inventory?.hammer || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'hammer', cost: 450 });
      return;
    }
    setActiveTool(activeTool === 'hammer' ? null : 'hammer');
    audio.click();
  };

  // Power-up 4: 2X MULTIPLIER BOOST
  const handleDoubleMultiplier = () => {
    const count = inventory?.double || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'double', cost: 600 });
      return;
    }
    setActiveTool(activeTool === 'double' ? null : 'double');
    audio.click();
  };

  // Power-up 5: TILE SWAP (Swap current Ready with Next)
  const handleTileSwap = () => {
    if (isProcessing) return;
    const count = inventory?.swap || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'swap', cost: 150 });
      return;
    }

    if (usePowerup('swap')) {
      const cur = { ...currentBlock };
      setCurrentBlock({ ...nextBlock });
      setNextBlock(cur);
      audio.play(440, 'sine', 0.15, 0.12, 550);
    }
  };

  // Power-up 6: BOARD SHUFFLE
  const handleShuffle = () => {
    if (isProcessing) return;
    const count = inventory?.shuffle || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'shuffle', cost: 350 });
      return;
    }
    const filledCoords: { r: number; c: number; tile: BlockTile }[] = [];
    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell !== null) filledCoords.push({ r, c, tile: { ...cell } });
      });
    });
    if (filledCoords.length <= 1) return;
    if (usePowerup('shuffle')) {
      setHistory(h => [...h.slice(-10), { 
        grid: grid.map(row => row.map(cell => cell ? { ...cell } : null)), 
        score, 
        currentBlock: { ...currentBlock }, 
        nextBlock: { ...nextBlock } 
      }]);
      
      const tiles = filledCoords.map(f => f.tile);
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
      const newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
      filledCoords.forEach((coord, idx) => {
        newGrid[coord.r][coord.c] = tiles[idx];
      });
      setGrid(newGrid);
      audio.play(520, 'sine', 0.2, 0.15, 680);
    }
  };

  // Power-up 7: UNDO
  const handleUndo = () => {
    if (history.length === 0 || isProcessing) return;
    const count = inventory?.undo || 0;
    if (count <= 0) {
      setQuickPrompt({ type: 'undo', cost: 200 });
      return;
    }

    if (usePowerup('undo')) {
      const last = history[history.length - 1];
      setGrid(last.grid.map(row => row.map(cell => cell ? { ...cell } : null)));
      setScore(last.score);
      setCurrentBlock({ ...last.currentBlock });
      setNextBlock({ ...last.nextBlock });
      setHistory(h => h.slice(0, -1));
      audio.play(340, 'sine', 0.15, 0.15, 280);
    }
  };

  // Apply Color Change to Ready block
  const handleColorMorphReadyBlock = () => {
    if (activeTool !== 'colorChange') return;
    if (usePowerup('colorChange')) {
      setCurrentBlock(prev => ({ ...prev, isWildcard: true }));
      setActiveTool(null);
      audio.play(650, 'sine', 0.25, 0.15, 950);
      triggerScorePopup(0, 0, 0, '🌈 READY BLOCK MORPHED!');
    }
  };

  // Handle cell click when a power-up tool is active
  const handleCellClickWithTool = async (r: number, c: number) => {
    if (!activeTool || isProcessing) return;
    const targetTile = grid[r][c];

    // 1. Bomb Power-up (Clears 3x3 blast area)
    if (activeTool === 'bomb') {
      if (usePowerup('bomb')) {
        // Save undo
        setHistory(prev => [...prev.slice(-6), {
          grid: grid.map(row => row.map(cell => cell ? { ...cell } : null)),
          score,
          currentBlock: { ...currentBlock },
          nextBlock: { ...nextBlock }
        }]);

        let newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
        let destroyedCount = 0;
        let blastPoints = 0;

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
              if (newGrid[nr][nc] !== null) {
                blastPoints += Math.max(150, newGrid[nr][nc]!.val);
                destroyedCount++;
                newGrid[nr][nc] = null;
              }
            }
          }
        }

        if (blastPoints === 0) blastPoints = 200;

        setActiveTool(null);
        setBombExplosionCoords({ r, c });
        setIsBoardShaking(true);
        setTimeout(() => {
          setBombExplosionCoords(null);
          setIsBoardShaking(false);
        }, 500);

        audio.play(110, 'sawtooth', 0.45, 0.3, 25);
        triggerScorePopup(blastPoints, c, r, `💥 BOOM! +${blastPoints}`);
        setScore(s => s + blastPoints);

        // Apply gravity to all columns
        for (let colIdx = 0; colIdx < COLS; colIdx++) {
          let col: (BlockTile | null)[] = [];
          for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
            if (newGrid[rowIdx][colIdx] !== null) col.push(newGrid[rowIdx][colIdx]);
          }
          let newCol: (BlockTile | null)[] = [];
          while (newCol.length + col.length < ROWS) newCol.push(null);
          newCol = newCol.concat(col);
          for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
            newGrid[rowIdx][colIdx] = newCol[rowIdx];
          }
        }

        setGrid(newGrid);
        setIsProcessing(true);
        await processMerges(newGrid, r, c);
      }
      return;
    }

    // Tools below require clicking a non-empty cell
    if (targetTile === null) return;

    // 2. Color Change Power-up (Morphs cell to Omni-Color Wildcard to merge with any color/number)
    if (activeTool === 'colorChange') {
      if (usePowerup('colorChange')) {
        setHistory(prev => [...prev.slice(-6), {
          grid: grid.map(row => row.map(cell => cell ? { ...cell } : null)),
          score,
          currentBlock: { ...currentBlock },
          nextBlock: { ...nextBlock }
        }]);

        let newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
        newGrid[r][c] = {
          id: `wild-${Date.now()}`,
          val: targetTile.val,
          isWildcard: true,
        };

        setActiveTool(null);
        audio.play(650, 'sine', 0.25, 0.15, 950);
        triggerScorePopup(0, c, r, '🌈 COLOR MORPH!');
        setGrid(newGrid);
        setIsProcessing(true);
        await processMerges(newGrid, r, c);
      }
      return;
    }

    // 3. Hammer Power-up (Smashes single tile)
    if (activeTool === 'hammer') {
      if (usePowerup('hammer')) {
        let newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
        newGrid[r][c] = null;
        setActiveTool(null);
        audio.play(160, 'sawtooth', 0.25, 0.2, 50);

        // Apply gravity to column
        let col: (BlockTile | null)[] = [];
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
          if (newGrid[rowIdx][c] !== null) col.push(newGrid[rowIdx][c]);
        }
        let newCol: (BlockTile | null)[] = [];
        while (newCol.length + col.length < ROWS) newCol.push(null);
        newCol = newCol.concat(col);
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
          newGrid[rowIdx][c] = newCol[rowIdx];
        }

        setGrid(newGrid);
        setIsProcessing(true);
        await processMerges(newGrid, r, c);
      }
      return;
    }

    // 4. Double Multiplier Power-up (Doubles value and adds multiplier boost)
    if (activeTool === 'double') {
      if (usePowerup('double')) {
        let newGrid = grid.map(row => row.map(cell => cell ? { ...cell } : null));
        const doubledVal = targetTile.val * 2;
        newGrid[r][c] = {
          id: `boost-${Date.now()}`,
          val: doubledVal,
          multiplier: 2,
        };
        setScore(s => s + doubledVal);
        triggerScorePopup(doubledVal, c, r, `⚡ 2X! +${doubledVal}`);
        setActiveTool(null);
        audio.play(540, 'sine', 0.2, 0.2, 850);
        setGrid(newGrid);
        setIsProcessing(true);
        await processMerges(newGrid, r, c);
      }
      return;
    }
  };

  const handleQuickBuy = (type: keyof PowerupInventory, cost: number) => {
    if (coins >= cost) {
      buyPowerup(type, 1, 'coins');
      setQuickPrompt(null);
      audio.play(600, 'sine', 0.15, 0.15, 750);
    } else {
      setShowShop(true);
      setQuickPrompt(null);
    }
  };

  const handleWatchAdForPowerup = (type: keyof PowerupInventory) => {
    showRewardedVideo('AdMob', 'coins', 0, () => {
      useEconomyStore.getState().addPowerup(type, 1);
      setQuickPrompt(null);
      audio.play(700, 'sine', 0.2, 0.2, 900);
    });
  };

  const restart = () => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setScore(0);
    setCurrentBlock({ id: 'init-1', val: 2 });
    setNextBlock({ id: 'init-2', val: 4 });
    setGameOver(false);
    setIsProcessing(false);
    setHistory([]);
    setActiveTool(null);
    setBombExplosionCoords(null);
  };

  const getTileColor = (tile: BlockTile | null) => {
    if (tile === null) return 'bg-white/5 border border-white/5';
    
    // Wildcard block special prismatic styling
    if (tile.isWildcard) {
      return 'bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-500 border-yellow-300 text-white shadow-[0_0_30px_rgba(217,70,239,0.9)] ring-2 ring-yellow-400 animate-pulse';
    }

    // Multiplier block special golden electric styling
    if (tile.multiplier && tile.multiplier > 1) {
      return 'bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-500 border-amber-300 text-white shadow-[0_0_25px_rgba(245,158,11,0.9)] ring-2 ring-amber-300';
    }

    const colors: Record<number, string> = {
      2: 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-400 text-indigo-100 shadow-[0_0_10px_rgba(99,102,241,0.3)]',
      4: 'bg-gradient-to-br from-cyan-600 to-cyan-800 border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.35)]',
      8: 'bg-gradient-to-br from-teal-600 to-teal-800 border-teal-400 text-teal-100 shadow-[0_0_14px_rgba(20,184,166,0.4)]',
      16: 'bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.45)]',
      32: 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-400 text-amber-100 shadow-[0_0_16px_rgba(245,158,11,0.5)]',
      64: 'bg-gradient-to-br from-orange-600 to-orange-800 border-orange-400 text-orange-100 shadow-[0_0_18px_rgba(249,115,22,0.55)]',
      128: 'bg-gradient-to-br from-rose-600 to-rose-800 border-rose-400 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.6)]',
      256: 'bg-gradient-to-br from-pink-600 to-pink-800 border-pink-400 text-pink-100 shadow-[0_0_22px_rgba(236,72,153,0.65)]',
      512: 'bg-gradient-to-br from-purple-600 to-purple-800 border-purple-400 text-purple-100 shadow-[0_0_25px_rgba(168,85,247,0.7)]',
      1024: 'bg-gradient-to-br from-fuchsia-600 to-fuchsia-900 border-fuchsia-400 text-fuchsia-100 shadow-[0_0_30px_rgba(217,70,239,0.8)] ring-1 ring-fuchsia-300',
      2048: 'bg-gradient-to-br from-fuchsia-500 via-pink-600 to-cyan-500 border-cyan-300 text-white shadow-[0_0_35px_rgba(217,70,239,1)] ring-2 ring-yellow-400 animate-pulse',
    };
    return colors[tile.val] || 'bg-gradient-to-br from-yellow-500 via-amber-600 to-rose-600 border-white text-white shadow-[0_0_40px_rgba(245,158,11,1)] ring-2 ring-white animate-pulse';
  };

  return (
    <div className="fixed inset-0 bg-[#04040e] z-[100] flex flex-col items-center pt-safe pb-safe overflow-hidden select-none">
      
      {/* Header */}
      <div className="w-full max-w-md px-5 py-2.5 flex items-center justify-between z-10">
        <button 
          onClick={onExit} 
          className="p-2 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-400 uppercase tracking-widest drop-shadow">
            Merge Blocks
          </h1>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Tap column to drop & merge
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowShop(true)} 
            className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 hover:bg-amber-500/20 transition active:scale-95"
            title="Open Shop"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button 
            onClick={restart} 
            className="p-2 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition active:scale-95"
            title="Restart"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Score Board */}
      <div className="w-full max-w-md px-5 mb-2 z-10 flex gap-2.5">
        <div className="flex-1 bg-black/40 border border-fuchsia-500/30 rounded-2xl p-2 flex flex-col items-center shadow-[0_0_20px_rgba(217,70,239,0.15)]">
          <span className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest">Score</span>
          <span className="text-xl font-black text-white">{score.toLocaleString()}</span>
        </div>
        <div className="flex-1 bg-black/40 border border-rose-500/30 rounded-2xl p-2 flex flex-col items-center shadow-[0_0_20px_rgba(244,63,94,0.15)]">
          <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1">
            <Trophy className="w-3 h-3" /> Best Score
          </span>
          <span className="text-xl font-black text-white">{bestScore.toLocaleString()}</span>
        </div>
      </div>

      {/* Current / Next Block Queuer + Power-Ups Toolbar */}
      <div className="w-full max-w-md px-5 mb-2 z-10 flex flex-col gap-2">
        {/* Top bar: Queued blocks + Tile Swap */}
        <div className="flex items-center justify-between bg-[#080a22]/90 border border-white/10 rounded-2xl px-3.5 py-1.5 shadow-md">
          <div className="flex items-center gap-2.5">
            {/* Ready Block */}
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-cyan-400 tracking-wider">Ready</span>
              <div 
                onClick={handleColorMorphReadyBlock}
                className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black text-white border-2 shadow-lg transition-all ${getTileColor(currentBlock)} ${
                  activeTool === 'colorChange' ? 'ring-4 ring-fuchsia-400 cursor-pointer animate-bounce' : ''
                }`}
                title={activeTool === 'colorChange' ? 'Click to morph Ready block into Wildcard!' : 'Ready block'}
              >
                {currentBlock.isWildcard ? (
                  <div className="flex flex-col items-center leading-none">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-200" />
                    <span className="text-[7.5px] font-black">WILD</span>
                  </div>
                ) : currentBlock.multiplier && currentBlock.multiplier > 1 ? (
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-xs font-black">{currentBlock.val}</span>
                    <span className="text-[6.5px] font-black px-1 rounded bg-amber-400 text-slate-950 uppercase">
                      {currentBlock.multiplier}X
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-black">{currentBlock.val}</span>
                )}
              </div>
            </div>
            
            {/* Swap Button */}
            <button 
              onClick={handleTileSwap}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 active:scale-95 transition"
              title="Swap Blocks (Tile Swap)"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            {/* Next Block */}
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Next</span>
              <div className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center font-black text-white border-2 opacity-75 ${getTileColor(nextBlock)}`}>
                {nextBlock.isWildcard ? (
                  <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-200" />
                ) : nextBlock.multiplier && nextBlock.multiplier > 1 ? (
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-[10px] font-black">{nextBlock.val}</span>
                    <span className="text-[6px] font-black text-amber-300">2X</span>
                  </div>
                ) : (
                  <span className="text-xs font-black">{nextBlock.val}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Special Blocks Legend Indicator */}
          <div className="flex items-center gap-1.5 text-[9px] text-slate-300 bg-black/40 px-2 py-1 rounded-xl border border-white/5">
            <span className="flex items-center gap-0.5 text-yellow-300 font-bold">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-300" /> Wildcard
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-0.5 text-amber-300 font-bold">
              <Zap className="w-3 h-3 text-amber-400" /> 2X
            </span>
          </div>
        </div>

        {/* Integrated Power-Ups Control Dock */}
        <div className="flex items-center justify-between gap-1.5 bg-[#080a22]/90 border border-white/10 rounded-2xl p-1.5 shadow-md">
          {/* 1. Bomb Power-up */}
          <button
            onClick={handleBombClick}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition active:scale-95 ${
              activeTool === 'bomb' 
                ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.8)] ring-2 ring-rose-300 animate-pulse' 
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:border-rose-400'
            }`}
            title="Area Bomb (Clears 3x3 blast area)"
          >
            <div className="flex items-center gap-1">
              <Bomb className="w-4 h-4" />
              <span className="text-[10px] font-black">{inventory?.bomb || 0}</span>
            </div>
            <span className="text-[7.5px] font-black uppercase tracking-tight">Bomb</span>
          </button>

          {/* 2. Color Change Power-up */}
          <button
            onClick={handleColorChangeClick}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition active:scale-95 ${
              activeTool === 'colorChange' 
                ? 'bg-fuchsia-500 text-white shadow-[0_0_12px_rgba(217,70,239,0.8)] ring-2 ring-fuchsia-300 animate-pulse' 
                : 'bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 hover:border-fuchsia-400'
            }`}
            title="Color Morph (Allows block to merge with any color)"
          >
            <div className="flex items-center gap-1">
              <Palette className="w-4 h-4" />
              <span className="text-[10px] font-black">{inventory?.colorChange || 0}</span>
            </div>
            <span className="text-[7.5px] font-black uppercase tracking-tight">Color</span>
          </button>

          {/* 3. Hammer Power-up */}
          <button
            onClick={handleHammerClick}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition active:scale-95 ${
              activeTool === 'hammer' 
                ? 'bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.8)] ring-2 ring-amber-300 animate-pulse' 
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:border-amber-400'
            }`}
            title="Smash Hammer (Smash single block)"
          >
            <div className="flex items-center gap-1">
              <Hammer className="w-4 h-4" />
              <span className="text-[10px] font-black">{inventory?.hammer || 0}</span>
            </div>
            <span className="text-[7.5px] font-black uppercase tracking-tight">Smash</span>
          </button>

          {/* 4. 2X Multiplier Boost */}
          <button
            onClick={handleDoubleMultiplier}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition active:scale-95 ${
              activeTool === 'double' 
                ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.8)] ring-2 ring-emerald-300 animate-pulse' 
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400'
            }`}
            title="Double Block (2X Multiplier)"
          >
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black">{inventory?.double || 0}</span>
            </div>
            <span className="text-[7.5px] font-black uppercase tracking-tight">2X</span>
          </button>

          {/* 5. Board Shuffle */}
          <button
            onClick={handleShuffle}
            className="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition active:scale-95 bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:border-purple-400"
            title="Shuffle Board"
          >
            <div className="flex items-center gap-1">
              <Shuffle className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-black">{inventory?.shuffle || 0}</span>
            </div>
            <span className="text-[7.5px] font-black uppercase tracking-tight">Shuffle</span>
          </button>

          {/* 6. Undo Move */}
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition active:scale-95 ${
              history.length > 0 
                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400' 
                : 'opacity-35 border border-transparent text-slate-500'
            }`}
            title="Undo Move"
          >
            <div className="flex items-center gap-1">
              <RotateCcw className="w-4 h-4" />
              <span className="text-[10px] font-black">{inventory?.undo || 0}</span>
            </div>
            <span className="text-[7.5px] font-black uppercase tracking-tight">Undo</span>
          </button>
        </div>
      </div>

      {/* Tool Alert Banner */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md px-5 mb-2 z-20"
          >
            <div className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-rose-500/20 via-fuchsia-500/20 to-cyan-500/20 border border-fuchsia-400/50 flex items-center justify-between text-xs shadow-lg">
              <span className="text-white font-bold flex items-center gap-1.5">
                {activeTool === 'bomb' && (
                  <>
                    <Bomb className="w-4 h-4 text-rose-400 animate-bounce" />
                    <span>Bomb Mode: Tap any block in the grid to detonate a 3x3 blast!</span>
                  </>
                )}
                {activeTool === 'colorChange' && (
                  <>
                    <Palette className="w-4 h-4 text-fuchsia-400 animate-bounce" />
                    <span>Color Morph: Tap any block (or Ready block) to merge with any color!</span>
                  </>
                )}
                {activeTool === 'hammer' && (
                  <>
                    <Hammer className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>Smash Mode: Tap any block in the grid to obliterate it!</span>
                  </>
                )}
                {activeTool === 'double' && (
                  <>
                    <Zap className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span>2X Boost: Tap any block to double its value!</span>
                  </>
                )}
              </span>
              <button 
                onClick={() => setActiveTool(null)}
                className="text-white/75 hover:text-white text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition shrink-0 ml-2"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board */}
      <div className="w-full max-w-md px-4 z-10 flex-1 min-h-0 flex flex-col justify-end pb-3 relative">
        <div className={`w-full aspect-[5/7] max-h-[56vh] bg-[#080922] border-2 border-white/10 rounded-3xl p-2 grid grid-cols-5 grid-rows-7 gap-1.5 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden mx-auto transition-transform ${
          isBoardShaking ? 'translate-x-1 -translate-y-1 rotate-1 scale-[0.99]' : ''
        }`}>
          
          {/* Column Tap Zones */}
          <div className="absolute inset-0 grid grid-cols-5 z-20">
            {Array(5).fill(0).map((_, c) => (
              <div 
                key={`col-${c}`} 
                onClick={() => handleColumnClick(c)}
                className="h-full w-full hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer flex flex-col justify-start items-center pt-2 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyan-400 transition" />
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          {grid.map((row, r) => row.map((tile, c) => (
            <div
              key={`cell-${r}-${c}`}
              onClick={(e) => {
                if (activeTool) {
                  e.stopPropagation();
                  handleCellClickWithTool(r, c);
                }
              }}
              className={`relative rounded-xl flex items-center justify-center transition-all duration-200 z-10 ${
                tile === null ? 'bg-white/[0.03] border border-white/5' : ''
              } ${activeTool && (activeTool === 'bomb' || tile !== null) ? 'hover:scale-105 ring-2 ring-white cursor-pointer z-30 animate-pulse' : ''}`}
            >
              {tile !== null && (
                <AnimatedTile
                  value={tile.val}
                  isMerged={mergedCells.has(`${r}-${c}`)}
                  colorClass={`w-full h-full border ${getTileColor(tile)}`}
                  className="w-full h-full"
                  icon={
                    tile.isWildcard ? (
                      <div className="flex flex-col items-center justify-center leading-none">
                        <Star className="w-5 h-5 fill-yellow-300 text-yellow-200 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]" />
                        <span className="text-[9px] font-black text-white tracking-wider mt-0.5 drop-shadow">WILD</span>
                      </div>
                    ) : tile.multiplier && tile.multiplier > 1 ? (
                      <div className="flex flex-col items-center justify-center leading-none">
                        <span className="text-base font-black text-white drop-shadow leading-tight">{tile.val}</span>
                        <span className="text-[7.5px] font-black px-1 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-tight shadow-md border border-white mt-0.5 flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5 fill-slate-950" /> {tile.multiplier}X
                        </span>
                      </div>
                    ) : undefined
                  }
                />
              )}
            </div>
          )))}

          {/* Bomb Explosion Shockwave Effect */}
          {bombExplosionCoords && (
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                left: `${(bombExplosionCoords.c / COLS) * 100}%`,
                top: `${(bombExplosionCoords.r / ROWS) * 100}%`,
              }}
              className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-radial from-amber-400 via-rose-500 to-transparent shadow-[0_0_50px_rgba(244,63,94,1)] z-50 flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-yellow-200 animate-spin" />
            </motion.div>
          )}

          {/* Floating Scores */}
          {floatingScores.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -35, scale: 1.25 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className={`absolute pointer-events-none font-black text-base drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] z-40 whitespace-nowrap ${
                item.isSpecial ? 'text-amber-300 text-lg' : 'text-amber-300'
              }`}
            >
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Powerup Refill Prompt */}
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
                {quickPrompt.type === 'bomb' ? (
                  <Bomb className="w-6 h-6 text-rose-400" />
                ) : quickPrompt.type === 'colorChange' ? (
                  <Palette className="w-6 h-6 text-fuchsia-400" />
                ) : quickPrompt.type === 'hammer' ? (
                  <Hammer className="w-6 h-6 text-amber-400" />
                ) : (
                  <Zap className="w-6 h-6 text-emerald-400" />
                )}
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1">
                Refill {quickPrompt.type === 'colorChange' ? 'COLOR MORPH' : quickPrompt.type.toUpperCase()}!
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Keep your merge cascade going! Unlock an instant refill with coins or watch a short video ad.
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

      {/* Game Over Modal */}
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
              <p className="text-slate-400 font-bold mb-4 uppercase text-xs tracking-wider">Column reached the top!</p>
              
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-black/50 rounded-2xl p-3 border border-white/5">
                  <div className="text-[9px] text-fuchsia-400 font-black uppercase tracking-widest mb-0.5">Final Score</div>
                  <div className="text-2xl font-black text-white">{score.toLocaleString()}</div>
                </div>
                <div className="bg-black/50 rounded-2xl p-3 border border-amber-500/30">
                  <div className="text-[9px] text-amber-400 font-black uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1">
                    <Coins className="w-3 h-3" /> Coins Earned
                  </div>
                  <div className="text-2xl font-black text-amber-300">+{Math.max(10, Math.floor(score / 10))}</div>
                </div>
              </div>

              {/* Up Next Recommendation */}
              <div className="bg-gradient-to-r from-[#170e38] to-[#250d3a] border border-cyan-500/40 rounded-2xl p-3 mb-4 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest">Recommended Next</span>
                  <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    +50 Bonus Coins
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white">Hexagon Puzzle</h4>
                    <p className="text-[10px] text-slate-300">Rotate & drop 6-sided puzzle</p>
                  </div>
                  <button
                    onClick={() => {
                      if (onSwitchGame) onSwitchGame('mini_hexagon');
                      else onExit();
                    }}
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Play
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={restart}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all text-sm shadow-md"
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
