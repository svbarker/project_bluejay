import React, { Component } from "react";
import Paper from "material-ui/Paper";
import MenuCard from "./MenuCard";
import "../styles/TaskList.css";

const TaskList = ({ name, tasks }) => (
	<div className="task-container-outer">
		<Paper>
			<div className="task-container">
				<h2>{name}'s Tasks</h2>
				{!tasks.length ? null : tasks.map(task => <MenuCard task={task} />)}
			</div>
		</Paper>
	</div>
);

export default TaskList;
