export type Position = { r: number; c: number };

export interface TileData {
  id: string;
  value: number;
  position: Position;
  mergedFrom?: TileData[];
  isNew?: boolean;
  isMerged?: boolean;
}

export interface GameState {
  grid: (TileData | null)[][];
  score: number;
  bestScore: number;
  gameOver: boolean;
  won: boolean;
  combo: number;
  maxCombo: number;
  matchesPlayed: number;
  nextTileValue: number;
}

export class MergeEngine {
  private size: number;
  public grid: (TileData | null)[][];
  public score: number = 0;
  public bestScore: number = 0;
  public combo: number = 0;
  public maxCombo: number = 0;
  public gameOver: boolean = false;
  public won: boolean = false;
  public previousState: GameState | null = null;
  public nextTileValue: number = 2;
  private tileIdCounter: number = 0;

  constructor(size: number = 4, savedState?: Partial<GameState>) {
    this.size = size;
    // Apply saved state or initialize blank grid
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    if (savedState) {
      if (savedState.score) this.score = savedState.score;
      if (savedState.bestScore) this.bestScore = savedState.bestScore;
      if (savedState.maxCombo) this.maxCombo = savedState.maxCombo;
      if (savedState.nextTileValue) this.nextTileValue = savedState.nextTileValue;
      // deserialize grid if needed, for now start fresh
    }
  }

  public init() {
    this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    this.score = 0;
    this.combo = 0;
    this.gameOver = false;
    this.won = false;
    this.previousState = null;
    this.nextTileValue = Math.random() < 0.9 ? 2 : 4;
    this.addRandomTile();
    this.addRandomTile();
  }

  private generateId() {
    return `tile_${this.tileIdCounter++}_${Date.now()}`;
  }

