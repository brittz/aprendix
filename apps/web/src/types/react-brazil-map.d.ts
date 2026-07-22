/**
 * Ambient types for the map package so `tsc` does not typecheck its sources
 * (those live outside apps/web and resolve React via this app's node_modules at runtime/bundling).
 */
declare module '@federacao/react-brazil-map' {
  import type { ComponentType } from 'react';

  export type MapZoomLevel = 'country' | 'state' | 'municipality' | 'neighborhood';

  export interface MapViewState {
    level: MapZoomLevel;
    stateId: string | null;
    municipalityId?: string | null;
  }

  export interface BrazilStateShape {
    id: string;
    name: string;
    path: string;
    cx: number;
    cy: number;
  }

  export interface BrazilMapGeometry {
    viewBox: string;
    width: number;
    height: number;
    states: BrazilStateShape[];
  }

  export interface StateValue {
    name: string;
    value: number;
    tooltipStat?: string;
  }

  export interface BrazilMapProps {
    geometry: BrazilMapGeometry;
    states: Record<string, StateValue>;
    view?: MapViewState;
    selectedId?: string | null;
    accentId?: string | null;
    crisisIds?: Iterable<string>;
    fillOverrides?: Record<string, string>;
    onStateClick?: (stateId: string) => void;
    onStateDoubleClick?: (stateId: string) => void;
    className?: string;
    readOnly?: boolean;
    showTooltip?: boolean;
  }

  export const BrazilMap: ComponentType<BrazilMapProps>;

  export function useBrazilMapData(options: {
    url?: string;
    geometry?: BrazilMapGeometry;
  }): {
    geometry: BrazilMapGeometry | null;
    loading: boolean;
    error: string | null;
  };

  export function useMapNavigation(): {
    view: MapViewState;
    selectedId: string | null;
    selectState: (id: string) => void;
    drillToState: (id: string) => void;
    drillToCountry: () => void;
    goBack: () => void;
  };
}

declare module '@federacao/react-brazil-map/styles.css';
