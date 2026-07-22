import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { t } from '../i18n';
import './HomePage.css';

export default function HomePage() {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('app.name')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="home-content" fullscreen>
        <section className="home-hero">
          <p className="home-brand">{t('app.name')}</p>
          <h1>{t('app.tagline')}</h1>
          <p className="home-lede">{t('home.lede')}</p>
          <IonButton expand="block" onClick={() => history.push('/geography')}>
            {t('home.cta.geography')}
          </IonButton>
          <IonText color="medium">
            <p className="home-note">{t('home.note')}</p>
          </IonText>
        </section>
      </IonContent>
    </IonPage>
  );
}
