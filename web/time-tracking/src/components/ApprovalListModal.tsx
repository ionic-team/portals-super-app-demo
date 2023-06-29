import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
} from "@ionic/react";
import UserCard from "./UserCard";
import { TimesheetApproval } from "../../../supabaseApi/types";
import { useState } from "react";
import ApprovalDetailModal from "./ApprovalDetailModal";

interface ApprovalListModalProps {
  showModal: boolean;
  approvals: TimesheetApproval[];
  onCloseModal: () => void;
  onReloadApprovals: () => void;
}

const ApprovalListModal: React.FC<ApprovalListModalProps> = ({
  showModal,
  approvals,
  onCloseModal,
  onReloadApprovals,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<TimesheetApproval>();

  const handleCloseDetailModal = () => {
    onReloadApprovals();
    setShowDetailModal(false);
  };

  const handleShowDetails = (approval: TimesheetApproval) => {
    setSelectedApproval(approval);
    setShowDetailModal(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toDateString().replace(/(.{3})/, "$1,");
  };

  const getDuration = (startTime: string, endTime: string) => {
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

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={onCloseModal}
      showBackdrop={true}
    >
      <IonHeader className="ion-no-border ios-no-background">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{`Time Tracking Requests (${approvals.length})`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          {approvals.map((approval) => (
            <UserCard
              key={approval.time_entry.id}
              firstName={approval.employee.first_name}
              lastName={approval.employee.last_name}
              primaryDetail={formatDate(approval.time_entry.date)}
              secondaryDetail={
                getDuration(
                  approval.time_entry.start_time,
                  approval.time_entry.end_time
                ) +
                " | " +
                approval.customer.name
              }
              isButton={true}
              onClick={() => handleShowDetails(approval)}
            />
          ))}
        </IonList>
        {selectedApproval && (
          <ApprovalDetailModal
            showModal={showDetailModal}
            approval={selectedApproval}
            duration={getDuration(
              selectedApproval.time_entry.start_time,
              selectedApproval.time_entry.end_time
            )}
            onCloseModal={handleCloseDetailModal}
          />
        )}
      </IonContent>
    </IonModal>
  );
};

export default ApprovalListModal;
