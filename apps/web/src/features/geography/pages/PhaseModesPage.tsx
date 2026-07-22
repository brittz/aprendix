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

  const modes = phase.soloModes.filter((id): id is SoloModeId =>
    id in SOLO_MODES,
  );

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
          <h1>{t('geo.pickMode')}</h1>
          <p className="geo-lede">{t(phase.descriptionKey as MessageKey)}</p>

          <div className="geo-card-list">
            {modes.map((modeId) => {
              const mode = SOLO_MODES[modeId];
              return (
                <button
                  key={modeId}
                  type="button"
                  className="geo-card"
                  onClick={() =>
                    history.push(`/geography/${phase.id}/play/${modeId}`)
                  }
                >
                  <h2>{t(mode.nameKey as MessageKey)}</h2>
                  <p>{t(mode.descriptionKey as MessageKey)}</p>
                </button>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
