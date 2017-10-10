import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const assignTask = async (teacherId, classId, assignableId, type) => {
	if (type === "tasks") {
		const response = await fetch(
			`/api/teachers/${teacherId}/classroom/${classId}/assign/${assignableId}`,
			{
				method: "PATCH",
				credentials: "include"
			}
		);
		return await response.json();
	} else if (type === "rewards") {
		const response = await fetch(
			`/api/teachers/${teacherId}/classroom/${classId}/distribute`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					rewards: [assignableId]
				})
			}
		);
		return await response.json();
	}
};

const classTarget = {
	drop(props, monitor) {
		return {
			result: assignTask(
				props.teacherId,
				props.currentClass._id,
				monitor.getItem().id,
				monitor.getItem().type
			),
			name: props.currentClass.title
		};
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
console.log("Class target: ", classTarget);
export default DropTarget("assignable", classTarget, collect)(ClassAssign);
