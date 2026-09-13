import { BodySegment, DirectionName, Vector2D } from './NumberSnacksTypes';
import { getPowerMilestone, PowerMilestoneInfo } from './NumberSnacksConfig';

export class NumberSnacksPlayer {
  public x: number;
  public y: number;
  public angle: number = 0; // in radians
  public targetAngle: number = 0;
  public speed: number = 180;
  public power: number = 2;
  public milestone: PowerMilestoneInfo;
  public bodySegments: BodySegment[] = [];
  
  // Position history for smooth snake tail interpolation
  private history: Vector2D[] = [];
  private historySpacing: number = 10; // distance between saved points
  private maxHistoryLength: number = 400;

  // Animation states
  public bouncePhase: number = 0;
  public eatTimer: number = 0; // timer for open happy mouth when eating
  public powerUpTimer: number = 0;
  public blinkTimer: number = 0;
  public isBlinking: boolean = false;
  public hasShield: boolean = false;
  public hasGolden: boolean = false;
  public hasSpeed: boolean = false;
  public hasMagnet: boolean = false;
  public isBoosting: boolean = false;
  public isDead: boolean = false;

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.targetAngle = 0;
    this.milestone = getPowerMilestone(2);
    this.initSegments();
    
    // Seed initial history
    for (let i = 0; i < 60; i++) {
      this.history.push({ x: startX - i * 5, y: startY });
    }
  }

  public initSegments() {
    this.milestone = getPowerMilestone(this.power);
    const count = this.milestone.segmentsCount;
    this.bodySegments = [];
    for (let i = 0; i < count; i++) {
      this.bodySegments.push({
        x: this.x - (i + 1) * (this.milestone.headRadius * 0.9),
        y: this.y,
        radius: Math.max(10, this.milestone.headRadius * (0.85 - i * 0.04)),
        power: Math.max(2, Math.floor(this.power / Math.pow(2, i + 1))),
      });
    }
  }

  public setPower(newPower: number) {
    if (newPower > this.power) {
      this.powerUpTimer = 1.0; // 1 second excitement animation
    }
    this.power = newPower;
    this.milestone = getPowerMilestone(this.power);
    
    // Adjust segments count smoothly
    const targetCount = this.milestone.segmentsCount;
    while (this.bodySegments.length < targetCount) {
      const last = this.bodySegments[this.bodySegments.length - 1] || { x: this.x, y: this.y, radius: 14, power: 2 };
      this.bodySegments.push({
        x: last.x,
        y: last.y,
        radius: Math.max(10, this.milestone.headRadius * 0.5),
        power: Math.max(2, Math.floor(this.power / (this.bodySegments.length + 1))),
      });
    }
    while (this.bodySegments.length > targetCount) {
      this.bodySegments.pop();
    }
  }

  public setDirection(dir: DirectionName) {
    switch (dir) {
      case 'RIGHT':
        this.targetAngle = 0;
        break;
      case 'DOWN':
        this.targetAngle = Math.PI / 2;
        break;
      case 'LEFT':
        this.targetAngle = Math.PI;
        break;
      case 'UP':
        this.targetAngle = -Math.PI / 2;
        break;
    }
  }

  public setTargetHeading(dx: number, dy: number) {
    if (Math.hypot(dx, dy) > 0.05) {
      this.targetAngle = Math.atan2(dy, dx);
    }
  }

  public triggerEat() {
    this.eatTimer = 0.35; // open happy mouth
  }

  public update(dt: number, baseSpeed: number, worldWidth: number, worldHeight: number) {
    if (this.isDead) return;

    // Smooth angle interpolation (shortest arc)
    let diff = this.targetAngle - this.angle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const turnRate = 9.5; // smooth fast turning
    this.angle += diff * Math.min(1, turnRate * dt);

    // Speed calculation
    let currentSpeed = baseSpeed;
    if (this.isBoosting) currentSpeed *= 1.35;
    if (this.hasSpeed) currentSpeed *= 1.45;
    this.speed = currentSpeed;

    // Move forward continuously
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;

    this.x += vx * dt;
    this.y += vy * dt;

    // Smooth sliding along world bounds
    const r = this.milestone.headRadius;
    const minX = r + 45;
    const maxX = worldWidth - r - 45;
    const minY = r + 45;
    const maxY = worldHeight - r - 45;

    if (this.x < minX) {
      this.x = minX;
      if (Math.cos(this.targetAngle) < 0) {
        this.targetAngle = Math.sin(this.targetAngle) > 0 ? Math.PI / 2 : -Math.PI / 2;
      }
    } else if (this.x > maxX) {
      this.x = maxX;
      if (Math.cos(this.targetAngle) > 0) {
        this.targetAngle = Math.sin(this.targetAngle) > 0 ? Math.PI / 2 : -Math.PI / 2;
      }
    }

    if (this.y < minY) {
      this.y = minY;
      if (Math.sin(this.targetAngle) < 0) {
        this.targetAngle = Math.cos(this.targetAngle) > 0 ? 0 : Math.PI;
      }
    } else if (this.y > maxY) {
      this.y = maxY;
      if (Math.sin(this.targetAngle) > 0) {
        this.targetAngle = Math.cos(this.targetAngle) > 0 ? 0 : Math.PI;
      }
    }

    // Record history for tail segments
    const lastHistory = this.history[0];
    if (!lastHistory || Math.hypot(this.x - lastHistory.x, this.y - lastHistory.y) >= this.historySpacing) {
      this.history.unshift({ x: this.x, y: this.y });
      if (this.history.length > this.maxHistoryLength) {
        this.history.pop();
      }
    }

    // Update body segments along history path
    const segSpacing = Math.round(this.milestone.headRadius * 0.9 / this.historySpacing);
    for (let i = 0; i < this.bodySegments.length; i++) {
      const targetIndex = (i + 1) * segSpacing;
      const point = this.history[Math.min(targetIndex, this.history.length - 1)] || { x: this.x, y: this.y };
      const seg = this.bodySegments[i];
      // Smooth follow
      seg.x += (point.x - seg.x) * 12 * dt;
      seg.y += (point.y - seg.y) * 12 * dt;
      seg.radius = Math.max(10, this.milestone.headRadius * (0.85 - i * 0.035));
    }

    // Bounce phase for cute walking wobble
    this.bouncePhase += dt * 14;

    // Timers
    if (this.eatTimer > 0) this.eatTimer -= dt;
    if (this.powerUpTimer > 0) this.powerUpTimer -= dt;

    // Blinking
    this.blinkTimer += dt;
    if (this.blinkTimer > 3.2) {
      this.isBlinking = true;
      if (this.blinkTimer > 3.4) {
        this.isBlinking = false;
        this.blinkTimer = 0;
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    const headRadius = this.milestone.headRadius;
    const bounceOffset = Math.sin(this.bouncePhase) * 2.5;

    // 1. Render Tail Segments first (underneath head)
    for (let i = this.bodySegments.length - 1; i >= 0; i--) {
      const seg = this.bodySegments[i];
      ctx.save();
      ctx.translate(seg.x, seg.y);

      // Shadow
      ctx.beginPath();
      ctx.arc(0, 4, seg.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fill();

      // Outer segment body
      ctx.beginPath();
      ctx.arc(0, 0, seg.radius, 0, Math.PI * 2);
      const segGrad = ctx.createRadialGradient(-seg.radius * 0.3, -seg.radius * 0.3, 2, 0, 0, seg.radius);
      segGrad.addColorStop(0, '#fef3c7');
      segGrad.addColorStop(0.3, this.milestone.baseColor);
      segGrad.addColorStop(1, this.milestone.accentColor);
      ctx.fillStyle = segGrad;
      ctx.fill();

      // Cute sprinkle/chocolate chip on segment
      ctx.beginPath();
      ctx.arc(seg.radius * 0.2, -seg.radius * 0.2, seg.radius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();

      // Segment outline
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();

      ctx.restore();
    }

    // 2. Render Aura if power is high
    if (this.milestone.auraLevel > 0 || this.powerUpTimer > 0) {
      ctx.save();
      ctx.translate(this.x, this.y);
      const auraPulse = Math.sin(this.bouncePhase * 0.6) * 6;
      const auraR = headRadius + 12 + auraPulse;
      ctx.beginPath();
      ctx.arc(0, 0, auraR, 0, Math.PI * 2);
      ctx.fillStyle = this.milestone.glowColor;
      ctx.shadowColor = this.milestone.baseColor;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();
    }

    // 3. Render Head Character (Bitey the Cookie Snack)
    ctx.save();
    ctx.translate(this.x, this.y + bounceOffset);

    // Dynamic rotation to face heading angle
    ctx.rotate(this.angle);

    // Head Shadow
    ctx.beginPath();
    ctx.arc(0, 6, headRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fill();

    // Head Cookie Base Body
    ctx.beginPath();
    ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
    const bodyGrad = ctx.createRadialGradient(-headRadius * 0.35, -headRadius * 0.35, 4, 0, 0, headRadius);
    bodyGrad.addColorStop(0, '#fffbeb');
    bodyGrad.addColorStop(0.25, this.milestone.baseColor);
    bodyGrad.addColorStop(0.85, this.milestone.baseColor);
    bodyGrad.addColorStop(1, this.milestone.accentColor);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Cute crisp cookie rim
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.stroke();

    // Chocolate chips on forehead and cheeks
    const chips = [
      { x: -headRadius * 0.45, y: -headRadius * 0.4, r: headRadius * 0.16 },
      { x: -headRadius * 0.5, y: headRadius * 0.35, r: headRadius * 0.14 },
      { x: headRadius * 0.45, y: -headRadius * 0.45, r: headRadius * 0.15 },
    ];
    for (const chip of chips) {
      ctx.beginPath();
      ctx.arc(chip.x, chip.y, chip.r, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
      // chip highlight
      ctx.beginPath();
      ctx.arc(chip.x - chip.r * 0.3, chip.y - chip.r * 0.3, chip.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    }

    // Rosy Blush Cheeks
    ctx.beginPath();
    ctx.ellipse(headRadius * 0.1, -headRadius * 0.55, headRadius * 0.18, headRadius * 0.1, 0, 0, Math.PI * 2);
    ctx.ellipse(headRadius * 0.1, headRadius * 0.55, headRadius * 0.18, headRadius * 0.1, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
    ctx.fill();

    // Big Cute Eyes
    const eyeOffsetX = headRadius * 0.32;
    const eyeOffsetY = headRadius * 0.32;
    const eyeRadius = headRadius * 0.28;

    if (this.isBlinking) {
      // Happy closed eye curves
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#1e1b4b';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(eyeOffsetX, -eyeOffsetY, eyeRadius * 0.8, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(eyeOffsetX, eyeOffsetY, eyeRadius * 0.8, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
    } else {
      // Left Eye
      this.drawCartoonEye(ctx, eyeOffsetX, -eyeOffsetY, eyeRadius);
      // Right Eye
      this.drawCartoonEye(ctx, eyeOffsetX, eyeOffsetY, eyeRadius);
    }

    // Mouth
    if (this.isDead) {
      // Dazed / sad mouth
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(headRadius * 0.4, 0, headRadius * 0.18, Math.PI * 0.8, Math.PI * 1.2);
      ctx.stroke();
    } else if (this.eatTimer > 0) {
      // Big happy open mouth with cute tongue!
      ctx.beginPath();
      ctx.ellipse(headRadius * 0.42, 0, headRadius * 0.22, headRadius * 0.16, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
      // pink tongue
      ctx.beginPath();
      ctx.arc(headRadius * 0.45, headRadius * 0.04, headRadius * 0.12, 0, Math.PI);
      ctx.fillStyle = '#fb7185';
      ctx.fill();
    } else {
      // Happy gentle smile
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#451a03';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(headRadius * 0.32, 0, headRadius * 0.16, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.stroke();
    }

    ctx.restore();

    // 4. Power Badge centered on head or hovering
    ctx.save();
    ctx.translate(this.x, this.y + bounceOffset);
    ctx.beginPath();
    ctx.arc(0, -headRadius - 14, 13, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.milestone.baseColor;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.power}`, 0, -headRadius - 14);
    ctx.restore();

    // 5. Shield Bubble Effect
    if (this.hasShield) {
      ctx.save();
      ctx.translate(this.x, this.y);
      const shieldR = headRadius + 18 + Math.sin(this.bouncePhase * 0.8) * 3;
      ctx.beginPath();
      ctx.arc(0, 0, shieldR, 0, Math.PI * 2);
      const shieldGrad = ctx.createRadialGradient(0, 0, shieldR * 0.6, 0, 0, shieldR);
      shieldGrad.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
      shieldGrad.addColorStop(0.85, 'rgba(56, 189, 248, 0.35)');
      shieldGrad.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
      ctx.fillStyle = shieldGrad;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.stroke();

      // Bubble shimmer shine
      ctx.beginPath();
      ctx.ellipse(-shieldR * 0.45, -shieldR * 0.45, shieldR * 0.25, shieldR * 0.12, Math.PI * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
      ctx.restore();
    }
  }

  private drawCartoonEye(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    // Sclera
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.stroke();

    // Pupil (looking forward)
    const pupilX = x + r * 0.25;
    const pupilY = y;
    const pupilR = r * 0.58;
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, pupilR, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    // Eye Sparkle 1 (Large)
    ctx.beginPath();
    ctx.arc(pupilX - pupilR * 0.28, pupilY - pupilR * 0.32, pupilR * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Eye Sparkle 2 (Small)
    ctx.beginPath();
    ctx.arc(pupilX + pupilR * 0.3, pupilY + pupilR * 0.3, pupilR * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  /**
   * Renders a glowing forward guidance trajectory beam ahead of the head
   * giving crystal clear visibility of steering direction
   */
  public renderGuidanceBeam(ctx: CanvasRenderingContext2D) {
    if (this.isDead) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    const beamLength = 115;
    const headR = this.milestone.headRadius;

    // Glowing subtle directional cone
    const grad = ctx.createLinearGradient(headR + 5, 0, headR + beamLength, 0);
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
    grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
    grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

    ctx.beginPath();
    ctx.moveTo(headR + 6, -8);
    ctx.lineTo(headR + beamLength, -1);
    ctx.lineTo(headR + beamLength, 1);
    ctx.lineTo(headR + 6, 8);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Moving forward guidance chevrons / dashes
    const phase = (this.bouncePhase * 45) % 30;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    for (let d = headR + 20 + phase; d < headR + beamLength - 10; d += 30) {
      const alpha = 1 - (d - headR) / beamLength;
      ctx.strokeStyle = `rgba(254, 240, 138, ${alpha * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(d - 5, -5);
      ctx.lineTo(d, 0);
      ctx.lineTo(d - 5, 5);
      ctx.stroke();
    }

    // Aim focal point at end of beam
    ctx.beginPath();
    ctx.arc(headR + beamLength * 0.75, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();

    ctx.restore();
  }
}
