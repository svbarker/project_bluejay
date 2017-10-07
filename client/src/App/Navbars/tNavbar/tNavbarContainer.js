import { connect } from "react-redux";
import tNavbar from "./tNavbar";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userId: state.user.id,
    displayName: state.user.displayName,
    notifications: state.notifications
  };
};

const TeacherNavbarContainer = connect(mapStateToProps, null)(tNavbar);

export default TeacherNavbarContainer;
