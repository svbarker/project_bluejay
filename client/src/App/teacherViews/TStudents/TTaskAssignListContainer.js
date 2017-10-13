import React from "react";
import { connect } from "react-redux";

import TaskAssignList from "./TTaskAssignList";

import { hydrateTeacherTasks } from "../../../redux/actions/task";

const mapStateToProps = state => {
	return {
		userId: state.user.id,
		isFetching: state.tasks.isFetching,
		tasks: state.tasks.list
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
