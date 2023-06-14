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
  IonFooter,
  IonIcon,
} from "@ionic/react";
import UserCard from "./UserCard";
import { approvePTO, rejectPTO } from "../../../supabaseApi/supabaseApi";
import { PTOApproval } from "../../../supabaseApi/types";
import { chevronBack } from "ionicons/icons";

interface ApprovalDetailModal {
  showModal: boolean;
  approval: PTOApproval;
  duration: string;
  onCloseModal: () => void;
}

const ApprovalDetailModal: React.FC<ApprovalDetailModal> = ({
  showModal,
  approval,
  duration,
  onCloseModal,
}) => {
  const handleApprovePTO = async () => {
    await approvePTO(approval.pto_request.id);
    onCloseModal();
  };

  const handleRejectPTO = async () => {
    await rejectPTO(approval.pto_request.id);
    onCloseModal();
  };

  const formatDate = (date: string) => {
    return new Date(date)
      .toDateString()
      .slice(4)
      .replace(/(.{6})/, "$1,");
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
            <IonButton onClick={onCloseModal}>
              <IonIcon icon={chevronBack} />
              Back
            </IonButton>
          </IonButtons>
          <IonTitle>Approve Leave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <UserCard
            firstName={approval.employee.first_name}
            lastName={approval.employee.last_name}
            primaryDetail={
              approval.employee.role.charAt(0).toUpperCase() +
              approval.employee.role.slice(1)
            }
            isButton={false}
          />
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>From</IonLabel>
            <IonButton
              color="light"
              size="small"
              style={{ height: "30px", fontSize: "16px", fontWeight: 400 }}
            >
              {formatDate(approval.pto_request.start_date)}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>To</IonLabel>
            <IonButton
              color="light"
              size="small"
              style={{ height: "30px", fontSize: "16px", fontWeight: 400 }}
            >
              {formatDate(approval.pto_request.end_date)}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonLabel slot="end">{duration}</IonLabel>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Type</IonLabel>
            <IonLabel slot="end">{approval.pto_request.type}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButton expand="block" onClick={handleApprovePTO}>
            Approve Leave
          </IonButton>
          <IonButton color="secondary" expand="block" onClick={handleRejectPTO}>
            Decline
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ApprovalDetailModal;
