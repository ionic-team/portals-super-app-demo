import { useRef, useState, useEffect, ChangeEvent } from "react";
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
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  useIonRouter,
  IonFooter,
  IonDatetimeButton,
  IonDatetime,
  IonNote,
  IonInput,
  IonListHeader,
  InputChangeEventDetail,
} from "@ionic/react";
import PreviousTimeEntries from "../PreviousTimeEntries";
import { SessionObj, Entry } from "../../definitions";
import times from "../../time-entries.json";
import UserCard from "../UserCard";

const TimeTrackingSalesperson: React.FC<{
  session: SessionObj;
  setEvents: any;
}> = ({ session, setEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddEntry = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>Time Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          id="open-modal"
          expand="block"
          style={{ margin: "23px 16px 23px 16px" }}
          onClick={handleOpenModal}
        >
          Add Customer
        </IonButton>
        <IonListHeader>Existing Customers</IonListHeader>
        <IonList inset={true}>
          <IonItem detail={false} lines="full">
            <IonLabel>Innitech</IonLabel>
          </IonItem>
          <IonItem detail={false} lines="full">
            <IonLabel>StreamShop</IonLabel>
          </IonItem>
          <IonItem detail={false} lines="full">
            <IonLabel>ThePlace</IonLabel>
          </IonItem>
        </IonList>
        <IonModal
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          showBackdrop={true}
        >
          <IonHeader className="ion-no-border ios-no-background">
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={handleCloseModal}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Customer</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={handleAddEntry}>
                  Add
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList inset={true}>
              <IonItem>
                <IonLabel slot="start">Customer Name</IonLabel>
                <IonInput
                  placeholder="Enter"
                  value={inputValue}
                  onIonChange={() => console.log(inputValue)}
                  style={{ "text-align": "end" }}
                ></IonInput>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TimeTrackingSalesperson;
