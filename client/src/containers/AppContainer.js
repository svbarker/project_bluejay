import { connect } from "react-redux";
import App from "../components/App";

const mapDispatchToProps = dispatch => ({
	//
});

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
