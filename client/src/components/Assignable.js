import React from "react";
import Paper from "material-ui/Paper";

const Assignable = ({ resource }) => {
	return (
		<Paper>
			<div className="task-card">
				<h4>{resource.title}</h4>
				<p>{resource.description}</p>
			</div>
		</Paper>
	);
};

export default Assignable;
