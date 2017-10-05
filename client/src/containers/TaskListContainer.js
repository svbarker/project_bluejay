import React from "react";
import { connect } from "react-redux";

import TaskList from "../components/TaskList";

import { hydrateTeacherTasks } from "../actions/task";

class TaskListContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.hydrateTasks(this.props.userId);
  }

  render() {
    return <TaskList tasks={this.props.tasks} />;
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    hydrateTasks: id => {
      dispatch(hydrateTeacherTasks(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
