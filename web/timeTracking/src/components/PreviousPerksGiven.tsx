import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonListHeader,
} from "@ionic/react";
import { sparkles } from "ionicons/icons";
import users from "../users.json";
import { PerkEvent } from "../definitions";

const PreviousPerksGiven: React.FC<{ perksGiven: PerkEvent[] }> = ({
  perksGiven,
}) => {
  return (
    <>
      <IonListHeader>Perks Activity</IonListHeader>
      <IonList inset={true}>
        {perksGiven.map((perkEvent) => {
          const givingUser = users.find(
            (user) => user.id === perkEvent.givingUserId
          );
          const receivingUser = users.find(
            (user) => user.id === perkEvent.receivingUserId
          );

          const date = new Date(perkEvent.date).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

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
                {receivingUser?.firstName.charAt(0).toUpperCase()}
                {receivingUser?.lastName.charAt(0).toUpperCase()}
              </IonAvatar>
              <IonLabel>
                <h3 style={{ whiteSpace: "break-spaces", fontWeight: "600" }}>
                  {`${givingUser?.firstName} ${givingUser?.lastName} gave ${receivingUser?.firstName} ${receivingUser?.lastName}`}
                  &nbsp;
                  <span style={{ color: "var(--ion-color-success)" }}>
                    +{perkEvent.amount}
                  </span>{" "}
                  for {perkEvent.message}
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
