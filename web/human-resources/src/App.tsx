import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState, useEffect } from "react";
import HumanResourcesContractor from "./components/HumanResourcesContractor";
import HumanResourcesManager from "./components/HumanResourcesManager";
import { supabase, Session } from "../../supabaseApi/supabaseApi";
import { initialContext } from "./super-app";

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
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth
      .setSession({
        access_token: initialContext.supabase.accessToken,
        refresh_token: initialContext.supabase.refreshToken,
      })
      .then(({ data }) => {
        setSession(data.session);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <></>;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {session.user.app_metadata.app_role === "manager" ? (
            <HumanResourcesManager session={session} />
          ) : (
            <HumanResourcesContractor session={session} />
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
