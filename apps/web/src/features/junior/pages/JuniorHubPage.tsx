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
import { getAgeBand, listFreeJuniorActivities } from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../junior.css';

export default function JuniorHubPage() {
  const history = useHistory();
  const band = getAgeBand('4-6');
  const activities = listFreeJuniorActivities();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('junior.module')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="junior-hub" fullscreen>
        <div className="junior-wrap">
          <h1>{t((band?.titleKey ?? 'bands.4-6.title') as MessageKey)}</h1>
          <p className="junior-lede">
            {t((band?.descriptionKey ?? 'bands.4-6.description') as MessageKey)}
          </p>
          <p className="junior-rules">{t('junior.rules')}</p>

          <div className="junior-card-list">
            {activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                className="junior-card"
                onClick={() => history.push(`/junior/play/${activity.id}`)}
              >
                <h2>{t(activity.titleKey as MessageKey)}</h2>
                <p>{t(activity.descriptionKey as MessageKey)}</p>
                <span className="junior-badge">{t('geo.free')}</span>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
