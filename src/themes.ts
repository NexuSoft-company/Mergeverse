export type ThemeConfig = {
  id: string;
  name: string;
  icon: string;
  description: string;
  backgroundClass: string;
  boardClass: string;
  gridLineClass: string;
  difficulty: string;
  unlockLevel: number;
  getColor: (val: number) => string;
  getIcon?: (val: number) => string | undefined;
  getBlockClass?: (val: number) => string;
};

// MergeVerse 3D Neon Cosmic Block Colors (matching the app icon)
const MERGEVERSE_COLORS = [
  'from-cyan-400 via-sky-500 to-blue-600 text-white border-cyan-300/80 border-b-blue-800 shadow-[0_0_25px_rgba(6,182,212,0.6),inset_0_2px_12px_rgba(255,255,255,0.85)]', // 2
  'from-fuchsia-400 via-fuchsia-600 to-purple-700 text-white border-fuchsia-300/80 border-b-purple-900 shadow-[0_0_25px_rgba(217,70,239,0.65),inset_0_2px_12px_rgba(255,255,255,0.85)]', // 4
  'from-violet-400 via-purple-600 to-indigo-800 text-white border-violet-300/80 border-b-indigo-950 shadow-[0_0_25px_rgba(139,92,246,0.65),inset_0_2px_12px_rgba(255,255,255,0.85)]', // 8
  'from-pink-400 via-rose-500 to-rose-700 text-white border-pink-300/80 border-b-rose-900 shadow-[0_0_25px_rgba(244,63,94,0.7),inset_0_2px_12px_rgba(255,255,255,0.85)]', // 16
  'from-amber-300 via-amber-500 to-yellow-600 text-amber-950 border-amber-200/90 border-b-amber-800 shadow-[0_0_30px_rgba(245,158,11,0.75),inset_0_2px_12px_rgba(255,255,255,0.9)]', // 32 (Gold Crown tone)
  'from-emerald-400 via-teal-500 to-teal-700 text-white border-emerald-300/80 border-b-teal-900 shadow-[0_0_25px_rgba(16,185,129,0.65),inset_0_2px_12px_rgba(255,255,255,0.85)]', // 64
  'from-blue-400 via-indigo-600 to-blue-800 text-white border-sky-300/80 border-b-indigo-950 shadow-[0_0_30px_rgba(59,130,246,0.7),inset_0_2px_12px_rgba(255,255,255,0.85)]', // 128
  'from-purple-400 via-fuchsia-600 to-pink-700 text-white border-pink-200/80 border-b-purple-950 shadow-[0_0_35px_rgba(192,38,211,0.75),inset_0_2px_12px_rgba(255,255,255,0.9)]', // 256
  'from-rose-400 via-red-500 to-orange-600 text-white border-rose-200/80 border-b-red-900 shadow-[0_0_35px_rgba(239,68,68,0.8),inset_0_2px_12px_rgba(255,255,255,0.9)]', // 512
  'from-yellow-300 via-amber-400 to-orange-500 text-yellow-950 border-yellow-100 border-b-amber-700 shadow-[0_0_40px_rgba(251,191,36,0.85),inset_0_2px_14px_rgba(255,255,255,0.95)]', // 1024
  'from-cyan-300 via-fuchsia-400 to-pink-500 text-white border-white border-b-fuchsia-900 shadow-[0_0_45px_rgba(6,182,212,0.9),inset_0_2px_15px_rgba(255,255,255,1)]', // 2048 (Grand MV Tile)
  'from-white via-cyan-300 to-fuchsia-500 text-slate-950 border-white shadow-[0_0_50px_rgba(255,255,255,0.95),inset_0_2px_15px_rgba(255,255,255,1)]', // 4096+
];

const CYBER_COLORS = [
  'border-2 border-cyan-400 bg-black/70 shadow-[0_0_25px_inset_rgba(34,211,238,0.6),0_0_15px_rgba(34,211,238,0.7)] text-cyan-300',
  'border-2 border-fuchsia-400 bg-black/70 shadow-[0_0_25px_inset_rgba(217,70,239,0.6),0_0_15px_rgba(217,70,239,0.7)] text-fuchsia-300',
  'border-2 border-purple-400 bg-black/70 shadow-[0_0_25px_inset_rgba(168,85,247,0.6),0_0_15px_rgba(168,85,247,0.7)] text-purple-300',
  'border-2 border-amber-400 bg-black/70 shadow-[0_0_30px_inset_rgba(251,191,36,0.7),0_0_18px_rgba(251,191,36,0.8)] text-amber-300',
  'border-2 border-pink-500 bg-black/70 shadow-[0_0_30px_inset_rgba(236,72,153,0.7),0_0_18px_rgba(236,72,153,0.8)] text-pink-300',
];

