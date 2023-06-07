import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonFooter,
} from "@ionic/react";
import UserCard from "./UserCard";
import { processPTORequest } from "../../../supabaseApi/supabaseApi";

interface LeaveApprovalDetailModal {
  showModal: boolean;
  requestId: number;
  firstName: string;
  lastName: string;
  userType: string;
  startDate: string;
  endDate: string;
  duration: string;
  type: string;
  onCloseModal: () => void;
}

const LeaveApprovalDetailModal: React.FC<LeaveApprovalDetailModal> = ({
  showModal,
  requestId,
  firstName,
  lastName,
  userType,
  startDate,
  endDate,
  duration,
  type,
  onCloseModal,
}) => {
  const handleProcessRequest = async (approvalStatus: number) => {
    await processPTORequest(requestId, approvalStatus);
    onCloseModal();
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={onCloseModal}
      showBackdrop={true}
    >
      <IonHeader className="ion-no-border ios-no-background">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCloseModal}>Back</IonButton>
          </IonButtons>
          <IonTitle>Approve Leave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <UserCard
            firstName={firstName}
            lastName={lastName}
            primaryDetail={userType}
            isButton={false}
          />
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>From</IonLabel>
            <IonButton disabled={true}>{startDate}</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>To</IonLabel>
            <IonButton disabled={true}>{endDate}</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonNote slot="end">{duration}</IonNote>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Type</IonLabel>
            <IonNote slot="end">{type}</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" onClick={() => handleProcessRequest(0)}>
            Approve Leave
          </IonButton>
          <IonButton expand="block" onClick={() => handleProcessRequest(1)}>
            Deny Time
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default LeaveApprovalDetailModal;
