import { connect } from "react-redux";
import TNavbar from "./TNavbar";
import { withRouter } from "react-router";
import { logoutUser } from "../../../redux/actions";
import { fetchNotifications } from "../../../redux/actions/notifications";

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		userId: state.user.id,
		displayName: state.user.displayName,
		notifications: state.notifications.list
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => {
			dispatch(logoutUser());
		},
		fetchNotifications: id => {
			dispatch(fetchNotifications(id));
		}
	};
};

const TeacherNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(
	TNavbar
);

export default withRouter(TeacherNavbarContainer);
