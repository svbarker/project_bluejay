import React from "react";
import { connect } from "react-redux";

import StudentTaskList from "../components/StudentTaskList";

import { hydrateStudentTasks, completeTask } from "../actions/task";

class StudentTaskListContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.hydrateTasks(this.props.user.id);
  }

  render() {
    return (
      <StudentTaskList
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
