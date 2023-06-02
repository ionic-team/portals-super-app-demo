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
} from "@ionic/react";
import { SessionObj } from "../../definitions";
import LeaveApprovalListModal from "./LeaveApprovalListModal";

const HumanResourcesManager: React.FC<{ session: SessionObj }> = ({
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
          style={{ margin: "23px 16px 23px 16px" }}
          onClick={handleOpenModal}
        >
          Time Off Requests (3)
        </IonButton>
        <LeaveApprovalListModal
          showModal={showModal}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          onApproveLeave={handleApproveRequest}
          onDenyLeave={handleDenyRequest}
        />
      </IonContent>
    </IonPage>
  );
};

export default HumanResourcesManager;
