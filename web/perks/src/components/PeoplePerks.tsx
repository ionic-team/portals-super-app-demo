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
  IonModal,
  IonFooter,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import PreviousPerksGiven from "./PreviousPerksGiven";
import { chevronBackOutline } from "ionicons/icons";
import { SessionObj, User, Perk, PerkEvent } from "../definitions";
import perks from "../perks.json";
import users from "../users.json";
import perksEntries from "../perks-entries.json";
import { registerPlugin } from "@capacitor/core/";

interface DismissPlugin {
  dismiss(): Promise<void>;
}

const dismissPlugin = registerPlugin<DismissPlugin>("Dismiss", {});

const PeoplePerks: React.FC<{ session: SessionObj }> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddEntry = () => {
    setShowModal(false);
  };
  console.log(session.user.userType);

  const [perkEvents, setPerkEvents] = useState<PerkEvent[]>(perksEntries);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon
                icon={chevronBackOutline}
                slot="start"
                onClick={() => {
                  console.log("here");
                  dismissPlugin.dismiss();
                }}
              ></IonIcon>
              Dashboard
            </IonButton>
          </IonButtons>
          <IonTitle>People Perks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">People Perks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PreviousPerksGiven perksGiven={perkEvents}></PreviousPerksGiven>
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
              <IonTitle>New Entry</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={handleAddEntry}>
                  Create
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>Give</IonLabel>
                <IonSelect placeholder="Select">
                  {perks.map((perk) => (
                    <IonSelectOption>{perk.name}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonList inset={true}>
              <IonItem>
                <IonLabel>to</IonLabel>
                <IonSelect placeholder="Select">
                  {users.map((user) => (
                    <IonSelectOption>
                      {user.firstName} {user.lastName}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonButton
              id="open-modal"
              expand="block"
              style={{ margin: "16px" }}
              onClick={handleAddEntry}
            >
              Give the perk
            </IonButton>
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
