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
			{!submitError
				? null
				: <span>
						{submitError}
					</span>}
			<form onSubmit={handleSubmit}>
				<TextField
					floatingLabelText="First Name"
					errorText={fnameError}
					id="fname"
					onBlur={validate}
				/>
				<TextField
					floatingLabelText="Last Name"
					id="lname"
					errorText={lnameError}
					onBlur={validate}
				/>
				<TextField
					floatingLabelText="Email"
					id="email"
					errorText={emailError}
					onBlur={validate}
				/>
				<div>
					<RaisedButton type="submit" label="Add Student" />
					<RaisedButton label="Cancel" onClick={handleClose} />
				</div>
			</form>
		</Dialog>
	);
};

export default AddStudentModal;
