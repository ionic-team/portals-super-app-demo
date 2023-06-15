import { IonItem, IonIcon, IonLabel, IonNote } from "@ionic/react";
import { calendar, time } from "ionicons/icons";

interface TimeEntryItemProps {
  label: string;
  startTime: string;
  endTime: string;
  date: string;
  status: number;
}

const TimeEntryItem: React.FC<TimeEntryItemProps> = ({
  label,
  startTime,
  endTime,
  date,
  status,
}) => {
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

  const getDuration = () => {
    const [hours1, minutes1] = startTime.split(":");
    const [hours2, minutes2] = endTime.split(":");
    const hours = Number(hours2) - Number(hours1);
    const hoursText =
      hours === 0 ? "" : hours > 1 ? hours + " hours" : hours + " hour";
    const minutes = (Number(minutes2) - Number(minutes1) + 60) % 60;
    const minutesText =
      minutes === 0
        ? ""
        : minutes > 1
        ? minutes + " minutes"
        : minutes + " minute";
    return hoursText + " " + minutesText;
  };

  const formatDate = () => {
    const [year, month, day] = date.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const duration = getDuration();
  const formattedDate = formatDate();

  return (
    <IonItem detail={false} lines="full">
      <IonIcon
        size="small"
        icon={time}
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
          {duration + " | " + formattedDate}
        </IonNote>
      </IonLabel>
      <IonNote color={color} slot="end" style={{ fontSize: "0.9em" }}>
        {statusText}
      </IonNote>
    </IonItem>
  );
};

export default TimeEntryItem;
