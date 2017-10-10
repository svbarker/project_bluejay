import React from "react";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const getListItemStyle = n => ({
  margin: "0px 150px 0 400px",
  paddingBottom: "20px",
  border: `10px solid ${n.task
    ? "rgba( 26,132,132,.9)"
    : "rgba(150,205, 40,.9)"}`,
  borderRadius: "50px"
});

const pendingListItemStyle = {
  margin: "0px 150px 0 400px",
  borderRadius: "50px",
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
    ? notification.task.id
    : notification.reward.id;
  const getBackgroundColor = () => {
    if (action === "Accept") {
      return notification.task ? "rgba( 26,132,132,1)" : "rgba(150,205, 40,1)";
    } else {
      return "rgba(220, 43, 43,1)";
    }
  };
  const kind = notification.task ? "task" : "reward";
  return (
    <div style={{ marginRight: "800px", marginLeft: "-800px" }}>
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
    </div>
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
    : `redeemed this reward:`}
    ${n.task ? n.task.title : n.reward.title}`;

const getSecondaryText = n =>
  n.task
    ? `Description: ${n.task.description}`
    : `Description: ${n.reward.description}`;

const getHoverColor = n =>
  n.task ? "rgba( 26,132,132,.3)" : "rgba(150,205, 40,.3)";

const isPending = (n, pendingIds) => pendingIds.includes(n._id);

const getPendingData = (n, pendings) => {
  let pendingObj = pendings.filter(p => p.id === n._id)[0];
  return [pendingObj.type, pendingObj.timeLeft];
};

const topMargin = {
  marginTop: "30px"
};

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

const parseDate = date => {
  const dateArr = date.split("-");
  const dateHeader = months[dateArr[1]]
    .concat(` ${dateArr[2]},`)
    .concat(` ${dateArr[0]}`);
  return (
    <h3
      style={{
        margin: "50px 150px 20px 150px"
      }}
    >
      {dateHeader}
    </h3>
  );
};

const getDateHeader = (n, dates) => {
  let date = n.createdAt.split("T")[0];
  if (!dates.includes(date)) {
    dates.push(date);
    date = parseDate(date);
  } else {
    date = null;
  }
  return date;
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
  let dates = [];
  const pendingIds = pendings.map(p => p.id);

  return (
    <List>
      {notifications.map(n => {
        let date = getDateHeader(n, dates);

        if (isPending(n, pendingIds)) {
          const [pendingType, timeLeft] = getPendingData(n, pendings);

          const pendingListItemProps = {
            key: n._id,
            primaryText: getPendingMainText(pendingType, n, undo, timeLeft),
            secondaryText: `Leaving the page will make this permanent.`,
            hoverColor: "lightgrey",
            secondaryTextLines: 2,
            leftIcon: getActionIcon(pendingType),
            style: pendingListItemStyle
          };

          return (
            <div style={topMargin}>
              {date}
              <ListItem {...pendingListItemProps} />
            </div>
          );
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

        return (
          <div style={topMargin}>
            {date}
            <ListItem {...ListItemProps} />
          </div>
        );
      })}
    </List>
  );
};

export default Notifications;
