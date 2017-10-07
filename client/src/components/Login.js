import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

const Login = () => {
	return (
		<Paper>
			<form>
				<TextField floatingLabelText="Email" type="email" />
				<TextField floatingLabelText="Password" type="password" />
			</form>
		</Paper>
	);
};

export default Login;
