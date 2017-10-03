import React, { Component } from "react";
// import { List } from "material-ui/List";
import Task from "./Task";

class TaskList extends Component {
  render() {
    return (
      <div className="task-container">
        {this.props.tasks.map(task => <Task task={task} />)}
      </div>
    );
  }
}

export default TaskList;
