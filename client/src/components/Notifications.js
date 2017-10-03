import React from "react";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

console.log(RaisedButton);

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

const clearButton = (notification, userId, handler) => {
  return (
    <RaisedButton label={`clear`} onClick={handler(userId, notification.id)} />
  );
};

const takeToItemButton = (kind, id, handler) => {
  return <RaisedButton label={`View`} onClick={handler(kind, id)} />;
};

const Notifications = ({
  notifications,
  takeToItem,
  user,
  clearNotification
}) => {
  return (
    <List>
      {notifications.map(n => {
        return (
          <ListItem
            key={n.message}
            primaryText={n.message}
            secondaryText={n.message}
            hoverColor={"lightgrey"}
            secondaryTextLines={2}
            leftIcon={icon(n)}
            style={{ marginLeft: "150px", marginRight: "150px" }}
            rightIcon={
              <div style={{ marginRight: "100px" }}>
                {takeToItemButton(n.kind, n.id, takeToItem)}
                {clearButton(n, user.id, clearNotification)}
              </div>
            }
          />
        );
      })}
    </List>
  );
};

export default Notifications;
