/**
 * Device/browser text-to-speech for early-years naming (pt-BR).
 * Uses the OS voice (Android/iOS/desktop) via SpeechSynthesis.
 */

let unlocked = false;

function pickPtBrVoice(): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferred =
    voices.find((v) => /^pt-BR/i.test(v.lang)) ||
    voices.find((v) => /^pt/i.test(v.lang) && /brazil|brasil/i.test(v.name)) ||
    voices.find((v) => /^pt/i.test(v.lang)) ||
    null;
  return preferred;
}

/** Call once from a user gesture so mobile browsers allow speech. */
export async function unlockSpeech(): Promise<void> {
  if (unlocked || typeof speechSynthesis === 'undefined') {
    unlocked = true;
    return;
  }
  try {
    // Some engines need getVoices after a gesture / voiceschanged.
    await new Promise<void>((resolve) => {
      const done = () => resolve();
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        done();
        return;
      }
      speechSynthesis.addEventListener('voiceschanged', done, { once: true });
      window.setTimeout(done, 400);
    });
  } finally {
    unlocked = true;
  }
}

/** Speak a short Portuguese word/phrase; cancels any previous utterance. */
export function speakWord(text: string, options?: { rate?: number; pitch?: number }) {
  if (typeof speechSynthesis === 'undefined' || !text.trim()) return;

  void unlockSpeech();
  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text.trim());
  utter.lang = 'pt-BR';
  utter.rate = options?.rate ?? 0.92;
  utter.pitch = options?.pitch ?? 1.05;
  utter.volume = 1;

  const voice = pickPtBrVoice();
  if (voice) utter.voice = voice;

  speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
}
