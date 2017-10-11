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
		this.fnameValidate(e.target.fname.value);
		this.lnameValidate(e.target.lname.value);
		this.emailValidate(e.target.email.value);

		if (
			!this.state.fnameError &&
			!this.state.lnameError &&
			!this.state.emailError
		) {
			const studentData = {
				fname: e.target.fname.value,
				lname: e.target.lname.value,
				email: e.target.email.value
			};

			await this.props.addStudentToClassroom(this.state.classId, studentData);
			await this.props.handleClose();
			await this.props.loadStudents(this.props.classId);
		}
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
