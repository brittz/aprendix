import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { listFreePhases } from '@aprendix/content-geography';
import {
  aggregatePhaseStats,
  evolutionFromHistory,
} from '@aprendix/game-core';
import { t } from '../../../i18n';
import { loadSessions } from '../../../persistence/geoProgress';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../geography.css';

export default function GeographyHubPage() {
  const history = useHistory();
  const phases = listFreePhases();
  const historySessions = loadSessions();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('geo.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="geo-hub" fullscreen>
        <div className="geo-wrap">
          <h1>{t('geo.pickPhase')}</h1>
          <p className="geo-lede">{t('home.lede')}</p>

          <div className="geo-card-list">
            {phases.map((phase) => {
              const stats = aggregatePhaseStats(historySessions, phase.id);
              const evo = evolutionFromHistory(historySessions, phase.id);
              return (
                <button
                  key={phase.id}
                  type="button"
                  className="geo-card"
                  onClick={() => history.push(`/geography/${phase.id}`)}
                >
                  <h2>{t(phase.titleKey as MessageKey)}</h2>
                  <p>{t(phase.descriptionKey as MessageKey)}</p>
                  <span className="geo-badge">{t('geo.free')}</span>
                  {stats.sessionsPlayed > 0 ? (
                    <p className="geo-note" style={{ marginTop: '0.65rem' }}>
                      {t('geo.evolution.best', {
                        count: stats.bestUniqueCorrect,
                      })}{' '}
                      · {t('geo.sessions', { count: stats.sessionsPlayed })}
                      {evo.before > 0 || evo.after > 0
                        ? ` · ${evo.before} → ${evo.after}`
                        : ''}
                    </p>
                  ) : (
                    <p className="geo-note" style={{ marginTop: '0.65rem' }}>
                      {t('geo.evolution.empty')}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <p className="geo-note">{t('geo.multiplayer.soon')}</p>
        </div>
      </IonContent>
    </IonPage>
  );
}
