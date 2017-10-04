import React from "react";
import StudentListContainer from "../containers/StudentListContainer";
import TaskAssignListContainer from "../containers/TaskAssignListContainer";
import RewardAssignListContainer from "../containers/RewardAssignListContainer";

const StudentView = () => {
	return (
		<div className="student-view-container">
			<StudentListContainer />
			<div>
				<TaskAssignListContainer />
				<RewardAssignListContainer />
			</div>
		</div>
	);
};

export default StudentView;
