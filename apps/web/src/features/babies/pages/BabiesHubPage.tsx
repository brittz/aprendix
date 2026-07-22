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
import { getAgeBand, listFreeBabyActivities } from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../babies.css';

export default function BabiesHubPage() {
  const history = useHistory();
  const band = getAgeBand('0-1');
  const activities = listFreeBabyActivities();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('baby.module')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="baby-hub" fullscreen>
        <div className="baby-wrap">
          <h1>{t((band?.titleKey ?? 'bands.0-1.title') as MessageKey)}</h1>
          <p className="baby-lede">
            {t((band?.descriptionKey ?? 'bands.0-1.description') as MessageKey)}
          </p>
          <p className="baby-rules">{t('baby.rules')}</p>

          <div className="baby-card-list">
            {activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                className="baby-card"
                onClick={() => history.push(`/babies/play/${activity.id}`)}
              >
                <h2>{t(activity.titleKey as MessageKey)}</h2>
                <p>{t(activity.descriptionKey as MessageKey)}</p>
                <span className="baby-badge">{t('geo.free')}</span>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
