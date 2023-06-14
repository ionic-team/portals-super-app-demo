import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import UserCard from "./UserCard";
import LeaveApprovalDetailModal from "./LeaveApprovalDetailModal";
import { Employee, PTOApproval } from "../../../supabaseApi/types";
import { getEmployee } from "../../../supabaseApi/supabaseApi";

interface LeaveRequestListModalProps {
  showModal: boolean;
  approvals: PTOApproval[];
  onCloseModal: () => void;
  onReloadApprovals: () => void;
}

const LeaveApprovalListModal: React.FC<LeaveRequestListModalProps> = ({
  showModal,
  approvals,
  onCloseModal,
  onReloadApprovals,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<PTOApproval>();

  const handleCloseDetailModal = () => {
    onReloadApprovals();
    setShowDetailModal(false);
  };

  const handleShowDetails = (approval: PTOApproval) => {
    setSelectedApproval(approval);
    setShowDetailModal(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toDateString().replace(/(.{3})/, "$1,");
  };

  const getDateDifference = function (startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const lengthInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
    const text = lengthInDays > 1 ? " days" : " day";
    return lengthInDays + text;
  };

  const handleGetEmployee = async (id: string) => {
    const employee: Employee = await getEmployee(id);
    return employee;
  };

  return (
    <>
      <IonModal
        isOpen={showModal}
        onDidDismiss={onCloseModal}
        showBackdrop={true}
      >
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={onCloseModal}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>{`Time Off Requests (${approvals.length})`}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList inset={true}>
            {approvals.map((approval) => (
              <UserCard
                key={approval.pto_request.id}
                firstName={approval.employee.first_name}
                lastName={approval.employee.last_name}
                primaryDetail={formatDate(approval.pto_request.requested_at)}
                secondaryDetail={
                  getDateDifference(
                    approval.pto_request.start_date,
                    approval.pto_request.end_date
                  ) +
                  " | " +
                  approval.pto_request.type
                }
                isButton={true}
                onClick={() => handleShowDetails(approval)}
              />
            ))}
          </IonList>
        </IonContent>
      </IonModal>
      {selectedApproval && (
        <LeaveApprovalDetailModal
          showModal={showDetailModal}
          approval={selectedApproval}
          duration={getDateDifference(
            selectedApproval.pto_request.start_date,
            selectedApproval.pto_request.end_date
          )}
          onCloseModal={handleCloseDetailModal}
        />
      )}
    </>
  );
};

export default LeaveApprovalListModal;
