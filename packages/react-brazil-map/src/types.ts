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

export interface MapMarker {
  id: string;
  stateId: string;
}

export type HeatDirection = 'higher-is-worse' | 'higher-is-better';

/** Subdivisão (município/bairro) no zoom. */
export interface SubFeature {
  id: string;
  name: string;
  parentId: string;
  path: string;
  cx: number;
  cy: number;
  fill?: string;
  value?: number;
  tooltipStat?: string;
}

export interface BrazilMapProps {
  geometry: BrazilMapGeometry;
  states: Record<string, StateValue>;
  view?: MapViewState;
  selectedId?: string | null;
  accentId?: string | null;
  crisisIds?: Iterable<string>;
  markers?: MapMarker[];
  heatDirection?: HeatDirection;
  fillOverrides?: Record<string, string>;
  subFeatures?: SubFeature[];
  selectedSubId?: string | null;
  onStateClick?: (stateId: string) => void;
  onStateDoubleClick?: (stateId: string) => void;
  onSubFeatureClick?: (id: string) => void;
  onSubFeatureDoubleClick?: (id: string) => void;
  className?: string;
  readOnly?: boolean;
}

export interface MapNavigationState {
  level: MapZoomLevel;
  stateId: string | null;
  municipalityId: string | null;
  neighborhoodId: string | null;
}
