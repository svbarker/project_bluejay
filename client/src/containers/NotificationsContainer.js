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

    this.state = {
      pendingActions: [],
      actionTimeouts: []
    };
  }

  takeToItem = (item, id) => () => {
    this.props.history.push(`/${item === "TaskEvent" ? "task" : "reward"}s`);
  };

  handleAction = action => (t_id, s_id, ta_id, n_id) => e => {
    e.stopPropagation();
    this.setState({
      pendingActions: [
        ...this.state.pendingActions,
        { id: n_id, type: `${action}ed` }
      ]
    });
    this.setState({
      actionTimeouts: [
        ...this.state.actionTimeouts,
        {
          timeout: setTimeout(() => {
            this.props[`${action}Event`](t_id, s_id, ta_id, n_id);
            this.setState({
              pendingActions: this.state.pendingActions.filter(
                a => a.id !== n_id
              )
            });
          }, 5000),
          eventId: n_id
        }
      ]
    });
  };

  undoAction = id => e => {
    e.stopPropagation();
    clearTimeout(
      this.state.actionTimeouts.filter(t => t.eventId === id)[0]["timeout"]
    );
    this.setState({
      pendingActions: this.state.pendingActions.filter(a => a.id !== id)
    });
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
  }

  render() {
    const { user, notifications } = this.props;
    const { pendingActions } = this.state;
    return (
      <Notifications
        takeToItem={this.takeToItem}
        notifications={notifications}
        acceptEvent={this.handleAction("confirm")}
        rejectEvent={this.handleAction("reject")}
        user={user}
        pendings={pendingActions}
        undo={this.undoAction}
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
        _id: "2",
        owner: {
          profile: {
            fname: "Bob",
            lname: "Saget"
          }
        },
        reward: {
          title: "One Awesome Reward"
        }
      },
      {
        _message: "Thanks for giving me this task to complete!",
        kind: "TaskEvent",
        _id: "3",
        owner: {
          profile: {
            fname: "Bob",
            lname: "The Builder"
          }
        },
        task: {
          title: "One Difficult Task"
        }
      },
      {
        _message: "I love this awesome reward!",
        kind: "RewardEvent",
        _id: "4",
        owner: {
          profile: {
            fname: "Bob",
            lname: "Bob Bob Bob-Bobera Ann"
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
