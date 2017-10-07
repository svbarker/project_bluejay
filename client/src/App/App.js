import React, { Component } from "react";
import TeacherNavbarContainer from "./Navbars/TeacherNavbarContainer";
import StudentNavbarContainer from "./Navbars/StudentNavbarContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

//Components
import Login from "./GlobalComponents/Login";
import DashboardMenu from "./TeacherPath/Dashboard/DashboardMenu";
import StudentDashboardMenu from "./StudentPath/Dashboard/StudentDashboardMenu";
import NotificationsContainer from "./TeacherPath/Notifications/NotificationsContainer";
import StudentNotificationsContainer from "./StudentPath/Notifications/StudentNotificationsContainer";
import StudentView from "./TeacherPath/Students/StudentView";
import TaskListContainer from "./TeacherPath/Tasks/TaskListContainer";
import StudentTaskListContainer from "./StudentPath/Tasks/StudentTaskListContainer";
import StudentRewards from "./StudentPath/Rewards/StudentRewards";
import TeacherRewards from "./TeacherPath/Rewards/TeacherRewards";
import PageNotFound from "./GlobalComponents/PageNotFound";
import connect from "socket.io-client";

const TeacherNavbarContainerWithRouter = withRouter(TeacherNavbarContainer);
const StudentNavbarContainerWithRouter = withRouter(StudentNavbarContainer);

const userType = "Teacher";
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
							<TeacherNavbarContainerWithRouter socket={this.socket} />
							<Switch>
								{/* do some login checking here */}
								<Route exact path="/" component={DashboardMenu} />
								<Route path="/students" component={StudentView} />
								<Route
									path="/tasks"
									component={() =>
										<TaskListContainer userId={this.props.user.id} />}
								/>
								<Route path="/rewards" component={TeacherRewards} />
								<Route path="/report" component={() => <h1>Reports</h1>} />
								<Route
									path="/notifications"
									component={() =>
										<NotificationsContainer socket={this.socket} />}
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
							<StudentNavbarContainerWithRouter socket={this.socket} />
							<Switch>
								{/* do some login checking here */}
								<Route exact path="/" component={StudentDashboardMenu} />
								<Route
									path="/tasks"
									component={() =>
										<StudentTaskListContainer
											user={this.props.user}
											socket={this.socket}
										/>}
								/>
								<Route path="/rewards" component={StudentRewards} />
								<Route
									path="/notifications"
									component={StudentNotificationsContainer}
								/>
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
