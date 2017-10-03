import React, { Component } from "react";
import MenuCard from "./MenuCard";
import "../styles/TaskList.css";

class TaskList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.hydrateTasks(this.props.userId);
	}

	render() {
		return (
			<div className="task-container">
				<h2>Tasks</h2>
				{!this.props.tasks.length ? null : (
					this.props.tasks.map(task => <MenuCard task={task} />)
				)}
			</div>
		);
	}
}

export default TaskList;
