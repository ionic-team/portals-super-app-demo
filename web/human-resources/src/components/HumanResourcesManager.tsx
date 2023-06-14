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
  IonListHeader,
  IonList,
  IonLoading,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import LeaveApprovalListModal from "./LeaveApprovalListModal";
import TimeOffItem from "./TimeOffItem";
import { getPendingPTOApprovalsNew } from "../../../supabaseApi/supabaseApi";
import { PTOApproval, SessionObj } from "../../../supabaseApi/types";
import { chevronBack } from "ionicons/icons";

interface HumanResourcesManagerProps {
  session: SessionObj;
}

const HumanResourcesManager: React.FC<HumanResourcesManagerProps> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [approvals, setApprovals] = useState<PTOApproval[]>();

  const handleGetApprovals = async () => {
    const approvals: PTOApproval[] = await getPendingPTOApprovalsNew(
      session.user.id
    );
    setApprovals(approvals);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    handleGetApprovals();
  }, []);

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
          <IonTitle>Human Resources</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Human Resources</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          expand="block"
          style={{ margin: 16 }}
          onClick={() => setShowModal(true)}
          disabled={approvals.length === 0}
        >
          {`Time Off Requests (${approvals.length})`}
        </IonButton>
        <IonListHeader>Pending Time Off Requests</IonListHeader>
        <IonList inset={true}>
          {approvals.length > 0 ? (
            approvals.map((approval) => (
              <TimeOffItem
                key={approval.pto_request.id}
                label={
                  formatDate(approval.pto_request.start_date) +
                  " - " +
                  formatDate(approval.pto_request.end_date)
                }
                note={
                  "Requested: " + formatDate(approval.pto_request.requested_at)
                }
                status={approval.pto_request.approval_status}
              />
            ))
          ) : (
            <IonItem>
              <IonLabel>No Approvals!</IonLabel>
            </IonItem>
          )}
        </IonList>
        <LeaveApprovalListModal
          showModal={showModal}
          approvals={approvals}
          onCloseModal={() => setShowModal(false)}
          onReloadApprovals={handleGetApprovals}
        />
      </IonContent>
    </IonPage>
  );
};

export default HumanResourcesManager;
