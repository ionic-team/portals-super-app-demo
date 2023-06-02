import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonNote,
  IonListHeader,
} from "@ionic/react";
import { sparkles } from "ionicons/icons";
import users from "../../users.json";
import perks from "../../perks.json";
import { PerkEvent } from "../../definitions";

const PreviousPerksGiven: React.FC<{ perksGiven: PerkEvent[] }> = ({
  perksGiven,
}) => {
  return (
    <>
      <IonListHeader>Previous Perks Activity</IonListHeader>
      <IonList inset={true}>
        {perksGiven.map((perkEvent) => (
          <IonItem button detail={false} lines="full" key={perkEvent.id}>
            <IonIcon
              size="small"
              icon={sparkles}
              style={{ color: "#B4BCC6" }}
              slot="start"
            />
            <IonLabel>
              <h3>
                {
                  users.find((user) => user.id === perkEvent.givingUserId)
                    ?.firstName
                }
                &nbsp;gave&nbsp;
                {
                  users.find((user) => user.id === perkEvent.receivingUserId)
                    ?.firstName
                }
                &nbsp;a&nbsp;
                {perks.find((perk) => perkEvent.perkId === perk.id)?.name}
              </h3>
              <p>{perkEvent.date}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default PreviousPerksGiven;
