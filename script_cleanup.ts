import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove all instances of localStorage.setItem('dp_coins', ...)
// actually just remove anything matching localStorage.setItem\('dp_(coins|gems|energy|level|xp|streak)'[^;]*;
code = code.replace(/localStorage\.setItem\('dp_(?:coins|gems|energy|level|xp|streak)'[^;]*;/g, '');

// Save it back
fs.writeFileSync('src/App.tsx', code);
