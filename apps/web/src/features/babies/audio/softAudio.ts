/** Soft Web Audio helpers for early-years. Animal cues prefer licensed samples. */

import { ANIMAL_SAMPLE_FILES } from '../../early-shared/animalCatalog';

let sharedCtx: AudioContext | null = null;
let muted = false;

/** Keep kid taps snappy even when Commons clips are long. */
const SAMPLE_MAX_SEC = 3.6;

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

/** Soft synthesized fallback (used if a sample is missing or fails). */
function playAnimalSynth(kind: string) {
  switch (kind) {
    case 'cat':
      playGlide(520, 780, 0.14, 'sine', 0.08, 0);
      playGlide(780, 420, 0.28, 'triangle', 0.07, 0.12);
      break;
    case 'dog':
      playGlide(260, 170, 0.12, 'square', 0.045, 0);
      playGlide(240, 150, 0.14, 'square', 0.04, 0.18);
      break;
    case 'bird':
      playGlide(980, 1280, 0.08, 'sine', 0.06, 0);
      playGlide(1100, 1500, 0.08, 'sine', 0.055, 0.1);
      playGlide(900, 1200, 0.1, 'sine', 0.05, 0.2);
      break;
    case 'cow':
      playVibratoTone(145, 0.55, 'sawtooth', 0.04, 5.5, 12, 0);
      playGlide(155, 110, 0.5, 'triangle', 0.035, 0.05);
      break;
    case 'frog':
      playGlide(220, 340, 0.1, 'triangle', 0.07, 0);
      playGlide(340, 180, 0.16, 'triangle', 0.06, 0.1);
      playGlide(210, 300, 0.08, 'triangle', 0.05, 0.32);
      break;
    case 'duck':
      playGlide(420, 280, 0.12, 'sawtooth', 0.035, 0);
      playGlide(400, 260, 0.12, 'sawtooth', 0.03, 0.16);
      break;
    case 'pig':
      playGlide(280, 360, 0.1, 'sawtooth', 0.04, 0);
      playGlide(340, 220, 0.16, 'triangle', 0.035, 0.12);
      break;
    case 'horse':
      playGlide(420, 620, 0.18, 'sawtooth', 0.04, 0);
      playGlide(600, 380, 0.22, 'triangle', 0.035, 0.16);
      break;
    case 'sheep':
      playVibratoTone(320, 0.4, 'sawtooth', 0.035, 7, 18, 0);
      playGlide(300, 240, 0.28, 'triangle', 0.03, 0.08);
      break;
    case 'chicken':
      playGlide(620, 480, 0.08, 'square', 0.03, 0);
      playGlide(700, 520, 0.08, 'square', 0.028, 0.1);
      playGlide(580, 460, 0.1, 'square', 0.026, 0.2);
      break;
    case 'lion':
      playGlide(180, 120, 0.35, 'sawtooth', 0.045, 0);
      playVibratoTone(140, 0.45, 'triangle', 0.04, 4, 10, 0.12);
      break;
    case 'elephant':
      playGlide(260, 420, 0.22, 'sawtooth', 0.04, 0);
      playGlide(400, 180, 0.35, 'triangle', 0.035, 0.18);
      break;
    case 'monkey':
      playGlide(620, 880, 0.1, 'square', 0.03, 0);
      playGlide(700, 980, 0.1, 'square', 0.028, 0.12);
      playGlide(560, 760, 0.12, 'square', 0.026, 0.24);
      break;
    case 'goat':
    case 'donkey':
      playVibratoTone(380, 0.35, 'sawtooth', 0.035, 8, 22, 0);
      playGlide(360, 280, 0.22, 'triangle', 0.03, 0.1);
      break;
    case 'rooster':
    case 'turkey':
      playGlide(520, 720, 0.12, 'sawtooth', 0.04, 0);
      playGlide(680, 420, 0.2, 'square', 0.03, 0.14);
      break;
    case 'hyena':
      playGlide(520, 780, 0.1, 'square', 0.035, 0);
      playGlide(700, 900, 0.12, 'square', 0.03, 0.12);
      playGlide(480, 700, 0.14, 'triangle', 0.028, 0.26);
      break;
    case 'camel':
      playVibratoTone(160, 0.5, 'sawtooth', 0.04, 4, 14, 0);
      playGlide(180, 120, 0.4, 'triangle', 0.03, 0.1);
      break;
    case 'giraffe':
      // Giraffes are nearly silent — soft breathy hum.
      playTone(180, 0.45, 'sine', 0.04);
      playTone(210, 0.35, 'triangle', 0.03);
      break;
    case 'zebra':
      playGlide(380, 520, 0.14, 'sawtooth', 0.035, 0);
      playGlide(480, 320, 0.18, 'triangle', 0.03, 0.16);
      break;
    case 'hippo':
      playGlide(120, 90, 0.28, 'sawtooth', 0.045, 0);
      playGlide(100, 70, 0.35, 'triangle', 0.04, 0.2);
      break;
    case 'flamingo':
      playGlide(680, 520, 0.12, 'sawtooth', 0.03, 0);
      playGlide(620, 780, 0.14, 'triangle', 0.028, 0.14);
      break;
    case 'macaw':
    case 'parrot':
    case 'parakeet':
    case 'budgie':
      playGlide(900, 1400, 0.1, 'square', 0.04, 0);
      playGlide(1200, 700, 0.14, 'sawtooth', 0.035, 0.12);
      playGlide(1000, 1500, 0.1, 'square', 0.03, 0.28);
      break;
    case 'howler':
    case 'gibbon':
      playGlide(280, 520, 0.35, 'sawtooth', 0.04, 0);
      playVibratoTone(420, 0.4, 'triangle', 0.035, 6, 20, 0.2);
      break;
    case 'jaguar':
    case 'bear':
    case 'boar':
      playGlide(160, 100, 0.28, 'sawtooth', 0.045, 0);
      playGlide(140, 80, 0.3, 'triangle', 0.04, 0.18);
      break;
    case 'wolf':
      playGlide(420, 680, 0.55, 'sawtooth', 0.035, 0);
      playGlide(640, 380, 0.45, 'triangle', 0.03, 0.35);
      break;
    case 'bee':
      playVibratoTone(260, 0.55, 'sawtooth', 0.03, 40, 18, 0);
      break;
    case 'whale':
    case 'dolphin':
      playGlide(520, 980, 0.35, 'sine', 0.05, 0);
      playGlide(860, 420, 0.4, 'triangle', 0.04, 0.25);
      break;
    case 'owl':
      playTone(320, 0.25, 'triangle', 0.05);
      window.setTimeout(() => playTone(280, 0.28, 'triangle', 0.045), 280);
      break;
    default:
      // Chirpy / soft default for birds and misc without a dedicated synth.
      playGlide(720, 980, 0.1, 'sine', 0.05, 0);
      playGlide(860, 640, 0.12, 'triangle', 0.04, 0.12);
  }
}

