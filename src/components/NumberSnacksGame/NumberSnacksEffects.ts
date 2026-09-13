import { FloatingTextItem, ParticleItem } from './NumberSnacksTypes';

export class EffectsManager {
  public particles: ParticleItem[] = [];
  public floatingTexts: FloatingTextItem[] = [];

  constructor() {}

  public spawnEatCrumbs(x: number, y: number, color: string, count: number = 8) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 90;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        color,
        alpha: 1,
        life: 0,
        maxLife: 0.45 + Math.random() * 0.25,
        shape: Math.random() > 0.5 ? 'crumb' : 'circle',
      });
    }
  }

  public spawnPowerUpBurst(x: number, y: number, color: string) {
    // 1. Expanding ring
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      size: 15,
      color,
      alpha: 1,
      life: 0,
      maxLife: 0.6,
      shape: 'ring',
    });

    // 2. Exploding stars
    for (let i = 0; i < 20; i++) {
      const angle = (i * Math.PI * 2) / 20;
      const speed = 80 + Math.random() * 120;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 5,
        color: i % 2 === 0 ? color : '#ffffff',
        alpha: 1,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.3,
        shape: 'star',
      });
    }
  }

  public addFloatingText(text: string, x: number, y: number, color: string = '#ffffff') {
    this.floatingTexts.push({
      id: `ft_${Date.now()}_${Math.random()}`,
      text,
      x,
      y,
      color,
      alpha: 1,
      scale: 1,
      life: 0,
      maxLife: 0.9,
    });
  }

  public update(dt: number) {
    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.92;
      p.vy *= 0.92;

      const progress = p.life / p.maxLife;
      p.alpha = 1 - progress;

      if (p.shape === 'ring') {
        p.size += dt * 160;
      }
    }

    // Update Floating Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life += dt;
      if (ft.life >= ft.maxLife) {
        this.floatingTexts.splice(i, 1);
        continue;
      }

      ft.y -= dt * 45; // float upward
      const progress = ft.life / ft.maxLife;
      ft.alpha = 1 - Math.pow(progress, 2);
      ft.scale = 1 + Math.sin(progress * Math.PI) * 0.25;
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    // Render Particles
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);

      if (p.shape === 'ring') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = p.color;
        ctx.stroke();
      } else if (p.shape === 'star') {
        ctx.fillStyle = p.color;
        this.drawStar(ctx, 0, 0, 5, p.size, p.size * 0.5);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.restore();
    }

    // Render Floating Texts
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.translate(ft.x, ft.y);
      ctx.scale(ft.scale, ft.scale);

      ctx.font = '900 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Outline
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#0f172a';
      ctx.strokeText(ft.text, 0, 0);

      // Fill
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, 0, 0);

      ctx.restore();
    }
  }

  private drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
}
