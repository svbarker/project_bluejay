import React, { Component } from "react";
import { loginUser } from "../../redux/actions";
import { connect } from "react-redux";
import Login from "./Login";
import validator from "validator";
import { withRouter } from "react-router-dom";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: null,
      passwordError: null
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
    this.emailValidate(e.target.email.value);
    this.passwordValidate(e.target.password.value);

    if (!this.state.emailError && !this.state.passwordError) {
      const error = await this.props.loginUser(
        e.target.email.value,
        e.target.password.value,
        this.props.socket
      );
      if (this.props.firstLocation) {
        this.props.history.push(this.props.firstLocation);
      }
    }
  };

  render() {
    return (
      <Login
        validate={this.validate}
        onSubmit={this.handleSubmit}
        emailError={this.state.emailError}
        passwordError={this.state.passwordError}
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
  loginUser: (email, password, socket) => {
    dispatch(loginUser(email, password, socket));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
