import fs from 'fs';

const appCode = fs.readFileSync('src/App.tsx', 'utf8');
const lines = appCode.split('\n');

const gameStart = lines.findIndex(l => l.startsWith('export function Game('));
const appStart = lines.findIndex(l => l.startsWith('export default function App('));

const importsPart = lines.slice(0, 31).join('\n');
const typesPart = lines.slice(31, gameStart).join('\n');
const gamePart = lines.slice(gameStart, appStart).join('\n');

const newGameEngineFile = `
${importsPart}
${typesPart}
${gamePart}
`;

fs.writeFileSync('src/GameEngine.tsx', newGameEngineFile);

// Remove types and Game from App.tsx
const newAppFile = `
${importsPart.replace(/export function Game\(.*$/m, '')}
import { Game } from './GameEngine';
import { useAuthAndDataSync } from './lib/userDataSync';
import { AuthScreen } from './components/AuthScreen';
${lines.slice(appStart).join('\n')}
`;

fs.writeFileSync('src/App.tsx', newAppFile);
console.log("Migration script done");
