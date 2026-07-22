import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { notificationsOutline, settingsOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { BR_STATES_PHASE } from '@aprendix/content-geography';
import { aggregatePhaseStats } from '@aprendix/game-core';
import { t } from '../i18n';
import {
  averageAccuracy,
  loadLastPlayed,
  loadProfile,
  loadSessions,
  sessionsPlayed,
  totalScore,
} from '../persistence/geoProgress';
import './HomePage.css';

const CATEGORIES = [
  { id: 'geo', label: 'Geografia', color: '#dbeafe', icon: 'Geo', path: '/geography' },
  { id: 'math', label: 'Matemática', color: '#fce7f3', icon: '∑', path: '/tabs/games' },
  { id: 'letters', label: 'Letras', color: '#fef3c7', icon: 'Aa', path: '/tabs/games' },
  { id: 'science', label: 'Ciências', color: '#dcfce7', icon: 'Sci', path: '/tabs/games' },
  { id: 'memory', label: 'Memória', color: '#ede9fe', icon: 'Mem', path: '/tabs/games' },
  { id: 'en', label: 'Inglês', color: '#e0f2fe', icon: 'En', path: '/tabs/games' },
  { id: 'music', label: 'Música', color: '#ffe4e6', icon: '♪', path: '/tabs/games' },
  { id: 'babies', label: 'Bebês', color: '#ffedd5', icon: '0-1', path: '/babies' },
] as const;

export default function HomePage() {
  const history = useHistory();
  const profile = loadProfile();
  const sessions = loadSessions();
  const last = loadLastPlayed();
  const stats = aggregatePhaseStats(sessions, BR_STATES_PHASE.id);
  const level = Math.max(1, Math.floor(totalScore(sessions) / 800) + 1);
  const accuracy = averageAccuracy(sessions);
  const played = sessionsPlayed(sessions);
  const progressPct = Math.min(
    100,
    Math.round((stats.bestUniqueCorrect / 27) * 100),
  );

  const continuePath =
    last?.module === 'geography' && last.phaseId && last.modeId
      ? `/geography/${last.phaseId}/play/${last.modeId}`
      : last?.module === 'babies'
        ? '/babies'
        : `/geography/${BR_STATES_PHASE.id}`;

  return (
    <IonPage>
      <IonHeader>
        <div className="ax-page" style={{ paddingBottom: 0, paddingTop: '0.75rem' }}>
          <div className="home-hero-row">
            <div className="home-user">
              <div className="home-avatar" aria-hidden>
                {profile.displayName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="home-hello">{t('home.hello')}</p>
                <p className="home-name">{profile.displayName}!</p>
              </div>
            </div>
            <IonButtons>
              <button type="button" className="home-icon-btn" aria-label="Notificações">
                <IonIcon icon={notificationsOutline} />
              </button>
              <button
                type="button"
                className="home-icon-btn"
                aria-label="Configurações"
                onClick={() => history.push('/tabs/profile')}
              >
                <IonIcon icon={settingsOutline} />
              </button>
            </IonButtons>
          </div>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ax-page">
          <div className="home-top-grid">
            <div className="home-stats">
              <div className="ax-card home-stat">
                <p className="home-stat-label">{t('home.streak')}</p>
                <p className="home-stat-value">{played}</p>
                <p className="home-stat-sub">{t('home.streakSub')}</p>
              </div>
              <div className="ax-card home-stat">
                <p className="home-stat-label">{t('home.level')}</p>
                <p className="home-stat-value">{t('home.levelValue', { level })}</p>
                <div className="ax-progress" style={{ marginTop: '0.55rem' }}>
                  <span style={{ width: `${Math.min(100, (totalScore(sessions) % 800) / 8)}%` }} />
                </div>
              </div>
            </div>

            <div className="ax-card home-continue">
              <div className="home-continue-top">
                <div className="home-continue-icon" aria-hidden>
                  BR
                </div>
                <div style={{ flex: 1 }}>
                  <p className="home-stat-label">{t('home.continue')}</p>
                  <h2>{last?.title ?? t('phases.brStates.title')}</h2>
                  <p className="home-stat-sub">
                    {t('home.progressShort', {
                      current: stats.bestUniqueCorrect,
                      total: 27,
                    })}
                  </p>
                  <div className="ax-progress" style={{ marginTop: '0.45rem' }}>
                    <span style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              </div>
              <IonButton
                expand="block"
                className="ax-btn-primary"
                onClick={() => history.push(continuePath)}
              >
                {t('home.continueCta')}
              </IonButton>
            </div>
          </div>

          <div className="home-section-head">
            <h3>{t('home.categories')}</h3>
            <button
              type="button"
              className="linkish"
              onClick={() => history.push('/tabs/games')}
            >
              {t('home.seeAll')}
            </button>
          </div>

          <div className="home-cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="home-cat"
                onClick={() => history.push(cat.path)}
              >
                <div
                  className="home-cat-icon"
                  style={{ background: cat.color }}
                  aria-hidden
                >
                  {cat.icon}
                </div>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {accuracy > 0 && (
            <p className="ax-muted" style={{ marginTop: '1.25rem', fontSize: '0.85rem' }}>
              {t('home.accuracyHint', { percent: accuracy })}
            </p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
