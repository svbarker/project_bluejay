import React, { Component } from "react";
import Paper from "material-ui/Paper";
import STaskListMenuCard from "./STaskListMenuCard";
import "../../Styles/TaskList.css";

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
    <div>
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
            <h2>Assigned Tasks</h2>
            {!assignedTasks.length ? (
              <p>No Assigned Tasks</p>
            ) : (
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
          </div>
        </Paper>
      </div>
      <div className="task-container-outer">
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
            <h2>Completed Tasks</h2>
            {!completedTasks.length ? (
              <p>No Completed Tasks...Go GET BUSY!</p>
            ) : (
              completedTasks.map(task => (
                <div key={task._id}>
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
      <div className="task-container-outer">
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
            <h2>Rejected Tasks</h2>
            {!rejectedTasks.length ? (
              <p>No Rejected Tasks</p>
            ) : (
              rejectedTasks.map(task => (
                <div key={task._id}>
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
    </div>
  );
};

export default TaskList;
