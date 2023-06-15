import { useEffect, useState } from "react";
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
  IonIcon,
  IonLoading,
} from "@ionic/react";
import AddCustomerModal from "./AddCustomerModal";
import {
  createCustomer,
  getCustomersByEmployee,
} from "../../../supabaseApi/supabaseApi";
import { Customer } from "../../../supabaseApi/types";
import { chevronBack } from "ionicons/icons";
import { Session } from "../../../supabaseApi/supabaseApi";
import { dismissPlugin } from "../super-app";

interface CustomerRelationshipManagementProps {
  session: Session;
}

const CustomerRelationshipManagement: React.FC<
  CustomerRelationshipManagementProps
> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>();

  const handleGetCustomers = async () => {
    const customers = await getCustomersByEmployee(
      "e7b98125-6d84-4b17-ad54-8e95e0b2a952"
    );
    setCustomers(customers);
  };

  const handleCreateCustomer = async (customerName: string) => {
    await createCustomer(customerName, "e7b98125-6d84-4b17-ad54-8e95e0b2a952");
    await handleGetCustomers();
  };

  useEffect(() => {
    handleGetCustomers();
  }, []);

  if (!customers) {
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
          expand="block"
          style={{ margin: 16 }}
          onClick={() => setShowModal(true)}
        >
          Add Customer
        </IonButton>
        <IonListHeader>Existing Customers</IonListHeader>
        <IonList inset={true}>
          {customers.length > 0 ? (
            customers.map((c) => (
              <IonItem detail={false} lines="full" key={c.id}>
                <IonLabel>{c.name}</IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No customers</IonLabel>
            </IonItem>
          )}
        </IonList>
        <AddCustomerModal
          showModal={showModal}
          onCreateCustomer={handleCreateCustomer}
          onCloseModal={() => setShowModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default CustomerRelationshipManagement;
