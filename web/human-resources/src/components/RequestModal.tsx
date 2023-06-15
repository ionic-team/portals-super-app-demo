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

interface RequestModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onCreatePTORequest: (
    startDate: string,
    endDate: string,
    type: string
  ) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({
  showModal,
  onCloseModal,
  onCreatePTORequest,
}) => {
  const [startDate, setStartDate] = useState(new Date().toDateString());
  const [endDate, setEndDate] = useState(new Date().toDateString());
  const [type, setType] = useState("");

  const handleStartDateChange = (value: any) => {
    const date = new Date(value).toDateString();
    setStartDate(date);
  };

  const handleEndDateChange = (value: any) => {
    const date = new Date(value).toDateString();
    setEndDate(date);
  };

  const handleCloseModal = () => {
    onCloseModal();
    setStartDate(new Date().toDateString());
    setEndDate(new Date().toDateString());
    setType("");
  };

  const handleSubmitRequest = () => {
    onCreatePTORequest(startDate, endDate, type);
    handleCloseModal();
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={handleCloseModal}
      showBackdrop={true}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={handleCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Request Time Off</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={handleSubmitRequest}
              disabled={
                !(
                  new Date(startDate).getDate() <=
                    new Date(endDate).getDate() && !!type
                )
              }
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
              placeholder="Select"
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

export default RequestModal;
