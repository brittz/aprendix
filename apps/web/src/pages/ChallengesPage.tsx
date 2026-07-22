import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { t } from '../i18n';
import './ChallengesPage.css';

export default function ChallengesPage() {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('nav.challenges')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ax-page">
          <div className="ax-card challenge-hero">
            <p className="challenge-kicker">{t('challenges.daily')}</p>
            <h2>{t('challenges.capitals')}</h2>
            <p className="ax-muted">{t('challenges.dailyHint')}</p>
            <div className="ax-progress" style={{ margin: '0.75rem 0' }}>
              <span style={{ width: '20%' }} />
            </div>
            <IonButton
              expand="block"
              className="ax-btn-primary"
              onClick={() => history.push('/geography/geo-br-states')}
            >
              {t('challenges.play')}
            </IonButton>
          </div>

          <h3 className="challenge-section">{t('challenges.others')}</h3>
          <div className="challenge-list">
            <div className="ax-card challenge-row">
              <div>
                <h4>{t('challenges.geoWeek')}</h4>
                <p className="ax-muted">3/5 · {t('challenges.coming')}</p>
                <div className="ax-progress" style={{ marginTop: '0.5rem' }}>
                  <span style={{ width: '60%' }} />
                </div>
              </div>
            </div>
            <div className="ax-card challenge-row">
              <div>
                <h4>{t('challenges.marathon')}</h4>
                <p className="ax-muted">1/10 · {t('challenges.coming')}</p>
                <div className="ax-progress" style={{ marginTop: '0.5rem' }}>
                  <span style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
