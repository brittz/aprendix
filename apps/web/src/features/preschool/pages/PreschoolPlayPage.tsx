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
import { useHistory, useParams } from 'react-router-dom';
import {
  assertPreschoolSafe,
  getAgeBand,
  getPreschoolActivity,
} from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import {
  isBabyMuted,
  setBabyMuted,
} from '../../babies/audio/softAudio';
import MemoryActivity from '../activities/MemoryActivity';
import AssociationActivity from '../activities/AssociationActivity';
import SequencesActivity from '../activities/SequencesActivity';
import WordsActivity from '../activities/WordsActivity';
import CountingActivity from '../activities/CountingActivity';
import PuzzleActivity from '../activities/PuzzleActivity';
import '../preschool.css';

export default function PreschoolPlayPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const history = useHistory();
  const activity = getPreschoolActivity(activityId);
  const band = getAgeBand('2-4');
  if (band) assertPreschoolSafe(band.rules);
  const budget = band?.rules.suggestedTouchBudget ?? 12;

  const [touches, setTouches] = useState(0);
  const [muted, setMuted] = useState(isBabyMuted());
  const [softEnd, setSoftEnd] = useState(false);

  const onInteract = useCallback(() => {
    setTouches((n) => {
      const next = n + 1;
      if (next >= budget) setSoftEnd(true);
      return next;
    });
  }, [budget]);

  if (!activity || !band) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>{t('preschool.missing')}</p>
        </IonContent>
      </IonPage>
    );
  }

  if (band.rules.scoring || band.rules.timer || band.rules.competition) {
    throw new Error('Invalid preschool rules');
  }

  const body = (() => {
    switch (activity.kind) {
      case 'memory':
        return <MemoryActivity onInteract={onInteract} />;
      case 'association':
        return <AssociationActivity onInteract={onInteract} />;
      case 'sequences':
        return <SequencesActivity onInteract={onInteract} />;
      case 'words':
        return <WordsActivity onInteract={onInteract} />;
      case 'counting':
        return <CountingActivity onInteract={onInteract} />;
      case 'puzzle':
        return <PuzzleActivity onInteract={onInteract} />;
      default:
        return null;
    }
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/preschool" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t(activity.titleKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="preschool-play" fullscreen>
        <div className="preschool-wrap">
          <div className="preschool-toolbar">
            <p className="preschool-caregiver">
              {activity.caregiverHintKey
                ? t(activity.caregiverHintKey as MessageKey)
                : t('preschool.caregiver')}
            </p>
            <IonButton
              size="small"
              fill="outline"
              onClick={() => {
                const next = !muted;
                setBabyMuted(next);
                setMuted(next);
              }}
            >
              {muted ? t('preschool.unmute') : t('preschool.mute')}
            </IonButton>
          </div>

          {softEnd ? (
            <div className="preschool-soft-end preschool-stage">
              <div>
                <p>{t('preschool.softEnd')}</p>
                <IonButton
                  onClick={() => {
                    setSoftEnd(false);
                    setTouches(0);
                  }}
                >
                  {t('preschool.continueExplore')}
                </IonButton>
                <IonButton
                  fill="clear"
                  onClick={() => history.replace('/preschool')}
                >
                  {t('preschool.otherActivities')}
                </IonButton>
              </div>
            </div>
          ) : (
            <div className="preschool-stage">{body}</div>
          )}

          <p className="preschool-caregiver" aria-hidden={touches === 0}>
            {touches > 0 ? t('preschool.touches', { count: touches }) : '\u00a0'}
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
