import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import Register from "./Register";

class RegisterContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: ""
		};
	}

	handleChange = (e, i, value) => {
		this.setState({ selectValue: value });
	};

	handleRegister = e => {
		e.preventDefault();
		const params = {
			email: e.target.email.value,
			password: e.target.password.value,
			title: this.state.selectValue,
			fname: e.target.fname.value,
			lname: e.target.lname.value
		};

		console.log("params received ", e.target.fname.value);
		console.log("my props: ", this.props);

		this.props.registerUser(params, this.props.socket);
	};

	render() {
		return (
			<Register
				handleRegister={this.handleRegister}
				handleChange={this.handleChange}
				selectValue={this.state.selectValue}
			/>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	...ownProps,
	registerUser: (params, socket) => {
		dispatch(registerUser(params, socket));
	}
});

export default connect(null, mapDispatchToProps)(RegisterContainer);
