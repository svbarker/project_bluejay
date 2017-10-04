import React from "react";
import { connect } from "react-redux";

import StudentTaskList from "../components/StudentTaskList";

import { hydrateStudentTasks } from "../actions/task";

class StudentTaskListContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.hydrateTasks(this.props.userId);
  }

  render() {
    return (
      <StudentTaskList
        userId={this.props.userId}
        tasks={this.props.tasks}
        hydrateTasks={this.props.hydrateTasks}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    tasks: state.tasks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    hydrateTasks: id => {
      dispatch(hydrateStudentTasks(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StudentTaskListContainer
);
