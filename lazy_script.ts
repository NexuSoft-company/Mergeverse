import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The imports to replace
const importsToLazy = [
  'PlatformLayout', 'Home', 'GamesLobby', 'Rewards', 'LeaderboardPage', 
  'Profile', 'Wallet', 'Settings', 'Events', 'Shop', 'BattlePass', 
  'MultiplayerLobby', 'SpeedTapChallenge', 'CarRacing3D', 'EndlessRunner3D',
  'TicTacToe', 'MemoryMatch', 'LuckySpin', 'GenericGame'
];

importsToLazy.forEach(name => {
  const regex = new RegExp(`import \\{ ${name} \\} from '\\.(\\/[^']+)'`);
  code = code.replace(regex, `const ${name} = lazy(() => import('.$1').then(m => ({ default: m.${name} })))`);
});

// We need to wrap <Routes> inside a Suspense
code = code.replace(
  /<Routes>/,
  '<Suspense fallback={<div className="min-h-screen bg-[#05050f] flex items-center justify-center text-blue-400 font-bold"><div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div></div>}>\n      <Routes>'
);

code = code.replace(
  /<\/Routes>/,
  '</Routes>\n      </Suspense>'
);

fs.writeFileSync('src/App.tsx', code);
