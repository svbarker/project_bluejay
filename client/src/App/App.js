import React, { Component } from "react";
import TNavbar from "./Navbars/TNavbar";
import SNavbar from "./Navbars/SNavbar";
import LoggedOutNavbar from "./Navbars/LoggedOutNavbar";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

//Components
import RegisterContainer from "./GlobalComponents/RegisterContainer";
import LoginContainer from "./GlobalComponents/LoginContainer";
import TDashboard from "./teacherViews/TDashboard";
import SDashboard from "./studentViews/SDashboard";
import TNotifications from "./teacherViews/TNotifications";
import SNotifications from "./studentViews/SNotifications";
import TStudents from "./teacherViews/TStudents";
import TTasks from "./teacherViews/TTasks";
import STasks from "./studentViews/STasks";
import SRewards from "./studentViews/SRewards";
import TRewards from "./teacherViews/TRewards";
import SRewardsWallet from "./studentViews/SRewardsWallet";
import PageNotFound from "./GlobalComponents/PageNotFound";
import LoadScreen from "./GlobalComponents/LoadScreen";
import connect from "socket.io-client";

class App extends Component {
	constructor(props) {
		super(props);
		this.socket = connect("/");

		this.state = {
			firstLocation: window.location.pathname
		};
	}

	componentWillMount() {
		if (/connect.sid/.test(document.cookie)) {
			this.props.returningUser(this.socket);
		}
	}

	render() {
		if (this.props.status.isFetching) {
			return <LoadScreen />;
		} else if (this.props.user.kind === "Teacher") {
			return (
				<Router>
					<div className="App">
						<TNavbar socket={this.socket} />

						<Switch>
							{/* do some login checking here */}
							<Route exact path="/" component={TDashboard} />
							<Route path="/students" component={TStudents} />
							<Route
								path="/tasks"
								component={() => <TTasks userId={this.props.user.id} />}
							/>
							<Route
								path="/rewards"
								component={() => <TRewards user={this.props.user} />}
							/>
							<Route path="/report" component={() => <h1>Reports</h1>} />
							<Route
								path="/notifications"
								component={() => <TNotifications socket={this.socket} />}
							/>
							{/* <Route path="/" component={PageNotFound} /> */}
							{/* Testing a login route over here */}
							<Redirect from="/" to="/" />
						</Switch>
					</div>
				</Router>
			);
		} else if (this.props.user.kind === "Student") {
			return (
				<div className="App">
					<Router>
						<div>
							<SNavbar socket={this.socket} />
							<Switch>
								{/* do some login checking here */}
								<Redirect from="/login" to="/" />
								<Route exact path="/" component={SDashboard} />
								<Route
									path="/tasks"
									component={() =>
										<STasks user={this.props.user} socket={this.socket} />}
								/>
								<Route
									path="/rewards"
									component={() => <SRewards user={this.props.user} />}
								/>
								<Route
									path="/rewardsWallet"
									component={() =>
										<SRewardsWallet userId={this.props.user.id} />}
								/>
								<Route path="/notifications" component={SNotifications} />
								<Route path="/" component={PageNotFound} />
							</Switch>
						</div>
					</Router>
				</div>
			);
		} else {
			return (
				<Router>
					<div>
						<LoggedOutNavbar />
						<Switch>
							<Route
								path="/login"
								component={() =>
									<LoginContainer
										socket={this.socket}
										firstLocation={this.state.firstLocation}
									/>}
							/>
							<Route
								path="/register"
								component={() => <RegisterContainer socket={this.socket} />}
							/>
							<Redirect from="/" to="/login" />
						</Switch>
					</div>
				</Router>
			);
		}
	}
}

export default App;
