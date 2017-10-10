import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const AddStudentModal = ({ open, handleClose, handleSubmit }) => {
	return (
		<Dialog
			modal={true}
			title="Add a Student"
			open={open}
			onRequestClose={handleClose}
			contentStyle={{ maxWidth: "400px", textAlign: "center" }}
		>
			<form onSubmit={handleSubmit}>
				<TextField floatingLabelText="First Name" id="fname" />
				<TextField floatingLabelText="Last Name" id="lname" />
				<TextField floatingLabelText="Email" id="email" />
				<div>
					<RaisedButton type="submit" label="Add Student" />
					<RaisedButton label="Cancel" onClick={handleClose} />
				</div>
			</form>
		</Dialog>
	);
};

export default AddStudentModal;
