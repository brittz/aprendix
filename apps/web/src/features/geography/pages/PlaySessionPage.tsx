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
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPhaseById } from '@aprendix/content-geography';
import { SOLO_MODES, type SoloModeId } from '@aprendix/game-core';
import { t } from '../../../i18n';
import type { MessageKey } from '../../../i18n/pt-BR';
import { BrazilPhaseMap } from '../components/BrazilPhaseMap';
import { useGeoSession } from '../hooks/useGeoSession';
import '../geography.css';

function isSoloMode(value: string): value is SoloModeId {
  return value in SOLO_MODES;
}

export default function PlaySessionPage() {
  const { phaseId, modeId } = useParams<{ phaseId: string; modeId: string }>();
  const history = useHistory();
  const phase = getPhaseById(phaseId);
  const modeValid = isSoloMode(modeId);

  if (!phase || !modeValid) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Sessão inválida.</p>
        </IonContent>
      </IonPage>
    );
  }

  return <PlaySessionInner phase={phase} modeId={modeId} history={history} />;
}

function PlaySessionInner({
  phase,
  modeId,
  history,
}: {
  phase: NonNullable<ReturnType<typeof getPhaseById>>;
  modeId: SoloModeId;
  history: ReturnType<typeof useHistory>;
}) {
  const {
    session,
    currentLabel,
    textValue,
    setTextValue,
    onRegionClick,
    onSubmitText,
    continueAfterFeedback,
    fillOverrides,
  } = useGeoSession(phase, modeId);

  useEffect(() => {
    if (session.status === 'completed') {
      history.replace(`/geography/${phase.id}/results/${session.id}`, {
        session,
      });
    }
  }, [session, history, phase.id]);

  const total = session.queue.length;
  const current = Math.min(session.cursor + 1, total);
  const mode = SOLO_MODES[modeId];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/geography/${phase.id}`}
              text={t('play.exit')}
            />
          </IonButtons>
          <IonTitle>{t(mode.nameKey as MessageKey)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="geo-play" fullscreen>
        <div className="geo-wrap">
          <div className="geo-play-bar">
            <p className="geo-prompt">
              {modeId === 'name'
                ? t('play.name.prompt')
                : t('play.find.prompt', { name: currentLabel })}
            </p>
            <div className="geo-meta">
              <span>{t('play.progress', { current, total })}</span>
              {mode.scoringEnabled && (
                <>
                  <span>{t('play.score', { score: session.score })}</span>
                  <span>{t('play.streak', { streak: session.streak })}</span>
                </>
              )}
            </div>
          </div>

          {session.lastFeedback && session.status === 'feedback' && (
            <div
              className={
                session.lastFeedback.correct
                  ? 'geo-feedback geo-feedback--ok'
                  : 'geo-feedback geo-feedback--bad'
              }
              role="status"
            >
              {session.lastFeedback.correct
                ? t('play.feedback.correct')
                : t('play.feedback.wrong', {
                    name: session.lastFeedback.expectedLabel,
                  })}
              {modeId === 'name' && (
                <div style={{ marginTop: '0.5rem' }}>
                  <IonButton size="small" onClick={continueAfterFeedback}>
                    {t('play.feedback.continue')}
                  </IonButton>
                </div>
              )}
            </div>
          )}

          {modeId === 'name' && session.status === 'playing' && (
            <form
              className="geo-name-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitText();
              }}
            >
              <input
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder={t('play.name.placeholder')}
                autoComplete="off"
                autoCapitalize="words"
                enterKeyHint="done"
                aria-label={t('play.name.placeholder')}
              />
              <IonButton type="submit">{t('play.name.submit')}</IonButton>
            </form>
          )}

          <div className="geo-map-frame">
            <BrazilPhaseMap
              phase={phase}
              selectedId={
                modeId === 'name' ? session.currentRegionId : undefined
              }
              accentId={
                session.lastFeedback?.regionId ??
                (modeId === 'name' ? session.currentRegionId : null)
              }
              fillOverrides={fillOverrides}
              onRegionClick={onRegionClick}
              readOnly={modeId === 'name' || session.status === 'feedback'}
              className="geo-map"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
