import { ARENA_CONFIG, getNextPowerMilestone, getPowerMilestone, POWER_UPS } from './NumberSnacksConfig';
import { NumberSnacksPlayer } from './NumberSnacksPlayer';
import { CollectibleManager } from './NumberSnacksCollectible';
import { ObstacleManager } from './NumberSnacksObstacle';
import { NumberSnacksWorld } from './NumberSnacksWorld';
import { EffectsManager } from './NumberSnacksEffects';
import { DirectionName, PowerUpType } from './NumberSnacksTypes';
import { audio } from '../../lib/audio';

export interface ActivePowerUpState {
  type: PowerUpType;
  remainingMs: number;
  totalMs: number;
}

export interface EngineCallbacks {
  onScoreUpdate: (score: number, power: number, nextPower: number, progressRatio: number) => void;
  onComboUpdate: (combo: number, label: string, multiplier: number) => void;
  onPowerUpsUpdate: (powerUps: ActivePowerUpState[]) => void;
  onGameOver: (finalStats: {
    score: number;
    power: number;
    maxCombo: number;
    snacksCollected: number;
    survivalTimeSeconds: number;
    distanceTraveled: number;
  }) => void;
  onMilestoneAlert: (power: number, title: string) => void;
}

export class NumberSnacksEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animFrameId: number | null = null;
  private lastTime: number = 0;

  // Subsystems
  public player: NumberSnacksPlayer;
  public collectibles: CollectibleManager;
  public obstacles: ObstacleManager;
  public world: NumberSnacksWorld;
  public effects: EffectsManager;

  // Gameplay State
  public score: number = 0;
  public currentPower: number = 2;
  public powerProgress: number = 0; // towards next milestone
  public nextPower: number = 4;
  public snacksCollected: number = 0;
  public currentCombo: number = 0;
  public maxCombo: number = 0;
  public comboTimer: number = 0;
  public survivalTime: number = 0;
  public distanceTraveled: number = 0;
  public isRunning: boolean = false;
  public isPaused: boolean = false;
  public invulnerabilityTimer: number = 0; // after shield pop

  // Viewport & Scaling
  public viewWidth: number = 800;
  public viewHeight: number = 600;
  public dpr: number = 1;
  public currentZoom: number = 1.0;

  // Power-Ups active map
  private activePowerUps: Map<PowerUpType, { remainingMs: number; totalMs: number }> = new Map();

  private callbacks: EngineCallbacks;

  constructor(canvas: HTMLCanvasElement, callbacks: EngineCallbacks) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Could not get 2D canvas context');
    this.ctx = context;
    this.callbacks = callbacks;

    this.viewWidth = canvas.clientWidth || 800;
    this.viewHeight = canvas.clientHeight || 600;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Initialize world, player, collectibles, obstacles
    this.world = new NumberSnacksWorld();
    this.player = new NumberSnacksPlayer(this.world.width / 2, this.world.height / 2);
    this.collectibles = new CollectibleManager();
    this.obstacles = new ObstacleManager();
    this.effects = new EffectsManager();

    this.reset(2);
  }

  public setViewport(width: number, height: number, dpr: number) {
    this.viewWidth = Math.max(200, width);
    this.viewHeight = Math.max(200, height);
    this.dpr = Math.max(1, dpr);
  }

  public reset(startingPower: number = 2) {
    this.score = 0;
    this.currentPower = startingPower;
    this.powerProgress = 0;
    this.nextPower = getNextPowerMilestone(startingPower);
    this.snacksCollected = 0;
    this.currentCombo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.survivalTime = 0;
    this.distanceTraveled = 0;
    this.invulnerabilityTimer = 0;
    this.activePowerUps.clear();

    const startX = this.world.width / 2;
    const startY = this.world.height / 2;
    this.player = new NumberSnacksPlayer(startX, startY);
    this.player.setPower(startingPower);

    this.collectibles.spawnInitial(ARENA_CONFIG.COLLECTIBLE_SPAWN_CAP, this.world.width, this.world.height, startingPower);
    this.obstacles.spawnInitial(ARENA_CONFIG.OBSTACLE_CAP, this.world.width, this.world.height);

    this.reportScore();
    this.reportPowerUps();
  }

  public start() {
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
    this.lastTime = performance.now();
  }

  public stop() {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  // Directional Input Controls
  public setDirection(dir: DirectionName) {
    if (!this.isRunning || this.isPaused || this.player.isDead) return;
    this.player.setDirection(dir);
  }

  public setHeading(dx: number, dy: number) {
    if (!this.isRunning || this.isPaused || this.player.isDead) return;
    this.player.setTargetHeading(dx, dy);
  }

  public setBoost(boosting: boolean) {
    if (!this.isRunning || this.isPaused || this.player.isDead) return;
    this.player.isBoosting = boosting;
  }

  // Direct In-Game Power-Up Activations (from on-screen HUD or Inventory)
  public activatePowerUpDirect(type: PowerUpType, customDurationMs?: number) {
    if (!this.isRunning || this.player.isDead) return;
    const meta = POWER_UPS[type];
    const duration = customDurationMs || meta.durationMs;
    this.activePowerUps.set(type, {
      remainingMs: duration,
      totalMs: duration,
    });
    this.reportPowerUps();
    audio.powerUp();
    this.effects.spawnPowerUpBurst(this.player.x, this.player.y, meta.color);
    this.effects.addFloatingText(meta.badge, this.player.x, this.player.y - 40, meta.color);
  }

  public triggerSuperMagnet() {
    this.activatePowerUpDirect('magnet', 15000);
    this.effects.addFloatingText('🧲 SUPER MAGNET!', this.player.x, this.player.y - 50, '#c084fc');
    audio.play(520, 'sine', 0.25, 0.2, 780);
  }

  public triggerTimeStop() {
    this.activatePowerUpDirect('slowmo', 10000);
    this.effects.addFloatingText('❄️ TIME STOP!', this.player.x, this.player.y - 50, '#38bdf8');
    audio.play(700, 'triangle', 0.35, 0.25, 440);
  }

  private loop = (time: number) => {
    if (!this.isRunning) return;

    const dt = Math.min((time - this.lastTime) / 1000, 0.05); // cap delta to 50ms
    this.lastTime = time;

    if (!this.isPaused) {
      this.update(dt);
    }
    this.render();

    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    this.survivalTime += dt;

    // 1. Update Power-ups
    const hasRainbow = this.activePowerUps.has('rainbow');
    const hasGolden = this.activePowerUps.has('golden');
    const hasMagnet = this.activePowerUps.has('magnet');
    const hasSpeed = this.activePowerUps.has('speed');
    const hasShield = this.activePowerUps.has('shield');
    const hasSlowMo = this.activePowerUps.has('slowmo');

    this.player.hasShield = hasShield;
    this.player.hasGolden = hasGolden;
    this.player.hasSpeed = hasSpeed;
    this.player.hasMagnet = hasMagnet;

    let powerUpsChanged = false;
    for (const [type, state] of this.activePowerUps.entries()) {
      state.remainingMs -= dt * 1000;
      if (state.remainingMs <= 0) {
        this.activePowerUps.delete(type);
        powerUpsChanged = true;
      }
    }
    if (powerUpsChanged) {
      this.reportPowerUps();
    }

    if (this.invulnerabilityTimer > 0) {
      this.invulnerabilityTimer -= dt;
    }

    // 2. Combo Timer
    if (this.currentCombo > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.currentCombo = 0;
        this.callbacks.onComboUpdate(0, '', 1);
      }
    }

    // 3. Update Player
    const prevX = this.player.x;
    const prevY = this.player.y;
    this.player.update(dt, ARENA_CONFIG.BASE_SPEED, this.world.width, this.world.height);
    this.distanceTraveled += Math.hypot(this.player.x - prevX, this.player.y - prevY);

    // 4. Update Camera / World (Snake face locked at exact screen center)
    this.world.update(dt, this.player.x, this.player.y, this.viewWidth, this.viewHeight, this.player.angle);

    // 5. Update Collectibles
    this.collectibles.update(
      dt,
      this.player.x,
      this.player.y,
      hasMagnet,
      hasRainbow,
      ARENA_CONFIG.MAGNET_RADIUS
    );

    // 6. Update Obstacles (Time Freeze power-up stops them entirely)
    this.obstacles.update(dt, hasSlowMo ? 0.0 : 1.0, this.world.width, this.world.height);

    // 7. Check Collectible Collisions
    this.checkCollectibleCollisions();

    // 8. Check Obstacle Collisions
    this.checkObstacleCollisions();

    // 9. Update Effects
    this.effects.update(dt);

    // 10. Replenish Collectibles if below threshold
    if (this.collectibles.items.length < ARENA_CONFIG.COLLECTIBLE_SPAWN_CAP) {
      this.collectibles.spawnRandom(this.world.width, this.world.height, this.currentPower);
    }
  }

  private checkCollectibleCollisions() {
    const headRadius = this.player.milestone.headRadius;
    const px = this.player.x;
    const py = this.player.y;

    for (const item of this.collectibles.items) {
      if (item.collected) continue;

      const dist = Math.hypot(px - item.x, py - item.y);
      if (dist < headRadius + item.radius + 6) {
        // Collect!
        item.collected = true;
        this.snacksCollected += 1;
        this.player.triggerEat();

        if (item.kind === 'powerup' && item.powerUpType) {
          this.collectPowerUp(item.powerUpType, item.x, item.y);
        } else {
          this.collectNumberSnack(item.value, item.x, item.y);
        }
      }
    }
  }

  private collectNumberSnack(val: number, x: number, y: number) {
    // 1. Audio
    audio.pop();

    // 2. Combo calculation
    this.currentCombo += 1;
    this.comboTimer = 2.2; // reset 2.2s window
    if (this.currentCombo > this.maxCombo) {
      this.maxCombo = this.currentCombo;
    }

    let comboMultiplier = 1.0;
    let comboLabel = '';
    if (this.currentCombo >= 10) {
      comboMultiplier = 3.0;
      comboLabel = 'INSANE COMBO x10!';
    } else if (this.currentCombo >= 5) {
      comboMultiplier = 2.0;
      comboLabel = 'MEGA COMBO x5!';
    } else if (this.currentCombo >= 3) {
      comboMultiplier = 1.5;
      comboLabel = 'COMBO x3';
    } else if (this.currentCombo >= 2) {
      comboMultiplier = 1.2;
      comboLabel = 'COMBO x2';
    }

    this.callbacks.onComboUpdate(this.currentCombo, comboLabel, comboMultiplier);

    // 3. Score calculation
    const hasGolden = this.activePowerUps.has('golden');
    const goldMultiplier = hasGolden ? 2.0 : 1.0;
    const earnedScore = Math.round(val * 10 * comboMultiplier * goldMultiplier);
    this.score += earnedScore;

    // 4. Power Progression
    const powerAddition = val * goldMultiplier;
    this.powerProgress += powerAddition;

    // Check if reached next power milestone
    const needed = this.nextPower - this.currentPower;
    if (this.powerProgress >= needed) {
      this.powerProgress -= needed;
      this.currentPower = this.nextPower;
      this.nextPower = getNextPowerMilestone(this.currentPower);
      this.player.setPower(this.currentPower);

      // Power Up Celebration
      audio.levelUp();
      const milestone = getPowerMilestone(this.currentPower);
      this.effects.spawnPowerUpBurst(this.player.x, this.player.y, milestone.baseColor);
      this.effects.addFloatingText(`POWER ${this.currentPower}!`, this.player.x, this.player.y - 30, '#fbbf24');
      this.callbacks.onMilestoneAlert(this.currentPower, milestone.title);
    }

    // 5. Visual effects
    const milestone = getPowerMilestone(val);
    this.effects.spawnEatCrumbs(x, y, milestone.baseColor, 8);
    this.effects.addFloatingText(`+${val}`, x, y, milestone.baseColor);

    this.reportScore();
  }

  private collectPowerUp(type: PowerUpType, x: number, y: number) {
    audio.powerUp();
    const meta = POWER_UPS[type];

    this.activePowerUps.set(type, {
      remainingMs: meta.durationMs,
      totalMs: meta.durationMs,
    });

    this.effects.spawnPowerUpBurst(x, y, meta.color);
    this.effects.addFloatingText(meta.badge, x, y - 25, meta.color);
    this.reportPowerUps();
  }

  private checkObstacleCollisions() {
    if (this.player.isDead || this.invulnerabilityTimer > 0) return;

    const headRadius = this.player.milestone.headRadius;
    const px = this.player.x;
    const py = this.player.y;

    for (const obs of this.obstacles.items) {
      const dist = Math.hypot(px - obs.x, py - obs.y);
      // Soft collision threshold (forgiving for children)
      if (dist < headRadius * 0.75 + obs.radius * 0.75) {
        // Collision!
        if (this.activePowerUps.has('shield')) {
          // Shield absorbs!
          this.activePowerUps.delete('shield');
          this.reportPowerUps();
          this.invulnerabilityTimer = 1.8; // 1.8s invulnerability
          audio.sparkle();
          this.effects.spawnPowerUpBurst(this.player.x, this.player.y, '#38bdf8');
          this.effects.addFloatingText('SHIELD SAVED!', this.player.x, this.player.y - 35, '#38bdf8');
          return;
        }

        // Game Over!
        this.triggerGameOver();
        return;
      }
    }
  }

  private triggerGameOver() {
    this.player.isDead = true;
    this.isRunning = false;
    audio.gameover();

    this.effects.spawnEatCrumbs(this.player.x, this.player.y, '#f43f5e', 24);
    this.effects.addFloatingText('OH NO!', this.player.x, this.player.y - 30, '#f43f5e');

    setTimeout(() => {
      this.callbacks.onGameOver({
        score: this.score,
        power: this.currentPower,
        maxCombo: this.maxCombo,
        snacksCollected: this.snacksCollected,
        survivalTimeSeconds: Math.round(this.survivalTime),
        distanceTraveled: Math.round(this.distanceTraveled),
      });
    }, 650);
  }

  public reviveSecondChance() {
    this.player.isDead = false;
    this.invulnerabilityTimer = 3.0; // 3 seconds grace
    this.activePowerUps.set('shield', { remainingMs: 6000, totalMs: 6000 });
    this.reportPowerUps();
    this.start();
  }

  private reportScore() {
    const needed = Math.max(1, this.nextPower - this.currentPower);
    const progressRatio = Math.min(1, this.powerProgress / needed);
    this.callbacks.onScoreUpdate(this.score, this.currentPower, this.nextPower, progressRatio);
  }

  private reportPowerUps() {
    const list: ActivePowerUpState[] = [];
    for (const [type, state] of this.activePowerUps.entries()) {
      list.push({
        type,
        remainingMs: state.remainingMs,
        totalMs: state.totalMs,
      });
    }
    this.callbacks.onPowerUpsUpdate(list);
  }

  public renderFrame() {
    this.render();
  }

  private render() {
    const ctx = this.ctx;
    const w = this.viewWidth;
    const h = this.viewHeight;
    const cx = w / 2;
    const cy = h / 2;

    // Reset transform and apply DPR scaling for crisp graphics
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Calculate dynamic smooth zoom-out based on snake size, length, and power
    // Prevents snake from dominating the screen, providing expansive field-of-view as it grows
    const headRadius = this.player.milestone.headRadius;
    const bodyLengthFactor = this.player.bodySegments.length * 4.2;
    const powerFactor = Math.min(60, Math.log2(Math.max(2, this.currentPower)) * 6);
    const snakeBulk = headRadius + bodyLengthFactor + powerFactor;
    
    // Target zoom scales smoothly from 1.0 (starter) down to 0.30 (huge snake)
    const targetZoom = Math.max(0.30, Math.min(1.0, 56 / (snakeBulk + 24)));
    this.currentZoom += (targetZoom - this.currentZoom) * 0.12;
    const zoom = this.currentZoom;

    // The virtual view dimensions when zoomed out
    const virtualW = w / zoom;
    const virtualH = h / zoom;
    
    // Compute camera bounds for culling
    const cullX = this.player.x - virtualW / 2;
    const cullY = this.player.y - virtualH / 2;

    ctx.save();
    // Center transform: snake face/head is anchored right at the screen center (cx, cy)
    ctx.translate(cx, cy);
    ctx.scale(zoom, zoom);

    // Optional heading-up camera rotation
    if (this.world.cameraMode === 'heading_up' || Math.abs(this.world.cameraAngle) > 0.001) {
      ctx.rotate(this.world.cameraAngle);
    }

    ctx.translate(-this.player.x, -this.player.y);

    // 1. World Background (Snack Garden, outer hazard stripes, borders)
    this.world.renderBackground(ctx, virtualW, virtualH, this.player.x, this.player.y);

    // 2. Obstacles
    this.obstacles.render(ctx, cullX - 100, cullY - 100, virtualW + 200, virtualH + 200);

    // 3. Collectibles
    this.collectibles.render(ctx, cullX - 100, cullY - 100, virtualW + 200, virtualH + 200);

    // 4. Forward guidance beam (projects ahead of the snake head)
    this.player.renderGuidanceBeam(ctx);

    // 5. Player Character & Trail
    this.player.render(ctx);

    // 6. Visual Effects & Floating Texts
    this.effects.render(ctx);

    // 7. Overworld Clouds
    this.world.renderClouds(ctx);

    ctx.restore();

    // 8. Screen-Edge Radar Pointers (Rendered in screen coordinate space)
    this.renderEdgeRadar(ctx, w, h, zoom);
  }

  /**
   * Renders edge indicators pointing to off-screen snacks, power-ups, or warning of close obstacles
   */
  private renderEdgeRadar(ctx: CanvasRenderingContext2D, w: number, h: number, zoom: number) {
    if (this.player.isDead) return;

    const cx = w / 2;
    const cy = h / 2;
    const margin = 26; // Distance from screen border

    // 1. Point to nearest high-value or matching snack
    let nearestSnack: { dist: number; dx: number; dy: number; val: number } | null = null;
    for (const item of this.collectibles.items) {
      if (item.collected || item.kind !== 'number') continue;
      const dx = item.x - this.player.x;
      const dy = item.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      // Only point if off-screen (accounting for zoom)
      if (Math.abs(dx * zoom) > cx - 40 || Math.abs(dy * zoom) > cy - 40) {
        if (!nearestSnack || dist < nearestSnack.dist) {
          nearestSnack = { dist, dx, dy, val: item.value };
        }
      }
    }

    if (nearestSnack) {
      this.drawRadarBadge(ctx, cx, cy, w, h, margin, nearestSnack.dx, nearestSnack.dy, `${nearestSnack.val}`, '#f59e0b', '#78350f');
    }

    // 2. Point to nearest Power-Up
    let nearestPowerUp: { dist: number; dx: number; dy: number; type: string } | null = null;
    for (const item of this.collectibles.items) {
      if (item.collected || item.kind !== 'powerup' || !item.powerUpType) continue;
      const dx = item.x - this.player.x;
      const dy = item.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      // Only point if off-screen
      if (Math.abs(dx * zoom) > cx - 40 || Math.abs(dy * zoom) > cy - 40) {
        if (!nearestPowerUp || dist < nearestPowerUp.dist) {
          nearestPowerUp = { dist, dx, dy, type: item.powerUpType };
        }
      }
    }

    if (nearestPowerUp) {
      this.drawRadarBadge(ctx, cx, cy, w, h, margin, nearestPowerUp.dx, nearestPowerUp.dy, '★', '#06b6d4', '#083344');
    }

    // 3. Proximity danger pulse if obstacle is very close
    for (const obs of this.obstacles.items) {
      const dx = obs.x - this.player.x;
      const dy = obs.y - this.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180 / zoom && dist > 20) {
        // Only warn if they are actually somewhat close in virtual space, scaled by zoom
        const warnAngle = Math.atan2(dy, dx) + (this.world.cameraMode === 'heading_up' ? this.world.cameraAngle : 0);
        const radius = Math.min(cx, cy) - 30;
        const wx = cx + Math.cos(warnAngle) * radius;
        const wy = cy + Math.sin(warnAngle) * radius;

        ctx.save();
        ctx.beginPath();
        ctx.arc(wx, wy, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', wx, wy);
        ctx.restore();
        break;
      }
    }
  }

  private drawRadarBadge(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    h: number,
    margin: number,
    dx: number,
    dy: number,
    text: string,
    bgColor: string,
    textColor: string
  ) {
    // Adjust angle if camera is rotated
    let angle = Math.atan2(dy, dx);
    if (this.world.cameraMode === 'heading_up' || Math.abs(this.world.cameraAngle) > 0.001) {
      angle += this.world.cameraAngle;
    }

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Compute boundary intersection
    const halfW = w / 2 - margin;
    const halfH = h / 2 - margin;

    let posX = cx;
    let posY = cy;

    if (Math.abs(cos) * halfH > Math.abs(sin) * halfW) {
      // Hits left or right screen border
      posX = cx + Math.sign(cos) * halfW;
      posY = cy + (Math.sign(cos) * halfW * sin) / cos;
    } else {
      // Hits top or bottom screen border
      posX = cx + (Math.sign(sin) * halfH * cos) / sin;
      posY = cy + Math.sign(sin) * halfH;
    }

    ctx.save();
    ctx.translate(posX, posY);

    // Small glowing badge
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fillStyle = bgColor;
    ctx.shadowColor = bgColor;
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);

    // Directional pointer arrow
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(19, -3.5);
    ctx.lineTo(19, 3.5);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();

    ctx.restore();
  }
}
