import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonButton,
  IonFooter,
  IonLoading,
  IonListHeader,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { add, chevronBack } from "ionicons/icons";
import CreateTimeEntryModal from "./CreateTImeEntryModal";
import { Customer, TimesheetRequest } from "../../../supabaseApi/types";
import {
  createTimesheetRequests,
  getCustomers,
  getTimesheetRequests,
} from "../../../supabaseApi/supabaseApi";
import TimesheetItem from "./TimeEntryItem";
import { Session } from "../../../supabaseApi/supabaseApi";
import { dismissPlugin } from "../super-app";

const TimeTrackingContractor: React.FC<{ session: Session }> = ({
  session,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState<TimesheetRequest[]>();
  const [customers, setCustomers] = useState<Customer[]>();

  const handleGetTimesheetRequests = async () => {
    const requests = await getTimesheetRequests(session.user.id);
    setRequests(requests);
  };

  const handleCreateTimesheetRequest = async (
    customerId: number,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    await createTimesheetRequests(
      customerId,
      session.user.id,
      date,
      startTime,
      endTime
    );
  };

  const handleGetCustomers = async () => {
    const customers: Customer[] = await getCustomers();
    setCustomers(customers);
  };

  const handleCloseModal = async () => {
    await handleGetTimesheetRequests();
    setShowModal(false);
  };

  useEffect(() => {
    handleGetTimesheetRequests();
    handleGetCustomers();
  }, []);

  if (!requests || !customers) {
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
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>Previous Time Entries</IonListHeader>
        <IonList inset={true}>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TimesheetItem
                key={request.time_entry.id}
                label={request.customer.name}
                startTime={request.time_entry.start_time}
                endTime={request.time_entry.end_time}
                date={request.time_entry.date}
                status={request.time_entry.approval_status}
              />
            ))
          ) : (
            <IonItem>
              <IonLabel>No Requests!</IonLabel>
            </IonItem>
          )}
        </IonList>
        <CreateTimeEntryModal
          showModal={showModal}
          customers={customers}
          onCloseModal={handleCloseModal}
          onCreateTimesheetRequest={handleCreateTimesheetRequest}
        />
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButton
            onClick={() => setShowModal(true)}
            expand="block"
            style={{ margin: "16px" }}
          >
            Create New Entry
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default TimeTrackingContractor;
