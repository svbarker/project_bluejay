import React from "react";
import { connect } from "react-redux";

import TaskList from "./STaskList";

import { hydrateStudentTasks, completeTask } from "../../../redux/actions/task";
import LoadScreen from "../../GlobalComponents/LoadScreen";

class StudentTaskListContainer extends React.Component {
	constructor() {
		super();

		this.state = {
			selected: "Assigned"
		};
	}

	componentDidMount() {
		this.props.hydrateTasks(this.props.user.id);
	}

	navigateTo = selected => () => {
		this.setState({
			selected
		});
	};

	render() {
		if (this.props.isFetching) {
			return <LoadScreen />;
		}
		return (
			<TaskList
				userId={this.props.user.id}
				tasks={this.props.tasks}
				hydrateTasks={this.props.hydrateTasks}
				markCompleted={this.props.markCompleted}
				user={this.props.user}
				socket={this.props.socket}
				selected={this.state.selected}
				navigateTo={this.navigateTo}
				name={this.props.name}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		isFetching: state.tasks.isFetching,
		tasks: state.tasks.list,
		name: state.user.displayName
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
