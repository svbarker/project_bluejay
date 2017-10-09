import { connect } from "react-redux";
import SNavbar from "./SNavbar";
import { withRouter } from "react-router";
import { logoutUser } from "../../../redux/actions";
import { fetchNotifications } from "../../../redux/actions/notifications";

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		points: state.user.points,
		displayName: state.user.displayName,
		avatar: state.user.avatar,
		notifications: state.notifications
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

const StudentNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(
	SNavbar
);

export default withRouter(StudentNavbarContainer);
