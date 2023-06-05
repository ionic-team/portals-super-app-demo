import { IonItem, IonIcon, IonLabel, IonNote } from "@ionic/react";
import { calendar } from "ionicons/icons";

interface TimeOffItemProps {
  label: string;
  note: string;
  status: "Approved" | "Denied" | "Pending";
}

const TimeOffItem: React.FC<TimeOffItemProps> = ({ label, note, status }) => {
  let color;

  switch (status) {
    case "Approved":
      color = "success";
      break;
    case "Denied":
      color = "danger";
      break;
    case "Pending":
      color = "medium";
      break;
  }

  return (
    <IonItem button detail={false} lines="full">
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
        {status}
      </IonNote>
    </IonItem>
  );
};

export default TimeOffItem;
