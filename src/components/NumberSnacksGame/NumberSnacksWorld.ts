import { ARENA_CONFIG } from './NumberSnacksConfig';

interface DecorativeItem {
  x: number;
  y: number;
  type: 'flower' | 'daisy' | 'mushroom' | 'lollipop';
  color: string;
  size: number;
}

interface CloudItem {
  x: number;
  y: number;
  speed: number;
  scale: number;
  opacity: number;
}

export type CameraMode = 'centered' | 'heading_up';

export class NumberSnacksWorld {
  public width: number = ARENA_CONFIG.WORLD_WIDTH;
  public height: number = ARENA_CONFIG.WORLD_HEIGHT;
  public cameraX: number = 0;
  public cameraY: number = 0;
  public cameraAngle: number = 0;
  public cameraMode: CameraMode = 'centered'; // 'centered' or 'heading_up'
  private decorations: DecorativeItem[] = [];
  private clouds: CloudItem[] = [];
  private borderPulsePhase: number = 0;

  constructor() {
    this.initDecorations();
    this.initClouds();
  }

  private initDecorations() {
    this.decorations = [];
    const count = 110;
    const colors = ['#f43f5e', '#fbbf24', '#a855f7', '#38bdf8', '#fb7185', '#34d399'];
    const types: DecorativeItem['type'][] = ['flower', 'daisy', 'mushroom', 'lollipop'];

    for (let i = 0; i < count; i++) {
      this.decorations.push({
        x: 90 + Math.random() * (this.width - 180),
        y: 90 + Math.random() * (this.height - 180),
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 10 + Math.random() * 9,
      });
    }
  }

