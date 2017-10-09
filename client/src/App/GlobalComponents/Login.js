import React, { Component } from "react";
import validator from "validator";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emailError: null,
			passwordError: null,
			submitError: null
		};
	}

	emailValidate = email => {
		let error = validator.isEmpty(email) ? "Email is required." : null;
		error =
			error ||
			(validator.isEmail(email) ? null : "Please enter a valid email.");

		this.setState({ emailError: error });
	};

	passwordValidate = password => {
		const error = validator.isEmpty(password) ? "Password is required." : null;

		this.setState({ passwordError: error });
	};

	validate = e => {
		this[`${e.target.id}Validate`](e.target.value);
	};

	handleSubmit = async e => {
		e.preventDefault();
		console.log(e.target);
		this.emailValidate(e.target.email.value);
		console.log(e.target, "part 2");
		this.passwordValidate(e.target.password.value);

		if (!this.state.emailError && !this.state.passwordError) {
			const error = await this.props.onSubmit(
				e.target.email.value,
				e.target.password.value,
				this.props.socket
			);

			console.log(error);
			this.setState({ submitError: error });
		}
	};

	render() {
		return (
			<Paper style={{ padding: "20px" }}>
				<h2>Login to Continue</h2>
				<form onSubmit={this.handleSubmit}>
					<TextField
						floatingLabelText="Email"
						type="email"
						id="email"
						errorText={this.state.emailError}
						onBlur={this.validate}
					/>
					<br />
					<TextField
						floatingLabelText="Password"
						type="password"
						id="password"
						errorText={this.state.passwordError}
						onBlur={this.validate}
					/>
					<br />
					<RaisedButton label="login" type="submit" />
				</form>
			</Paper>
		);
	}
}

export default Login;
