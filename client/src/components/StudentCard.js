import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { DropTarget } from "react-dnd";

const studentTarget = {
	drop(props) {
		console.log("I got dropped!");
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
		return connectDropTarget(
			<div>
				<Paper>
					<div className="student-card">
						<i className="fa fa-user-circle-o" aria-hidden="true" />
						<h4>{this.props.student.profile.displayName}</h4>
					</div>
				</Paper>
			</div>
		);
	}
}

export default DropTarget(["task", "reward"], studentTarget, collect)(
	StudentCard
);
