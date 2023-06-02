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
  IonDatetimeButton,
  IonDatetime,
  IonNote,
  IonFooter,
  IonBackButton,
} from "@ionic/react";
import UserCard from "../UserCard";

interface LeaveRequestDetailModal {
  showModal: boolean;
  onCloseModal: () => void;
  onApproveLeave: () => void;
  onDenyLeave: () => void;
}

const LeaveApprovalDetailModal: React.FC<LeaveRequestDetailModal> = ({
  showModal,
  onCloseModal,
  onApproveLeave,
  onDenyLeave,
}) => {
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
            firstName="Trevor"
            lastName="Lambert"
            primaryDetail="Contractor"
            secondaryDetail="8 Hours | DMV"
          />
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Start Time</IonLabel>
            <IonDatetimeButton datetime="datetime" disabled={true} />
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime" presentation="date" />
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>End Time</IonLabel>
            <IonDatetimeButton datetime="datetime2" disabled={true} />
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime2" presentation="date" />
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonNote slot="end"> 3 hours</IonNote>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Type</IonLabel>
            <IonNote slot="end">Vacation</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            style={{ "--background-activated": "#fd7568" }}
            expand="block"
            onClick={onApproveLeave}
          >
            Approve Leave
          </IonButton>
          <IonButton
            style={{ "--background": "#FFEDEE", "--color": "#FD686A" }}
            expand="block"
            onClick={onDenyLeave}
          >
            Deny Time
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default LeaveApprovalDetailModal;
