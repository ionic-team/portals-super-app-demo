import { useRef, useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonButton,
  IonModal,
  IonFooter,
  IonList,
  IonItem,
  IonLabel,
  IonDatetimeButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { add } from "ionicons/icons";
import PreviousTimeEntries from "../components/PreviousTimeEntries";
import { SessionObj, Entry } from "../definitions";
import companies from "../companies.json";
import timeEntries from "../time-entries.json";

const TimeTrackingContractor: React.FC<{ session: SessionObj }> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddEntry = () => {
    setShowModal(false);
  };

  const [times, setTimes] = useState(timeEntries);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>Time Tracking</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleOpenModal}>
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
          </IonToolbar>
        </IonHeader>
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
              <IonTitle>New Entry</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={handleAddEntry}>Create</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>Start Time</IonLabel>
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime"></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel>End Time</IonLabel>
                <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime2"></IonDatetime>
                </IonModal>
              </IonItem>
            </IonList>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>Customer</IonLabel>
                <IonSelect placeholder="Select">
                  {companies.map((company) => (
                    <IonSelectOption>{company.name}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonButton id="open-modal" expand="block" style={{ margin: "16px" }} onClick={handleAddEntry}>
              Create Time Entry
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            onClick={handleOpenModal}
            id="open-entry-modal"
            expand="block"
            style={{ margin: "16px" }}
          >
            Create New Entry
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default TimeTrackingContractor;
