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
  IonFooter,
  IonList,
  IonItem,
  IonLabel,
  IonDatetimeButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import PreviousTimeEntries from "../PreviousTimeEntries";
import { SessionObj, Entry } from "../../definitions";
import companies from "../../companies.json";
import timeEntries from "../../time-entries.json";
import LeaveRequestModal from "./LeaveRequestModal";

const HumanResourcesContractor: React.FC<{ session: SessionObj }> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitRequest = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>Human Resources</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Human Resources</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          expand="block"
          style={{ margin: "23px 16px 8px 16px" }}
          onClick={handleOpenModal}
        >
          Request Time Off
        </IonButton>
        <LeaveRequestModal
          showModal={showModal}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          handleSubmitRequest={handleSubmitRequest}
        />
      </IonContent>
    </IonPage>
  );
};

export default HumanResourcesContractor;
