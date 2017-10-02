import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* do some login checking here */}
          <Route exact path="/">
            <h1>Dashboard</h1>
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
    );
  }
}

export default App;
