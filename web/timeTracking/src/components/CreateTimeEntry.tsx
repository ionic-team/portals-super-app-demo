import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import companies from "../companies.json";

const CreateTimeEntry: React.FC = () => {
  const dismiss = () => {};
  return (
    <>
      <IonHeader className="ion-no-border ios-no-background">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>New Entry</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>Create</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Start Time</IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>End Time</IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Customer</IonLabel>
            <IonSelect placeholder="Select">
              {companies.map((company) => (
                <IonSelectOption>{company.name}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Add Attachment...</IonLabel>
          </IonItem>
        </IonList>
        <IonButton id="open-modal" expand="block">
          Create Time Entry
        </IonButton>
      </IonContent>
    </>
  );
};

export default CreateTimeEntry;
