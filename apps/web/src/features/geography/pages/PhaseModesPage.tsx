import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { getPhaseById } from '@aprendix/content-geography';
import { SOLO_MODES, type SoloModeId } from '@aprendix/game-core';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../geography.css';

const MODE_META: Record<
  SoloModeId | 'drag' | 'timed' | 'survival',
  { icon: string; ready: boolean }
> = {
  name: { icon: 'Aa', ready: true },
  find: { icon: '◎', ready: true },
  train: { icon: '★', ready: true },
  drag: { icon: '↔', ready: false },
  timed: { icon: '⏱', ready: false },
  survival: { icon: '✚', ready: false },
};

export default function PhaseModesPage() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const history = useHistory();
  const phase = getPhaseById(phaseId);

  if (!phase) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Fase não encontrada.</p>
        </IonContent>
      </IonPage>
    );
  }

  const readyModes = phase.soloModes.filter((id): id is SoloModeId => id in SOLO_MODES);
  const upcoming = [
    { id: 'drag' as const, nameKey: 'modes.drag.name', descriptionKey: 'modes.drag.description' },
    { id: 'timed' as const, nameKey: 'modes.timed.name', descriptionKey: 'modes.timed.description' },
    {
      id: 'survival' as const,
      nameKey: 'modes.survival.name',
      descriptionKey: 'modes.survival.description',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/geography" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t(phase.titleKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="geo-hub" fullscreen>
        <div className="geo-wrap">
          <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
            <div
              className="geo-topic-icon"
              style={{
                margin: '0 auto 0.65rem',
                background: '#dbeafe',
                color: '#1d4ed8',
                width: 64,
                height: 64,
              }}
            >
              BR
            </div>
            <h1>{t('geo.pickMode')}</h1>
            <p className="geo-lede">{t(phase.descriptionKey as MessageKey)}</p>
          </div>

          <div className="geo-mode-grid">
            {readyModes.map((modeId) => {
              const mode = SOLO_MODES[modeId];
              const meta = MODE_META[modeId];
              return (
                <button
                  key={modeId}
                  type="button"
                  className="ax-card geo-mode"
                  onClick={() =>
                    history.push(`/geography/${phase.id}/play/${modeId}`)
                  }
                >
                  <div className="geo-mode-icon">{meta.icon}</div>
                  <h2>{t(mode.nameKey as MessageKey)}</h2>
                  <p>{t(mode.descriptionKey as MessageKey)}</p>
                </button>
              );
            })}
            {upcoming.map((mode) => (
              <div key={mode.id} className="ax-card geo-mode is-soon">
                <div className="geo-mode-icon">{MODE_META[mode.id].icon}</div>
                <h2>{t(mode.nameKey as MessageKey)}</h2>
                <p>{t(mode.descriptionKey as MessageKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
