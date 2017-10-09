import React, { Component } from "react";
import Login from "../../GlobalComponents/Login";
import LoggedOutNavbar from "../../Navbars/LoggedOutNavbar";
import FlatButton from "material-ui/FlatButton";
import "./TLogin.css";

class TLogin extends Component {
	render() {
		return (
			<div>
				<LoggedOutNavbar />
				<div className="login-container">
					<h3>
						Don't have an account? <FlatButton label="Sign Up" />
					</h3>
					<Login
						onSubmit={this.props.loginTeacher}
						socket={this.props.socket}
					/>
				</div>
			</div>
		);
	}
}

export default TLogin;
