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
import { chevronBack } from "ionicons/icons";
import { TimesheetApproval } from "../../../supabaseApi/types";

interface ApprovalDetailModal {
  showModal: boolean;
  approval: TimesheetApproval;
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
    onCloseModal();
  };

  const handleRejectPTO = async () => {
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
              {formatDate(approval.time_entry.date)}
            </IonButton>
            <IonButton
              color="light"
              size="small"
              style={{ height: "30px", fontSize: "16px", fontWeight: 400 }}
            >
              {approval.time_entry.start_time}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>To</IonLabel>
            <IonButton
              color="light"
              size="small"
              style={{ height: "30px", fontSize: "16px", fontWeight: 400 }}
            >
              {formatDate(approval.time_entry.date)}
            </IonButton>
            <IonButton
              color="light"
              size="small"
              style={{ height: "30px", fontSize: "16px", fontWeight: 400 }}
            >
              {approval.time_entry.end_time}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonLabel slot="end">{duration}</IonLabel>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Customer</IonLabel>
            <IonLabel slot="end">{approval.customer.name}</IonLabel>
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
