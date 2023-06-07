import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import AddCustomerModal from "./AddCustomerModal";
import {
  loadCustomers,
  createCustomer,
} from "../../../supabaseApi/supabaseApi";
import { Customer, SessionObj } from "../../../supabaseApi/types";

interface TimeTrackingSalespersonProps {
  session: SessionObj;
}

const CustomerRelationshipManagement: React.FC<
  TimeTrackingSalespersonProps
> = ({ session }) => {
  const [customers, setCustomers] = useState<Customer[] | null>();

  const useLoadCustomers = async () => {
    const result = await loadCustomers(session.user.id);
    const customers: Customer[] | null = result ? (result as Customer[]) : null;
    setCustomers(customers);
  };

  const useCreateCustomer = (name: string) => {
    const customer: Customer = {
      created_at: new Date().toString(),
      salesperson: session.user.id,
      name: name,
    };
    createCustomer(customer);
  };

  useEffect(() => {
    useLoadCustomers();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddCustomer = (name: string) => {
    useCreateCustomer(name);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>CRM</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CRM</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          id="open-modal"
          expand="block"
          style={{ margin: "23px 16px 23px 16px" }}
          onClick={handleOpenModal}
        >
          Add Customer
        </IonButton>
        <IonListHeader>Existing Customers</IonListHeader>
        <IonList inset={true}>
          {customers?.map((c) => (
            <IonItem detail={false} lines="full" key={c.id}>
              <IonLabel>{c.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <AddCustomerModal
          showModal={showModal}
          onCloseModal={handleCloseModal}
          onAddCustomer={handleAddCustomer}
        />
      </IonContent>
    </IonPage>
  );
};

export default CustomerRelationshipManagement;
