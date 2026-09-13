export type GameState = 'start' | 'countdown' | 'playing' | 'paused' | 'gameover';

export type DirectionName = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Vector2D {
  x: number;
  y: number;
}

export type PowerUpType = 'rainbow' | 'golden' | 'magnet' | 'speed' | 'shield' | 'slowmo';

export interface PowerUpItem {
  type: PowerUpType;
  name: string;
  badge: string;
  color: string;
  iconName: string;
  durationMs: number;
  description: string;
}

export interface BodySegment {
  x: number;
  y: number;
  radius: number;
  power: number;
}

export interface CollectibleItem {
  id: string;
  x: number;
  y: number;
  radius: number;
  kind: 'number' | 'powerup';
  value: number; // e.g. 2, 4, 8, 16...
  powerUpType?: PowerUpType;
  bobPhase: number;
  rotation: number;
  collected: boolean;
  spawnTime: number;
}

export type ObstacleType = 'bush' | 'candy_block' | 'bubble' | 'rolling_cookie' | 'candy_rock';

export interface ObstacleItem {
  id: string;
  type: ObstacleType;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  bobPhase: number;
  color: string;
  accentColor: string;
}

export interface ParticleItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  shape: 'circle' | 'star' | 'crumb' | 'sparkle' | 'ring';
}

export interface FloatingTextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
  scale: number;
  life: number;
  maxLife: number;
}

export interface DailyChallenge {
  id: string;
  dateStr: string;
  title: string;
  description: string;
  type: 'reach_power' | 'reach_score' | 'reach_combo' | 'collect_snacks' | 'survive_time';
  target: number;
  current: number;
  rewardCoins: number;
  rewardXp: number;
  rewardGems: number;
  completed: boolean;
  claimed: boolean;
}

export interface NumberSnacksStats {
  gamesPlayed: number;
  highestScore: number;
  highestNumber: number; // Highest Power reached
  bestCombo: number;
  totalSnacksCollected: number;
  totalDistance: number;
  totalPlayTimeSeconds: number;
  longestSurvivalTime: number;
  retryCount: number;
  gameOverCount: number;
  dailyChallengesCompleted: number;
  specialSnacksUsed: number;
  powerUpsUsed: {
    rainbow: number;
    golden: number;
    magnet: number;
    speed: number;
    shield: number;
    slowmo: number;
  };
  discoveredSnacks: number[];
  lastPlayedDate: string;
  dailyGamesCount: number;
}
