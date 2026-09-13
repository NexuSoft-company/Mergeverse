import { safeGetItem, safeSetItem } from './safeStorage';

class AudioEngine {
  ctx: AudioContext | null = null;
  bgmOsc1: OscillatorNode | null = null;
  bgmOsc2: OscillatorNode | null = null;
  bgmFilter: BiquadFilterNode | null = null;
  bgmGain: GainNode | null = null;
  bgmLfo: OscillatorNode | null = null;
  isMuted = false;

  constructor() {
    try {
      const stored = safeGetItem('dp_muted', 'false');
      if (stored === 'true') this.isMuted = true;
    } catch {
      this.isMuted = false;
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (err) {
        console.warn('AudioContext not allowed or not supported in this environment:', err);
      }
    }
  }

  play(freq: number, type: OscillatorType, length: number, volume: number, slideFreq?: number) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    if (slideFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + length);
    }

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + length);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + length);
  }

  click() { 
    if (this.isMuted) return;
    this.play(800, 'sine', 0.05, 0.03); 
  }
  
  drop() { 
    if (this.isMuted) return;
    this.play(200, 'sine', 0.15, 0.1, 50); 
    this.play(150, 'triangle', 0.1, 0.05); 
  }
  
  merge(comboLevel = 1) {
    if (this.isMuted) return;
    const tones = [
      440.00, // A4
      493.88, // B4
      554.37, // C#5
      587.33, // D5
      659.25, // E5
      739.99, // F#5
      830.61, // G#5
      880.00, // A5
      987.77, // B5
      1108.73, // C#6
      1174.66, // D6
      1318.51, // E6
      1479.98, // F#6
      1661.22, // G#6
      1760.00, // A6
    ];
    
    const idx = Math.min(comboLevel - 1, tones.length - 1);
    const freq1 = tones[idx];
    const freq2 = tones[Math.min(idx + 2, tones.length - 1)]; // major third higher

    // High crystal sound
    this.play(freq1, 'sine', 0.3, 0.1);
    setTimeout(() => this.play(freq2, 'sine', 0.4, 0.08), 50);

    // Deep futuristic bass layer
    if (comboLevel > 1) {
      const bassFreq = tones[Math.max(0, idx - 5)] / 2; // Octave lower
      this.play(bassFreq, 'triangle', 0.4, 0.15);
      this.play(bassFreq / 2, 'square', 0.3, 0.05); // Sub bass
    }
  }

  reward() {
    if (this.isMuted) return;
    this.play(523.25, 'sine', 0.1, 0.1); // C5
    setTimeout(() => this.play(659.25, 'sine', 0.1, 0.1), 100); // E5
    setTimeout(() => this.play(783.99, 'sine', 0.1, 0.1), 200); // G5
    setTimeout(() => this.play(1046.50, 'sine', 0.4, 0.15), 300); // C6
  }

  levelUp() {
    if (this.isMuted) return;
    this.play(440, 'triangle', 0.1, 0.1);
    setTimeout(() => this.play(554.37, 'triangle', 0.1, 0.1), 100);
    setTimeout(() => this.play(659.25, 'triangle', 0.1, 0.1), 200);
    setTimeout(() => this.play(880, 'triangle', 0.5, 0.15), 300);
    setTimeout(() => this.play(1108.73, 'triangle', 0.7, 0.1), 400);
  }

  pop() {
    if (this.isMuted) return;
    this.play(600, 'sine', 0.06, 0.08, 900);
  }

  powerUp() {
    if (this.isMuted) return;
    this.play(523.25, 'triangle', 0.1, 0.1);
    setTimeout(() => this.play(659.25, 'triangle', 0.12, 0.1), 80);
    setTimeout(() => this.play(783.99, 'triangle', 0.15, 0.12), 160);
    setTimeout(() => this.play(1046.5, 'triangle', 0.3, 0.15), 240);
  }

  sparkle() {
    if (this.isMuted) return;
    this.play(1200, 'sine', 0.08, 0.06);
    setTimeout(() => this.play(1600, 'sine', 0.08, 0.06), 60);
    setTimeout(() => this.play(2000, 'sine', 0.12, 0.05), 120);
  }

  tap() {
    this.click();
  }

  gameover() {
    if (this.isMuted) return;
    this.play(300, 'sawtooth', 0.2, 0.08, 200);
    setTimeout(() => this.play(220, 'sawtooth', 0.25, 0.08, 140), 120);
    setTimeout(() => this.play(150, 'sawtooth', 0.35, 0.08, 80), 260);
  }

  gameOver() {
    this.gameover();
  }

  error() {
    if (this.isMuted) return;
    this.play(200, 'sawtooth', 0.2, 0.08, 150);
    setTimeout(() => this.play(150, 'sawtooth', 0.2, 0.08, 100), 100);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    safeSetItem('dp_muted', this.isMuted ? 'true' : 'false');
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.init();
      this.startBGM();
    }
    return this.isMuted;
  }

  startBGM() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || this.bgmOsc1 || this.ctx.state === 'suspended') return;

    // Ambient relaxing drone
    this.bgmOsc1 = this.ctx.createOscillator();
    this.bgmOsc2 = this.ctx.createOscillator();
    this.bgmGain = this.ctx.createGain();
    this.bgmFilter = this.ctx.createBiquadFilter();
    this.bgmLfo = this.ctx.createOscillator();

    this.bgmOsc1.type = 'sine';
    this.bgmOsc2.type = 'triangle';
    
    // Very low relaxing frequencies
    this.bgmOsc1.frequency.value = 110; // A2
    this.bgmOsc2.frequency.value = 111.5; // Detuned
    
    // Auto-panning/filtering for ambient movement
    this.bgmFilter.type = 'lowpass';
    this.bgmFilter.frequency.value = 400; // Muffled relaxing pad sound
    
    this.bgmLfo.type = 'sine';
    this.bgmLfo.frequency.value = 0.1; // 10s cycle
    
    // LFO modulates the filter cutoff
    const filterGain = this.ctx.createGain();
    filterGain.gain.value = 300; // Modulation depth
    this.bgmLfo.connect(filterGain);
    filterGain.connect(this.bgmFilter.frequency);

    this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.bgmGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 3); // Fade in

    this.bgmOsc1.connect(this.bgmFilter);
    this.bgmOsc2.connect(this.bgmFilter);
    this.bgmFilter.connect(this.bgmGain);
    this.bgmGain.connect(this.ctx.destination);

    this.bgmLfo.start();
    this.bgmOsc1.start();
    this.bgmOsc2.start();
  }

  stopBGM() {
    if (!this.bgmGain || !this.ctx) return;
    this.bgmGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1); // Fade out
    setTimeout(() => {
      this.bgmOsc1?.stop();
      this.bgmOsc2?.stop();
      this.bgmLfo?.stop();
      this.bgmOsc1?.disconnect();
      this.bgmOsc2?.disconnect();
      this.bgmGain?.disconnect();
      this.bgmFilter?.disconnect();
      this.bgmLfo?.disconnect();
      this.bgmOsc1 = null;
      this.bgmOsc2 = null;
      this.bgmGain = null;
      this.bgmFilter = null;
      this.bgmLfo = null;
    }, 1000);
  }
}

export const audio = new AudioEngine();
