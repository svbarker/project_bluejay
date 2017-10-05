import React, { Component } from "react";
import StudentTaskListMenuCard from "./StudentTaskListMenuCard";
import "../styles/TaskList.css";

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="task-container">
        <h2>Tasks</h2>
        {!this.props.tasks.length ? null : (
          this.props.tasks.map(task => <StudentTaskListMenuCard task={task} />)
        )}
      </div>
    );
  }
}

export default TaskList;
