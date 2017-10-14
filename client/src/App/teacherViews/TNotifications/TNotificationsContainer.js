import React from "react";
import Notifications from "./TNotifications";
import { connect } from "react-redux";
import * as Events from "../../../redux/actions/events";
import { withRouter } from "react-router-dom";

import {
  acceptEvent,
  rejectEvent,
  fetchNotifications
} from "../../../redux/actions/notifications";

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
        { id: n_id, timeLeft: 5, type: `${action}ed` }
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
          }, 5000),
          eventId: n_id,
          interval,
          t_id,
          s_id,
          ta_id,
          action,
          type
        }
      ]
    });

    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
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
      this.props[`${t.action}Event`](
        t.t_id,
        t.s_id,
        t.ta_id,
        t.eventId,
        t.type
      );
    });
  }

  render() {
    const NotificationsProps = {
      takeToItem: this.takeToItem,
      notifications: this.props.notifications,
      acceptEvent: this.handleAction("confirm"),
      rejectEvent: this.handleAction("reject"),
      user: this.props.user,
      undo: this.undoAction,
      pendings: this.state.pendingActions
    };

    return <Notifications {...NotificationsProps} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.user,
    isFetching: state.notifications.isFetching,
    notifications: state.notifications.list
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)
);
