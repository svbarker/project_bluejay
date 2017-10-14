import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
import "../Styles/Login.css";

const Login = ({
  validate,
  onSubmit,
  emailError,
  passwordError,
  submitError
}) => {
  return (
    <div className="login-container">
      <h3>
        Don't have an account?{" "}
        <Link to="/register">
          <FlatButton label="Sign Up" />
        </Link>
      </h3>
      <Paper
        style={{
          padding: "4px",

          borderRadius: "3em"
        }}
        zDepth={5}
        rounded={true}
      >
        <div
          style={{
            padding: "20px",
            border: "5px dashed #ccc",
            borderRadius: "3.1em"
          }}
        >
          <h2>Login to Continue</h2>

          <form onSubmit={onSubmit}>
            {!submitError ? null : <span>{submitError.message}</span>}
            <br />
            <TextField
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#1A8484" }}
              style={{ fontFamily: "Bree Serif" }}
              floatingLabelText="Email"
              type="email"
              id="email"
              errorText={emailError}
              onBlur={validate}
            />
            <br />
            <TextField
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#1A8484" }}
              style={{ fontFamily: "Bree Serif" }}
              floatingLabelText="Password"
              type="password"
              id="password"
              errorText={passwordError}
              onBlur={validate}
            />
            <br />
            <RaisedButton
              style={{
                borderRadius: "1em",
                marginTop: "2em"
              }}
              backgroundColor={"#1A8484"}
              labelColor="#FCFCFC"
              label="login"
              type="submit"
            />
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
