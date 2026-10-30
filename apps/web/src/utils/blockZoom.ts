/**
 * Hardens against accidental zoom on phones/tablets.
 * Kids (especially babies) often multi-touch or tap rapidly, which triggers
 * pinch / double-tap zoom and makes activities hard to use.
 *
 * Important: do NOT preventDefault on touchstart for multi-touch — that blocks
 * the second finger from activating buttons (common when a baby rests one
 * thumb on the bezel/screen while tapping with the other hand).
 *
 * Map play surfaces opt out via `[data-allow-zoom]` / `.rbm-root`.
 */

function prevent(event: Event) {
  event.preventDefault();
}

function isZoomAllowedTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(target.closest('[data-allow-zoom], .rbm-root, .geo-map-frame--fill'))
  );
}

/** Block Safari/iOS gesture zoom (non-standard events), except on map surfaces. */
function blockGestureZoom() {
  for (const type of ['gesturestart', 'gesturechange', 'gestureend'] as const) {
    document.addEventListener(
      type,
      (event) => {
        if (isZoomAllowedTarget(event.target)) return;
        prevent(event);
      },
      { passive: false },
    );
  }
}

/**
 * Block pinch zoom only while fingers are moving (touchmove).
 * Leaving touchstart alone keeps multi-touch taps working for baby play.
 */
function blockPinchZoom() {
  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length <= 1) return;
      if (isZoomAllowedTarget(event.target)) return;
      prevent(event);
    },
    { passive: false },
  );
}

/**
 * Some WebViews still allow scale changes; snap back if visualViewport drifts.
 * Skip while the user is interacting with an allowed zoom surface.
 */
function watchVisualViewport() {
  const vv = window.visualViewport;
  if (!vv) return;

  const resetIfZoomed = () => {
    if (vv.scale <= 1.01) return;
    if (document.querySelector('[data-allow-zoom]:active, .rbm-root:active')) return;
    window.scrollTo(0, 0);
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
