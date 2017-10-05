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
    markCompleted: (s_id, t_id) => (s_id, t_id) => {
      dispatch(completeTask(s_id, t_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StudentTaskListContainer
);
