import React, { Component } from "react";
import MenuCard from "./MenuCard";

class TaskList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log("task list props: ", this.props);
		this.props.hydrateTasks(this.props.userId);
	}

	render() {
		return (
			<div className="task-container">
				{!this.props.tasks.length ? null : (
					this.props.tasks.map(task => <MenuCard task={task} />)
				)}
				}
			</div>
		);
	}
}

export default TaskList;
