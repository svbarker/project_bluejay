import React from "react";
import { connect } from "react-redux";

import TaskList from "./STaskList";

import { hydrateStudentTasks, completeTask } from "../../../redux/actions/task";

class StudentTaskListContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.hydrateTasks(this.props.user.id);
  }

  render() {
    return (
      <TaskList
        userId={this.props.user.id}
        tasks={this.props.tasks}
        hydrateTasks={this.props.hydrateTasks}
        markCompleted={this.props.markCompleted}
        user={this.props.user}
        socket={this.props.socket}
      />
    );
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
      dispatch(hydrateStudentTasks(id));
    },
    markCompleted: (s_id, t_id, socket) => {
      dispatch(completeTask(s_id, t_id, socket));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StudentTaskListContainer
);
