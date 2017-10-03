import React from "react";
import { List, ListItem } from "material-ui/List";
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

const clearButton = (n, handler) => {
  return <button onClick={handler(n.id)}>Clear</button>;
};

const Notifications = ({ notifications, takeToEvent, clearNotification }) => {
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
            onClick={takeToEvent(n.kind, n.id)}
            leftIcon={icon(n)}
            style={{ marginLeft: "150px", marginRight: "150px" }}
            rightIcon={clearButton(n, clearNotification)}
          />
        );
      })}
    </List>
  );
};

export default Notifications;
