import { DatetimeChangeEventDetail, IonDatetimeCustomEvent } from "@ionic/core";
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
import { useEffect, useRef, useState } from "react";

interface LeaveRequestModalProps {
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSubmitRequest: () => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  showModal,
  handleOpenModal,
  handleCloseModal,
  handleSubmitRequest,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validDates, setValidDates] = useState(true);

  const handleStartDateChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    setStartDate(date);
  };

  const handleEndDateChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    setEndDate(date);
  };

  const updateValidDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    setValidDates(start <= end);
  };

  useEffect(() => {
    updateValidDates();
  }, [startDate, endDate]);

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={handleCloseModal}
      showBackdrop={true}
    >
      <IonHeader className="ion-no-border ios-no-background">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Request Time Off</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={handleSubmitRequest}
              disabled={!validDates}
            >
              Submit
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Type</IonLabel>
            <IonSelect interface="popover" placeholder="Vacation">
              <IonSelectOption>Vacation</IonSelectOption>
              <IonSelectOption>Sick</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Starts</IonLabel>
            <IonDatetimeButton datetime="start" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime
                id="start"
                presentation="date"
                onIonChange={handleStartDateChange}
              />
            </IonPopover>
          </IonItem>
          <IonItem>
            <IonLabel>Ends</IonLabel>
            <IonDatetimeButton datetime="end" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime
                id="end"
                presentation="date"
                onIonChange={handleEndDateChange}
              />
            </IonPopover>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default LeaveRequestModal;
