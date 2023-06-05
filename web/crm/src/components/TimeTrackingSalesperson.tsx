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
import { SessionObj } from "../definitions";
import AddCustomerModal from "./AddCustomerModal";
import { getCustomers } from "../../../supabaseApi/supabaseApi";

interface TimeTrackingSalespersonProps {
  session: SessionObj;
}

interface Customer {
  id: number;
  createdAt: Date;
  salesperson: string;
  name: string;
}

const TimeTrackingSalesperson: React.FC<TimeTrackingSalespersonProps> = ({
  session,
}) => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const result = await getCustomers(session.user.id);
    const customers: Customer[] = castToCustomers(result);
    console.log(customers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function castToCustomers(result: { [x: string]: any }[] | null): Customer[] {
    if (result === null) {
      // Handle null case here
      return [];
    }

    const customers: Customer[] = result.map((item) => {
      const customer: Customer = {
        id: item.id as number,
        createdAt: new Date(item.createdAt as string),
        salesperson: item.salesperson as string,
        name: item.name as string,
      };
      return customer;
    });

    return customers;
  }

  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddCustomer = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Dashboard"} />
          </IonButtons>
          <IonTitle>Time Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
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
          <IonItem detail={false} lines="full">
            <IonLabel>Innitech</IonLabel>
          </IonItem>
          <IonItem detail={false} lines="full">
            <IonLabel>StreamShop</IonLabel>
          </IonItem>
          <IonItem detail={false} lines="full">
            <IonLabel>ThePlace</IonLabel>
          </IonItem>
        </IonList>
        <AddCustomerModal
          showModal={showModal}
          onCloseModal={handleCloseModal}
          onAddCustomer={handleAddCustomer}
          presentingElement={presentingElement!}
        />
      </IonContent>
    </IonPage>
  );
};

export default TimeTrackingSalesperson;
