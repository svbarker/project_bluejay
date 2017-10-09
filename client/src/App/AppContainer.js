import { connect } from "react-redux";
import App from "./App";
import { loginUser, returningUser } from "../redux/actions";

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password, socket) => {
    dispatch(loginUser(email, password, socket));
  },
  returningUser: socket => {
    dispatch(returningUser(socket));
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    status: state.status
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
