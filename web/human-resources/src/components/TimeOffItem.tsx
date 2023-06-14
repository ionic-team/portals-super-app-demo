import { IonItem, IonIcon, IonLabel, IonNote } from "@ionic/react";
import { calendar } from "ionicons/icons";

interface TimeOffItemProps {
  label: string;
  note: string;
  status: number;
}

const TimeOffItem: React.FC<TimeOffItemProps> = ({ label, note, status }) => {
  let color;
  let statusText;

  switch (status) {
    case 0:
      color = "medium";
      statusText = "Pending";
      break;
    case 1:
      color = "success";
      statusText = "Approved";
      break;
    case 2:
      color = "danger";
      statusText = "Denied";
      break;
  }

  return (
    <IonItem detail={false} lines="inset">
      <IonIcon
        size="small"
        icon={calendar}
        style={{ color: "#B4BCC6" }}
        slot="start"
      />
      <IonLabel>
        <IonLabel>{label}</IonLabel>
        <IonNote
          style={{
            fontSize: "13px",
            fontWeight: "400",
            color: "#808080",
          }}
        >
          {note}
        </IonNote>
      </IonLabel>
      <IonNote color={color} slot="end" style={{ fontSize: "0.9em" }}>
        {statusText}
      </IonNote>
    </IonItem>
  );
};

export default TimeOffItem;
