import { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
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
import { chevronBackOutline } from "ionicons/icons";
import PreviousPerksGiven from "../components/PreviousPerksGiven";
import { PerkEvent, User } from "../definitions";
import { createPerksEntry, getPerks, getUsers, Session } from "../supabase-api";
import { dismissPlugin } from "../super-app";

const PeoplePerks: React.FC<{ session: Session }> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [perkEvents, setPerkEvents] = useState<PerkEvent[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current === null ? undefined : page.current);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const users = await getUsers();
      const perks = await getPerks();

      if (isSubscribed) {
        setUsers(users);
        setPerkEvents(perks);
      }
    };

    fetchData().catch(console.error);

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddEntry = async () => {
    const formData = new FormData(formRef.current!);

    const response = await createPerksEntry({
      giver: session.user.id,
      receiver: formData.get("receiver") as string,
      amount: parseInt(formData.get("amount") as string, 10),
      reason: formData.get("reason") as string,
    });

    setPerkEvents([...perkEvents, response]);
    setShowModal(false);
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                dismissPlugin.dismiss();
              }}
            >
              <IonIcon icon={chevronBackOutline} slot="start"></IonIcon>
              Dashboard
            </IonButton>
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
        <PreviousPerksGiven
          perksGiven={perkEvents}
          users={users}
        ></PreviousPerksGiven>
        <IonModal
          ref={modal}
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          showBackdrop={true}
          presentingElement={presentingElement}
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
            <form ref={formRef} onSubmit={handleAddEntry}>
              <IonList inset={true}>
                <IonItem>
                  <IonLabel>Give</IonLabel>
                  <IonSelect name="amount" placeholder="Select amount">
                    {[5, 10, 20, 25, 50, 75, 100].map((perkAmount) => (
                      <IonSelectOption>{perkAmount}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonList inset={true}>
                <IonItem>
                  <IonLabel>To</IonLabel>
                  <IonSelect name="receiver" placeholder="Select recipient">
                    {users.map((user) => (
                      <IonSelectOption value={user.id}>
                        {user.first_name} {user.last_name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonList inset={true}>
                <IonItem>
                  <IonLabel>For</IonLabel>
                  <IonInput
                    name="reason"
                    placeholder="Write a few words"
                    style={{ textAlign: "right" }}
                  />
                </IonItem>
              </IonList>
            </form>
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