const ANIMAL_SAMPLES: Record<string, string> = { ...ANIMAL_SAMPLE_FILES };

const sampleCache = new Map<string, HTMLAudioElement>();
const sampleFailed = new Set<string>();

/** Latest tap wins: stop any other animal sample still playing. */
function stopOtherAnimalSamples(except: string) {
  for (const [kind, el] of sampleCache) {
    if (kind === except) continue;
    try {
      el.pause();
      el.currentTime = 0;
    } catch {
      /* ignore */
    }
  }
}

function playAnimalSample(kind: string): boolean {
  if (muted) return true;
  const src = ANIMAL_SAMPLES[kind];
  if (!src || sampleFailed.has(kind)) return false;
  if (typeof Audio === 'undefined') return false;

  try {
    let el = sampleCache.get(kind);
    if (!el) {
      el = new Audio(src);
      el.preload = 'auto';
      el.volume = 0.55;
      el.addEventListener('error', () => {
        sampleFailed.add(kind);
      });
      sampleCache.set(kind, el);
    }

    el.pause();
    el.currentTime = 0;
    const stopAt = () => {
      if (el && el.currentTime >= SAMPLE_MAX_SEC) {
        el.pause();
        el.removeEventListener('timeupdate', stopAt);
      }
    };
    el.addEventListener('timeupdate', stopAt);
    const playPromise = el.play();
    if (playPromise) {
      playPromise.catch(() => {
        sampleFailed.add(kind);
        playAnimalSynth(kind);
      });
    }
    return true;
  } catch {
    sampleFailed.add(kind);
    return false;
  }
}

/** Prefer licensed animal samples; fall back to soft synth cues. */
export function playAnimalCue(kind: string) {
  stopOtherAnimalSamples(kind);
  if (playAnimalSample(kind)) return;
  playAnimalSynth(kind);
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
