import React from "react";
import { List, ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";

const iconStyles = { marginLeft: "-100px" };

const taskIcon = "fa fa-tasks";
const rewardIcon = "fa fa-gift";

const Notifications = ({ notifications, takeToEvent }) => {
  return (
    <List>
      {notifications.map(n => {
        return (
          <ListItem
            key={n.message}
            primaryText={n.message}
            secondaryText={n.message}
            hoverColor={"red"}
            secondaryTextLines={2}
            onClick={takeToEvent(n.event.kind, n.event.id)}
            leftIcon={
              <i
                style={iconStyles}
                className={`${n.event.kind === "task"
                  ? taskIcon
                  : rewardIcon} fa-3x`}
              />
            }
            style={{ marginLeft: "100px" }}
          />
        );
      })}
    </List>
  );
};

export default Notifications;
