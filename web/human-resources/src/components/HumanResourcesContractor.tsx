import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonListHeader,
  IonIcon,
  IonLoading,
  IonItem,
  IonLabel,
} from "@ionic/react";
import RequestModal from "./RequestModal";
import TimeOffItem from "./TimeOffItem";
import {
  createPTORequest,
  getPTORequests,
} from "../../../supabaseApi/supabaseApi";
import { PTORequest } from "../../../supabaseApi/types";
import { chevronBack } from "ionicons/icons";
import { Session } from "../../../supabaseApi/supabaseApi";
import { dismissPlugin } from "../super-app";

const HumanResourcesContractor: React.FC<{ session: Session }> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState<PTORequest[]>();

  const handleGetPTORequests = async () => {
    const requests: PTORequest[] = await getPTORequests(session.user.id);
    setRequests(requests);
  };

  const handleCreatePTORequest = async (
    startDate: string,
    endDate: string,
    type: string
  ) => {
    await createPTORequest(session.user.id, startDate, endDate, type);
    await handleGetPTORequests();
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    const convertedDate = `${month}/${day}/${year}`;
    return convertedDate;
  };

  useEffect(() => {
    handleGetPTORequests();
  }, []);

  if (!requests) {
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
        >
          Request Time Off
        </IonButton>
        <IonListHeader>My Time Off Requests</IonListHeader>
        <IonList inset={true}>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TimeOffItem
                key={request.id}
                label={
                  formatDate(request.start_date) +
                  " - " +
                  formatDate(request.end_date)
                }
                note={"Requested: " + formatDate(request.requested_at)}
                status={request.approval_status}
              />
            ))
          ) : (
            <IonItem>
              <IonLabel>No Requests!</IonLabel>
            </IonItem>
          )}
        </IonList>
        <RequestModal
          showModal={showModal}
          onCloseModal={() => setShowModal(false)}
          onCreatePTORequest={handleCreatePTORequest}
        />
      </IonContent>
    </IonPage>
  );
};

export default HumanResourcesContractor;
