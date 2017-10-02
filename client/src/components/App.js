import React, { Component } from "react";
import TeacherNavbarContainer from "../containers/TeacherNavbar";
import StudentNavbarContainer from "../containers/StudentNavbarContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import DashboardMenu from "./DashboardMenu";

const TeacherNavbarContainerWithRouter = withRouter(TeacherNavbarContainer);
const StudentNavbarContainerWithRouter = withRouter(StudentNavbarContainer);

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<StudentNavbarContainerWithRouter />
						<Switch>
							{/* do some login checking here */}
							<Route exact path="/">
								<div>
									<h1>Dashboard</h1>
									<DashboardMenu />
								</div>
							</Route>
							<Route path="/student">
								<h1>Student</h1>
							</Route>
							<Route path="/task">
								<h1>Tasks</h1>
							</Route>
							<Route path="/reward">
								<h1>Rewards</h1>
							</Route>
							<Route path="/report">
								<h1>Reports</h1>
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
