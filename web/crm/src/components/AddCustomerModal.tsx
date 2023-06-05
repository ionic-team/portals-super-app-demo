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
  IonInput,
} from "@ionic/react";
import { useState } from "react";

interface AddCustomerModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onAddCustomer: () => void;
  presentingElement: HTMLElement;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  showModal,
  onCloseModal,
  onAddCustomer,
  presentingElement,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleAddCustomer = () => {
    onAddCustomer();
    onCloseModal();
    setInputValue("");
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={onCloseModal}
      presentingElement={presentingElement}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add Customer</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={handleAddCustomer}
              strong={true}
              disabled={!inputValue}
            >
              Add
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonInput
              label="Customer Name"
              placeholder="Enter"
              value={inputValue}
              onInput={(e) =>
                handleInputChange((e.target as HTMLInputElement).value)
              }
              style={{ textAlign: "end" }}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default AddCustomerModal;
