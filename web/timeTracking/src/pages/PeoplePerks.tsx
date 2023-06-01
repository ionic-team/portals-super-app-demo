import { useState, useEffect, useRef } from "react";
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
  IonFooter,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
} from "@ionic/react";
import PreviousPerksGiven from "../components/PreviousPerksGiven";
import { SessionObj, PerkEvent } from "../definitions";
import users from "../users.json";
import perksEntries from "../perks-entries.json";

const PeoplePerks: React.FC<{ session: SessionObj }> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddEntry = () => {
    setShowModal(false);
  };

  const [perkEvents, setPerkEvents] = useState<PerkEvent[]>(perksEntries);

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>Perks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PreviousPerksGiven perksGiven={perkEvents}></PreviousPerksGiven>
        <IonModal
          ref={modal}
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          showBackdrop={true}
        >
          <IonHeader className="ion-no-border ios-no-background">
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={handleCloseModal}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Give a Perk</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={handleAddEntry}>
                  Give
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>Give</IonLabel>
                <IonSelect placeholder="Select amount">
                  {[5, 10, 20, 25, 50, 75, 100].map((perkAmount) => (
                    <IonSelectOption>{perkAmount}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>To</IonLabel>
                <IonSelect placeholder="Select recipient">
                  {users.map((user) => (
                    <IonSelectOption>
                      {user.firstName} {user.lastName}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>For</IonLabel>
                <IonInput
                  placeholder="Write a few words"
                  style={{ textAlign: "right" }}
                />
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            onClick={handleOpenModal}
            id="open-entry-modal"
            expand="block"
            style={{ margin: "16px" }}
          >
            Give A Perk
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PeoplePerks;
