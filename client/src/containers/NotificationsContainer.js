import React from "react";
import Notifications from "../components/Notifications";
import { connect } from "react-redux";

// IS THIS WHAT ITS CALLED
import { clearNotification } from "../actions/notifications";

class NotificationsContainer extends React.Component {
  constructor() {
    super();
  }

  takeToEvent = (event, id) => () => {
    this.props.history.push(`/${event}s/${id}`);
  };

  render() {
    const { user, clearNotification } = this.props;
    return (
      <Notifications
        takeToEvent={this.takeToEvent}
        notifications={user.notifications}
        clearNotification={clearNotification}
      />
    );
  }
}

// change to 'state.notifications' when ready!
const mapStateToProps = state => {
  return {
    user: {
      notifications: [
        { message: "task notification", kind: "task", id: 1 },
        { message: "task notification", kind: "task", id: 1 },
        { message: "reward notification", kind: "reward", id: 1 },
        { message: "task notification", kind: "task", id: 1 },
        { message: "reward notification", kind: "reward", id: 1 }
      ]
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearNotification: id => () => {
      dispatch(clearNotification(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
