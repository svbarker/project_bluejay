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

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
