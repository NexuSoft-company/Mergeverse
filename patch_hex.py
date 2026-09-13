import re

with open("src/components/minigames/HexagonGame.tsx", "r") as f:
    content = f.read()

new_method = """  const handleCellClick = (r: number, c: number) => {
    if (gameOver || grid[r][c] !== null) return;

    let newGrid = grid.map(row => [...row]);
    newGrid[r][c] = nextBlock;

    let pointsAdded = 0;
    let hasMerged = true;
    let activeCells = [{r, c}];
    
    while(hasMerged) {
      hasMerged = false;
      let toMerge: [number, number][] = [];
      let val = 0;
      let mergeTarget: [number, number] | null = null;
      
      // 1. Check around active cells first
      for (let {r: activeR, c: activeC} of activeCells) {
          if (newGrid[activeR][activeC] === null) continue;
          const myVal = newGrid[activeR][activeC] as number;
          
          // Flood fill to find all connected matching cells
          let queue = [[activeR, activeC]];
          let visited = new Set<string>();
          visited.add(`${activeR},${activeC}`);
          let connected: [number, number][] = [[activeR, activeC]];
          
          while(queue.length > 0) {
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
              // Target is the active cell that triggered it
              mergeTarget = [activeR, activeC];
              break;
          }
      }
      
      // 2. If no active cell triggered, full sweep
      if (toMerge.length === 0) {
          for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
               if (newGrid[i][j] === null) continue;
               const myVal = newGrid[i][j] as number;
               
               let queue = [[i, j]];
               let visited = new Set<string>();
               visited.add(`${i},${j}`);
               let connected: [number, number][] = [[i, j]];
               
               while(queue.length > 0) {
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
                 // Target is the first found cell
                 mergeTarget = [i, j];
                 break;
               }
            }
            if (toMerge.length > 0) break;
          }
      }
      
      if (toMerge.length >= 3) {
         hasMerged = true;
         // clear them
         toMerge.forEach(([mr, mc]) => { newGrid[mr][mc] = null; });
         // merge at the target
         const [mr, mc] = mergeTarget!;
         newGrid[mr][mc] = val * 2;
         pointsAdded += val * 2;
         // Add the new block as the active cell for next iteration
         activeCells = [{r: mr, c: mc}];
      } else {
         activeCells = [];
      }
    }

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
    for(let r=0; r<GRID_SIZE; r++) {
       for(let c=0; c<GRID_SIZE; c++) {
          if (newGrid[r][c] === null) isFull = false;
       }
    }
    
    if (isFull) {
       setGameOver(true); syncMatchResultSecure(score + pointsAdded, 0, 0, 0, 0);
       addCoins(Math.floor((score + pointsAdded) / 10));
       addXp(Math.floor((score + pointsAdded) / 20));
    }
  };"""

old_pattern = re.compile(r"  const handleCellClick = \(r: number, c: number\) => \{.*?\n    if \(isFull\) \{\n       setGameOver\(true\); syncMatchResultSecure\(score, 0, 0, 0, 0\);\n       addCoins\(Math\.floor\(\(score \+ pointsAdded\) / 10\)\);\n       addXp\(Math\.floor\(\(score \+ pointsAdded\) / 20\)\);\n    \}\n  \};", re.DOTALL)

new_content = old_pattern.sub(new_method, content)

with open("src/components/minigames/HexagonGame.tsx", "w") as f:
    f.write(new_content)

print("Patched HexagonGame!")
