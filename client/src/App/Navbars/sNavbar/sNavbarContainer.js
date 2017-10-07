import { connect } from "react-redux";
import sNavbar from "./sNavbar";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    points: state.user.points,
    displayName: state.user.displayName,
    avatar: state.user.avatar
  };
};

const StudentNavbarContainer = connect(mapStateToProps, null)(sNavbar);

export default StudentNavbarContainer;
