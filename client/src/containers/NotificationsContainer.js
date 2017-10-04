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
      pendingActionId: null,
      pendingType: null,
      timeout: null
    };
  }

  takeToItem = (item, id) => () => {
    this.props.history.push(`/${item === "TaskEvent" ? "task" : "reward"}s`);
  };

  handleAction = action => (t_id, s_id, ta_id, n_id) => e => {
    e.stopPropagation();
    clearTimeout(this.state.timeout);
    this.setState({
      pendingActionId: n_id,
      pendingType: `${action}ed`
    });
    this.setState({
      timeout: setTimeout(() => {
        this.props[`${action}Event`](t_id, s_id, ta_id, n_id);
        this.setState({
          pendingActionId: null,
          pendingType: null
        });
      }, 5000)
    });
  };

  undoAction = e => {
    e.stopPropagation();
    clearTimeout(this.state.timeout);
    this.setState({
      pendingActionId: null,
      pendingType: null
    });
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
  }

  render() {
    const { user, notifications } = this.props;
    const { pendingActionId, pendingType } = this.state;
    return (
      <Notifications
        takeToItem={this.takeToItem}
        notifications={notifications}
        acceptEvent={this.handleAction("confirm")}
        rejectEvent={this.handleAction("reject")}
        user={user}
        pending={pendingActionId}
        pendingType={pendingType}
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
