import React from "react";
import Paper from "material-ui/Paper";

const StudentCard = ({ student }) => {
	return (
		<Paper>
			<div className="student-card">
				<i class="fa fa-user-circle-o" aria-hidden="true" />
				<h3>{student.profile.displayName}</h3>
			</div>
		</Paper>
	);
};

export default StudentCard;
