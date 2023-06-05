import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  const handleRouteHRManager = () => {
    history.push("/human-resources/manager");
  };

  const handleRouteHRContractor = () => {
    history.push("/human-resources/contractor");
  };

  return (
    <IonPage
      style={{
        margin: "350px 0px 0px 0px",
      }}
    >
      <IonContent
        style={{
          "text-align": "center",
        }}
      >
        <IonButton onClick={handleRouteHRManager}>Manager</IonButton>
        <IonButton onClick={handleRouteHRContractor}>Contractor</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
