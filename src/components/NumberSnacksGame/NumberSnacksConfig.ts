import { PowerUpItem, PowerUpType } from './NumberSnacksTypes';

export interface PowerMilestoneInfo {
  power: number;
  name: string;
  category: string;
  headRadius: number;
  segmentsCount: number;
  baseColor: string;
  accentColor: string;
  glowColor: string;
  eyeStyle: 'cute' | 'happy' | 'starry' | 'cool' | 'cosmic';
  auraLevel: number; // 0 = none, 1 = subtle, 2 = bright, 3 = radiant, 4 = legendary
  title: string;
  flavorText: string;
}

export const POWER_MILESTONES: Record<number, PowerMilestoneInfo> = {
  2: {
    power: 2,
    name: 'Cookie Sprout',
    category: 'Tiny Snack',
    headRadius: 24,
    segmentsCount: 2,
    baseColor: '#d97706',
    accentColor: '#92400e',
    glowColor: 'rgba(217, 119, 6, 0.3)',
    eyeStyle: 'cute',
    auraLevel: 0,
    title: 'Beginner Baker',
    flavorText: 'A cute little freshly baked chocolate chip cookie taking its very first steps!'
  },
  4: {
    power: 4,
    name: 'Gummy Hopper',
    category: 'Small Snack',
    headRadius: 26,
    segmentsCount: 3,
    baseColor: '#e11d48',
    accentColor: '#9f1239',
    glowColor: 'rgba(225, 29, 72, 0.35)',
    eyeStyle: 'happy',
    auraLevel: 0,
    title: 'Sweet Nibbler',
    flavorText: 'Chewy and bouncy with an energetic berry kick!'
  },
  8: {
    power: 8,
    name: 'Donut Glider',
    category: 'Sprinkle Snack',
    headRadius: 28,
    segmentsCount: 4,
    baseColor: '#db2777',
    accentColor: '#831843',
    glowColor: 'rgba(219, 39, 119, 0.4)',
    eyeStyle: 'happy',
    auraLevel: 1,
    title: 'Donut Dasher',
    flavorText: 'Frosted with strawberry glaze and vibrant rainbow sprinkles.'
  },
  16: {
    power: 16,
    name: 'Cupcake Swirler',
    category: 'Frosted Snack',
    headRadius: 31,
    segmentsCount: 5,
    baseColor: '#9333ea',
    accentColor: '#581c87',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    eyeStyle: 'happy',
    auraLevel: 1,
    title: 'Pastry Prodigy',
    flavorText: 'Towering lavender buttercream with a happy cherry on top!'
  },
  32: {
    power: 32,
    name: 'Choco Truffler',
    category: 'Gourmet Snack',
    headRadius: 34,
    segmentsCount: 6,
    baseColor: '#2563eb',
    accentColor: '#1e3a8a',
    glowColor: 'rgba(37, 99, 235, 0.5)',
    eyeStyle: 'starry',
    auraLevel: 2,
    title: 'Choco Knight',
    flavorText: 'Caramel-filled artisan chocolate surrounded by a soft sugar glow.'
  },
  64: {
    power: 64,
    name: 'Macaron Cloud',
    category: 'Airy Snack',
    headRadius: 37,
    segmentsCount: 7,
    baseColor: '#0d9488',
    accentColor: '#134e4a',
    glowColor: 'rgba(13, 148, 136, 0.55)',
    eyeStyle: 'starry',
    auraLevel: 2,
    title: 'Meringue Master',
    flavorText: 'Crisp almond shell with delicate matcha cream and floating sugar dust.'
  },
  128: {
    power: 128,
    name: 'Golden Croissant',
    category: 'Epic Snack',
    headRadius: 40,
    segmentsCount: 8,
    baseColor: '#eab308',
    accentColor: '#713f12',
    glowColor: 'rgba(234, 179, 8, 0.65)',
    eyeStyle: 'cool',
    auraLevel: 3,
    title: 'Golden Gourmet',
    flavorText: 'Flaky buttery pastry that shines with radiant 24k sugar leaf!'
  },
  256: {
    power: 256,
    name: 'Royal Sundae',
    category: 'Legendary Snack',
    headRadius: 43,
    segmentsCount: 9,
    baseColor: '#f43f5e',
    accentColor: '#881337',
    glowColor: 'rgba(244, 63, 94, 0.75)',
    eyeStyle: 'cool',
    auraLevel: 3,
    title: 'Sundae Monarch',
    flavorText: 'Three royal mounds of gelato drizzled in dark cocoa with crystal cherries.'
  },
  512: {
    power: 512,
    name: 'Cosmic Burger',
    category: 'Ultra Snack',
    headRadius: 46,
    segmentsCount: 10,
    baseColor: '#8b5cf6',
    accentColor: '#4c1d95',
    glowColor: 'rgba(139, 92, 246, 0.85)',
    eyeStyle: 'cosmic',
    auraLevel: 4,
    title: 'Nebula Nomad',
    flavorText: 'Infused with stellar stardust between toasted sesame brioche stars.'
  },
  1024: {
    power: 1024,
    name: 'Celestial Parfait',
    category: 'Mythic Snack',
    headRadius: 49,
    segmentsCount: 11,
    baseColor: '#06b6d4',
    accentColor: '#164e63',
    glowColor: 'rgba(6, 182, 212, 0.9)',
    eyeStyle: 'cosmic',
    auraLevel: 4,
    title: 'Star Parfait',
    flavorText: 'A divine creation chilled by comet ice and sweetened with solar nectar.'
  },
  2048: {
    power: 2048,
    name: 'Infinity Ambrosia',
    category: 'Supreme Snack',
    headRadius: 52,
    segmentsCount: 12,
    baseColor: '#f59e0b',
    accentColor: '#78350f',
    glowColor: 'rgba(245, 158, 11, 0.95)',
    eyeStyle: 'cosmic',
    auraLevel: 4,
    title: 'Ambrosia Deity',
    flavorText: 'The legendary nectar of pastry heaven, emitting pure celestial radiance.'
  },
  4096: {
    power: 4096,
    name: 'Singularity Tart',
    category: 'Ascended Snack',
    headRadius: 55,
    segmentsCount: 13,
    baseColor: '#ec4899',
    accentColor: '#831843',
    glowColor: 'rgba(236, 72, 153, 1)',
    eyeStyle: 'cosmic',
    auraLevel: 4,
    title: 'Singularity Sovereign',
    flavorText: 'An ascended confection whose sweetness bends the very fabric of spacetime.'
  },
  8192: {
    power: 8192,
    name: 'Starlight Feast',
    category: 'Extreme Snack',
    headRadius: 58,
    segmentsCount: 14,
    baseColor: '#38bdf8',
    accentColor: '#0c4a6e',
    glowColor: 'rgba(56, 189, 248, 1)',
    eyeStyle: 'cosmic',
    auraLevel: 4,
    title: 'Starlight Legend',
    flavorText: 'Pure condensed starlight harmonized into transcendent culinary majesty.'
  }
};

