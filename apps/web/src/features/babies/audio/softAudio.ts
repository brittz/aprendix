/** Soft Web Audio helpers for early-years — no external assets. */

let sharedCtx: AudioContext | null = null;
let muted = false;

export function setBabyMuted(next: boolean) {
  muted = next;
}

export function isBabyMuted() {
  return muted;
}

function ctx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx) sharedCtx = new AudioCtx();
  return sharedCtx;
}

export async function resumeBabyAudio() {
  const audio = ctx();
  if (audio?.state === 'suspended') await audio.resume();
}

function playTone(
  frequency: number,
  durationSec: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.08,
) {
  if (muted) return;
  const audio = ctx();
  if (!audio) return;

  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + durationSec + 0.02);
}

export function playSoftBlip(seed = 0) {
  const base = 220 + (seed % 7) * 40;
  playTone(base, 0.28, 'sine', 0.07);
}

function playGlide(
  startHz: number,
  endHz: number,
  durationSec: number,
  type: OscillatorType,
  gainPeak: number,
  whenOffset = 0,
) {
  if (muted) return;
  const audio = ctx();
  if (!audio) return;

  const now = audio.currentTime + whenOffset;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startHz, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(endHz, 40), now + durationSec);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + durationSec + 0.03);
}

function playVibratoTone(
  frequency: number,
  durationSec: number,
  type: OscillatorType,
  gainPeak: number,
  vibratoHz: number,
  depthHz: number,
  whenOffset = 0,
) {
  if (muted) return;
  const audio = ctx();
  if (!audio) return;

  const now = audio.currentTime + whenOffset;
  const osc = audio.createOscillator();
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  const gain = audio.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  lfo.type = 'sine';
  lfo.frequency.value = vibratoHz;
  lfoGain.gain.value = depthHz;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  lfo.start(now);
  osc.stop(now + durationSec + 0.03);
  lfo.stop(now + durationSec + 0.03);
}

/** Soft characteristic cues — still synthesized, but distinct per animal. */
export function playAnimalCue(kind: string) {
  switch (kind) {
    case 'cat':
      // Meow: rise then fall
      playGlide(520, 780, 0.14, 'sine', 0.08, 0);
      playGlide(780, 420, 0.28, 'triangle', 0.07, 0.12);
      break;
    case 'dog':
      // Two short barks
      playGlide(260, 170, 0.12, 'square', 0.045, 0);
      playGlide(240, 150, 0.14, 'square', 0.04, 0.18);
      break;
    case 'bird':
      // Quick chirps
      playGlide(980, 1280, 0.08, 'sine', 0.06, 0);
      playGlide(1100, 1500, 0.08, 'sine', 0.055, 0.1);
      playGlide(900, 1200, 0.1, 'sine', 0.05, 0.2);
      break;
    case 'cow':
      // Low moo with vibrato
      playVibratoTone(145, 0.55, 'sawtooth', 0.04, 5.5, 12, 0);
      playGlide(155, 110, 0.5, 'triangle', 0.035, 0.05);
      break;
    case 'frog':
      // Ribbit pair
      playGlide(220, 340, 0.1, 'triangle', 0.07, 0);
      playGlide(340, 180, 0.16, 'triangle', 0.06, 0.1);
      playGlide(210, 300, 0.08, 'triangle', 0.05, 0.32);
      break;
    case 'duck':
      // Nasal quacks
      playGlide(420, 280, 0.12, 'sawtooth', 0.035, 0);
      playGlide(400, 260, 0.12, 'sawtooth', 0.03, 0.16);
      break;
    default:
      playTone(300, 0.35, 'triangle', 0.09);
  }
}

export function playColorCue(index: number) {
  playTone(260 + index * 55, 0.32, 'sine', 0.08);
}

export function playPop() {
  playTone(520, 0.18, 'sine', 0.06);
  window.setTimeout(() => playTone(380, 0.22, 'sine', 0.05), 40);
}

export function playMelody() {
  const notes = [262, 294, 330, 392, 330, 294, 262];
  notes.forEach((freq, i) => {
    window.setTimeout(() => playTone(freq, 0.28, 'sine', 0.07), i * 220);
  });
}

export function playBeat() {
  playTone(160, 0.12, 'triangle', 0.07);
}
