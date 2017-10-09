import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const Login = ({ onSubmit }) => {
	return (
		<Paper style={{ padding: "20px" }}>
			<h2>Login to Continue</h2>
			<form onSubmit={onSubmit}>
				<TextField floatingLabelText="Email" type="email" id="email" />
				<br />
				<TextField floatingLabelText="Password" type="password" id="password" />
				<br />
				<RaisedButton label="login" type="submit" />
			</form>
		</Paper>
	);
};

export default Login;
