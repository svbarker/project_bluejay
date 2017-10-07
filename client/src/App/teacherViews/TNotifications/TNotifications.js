import React from "react";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const getListItemStyle = n => ({
  margin: "50px 150px",
  paddingBottom: "20px",
  border: `20px solid ${n.task
    ? "rgba( 26,132,132,.2)"
    : "rgba(150,205, 40,.2)"}`
});

const pendingListItemStyle = {
  margin: "30px 150px",
  paddingBottom: "20px"
};

const listItemButtonsStyle = { marginRight: "50px", width: "200px" };

const getIcon = n => {
  return (
    <i
      style={{
        ...iconStyles,
        color: n.task ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.task ? "fa fa-tasks" : "fa fa-gift"} fa-2x`}
    />
  );
};

const getButton = (notification, userId, handler, action) => {
  const taskId = notification.task
    ? notification.task._id
    : notification.reward._id;
  const getBackgroundColor = () => {
    if (action === "Accept") {
      return notification.task ? "rgba( 26,132,132,1)" : "rgba(150,205, 40,1)";
    } else {
      return "rgba(220, 43, 43,.8)";
    }
  };
  const kind = notification.task ? "task" : "reward";
  return (
    <RaisedButton
      backgroundColor={getBackgroundColor()}
      style={{ marginBottom: "10px" }}
      fullWidth={true}
      labelColor={"rgb(255,255,255)"}
      label={`${action}`}
      onClick={handler(
        userId,
        notification.owner.id,
        taskId,
        notification._id,
        kind
      )}
    />
  );
};

const getActionIcon = type => {
  return (
    <i
      style={{
        ...iconStyles,
        color: type === "confirmed" ? "#96CD28" : "rgba(220, 43, 43,.8)"
      }}
      className={`fa fa-${type === "confirmed"
        ? "check-square-o"
        : "times-rectangle-o"} fa-2x`}
    />
  );
};

const getPendingMainText = (pendingType, n, undo, timeLeft) => (
  <span>
    {`You ${pendingType} this ${n.task ? "task." : "reward."} `}
    <span
      onClick={undo(n._id)}
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Undo?
    </span>
    {`  (${timeLeft} seconds)`}
  </span>
);

const getMainText = n =>
  `${n.owner.profile.fname} ${n.owner.profile.lname} ${n.task
    ? `completed this task:`
    : `redeemed this reward:`} ${n.task ? n.task.title : n.reward.title}`;

const getSecondaryText = n => `${n.owner.profile.fname} says: ${n._message}`;

const getHoverColor = n =>
  n.task ? "rgba( 26,132,132,.2)" : "rgba(150,205, 40,.2)";

const Notifications = ({
  notifications,
  takeToItem,
  user,
  acceptEvent,
  rejectEvent,
  pendings,
  undo
}) => {
  const pendingIds = pendings.map(p => p.id);

  return (
    <List>
      {notifications.map(n => {
        if (pendingIds.includes(n._id)) {
          let pendingType = pendings.filter(p => p.id === n._id)[0]["type"];
          let timeLeft = pendings.filter(p => p.id === n._id)[0]["timeLeft"];

          const pendingListItemProps = {
            key: n._id,
            primaryText: getPendingMainText(pendingType, n, undo, timeLeft),
            secondaryText: `Leaving the page will make this permanent.`,
            hoverColor: "lightgrey",
            secondaryTextLines: 2,
            leftIcon: getActionIcon(pendingType),
            style: pendingListItemStyle
          };

          return <ListItem {...pendingListItemProps} />;
        }

        const ListItemProps = {
          key: n._id,
          primaryText: getMainText(n),
          secondaryText: getSecondaryText(n),
          hoverColor: getHoverColor(n),
          onClick: takeToItem(n.task, n._id),
          secondaryTextLines: 2,
          leftIcon: getIcon(n),
          style: getListItemStyle(n),
          rightIcon: (
            <div style={listItemButtonsStyle}>
              {getButton(n, user.id, acceptEvent, "Accept")}
              {getButton(n, user.id, rejectEvent, "Reject")}
            </div>
          )
        };

        return <ListItem {...ListItemProps} />;
      })}
    </List>
  );
};

export default Notifications;
