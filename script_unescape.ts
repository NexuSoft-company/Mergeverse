import fs from 'fs';

['src/pages/BattlePass.tsx', 'src/pages/Rewards.tsx', 'src/pages/Shop.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replace(/\\`/g, '`');
    code = code.replace(/\\\$/g, '$');
    fs.writeFileSync(file, code);
  }
});
