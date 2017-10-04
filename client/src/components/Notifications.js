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
        color: n.kind === "TaskEvent" ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.kind === "TaskEvent"
        ? "fa fa-tasks"
        : "fa fa-gift"} fa-2x`}
    />
  );
};

const acceptButton = (notification, userId, handler) => {
  const taskId =
    notification.kind === "TaskEvent"
      ? notification.task._id
      : notification.reward._id;
  return (
    <RaisedButton
      backgroundColor={
        notification.kind === "TaskEvent" ? (
          "rgba( 26,132,132,1)"
        ) : (
          "rgba(150,205, 40,1)"
        )
      }
      style={{ marginBottom: "10px" }}
      fullWidth={true}
      labelColor={"rgb(255,255,255)"}
      label={`Confirm`}
      onClick={handler(
        userId,
        notification.owner._id,
        taskId,
        notification._id
      )}
    />
  );
};

const rejectButton = (notification, userId, handler) => {
  const taskId =
    notification.kind === "TaskEvent"
      ? notification.task._id
      : notification.reward._id;
  return (
    <RaisedButton
      backgroundColor={"rgba(220, 43, 43,.8)"}
      style={{ marginBottom: "10px" }}
      fullWidth={true}
      labelColor={"rgb(255,255,255)"}
      label={`Reject`}
      onClick={handler(
        userId,
        notification.owner._id,
        taskId,
        notification._id
      )}
    />
  );
};

const takeToItemButton = (kind, id, handler) => {
  return (
    <RaisedButton fullWidth={true} label={`View`} onClick={handler(kind, id)} />
  );
};

const actionIcon = type => {
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
          return (
            <ListItem
              key={n._id}
              primaryText={
                <span>
                  {`You ${pendingType} this ${n.kind === "TaskEvent"
                    ? "task."
                    : "reward."} `}
                  <span
                    onClick={undo(n._id)}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Undo?
                  </span>
                  {`  (${timeLeft} seconds)`}
                </span>
              }
              secondaryText={`Leaving the page will make this permanent.`}
              hoverColor={"lightgrey"}
              secondaryTextLines={2}
              leftIcon={actionIcon(pendingType)}
              style={{
                margin: "30px 150px",
                paddingBottom: "20px"
              }}
            />
          );
        }
        return (
          <ListItem
            key={n._id}
            primaryText={`${n.owner.profile.fname} ${n.owner.profile
              .lname} ${n.kind === "TaskEvent"
              ? `completed this task:`
              : `redeemed this reward:`} ${n.kind === "TaskEvent"
              ? n.task.title
              : n.reward.title}`}
            secondaryText={`${n.owner.profile.fname} says: ${n._message}`}
            hoverColor={
              n.kind === "TaskEvent" ? (
                "rgba( 26,132,132,.2)"
              ) : (
                "rgba(150,205, 40,.2)"
              )
            }
            onClick={takeToItem(n.kind, n._id)}
            secondaryTextLines={2}
            leftIcon={icon(n)}
            style={{
              margin: "50px 150px",
              paddingBottom: "20px",
              border: `20px solid ${n.kind === "TaskEvent"
                ? "rgba( 26,132,132,.2)"
                : "rgba(150,205, 40,.2)"}`
            }}
            rightIcon={
              <div style={{ marginRight: "50px", width: "200px" }}>
                {acceptButton(n, user._id, acceptEvent)}
                {rejectButton(n, user._id, rejectEvent)}
              </div>
            }
          />
        );
      })}
    </List>
  );
};

export default Notifications;
