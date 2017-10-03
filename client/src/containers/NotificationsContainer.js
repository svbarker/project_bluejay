import React from "react";
import Notifications from "../components/Notifications";
import { connect } from "react-redux";

// IS THIS WHAT ITS CALLED
import { getNotifications } from "../actions/notifications";

class NotificationsContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.hydrateNotifications();
  }

  takeToEvent = (event, id) => () => {
    this.props.history.push(`/${event}s/${id}`);
  };

  render() {
    const { notifications } = this.props;
    return (
      <Notifications
        takeToEvent={this.takeToEvent}
        notifications={notifications}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: [
      { message: "task notification", event: { kind: "task", id: 1 } },
      { message: "task notification", event: { kind: "task", id: 1 } },
      { message: "reward notification", event: { kind: "reward", id: 1 } },
      { message: "task notification", event: { kind: "task", id: 1 } },
      { message: "reward notification", event: { kind: "reward", id: 1 } }
    ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hydrateNotifications: () => {
      dispatch(getNotifications());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
