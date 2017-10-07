import { connect } from "react-redux";
import SNavbar from "./SNavbar";
import { withRouter } from "react-router";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    points: state.user.points,
    displayName: state.user.displayName,
    avatar: state.user.avatar
  };
};

const StudentNavbarContainer = connect(mapStateToProps, null)(SNavbar);

export default withRouter(StudentNavbarContainer);
