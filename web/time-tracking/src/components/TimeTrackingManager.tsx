import { useEffect, useState } from "react";
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
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonDatetimeButton,
  IonDatetime,
  IonNote,
  IonIcon,
  IonLoading,
  IonListHeader,
} from "@ionic/react";
import { SessionObj, TimesheetApproval } from "../../../supabaseApi/types";
import UserCard from "./UserCard";
import { chevronBack } from "ionicons/icons";
import { getTimesheetApprovals } from "../../../supabaseApi/supabaseApi";
import TimesheetItem from "./TimesheetItem";

const TimeTrackingManager: React.FC<{
  session: SessionObj;
}> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [approvals, setApprovals] = useState<TimesheetApproval[]>();

  const handleGetTimesheetApprovals = async () => {
    const approvals = await getTimesheetApprovals(session.user.id);
    setApprovals(approvals);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApproveTime = () => {
    setShowModal(false);
  };

  const handleDenyTime = () => {
    setShowModal(false);
  };

  useEffect(() => {
    handleGetTimesheetApprovals();
  });

  if (!approvals) {
    return <IonLoading />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton>
              <IonIcon icon={chevronBack} />
              Dashboard
            </IonButton>
          </IonButtons>
          <IonTitle>Time Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
          </IonToolbar>
          <IonButton
            expand="block"
            style={{ margin: 16 }}
            onClick={() => setShowModal(true)}
          >
            {`Time Off Requests (${approvals.length})`}
          </IonButton>
        </IonHeader>
        <IonListHeader>Pending Time Entries</IonListHeader>
        <IonList inset={true}>
          {approvals.length > 0 ? (
            approvals.map((approval) => (
              <TimesheetItem
                key={approval.time_entry.id}
                label={approval.customer.name}
                startTime={approval.time_entry.start_time}
                endTime={approval.time_entry.end_time}
                date={approval.time_entry.date}
                status={approval.time_entry.approval_status}
              />
            ))
          ) : (
            <IonItem>
              <IonLabel>No Requests!</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TimeTrackingManager;
