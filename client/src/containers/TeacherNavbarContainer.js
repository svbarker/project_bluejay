import { connect } from "react-redux";
import TeacherNavbar from "../components/TeacherNavbar";

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		userId: state.user.id,
		displayName: state.user.displayName,
		notifications: state.notifications
	};
};

const TeacherNavbarContainer = connect(mapStateToProps, null)(TeacherNavbar);

export default TeacherNavbarContainer;
