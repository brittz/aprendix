import type { MouseEvent, PointerEvent, TouchEvent } from 'react';

/**
 * Baby-friendly press activation.
 *
 * Browsers only synthesize `click` after a clean single-finger tap.
 * Toddlers often: rest another finger on the screen, press lightly, or slide
 * a little — so `:active` shows but `click` never fires.
 *
 * Strategy: activate on first contact (`pointerdown` / `touchstart`),
 * accept multi-touch (latest press wins at the call site), and ignore the
 * follow-up synthetic `click`.
 */

type Activate = () => void;

const recentByTarget = new WeakMap<object, number>();
const SAME_TARGET_MS = 120;
let suppressClickUntil = 0;

function shouldSkipDuplicate(target: object): boolean {
  const now = performance.now();
  const last = recentByTarget.get(target) ?? 0;
  if (now - last < SAME_TARGET_MS) return true;
  recentByTarget.set(target, now);
  return false;
}

export interface BabyPressHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onTouchStart: (event: TouchEvent<HTMLElement>) => void;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export function babyPressHandlers(activate: Activate): BabyPressHandlers {
  const fire = (target: object) => {
    if (shouldSkipDuplicate(target)) return;
    activate();
  };

  return {
    onPointerDown: (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      // Any pointer id is valid — second/third finger must count.
      suppressClickUntil = performance.now() + 450;
      fire(event.currentTarget);
    },
    onTouchStart: (event) => {
      // Fallback when Pointer Events are missing or non-primary touches
      // do not produce pointerdown on the button.
      if (event.changedTouches.length === 0) return;
      if (performance.now() < suppressClickUntil) return;
      suppressClickUntil = performance.now() + 450;
      fire(event.currentTarget);
    },
    onClick: (event) => {
      if (performance.now() < suppressClickUntil) {
        event.preventDefault();
        return;
      }
      // Keyboard / accessibility activation.
      fire(event.currentTarget);
    },
  };
}
