import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { dismissPlugin } from "../../../data/superAppHandoff";

const SimpleComponent: React.FC = () => {
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
          <IonTitle>Time Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Tracking</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>This is just a simple app</p>
      </IonContent>
    </IonPage>
  );
};

export default SimpleComponent;
