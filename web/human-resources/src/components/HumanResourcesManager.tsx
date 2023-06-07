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
} from "@ionic/react";
import LeaveApprovalListModal from "./LeaveApprovalListModal";
import TimeOffItem from "./TimeOffItem";
import {
  loadAssignedPTORequests,
  loadUser,
  processPTORequest,
} from "../../../supabaseApi/supabaseApi";
import {
  PTORequest,
  SessionObj,
  UserRequest,
} from "../../../supabaseApi/types";

interface HumanResourcesManagerProps {
  session: SessionObj;
}

const HumanResourcesManager: React.FC<HumanResourcesManagerProps> = ({
  session,
}) => {
  const [userRequests, setUserRequests] = useState<UserRequest[]>();

  const loadUserRequests = async () => {
    const updatedUserRequests = [];
    const requests: PTORequest[] = (await loadAssignedPTORequests(
      session.user.id
    )) as PTORequest[];
    for (const request of requests) {
      const user = await loadUser(request.requester);
      updatedUserRequests.push({ user, request });
    }
    setUserRequests(updatedUserRequests);
  };

  useEffect(() => {
    loadUserRequests();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  if (!userRequests) {
    return <IonLoading />;
  }

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
          style={{ margin: "23px 16px 23px 16px" }}
          onClick={() => setShowModal(true)}
        >
          {`Time Off Requests (${
            userRequests.filter((ur) => ur.request.approval_status === 2).length
          })`}
        </IonButton>
        <IonListHeader>Previous Time Off Requests</IonListHeader>
        <IonList inset={true}>
          {userRequests?.map((ur) => (
            <TimeOffItem
              key={ur.request.id}
              label={
                formatDate(ur.request.start_date) +
                " - " +
                formatDate(ur.request.end_date)
              }
              note={"Requested: " + formatDate(ur.request.requested_at)}
              status={ur.request.approval_status}
            />
          ))}
        </IonList>
        <LeaveApprovalListModal
          showModal={showModal}
          userRequests={userRequests}
          reloadUserRequests={loadUserRequests}
          onCloseModal={() => setShowModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

// interface HumanResourcesManagerLoaderProps {
//   session: SessionObj;
// }

// const HumanResourcesManagerLoader: React.FC<
//   HumanResourcesManagerLoaderProps
// > = ({ session }) => {
//   const [userRequests, setUserRequests] = useState<UserRequest[]>();
//   const loadUserRequests = async () => {
//     const updatedUserRequests = [];
//     const requests = await loadAssignedPTORequests(session.user.id);
//     for (const request of requests) {
//       const user = await loadUser(request.requester);
//       updatedUserRequests.push({ request, user });
//     }
//     setUserRequests(updatedUserRequests);
//   };

//   const processRequest = async (requestId: number, approve: boolean) => {
//     await processPTORequest(requestId, approve);
//   };

//   useEffect(() => {
//     loadUserRequests();
//   }, []);

//   if (!userRequests) {
//     return <IonLoading />;
//   }

//   return (
//     <HumanResourcesManager session={session} userRequests={userRequests} />
//   );
// };

export default HumanResourcesManager;
