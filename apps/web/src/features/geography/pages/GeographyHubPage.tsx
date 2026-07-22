import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { listFreePhases } from '@aprendix/content-geography';
import { aggregatePhaseStats } from '@aprendix/game-core';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import { loadSessions } from '../../../persistence/geoProgress';
import '../geography.css';

const UPCOMING = [
  {
    id: 'capitals',
    title: 'Capitais do Brasil',
    desc: 'Associe cada estado à sua capital',
    progress: '0/27',
    pct: 0,
  },
  {
    id: 'world',
    title: 'Países do Mundo',
    desc: 'Em breve na engine de mapas',
    progress: '0/195',
    pct: 0,
  },
  {
    id: 'flags',
    title: 'Bandeiras',
    desc: 'Em breve',
    progress: '0/50',
    pct: 0,
  },
  {
    id: 'biomes',
    title: 'Biomas do Brasil',
    desc: 'Em breve',
    progress: '0/6',
    pct: 0,
  },
];

export default function GeographyHubPage() {
  const history = useHistory();
  const phases = listFreePhases();
  const historySessions = loadSessions();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/games" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('geo.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="geo-hub" fullscreen>
        <div className="geo-wrap">
          <h1>{t('geo.pickPhase')}</h1>
          <p className="geo-lede">{t('geo.hubLede')}</p>

          <div className="geo-topic-list">
            {phases.map((phase) => {
              const stats = aggregatePhaseStats(historySessions, phase.id);
              const pct = Math.round((stats.bestUniqueCorrect / 27) * 100);
              return (
                <button
                  key={phase.id}
                  type="button"
                  className="ax-card geo-topic"
                  onClick={() => history.push(`/geography/${phase.id}`)}
                >
                  <div
                    className="geo-topic-icon"
                    style={{ background: '#dbeafe', color: '#1d4ed8' }}
                  >
                    BR
                  </div>
                  <div>
                    <h2>{t(phase.titleKey as MessageKey)}</h2>
                    <p>{t(phase.descriptionKey as MessageKey)}</p>
                    <p className="ax-muted" style={{ marginTop: '0.35rem' }}>
                      {t('home.progressShort', {
                        current: stats.bestUniqueCorrect,
                        total: 27,
                      })}
                    </p>
                    <div className="ax-progress">
                      <span style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </button>
              );
            })}

            {UPCOMING.map((item) => (
              <div key={item.id} className="ax-card geo-topic is-soon">
                <div
                  className="geo-topic-icon"
                  style={{ background: '#f3f4f6', color: '#6b7280' }}
                >
                  ···
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <p className="ax-muted" style={{ marginTop: '0.35rem' }}>
                    Progresso: {item.progress}
                  </p>
                  <div className="ax-progress">
                    <span style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
