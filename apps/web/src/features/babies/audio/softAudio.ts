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

export function playAnimalCue(kind: string) {
  const map: Record<string, number> = {
    cat: 480,
    dog: 180,
    bird: 720,
    cow: 140,
    frog: 260,
    duck: 360,
  };
  playTone(map[kind] ?? 300, 0.35, 'triangle', 0.09);
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
