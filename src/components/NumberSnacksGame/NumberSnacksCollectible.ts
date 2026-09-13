import { CollectibleItem, PowerUpType } from './NumberSnacksTypes';
import { getPowerMilestone, POWER_UPS } from './NumberSnacksConfig';

export class CollectibleManager {
  public items: CollectibleItem[] = [];

  constructor() {}

  public spawnInitial(count: number, worldW: number, worldH: number, playerPower: number) {
    this.items = [];
    for (let i = 0; i < count; i++) {
      this.spawnRandom(worldW, worldH, playerPower);
    }
  }

  public spawnRandom(worldW: number, worldH: number, playerPower: number) {
    const pad = 120;
    const x = pad + Math.random() * (worldW - pad * 2);
    const y = pad + Math.random() * (worldH - pad * 2);

    // 20% chance for a special power-up, otherwise a number snack
    const isPowerUp = Math.random() < 0.20;

    if (isPowerUp) {
      const types: PowerUpType[] = ['rainbow', 'golden', 'magnet', 'speed', 'shield', 'slowmo'];
      const pType = types[Math.floor(Math.random() * types.length)];
      this.items.push({
        id: `pu_${Date.now()}_${Math.random()}`,
        x,
        y,
        radius: 18,
        kind: 'powerup',
        value: 0,
        powerUpType: pType,
        bobPhase: Math.random() * Math.PI * 2,
        rotation: 0,
        collected: false,
        spawnTime: Date.now(),
      });
      return;
    }

    // Determine number value based on player power (risk/reward tiers)
    // Common: +2, +4, +8
    // Rare: +16, +32
    // Epic: +64, +128
    // Legendary: +256
    let value = 2;
    const roll = Math.random();

    // Scale options relative to player's power
    const maxOffer = Math.max(8, playerPower);
    if (roll < 0.55) {
      // Small snacks (common)
      value = 2;
    } else if (roll < 0.80) {
      value = 4;
    } else if (roll < 0.92) {
      value = 8;
    } else if (roll < 0.97 && maxOffer >= 16) {
      value = 16;
    } else if (roll < 0.99 && maxOffer >= 32) {
      value = 32;
    } else if (maxOffer >= 64) {
      value = 64;
    } else {
      value = 4;
    }

    this.items.push({
      id: `num_${Date.now()}_${Math.random()}`,
      x,
      y,
      radius: 16 + (Math.log2(value) - 1) * 1.5,
      kind: 'number',
      value,
      bobPhase: Math.random() * Math.PI * 2,
      rotation: 0,
      collected: false,
      spawnTime: Date.now(),
    });
  }

  public update(
    dt: number,
    playerX: number,
    playerY: number,
    isMagnetActive: boolean,
    isRainbowActive: boolean,
    magnetRadius: number
  ) {
    for (const item of this.items) {
      item.bobPhase += dt * 3.5;
      item.rotation += dt * 0.8;

      // Magnetic attraction if Magnet or Rainbow active or within suction radius
      const dx = playerX - item.x;
      const dy = playerY - item.y;
      const dist = Math.hypot(dx, dy);

      const effectiveRadius = (isMagnetActive || isRainbowActive) ? magnetRadius * 1.8 : 45;

      if (dist < effectiveRadius && dist > 10) {
        const pullSpeed = (isMagnetActive || isRainbowActive) ? 380 : 120;
        item.x += (dx / dist) * pullSpeed * dt;
        item.y += (dy / dist) * pullSpeed * dt;
      }
    }

    // Remove collected items
    this.items = this.items.filter(i => !i.collected);
  }

  public render(ctx: CanvasRenderingContext2D, viewX: number, viewY: number, viewW: number, viewH: number) {
    for (const item of this.items) {
      // Frustum culling: skip if off-screen
      if (
        item.x + item.radius < viewX ||
        item.x - item.radius > viewX + viewW ||
        item.y + item.radius < viewY ||
        item.y - item.radius > viewY + viewH
      ) {
        continue;
      }

      const bobOffset = Math.sin(item.bobPhase) * 4;

      ctx.save();
      ctx.translate(item.x, item.y + bobOffset);

      if (item.kind === 'powerup' && item.powerUpType) {
        this.renderPowerUp(ctx, item);
      } else {
        this.renderNumberSnack(ctx, item);
      }

      ctx.restore();
    }
  }

  private renderNumberSnack(ctx: CanvasRenderingContext2D, item: CollectibleItem) {
    const tier = getPowerMilestone(item.value);
    const r = item.radius;

    // Soft ground shadow
    ctx.beginPath();
    ctx.ellipse(0, r + 4, r * 0.9, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fill();

    // Soft outer glow for rare/epic snacks
    if (item.value >= 16) {
      ctx.beginPath();
      ctx.arc(0, 0, r + 6, 0, Math.PI * 2);
      ctx.fillStyle = tier.glowColor;
      ctx.fill();
    }

    // Snack body orb
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 2, 0, 0, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, tier.baseColor);
    grad.addColorStop(1, tier.accentColor);
    ctx.fillStyle = grad;
    ctx.fill();

    // Crisp white border
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.stroke();

    // Little glossy shine arc on top
    ctx.beginPath();
    ctx.ellipse(-r * 0.3, -r * 0.35, r * 0.38, r * 0.18, -Math.PI * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.fill();

    // Number text "+2", "+4", etc.
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 ${Math.max(10, r * 0.95)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#0f172a';
    ctx.strokeText(`+${item.value}`, 0, 1);
    ctx.fillText(`+${item.value}`, 0, 1);
  }

  private renderPowerUp(ctx: CanvasRenderingContext2D, item: CollectibleItem) {
    const meta = POWER_UPS[item.powerUpType || 'rainbow'];
    const r = item.radius;

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, r + 5, r * 0.85, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fill();

    // Outer spinning star/ring glow
    ctx.save();
    ctx.rotate(item.rotation);
    ctx.beginPath();
    ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
    ctx.fillStyle = meta.color + '40';
    ctx.fill();
    ctx.restore();

    // Main orb
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 2, 0, 0, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, meta.color);
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fill();

    // Border
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Power-up letter icon
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const letter = meta.badge.charAt(0);
    ctx.fillText(letter, 0, 0.5);
  }
}
