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
import { getAgeBand, listFreePreschoolActivities } from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../preschool.css';

export default function PreschoolHubPage() {
  const history = useHistory();
  const band = getAgeBand('2-4');
  const activities = listFreePreschoolActivities();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('preschool.module')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="preschool-hub" fullscreen>
        <div className="preschool-wrap">
          <h1>{t((band?.titleKey ?? 'bands.2-4.title') as MessageKey)}</h1>
          <p className="preschool-lede">
            {t((band?.descriptionKey ?? 'bands.2-4.description') as MessageKey)}
          </p>
          <p className="preschool-rules">{t('preschool.rules')}</p>

          <div className="preschool-card-list">
            {activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                className="preschool-card"
                onClick={() => history.push(`/preschool/play/${activity.id}`)}
              >
                <h2>{t(activity.titleKey as MessageKey)}</h2>
                <p>{t(activity.descriptionKey as MessageKey)}</p>
                <span className="preschool-badge">{t('geo.free')}</span>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
