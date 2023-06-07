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
  IonInput,
} from "@ionic/react";
import { useState } from "react";

interface AddCustomerModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onAddCustomer: (name: string) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  showModal,
  onCloseModal,
  onAddCustomer,
}) => {
  const [customerName, setCustomerName] = useState("");

  const handleInputChange = (value: string) => {
    setCustomerName(value);
  };

  const handleAddCustomer = (name: string) => {
    onAddCustomer(name);
    onCloseModal();
    setCustomerName("");
  };

  return (
    <IonModal isOpen={showModal} onDidDismiss={onCloseModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add Customer</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => handleAddCustomer(customerName)}
              strong={true}
              disabled={!customerName}
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
              value={customerName}
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
