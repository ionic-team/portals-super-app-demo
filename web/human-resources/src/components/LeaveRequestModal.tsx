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
  IonText,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { PTORequest } from "../../../supabaseApi/types";

interface LeaveRequestModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onSubmitRequest: (startDate: string, endDate: string, type: string) => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  showModal,
  onCloseModal,
  onSubmitRequest,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState("Vacation");
  const [validDates, setValidDates] = useState(true);

  const handleStartDateChange = (value: any) => {
    setStartDate(new Date(value));
    updateValidDates();
  };

  const handleEndDateChange = (value: any) => {
    setEndDate(new Date(value));
    updateValidDates();
  };

  const updateValidDates = () => {
    setValidDates(startDate <= endDate);
  };

  const handleCloseModal = () => {
    onCloseModal();
    setStartDate(new Date());
    setEndDate(new Date());
    setValidDates(true);
  };

  const handleSubmitRequest = () => {
    onSubmitRequest(startDate.toDateString(), endDate.toDateString(), type);
    handleCloseModal();
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
            <IonSelect
              label="Type"
              interface="popover"
              placeholder="Vacation"
              defaultValue="Vacation"
              onIonChange={(e) => setType(e.detail.value)}
            >
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
                onIonChange={(e) => handleStartDateChange(e.detail.value)}
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
                onIonChange={(e) => handleEndDateChange(e.detail.value)}
              />
            </IonPopover>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default LeaveRequestModal;
