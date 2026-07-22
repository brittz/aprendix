import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { t } from '../i18n';
import {
  averageAccuracy,
  loadProfile,
  loadSessions,
  sessionsPlayed,
  totalScore,
} from '../persistence/geoProgress';
import './ProfilePage.css';

export default function ProfilePage() {
  const history = useHistory();
  const profile = loadProfile();
  const sessions = loadSessions();
  const level = Math.max(1, Math.floor(totalScore(sessions) / 800) + 1);
  const xp = totalScore(sessions);
  const next = level * 800;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('nav.profile')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ax-page">
          <div className="ax-card profile-hero">
            <div className="profile-avatar" aria-hidden>
              {profile.displayName.slice(0, 1).toUpperCase()}
            </div>
            <h2>{profile.displayName}</h2>
            <p className="ax-muted">
              {t('profile.levelTitle', { level })} · {t('profile.explorer')}
            </p>
            <div className="ax-progress" style={{ marginTop: '0.75rem' }}>
              <span style={{ width: `${Math.min(100, (xp % 800) / 8)}%` }} />
            </div>
            <p className="profile-xp">
              {xp} / {next} XP
            </p>
          </div>

          <div className="profile-metrics">
            <div className="ax-card profile-metric">
              <strong>{sessionsPlayed(sessions)}</strong>
              <span>{t('profile.gamesDone')}</span>
            </div>
            <div className="ax-card profile-metric">
              <strong>{averageAccuracy(sessions)}%</strong>
              <span>{t('profile.avgAccuracy')}</span>
            </div>
          </div>

          <h3 className="profile-section">{t('profile.menu')}</h3>
          <div className="profile-menu">
            <button
              type="button"
              className="ax-card profile-link"
              onClick={() => history.push('/tabs/home')}
            >
              {t('profile.stats')}
            </button>
            <button
              type="button"
              className="ax-card profile-link"
              onClick={() => history.push('/geography')}
            >
              {t('profile.history')}
            </button>
            <button type="button" className="ax-card profile-link" disabled>
              {t('profile.settings')}
            </button>
            <button type="button" className="ax-card profile-link" disabled>
              {t('profile.help')}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
