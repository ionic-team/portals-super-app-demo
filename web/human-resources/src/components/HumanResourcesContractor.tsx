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
  IonList,
  IonListHeader,
} from "@ionic/react";
import LeaveRequestModal from "./LeaveRequestModal";
import TimeOffItem from "./TimeOffItem";
import {
  createPTORequest,
  loadUserPTORequests,
} from "../../../supabaseApi/supabaseApi";
import { SessionObj, PTORequest } from "../../../supabaseApi/types";

const HumanResourcesContractor: React.FC<{ session: SessionObj }> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState<PTORequest[] | null>();

  const useLoadContractorPTO = async () => {
    const requests = (await loadUserPTORequests(session.user.id)) as PTORequest[];
    setRequests(requests);
  };

  const useCreatePTORequest = async (
    startDate: string,
    endDate: string,
    type: string
  ) => {
    const request: PTORequest = {
      requested_at: new Date().toDateString(),
      requester: session.user.id,
      approver: session.user.manager,
      start_date: startDate,
      end_date: endDate,
      type: type,
      approval_status: 2,
    };
    console.log(request);
    await createPTORequest(request);
    await useLoadContractorPTO();
  };

  useEffect(() => {
    useLoadContractorPTO();
  }, []);

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    const convertedDate = `${month}/${day}/${year}`;
    return convertedDate;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Dashboard" />
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
          style={{ margin: "23px 16px 8px 16px" }}
          onClick={() => setShowModal(true)}
        >
          Request Time Off
        </IonButton>
        <IonListHeader>My Time Off Requests</IonListHeader>
        <IonList inset={true}>
          {requests?.map((request) => (
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
          ))}
        </IonList>
        <LeaveRequestModal
          showModal={showModal}
          onCloseModal={() => setShowModal(false)}
          onSubmitRequest={useCreatePTORequest}
        />
      </IonContent>
    </IonPage>
  );
};

export default HumanResourcesContractor;
