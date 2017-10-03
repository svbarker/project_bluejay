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

  takeToItem = (item, id) => () => {
    this.props.history.push(`/${item}s/${id}`);
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
  }

  render() {
    const { user, notifications, clearNotification } = this.props;
    return (
      <Notifications
        takeToItem={this.takeToItem}
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
    notifications: [
      {
        message:
          "A user has submitted something of a sort which to for with might notify you in and of some sort of way",
        kind: "reward",
        id: "1"
      }
    ]
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
