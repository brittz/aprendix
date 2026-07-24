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
import { getAgeBand, listFreeAdultActivities } from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import '../../early-shared/quizShell.css';

export default function AdultsHubPage() {
  const history = useHistory();
  const band = getAgeBand('10-plus');
  const activities = listFreeAdultActivities();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t('adult.module')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="quiz-shell" fullscreen>
        <div className="quiz-wrap">
          <h1>{t((band?.titleKey ?? 'bands.10-plus.title') as MessageKey)}</h1>
          <p className="quiz-lede">
            {t(
              (band?.descriptionKey ?? 'bands.10-plus.description') as MessageKey,
            )}
          </p>
          <p className="quiz-rules">{t('adult.rules')}</p>

          <div className="quiz-card-list">
            {activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                className="quiz-card"
                onClick={() => {
                  if (activity.externalPath) {
                    history.push(activity.externalPath);
                    return;
                  }
                  history.push(`/adults/play/${activity.id}`);
                }}
              >
                <h2>{t(activity.titleKey as MessageKey)}</h2>
                <p>{t(activity.descriptionKey as MessageKey)}</p>
                <span className="quiz-badge">{t('geo.free')}</span>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
