import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

const Register = ({
  onKeyDown,
  handleSubmit,
  handlePasswordChange,
  handleSelectChange,
  selectValue,
  validate,
  fnameError,
  lnameError,
  emailError,
  passwordError,
  passwordConfirmError,
  submitError
}) => {
  return (
    <div className="registration-container">
      <Paper style={{ padding: "20px" }}>
        <h2>Register your teacher account</h2>
        {!submitError ? null : (
          <span>A user with that email already exists.</span>
        )}
        <form
          className="registration-form-container"
          onSubmit={handleSubmit}
          onKeyDown={onKeyDown}
        >
          <div>
            <fieldset>
              <legend>Personal Information</legend>
              <TextField
                floatingLabelText="First Name"
                errorText={fnameError}
                id="fname"
                onBlur={validate}
              />
              <TextField
                floatingLabelText="Last Name"
                errorText={lnameError}
                id="lname"
                onBlur={validate}
              />
              <SelectField
                floatingLabelText="Title"
                onChange={handleSelectChange}
                value={selectValue}
                id="title"
              >
                <MenuItem value={"Miss"} primaryText="Miss" />
                <MenuItem value={"Mr."} primaryText="Mr." />
                <MenuItem value={"Mrs."} primaryText="Mrs." />
                <MenuItem value={"Ms."} primaryText="Ms." />
              </SelectField>
              <TextField
                type="email"
                floatingLabelText="Email"
                errorText={emailError}
                id="email"
                onBlur={validate}
              />
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
                errorText={passwordError}
                id="password"
                onChange={handlePasswordChange}
                onBlur={validate}
              />
              <TextField
                type="password"
                floatingLabelText="Confirm Password"
                errorText={passwordConfirmError}
                id="passwordConfirm"
                onBlur={validate}
              />
            </fieldset>
            <RaisedButton label="Create Account" type="submit" />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
