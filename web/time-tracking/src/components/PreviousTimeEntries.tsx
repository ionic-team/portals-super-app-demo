import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonNote,
  IonListHeader,
} from "@ionic/react";
import { time } from "ionicons/icons";

const PreviousTimeEntries = () => {
  return (
    <>
      <IonListHeader>Previous Time Entries</IonListHeader>
      <IonList inset={true}>
        {/* {timeEntries.map((entry) => (
          <IonItem button detail={false} lines="full" key={entry.id}>
            <IonIcon
              size="small"
              icon={time}
              style={{ color: "#B4BCC6" }}
              slot="start"
            />
            <IonLabel>
              <h3>
                {/* {
                  companies.find((company) => company.id === entry.companyId)
                    ?.name
                } */}
              {/* </h3>
              <p>
                {entry.length} hours | {entry.date}
              </p>
            </IonLabel>
            {entry.status === "approved" ? (
              <IonNote color="success" slot="end" style={{ fontSize: "0.9em" }}>
                Approved
              </IonNote>
            ) : (
              <IonNote color="warning" slot="end" style={{ fontSize: "0.9em" }}>
                Pending
              </IonNote>
            )}
          </IonItem> */}
        {/* ))} */}
      </IonList>
    </>
  );
};

export default PreviousTimeEntries;
