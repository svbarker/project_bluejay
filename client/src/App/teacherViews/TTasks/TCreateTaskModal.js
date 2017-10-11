import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../../../redux/actions/task";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class CreateTaskModal extends Component {
	constructor(props) {
		super(props);
	}

	handleCreateTask = async e => {
		e.preventDefault();
		const params = {
			title: e.target.title.value,
			description: e.target.description.value,
			teacher: this.props.teacherId,
			rewards: [],
			classroom: []
		};
		await this.props.createTask(params);
		this.props.handleClose();
	};

	render() {
		return (
			<Dialog open={this.props.open} modal={true}>
				<h2>Create a Task</h2>

				<form onSubmit={this.handleCreateTask}>
					<TextField id="title" floatingLabelText="Title" />
					<TextField id="description" floatingLabelText="Description" />

					<RaisedButton type="submit" label="Create" />
					<RaisedButton label="Cancel" onClick={this.props.handleClose} />
				</form>
			</Dialog>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	...ownProps,
	createTask: params => {
		dispatch(createTask(params));
	}
});

export default connect(null, mapDispatchToProps)(CreateTaskModal);
