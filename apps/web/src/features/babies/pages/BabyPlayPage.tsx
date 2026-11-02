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
  assertBabySafe,
  getAgeBand,
  getBabyActivity,
} from '@aprendix/early-years';
import FullscreenToggle from '../../../components/FullscreenToggle';
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
  const activity = getBabyActivity(activityId);
  const band = getAgeBand('0-1');
  if (band) assertBabySafe(band.rules);

  const [muted, setMuted] = useState(isBabyMuted());
  const onInteract = useCallback(() => undefined, []);

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
            <div className="baby-toolbar-actions">
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
                {muted ? t('baby.unmute') : t('baby.mute')}
              </IonButton>
            </div>
          </div>

          <div className="baby-stage">{body}</div>
        </div>
      </IonContent>
    </IonPage>
  );
}
