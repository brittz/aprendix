/** Browser Fullscreen API helpers (desktop + mobile Safari prefixes). */

type FullscreenElement = Element & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitCurrentFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitCancelFullScreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

export function isFullscreenSupported(): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.documentElement as FullscreenElement;
  return Boolean(
    document.fullscreenEnabled ||
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.webkitRequestFullScreen ||
      el.msRequestFullscreen,
  );
}

export function getFullscreenElement(): Element | null {
  if (typeof document === 'undefined') return null;
  const doc = document as FullscreenDocument;
  return (
    document.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.webkitCurrentFullScreenElement ||
    doc.msFullscreenElement ||
    null
  );
}

export function isFullscreenActive(): boolean {
  return Boolean(getFullscreenElement());
}

export async function enterFullscreen(
  target: Element = document.documentElement,
): Promise<boolean> {
  const el = target as FullscreenElement;
  try {
    if (el.requestFullscreen) {
      await el.requestFullscreen();
      return true;
    }
    if (el.webkitRequestFullscreen) {
      await el.webkitRequestFullscreen();
      return true;
    }
    if (el.webkitRequestFullScreen) {
      await el.webkitRequestFullScreen();
      return true;
    }
    if (el.msRequestFullscreen) {
      await el.msRequestFullscreen();
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function exitFullscreen(): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  const doc = document as FullscreenDocument;
  try {
    if (document.exitFullscreen && getFullscreenElement()) {
      await document.exitFullscreen();
      return true;
    }
    if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return true;
    }
    if (doc.webkitCancelFullScreen) {
      await doc.webkitCancelFullScreen();
      return true;
    }
    if (doc.msExitFullscreen) {
      await doc.msExitFullscreen();
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function toggleFullscreen(
  target: Element = document.documentElement,
): Promise<boolean> {
  if (isFullscreenActive()) {
    return exitFullscreen();
  }
  return enterFullscreen(target);
}

const FULLSCREEN_EVENTS = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'MSFullscreenChange',
] as const;

/** Subscribe to fullscreen state changes. Returns unsubscribe. */
export function onFullscreenChange(listener: () => void): () => void {
  if (typeof document === 'undefined') return () => undefined;
  for (const event of FULLSCREEN_EVENTS) {
    document.addEventListener(event, listener);
  }
  return () => {
    for (const event of FULLSCREEN_EVENTS) {
      document.removeEventListener(event, listener);
    }
  };
}
