/**
 * Polished, cozy Web Audio synthesizer for Aisha's OS.
 * Synthesizes soft, warm acoustic marimba, music box, and tactile mechanical click tones
 * without relying on external mp3s, ensuring instant latency-free response.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  return isMuted;
};

export const getIsMuted = (): boolean => isMuted;

export const setMuted = (muted: boolean) => {
  isMuted = muted;
};

/**
 * Soft tactile click (for general buttons, taskbar, subtle clicks)
 */
export const playClick = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 0.05);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};

/**
 * Gentle warm marimba note (for opening windows, navigating screens)
 */
export const playWindowOpen = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25]; // C5, E5 gentle chord
  
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.05);

    const start = now + idx * 0.05;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.08, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.36);
  });
};

/**
 * Soft muted tap (for closing windows)
 */
export const playWindowClose = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
};

/**
 * Music box chime (for screen navigation transitions or special events)
 */
export const playChime = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
  
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    const start = now + idx * 0.08;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.05, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0005, start + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.52);
  });
};

/**
 * Sparkle chime for blooming hibiscus, mirror reveal, or cute result
 */
export const playSparkle = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
  
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);

    const start = now + idx * 0.06;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.045, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0005, start + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.46);
  });
};

/**
 * Special celebratory clock chime for 7:20 PM
 */
export const playClockUnlockChime = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chords = [
    [523.25, 659.25, 783.99],       // C Major
    [587.33, 739.99, 880],          // D Major
    [659.25, 830.61, 987.77],       // E Major
    [1046.50, 1318.51, 1567.98]     // High C Octave
  ];

  chords.forEach((chord, chordIdx) => {
    const chordTime = now + chordIdx * 0.22;
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, chordTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, chordTime);

      gain.gain.setValueAtTime(0, chordTime);
      gain.gain.linearRampToValueAtTime(0.04, chordTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0005, chordTime + 0.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(chordTime);
      osc.stop(chordTime + 0.85);
    });
  });
};
