import React from "react";
import Notifications from "./SNotifications";
import { connect } from "react-redux";
import LoadScreen from "../../GlobalComponents/LoadScreen";

import {
	acceptEvent,
	rejectEvent,
	fetchStudentNotifications,
	clearAllStudentNotifications,
	clearNotification
} from "../../../redux/actions/notifications";

class NotificationsContainer extends React.Component {
	takeToItem = n => () => {
		this.props.history.push(`${n.task ? "task" : "reward"}s`);
	};

	componentDidMount() {
		this.props.hydrateNotifications(this.props.user.id);
	}

	render() {
		if (this.props.isFetching) {
			return <LoadScreen />;
		}
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
		isFetching: state.notifications.isFetching,
		notifications: state.notifications.list
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
