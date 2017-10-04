import React, { Component } from "react";
import TeacherNavbarContainer from "../containers/TeacherNavbarContainer";
import StudentNavbarContainer from "../containers/StudentNavbarContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

//Components
import DashboardMenu from "./DashboardMenu";
import NotificationsContainer from "../containers/NotificationsContainer";
import StudentView from "./StudentView";
import MenuTasksContainer from "../containers/DisplayTasksContainer";
import RewardsContainer from "../containers/RewardsContainer";

const TeacherNavbarContainerWithRouter = withRouter(TeacherNavbarContainer);
const StudentNavbarContainerWithRouter = withRouter(StudentNavbarContainer);

class App extends Component {
  componentDidMount() {
    //for testing porpoises
    const userType = "Student";
    // const userType = "Student";
    if (userType === "Teacher") {
      this.props.loginTeacher();
    } else if (userType === "Student") {
      this.props.loginStudent();
    }
  }

  render() {
    const userType = "Student";

    if (userType === "Teacher") {
      return (
        <div className="App">
          <Router>
            <div>
              <TeacherNavbarContainerWithRouter />
              <Switch>
                {/* do some login checking here */}

                <Route
                  exact
                  path="/"
                  component={() => (
                    <div>
                      <h1>Teacher Dashboard</h1>
                      <DashboardMenu />
                    </div>
                  )}
                />
                <Route path="/students" component={StudentView} />
                <Route path="/tasks" component={MenuTasksContainer} />
                <Route path="/rewards" component={RewardsContainer} />
                <Route path="/report" component={() => <h1>Reports</h1>} />
                <Route
                  path="/notifications"
                  component={NotificationsContainer}
                />
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
              <StudentNavbarContainerWithRouter />
              <Switch>
                {/* do some login checking here */}

                <Route
                  exact
                  path="/"
                  component={() => (
                    <div>
                      <h1>Teacher Dashboard</h1>
                      <DashboardMenu />
                    </div>
                  )}
                />
                <Route path="/students" component={StudentView} />
                <Route path="/tasks" component={MenuTasksContainer} />
                <Route path="/rewards" component={RewardsContainer} />
                <Route path="/report" component={() => <h1>Reports</h1>} />
                <Route
                  path="/notifications"
                  component={NotificationsContainer}
                />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
