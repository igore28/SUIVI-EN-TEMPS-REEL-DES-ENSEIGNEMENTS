import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, person,clipboard,receipt,notifications } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import ENSEIGNANT from './pages/Enseignant';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/Register';
import Fiche from './pages/fiche';
import Affiche from './pages/affiche';
import Test from './pages/test'
import Alert from './pages/Alert'
import Loader from './pages/Loader'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>

          <Route exact path="/tab1">
            <Tab1 />
          </Route>

          <Route exact path="/tab2">
            <Tab2 />
          </Route>

          <Route path="/tab3">
            <Tab3 />
          </Route>

           <Route path="/ens">
            <ENSEIGNANT />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/loader">
            <Loader />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/fiche">
            <Fiche />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/affiche">
            <Affiche />
          </Route>

          <Route path="/tata">
            <Test/>
          </Route>

          <Route exact path="/">
            <Redirect to="/loader" />
          </Route>

          <Route exact path="/alert">
              <Alert />
          </Route>

        </IonRouterOutlet>
 
    </IonReactRouter>
  </IonApp>
);

export default App;
