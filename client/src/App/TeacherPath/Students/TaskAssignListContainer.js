import React from "react";
import { connect } from "react-redux";

import TaskAssignList from "./TaskAssignList";

import { hydrateTeacherTasks } from "../../../redux/actions/task";

const mapStateToProps = state => {
  return {
    userId: state.user.id,
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskAssignList);