const DRAGON_LEVELS = ['🥚', '🦎', '🐲', '🐉', '🦖', '🔥', '🌋'];
const SPACE_LEVELS = ['🌕', '🌍', '🪐', '🌟', '☄️', '🌌', '🌠'];

export const THEMES: Record<string, ThemeConfig> = {
  classic: {
    id: 'classic',
    name: 'MergeVerse Cosmic',
    icon: '👑',
    description: 'The Ultimate Cosmic Evolution.',
    backgroundClass: 'bg-[#060614] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-950/40 via-[#0b0c26] to-[#04040e]',
    boardClass: 'bg-[#0a0b22]/70 border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25),inset_0_2px_20px_rgba(217,70,239,0.15)] backdrop-blur-xl rounded-3xl',
    gridLineClass: 'bg-gradient-to-b from-cyan-500/15 to-fuchsia-500/15 shadow-[0_0_8px_rgba(6,182,212,0.2)]',
    difficulty: 'Normal',
    unlockLevel: 1,
    getColor: (val) => MERGEVERSE_COLORS[Math.max(0, Math.log2(val) - 1) % MERGEVERSE_COLORS.length],
  },
  cyber: {
    id: 'cyber',
    name: 'Neon Matrix',
    icon: '⚡',
    description: 'Cyberpunk neon cubes & lasers.',
    backgroundClass: 'bg-[#03040e] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/50 via-[#050617] to-black',
    boardClass: 'bg-black/80 border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(34,211,238,0.35),inset_0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md rounded-2xl',
    gridLineClass: 'bg-cyan-500/25 shadow-[0_0_10px_rgba(34,211,238,0.5)]',
    difficulty: 'Hard',
    unlockLevel: 2,
    getColor: (val) => CYBER_COLORS[Math.max(0, Math.log2(val) - 1) % CYBER_COLORS.length],
  },
  dragon: {
    id: 'dragon',
    name: 'Dragon Merge',
    icon: '🐉',
    description: 'Evolve eggs into mythical dragons.',
    backgroundClass: 'bg-gradient-to-br from-[#1c0f13] via-[#2b0f15] to-[#0d0508]',
    boardClass: 'bg-rose-950/50 border-2 border-rose-500/40 shadow-[0_0_45px_rgba(225,29,72,0.25)] rounded-3xl backdrop-blur-xl',
    gridLineClass: 'bg-rose-500/20 shadow-[0_0_6px_rgba(225,29,72,0.3)]',
    difficulty: 'Normal',
    unlockLevel: 3,
    getColor: (val) => MERGEVERSE_COLORS[Math.max(0, Math.log2(val) - 1) % MERGEVERSE_COLORS.length],
    getIcon: (val) => DRAGON_LEVELS[Math.max(0, Math.log2(val) - 1) % DRAGON_LEVELS.length]
  },
  space: {
    id: 'space',
    name: 'Galaxy Orbital',
    icon: '🌌',
    description: 'Orbit planets across deep space.',
    backgroundClass: 'bg-gradient-to-b from-[#080214] via-[#12082b] to-[#04020a]',
    boardClass: 'bg-violet-950/40 border-2 border-indigo-400/30 shadow-[0_0_65px_rgba(79,70,229,0.25)] rounded-3xl backdrop-blur-xl',
    gridLineClass: 'bg-indigo-300/15 shadow-[0_0_6px_rgba(129,140,248,0.25)]',
    difficulty: 'Hard',
    unlockLevel: 4,
    getColor: (val) => MERGEVERSE_COLORS[Math.max(0, Math.log2(val) - 1) % MERGEVERSE_COLORS.length],
    getIcon: (val) => SPACE_LEVELS[Math.max(0, Math.log2(val) - 1) % SPACE_LEVELS.length]
  },
  robot: {
    id: 'robot',
    name: 'Cyber Mecha',
    icon: '🤖',
    description: 'Upgrade futuristic cybernetic bots.',
    backgroundClass: 'bg-[#050814] bg-gradient-to-b from-slate-950 via-[#070f26] to-slate-950',
    boardClass: 'bg-slate-900/80 border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(56,189,248,0.2)] rounded-2xl backdrop-blur-xl',
    gridLineClass: 'bg-cyan-500/20',
    difficulty: 'Normal',
    unlockLevel: 5,
    getColor: (val) => CYBER_COLORS[(Math.max(0, Math.log2(val) - 1) + 2) % CYBER_COLORS.length],
  },
  magic: {
    id: 'magic',
    name: 'Arcane Runes',
    icon: '✨',
    description: 'Merge sacred mystic symbols.',
    backgroundClass: 'bg-gradient-to-br from-[#1b0524] via-[#2a083a] to-[#0e0214]',
    boardClass: 'bg-fuchsia-950/50 border-2 border-fuchsia-500/40 shadow-[0_0_50px_rgba(217,70,239,0.3)] rounded-3xl backdrop-blur-xl',
    gridLineClass: 'bg-fuchsia-400/20',
    difficulty: 'Expert',
    unlockLevel: 6,
    getColor: (val) => MERGEVERSE_COLORS[(Math.max(0, Math.log2(val) - 1) + 4) % MERGEVERSE_COLORS.length],
  },
  crystal: {
    id: 'crystal',
    name: 'Crystal Shards',
    icon: '💎',
    description: 'Combine glowing cosmic crystals.',
    backgroundClass: 'bg-[#030d22] bg-gradient-to-b from-[#061536] via-[#020b1c] to-[#010610]',
    boardClass: 'bg-blue-950/60 border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(96,165,250,0.3)] rounded-3xl backdrop-blur-xl',
    gridLineClass: 'bg-cyan-300/20',
    difficulty: 'Normal',
    unlockLevel: 7,
    getColor: (val) => MERGEVERSE_COLORS[(Math.max(0, Math.log2(val) - 1) + 2) % MERGEVERSE_COLORS.length],
  },
  city: {
    id: 'city',
    name: 'Neo City',
    icon: '🏙️',
    description: 'Build futuristic neon metropolis.',
    backgroundClass: 'bg-[#080d1a] bg-gradient-to-b from-[#0d172e] via-[#070e1f] to-[#03060d]',
    boardClass: 'bg-slate-900/80 border-2 border-indigo-400/30 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.2)] backdrop-blur-xl',
    gridLineClass: 'bg-indigo-400/20',
    difficulty: 'Hard',
    unlockLevel: 8,
    getColor: (val) => MERGEVERSE_COLORS[Math.max(0, Math.log2(val) - 1) % MERGEVERSE_COLORS.length],
  },
  monster: {
    id: 'monster',
    name: 'Beast Evolution',
    icon: '👹',
    description: 'Breed ferocious cosmic titans.',
    backgroundClass: 'bg-gradient-to-br from-[#240409] via-[#38080f] to-[#120204]',
    boardClass: 'bg-red-950/50 border-2 border-red-500/40 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.3)] backdrop-blur-xl',
    gridLineClass: 'bg-red-500/20',
    difficulty: 'Expert',
    unlockLevel: 9,
    getColor: (val) => MERGEVERSE_COLORS[(Math.max(0, Math.log2(val) - 1) + 8) % MERGEVERSE_COLORS.length],
  },
  element: {
    id: 'element',
    name: 'Elemental Matrix',
    icon: '🌍',
    description: 'Fire, Plasma, Earth, Aether.',
    backgroundClass: 'bg-[#021812] bg-gradient-to-b from-[#04281e] via-[#021711] to-[#010d0a]',
    boardClass: 'bg-emerald-950/50 border-2 border-emerald-400/35 rounded-3xl shadow-[0_0_55px_rgba(52,211,153,0.25)] backdrop-blur-xl',
    gridLineClass: 'bg-emerald-400/20',
    difficulty: 'Normal',
    unlockLevel: 10,
    getColor: (val) => MERGEVERSE_COLORS[(Math.max(0, Math.log2(val) - 1) + 11) % MERGEVERSE_COLORS.length],
  }
};

export const THEME_IDS = Object.keys(THEMES);
export const getTheme = (id: string) => THEMES[id] || THEMES.classic;
