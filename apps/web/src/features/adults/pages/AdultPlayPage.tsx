import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdultActivity, getAgeBand } from '@aprendix/early-years';
import FullscreenToggle from '../../../components/FullscreenToggle';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import {
  isBabyMuted,
  setBabyMuted,
} from '../../babies/audio/softAudio';
import AdultHistoryActivity from '../activities/AdultHistoryActivity';
import AdultScienceActivity from '../activities/AdultScienceActivity';
import AdultChallengeActivity from '../activities/AdultChallengeActivity';
import '../../early-shared/quizShell.css';

export default function AdultPlayPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const activity = getAdultActivity(activityId);
  const band = getAgeBand('10-plus');

  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(isBabyMuted());

  const onCorrect = useCallback(() => {
    setScore((n) => n + 1);
  }, []);

  if (!activity || !band || activity.externalPath) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>{t('adult.missing')}</p>
        </IonContent>
      </IonPage>
    );
  }

  const body = (() => {
    switch (activity.kind) {
      case 'history':
        return <AdultHistoryActivity onCorrect={onCorrect} />;
      case 'science':
        return <AdultScienceActivity onCorrect={onCorrect} />;
      case 'math':
        return <AdultChallengeActivity onCorrect={onCorrect} />;
      default:
        return null;
    }
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/adults" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t(activity.titleKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="quiz-shell" fullscreen>
        <div className="quiz-wrap">
          <div className="quiz-toolbar">
            <p className="quiz-caregiver">
              {activity.caregiverHintKey
                ? t(activity.caregiverHintKey as MessageKey)
                : t('adult.caregiver')}
            </p>
            <div className="quiz-toolbar-actions">
              <FullscreenToggle
                mode="outline"
                enterLabel={t('ui.fullscreen')}
                exitLabel={t('ui.fullscreenExit')}
              />
              <IonButton
                size="small"
                fill="outline"
                onClick={() => {
                  const next = !muted;
                  setBabyMuted(next);
                  setMuted(next);
                }}
              >
                {muted ? t('adult.unmute') : t('adult.mute')}
              </IonButton>
            </div>
          </div>

          <div className="quiz-stage">{body}</div>

          <p className="quiz-score" aria-live="polite">
            {score > 0 ? t('adult.score', { count: score }) : '\u00a0'}
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
