import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudentToClassroom } from "../../../redux/actions/classrooms";
import AddStudentModal from "./TAddStudentModal";
import validator from "validator";

class AddStudentContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fnameError: null,
			lnameError: null,
			emailError: null
		};
	}

	handleSubmit = async e => {
		e.preventDefault();

		const fname = e.target.fname.value;
		const lname = e.target.lname.value;
		const email = e.target.email.value;

		this.fnameValidate(fname);
		this.lnameValidate(lname);
		this.emailValidate(email);

		if (
			!this.state.fnameError &&
			!this.state.lnameError &&
			!this.state.emailError
		) {
			const studentData = {
				fname: fname,
				lname: lname,
				email: email
			};

			await this.props.addStudentToClassroom(this.props.classId, studentData);
			await this.props.handleClose();
			await this.props.loadStudents(this.props.classId);
		}
	};

	fnameValidate = async fname => {
		let error = validator.isEmpty(fname) ? "First name is required." : null;
		error =
			error ||
			(validator.isAlpha(fname)
				? null
				: "First name must contain only letters.");

		await this.setState({ fnameError: error });
	};

	lnameValidate = async lname => {
		let error = validator.isEmpty(lname) ? "Last name is required." : null;
		error =
			error ||
			(validator.isAlpha(lname)
				? null
				: "Last name must contain only letters.");

		await this.setState({ lnameError: error });
	};

	emailValidate = async email => {
		let error = validator.isEmpty(email) ? "Email is required." : null;
		error =
			error ||
			(validator.isEmail(email) ? null : "Please enter a valid email.");

		await this.setState({ emailError: error });
	};

	validate = e => {
		this[`${e.target.id}Validate`](e.target.value);
	};
	render() {
		return (
			<AddStudentModal
				handleClose={this.props.handleClose}
				handleSubmit={this.handleSubmit}
				validate={this.validate}
				fnameError={this.state.fnameError}
				lnameError={this.state.lnameError}
				emailError={this.state.emailError}
				submitError={this.props.submitError}
				open={this.props.open}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	submitError: state.status.error
});

const mapDispatchToProps = dispatch => ({
	addStudentToClassroom: (id, studentData) => {
		dispatch(addStudentToClassroom(id, studentData));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(
	AddStudentContainer
);
