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
  IonListHeader,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { SessionObj } from "../definitions";
import LeaveApprovalListModal from "./LeaveApprovalListModal";
import { calendar } from "ionicons/icons";
import TimeOffItem from "./TimeOffItem";

interface HumanResourcesManagerProps {
  session: SessionObj;
}

const HumanResourcesManager: React.FC<HumanResourcesManagerProps> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApproveRequest = () => {
    setShowModal(false);
  };

  const handleDenyRequest = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Dashboard" />
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
          style={{ margin: "23px 16px 23px 16px" }}
          onClick={handleOpenModal}
        >
          Time Off Requests (3)
        </IonButton>
        <IonListHeader>Previous Time Off Requests</IonListHeader>
        <IonList inset={true}>
          <TimeOffItem
            label="04/01/2023"
            note="Requested: 03/07/2023"
            status="Approved"
          />
          <TimeOffItem
            label="04/01/2023"
            note="Requested: 03/07/2023"
            status="Denied"
          />
          <TimeOffItem
            label="04/01/2023"
            note="Requested: 03/07/2023"
            status="Pending"
          />
        </IonList>
        <LeaveApprovalListModal
          showModal={showModal}
          onCloseModal={handleCloseModal}
          onApproveLeave={handleApproveRequest}
          onDenyLeave={handleDenyRequest}
        />
      </IonContent>
    </IonPage>
  );
};

export default HumanResourcesManager;
