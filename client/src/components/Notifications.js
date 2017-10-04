import React from "react";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const icon = n => {
  return (
    <i
      style={{
        ...iconStyles,
        color: n.kind === "task" ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.kind === "task" ? "fa fa-tasks" : "fa fa-gift"} fa-2x`}
    />
  );
};

const acceptButton = (notification, userId, handler) => {
  return (
    <RaisedButton
      backgroundColor={
        notification.kind === "task" ? (
          "rgba( 26,132,132,.3)"
        ) : (
          "rgba(150,205, 40,.3)"
        )
      }
      fullWidth={true}
      label={`Confirm`}
      onClick={handler(userId, notification.id)}
    />
  );
};

const rejectButton = (notification, userId, handler) => {
  return (
    <RaisedButton
      backgroundColor={"rgba(220, 43, 43,.3)"}
      fullWidth={true}
      label={`Reject`}
      onClick={handler(userId, notification.id)}
    />
  );
};

const takeToItemButton = (kind, id, handler) => {
  return (
    <RaisedButton fullWidth={true} label={`View`} onClick={handler(kind, id)} />
  );
};

const Notifications = ({
  notifications,
  takeToItem,
  user,
  acceptEvent,
  rejectEvent
}) => {
  return (
    <List>
      {notifications.map(n => {
        return (
          <ListItem
            key={n.message}
            primaryText={n.message}
            secondaryText={n.message}
            hoverColor={
              n.kind === "task" ? (
                "rgba( 26,132,132,.2)"
              ) : (
                "rgba(150,205, 40,.2)"
              )
            }
            onClick={takeToItem(n.kind, n.id)}
            secondaryTextLines={2}
            leftIcon={icon(n)}
            style={{
              margin: "30px 150px",
              paddingBottom: "20px"
            }}
            rightIcon={
              <div style={{ marginRight: "50px", width: "200px" }}>
                {acceptButton(n, user.id, acceptEvent)}
                {rejectButton(n, user.id, rejectEvent)}
              </div>
            }
          />
        );
      })}
    </List>
  );
};

export default Notifications;
