import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const AddStudentModal = ({
  open,
  handleClose,
  handleSubmit,
  validate,
  fnameError,
  lnameError,
  emailError,
  submitError
}) => {
  return (
    <Dialog
      modal={true}
      title="Add a Student"
      open={open}
      onRequestClose={handleClose}
      contentStyle={{ maxWidth: "400px", textAlign: "center" }}
    >
      {!submitError ? null : <span>{submitError}</span>}
      <form
        onSubmit={handleSubmit}
        style={{ border: "3px solid #960d0d", padding: "20px" }}
      >
        <TextField
          floatingLabelStyle={{ color: "grey" }}
          underlineFocusStyle={{ borderColor: "#960d0d" }}
          floatingLabelText="First Name"
          errorText={fnameError}
          id="fname"
          onBlur={validate}
        />
        <TextField
          floatingLabelStyle={{ color: "grey" }}
          underlineFocusStyle={{ borderColor: "#960d0d" }}
          floatingLabelText="Last Name"
          id="lname"
          errorText={lnameError}
          onBlur={validate}
        />
        <TextField
          floatingLabelStyle={{ color: "grey" }}
          underlineFocusStyle={{ borderColor: "#960d0d" }}
          floatingLabelText="Email"
          id="email"
          errorText={emailError}
          onBlur={validate}
        />
        <div>
          <RaisedButton
            style={{ margin: "10px" }}
            backgroundColor={"#1A8484"}
            labelColor={"white"}
            type="submit"
            label="Add Student"
          />
          <RaisedButton
            style={{ margin: "5px" }}
            backgroundColor={"#960d0d"}
            labelColor={"white"}
            label="Cancel"
            onClick={handleClose}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddStudentModal;
