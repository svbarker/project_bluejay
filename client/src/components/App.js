import React, { Component } from "react";
import TeacherNavbarContainer from "../containers/TeacherNavbarContainer";
import StudentNavbarContainer from "../containers/StudentNavbarContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

//Components
import DashboardMenu from "./DashboardMenu";
import StudentDashboardMenu from "./StudentDashboardMenu";
import NotificationsContainer from "../containers/NotificationsContainer";
import StudentNotificationsContainer from "../containers/StudentNotificationsContainer";
import StudentView from "./StudentView";
import TaskListContainer from "../containers/TaskListContainer";
import StudentTaskListContainer from "../containers/StudentTaskListContainer";
import StudentRewards from "../containers/Rewards/StudentRewards";
import TeacherRewards from "../containers/Rewards/TeacherRewards";
import PageNotFound from "./PageNotFound";
import connect from "socket.io-client";

const TeacherNavbarContainerWithRouter = withRouter(TeacherNavbarContainer);
const StudentNavbarContainerWithRouter = withRouter(StudentNavbarContainer);

// const userType = "Student";
const userType = "Teacher";

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = connect("/");
  }

  componentDidMount() {
    //for testing porpoises
    if (userType === "Teacher") {
      this.props.loginTeacher();
    } else if (userType === "Student") {
      this.props.loginStudent();
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
                  component={() => (
                    <TaskListContainer userId={this.props.user.id} />
                  )}
                />
                <Route path="/rewards" component={TeacherRewards} />
                <Route path="/report" component={() => <h1>Reports</h1>} />
                <Route
                  path="/notifications"
                  component={NotificationsContainer}
                />
                {/* <Route path="/" component={PageNotFound} /> */}
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
                  component={() => (
                    <StudentTaskListContainer user={this.props.user} />
                  )}
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
