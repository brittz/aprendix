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
  assertJuniorSafe,
  getAgeBand,
  getJuniorActivity,
} from '@aprendix/early-years';
import FullscreenToggle from '../../../components/FullscreenToggle';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import {
  isBabyMuted,
  setBabyMuted,
} from '../../babies/audio/softAudio';
import LettersActivity from '../activities/LettersActivity';
import NumbersActivity from '../activities/NumbersActivity';
import ArithmeticActivity from '../activities/ArithmeticActivity';
import LogicActivity from '../activities/LogicActivity';
import '../junior.css';

export default function JuniorPlayPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const activity = getJuniorActivity(activityId);
  const band = getAgeBand('4-6');
  if (band) assertJuniorSafe(band.rules);

  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(isBabyMuted());

  const onCorrect = useCallback(() => {
    setScore((n) => n + 1);
  }, []);

  if (!activity || !band) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>{t('junior.missing')}</p>
        </IonContent>
      </IonPage>
    );
  }

  if (band.rules.competition) {
    throw new Error('Invalid junior rules');
  }

  const body = (() => {
    switch (activity.kind) {
      case 'letters':
        return <LettersActivity onCorrect={onCorrect} />;
      case 'numbers':
        return <NumbersActivity onCorrect={onCorrect} />;
      case 'arithmetic':
        return <ArithmeticActivity onCorrect={onCorrect} />;
      case 'logic':
        return <LogicActivity onCorrect={onCorrect} />;
      default:
        return null;
    }
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/junior" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t(activity.titleKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="junior-play" fullscreen>
        <div className="junior-wrap">
          <div className="junior-toolbar">
            <p className="junior-caregiver">
              {activity.caregiverHintKey
                ? t(activity.caregiverHintKey as MessageKey)
                : t('junior.caregiver')}
            </p>
            <div className="junior-toolbar-actions">
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
                {muted ? t('junior.unmute') : t('junior.mute')}
              </IonButton>
            </div>
          </div>

          <div className="junior-stage">{body}</div>

          <p className="junior-score" aria-live="polite">
            {score > 0 ? t('junior.score', { count: score }) : '\u00a0'}
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