export function getPowerMilestone(power: number): PowerMilestoneInfo {
  // Find highest milestone <= power
  const sorted = Object.keys(POWER_MILESTONES)
    .map(Number)
    .sort((a, b) => a - b);

  let current = sorted[0];
  for (const m of sorted) {
    if (power >= m) {
      current = m;
    } else {
      break;
    }
  }

  const base = POWER_MILESTONES[current];
  return {
    ...base,
    power,
  };
}

export function getNextPowerMilestone(power: number): number {
  const sorted = Object.keys(POWER_MILESTONES)
    .map(Number)
    .sort((a, b) => a - b);

  for (const m of sorted) {
    if (m > power) return m;
  }
  return power * 2;
}

export const SNACK_TIERS = POWER_MILESTONES;

export function getSnackInfo(power: number): PowerMilestoneInfo {
  return getPowerMilestone(power);
}

// Power-Up Definitions
export const POWER_UPS: Record<PowerUpType, PowerUpItem> = {
  rainbow: {
    type: 'rainbow',
    name: 'Rainbow Candy',
    badge: 'RAINBOW',
    color: '#06b6d4',
    iconName: 'Zap',
    durationMs: 8000,
    description: 'Pulls nearby number snacks directly to you like magic!'
  },
  golden: {
    type: 'golden',
    name: 'Golden Cookie',
    badge: '2X POWER',
    color: '#eab308',
    iconName: 'Star',
    durationMs: 10000,
    description: 'Doubles all collected power and score for a limited time!'
  },
  magnet: {
    type: 'magnet',
    name: 'Magnet Candy',
    badge: 'MAGNET',
    color: '#a855f7',
    iconName: 'Compass',
    durationMs: 15000,
    description: 'Attracts distant collectibles toward your path.'
  },
  speed: {
    type: 'speed',
    name: 'Sugar Rush',
    badge: 'SPEED BOOST',
    color: '#f97316',
    iconName: 'Flame',
    durationMs: 6000,
    description: 'Zoom through the Snack Garden with delightful super speed!'
  },
  shield: {
    type: 'shield',
    name: 'Shield Bubble',
    badge: 'SHIELD',
    color: '#10b981',
    iconName: 'Shield',
    durationMs: 12000,
    description: 'Protects your snack character from one friendly collision.'
  },
  slowmo: {
    type: 'slowmo',
    name: 'Time Stop',
    badge: 'TIME FREEZE',
    color: '#38bdf8',
    iconName: 'Snowflake',
    durationMs: 8000,
    description: 'Completely freezes all hazards and obstacles!'
  }
};

// World Arena Dimensions
export const ARENA_CONFIG = {
  WORLD_WIDTH: 2200,
  WORLD_HEIGHT: 2200,
  BORDER_PADDING: 60,
  BASE_SPEED: 180, // pixels per second
  MAX_SPEED: 320,
  BASE_TURN_SPEED: 8.5, // radians per second lerp
  COLLECTIBLE_SPAWN_CAP: 45,
  OBSTACLE_CAP: 32,
  MAGNET_RADIUS: 240,
};

// Combo Tiers
export const COMBO_LEVELS = [
  { min: 2, max: 2, label: 'COMBO x2', multiplier: 1.2, color: '#38bdf8' },
  { min: 3, max: 4, label: 'COMBO x3', multiplier: 1.5, color: '#2dd4bf' },
  { min: 5, max: 7, label: 'MEGA COMBO x5', multiplier: 2.2, color: '#fbbf24' },
  { min: 8, max: 9, label: 'SUPER COMBO x8', multiplier: 3.2, color: '#c084fc' },
  { min: 10, max: 999, label: 'INSANE COMBO x10+', multiplier: 5.0, color: '#fb7185' },
];

export function getComboTier(combo: number) {
  if (combo < 2) return null;
  for (const c of COMBO_LEVELS) {
    if (combo >= c.min && combo <= c.max) return c;
  }
  return COMBO_LEVELS[COMBO_LEVELS.length - 1];
}
