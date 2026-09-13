import re

with open("src/components/minigames/MergeBlocksGame.tsx", "r") as f:
    content = f.read()

# Define the new method
new_method = """    // Process merges
    await processMerges(newGrid, targetRow, colIndex);
  };

  const processMerges = async (currentGrid: Grid, activeRow: number, activeCol: number) => {
    let tempGrid = currentGrid.map(row => [...row]);
    let pointsAdded = 0;
    
    let activeBlocks = [{ r: activeRow, c: activeCol }];
    let isStable = false;
    
    while (!isStable) {
       isStable = true;
       let nextActiveBlocks: {r: number, c: number}[] = [];
       let mergeHappened = false;
       
       // 1. Try to merge active blocks first
       for (let i = 0; i < activeBlocks.length; i++) {
          let {r, c} = activeBlocks[i];
          if (tempGrid[r][c] === null) continue;
          
          let val = tempGrid[r][c] as number;
          let merged = false;
          
          // Down
          if (r < ROWS - 1 && tempGrid[r+1][c] === val) {
             tempGrid[r+1][c] = val * 2;
             tempGrid[r][c] = null;
             pointsAdded += val * 2;
             nextActiveBlocks.push({r: r+1, c});
             merged = true;
          }
          // Left merges INTO this block
          else if (!merged && c > 0 && tempGrid[r][c-1] === val) {
             tempGrid[r][c] = val * 2;
             tempGrid[r][c-1] = null;
             pointsAdded += val * 2;
             nextActiveBlocks.push({r, c});
             merged = true;
          }
          // Right merges INTO this block
          else if (!merged && c < COLS - 1 && tempGrid[r][c+1] === val) {
             tempGrid[r][c] = val * 2;
             tempGrid[r][c+1] = null;
             pointsAdded += val * 2;
             nextActiveBlocks.push({r, c});
             merged = true;
          }
          // Up merges INTO this block
          else if (!merged && r > 0 && tempGrid[r-1][c] === val) {
             tempGrid[r][c] = val * 2;
             tempGrid[r-1][c] = null;
             pointsAdded += val * 2;
             nextActiveBlocks.push({r, c});
             merged = true;
          }
          
          if (merged) {
             mergeHappened = true;
             isStable = false;
             break; // Only one merge per sweep for visual clarity
          }
       }
       
       // 2. Full sweep for any other disconnected merges (just in case)
       if (!mergeHappened) {
           for (let r = ROWS - 1; r >= 0; r--) {
               for (let c = 0; c < COLS; c++) {
                   if (tempGrid[r][c] === null) continue;
                   let val = tempGrid[r][c] as number;
                   if (r < ROWS - 1 && tempGrid[r+1][c] === val) {
                       tempGrid[r+1][c] = val * 2;
                       tempGrid[r][c] = null;
                       pointsAdded += val * 2;
                       nextActiveBlocks.push({r: r+1, c});
                       mergeHappened = true;
                       isStable = false;
                       break;
                   } else if (c < COLS - 1 && tempGrid[r][c+1] === val) {
                       tempGrid[r][c] = val * 2;
                       tempGrid[r][c+1] = null;
                       pointsAdded += val * 2;
                       nextActiveBlocks.push({r, c});
                       mergeHappened = true;
                       isStable = false;
                       break;
                   }
               }
               if (mergeHappened) break;
           }
       }

       if (mergeHappened) {
           setGrid(tempGrid.map(row => [...row]));
           await new Promise(res => setTimeout(res, 150));
       }

       // 3. Apply gravity
       let gravityHappened = false;
       for (let c = 0; c < COLS; c++) {
           let col = [];
           for (let r = 0; r < ROWS; r++) {
               if (tempGrid[r][c] !== null) col.push(tempGrid[r][c]);
           }
           let newCol = [];
           while (newCol.length + col.length < ROWS) newCol.push(null);
           newCol = newCol.concat(col);
           
           for (let r = 0; r < ROWS; r++) {
               if (tempGrid[r][c] !== newCol[r]) {
                   tempGrid[r][c] = newCol[r];
                   if (newCol[r] !== null) {
                       if (!nextActiveBlocks.some(b => b.r === r && b.c === c)) {
                           nextActiveBlocks.push({r, c});
                       }
                       gravityHappened = true;
                       isStable = false;
                   }
               }
           }
       }
       
       if (gravityHappened) {
           setGrid(tempGrid.map(row => [...row]));
           await new Promise(res => setTimeout(res, 150));
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
       setGameOver(true); syncMatchResultSecure(score + pointsAdded, 0, 0, 0, 0);
       addCoins(Math.floor((score + pointsAdded) / 10));
       addXp(Math.floor((score + pointsAdded) / 20));
"""

# Now find the old pattern
old_pattern = re.compile(r"    // Process merges\n    await processMerges\(newGrid\);\n  };\n\n  const processMerges = async \(currentGrid: Grid\) => \{.*?\n    // Check if full\n    if \(tempGrid\[0\]\.every\(val => val !== null\)\) \{\n       setGameOver\(true\); syncMatchResultSecure\(score, 0, 0, 0, 0\);\n       addCoins\(Math\.floor\(\(score \+ pointsAdded\) / 10\)\);\n       addXp\(Math\.floor\(\(score \+ pointsAdded\) / 20\)\);", re.DOTALL)

new_content = old_pattern.sub(new_method, content)

with open("src/components/minigames/MergeBlocksGame.tsx", "w") as f:
    f.write(new_content)

print("Patched successfully!")
