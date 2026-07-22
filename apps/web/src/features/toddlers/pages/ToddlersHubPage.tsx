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
import { getAgeBand, listFreeToddlerActivities } from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../toddlers.css';

export default function ToddlersHubPage() {
  const history = useHistory();
  const band = getAgeBand('1-2');
  const activities = listFreeToddlerActivities();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('toddler.module')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="toddler-hub" fullscreen>
        <div className="toddler-wrap">
          <h1>{t((band?.titleKey ?? 'bands.1-2.title') as MessageKey)}</h1>
          <p className="toddler-lede">
            {t((band?.descriptionKey ?? 'bands.1-2.description') as MessageKey)}
          </p>
          <p className="toddler-rules">{t('toddler.rules')}</p>

          <div className="toddler-card-list">
            {activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                className="toddler-card"
                onClick={() => history.push(`/toddlers/play/${activity.id}`)}
              >
                <h2>{t(activity.titleKey as MessageKey)}</h2>
                <p>{t(activity.descriptionKey as MessageKey)}</p>
                <span className="toddler-badge">{t('geo.free')}</span>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
