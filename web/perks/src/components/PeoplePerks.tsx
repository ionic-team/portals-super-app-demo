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
import { Session } from "@supabase/supabase-js";
import { createPerksEntry, getPerks, getUsers } from "../supabase-api";
import { dismissPlugin } from "../super-app";

const PeoplePerks: React.FC<{ session: Session }> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    // declare the async data fetching function
    const fetchData = async () => {
      const users = await getUsers();
      const perks = await getPerks();

      if (isSubscribed) {
        setUsers(users);
        setPerks(perks);
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future `setData`
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      receivingUserId: { value: string };
      amount: { value: string };
      reason: { value: string };
    };

    await createPerksEntry({
      givingUserId: session.user.id,
      receivingUserId: target.receivingUserId.value,
      amount: parseInt(target.amount.value, 10),
      reason: target.reason.value,
    });
    setShowModal(false);
  };

  const [perkEvents, setPerkEvents] = useState<PerkEvent[]>([]);

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
        >
          <form onSubmit={handleAddEntry}>
            <IonHeader className="ion-no-border ios-no-background">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={handleCloseModal}>Cancel</IonButton>
                </IonButtons>
                <IonTitle>Give a Perk</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} type="submit">
                    Give
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
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
                  <IonSelect
                    name="receivingUserId"
                    placeholder="Select recipient"
                  >
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
            </IonContent>
          </form>
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
