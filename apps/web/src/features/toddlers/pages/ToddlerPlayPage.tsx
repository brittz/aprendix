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
  assertToddlerSafe,
  getAgeBand,
  getToddlerActivity,
} from '@aprendix/early-years';
import FullscreenToggle from '../../../components/FullscreenToggle';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import {
  isBabyMuted,
  setBabyMuted,
} from '../../babies/audio/softAudio';
import ShapesActivity from '../activities/ShapesActivity';
import ToddlerColorsActivity from '../activities/ToddlerColorsActivity';
import FruitsActivity from '../activities/FruitsActivity';
import ToddlerAnimalsActivity from '../activities/ToddlerAnimalsActivity';
import BodyPartsActivity from '../activities/BodyPartsActivity';
import SizeActivity from '../activities/SizeActivity';
import SameDiffActivity from '../activities/SameDiffActivity';
import '../toddlers.css';

export default function ToddlerPlayPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const activity = getToddlerActivity(activityId);
  const band = getAgeBand('1-2');
  if (band) assertToddlerSafe(band.rules);

  const [muted, setMuted] = useState(isBabyMuted());
  const onInteract = useCallback(() => undefined, []);

  if (!activity || !band) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>{t('toddler.missing')}</p>
        </IonContent>
      </IonPage>
    );
  }

  if (band.rules.scoring || band.rules.timer || band.rules.competition) {
    throw new Error('Invalid toddler rules');
  }

  const body = (() => {
    switch (activity.kind) {
      case 'shapes':
        return <ShapesActivity onInteract={onInteract} />;
      case 'colors':
        return <ToddlerColorsActivity onInteract={onInteract} />;
      case 'fruits':
        return <FruitsActivity onInteract={onInteract} />;
      case 'animals':
        return <ToddlerAnimalsActivity onInteract={onInteract} />;
      case 'body':
        return <BodyPartsActivity onInteract={onInteract} />;
      case 'size':
        return <SizeActivity onInteract={onInteract} />;
      case 'same-diff':
        return <SameDiffActivity onInteract={onInteract} />;
      default:
        return null;
    }
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/toddlers" text={t('geo.back')} />
          </IonButtons>
          <IonTitle>{t(activity.titleKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="toddler-play" fullscreen>
        <div className="toddler-wrap">
          <div className="toddler-toolbar">
            <p className="toddler-caregiver">
              {activity.caregiverHintKey
                ? t(activity.caregiverHintKey as MessageKey)
                : t('toddler.caregiver')}
            </p>
            <div className="toddler-toolbar-actions">
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
                {muted ? t('toddler.unmute') : t('toddler.mute')}
              </IonButton>
            </div>
          </div>

          <div className="toddler-stage">{body}</div>
        </div>
      </IonContent>
    </IonPage>
  );
}
