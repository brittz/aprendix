import { useCallback, useEffect, useState } from 'react';
import type { BrazilMapGeometry, MapNavigationState, MapViewState } from './types';

const INITIAL: MapNavigationState = {
  level: 'country',
  stateId: null,
  municipalityId: null,
  neighborhoodId: null,
};

export interface UseMapNavigationOptions {
  initialStateId?: string;
  enableEscape?: boolean;
}

export function useMapNavigation(options: UseMapNavigationOptions = {}) {
  const { initialStateId, enableEscape = true } = options;
  const [nav, setNav] = useState<MapNavigationState>(() =>
    initialStateId
      ? { level: 'state', stateId: initialStateId, municipalityId: null, neighborhoodId: null }
      : INITIAL,
  );
  const [selectedId, setSelectedId] = useState<string | null>(initialStateId ?? null);

  const selectState = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const drillToState = useCallback((stateId: string) => {
    setNav({ level: 'state', stateId, municipalityId: null, neighborhoodId: null });
    setSelectedId(stateId);
  }, []);

  const drillToMunicipality = useCallback((stateId: string, municipalityId: string) => {
    setNav({ level: 'municipality', stateId, municipalityId, neighborhoodId: null });
    setSelectedId(municipalityId);
  }, []);

  const drillToCountry = useCallback(() => {
    setNav(INITIAL);
    setSelectedId(null);
  }, []);

  const goBack = useCallback(() => {
    setNav((prev) => {
      if (prev.level === 'neighborhood') {
        setSelectedId(prev.municipalityId);
        return { ...prev, level: 'municipality', neighborhoodId: null };
      }
      if (prev.level === 'municipality') {
        setSelectedId(prev.stateId);
        return { ...prev, level: 'state', municipalityId: null };
      }
      if (prev.level === 'state') {
        setSelectedId(null);
        return INITIAL;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!enableEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enableEscape, goBack]);

  const view: MapViewState = {
    level: nav.level,
    stateId: nav.stateId,
    municipalityId: nav.municipalityId,
  };

  return {
    nav,
    view,
    selectedId,
    selectState,
    drillToState,
    drillToMunicipality,
    drillToCountry,
    goBack,
    setSelectedId,
  };
}

export interface UseBrazilMapDataOptions {
  url?: string;
  geometry?: BrazilMapGeometry;
}

export function useBrazilMapData(options: UseBrazilMapDataOptions = {}) {
  const { url = '/data/brazil-states.json', geometry: initialGeometry } = options;
  const [geometry, setGeometry] = useState<BrazilMapGeometry | null>(initialGeometry ?? null);
  const [loading, setLoading] = useState(!initialGeometry);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialGeometry) {
      setGeometry(initialGeometry);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('Geometria do mapa indisponível');
        return r.json();
      })
      .then((json: BrazilMapGeometry) => {
        if (!cancelled) {
          setGeometry(json);
          setError(null);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erro ao carregar mapa');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url, initialGeometry]);

  return { geometry, loading, error };
}
