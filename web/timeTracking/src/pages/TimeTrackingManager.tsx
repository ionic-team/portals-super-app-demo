import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonDatetimeButton,
  IonDatetime,
  IonNote,
} from "@ionic/react";
import PreviousTimeEntries from "../components/PreviousTimeEntries";
import { SessionObj, Entry } from "../definitions";
import times from "../time-entries.json";
import UserCard from "../components/UserCard";

const TimeTrackingManager: React.FC<{
  session: SessionObj;
}> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApproveTime = () => {
    setShowModal(false);
  };

  const handleDenyTime = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>Time Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          id="open-modal"
          expand="block"
          style={{ margin: "23px 16px 23px 16px" }}
          onClick={handleOpenModal}
        >
          Tracking Requests (0)
        </IonButton>
        <PreviousTimeEntries timeEntries={times}></PreviousTimeEntries>
        <IonModal
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          showBackdrop={true}
        >
          <IonHeader className="ion-no-border ios-no-background">
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={handleCloseModal}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Approve Time</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList inset={true}>
              <UserCard
                firstName="Trevor"
                lastName="Lambert"
                primaryDetail="Contractor"
                secondaryDetail="8 Hours | DMV"
              />
            </IonList>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>Start Time</IonLabel>
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="datetime"
                    value="2023-05-22T01:29"
                  ></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel>End Time</IonLabel>
                <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="datetime2"
                    value="2023-05-22T04:29"
                  ></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel>Total</IonLabel>
                <IonNote slot="end"> 3 hours</IonNote>
              </IonItem>
            </IonList>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>Customer</IonLabel>
                <IonNote slot="end">Acme Corporation</IonNote>
              </IonItem>
            </IonList>
          </IonContent>
          <IonFooter>
            <IonToolbar>
              <IonButton
                style={{ "--background-activated": "#fd7568" }}
                expand="block"
                onClick={handleApproveTime}
              >
                Approve Time
              </IonButton>
              <IonButton
                style={{ "--background": "#FFEDEE", "--color": "#FD686A" }}
                expand="block"
                onClick={handleDenyTime}
              >
                Deny Time
              </IonButton>
            </IonToolbar>
          </IonFooter>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TimeTrackingManager;
