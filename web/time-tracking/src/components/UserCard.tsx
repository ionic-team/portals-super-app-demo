import { IonAvatar, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { add, arrowForward } from "ionicons/icons";

interface UserCardProps {
  firstName: string;
  lastName: string;
  primaryDetail: string;
  secondaryDetail?: string;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  primaryDetail,
  secondaryDetail,
  onClick,
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  const initials = getInitials(firstName, lastName);

  const generateColor = () => {
    const colors = [
      "#85C1E9", // Sky Blue
      "#F9E79F", // Light Yellow
      "#AED6F1", // Light Blue
      "#F8C471", // Light Orange
      "#D2B4DE", // Light Purple
      "#F5B7B1", // Light Pink
      "#82E0AA", // Mint Green
      "#D7DBDD", // Light Gray
    ];

    const sum = initials
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((a, b) => a + b, 0);

    const index = sum % colors.length;
    return colors[index];
  };

  return (
    <IonItem button onClick={onClick}>
      <IonAvatar
        slot="start"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "background-color": generateColor(),
        }}
      >
        {initials}
      </IonAvatar>
      <IonLabel>
        <IonLabel style={{ "fontSize": "17px", "fontWeight": "600" }}>
          {firstName + " " + lastName}
        </IonLabel>
        <IonLabel style={{ "fontSize": "15px", "fontWeight": "400" }}>
          {primaryDetail}
        </IonLabel>
        <IonLabel
          style={{
            "fontSize": "13px",
            "fontWeight": "400",
            color: "#808080",
          }}
        >
          {secondaryDetail}
        </IonLabel>
      </IonLabel>
    </IonItem>
  );
};

export default UserCard;
