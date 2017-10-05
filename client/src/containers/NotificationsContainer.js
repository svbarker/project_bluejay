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
    this.props.history.push(`/${item ? "task" : "reward"}s`);
  };

  handleAction = action => (t_id, s_id, ta_id, n_id, type) => e => {
    e.stopPropagation();
    this.setState({
      pendingActions: [
        ...this.state.pendingActions,
        { id: n_id, timeLeft: 15, type: `${action}ed` }
      ]
    });
    let interval = setInterval(() => {
      this.setState({
        pendingActions: this.state.pendingActions.map(
          a => (a.id === n_id ? { ...a, timeLeft: a.timeLeft - 1 } : a)
        )
      });
    }, 1000);
    this.setState({
      actionTimeouts: [
        ...this.state.actionTimeouts.filter(t => t.eventId !== n_id),
        {
          timeout: setTimeout(() => {
            this.props[`${action}Event`](t_id, s_id, ta_id, n_id, type);
            this.setState({
              pendingActions: this.state.pendingActions.filter(
                a => a.id !== n_id
              )
            });
          }, 15000),
          eventId: n_id,
          interval,
          t_id,
          s_id,
          ta_id,
          action
        }
      ]
    });
    setTimeout(() => {
      clearInterval(interval);
    }, 15000);
  };

  undoAction = id => e => {
    e.stopPropagation();
    clearTimeout(
      this.state.actionTimeouts.filter(t => t.eventId === id)[0]["timeout"]
    );
    clearInterval(
      this.state.actionTimeouts.filter(t => t.eventId === id)[0]["interval"]
    );
    this.setState({
      pendingActions: this.state.pendingActions.filter(a => a.id !== id)
    });
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
    window.addEventListener("onbeforeunload", this.componentWillUnmount);
  }

  componentWillUnmount() {
    let timeouts = this.state.actionTimeouts;
    timeouts.forEach(t => {
      clearTimeout(t.timeout);
      clearInterval(t.interval);
      this.props[`${t.action}Event`](t.t_id, t.s_id, t.ta_id, t.eventId);
    });
  }

  render() {
    const NotificationsProps = {
      takeToItem: this.takeToItem,
      notifications: this.props.notifications,
      acceptEvent: this.handleAction("confirm"),
      rejectEvent: this.handleAction("reject"),
      user: this.props.user,
      pendings: this.state.pendingActions,
      undo: this.undoAction
    };

    return <Notifications {...NotificationsProps} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: [
      {
        _message: "Thanks for giving me this task to complete!",
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
    confirmEvent: (t_id, s_id, ta_id, n_id, type) => {
      dispatch(acceptEvent(t_id, s_id, ta_id, n_id, type));
    },
    rejectEvent: (t_id, s_id, ta_id, n_id, type) => {
      dispatch(rejectEvent(t_id, s_id, ta_id, n_id, type));
    },
    hydrateNotifications: id => {
      dispatch(fetchNotifications(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
