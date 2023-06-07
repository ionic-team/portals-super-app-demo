import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState } from "react";
import userList from "../../supabaseApi/users.json";
import Home from "./pages/Home";
import HumanResourcesContractor from "./components/HumanResourcesContractor";
import HumanResourcesManager from "./components/HumanResourcesManager";
import { SessionObj } from "../../supabaseApi/types";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const contractor = userList[0];
  const manager = userList[1];
  const [sessionContractor, setSessionContractor] = useState<SessionObj>({
    user: contractor,
  });
  const [sessionManager, setSessionManager] = useState<SessionObj>({
    user: manager,
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route exact path="/human-resources/manager">
            <HumanResourcesManager session={sessionManager} />
          </Route>
          <Route exact path="/human-resources/contractor">
            <HumanResourcesContractor session={sessionContractor} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
