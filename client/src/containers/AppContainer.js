import { connect } from "react-redux";
import App from "../components/App";
import { loginTeacher, loginStudent } from "../actions";

const mapDispatchToProps = dispatch => ({
  loginTeacher: socket => {
    dispatch(loginTeacher(socket));
  },
  loginStudent: socket => {
    dispatch(loginStudent(socket));
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.status.isFetching
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
