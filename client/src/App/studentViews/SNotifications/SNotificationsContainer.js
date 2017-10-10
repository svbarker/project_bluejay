import React from "react";
import Notifications from "./SNotifications";
import { connect } from "react-redux";

import {
  acceptEvent,
  rejectEvent,
  fetchStudentNotifications,
  clearAllStudentNotifications,
  clearNotification
} from "../../../redux/actions/notifications";

class NotificationsContainer extends React.Component {
  constructor() {
    super();
  }

  takeToItem = n => () => {
    this.props.history.push(`${n.task ? "task" : "reward"}s`);
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
  }

  render() {
    const NotificationsProps = {
      takeToItem: this.takeToItem,
      notifications: this.props.notifications,
      user: this.props.user,
      clearAll: this.props.clearAll,
      clearNotification: this.props.clearNotification
    };
    return <Notifications {...NotificationsProps} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmEvent: (t_id, s_id, ta_id, n_id) => {
      dispatch(acceptEvent(t_id, s_id, ta_id, n_id));
    },
    rejectEvent: (t_id, s_id, ta_id, n_id) => {
      dispatch(rejectEvent(t_id, s_id, ta_id, n_id));
    },
    hydrateNotifications: id => {
      dispatch(fetchStudentNotifications(id));
    },
    clearAll: () => {
      dispatch(clearAllStudentNotifications());
    },
    clearNotification: n => () => {
      dispatch(clearNotification(n._id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
