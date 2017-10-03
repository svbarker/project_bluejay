import { connect } from "react-redux";
import App from "../components/App";
import { loginTeacher } from "../actions";

const mapDispatchToProps = dispatch => ({
	loginTeacher: () => {
		dispatch(loginTeacher());
	}
});

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
