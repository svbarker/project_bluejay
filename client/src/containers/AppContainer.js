import { connect } from "react-redux";
import App from "../components/App";
import { loginTeacher } from "../actions/user";

const mapDispatchToProps = dispatch => ({
	loginTeacher: () => {
		dispatch(loginTeacher());
	}
});

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
