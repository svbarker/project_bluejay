import React, { Component } from "react";

class TaskList extends Component {
	render() {
		return (
			<div className="task-container">
				{this.props.tasks.map(task => <Task task={task} />)}
			</div>
		);
	}
}

export default TaskList;
