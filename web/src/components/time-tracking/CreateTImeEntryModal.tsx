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
import companies from "../../companies.json";
import { useEffect, useState } from "react";

interface CreateTimeEntryModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onCreateEntry: () => void;
}

const CreateTimeEntryModal: React.FC<CreateTimeEntryModalProps> = ({
  showModal,
  onCloseModal,
  onCreateEntry,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validDatetimes, setValidDatetimes] = useState(true);

  const handleStartDatetimeChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    const time = event.detail.value.split("T")[1];
    setStartDate(date);
    setStartTime(time);
  };

  const handleEndDatetimeChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    const time = event.detail.value.split("T")[1];
    setEndDate(date);
    setEndTime(time);
  };

  const updateValidDatetimes = () => {
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    setValidDatetimes(startDate <= endDate && startTime < endTime);
  };

  useEffect(() => {
    updateValidDatetimes();
  }, [startDate, endDate, startTime, endTime]);

  return (
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
          <IonTitle>New Entry</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={onCreateEntry}
              disabled={!validDatetimes}
            >
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Start Time</IonLabel>
            <IonDatetimeButton datetime="start" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime id="start" onIonChange={handleStartDatetimeChange} />
            </IonPopover>
          </IonItem>
          <IonItem>
            <IonLabel>End Time</IonLabel>
            <IonDatetimeButton datetime="end" />
            <IonPopover keepContentsMounted={true}>
              <IonDatetime id="end" onIonChange={handleEndDatetimeChange} />
            </IonPopover>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem>
            <IonLabel>Customer</IonLabel>
            <IonSelect placeholder="Select" interface="popover">
              {companies.map((company) => (
                <IonSelectOption>{company.name}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonButton
          id="open-modal"
          expand="block"
          style={{ margin: "16px" }}
          onClick={onCreateEntry}
          disabled={!validDatetimes}
        >
          Create Time Entry
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default CreateTimeEntryModal;
