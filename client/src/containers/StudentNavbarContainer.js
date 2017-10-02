import { connect } from "react-redux";
import StudentNavbar from "../components/StudentNavbar";

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		points: state.user.points,
		displayName: state.user.displayName,
		avatar: state.user.avatar
	};
};

const StudentNavbarContainer = connect(mapStateToProps, null)(StudentNavbar);

export default StudentNavbarContainer;
