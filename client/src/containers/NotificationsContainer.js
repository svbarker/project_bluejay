import React from "react";
import Notifications from "../components/Notifications";
import { connect } from "react-redux";

import {
  clearNotification,
  fetchNotifications
} from "../actions/notifications";

class NotificationsContainer extends React.Component {
  constructor() {
    super();
  }

  takeToEvent = (event, id) => () => {
    this.props.history.push(`/${event}s/${id}`);
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
  }

  render() {
    const { notifications, clearNotification } = this.props;
    return (
      <Notifications
        takeToEvent={this.takeToEvent}
        notifications={notifications}
        clearNotification={clearNotification}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: [
      { message: "hello", kind: "reward", id: "59d3a0e477f2ad1e6668f823" }
    ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearNotification: id => () => {
      dispatch(clearNotification(id));
    },
    hydrateNotifications: id => {
      dispatch(fetchNotifications(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
