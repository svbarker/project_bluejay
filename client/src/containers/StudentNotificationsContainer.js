import React from "react";
import StudentNotifications from "../components/StudentNotifications";
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
    const NotificationsProps = {
      takeToItem: this.takeToItem,
      notifications: this.props.notifications,
      user: this.props.user
    };
    return <StudentNotifications {...NotificationsProps} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: [
      {
        _message: "Great job!",
        kind: "TaskEvent",
        _id: "1",
        owner: {
          profile: {
            fname: "The teacher",
            lname: ""
          }
        },
        task: {
          title: "One Difficult Task"
        }
      },
      {
        _message: "Congrats!",
        kind: "RewardEvent",
        _id: "2",
        owner: {
          profile: {
            fname: "The teacher",
            lname: ""
          }
        },
        reward: {
          title: "One Awesome Reward"
        }
      },
      {
        _message: "Great job!",
        kind: "TaskEvent",
        _id: "3",
        owner: {
          profile: {
            fname: "The teacher",
            lname: ""
          }
        },
        task: {
          title: "One Difficult Task"
        }
      },
      {
        _message: "Congrats!",
        kind: "RewardEvent",
        _id: "4",
        owner: {
          profile: {
            fname: "The teacher",
            lname: ""
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
    confirmEvent: (t_id, s_id, ta_id, n_id) => {
      dispatch(acceptEvent(t_id, s_id, ta_id, n_id));
    },
    rejectEvent: (t_id, s_id, ta_id, n_id) => {
      dispatch(rejectEvent(t_id, s_id, ta_id, n_id));
    },
    hydrateNotifications: id => {
      dispatch(fetchNotifications(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
