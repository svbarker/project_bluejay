import React from "react";
import Notifications from "../components/Notifications";
import { connect } from "react-redux";

import {
  acceptEvent,
  rejectEvent,
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
    const { user, notifications, acceptEvent, rejectEvent } = this.props;
    return (
      <Notifications
        takeToItem={this.takeToItem}
        notifications={notifications}
        acceptEvent={acceptEvent}
        rejectEvent={rejectEvent}
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
      },
      {
        message:
          "A user has submitted something of a sort which to for with might notify you in and of some sort of way",
        kind: "reward",
        id: "1"
      },
      {
        message:
          "A user has submitted something of a sort which to for with might notify you in and of some sort of way",
        kind: "task",
        id: "1"
      },
      {
        message:
          "A user has submitted something of a sort which to for with might notify you in and of some sort of way",
        kind: "task",
        id: "1"
      },
      {
        message:
          "A user has submitted something of a sort which to for with might notify you in and of some sort of way",
        kind: "reward",
        id: "1"
      },
      {
        message:
          "A user has submitted something of a sort which to for with might notify you in and of some sort of way",
        kind: "task",
        id: "1"
      }
    ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    acceptEvent: (t_id, n_id) => e => {
      e.stopPropagation();
      dispatch(acceptEvent(t_id, n_id));
    },
    rejectEvent: (t_id, n_id) => e => {
      e.stopPropagation();
      dispatch(rejectEvent(t_id, n_id));
    },
    hydrateNotifications: id => {
      dispatch(fetchNotifications(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
