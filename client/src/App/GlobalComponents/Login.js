import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import LoggedOutNavbar from "../Navbars/LoggedOutNavbar";
import "./Login.css";

const Login = ({
	validate,
	onSubmit,
	emailError,
	passwordError,
	submitError
}) => {
	return (
		<div>
			<LoggedOutNavbar />
			<div className="login-container">
				<h3>
					Don't have an account? <FlatButton label="Sign Up" />
				</h3>
				<Paper style={{ padding: "20px" }}>
					<h2>Login to Continue</h2>

					<form onSubmit={onSubmit}>
						{!submitError ? null : <span>{submitError.message}</span>}
						<br />
						<TextField
							floatingLabelText="Email"
							type="email"
							id="email"
							errorText={emailError}
							onBlur={validate}
						/>
						<br />
						<TextField
							floatingLabelText="Password"
							type="password"
							id="password"
							errorText={passwordError}
							onBlur={validate}
						/>
						<br />
						<RaisedButton label="login" type="submit" />
					</form>
				</Paper>
			</div>
		</div>
	);
};

export default Login;
