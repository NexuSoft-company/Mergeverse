import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const \[lowPowerMode, setLowPowerMode\] = useState\(\(\) => localStorage.getItem\('dp_lowpow'\) === 'true'\);/,
  `const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);\n  const [lowPowerMode, setLowPowerMode] = useState(() => {\n    const saved = localStorage.getItem('dp_lowpow');\n    if (saved !== null) return saved === 'true';\n    return isMobile; // Default to eco mode on mobile\n  });`
);

fs.writeFileSync('src/App.tsx', code);
