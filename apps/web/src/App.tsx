import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import HomePage from './pages/HomePage';
import GeographyHubPage from './features/geography/pages/GeographyHubPage';
import PhaseModesPage from './features/geography/pages/PhaseModesPage';
import PlaySessionPage from './features/geography/pages/PlaySessionPage';
import ResultsPage from './features/geography/pages/ResultsPage';
import BabiesHubPage from './features/babies/pages/BabiesHubPage';
import BabyPlayPage from './features/babies/pages/BabyPlayPage';

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

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/babies" component={BabiesHubPage} />
          <Route exact path="/babies/play/:activityId" component={BabyPlayPage} />
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
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
