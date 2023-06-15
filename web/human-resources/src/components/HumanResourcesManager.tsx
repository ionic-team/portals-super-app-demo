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
import ApprovalListModal from "./ApprovalListModal";
import TimeOffItem from "./TimeOffItem";
import { getPendingPTOApprovals } from "../../../supabaseApi/supabaseApi";
import { PTOApproval } from "../../../supabaseApi/types";
import { chevronBack } from "ionicons/icons";
import { Session } from "../../../supabaseApi/supabaseApi";
import { dismissPlugin } from "../super-app";

interface HumanResourcesManagerProps {
  session: Session;
}

const HumanResourcesManager: React.FC<HumanResourcesManagerProps> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [approvals, setApprovals] = useState<PTOApproval[]>();

  const handleGetApprovals = async () => {
    const approvals = await getPendingPTOApprovals(session.user.id);
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
            <IonButton
              onClick={() => {
                dismissPlugin.dismiss();
              }}
            >
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
        <ApprovalListModal
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
