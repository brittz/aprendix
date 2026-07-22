import { useMemo, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  BrazilMap,
  useBrazilMapData,
  useMapNavigation,
  type StateValue,
} from '@federacao/react-brazil-map';
import '@federacao/react-brazil-map/styles.css';
import './GeographyMapPage.css';

export default function GeographyMapPage() {
  const { geometry, loading, error } = useBrazilMapData({
    url: '/data/brazil-states.json',
  });
  const mapNav = useMapNavigation();
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const states = useMemo<Record<string, StateValue>>(() => {
    if (!geometry) return {};
    return Object.fromEntries(
      geometry.states.map((state) => [
        state.id,
        {
          name: state.name,
          value: 35,
          tooltipStat: state.id,
        },
      ]),
    );
  }, [geometry]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Voltar" />
          </IonButtons>
          <IonTitle>Geografia · Brasil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="geo-content" fullscreen>
        <div className="geo-prompt">
          <IonText>
            <p>
              Smoke test do mapa interativo. Toque em um estado para selecionar.
            </p>
          </IonText>
          {selectedName ? (
            <p className="geo-selection" role="status">
              Selecionado: <strong>{selectedName}</strong>
            </p>
          ) : (
            <p className="geo-selection geo-selection--empty" role="status">
              Nenhum estado selecionado
            </p>
          )}
        </div>

        <div className="geo-map-shell">
          {loading && <p className="geo-status">Carregando mapa…</p>}
          {error && (
            <p className="geo-status geo-status--error" role="alert">
              {error}
            </p>
          )}
          {geometry && (
            <BrazilMap
              geometry={geometry}
              states={states}
              view={mapNav.view}
              selectedId={mapNav.selectedId}
              accentId={mapNav.selectedId}
              onStateClick={(id) => {
                mapNav.selectState(id);
                setSelectedName(states[id]?.name ?? id);
              }}
              onStateDoubleClick={mapNav.drillToState}
              className="geo-map"
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
