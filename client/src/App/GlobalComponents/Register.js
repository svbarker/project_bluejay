import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const Register = () => {
	return (
		<Paper>
			<h2>Register your teacher account</h2>
			<form>
				<fieldset>
					<legend>Personal Information</legend>
					<TextField />
					<TextField />
					<SelectField>
						<MenuItem value="Mr.">Mr.</MenuItem>
						<MenuItem value={"Mrs."}>Mrs.</MenuItem>
						<MenuItem value={"Ms."}>Ms.</MenuItem>
						<MenuItem value={"Miss"}>Miss</MenuItem>
					</SelectField>
					<TextField type="email" />
				</fieldset>
			</form>
		</Paper>
	);
};

export default Register;
