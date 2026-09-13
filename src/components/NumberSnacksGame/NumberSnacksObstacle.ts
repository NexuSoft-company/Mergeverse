import { ObstacleItem, ObstacleType } from './NumberSnacksTypes';

export class ObstacleManager {
  public items: ObstacleItem[] = [];

  constructor() {}

  public spawnInitial(count: number, worldW: number, worldH: number) {
    this.items = [];
    const pad = 200;
    const types: ObstacleType[] = ['bush', 'candy_rock', 'candy_block', 'bubble', 'rolling_cookie'];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const x = pad + Math.random() * (worldW - pad * 2);
      const y = pad + Math.random() * (worldH - pad * 2);

      // Moving vs static
      const isMoving = type === 'bubble' || type === 'rolling_cookie';
      const vx = isMoving ? (Math.random() - 0.5) * 50 : 0;
      const vy = isMoving ? (Math.random() - 0.5) * 50 : 0;

      let radius = 24;
      let color = '#10b981';
      let accentColor = '#047857';

      switch (type) {
        case 'bush':
          radius = 26 + Math.random() * 8;
          color = '#22c55e';
          accentColor = '#15803d';
          break;
        case 'candy_rock':
          radius = 28 + Math.random() * 8;
          color = '#a855f7';
          accentColor = '#7e22ce';
          break;
        case 'candy_block':
          radius = 24 + Math.random() * 6;
          color = '#f59e0b';
          accentColor = '#d97706';
          break;
        case 'bubble':
          radius = 22 + Math.random() * 6;
          color = '#38bdf8';
          accentColor = '#0284c7';
          break;
        case 'rolling_cookie':
          radius = 24 + Math.random() * 6;
          color = '#b45309';
          accentColor = '#78350f';
          break;
      }

      this.items.push({
        id: `obs_${i}_${Date.now()}`,
        type,
        x,
        y,
        radius,
        vx,
        vy,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        scale: 1,
        bobPhase: Math.random() * Math.PI * 2,
        color,
        accentColor,
      });
    }
  }

  public update(dt: number, slowMoMultiplier: number, worldW: number, worldH: number) {
    const effectiveDt = dt * slowMoMultiplier;

    for (const obs of this.items) {
      obs.bobPhase += effectiveDt * 2.5;
      obs.rotation += obs.rotationSpeed * effectiveDt;

      // Move dynamic obstacles
      if (obs.vx !== 0 || obs.vy !== 0) {
        obs.x += obs.vx * effectiveDt;
        obs.y += obs.vy * effectiveDt;

        // Bounce off arena perimeter
        const pad = 100;
        if (obs.x < pad || obs.x > worldW - pad) obs.vx *= -1;
        if (obs.y < pad || obs.y > worldH - pad) obs.vy *= -1;
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, viewX: number, viewY: number, viewW: number, viewH: number) {
    for (const obs of this.items) {
      // Frustum culling
      if (
        obs.x + obs.radius < viewX ||
        obs.x - obs.radius > viewX + viewW ||
        obs.y + obs.radius < viewY ||
        obs.y - obs.radius > viewY + viewH
      ) {
        continue;
      }

      ctx.save();
      ctx.translate(obs.x, obs.y);

      switch (obs.type) {
        case 'bush':
          this.renderBush(ctx, obs);
          break;
        case 'candy_rock':
          this.renderCandyRock(ctx, obs);
          break;
        case 'candy_block':
          this.renderCandyBlock(ctx, obs);
          break;
        case 'bubble':
          this.renderBubble(ctx, obs);
          break;
        case 'rolling_cookie':
          this.renderRollingCookie(ctx, obs);
          break;
      }

      ctx.restore();
    }
  }

  private renderBush(ctx: CanvasRenderingContext2D, obs: ObstacleItem) {
    const r = obs.radius;
    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, r * 0.7, r * 1.1, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    ctx.fill();

    // 3 overlapping puffy bush circles
    const lobes = [
      { x: -r * 0.4, y: 0, r: r * 0.65 },
      { x: r * 0.4, y: 0, r: r * 0.65 },
      { x: 0, y: -r * 0.35, r: r * 0.72 },
    ];

    for (const lobe of lobes) {
      ctx.beginPath();
      ctx.arc(lobe.x, lobe.y, lobe.r, 0, Math.PI * 2);
      ctx.fillStyle = obs.color;
      ctx.fill();
    }

    // Little sweet berries on the bush
    const berries = [
      { x: -r * 0.25, y: -r * 0.2, r: 4 },
      { x: r * 0.25, y: -r * 0.15, r: 3.5 },
      { x: 0, y: r * 0.1, r: 4 },
    ];
    for (const b of berries) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(b.x - 1, b.y - 1, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  }

  private renderCandyRock(ctx: CanvasRenderingContext2D, obs: ObstacleItem) {
    const r = obs.radius;
    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, r * 0.8, r * 0.95, r * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fill();

    // Soft gumdrop rock
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 2, 0, 0, r);
    grad.addColorStop(0, '#f3e8ff');
    grad.addColorStop(0.3, obs.color);
    grad.addColorStop(1, obs.accentColor);
    ctx.fillStyle = grad;
    ctx.fill();

    // Sugar crystal speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(-r * 0.3, -r * 0.4, 3, 0, Math.PI * 2);
    ctx.arc(r * 0.35, -r * 0.2, 2.5, 0, Math.PI * 2);
    ctx.arc(0, r * 0.3, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  private renderCandyBlock(ctx: CanvasRenderingContext2D, obs: ObstacleItem) {
    const r = obs.radius;
    const w = r * 1.6;
    const h = r * 1.6;

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, r * 0.75, r * 0.95, r * 0.38, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    ctx.fill();

    // Rounded toy block
    ctx.save();
    ctx.rotate(obs.rotation * 0.2);
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 8);
    const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.4, obs.color);
    grad.addColorStop(1, obs.accentColor);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.restore();
  }

  private renderBubble(ctx: CanvasRenderingContext2D, obs: ObstacleItem) {
    const r = obs.radius;
    const bob = Math.sin(obs.bobPhase) * 3;
    ctx.translate(0, bob);

    // Iridescent bubble sphere
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-r * 0.4, -r * 0.4, 2, 0, 0, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.35)');
    grad.addColorStop(0.8, 'rgba(168, 85, 247, 0.3)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.6)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.stroke();

    // Cute smiling dot face on bubble
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(-r * 0.25, -r * 0.1, 2, 0, Math.PI * 2);
    ctx.arc(r * 0.25, -r * 0.1, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, r * 0.1, 3.5, 0, Math.PI);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#0284c7';
    ctx.stroke();
  }

  private renderRollingCookie(ctx: CanvasRenderingContext2D, obs: ObstacleItem) {
    const r = obs.radius;
    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, r * 0.7, r * 0.9, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    ctx.fill();

    // Rotating cookie wheel
    ctx.save();
    ctx.rotate(obs.rotation);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = obs.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fef3c7';
    ctx.stroke();

    // 4 spinning chocolate chips
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const cx = Math.cos(a) * (r * 0.5);
      const cy = Math.sin(a) * (r * 0.5);
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
    }
    ctx.restore();
  }
}
