import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  gameControllerOutline,
  homeOutline,
  personOutline,
  trophyOutline,
} from 'ionicons/icons';

import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import ChallengesPage from './pages/ChallengesPage';
import ProfilePage from './pages/ProfilePage';
import GeographyHubPage from './features/geography/pages/GeographyHubPage';
import PhaseModesPage from './features/geography/pages/PhaseModesPage';
import PlaySessionPage from './features/geography/pages/PlaySessionPage';
import ResultsPage from './features/geography/pages/ResultsPage';
import AnswersReviewPage from './features/geography/pages/AnswersReviewPage';
import BabiesHubPage from './features/babies/pages/BabiesHubPage';
import BabyPlayPage from './features/babies/pages/BabyPlayPage';
import ToddlersHubPage from './features/toddlers/pages/ToddlersHubPage';
import ToddlerPlayPage from './features/toddlers/pages/ToddlerPlayPage';
import PreschoolHubPage from './features/preschool/pages/PreschoolHubPage';
import PreschoolPlayPage from './features/preschool/pages/PreschoolPlayPage';
import { t } from './i18n';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact({ mode: 'ios' });

function AppTabs() {
  const location = useLocation();
  const hideTabBar =
    /\/(play|results|review)\//.test(location.pathname) ||
    location.pathname.includes('/babies/play') ||
    location.pathname.includes('/toddlers/play') ||
    location.pathname.includes('/preschool/play');

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={HomePage} />
        <Route exact path="/tabs/games" component={GamesPage} />
        <Route exact path="/tabs/challenges" component={ChallengesPage} />
        <Route exact path="/tabs/profile" component={ProfilePage} />

        <Route exact path="/geography" component={GeographyHubPage} />
        <Route exact path="/geography/:phaseId" component={PhaseModesPage} />
        <Route
          exact
          path="/geography/:phaseId/play/:modeId"
          component={PlaySessionPage}
        />
        <Route
          exact
          path="/geography/:phaseId/results/:sessionId"
          component={ResultsPage}
        />
        <Route
          exact
          path="/geography/:phaseId/review/:sessionId"
          component={AnswersReviewPage}
        />

        <Route exact path="/babies" component={BabiesHubPage} />
        <Route exact path="/babies/play/:activityId" component={BabyPlayPage} />

        <Route exact path="/toddlers" component={ToddlersHubPage} />
        <Route
          exact
          path="/toddlers/play/:activityId"
          component={ToddlerPlayPage}
        />

        <Route exact path="/preschool" component={PreschoolHubPage} />
        <Route
          exact
          path="/preschool/play/:activityId"
          component={PreschoolPlayPage}
        />

        <Route exact path="/home">
          <Redirect to="/tabs/home" />
        </Route>
        <Route exact path="/">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar
        slot="bottom"
        style={hideTabBar ? { display: 'none' } : {}}
      >
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>{t('nav.home')}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="games" href="/tabs/games">
          <IonIcon icon={gameControllerOutline} />
          <IonLabel>{t('nav.games')}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="challenges" href="/tabs/challenges">
          <IonIcon icon={trophyOutline} />
          <IonLabel>{t('nav.challenges')}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>{t('nav.profile')}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AppTabs />
      </IonReactRouter>
    </IonApp>
  );
}
