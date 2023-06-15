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
import { TimesheetApproval } from "../../../supabaseApi/types";
import { chevronBack } from "ionicons/icons";
import { getPendingTimesheetApprovals } from "../../../supabaseApi/supabaseApi";
import TimesheetItem from "./TimeEntryItem";
import ApprovalListModal from "./ApprovalListModal";
import { Session } from "../../../supabaseApi/supabaseApi";
import { dismissPlugin } from "../super-app";

const TimeTrackingManager: React.FC<{
  session: Session;
}> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [approvals, setApprovals] = useState<TimesheetApproval[]>();

  const handleGetTimesheetApprovals = async () => {
    const approvals = await getPendingTimesheetApprovals(session.user.id);
    setApprovals(approvals);
  };

  const handleCloseModal = () => {
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
            <IonButton
              onClick={() => {
                dismissPlugin.dismiss();
              }}
            >
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
        <ApprovalListModal
          showModal={showModal}
          approvals={approvals}
          onCloseModal={handleCloseModal}
          onReloadApprovals={handleGetTimesheetApprovals}
        />
      </IonContent>
    </IonPage>
  );
};

export default TimeTrackingManager;
