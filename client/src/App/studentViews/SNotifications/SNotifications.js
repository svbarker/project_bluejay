import React from "react";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const getClearAllButton = (notifications, handler) =>
  notifications.length ? (
    <RaisedButton
      backgroundColor={"rgba(150,13,13,1)"}
      hoverColor={"rgba(137,0,0,1)"}
      style={{ margin: "30px 0px 0px 100px" }}
      labelColor={"rgb(255,255,255)"}
      label={`Clear All`}
      onClick={handler}
    />
  ) : null;

const getListItemStyle = n => ({
  margin: "0px 150px 0 250px",
  paddingBottom: "20px",
  border: `2px solid ${n.reward && n.reward.kind === "PointReward"
    ? "#E0D715"
    : /reject/.exec(n._body)
      ? "rgba(150,13,13,1)"
      : n.task ? "rgba( 26,132,132,.9)" : "rgba(150,205, 40,.9)"}`,
  borderRadius: "20px",
  color: "black"
});

const getIcon = n => (
  <i
    style={{
      ...iconStyles,
      color:
        n.reward && n.reward.kind === "PointReward"
          ? "#E0D715"
          : /reject/.exec(n._body)
            ? "rgba(150,13,13,1)"
            : n.task ? "#1A8484 " : "#96CD28"
    }}
    className={`${n.reward && n.reward.kind === "PointReward"
      ? "fa fa-plus-circle fa-2x"
      : /reject/.exec(n._body)
        ? `fa fa-ban fa-2x`
        : n.task ? "fa fa-tasks" : "fa fa-gift"} fa-2x`}
  />
);

const getClearNotificationButton = (n, handler) => (
  <i
    onClick={handler}
    style={{
      cursor: "pointer",
      color: "rgba(150,13,13,1)",
      position: "absolute",
      left: "220px",
      zIndex: "998",
      marginTop: "-10px",
      fontSize: "22px"
    }}
    className={"fa fa-window-close"}
  />
);

const getHoverColor = n =>
  n.task ? "rgba( 26,132,132,.3)" : "rgba(150,205, 40,.3)";

const getMainText = n =>
  n.reward && n.reward.kind === "PointReward"
    ? `You earned ${n.reward.value} points for completing a task!`
    : n._body;

const getSecondaryText = n =>
  n.task
    ? `Description: ${n.task.description}`
    : n.reward.description.length
      ? `Description: ${n.reward.description}`
      : null;

const topMargin = {
  marginTop: "30px",
  position: "relative"
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
    <h2
      style={{
        margin: "50px 150px 20px 150px"
      }}
    >
      {dateHeader}
    </h2>
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
  clearAll,
  clearNotification
}) => {
  let dates = [];
  let points = 0;
  return (
    <div className="notifications-container">
      <h1>Activity</h1>
      <Paper style={{ padding: "4px", borderRadius: "22px" }}>
        <div className="notifications-container-inner">
          {getClearAllButton(notifications, clearAll)}
          <List>
            {notifications.map(n => {
              let date = getDateHeader(n, dates);

              const ListItemProps = {
                primaryText: getMainText(n),
                secondaryText: getSecondaryText(n),
                onClick: takeToItem(n),
                hoverColor: getHoverColor(n),
                secondaryTextLines: 2,
                leftIcon: getIcon(n),
                style: getListItemStyle(n)
              };

              return (
                <div key={n._id} style={topMargin}>
                  {date}
                  {getClearNotificationButton(n, clearNotification(n))}
                  <ListItem {...ListItemProps} />
                </div>
              );
            })}
          </List>
        </div>
      </Paper>
    </div>
  );
};

export default Notifications;
