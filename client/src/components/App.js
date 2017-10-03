import React, { Component } from "react";
import TeacherNavbarContainer from "../containers/TeacherNavbarContainer";
import StudentNavbarContainer from "../containers/StudentNavbarContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

//Components
import DashboardMenu from "./DashboardMenu";
import NotificationsContainer from "../containers/NotificationsContainer";
import MenuTasksContainer from "../containers/DisplayTasksContainer";
import RewardsContainer from "../containers/RewardsContainer";

const TeacherNavbarContainerWithRouter = withRouter(TeacherNavbarContainer);
const StudentNavbarContainerWithRouter = withRouter(StudentNavbarContainer);

class App extends Component {
  componentDidMount() {
    this.props.loginTeacher();
  }

  render() {
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
              <Route path="/students" component={() => <h1>Student</h1>} />
              <Route path="/tasks" component={MenuTasksContainer} />
              <Route path="/rewards" component={RewardsContainer} />
              <Route path="/report" component={() => <h1>Reports</h1>} />
              <Route path="/notifications" component={NotificationsContainer} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
