import { connect } from "react-redux";
import STUDENTNavbar from "./STUDENTNavbar";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    points: state.user.points,
    displayName: state.user.displayName,
    avatar: state.user.avatar
  };
};

const StudentNavbarContainer = connect(mapStateToProps, null)(STUDENTNavbar);

export default StudentNavbarContainer;
