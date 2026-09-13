import fs from 'fs';
['src/games/CarRacing3D.tsx', 'src/games/EndlessRunner3D.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    // For R3F, adding dpr is crucial for performance. Also disabling antialias optionally helps, 
    // but dpr is the main culprit for lag
    code = code.replace(/<Canvas shadows gl={{ antialias: true, powerPreference: "high-performance" }}>/, 
      '<Canvas shadows dpr={[1, 1.5]} gl={{ antialias: typeof window !== "undefined" && window.innerWidth > 768, powerPreference: "high-performance" }}>');
    
    // just in case they have a different tag
    code = code.replace(/<Canvas shadows>/, '<Canvas shadows dpr={[1, 1.5]}>');
    fs.writeFileSync(file, code);
  }
});
