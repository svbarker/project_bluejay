import React from "react";
import { List, ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";

const iconStyles = { marginLeft: "0", color: "#507c0c" };

const icon = n => {
  return (
    <i
      style={{
        ...iconStyles,
        color: n.event.kind === "task" ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.event.kind === "task"
        ? "fa fa-tasks"
        : "fa fa-gift"} fa-2x`}
    />
  );
};

const Notifications = ({ notifications, takeToEvent }) => {
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
            onClick={takeToEvent(n.event.kind, n.event.id)}
            leftIcon={icon(n)}
            style={{ marginLeft: "150px", marginRight: "150px" }}
          />
        );
      })}
    </List>
  );
};

export default Notifications;
