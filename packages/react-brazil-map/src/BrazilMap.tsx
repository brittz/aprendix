import { useCallback, useMemo, useRef, useState } from 'react';
import { heatFill, toCrisisSet } from './heatmap';
import type { BrazilMapProps, MapViewState } from './types';

const DEFAULT_VIEW: MapViewState = { level: 'country', stateId: null };
const MIN_SCALE = 0.85;
const MAX_SCALE = 6;

interface TooltipState {
  x: number;
  y: number;
  name: string;
  stat: string;
}

function pointerDistance(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function BrazilMap({
  geometry,
  states,
  view = DEFAULT_VIEW,
  selectedId = null,
  accentId = null,
  crisisIds,
  markers = [],
  heatDirection = 'higher-is-worse',
  fillOverrides,
  subFeatures = [],
  selectedSubId = null,
  onStateClick,
  onStateDoubleClick,
  onSubFeatureClick,
  onSubFeatureDoubleClick,
  className,
  readOnly = false,
  showTooltip = true,
  enablePanZoom = true,
  showZoomControls = true,
}: BrazilMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const crisisSet = useMemo(() => toCrisisSet(crisisIds), [crisisIds]);

  const focusState = useMemo(() => {
    if (view.level === 'country' || !view.stateId) return null;
    return geometry.states.find((s) => s.id === view.stateId) ?? null;
  }, [geometry.states, view.level, view.stateId]);

  const visibleSubs = useMemo(() => {
    if (!view.stateId || view.level === 'country') return [];
    if (view.level === 'municipality' && view.municipalityId) {
      return subFeatures.filter((f) => f.parentId === view.municipalityId);
    }
    return subFeatures.filter((f) => f.parentId === view.stateId);
  }, [subFeatures, view.level, view.stateId, view.municipalityId]);

  const viewTransform = useMemo(() => {
    if (focusState && view.level !== 'country') {
      const scale = view.level === 'state' ? 2.8 : view.level === 'municipality' ? 4.2 : 5;
      const cx = geometry.width / 2;
      const cy = geometry.height / 2;
      return {
        x: cx - focusState.cx * scale,
        y: cy - focusState.cy * scale,
        scale,
      };
    }
    return transform;
  }, [focusState, view.level, transform, geometry.width, geometry.height]);

  /** Pan/zoom is independent of readOnly so quiz modes can still inspect the map. */
  const panZoomEnabled = enablePanZoom && view.level === 'country';

  const clampScale = (scale: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));

  const zoomBy = useCallback((delta: number) => {
    if (!panZoomEnabled) return;
    setTransform((t) => ({ ...t, scale: clampScale(t.scale + delta) }));
  }, [panZoomEnabled]);

  const resetView = useCallback(() => {
    if (!panZoomEnabled) return;
    setTransform({ x: 0, y: 0, scale: 1 });
  }, [panZoomEnabled]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!panZoomEnabled) return;
      e.preventDefault();
      setTransform((t) => ({
        ...t,
        scale: clampScale(t.scale - e.deltaY * 0.001),
      }));
    },
    [panZoomEnabled],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!panZoomEnabled) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      containerRef.current?.setPointerCapture(e.pointerId);

      if (pointers.current.size === 2) {
        const pts = [...pointers.current.values()];
        pinchStart.current = {
          dist: pointerDistance(pts[0], pts[1]),
          scale: transform.scale,
        };
        setDragging(false);
        return;
      }

      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
    },
    [panZoomEnabled, transform.scale, transform.x, transform.y],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!panZoomEnabled) return;
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size >= 2 && pinchStart.current) {
        e.preventDefault();
        const pts = [...pointers.current.values()];
        const dist = pointerDistance(pts[0], pts[1]);
        if (pinchStart.current.dist > 0) {
          const next = pinchStart.current.scale * (dist / pinchStart.current.dist);
          setTransform((t) => ({ ...t, scale: clampScale(next) }));
        }
        return;
      }

      if (!dragging) return;
      setTransform((t) => ({
        ...t,
        x: dragStart.current.tx + (e.clientX - dragStart.current.x),
        y: dragStart.current.ty + (e.clientY - dragStart.current.y),
      }));
    },
    [dragging, panZoomEnabled],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) setDragging(false);
  }, []);

  const rootClass = ['rbm-root', dragging ? 'rbm-root--dragging' : '', className]
    .filter(Boolean)
    .join(' ');

  const showSubs = visibleSubs.length > 0;

  return (
    <div
      ref={containerRef}
      className={rootClass}
      data-allow-zoom={panZoomEnabled ? 'true' : undefined}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <svg viewBox={geometry.viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <g
          className={view.level !== 'country' ? 'rbm-transform-group' : undefined}
          transform={`translate(${viewTransform.x} ${viewTransform.y}) scale(${viewTransform.scale})`}
        >
          {geometry.states.map((shape) => {
            const data = states[shape.id];
            if (!data) return null;
            const isFocus = view.stateId === shape.id && showSubs;
            const classes = [
              'rbm-state',
              selectedId === shape.id ? 'rbm-state--selected' : '',
              accentId === shape.id ? 'rbm-state--accent' : '',
              crisisSet.has(shape.id) ? 'rbm-state--crisis' : '',
              readOnly ? 'rbm-state--readonly' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <path
                key={shape.id}
                d={shape.path}
                className={classes}
                fill={
                  isFocus
                    ? 'var(--rbm-land)'
                    : (fillOverrides?.[shape.id] ?? heatFill(data.value, heatDirection))
                }
                opacity={isFocus ? 0.35 : 1}
                onClick={(ev) => {
                  if (readOnly) return;
                  ev.stopPropagation();
                  onStateClick?.(shape.id);
                }}
                onDoubleClick={(ev) => {
                  if (readOnly) return;
                  ev.stopPropagation();
                  onStateDoubleClick?.(shape.id);
                }}
                onMouseEnter={(ev) => {
                  if (!showTooltip || isFocus) return;
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    x: ev.clientX - rect.left + 8,
                    y: ev.clientY - rect.top + 8,
                    name: data.name,
                    stat: data.tooltipStat ?? String(data.value.toFixed(1)),
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}

          {visibleSubs.map((sub) => {
            const classes = [
              'rbm-state',
              'rbm-sub',
              selectedSubId === sub.id ? 'rbm-state--selected' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <path
                key={sub.id}
                d={sub.path}
                className={classes}
                fill={
                  sub.fill ??
                  (sub.value != null ? heatFill(sub.value, heatDirection) : 'var(--rbm-land)')
                }
                onClick={(ev) => {
                  if (readOnly) return;
                  ev.stopPropagation();
                  onSubFeatureClick?.(sub.id);
                }}
                onDoubleClick={(ev) => {
                  if (readOnly) return;
                  ev.stopPropagation();
                  onSubFeatureDoubleClick?.(sub.id);
                }}
                onMouseEnter={(ev) => {
                  if (!showTooltip) return;
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    x: ev.clientX - rect.left + 8,
                    y: ev.clientY - rect.top + 8,
                    name: sub.name,
                    stat: sub.tooltipStat ?? (sub.value != null ? String(sub.value.toFixed(1)) : ''),
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}

          {markers.map((marker) => {
            const shape = geometry.states.find((s) => s.id === marker.stateId);
            if (!shape) return null;
            return (
              <circle
                key={marker.id}
                className="rbm-marker"
                cx={shape.cx}
                cy={shape.cy}
                r={4}
              />
            );
          })}
        </g>
      </svg>
      {tooltip ? (
        <div className="rbm-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <span className="rbm-tooltip__name">{tooltip.name}</span>
          <span className="rbm-tooltip__stat">{tooltip.stat}</span>
        </div>
      ) : null}
      {showZoomControls && panZoomEnabled ? (
        <div className="rbm-zoom-controls" role="group" aria-label="Zoom do mapa">
          <button type="button" className="rbm-zoom-btn" aria-label="Aumentar zoom" onClick={() => zoomBy(0.45)}>
            +
          </button>
          <button type="button" className="rbm-zoom-btn" aria-label="Diminuir zoom" onClick={() => zoomBy(-0.45)}>
            −
          </button>
          <button type="button" className="rbm-zoom-btn" aria-label="Resetar zoom" onClick={resetView}>
            ⌂
          </button>
        </div>
      ) : null}
    </div>
  );
}
