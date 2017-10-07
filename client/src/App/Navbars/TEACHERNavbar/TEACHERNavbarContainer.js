import { connect } from "react-redux";
import TEACHERNavbar from "./TEACHERNavbar";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userId: state.user.id,
    displayName: state.user.displayName,
    notifications: state.notifications
  };
};

const TeacherNavbarContainer = connect(mapStateToProps, null)(TEACHERNavbar);

export default TeacherNavbarContainer;
