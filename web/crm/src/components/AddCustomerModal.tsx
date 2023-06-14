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
  onCreateCustomer: (customerName: string) => void;
  onCloseModal: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  showModal,
  onCreateCustomer,
  onCloseModal,
}) => {
  const [customerName, setCustomerName] = useState("");

  const handleAddCustomer = () => {
    onCreateCustomer(customerName);
    setCustomerName("");
    onCloseModal();
  };

  return (
    <IonModal isOpen={showModal} onDidDismiss={onCloseModal}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={onCloseModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add Customer</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                handleAddCustomer();
              }}
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
              onInput={(e) =>
                setCustomerName((e.target as HTMLInputElement).value)
              }
              style={{ textAlign: "end" }}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default AddCustomerModal;
