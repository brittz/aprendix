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
import { useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPhaseById } from '@aprendix/content-geography';
import {
  evolutionFromHistory,
  sessionSummary,
  toStoredSession,
  type SessionSnapshot,
} from '@aprendix/game-core';
import { t } from '../../../i18n';
import { loadSessions } from '../../../persistence/geoProgress';
import '../geography.css';

interface ResultsLocationState {
  session?: SessionSnapshot;
}

export default function ResultsPage() {
  const { phaseId } = useParams<{ phaseId: string; sessionId: string }>();
  const history = useHistory();
  const location = useLocation<ResultsLocationState>();
  const phase = getPhaseById(phaseId);
  const session = location.state?.session;

  const summary = useMemo(
    () => (session ? sessionSummary(session) : null),
    [session],
  );

  const evolution = useMemo(() => {
    if (!session) return null;
    // History already includes this session (saved on complete).
    return evolutionFromHistory(loadSessions(), session.phaseId, session.modeId);
  }, [session]);

  if (!phase || !session || !summary) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/geography" text={t('geo.back')} />
            </IonButtons>
            <IonTitle>{t('results.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>{t('geo.evolution.empty')}</p>
          <IonButton onClick={() => history.replace('/geography')}>
            {t('results.modes')}
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const stored = toStoredSession(session);
  const percent = Math.round(summary.accuracy * 100);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/geography/${phase.id}`}
              text={t('geo.back')}
            />
          </IonButtons>
          <IonTitle>{t('results.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="geo-results" fullscreen>
        <div className="geo-wrap">
          <h1>{t('results.title')}</h1>

          <div className="geo-stat-panel">
            <p>
              {t('results.correct', {
                correct: summary.correct,
                total: summary.total,
              })}
            </p>
            <p>{t('results.accuracy', { percent })}</p>
            {session.modeId !== 'train' && (
              <>
                <p>{t('results.score', { score: summary.score })}</p>
                <p>{t('results.streak', { streak: summary.maxStreak })}</p>
              </>
            )}
          </div>

          <div className="geo-stat-panel">
            <p>{t('results.evolution')}</p>
            {evolution && evolution.before > 0 ? (
              <p className="geo-evolution-number">
                {t('results.evolution.detail', {
                  before: evolution.before,
                  after: stored.uniqueCorrect,
                })}
              </p>
            ) : (
              <p className="geo-evolution-number">
                {t('results.evolution.first', {
                  after: stored.uniqueCorrect,
                })}
              </p>
            )}
            <p className="geo-note">
              {t('geo.evolution.line', {
                before: evolution?.before ?? 0,
                after: stored.uniqueCorrect,
              })}
            </p>
          </div>

          <div className="geo-actions">
            <IonButton
              onClick={() =>
                history.replace(
                  `/geography/${phase.id}/play/${session.modeId}`,
                )
              }
            >
              {t('results.again')}
            </IonButton>
            <IonButton
              fill="outline"
              onClick={() => history.replace(`/geography/${phase.id}`)}
            >
              {t('results.modes')}
            </IonButton>
            <IonButton fill="clear" onClick={() => history.replace('/home')}>
              {t('results.home')}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
