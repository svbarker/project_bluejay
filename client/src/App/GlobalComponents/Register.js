import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import "./Login.css";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			selectValue: ""
		};
	}

	handleChange = (e, i, value) => {
		this.setState({ selectValue: value });
	};

	handleRegister = e => {
		const params = {
			email: e.target.email.value,
			password: e.target.password.value,
			title: e.target.title.value,
			fname: e.target.fname.value,
			lname: e.target.lname.value
		};
	};

	render() {
		return (
			<div className="registration-container">
				<Paper style={{ padding: "20px" }}>
					<h2>Register your teacher account</h2>
					<form className="registration-form-container">
						<div>
							<fieldset>
								<legend>Personal Information</legend>
								<TextField floatingLabelText="First Name" id="fname" />
								<TextField floatingLabelText="Last Name" id="lname" />
								<SelectField
									floatingLabelText="Title"
									onChange={this.handleChange}
									value={this.state.selectValue}
									id="title"
								>
									<MenuItem value={"Miss"} primaryText="Miss" />
									<MenuItem value={"Mr."} primaryText="Mr." />
									<MenuItem value={"Mrs."} primaryText="Mrs." />
									<MenuItem value={"Ms."} primaryText="Ms." />
								</SelectField>
								<TextField type="email" floatingLabelText="Email" id="email" />
							</fieldset>
							<p>
								Already have an account? <Link to="/login">Login</Link>
							</p>
						</div>
						<div>
							<fieldset>
								<legend>Account Credentials</legend>
								<TextField
									type="password"
									floatingLabelText="Password"
									id="password"
								/>
								<TextField
									type="password"
									floatingLabelText="Confirm Password"
									id="password-confirm"
								/>
							</fieldset>
							<RaisedButton label="Create Account" />
						</div>
					</form>
				</Paper>
			</div>
		);
	}
}

export default Register;
