import React from "react";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const getListItemStyle = n => ({
  margin: "0px 150px",
  paddingBottom: "20px",
  border: `10px solid ${/reject/.exec(n._body)
    ? "rgba(150,13,13,1)"
    : n.task ? "rgba( 26,132,132,.9)" : "rgba(150,205, 40,.9)"}`
});

const getIcon = n => {
  return (
    <i
      style={{
        ...iconStyles,
        color: /reject/.exec(n._body)
          ? "rgba(150,13,13,1)"
          : n.task ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.task ? "fa fa-tasks" : "fa fa-gift"} fa-2x`}
    />
  );
};

const getMainText = n => n._body;

const getSecondaryText = n =>
  n.task
    ? `Description: ${n.task.description}`
    : `Description: ${n.reward.description}`;

const getHoverColor = n =>
  /reject/.exec(n._body)
    ? "rgba(150,13,13,.3)"
    : n.task ? "rgba( 26,132,132,.3)" : "rgba(150,205,40,.3)";

const topMargin = {
  marginTop: "50px"
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
    <h4
      style={{
        margin: "50px 150px 20px 150px"
      }}
    >
      {dateHeader}
    </h4>
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

const Notifications = ({ notifications, takeToItem, user }) => {
  let dates = [];
  return (
    <div>
      <List>
        {notifications.map(n => {
          let date = getDateHeader(n, dates);

          const ListItemProps = {
            key: n._id,
            primaryText: getMainText(n),
            secondaryText: getSecondaryText(n),
            hoverColor: getHoverColor(n),
            onClick: takeToItem(n.task, n._id),
            secondaryTextLines: 2,
            leftIcon: getIcon(n),
            style: getListItemStyle(n)
          };

          return (
            <div style={topMargin}>
              {date}
              <ListItem {...ListItemProps} />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default Notifications;