  private initClouds() {
    this.clouds = [];
    for (let i = 0; i < 16; i++) {
      this.clouds.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        speed: 12 + Math.random() * 16,
        scale: 0.8 + Math.random() * 0.7,
        opacity: 0.22 + Math.random() * 0.2,
      });
    }
  }

  public toggleCameraMode(): CameraMode {
    this.cameraMode = this.cameraMode === 'centered' ? 'heading_up' : 'centered';
    return this.cameraMode;
  }

  public setCameraMode(mode: CameraMode) {
    this.cameraMode = mode;
  }

  public update(dt: number, targetX: number, targetY: number, screenW: number, screenH: number, playerAngle: number = 0) {
    // Instant exact centering: the player head stays mathematically locked in screen center
    this.cameraX = targetX - screenW / 2;
    this.cameraY = targetY - screenH / 2;

    this.borderPulsePhase += dt * 3.0;

    // Smooth camera rotation if heading_up mode is enabled
    if (this.cameraMode === 'heading_up') {
      // Orient camera so player's angle faces directly UP (-PI/2)
      const desiredAngle = -playerAngle - Math.PI / 2;
      let diff = desiredAngle - this.cameraAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.cameraAngle += diff * Math.min(1, 8.0 * dt);
    } else {
      // Smoothly reset camera rotation back to 0
      let diff = 0 - this.cameraAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.cameraAngle += diff * Math.min(1, 10.0 * dt);
    }

    // Drifting clouds
    for (const cloud of this.clouds) {
      cloud.x += cloud.speed * dt;
      if (cloud.x > this.width + 300) {
        cloud.x = -300;
        cloud.y = Math.random() * this.height;
      }
    }
  }

  public renderBackground(
    ctx: CanvasRenderingContext2D,
    screenW: number,
    screenH: number,
    playerX: number,
    playerY: number
  ) {
    // 1. Outside Void / Infinite Outer Meadow
    // To ensure no black bars when player is near arena border, fill a generous area around the arena
    const outerPad = 800;
    ctx.fillStyle = '#064e3b'; // Deep dark emerald green outside arena
    ctx.fillRect(-outerPad, -outerPad, this.width + outerPad * 2, this.height + outerPad * 2);

    // Diagonal warning stripes outside arena border
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.lineWidth = 14;
    const stripeSpacing = 60;
    for (let s = -outerPad; s < this.width + outerPad; s += stripeSpacing) {
      ctx.beginPath();
      ctx.moveTo(s, -outerPad);
      ctx.lineTo(s + outerPad * 2, this.height + outerPad);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Main Arena Playing Ground (Soft fresh mint gradient)
    const bgGrad = ctx.createLinearGradient(0, 0, this.width, this.height);
    bgGrad.addColorStop(0, '#f0fdf4'); // fresh soft mint
    bgGrad.addColorStop(0.5, '#dcfce7'); // bright pastel green
    bgGrad.addColorStop(1, '#bbf7d0'); // lively meadow green
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 3. Grid Pattern inside playing field
    const tileSize = 70;
    ctx.fillStyle = 'rgba(34, 197, 94, 0.055)';
    for (let x = 0; x < this.width; x += tileSize * 2) {
      for (let y = 0; y < this.height; y += tileSize * 2) {
        ctx.fillRect(x, y, tileSize, tileSize);
        ctx.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
      }
    }

    // Grid guide lines
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= this.width; x += tileSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }
    for (let y = 0; y <= this.height; y += tileSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();

    // 4. Render Ground Decorations within view
    const cullMargin = 120;
    for (const d of this.decorations) {
      if (
        d.x < this.cameraX - cullMargin ||
        d.x > this.cameraX + screenW + cullMargin ||
        d.y < this.cameraY - cullMargin ||
        d.y > this.cameraY + screenH + cullMargin
      ) {
        continue;
      }

      ctx.save();
      ctx.translate(d.x, d.y);

      if (d.type === 'daisy') {
        // Sugar Daisy
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * d.size * 0.6, Math.sin(a) * d.size * 0.6, d.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, d.size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
      } else if (d.type === 'flower') {
        // Candy Flower
        ctx.beginPath();
        ctx.arc(0, 0, d.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, d.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.fill();
      } else if (d.type === 'mushroom') {
        // Pastel mini mushroom
        ctx.beginPath();
        ctx.arc(0, 0, d.size * 0.8, Math.PI, 0);
        ctx.fillStyle = d.color;
        ctx.fill();
        ctx.beginPath();
        ctx.rect(-d.size * 0.25, 0, d.size * 0.5, d.size * 0.6);
        ctx.fillStyle = '#fdf4ff';
        ctx.fill();
      } else {
        // Lollipop
        ctx.beginPath();
        ctx.arc(0, -d.size * 0.5, d.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
        ctx.beginPath();
        ctx.rect(-2, 0, 4, d.size * 0.8);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      ctx.restore();
    }

    // 5. Candy Fence Arena Perimeter Walls
    const wallOffset = 40;
    const arenaW = this.width - wallOffset * 2;
    const arenaH = this.height - wallOffset * 2;

    // Glowing border zone glow
    const pulseAlpha = 0.4 + Math.sin(this.borderPulsePhase) * 0.2;
    ctx.save();
    ctx.lineWidth = 16;
    ctx.strokeStyle = `rgba(244, 63, 94, ${pulseAlpha})`;
    ctx.strokeRect(wallOffset, wallOffset, arenaW, arenaH);

    // Inner bright white & candy line
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#f43f5e';
    ctx.strokeRect(wallOffset, wallOffset, arenaW, arenaH);

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(wallOffset, wallOffset, arenaW, arenaH);

    // Corner decorative candy towers
    const corners = [
      { x: wallOffset, y: wallOffset },
      { x: wallOffset + arenaW, y: wallOffset },
      { x: wallOffset, y: wallOffset + arenaH },
      { x: wallOffset + arenaW, y: wallOffset + arenaH },
    ];
    for (const c of corners) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }
    ctx.restore();

    // 6. Proximity Warning if player is very close to boundary
    const distToLeft = playerX - wallOffset;
    const distToRight = wallOffset + arenaW - playerX;
    const distToTop = playerY - wallOffset;
    const distToBottom = wallOffset + arenaH - playerY;
    const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

    if (minDist < 120) {
      const warnIntensity = Math.max(0, (120 - minDist) / 120);
      ctx.save();
      ctx.fillStyle = `rgba(244, 63, 94, ${warnIntensity * 0.18})`;
      ctx.fillRect(wallOffset, wallOffset, arenaW, arenaH);
      ctx.restore();
    }
  }

  public renderClouds(ctx: CanvasRenderingContext2D) {
    for (const cloud of this.clouds) {
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.scale(cloud.scale, cloud.scale);
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;

      // Fluffy cloud shape
      ctx.beginPath();
      ctx.arc(-30, 0, 25, 0, Math.PI * 2);
      ctx.arc(0, -15, 35, 0, Math.PI * 2);
      ctx.arc(35, 0, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
