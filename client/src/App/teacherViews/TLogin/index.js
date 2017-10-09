import React, { Component } from "react";
import Login from "../../GlobalComponents/Login";
import FlatButton from "material-ui/FlatButton";

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
				<h3>
					Don't have an account? <FlatButton label="Sign In" />
				</h3>
				<Login onSubmit={this.handleLogin} />
			</div>
		);
	}
}

export default TLogin;
