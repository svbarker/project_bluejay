import React from "react";
import Notifications from "../components/Notifications";
import { connect } from "react-redux";

// IS THIS WHAT ITS CALLED
import { clearNotification } from "../actions/notifications";

class NotificationsContainer extends React.Component {
  constructor() {
    super();
  }

  takeToEvent = (event, id) => () => {
    this.props.history.push(`/${event}s/${id}`);
  };

  render() {
    const { notifications, clearNotification } = this.props;
    return (
      <Notifications
        takeToEvent={this.takeToEvent}
        notifications={notifications}
        clearNotification={clearNotification}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearNotification: id => () => {
      dispatch(clearNotification(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
