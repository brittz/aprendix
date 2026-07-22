import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { t } from '../i18n';
import './GamesPage.css';

const GAMES = [
  {
    id: 'geo',
    titleKey: 'nav.geography' as const,
    desc: 'Estados, capitais, países e biomas',
    color: '#dbeafe',
    path: '/geography',
    ready: true,
  },
  {
    id: 'babies',
    titleKey: 'home.cta.babies' as const,
    desc: 'Primeiros estímulos 0–1 ano',
    color: '#ffedd5',
    path: '/babies',
    ready: true,
  },
  {
    id: 'toddlers',
    titleKey: 'home.cta.toddlers' as const,
    desc: 'Formas, cores, frutas e contraste',
    color: '#e0e7ff',
    path: '/toddlers',
    ready: true,
  },
  {
    id: 'math',
    titleKey: 'cat.math' as const,
    desc: 'Em breve',
    color: '#fce7f3',
    path: '/tabs/games',
    ready: false,
  },
  {
    id: 'letters',
    titleKey: 'cat.letters' as const,
    desc: 'Em breve',
    color: '#fef3c7',
    path: '/tabs/games',
    ready: false,
  },
];

export default function GamesPage() {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('nav.games')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ax-page">
          <p className="ax-muted" style={{ marginTop: 0 }}>
            {t('games.lede')}
          </p>
          <div className="games-list">
            {GAMES.map((game) => (
              <button
                key={game.id}
                type="button"
                className={`ax-card games-item${game.ready ? '' : ' is-soon'}`}
                onClick={() => game.ready && history.push(game.path)}
                disabled={!game.ready}
              >
                <div
                  className="games-item-icon"
                  style={{ background: game.color }}
                  aria-hidden
                />
                <div>
                  <h2>{t(game.titleKey)}</h2>
                  <p>{game.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
