/**
 * Hardens against accidental zoom on phones/tablets.
 * Kids (especially babies) often multi-touch or tap rapidly, which triggers
 * pinch / double-tap zoom and makes activities hard to use.
 *
 * Complements viewport meta (user-scalable=no) which many browsers ignore.
 */

function prevent(event: Event) {
  event.preventDefault();
}

/** Block Safari/iOS gesture zoom (non-standard events). */
function blockGestureZoom() {
  for (const type of ['gesturestart', 'gesturechange', 'gestureend'] as const) {
    document.addEventListener(type, prevent, { passive: false });
  }
}

/** Block pinch (2+ fingers) while keeping single-finger taps/scroll. */
function blockPinchZoom() {
  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length > 1) prevent(event);
    },
    { passive: false },
  );

  document.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length > 1) prevent(event);
    },
    { passive: false },
  );
}

/**
 * Some WebViews still allow scale changes; snap back if visualViewport drifts.
 */
function watchVisualViewport() {
  const vv = window.visualViewport;
  if (!vv) return;

  const resetIfZoomed = () => {
    if (vv.scale <= 1.01) return;
    window.scrollTo(0, 0);
    // Re-assert no user scaling via meta (helps some Android WebViews).
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      );
    }
  };

  vv.addEventListener('resize', resetIfZoomed);
  vv.addEventListener('scroll', resetIfZoomed);
}

let installed = false;

/** Call once at app boot. */
export function installZoomLock() {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  blockGestureZoom();
  blockPinchZoom();
  watchVisualViewport();
}
