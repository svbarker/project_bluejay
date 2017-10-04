import { connect } from "react-redux";
import App from "../components/App";
import { loginTeacher, loginStudent } from "../actions";

const mapDispatchToProps = dispatch => ({
  loginTeacher: () => {
    dispatch(loginTeacher());
  },
  loginStudent: () => {
    dispatch(loginStudent());
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
