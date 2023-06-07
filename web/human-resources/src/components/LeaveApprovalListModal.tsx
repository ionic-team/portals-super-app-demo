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
import { useState } from "react";
import UserCard from "./UserCard";
import LeaveApprovalDetailModal from "./LeaveApprovalDetailModal";
import { UserRequest } from "../../../supabaseApi/types";

interface LeaveRequestListModalProps {
  showModal: boolean;
  userRequests: UserRequest[];
  reloadUserRequests: () => void;
  onCloseModal: () => void;
}

const LeaveApprovalListModal: React.FC<LeaveRequestListModalProps> = ({
  showModal,
  userRequests,
  reloadUserRequests,
  onCloseModal,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUserRequest, setSelectedUserRequest] = useState<UserRequest>();

  const handleCloseDetailModal = () => {
    reloadUserRequests();
    setShowDetailModal(false);
  };

  const handleShowDetails = (ur: UserRequest) => {
    setSelectedUserRequest(ur);
    setShowDetailModal(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toDateString().replace(/(.{3})/, "$1,");
  };

  const getDateDifference = function (startDate: string, endDate: string) {
    const dt1 = new Date(startDate);
    const dt2 = new Date(endDate);
    const difference = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    const text = difference > 1 ? " days" : " day";
    return difference + text;
  };

  return (
    <>
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
            <IonTitle>{`Time Off Requests (${
              userRequests.filter((ur) => ur.request.approval_status === 2)
                .length
            })`}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList inset={true}>
            {userRequests.map((ur) => {
              return (
                ur.request.approval_status === 2 && (
                  <UserCard
                    key={ur.request.id}
                    firstName={ur.user.first_name}
                    lastName={ur.user.last_name}
                    primaryDetail={formatDate(ur.request.requested_at)}
                    secondaryDetail={
                      getDateDifference(
                        ur.request.start_date,
                        ur.request.end_date
                      ) +
                      " | " +
                      ur.request.type
                    }
                    isButton={true}
                    onClick={() => handleShowDetails(ur)}
                  />
                )
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>
      {selectedUserRequest && (
        <LeaveApprovalDetailModal
          showModal={showDetailModal}
          requestId={selectedUserRequest.request.id!}
          firstName={selectedUserRequest.user.first_name}
          lastName={selectedUserRequest.user.last_name}
          userType={selectedUserRequest.user.user_type}
          startDate={selectedUserRequest.request.start_date}
          endDate={selectedUserRequest.request.end_date}
          duration={getDateDifference(
            selectedUserRequest.request.start_date,
            selectedUserRequest.request.end_date
          )}
          type={selectedUserRequest.request.type}
          onCloseModal={handleCloseDetailModal}
        />
      )}
    </>
  );
};

export default LeaveApprovalListModal;
