import React from "react";
import StudentListContainer from "../containers/StudentListContainer";
import TaskAssignListContainer from "../containers/TaskAssignListContainer";

const StudentView = () => {
	return (
		<div className="student-view-container">
			<StudentListContainer />
			<TaskAssignListContainer />
		</div>
	);
};

export default StudentView;
