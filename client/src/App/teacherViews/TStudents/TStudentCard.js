import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { DropTarget } from "react-dnd";
import { assignTask } from "../../../redux/actions/task";
import { distributeReward } from "../../../redux/actions/rewards";
import { connect } from "react-redux";
// import store from "../../../store";

const assign = (teacherId, studentId, assignableId, type) => {
	console.log("Type: ", type);
	if (type === "tasks") {
		return assignTask(teacherId, studentId, assignableId)();
	} else if (type === "rewards") {
		return distributeReward(teacherId, studentId, assignableId)();
	}
};

const studentTarget = {
	drop(props, monitor) {
		return {
			result: assign(
				props.teacherId,
				props.student._id,
				monitor.getItem().id,
				monitor.getItem().type
			),
			name: props.student.profile.displayName
		};
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
				<Paper
					zDepth={2}
					style={{
						height: "100%",
						borderRadius: "1em",
						border: highlighted ? "5px dashed #960d0d" : "5px solid #085a5a"
					}}
				>
					<div className={`student-card ${highlighted}`}>
						<i className="fa fa-user-circle-o" aria-hidden="true" />
						<h4>
							{this.props.student.profile.displayName}
						</h4>
					</div>
				</Paper>
			</div>
		);
	}
}

export default DropTarget("assignable", studentTarget, collect)(StudentCard);
