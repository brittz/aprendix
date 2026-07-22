import { useCallback, useMemo, useRef, useState } from 'react';
import { heatFill, toCrisisSet } from './heatmap';
import type { BrazilMapProps, MapViewState } from './types';

const DEFAULT_VIEW: MapViewState = { level: 'country', stateId: null };

interface TooltipState {
  x: number;
  y: number;
  name: string;
  stat: string;
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
}: BrazilMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
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

  const panEnabled = !readOnly && view.level === 'country';

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!panEnabled) return;
      e.preventDefault();
      setTransform((t) => ({
        ...t,
        scale: Math.min(6, Math.max(0.6, t.scale - e.deltaY * 0.001)),
      }));
    },
    [panEnabled],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!panEnabled) return;
      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
      containerRef.current?.setPointerCapture(e.pointerId);
    },
    [panEnabled, transform.x, transform.y],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !panEnabled) return;
      setTransform((t) => ({
        ...t,
        x: dragStart.current.tx + (e.clientX - dragStart.current.x),
        y: dragStart.current.ty + (e.clientY - dragStart.current.y),
      }));
    },
    [dragging, panEnabled],
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  const rootClass = ['rbm-root', dragging ? 'rbm-root--dragging' : '', className]
    .filter(Boolean)
    .join(' ');

  const showSubs = visibleSubs.length > 0;

  return (
    <div
      ref={containerRef}
      className={rootClass}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
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
                onClick={(e) => {
                  e.stopPropagation();
                  onStateClick?.(shape.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onStateDoubleClick?.(shape.id);
                }}
                onMouseEnter={(e) => {
                  if (isFocus) return;
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    x: e.clientX - rect.left + 8,
                    y: e.clientY - rect.top + 8,
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
                onClick={(e) => {
                  e.stopPropagation();
                  onSubFeatureClick?.(sub.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onSubFeatureDoubleClick?.(sub.id);
                }}
                onMouseEnter={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    x: e.clientX - rect.left + 8,
                    y: e.clientY - rect.top + 8,
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
    </div>
  );
}
