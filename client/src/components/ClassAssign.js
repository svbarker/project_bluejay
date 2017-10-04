import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const assignTask = async (classId, assignableId, type) => {
	const response = await fetch(
		`/api/${type}/${assignableId}/assign/${classId}`,
		{
			method: "PATCH",
			credentials: "include"
		}
	);
	return await response.json();
};

const classTarget = {
	drop(props, monitor) {
		console.log("Got dropped!");
		// assignTask(
		// 	props.currentClass._id,
		// 	monitor.getItem().id,
		// 	monitor.getItem().type
		// );
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class ClassAssign extends Component {
	constructor() {
		super();
	}
	render() {
		const { connectDropTarget, isOver } = this.props;
		const highlighted = isOver ? "highlighted" : "";
		return connectDropTarget(
			<div className={`student-assign-all ${highlighted}`}>
				<span>Assign to Class</span>
			</div>
		);
	}
}

export default DropTarget("assignable", classTarget, collect)(ClassAssign);
