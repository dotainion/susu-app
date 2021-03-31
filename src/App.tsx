import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonButton, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import './theme/custom.css';

/* Pages */
import { AuthContextProvider } from './stateContext/AuthContext';
import { Settings } from './pages/Settigns';
import { routes } from './global/Routes';
import { Login } from './authenticate/Login';
import { Register } from './authenticate/Register';
import { AuthValidate } from './AuthValidation';
import { Menu } from './components/Menu';
import { CreateSusu } from './pages/CreateSusu';
import { JoinSusu } from './pages/JoinSusu';
import { Requests } from './pages/Requests';
import { Manage } from './pages/Manage';
import { Recover } from './authenticate/Recover';
import { Welcome } from './pages/Welcome';
import { MyAccount } from './pages/MyAccount';
import { Page404 } from './error/Page404';
import { Help } from './pages/Help';



const App: React.FC = () => {
  return(
    <IonApp>
      <AuthContextProvider>    
        <IonReactRouter>
          <IonSplitPane contentId="menu">
            <Menu />
            <IonRouterOutlet id="menu">
              <Switch>
                <Route exact path={routes.settings}>
                  <AuthValidate component={<Settings />}/>
                </Route>
                <Route exact path={routes.createSusu}>
                  <AuthValidate component={<CreateSusu />}/>
                </Route>
                <Route exact path={routes.joinSusu}>
                  <AuthValidate component={<JoinSusu />}/>
                </Route>
                <Route exact path={routes.request}>
                  <AuthValidate component={<Requests />}/>
                </Route>
                <Route exact path={routes.manage}>
                  <AuthValidate component={<Manage />}/>
                </Route>
                <Route exact path={routes.welcome}>
                  <AuthValidate component={<Welcome />}/>
                </Route>
                <Route exact path={routes.myAccount}>
                  <AuthValidate component={<MyAccount />}/>
                </Route>
                <Route exact path={routes.help}>
                  <AuthValidate component={<Help />}/>
                </Route>
                <Route render={()=><Page404 />}/>
              </Switch>
            </IonRouterOutlet>
          </IonSplitPane>
          <Switch>
            <Route exact path={routes.defaults} render={()=><Redirect to={routes.login}/>}/>
            <Route exact path={routes.register} component={Register}/>
            <Route exact path={routes.recover} component={Recover}/>
            <Route exact path={routes.login} component={Login}/>
          </Switch>
        </IonReactRouter>
      </AuthContextProvider>
    </IonApp>
  );
}

export default App;
