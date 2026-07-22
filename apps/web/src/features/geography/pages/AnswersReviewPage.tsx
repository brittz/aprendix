import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getPhaseById } from '@aprendix/content-geography';
import { getRegionLabel } from '@aprendix/map-engine';
import { sessionSummary, type SessionSnapshot } from '@aprendix/game-core';
import { t } from '../../../i18n';
import { BrazilPhaseMap } from '../components/BrazilPhaseMap';
import '../geography.css';

interface ReviewState {
  session?: SessionSnapshot;
}

export default function AnswersReviewPage() {
  const { phaseId } = useParams<{ phaseId: string; sessionId: string }>();
  const location = useLocation<ReviewState>();
  const phase = getPhaseById(phaseId);
  const session = location.state?.session;

  const summary = useMemo(
    () => (session ? sessionSummary(session) : null),
    [session],
  );

  const fillOverrides = useMemo(() => {
    if (!session) return {};
    const fills: Record<string, string> = {};
    for (const attempt of session.attempts) {
      fills[attempt.regionId] = attempt.correct ? '#22c55e' : '#ef4444';
    }
    return fills;
  }, [session]);

  if (!phase || !session || !summary) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>{t('geo.evolution.empty')}</p>
        </IonContent>
      </IonPage>
    );
  }

  const percent = Math.round(summary.accuracy * 100);
  const errors = summary.total - summary.correct;

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
          <IonTitle>{t('results.seeAnswers')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="geo-wrap">
          <div className="geo-stat-row">
            <div className="geo-stat-box ax-card">
              <strong className="geo-review-ok">{summary.correct}</strong>
              <span>{t('results.hits')}</span>
            </div>
            <div className="geo-stat-box ax-card">
              <strong className="geo-review-bad">{errors}</strong>
              <span>{t('results.misses')}</span>
            </div>
            <div className="geo-stat-box ax-card">
              <strong>{percent}%</strong>
              <span>{t('results.accuracyLabel')}</span>
            </div>
          </div>

          <div className="geo-review-layout">
            <ul className="geo-review-list">
              {session.attempts.map((attempt) => {
                const region = phase.regions.find((r) => r.id === attempt.regionId);
                const label = region
                  ? getRegionLabel(region, phase.defaultLocale)
                  : attempt.regionId;
                return (
                  <li key={`${attempt.regionId}-${attempt.responseMs}`}>
                    <span>{label}</span>
                    <span
                      className={
                        attempt.correct ? 'geo-review-ok' : 'geo-review-bad'
                      }
                    >
                      {attempt.correct ? '✓' : '✕'}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="geo-map-frame">
              <BrazilPhaseMap
                phase={phase}
                fillOverrides={fillOverrides}
                readOnly
                className="geo-map"
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
