import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
} from "@ionic/react";
import { useRef, useState } from "react";
import UserCard from "./UserCard";
import LeaveRequestDetailModal from "./LeaveApprovalDetailModal";
import LeaveApprovalDetailModal from "./LeaveApprovalDetailModal";

interface LeaveRequestListModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onApproveLeave: () => void;
  onDenyLeave: () => void;
}

const LeaveApprovalListModal: React.FC<LeaveRequestListModalProps> = ({
  showModal,
  onCloseModal,
  onApproveLeave,
  onDenyLeave,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleOpenDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleCloseAllModals = () => {
    handleCloseDetailModal();
  };

  const handleApproveLeave = () => {
    setShowDetailModal(false);
  };

  const handleDenyLeave = () => {
    setShowDetailModal(false);
  };

  const handleShowDetails = () => {
    setShowDetailModal(true);
  };

  return (
    <>
      <IonModal
        isOpen={showModal}
        onDidDismiss={onCloseModal}
        showBackdrop={true}
      >
        <IonHeader className="ion-no-border ios-no-background">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onCloseModal}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Time Off Requests (3)</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList inset={true}>
            <UserCard
              onClick={handleShowDetails}
              firstName="Trevor"
              lastName="Lambert"
              primaryDetail="Contractor"
              secondaryDetail="8 Hours | DMV"
              isButton={true}
            />
            <UserCard
              onClick={handleShowDetails}
              firstName="Vanessa"
              lastName="Silva"
              primaryDetail="Contractor"
              secondaryDetail="8 Hours | DMV"
              isButton={true}
            />
          </IonList>
        </IonContent>
      </IonModal>
      <LeaveApprovalDetailModal
        showModal={showDetailModal}
        onCloseModal={handleCloseDetailModal}
        onApproveLeave={handleApproveLeave}
        onDenyLeave={handleDenyLeave}
      />
    </>
  );
};

export default LeaveApprovalListModal;
