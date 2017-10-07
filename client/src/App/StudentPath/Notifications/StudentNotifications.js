import React from "react";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const getListItemStyle = n => ({
  margin: "50px 150px",
  paddingBottom: "20px",
  border: `20px solid ${n.kind === "TaskEvent"
    ? "rgba( 26,132,132,.2)"
    : "rgba(150,205, 40,.2)"}`
});

const getIcon = n => {
  return (
    <i
      style={{
        ...iconStyles,
        color: n.kind === "TaskEvent" ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.kind === "TaskEvent"
        ? "fa fa-tasks"
        : "fa fa-gift"} fa-2x`}
    />
  );
};

const getMainText = n =>
  `${n.owner.profile.fname} ${n.owner.profile.lname} ${n.kind === "TaskEvent"
    ? `confirmed this task:`
    : `confirmed this reward:`} ${n.kind === "TaskEvent"
    ? n.task.title
    : n.reward.title}`;

const getSecondaryText = n => `${n.owner.profile.fname} says: ${n._message}`;

const getHoverColor = n =>
  n.kind === "TaskEvent" ? "rgba( 26,132,132,.2)" : "rgba(150,205, 40,.2)";

const Notifications = ({ notifications, takeToItem, user }) => {
  return (
    <List>
      {notifications.map(n => {
        const ListItemProps = {
          key: n._id,
          primaryText: getMainText(n),
          secondaryText: getSecondaryText(n),
          hoverColor: getHoverColor(n),
          onClick: takeToItem(n.kind, n._id),
          secondaryTextLines: 2,
          leftIcon: getIcon(n),
          style: getListItemStyle(n)
        };

        return <ListItem {...ListItemProps} />;
      })}
    </List>
  );
};

export default Notifications;
