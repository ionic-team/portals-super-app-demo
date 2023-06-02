import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  const handleRouteContractor = () => {
    history.push("/time-tracking/contractor");
  };

  const handleRouteManager = () => {
    history.push("/time-tracking/manager");
  };

  const handleRouteSalesperson = () => {
    history.push("/time-tracking/salesperson");
  };

  const handleRouteHRManager = () => {
    history.push("/human-resources/manager");
  };

  const handleRouteHRContractor = () => {
    history.push("/human-resources/contractor");
  };

  const handlePeoplePerks = () => {
    history.push("/people-perks");
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
        <IonButton onClick={handleRouteContractor}>
          Time Tracking - Contractor
        </IonButton>
        <IonButton onClick={handleRouteManager}>
          Time Tracking - Manager
        </IonButton>
        <IonButton onClick={handleRouteSalesperson}>
          Time Tracking - Salesperson
        </IonButton>
        <IonButton onClick={handleRouteHRManager}>HR Manager</IonButton>
        <IonButton onClick={handleRouteHRContractor}>HR Contractor</IonButton>
        <IonButton onClick={handlePeoplePerks}>People Perks</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