  private getEmptyCells(): Position[] {
    const cells: Position[] = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (!this.grid[r][c]) {
          cells.push({ r, c });
        }
      }
    }
    return cells;
  }

  public addRandomTile() {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = this.nextTileValue;
      this.grid[r][c] = {
        id: this.generateId(),
        value,
        position: { r, c },
        isNew: true,
      };
      // Roll the *next* tile value
      this.nextTileValue = Math.random() < 0.9 ? 2 : 4;
    }
  }

  private cloneGrid(grid: (TileData | null)[][]): (TileData | null)[][] {
    return grid.map(row => 
      row.map(cell => {
        if (!cell) return null;
        const newCell = { ...cell, position: { ...cell.position } };
        if (cell.mergedFrom) {
           newCell.mergedFrom = cell.mergedFrom.map(mf => ({...mf}));
        }
        return newCell;
      })
    );
  }

  public getState(): GameState {
    return {
      grid: this.cloneGrid(this.grid),
      score: this.score,
      bestScore: this.bestScore,
      gameOver: this.gameOver,
      won: this.won,
      combo: this.combo,
      maxCombo: this.maxCombo,
      nextTileValue: this.nextTileValue,
      matchesPlayed: 0
    };
  }

  public move(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'): { moved: boolean, scoreGained: number, highestTileGained: number, merges: number, mergedValues: number[], mergedPositions: {r: number, c: number, value: number}[] } {
    if (this.gameOver || this.won) return { moved: false, scoreGained: 0, highestTileGained: 0, merges: 0, mergedValues: [], mergedPositions: [] };
    
    const preMoveState = this.getState();

    // Remove old isNew/mergedFrom flags
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c]) {
          this.grid[r][c]!.isNew = false;
          this.grid[r][c]!.isMerged = false;
          this.grid[r][c]!.mergedFrom = undefined;
        }
      }
    }

    let moved = false;
    let scoreGained = 0;
    let merges = 0;
    let highestTileGained = 0;
    const mergedValues: number[] = [];
    const mergedPositions: {r: number, c: number, value: number}[] = [];

    const traverse = this.buildTraversals(direction);

    traverse.x.forEach((x) => {
      traverse.y.forEach((y) => {
        const cell = { c: x, r: y };
        const tile = this.grid[cell.r][cell.c];

        if (tile) {
          const positions = this.findFarthestPosition(cell, direction);
          const next = this.grid[positions.next.r]?.[positions.next.c];

          if (next && next.value === tile.value && !next.mergedFrom) {
            // MERGE
            const mergedVal = tile.value * 2;
            const mergedTile: TileData = {
              id: this.generateId(),
              value: mergedVal,
              position: positions.next,
              mergedFrom: [tile, {...next}],
              isMerged: true,
              isNew: false
            };

            this.grid[positions.next.r][positions.next.c] = mergedTile;
            this.grid[cell.r][cell.c] = null;
            
            tile.position = positions.next;

            scoreGained += mergedVal;
            merges += 1;
            highestTileGained = Math.max(highestTileGained, mergedVal);
            mergedValues.push(mergedVal);
            mergedPositions.push({ r: positions.next.r, c: positions.next.c, value: mergedVal });
            moved = true;
          } else if (positions.farthest.r !== cell.r || positions.farthest.c !== cell.c) {
            // MOVE
            this.grid[positions.farthest.r][positions.farthest.c] = tile;
            this.grid[cell.r][cell.c] = null;
            tile.position = positions.farthest;
            moved = true;
          }
        }
      });
    });

    if (moved) {
      this.previousState = preMoveState;
      if (merges > 0) {
        this.combo += 1;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        scoreGained = Math.floor(scoreGained * (1 + (this.combo * 0.1))); // combo multiplier multiplier
      } else {
        this.combo = 0;
      }

      this.score += scoreGained;
      if (this.score > this.bestScore) this.bestScore = this.score;

      this.addRandomTile();

      if (!this.movesAvailable()) {
        this.gameOver = true;
      }
    } else {
       // if no valid moves during a swipe, combo breaks
       this.combo = 0;
    }

    return { moved, scoreGained, highestTileGained, merges, mergedValues, mergedPositions };
  }

  public drop(col: number): { moved: boolean, scoreGained: number, highestTileGained: number, merges: number, mergedValues: number[], mergedPositions: {r: number, c: number, value: number}[] } {
    if (this.gameOver || this.won) return { moved: false, scoreGained: 0, highestTileGained: 0, merges: 0, mergedValues: [], mergedPositions: [] };
    
    // Check if column is full where we spawn
    if (this.grid[0][col] !== null) {
      return { moved: false, scoreGained: 0, highestTileGained: 0, merges: 0, mergedValues: [], mergedPositions: [] };
    }

    const preMoveState = this.getState();

    // Remove old flags
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c]) {
          this.grid[r][c]!.isNew = false;
          this.grid[r][c]!.mergedFrom = undefined;
        }
      }
    }

    // Place the new tile at the top of the column
    this.grid[0][col] = {
      id: `tile-${this.tileIdCounter++}`,
      value: this.nextTileValue,
      position: { r: 0, c: col },
      isNew: true
    };

    let scoreGained = 0;
    let highestTileGained = 0;
    let mergedValues: number[] = [];
    let mergedPositions: {r: number, c: number, value: number}[] = [];
    let mergesCount = 0;
    let stable = false;

    while (!stable) {
      stable = true;

      // 1. Gravity (Pull all tiles down)
      for (let c = 0; c < this.size; c++) {
        for (let r = this.size - 2; r >= 0; r--) {
          if (this.grid[r][c] !== null) {
            let fallToR = r;
            while (fallToR + 1 < this.size && this.grid[fallToR + 1][c] === null) {
              fallToR++;
            }
            if (fallToR !== r) {
              this.grid[fallToR][c] = this.grid[r][c];
              this.grid[fallToR][c]!.position = { r: fallToR, c };
              this.grid[r][c] = null;
              stable = false;
            }
          }
        }
      }

      if (!stable) continue;

      // 2. Discover groups of connected identical tiles
      const visited = new Set<string>();
      const groups: {r: number, c: number, value: number, tiles: any[]}[] = [];

      for (let r = 0; r < this.size; r++) {
         for (let c = 0; c < this.size; c++) {
            if (this.grid[r][c] && !visited.has(`${r},${c}`)) {
               const val = this.grid[r][c]!.value;
               const group: any[] = [];
               const queue = [{r, c}];
               
               while (queue.length > 0) {
                  const {r: cr, c: cc} = queue.shift()!;
                  const key = `${cr},${cc}`;
                  if (visited.has(key)) continue;
                  
                  visited.add(key);
                  const tile = this.grid[cr][cc];
                  if (tile && tile.value === val) {
                      group.push({r: cr, c: cc, tile});
                      
                      // Check adjacent
                      if (cr - 1 >= 0) queue.push({r: cr - 1, c: cc});
                      if (cr + 1 < this.size) queue.push({r: cr + 1, c: cc});
                      if (cc - 1 >= 0) queue.push({r: cr, c: cc - 1});
                      if (cc + 1 < this.size) queue.push({r: cr, c: cc + 1});
                  }
               }

               if (group.length >= 2) {
                  groups.push({
                     r: Math.max(...group.map(g => g.r)), 
                     c: group[0].c,
                     value: val,
                     tiles: group
                  });
               }
            }
         }
      }

      if (groups.length > 0) {
          stable = false;
          for (const g of groups) {
               // Find target position (bottom-most, then left-most)
               g.tiles.sort((a, b) => b.r !== a.r ? b.r - a.r : a.c - b.c);
               const target = g.tiles[0];
               
               let newVal = g.value * Math.pow(2, g.tiles.length - 1);

               scoreGained += newVal;
               highestTileGained = Math.max(highestTileGained, newVal);
               mergedValues.push(newVal);
               mergedPositions.push({ r: target.r, c: target.c, value: newVal });
               mergesCount += g.tiles.length - 1;

               for (const item of g.tiles) {
                  this.grid[item.r][item.c] = null;
               }

               this.grid[target.r][target.c] = {
                  id: `tile-${this.tileIdCounter++}`,
                  value: newVal,
                  position: { r: target.r, c: target.c },
                  mergedFrom: g.tiles.map(t => t.tile),
                  isMerged: true,
                  isNew: false
               };
          }
      }
    }

    this.score += scoreGained;
    if (this.score > this.bestScore) this.bestScore = this.score;

    if (scoreGained > 0) {
       this.combo += 1;
       if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    } else {
       this.combo = 0;
    }

    this.previousState = preMoveState;
    this.nextTileValue = Math.random() > 0.9 ? 4 : 2;

    // Check game over
    let canDropAnywhere = false;
    for (let c = 0; c < this.size; c++) {
      if (this.grid[0][c] === null) {
        canDropAnywhere = true;
        break;
      }
    }

    if (!canDropAnywhere) {
      this.gameOver = true;
    }

    return { moved: true, scoreGained, highestTileGained, merges: mergesCount, mergedValues, mergedPositions };
  }

  private buildTraversals(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    const x = [];
    const y = [];
    for (let pos = 0; pos < this.size; pos++) {
      x.push(pos);
      y.push(pos);
    }
    if (direction === 'RIGHT') x.reverse();
    if (direction === 'DOWN') y.reverse();
    return { x, y };
  }

  private findFarthestPosition(cell: Position, direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    let previous;
    let r = cell.r;
    let c = cell.c;

    const v = this.getVector(direction);

    do {
      previous = { r, c };
      r += v.r;
      c += v.c;
    } while (this.withinBounds({ r, c }) && this.grid[r][c] === null);

    return {
      farthest: previous,
      next: { r, c }
    };
  }

  private withinBounds(position: Position) {
    return position.r >= 0 && position.r < this.size && position.c >= 0 && position.c < this.size;
  }

  private getVector(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    const map = {
      'UP': { r: -1, c: 0 },
      'RIGHT': { r: 0, c: 1 },
      'DOWN': { r: 1, c: 0 },
      'LEFT': { r: 0, c: -1 },
    };
    return map[direction];
  }

  private movesAvailable() {
    if (this.getEmptyCells().length > 0) return true;

    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const tile = this.grid[r][c];
        if (tile) {
          const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
          for (const dir of dirs) {
            const v = this.getVector(dir);
            const r2 = r + v.r;
            const c2 = c + v.c;
            if (this.withinBounds({ r: r2, c: c2 })) {
              const other = this.grid[r2][c2];
              if (other && other.value === tile.value) return true;
            }
          }
        }
      }
    }
    return false;
  }

  public undo(): boolean {
    if (!this.previousState) return false;
    
    this.grid = this.cloneGrid(this.previousState.grid);
    this.score = this.previousState.score;
    this.bestScore = this.previousState.bestScore;
    this.gameOver = this.previousState.gameOver;
    this.won = this.previousState.won;
    this.combo = this.previousState.combo;
    this.maxCombo = this.previousState.maxCombo;
    this.nextTileValue = this.previousState.nextTileValue;
    this.previousState = null;
    return true;
  }

  public removeTile(r: number, c: number): boolean {
    if (!this.withinBounds({ r, c }) || !this.grid[r][c]) return false;
    this.previousState = this.getState();
    this.grid[r][c] = null;
    this.gameOver = !this.movesAvailable();
    return true;
  }

  public doubleTile(r: number, c: number): boolean {
    if (!this.withinBounds({ r, c }) || !this.grid[r][c]) return false;
    this.previousState = this.getState();
    const oldVal = this.grid[r][c]!.value;
    const newVal = oldVal * 2;
    this.grid[r][c] = {
      id: `tile-${this.tileIdCounter++}`,
      value: newVal,
      position: { r, c },
      isNew: false
    };
    this.score += newVal;
    if (this.score > this.bestScore) this.bestScore = this.score;
    this.gameOver = !this.movesAvailable();
    return true;
  }

  public shuffleBoard(): boolean {
    const tiles: number[] = [];
    const positions: Position[] = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c]) {
          tiles.push(this.grid[r][c]!.value);
          positions.push({ r, c });
        }
      }
    }
    if (tiles.length <= 1) return false;

    this.previousState = this.getState();
    
    // Fisher-Yates shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    positions.forEach((pos, idx) => {
      this.grid[pos.r][pos.c] = {
        id: `tile-${this.tileIdCounter++}`,
        value: tiles[idx],
        position: pos,
        isNew: true
      };
    });

    this.gameOver = !this.movesAvailable();
    return true;
  }

  public swapNextTile(): number {
    const candidates = [2, 4, 8, 16];
    const current = this.nextTileValue;
    const filtered = candidates.filter(v => v !== current);
    this.nextTileValue = filtered[Math.floor(Math.random() * filtered.length)] || 2;
    return this.nextTileValue;
  }
}
