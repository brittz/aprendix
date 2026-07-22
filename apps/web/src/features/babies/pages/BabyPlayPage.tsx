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
  assertBabySafe,
  getAgeBand,
  getBabyActivity,
} from '@aprendix/early-years';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import {
  isBabyMuted,
  setBabyMuted,
} from '../audio/softAudio';
import AnimalsActivity from '../activities/AnimalsActivity';
import ColorsActivity from '../activities/ColorsActivity';
import CauseEffectActivity from '../activities/CauseEffectActivity';
import SoundsActivity from '../activities/SoundsActivity';
import ObjectsActivity from '../activities/ObjectsActivity';
import MusicActivity from '../activities/MusicActivity';
import RhythmActivity from '../activities/RhythmActivity';
import '../babies.css';

export default function BabyPlayPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const history = useHistory();
  const activity = getBabyActivity(activityId);
  const band = getAgeBand('0-1');
  if (band) assertBabySafe(band.rules);
  const budget = band?.rules.suggestedTouchBudget ?? 8;

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
          <p>{t('baby.missing')}</p>
        </IonContent>
      </IonPage>
    );
  }

  if (band.rules.scoring || band.rules.timer || band.rules.competition) {
    throw new Error('Invalid baby rules');
  }

  const body = (() => {
    switch (activity.kind) {
      case 'animals':
        return <AnimalsActivity onInteract={onInteract} />;
      case 'colors':
        return <ColorsActivity onInteract={onInteract} />;
      case 'cause-effect':
        return <CauseEffectActivity onInteract={onInteract} />;
      case 'sounds':
        return <SoundsActivity onInteract={onInteract} />;
      case 'objects':
        return <ObjectsActivity onInteract={onInteract} />;
      case 'music':
        return <MusicActivity onInteract={onInteract} />;
      case 'rhythm':
        return <RhythmActivity onInteract={onInteract} />;
      default:
        return null;
    }
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/babies" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t(activity.titleKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="baby-play" fullscreen>
        <div className="baby-wrap">
          <div className="baby-toolbar">
            <p className="baby-caregiver">
              {activity.caregiverHintKey
                ? t(activity.caregiverHintKey as MessageKey)
                : t('baby.caregiver')}
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
              {muted ? t('baby.unmute') : t('baby.mute')}
            </IonButton>
          </div>

          {softEnd ? (
            <div className="baby-soft-end baby-stage">
              <div>
                <p>{t('baby.softEnd')}</p>
                <IonButton
                  onClick={() => {
                    setSoftEnd(false);
                    setTouches(0);
                  }}
                >
                  {t('baby.continueExplore')}
                </IonButton>
                <IonButton fill="clear" onClick={() => history.replace('/babies')}>
                  {t('baby.otherActivities')}
                </IonButton>
              </div>
            </div>
          ) : (
            <div className="baby-stage">{body}</div>
          )}

          {/* Caregiver-only quiet counter — never presented as score */}
          <p className="baby-caregiver" aria-hidden={touches === 0}>
            {touches > 0 ? t('baby.touches', { count: touches }) : '\u00a0'}
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
