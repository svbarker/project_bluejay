import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import Register from "./Register";
import validator from "validator";

class RegisterContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: "Miss",
			passwordValue: "",
			fnameError: null,
			lnameError: null,
			emailError: null,
			passwordError: null,
			passwordConfirmError: null
		};
	}

	handleSelectChange = (e, i, value) => {
		this.setState({ selectValue: value });
	};

	handlePasswordChange = e => {
		this.setState({ passwordValue: e.target.value });
	};

	fnameValidate = fname => {
		let error = validator.isEmpty(fname) ? "First name is required." : null;
		error =
			error ||
			(validator.isAlpha(fname)
				? null
				: "First name must contain only letters.");

		this.setState({ fnameError: error });
	};

	lnameValidate = lname => {
		let error = validator.isEmpty(lname) ? "Last name is required." : null;
		error =
			error ||
			(validator.isAlpha(lname)
				? null
				: "Last name must contain only letters.");

		this.setState({ lnameError: error });
	};

	emailValidate = email => {
		let error = validator.isEmpty(email) ? "Email is required." : null;
		error =
			error ||
			(validator.isEmail(email) ? null : "Please enter a valid email.");

		this.setState({ emailError: error });
	};

	passwordValidate = password => {
		let error = validator.isEmpty(password) ? "Password is required." : null;
		error =
			error ||
			(validator.isLength(password, { min: 8, max: 20 })
				? null
				: "Password must be between 8 and 20 characters.");

		this.setState({ passwordError: error });
	};

	passwordConfirmValidate = password => {
		let error = validator.isEmpty(password)
			? "Please retype your password."
			: null;

		error =
			error ||
			(validator.equals(password, this.state.passwordValue)
				? null
				: "Password does not match.");

		this.setState({ passwordConfirmError: error });
	};

	validate = e => {
		this[`${e.target.id}Validate`](e.target.value);
	};

	handleSubmit = async e => {
		e.preventDefault();
		this.fnameValidate(e.target.fname.value);
		this.lnameValidate(e.target.lname.value);
		this.emailValidate(e.target.email.value);
		this.passwordValidate(e.target.password.value);
		this.passwordConfirmValidate(e.target.passwordConfirm.value);

		if (
			!this.state.emailError &&
			!this.state.passwordError &&
			!this.state.fnameError &&
			!this.state.lnameError &&
			!this.state.passwordConfirmError
		) {
			const params = {
				email: e.target.email.value,
				password: e.target.password.value,
				title: this.state.selectValue,
				fname: e.target.fname.value,
				lname: e.target.lname.value
			};

			await this.props.registerUser(params, this.props.socket);
		}
	};

	register = async e => {};

	render() {
		return (
			<Register
				handleSubmit={this.handleSubmit}
				handleSelectChange={this.handleSelectChange}
				selectValue={this.state.selectValue}
				handlePasswordChange={this.handlePasswordChange}
				validate={this.validate}
				fnameError={this.state.fnameError}
				lnameError={this.state.lnameError}
				emailError={this.state.emailError}
				passwordError={this.state.passwordError}
				passwordConfirmError={this.state.passwordConfirmError}
				submitError={this.props.submitError}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	submitError: state.status.error
});

const mapDispatchToProps = dispatch => ({
	registerUser: (params, socket) => {
		dispatch(registerUser(params, socket));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
