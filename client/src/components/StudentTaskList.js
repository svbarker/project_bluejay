import React, { Component } from "react";
import StudentTaskListMenuCard from "./StudentTaskListMenuCard";
import "../styles/TaskList.css";

const TaskList = props => (
  <div className="task-container">
    <h2>Tasks</h2>
    {!props.tasks.length ? null : (
      props.tasks.map(task => <StudentTaskListMenuCard task={task} />)
    )}
  </div>
);

export default TaskList;
