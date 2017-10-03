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
    const { user, notifications, clearNotification } = this.props;
    return (
      <Notifications
        takeToEvent={this.takeToEvent}
        notifications={notifications}
        clearNotification={clearNotification}
        user={user}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: [{ message: "hello", kind: "task", id: "1" }]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearNotification: (t_id, n_id) => () => {
      dispatch(clearNotification(t_id, n_id));
    },
    hydrateNotifications: id => {
      dispatch(fetchNotifications(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
