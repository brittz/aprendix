import { useMemo } from 'react';
import {
  BrazilMap,
  useBrazilMapData,
  type StateValue,
} from '@federacao/react-brazil-map';
import '@federacao/react-brazil-map/styles.css';
import type { PhaseDefinition } from '@aprendix/map-engine';
import { getRegionLabel } from '@aprendix/map-engine';
import { t } from '../../../i18n';

export interface BrazilPhaseMapProps {
  phase: PhaseDefinition;
  selectedId?: string | null;
  accentId?: string | null;
  fillOverrides?: Record<string, string>;
  onRegionClick?: (regionId: string) => void;
  readOnly?: boolean;
  className?: string;
}

/**
 * Adapter: PhaseDefinition (generic) → BrazilMap (SVG provider).
 * Other providers (world, fantasy) get their own adapter components.
 */
export function BrazilPhaseMap({
  phase,
  selectedId = null,
  accentId = null,
  fillOverrides,
  onRegionClick,
  readOnly = false,
  className,
}: BrazilPhaseMapProps) {
  const { geometry, loading, error } = useBrazilMapData({
    url: phase.geometryRef,
  });

  const states = useMemo<Record<string, StateValue>>(() => {
    if (!geometry) return {};
    return Object.fromEntries(
      phase.regions.map((region) => [
        region.id,
        {
          name: getRegionLabel(region, phase.defaultLocale),
          value: 40,
          tooltipStat: region.id,
        },
      ]),
    );
  }, [geometry, phase]);

  if (loading) {
    return <p className="geo-map-status">{t('play.loading')}</p>;
  }

  if (error || !geometry) {
    return (
      <p className="geo-map-status geo-map-status--error" role="alert">
        {error ?? t('play.error')}
      </p>
    );
  }

  return (
    <BrazilMap
      geometry={geometry}
      states={states}
      selectedId={selectedId}
      accentId={accentId}
      fillOverrides={fillOverrides}
      onStateClick={onRegionClick}
      readOnly={readOnly}
      showTooltip={false}
      className={className}
    />
  );
}
