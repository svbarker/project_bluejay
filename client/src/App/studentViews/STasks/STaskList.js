import React, { Component } from "react";
import Paper from "material-ui/Paper";
import STaskListMenuCard from "./STaskListMenuCard";
import "../../Styles/TaskList.css";
import RaisedButton from "material-ui/RaisedButton";

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

  let page;
  let navigateTo = props.navigateTo;

  switch (props.selected) {
    case "Assigned":
      page = (
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
              <p>None</p>
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
      );
      break;
    case "Completed":
      page = (
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
              <p>None</p>
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
      );
      break;
    case "Rejected":
      page = (
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
              <p>None</p>
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
      );
      break;
  }

  return (
    <div className="task-container-outer">
      <h1>{`${props.name}'s Tasks`}</h1>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center"
        }}
      >
        <RaisedButton
          disabled={props.selected === "Assigned"}
          onClick={navigateTo("Assigned")}
          backgroundColor={"rgba( 26,132,132,1)"}
          style={{ margin: "20px 20px" }}
          labelColor={"white"}
          label={"Assigned"}
        />
        <RaisedButton
          disabled={props.selected === "Completed"}
          onClick={navigateTo("Completed")}
          backgroundColor={"rgba(150,205, 40,1)"}
          style={{ margin: "20px 20px" }}
          labelColor={"white"}
          label={"Completed"}
        />
        <RaisedButton
          disabled={props.selected === "Rejected"}
          onClick={navigateTo("Rejected")}
          backgroundColor={"rgba(150,13,13,1)"}
          style={{ margin: "20px 20px" }}
          labelColor={"white"}
          label={"Rejected"}
        />
      </div>
      {page}
    </div>
  );
};

export default TaskList;
