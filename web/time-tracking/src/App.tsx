import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { useEffect, useState } from "react";
import TimeTrackingContractor from "./components/TimeTrackingContractor";
import TimeTrackingManager from "./components/TimeTrackingManager";

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
import { Session, supabase } from "../../supabaseApi/supabaseApi";
import { initialContext } from "./super-app";

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
      {session.user.app_metadata.app_role === "manager" ? (
        <TimeTrackingManager session={session} />
      ) : (
        <TimeTrackingContractor session={session} />
      )}
    </IonApp>
  );
};

export default App;
