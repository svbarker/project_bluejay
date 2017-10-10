import React, { Component } from "react";
import Paper from "material-ui/Paper";
import STaskListMenuCard from "./STaskListMenuCard";
import "./STaskList.css";

const TaskList = props => {
	const assignedTasks = props.tasks.filter(
		task => task.status === "AssignedTask"
	);
	const completedTasks = props.tasks.filter(
		task => task.status === "CompletedTask"
	);
	const rejectedTasks = props.tasks.filter(
		task => task.status === "RejectedTask"
	);
	const paperStyle = {
		backgroundColor: "#eeeeee"
	};
	return (
		<Paper className="task-container-outer">
			<div className="task-container">
				<h1>{`${props.user.displayName}'s Tasks`}</h1>
				<div className="student-task-paper">
					<h2>Assigned Tasks</h2>
					{!assignedTasks.length
						? <p>No Assigned Tasks</p>
						: assignedTasks.map(task =>
								<STaskListMenuCard
									key={task._id}
									markCompleted={props.markCompleted}
									task={task}
									user={props.user}
									socket={props.socket}
								/>
							)}
				</div>
				<Paper style={paperStyle} className="student-task-paper">
					<h2>Completed Tasks</h2>
					{!completedTasks.length
						? <p>No Completed Tasks...Go GET BUSY!</p>
						: completedTasks.map(task =>
								<div key={task._id}>
									<STaskListMenuCard
										key={task.id}
										markCompleted={props.markCompleted}
										task={task}
										user={props.user}
										socket={props.socket}
									/>
								</div>
							)}
				</Paper>
				<Paper style={paperStyle} className="student-task-paper">
					<h2>Rejected Tasks</h2>
					{!rejectedTasks.length
						? <p>No Rejected Tasks</p>
						: rejectedTasks.map(task =>
								<div key={task._id}>
									<STaskListMenuCard
										key={task.id}
										markCompleted={props.markCompleted}
										task={task}
										user={props.user}
										socket={props.socket}
									/>
								</div>
							)}
				</Paper>
			</div>
		</Paper>
	);
};

export default TaskList;
