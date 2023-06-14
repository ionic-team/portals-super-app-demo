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
} from "@ionic/react";
import UserCard from "./UserCard";

interface ApprovalListModalProps {
    showModal: boolean;
    onCloseModal: () => void;
}

const ApprovalListModal: React.FC<ApprovalListModalProps> = ({showModal, onCloseModal}) => {
  return (
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
          <IonTitle>Approve Time</IonTitle>
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
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime" value="2023-05-22T01:29"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>End Time</IonLabel>
            <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetime2"
                value="2023-05-22T04:29"
              ></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>Total</IonLabel>
            <IonNote slot="end"> 3 hours</IonNote>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Customer</IonLabel>
            <IonNote slot="end">Acme Corporation</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            style={{ "--background-activated": "#fd7568" }}
            expand="block"
          >
            Approve Time
          </IonButton>
          <IonButton
            style={{ "--background": "#FFEDEE", "--color": "#FD686A" }}
            expand="block"
          >
            Deny Time
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};
