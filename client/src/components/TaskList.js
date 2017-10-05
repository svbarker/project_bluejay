import React, { Component } from "react";
import MenuCard from "./MenuCard";
import "../styles/TaskList.css";

const TaskList = props => (
  <div className="task-container">
    <h2>Tasks</h2>
    {!props.tasks.length ? null : (
      props.tasks.map(task => <MenuCard task={task} />)
    )}
  </div>
);

export default TaskList;
