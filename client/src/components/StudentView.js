import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StudentListContainer from "../containers/StudentListContainer";
import TaskAssignListContainer from "../containers/TaskAssignListContainer";
import RewardAssignListContainer from "../containers/RewardAssignListContainer";

const StudentView = () => {
	return (
		<div className="student-view-container">
			<StudentListContainer />
			<div className="assignables-container">
				<h2>Drag and drop to assign</h2>
				<TaskAssignListContainer />
				<RewardAssignListContainer />
			</div>
		</div>
	);
};

export default DragDropContext(HTML5Backend)(StudentView);
