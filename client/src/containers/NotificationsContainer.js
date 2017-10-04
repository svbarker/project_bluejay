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
    this.props.history.push(`/${item === "TaskEvent" ? "task" : "reward"}s`);
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
        _message: "Thanks for giving me this task to complete!",
        kind: "TaskEvent",
        _id: "1",
        owner: {
          profile: {
            fname: "Bob",
            lname: "Hope"
          }
        },
        task: {
          title: "One Difficult Task"
        }
      },
      {
        _message: "I love this awesome reward!",
        kind: "RewardEvent",
        _id: "1",
        owner: {
          profile: {
            fname: "Bob",
            lname: "Saget"
          }
        },
        reward: {
          title: "One Awesome Reward"
        }
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
