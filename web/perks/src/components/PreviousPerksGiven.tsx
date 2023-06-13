import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonListHeader,
} from "@ionic/react";
import { PerkEvent, User } from "../definitions";

const PreviousPerksGiven: React.FC<{
  users: User[];
  perksGiven: PerkEvent[];
}> = ({ users, perksGiven }) => {
  return (
    <>
      <IonListHeader>Perks Activity</IonListHeader>
      <IonList inset={true}>
        {perksGiven.map((perkEvent) => {
          const givingUser = users.find((user) => user.id === perkEvent.giver);
          const receivingUser = users.find(
            (user) => user.id === perkEvent.receiver
          );
          console.log(givingUser, receivingUser, users, perkEvent);

          const date = new Date(perkEvent.created_at).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );

          return (
            <IonItem button detail={false} lines="full" key={perkEvent.id}>
              <IonAvatar
                slot="start"
                style={{
                  backgroundColor: "#999",
                  color: "#FFF",
                  lineHeight: "36px",
                  textAlign: "center",
                }}
              >
                {receivingUser?.first_name.charAt(0).toUpperCase()}
                {receivingUser?.last_name.charAt(0).toUpperCase()}
              </IonAvatar>
              <IonLabel>
                <h3 style={{ whiteSpace: "break-spaces", fontWeight: "600" }}>
                  {`${givingUser?.first_name} ${givingUser?.last_name} gave ${receivingUser?.first_name} ${receivingUser?.last_name}`}
                  &nbsp;
                  <span style={{ color: "var(--ion-color-success)" }}>
                    +{perkEvent.amount}
                  </span>{" "}
                  for {perkEvent.reason}
                </h3>
                <p>{date}</p>
              </IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

export default PreviousPerksGiven;
