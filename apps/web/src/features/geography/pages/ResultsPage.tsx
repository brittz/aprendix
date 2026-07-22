import {
  IonButton,
  IonContent,
  IonPage,
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
    return evolutionFromHistory(loadSessions(), session.phaseId, session.modeId);
  }, [session]);

  if (!phase || !session || !summary) {
    return (
      <IonPage>
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
  const errors = summary.total - summary.correct;

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="geo-results">
          <div className="geo-trophy" aria-hidden>
            ★
          </div>
          <h1>{t('results.wellDone')}</h1>
          <p className="geo-results-lead">{t('results.completed')}</p>

          <div className="geo-results-card">
            <div className="geo-stat-row">
              <div className="geo-stat-box">
                <strong style={{ color: 'var(--ax-success)' }}>{summary.correct}</strong>
                <span>{t('results.hits')}</span>
              </div>
              <div className="geo-stat-box">
                <strong style={{ color: 'var(--ax-danger)' }}>{errors}</strong>
                <span>{t('results.misses')}</span>
              </div>
              <div className="geo-stat-box">
                <strong>{percent}%</strong>
                <span>{t('results.accuracyLabel')}</span>
              </div>
            </div>

            {session.modeId !== 'train' && (
              <>
                <p className="geo-score-big">{summary.score} XP</p>
                <p className="ax-muted" style={{ marginTop: 0 }}>
                  {evolution && evolution.before > 0
                    ? t('results.evolution.detail', {
                        before: evolution.before,
                        after: stored.uniqueCorrect,
                      })
                    : t('results.evolution.first', { after: stored.uniqueCorrect })}
                </p>
              </>
            )}

            <IonButton
              expand="block"
              className="ax-btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() =>
                history.push(`/geography/${phase.id}/review/${session.id}`, {
                  session,
                })
              }
            >
              {t('results.seeAnswers')}
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              onClick={() =>
                history.replace(`/geography/${phase.id}/play/${session.modeId}`)
              }
            >
              {t('results.again')}
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              color="medium"
              onClick={() => history.replace(`/geography/${phase.id}`)}
            >
              {t('results.modes')}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
