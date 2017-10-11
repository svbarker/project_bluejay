import React, { Component } from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TaskCard from "./TTaskCard";
import CreateTaskModal from "./TCreateTaskModal";
import "../../Styles/TaskList.css";

//removed menucard container
//TODO: refactor this (Eric's) nonsense
const TaskList = props => {
	const {
		teacherId,
		name,
		tasks,
		students,
		hydrateStudentList,
		deleteTask,
		handleOpen,
		handleClose,
		open
	} = props;
	let taskCards;
	if (tasks.length) {
		//tasks aren't populated with student info
		//so insert pass the appropriate students down as props
		taskCards = tasks.map(task => {
			const studentsAssignedTask = task.students.map(studentOrId => {
				//NOTE:
				//at some points the redux store has task.students as ids
				//at others it has them populated, so we do this.... or everything blows up
				let studentId = studentOrId._id || studentOrId;
				return students.find(student => student._id === studentId);
			});
			return (
				<TaskCard
					unAssignAll={students => {
						props.unAssignAll(task, students);
					}}
					unAssignOne={student => {
						props.unAssignOne(task, student);
					}}
					allRewards={props.allRewards}
					onRemoveReward={rewardId => props.onRemoveReward(task, rewardId)}
					onAddReward={rewardId => props.onAddReward(task, rewardId)}
					deleteTask={() => props.deleteTask(task._id)}
					editTask={props.editTask}
					hydrateStudentList={() => hydrateStudentList(task)}
					students={studentsAssignedTask}
					key={task._id}
					task={task}
				/>
			);
		});
	} else {
		taskCards = null;
	}

	return (
		<div className="task-container-outer">
			<h1>Your Tasks</h1>
			<Paper
				className="dashboard-menu"
				style={{
					padding: "4px",
					borderRadius: "20px"
				}}
				zDepth={5}
				rounded={true}
			>
				<div
					className="task-container"
					style={{
						border: "5px dashed #ccc",
						borderRadius: "20px"
					}}
				>
					<RaisedButton
						icon={<i className="fa fa-plus" />}
						label="Create Task"
						onClick={handleOpen}
					/>
					<br />
					<br />
					{taskCards}
				</div>
			</Paper>
			<CreateTaskModal
				open={open}
				handleClose={handleClose}
				teacherId={teacherId}
			/>
		</div>
	);
};

export default TaskList;
