import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonDatetimeButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonPopover,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Customer } from "../../../supabaseApi/types";

interface CreateTimeEntryModalProps {
  showModal: boolean;
  customers: Customer[];
  onCloseModal: () => void;
  onCreateTimesheetRequest: (
    customerId: number,
    date: string,
    startDate: string,
    endDate: string
  ) => void;
}

const CreateTimeEntryModal: React.FC<CreateTimeEntryModalProps> = ({
  showModal,
  customers,
  onCloseModal,
  onCreateTimesheetRequest,
}) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date().toTimeString());
  const [endTime, setEndTime] = useState(new Date().toTimeString());
  const [customerId, setCustomerId] = useState<number>();

  const handleCreateTimesheetRequest = () => {
    onCreateTimesheetRequest(
      customerId!,
      date.toDateString(),
      startTime.split(" ")[0],
      endTime.split(" ")[0]
    );
    handleCloseModal();
  };

  const handleDateChange = (value: any) => {
    setDate(new Date(value));
  };

  const handleStartTimeChange = (value: any) => {
    const datetime = new Date(value).toTimeString();
    console.log(datetime);
    setStartTime(datetime);
  };

  const handleEndTimeChange = (value: any) => {
    const datetime = new Date(value).toTimeString();
    setEndTime(datetime);
  };

  const handleCustomerChange = (value: any) => {
    const customer = customers.find((c) => (c.name = value));
    setCustomerId(customer!.id);
  };

  const handleCloseModal = () => {
    onCloseModal();
    setDate(new Date());
    setStartTime(new Date().toTimeString());
    setEndTime(new Date().toTimeString());
    setCustomerId(undefined);
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
            <IonButton onClick={handleCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>New Entry</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              disabled={!(startTime < endTime && !!customerId)}
            >
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetimeButton datetime="date" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime
                id="date"
                presentation="date"
                onIonChange={(e) => handleDateChange(e.detail.value)}
              />
            </IonPopover>
          </IonItem>
          <IonItem>
            <IonLabel>Start Time</IonLabel>
            <IonDatetimeButton datetime="start" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime
                id="start"
                presentation="time"
                onIonChange={(e) => handleStartTimeChange(e.detail.value)}
              />
            </IonPopover>
          </IonItem>
          <IonItem>
            <IonLabel>End Time</IonLabel>
            <IonDatetimeButton datetime="end" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime
                id="end"
                presentation="time"
                onIonChange={(e) => handleEndTimeChange(e.detail.value)}
              />
            </IonPopover>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Customer</IonLabel>
            <IonSelect
              placeholder="Select"
              interface="popover"
              onIonChange={(e) => handleCustomerChange(e.detail.value)}
            >
              custom
              {customers.map((customer) => (
                <IonSelectOption key={customer.id}>
                  {customer.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonButton
          id="open-modal"
          expand="block"
          style={{ margin: "16px" }}
          disabled={!(startTime < endTime && !!customerId)}
          onClick={handleCreateTimesheetRequest}
        >
          Create Time Entry
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default CreateTimeEntryModal;
