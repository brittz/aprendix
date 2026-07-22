import type { HeatDirection } from './types';

export function heatFill(value: number, direction: HeatDirection): string {
  const t = Math.min(1, Math.max(0, value / 100));
  const intensity = direction === 'higher-is-better' ? (1 - t) * 55 : t * 65;
  return `color-mix(in srgb, var(--rbm-heat) ${intensity}%, var(--rbm-land))`;
}

export function toCrisisSet(ids?: Iterable<string>): Set<string> {
  if (!ids) return new Set();
  return ids instanceof Set ? ids : new Set(ids);
}
