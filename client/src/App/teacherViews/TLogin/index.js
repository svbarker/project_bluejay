import React, { Component } from "react";
import Login from "../../GlobalComponents/Login";
import LoggedOutNavbar from "../../Navbars/LoggedOutNavbar";
import FlatButton from "material-ui/FlatButton";
import "./TLogin.css";

class TLogin extends Component {
	handleLogin = e => {
		e.preventDefault();
		console.log(this.props.socket);
		this.props.loginTeacher(
			e.target.email.value,
			e.target.password.value,
			this.props.socket
		);
	};

	render() {
		return (
			<div>
				<LoggedOutNavbar />
				<div className="login-container">
					<h3>
						Don't have an account? <FlatButton label="Sign Up" />
					</h3>
					<Login onSubmit={this.handleLogin} />
				</div>
			</div>
		);
	}
}

export default TLogin;
