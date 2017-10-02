import React, { Component } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<Navbar displayName="Ms. Daisy" />
						<Route path="/" component={Dashboard} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
