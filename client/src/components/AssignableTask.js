import React from "react";
import Paper from "material-ui/Paper";

const AssignableTask = ({ task }) => {
	return (
		<Paper>
			<div className="task-card">
				<h4>{task.title}</h4>
				<p>{task.description}</p>
			</div>
		</Paper>
	);
};

export default AssignableTask;
