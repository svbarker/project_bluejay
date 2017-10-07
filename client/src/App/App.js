import React, { Component } from "react";
import TNavbar from "./Navbars/TNavbar";
import SNavbar from "./Navbars/SNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Login from "./GlobalComponents/Login";
import TDashboard from "./teacherViews/TDashboard";
import SDashboard from "./studentViews/SDashboard";
import TNotifications from "./teacherViews/TNotifications";
import SNotifications from "./studentViews/SNotifications";
import TStudents from "./teacherViews/TStudents";
import TTasks from "./teacherViews/TTasks";
import STasks from "./studentViews/STasks";
import SRewards from "./studentViews/SRewards";
import TRewards from "./teacherViews/TRewards";
import PageNotFound from "./GlobalComponents/PageNotFound";
import connect from "socket.io-client";

const userType = "Student";
// const userType = "Teacher";

class App extends Component {
	constructor(props) {
		super(props);

		this.socket = connect("/");
	}

	componentDidMount() {
		//for testing porpoises
		if (userType === "Teacher") {
			this.props.loginTeacher(this.socket);
		} else if (userType === "Student") {
			this.props.loginStudent(this.socket);
		}
	}

	render() {
		if (userType === "Teacher") {
			return (
				<div className="App">
					<Router>
						<div>
							<TNavbar socket={this.socket} />
							<Switch>
								{/* do some login checking here */}
								<Route exact path="/" component={TDashboard} />
								<Route path="/students" component={TStudents} />
								<Route
									path="/tasks"
									component={() => <TTasks userId={this.props.user.id} />}
								/>
								<Route path="/rewards" component={TRewards} />
								<Route path="/report" component={() => <h1>Reports</h1>} />
								<Route
									path="/notifications"
									component={() => <TNotifications socket={this.socket} />}
								/>
								{/* <Route path="/" component={PageNotFound} /> */}
								{/* Testing a login route over here */}
								<Route path="/login" component={() => <Login />} />
							</Switch>
						</div>
					</Router>
				</div>
			);
		} else {
			return (
				<div className="App">
					<Router>
						<div>
							<SNavbar socket={this.socket} />
							<Switch>
								{/* do some login checking here */}
								<Route exact path="/" component={SDashboard} />
								<Route
									path="/tasks"
									component={() =>
										<STasks user={this.props.user} socket={this.socket} />}
								/>
								<Route path="/rewards" component={SRewards} />
								<Route path="/notifications" component={SNotifications} />
								<Route path="/" component={PageNotFound} />
							</Switch>
						</div>
					</Router>
				</div>
			);
		}
	}
}

export default App;
