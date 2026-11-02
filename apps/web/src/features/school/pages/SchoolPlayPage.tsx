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
import {
  assertSchoolSafe,
  getAgeBand,
  getSchoolActivity,
} from '@aprendix/early-years';
import FullscreenToggle from '../../../components/FullscreenToggle';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import {
  isBabyMuted,
  setBabyMuted,
} from '../../babies/audio/softAudio';
import HistoryActivity from '../activities/HistoryActivity';
import ScienceActivity from '../activities/ScienceActivity';
import LanguagesActivity from '../activities/LanguagesActivity';
import SchoolMathActivity from '../activities/SchoolMathActivity';
import '../../early-shared/quizShell.css';

export default function SchoolPlayPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const activity = getSchoolActivity(activityId);
  const band = getAgeBand('6-10');
  if (band) assertSchoolSafe(band.rules);

  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(isBabyMuted());

  const onCorrect = useCallback(() => {
    setScore((n) => n + 1);
  }, []);

  if (!activity || !band || activity.externalPath) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>{t('school.missing')}</p>
        </IonContent>
      </IonPage>
    );
  }

  if (band.rules.competition) {
    throw new Error('Invalid school rules');
  }

  const body = (() => {
    switch (activity.kind) {
      case 'history':
        return <HistoryActivity onCorrect={onCorrect} />;
      case 'science':
        return <ScienceActivity onCorrect={onCorrect} />;
      case 'languages':
        return <LanguagesActivity onCorrect={onCorrect} />;
      case 'math':
        return <SchoolMathActivity onCorrect={onCorrect} />;
      default:
        return null;
    }
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/school" text={t('geo.back')} />
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
                : t('school.caregiver')}
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
                {muted ? t('school.unmute') : t('school.mute')}
              </IonButton>
            </div>
          </div>

          <div className="quiz-stage">{body}</div>

          <p className="quiz-score" aria-live="polite">
            {score > 0 ? t('school.score', { count: score }) : '\u00a0'}
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
