import { connect } from "react-redux";
import TNavbar from "./TNavbar";
import { withRouter } from "react-router";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userId: state.user.id,
    displayName: state.user.displayName,
    notifications: state.notifications
  };
};

const TeacherNavbarContainer = connect(mapStateToProps, null)(TNavbar);

export default withRouter(TeacherNavbarContainer);
