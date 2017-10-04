import React from "react";
import Paper from "material-ui/Paper";

const StudentCard = ({ student }) => {
	return (
		<Paper>
			<i class="fa fa-user-circle-o" aria-hidden="true" />
			<h3>{student.displayName}</h3>
		</Paper>
	);
};
