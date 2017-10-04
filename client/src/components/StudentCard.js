import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { DropTarget } from "react-dnd";

const assignTask = async (studentId, assignableId, type) => {
	const response = await fetch(
		`/api/${type}/${assignableId}/assign/${studentId}`,
		{
			method: "PATCH",
			credentials: "include"
		}
	);
	return await response.json();
};

const studentTarget = {
	drop(props, monitor) {
		assignTask(props.student._id, monitor.getItem().id, monitor.getItem().type);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class StudentCard extends Component {
	constructor() {
		super();
	}

	render() {
		const { connectDropTarget, isOver } = this.props;
		const highlighted = isOver ? "highlighted" : "";
		return connectDropTarget(
			<div>
				<Paper>
					<div className={`student-card ${highlighted}`}>
						<i className="fa fa-user-circle-o" aria-hidden="true" />
						<h4>{this.props.student.profile.displayName}</h4>
					</div>
				</Paper>
			</div>
		);
	}
}

export default DropTarget("assignable", studentTarget, collect)(StudentCard);
