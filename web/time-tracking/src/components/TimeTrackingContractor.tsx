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
  IonFooter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import PreviousTimeEntries from "../PreviousTimeEntries";
import { SessionObj, Entry } from "../../definitions";
import timeEntries from "../../time-entries.json";
import CreateTimeEntryModal from "./CreateTImeEntryModal";

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

  const handleCreateEntry = () => {
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
        <CreateTimeEntryModal
          showModal={showModal}
          onCloseModal={handleCloseModal}
          onCreateEntry={handleCreateEntry}
        />
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
