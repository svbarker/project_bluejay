import React, { Component } from "react";
import TeacherNavbarContainer from "../containers/TeacherNavbarContainer";
import StudentNavbarContainer from "../containers/StudentNavbarContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import DashboardMenu from "./DashboardMenu";
import MenuCardContainer from "../containers/MenuCardContainer";

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
                  <h1>Teacher Dashboard</h1>
                  <DashboardMenu />
                </div>
              </Route>
              <Route path="/students">
                <h1>Student</h1>
              </Route>
              <Route path="/tasks" component={MenuCardContainer} />
              <Route path="/rewards">
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
