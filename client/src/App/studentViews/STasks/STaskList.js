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
  return (
    <div className="task-container-outer">
      <Paper>
        <div className="task-container">
          <h2>{props.user.displayName}'s Tasks</h2>
          <h3>
            This page is actually working but seeded data doesnt match real data
          </h3>
          {!assignedTasks.length ? null : (
            assignedTasks.map(task => (
              <STaskListMenuCard
                key={task._id}
                markCompleted={props.markCompleted}
                task={task}
                user={props.user}
                socket={props.socket}
              />
            ))
          )}
          {!completedTasks.length ? null : (
            completedTasks.map(task => (
              <div key={task._id}>
                <h1>Completed Tasks</h1>
                <STaskListMenuCard
                  key={task.id}
                  markCompleted={props.markCompleted}
                  task={task}
                  user={props.user}
                  socket={props.socket}
                />
              </div>
            ))
          )}
          {!rejectedTasks.length ? null : (
            rejectedTasks.map(task => (
              <div key={task._id}>
                <h1>Rejected Tasks</h1>
                <STaskListMenuCard
                  key={task.id}
                  markCompleted={props.markCompleted}
                  task={task}
                  user={props.user}
                  socket={props.socket}
                />
              </div>
            ))
          )}
        </div>
      </Paper>
    </div>
  );
};

export default TaskList;
