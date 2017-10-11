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
			<Dialog title="Create a task" open={this.props.open} modal={true}>
				<form
					onSubmit={this.handleCreateTask}
					className="create-task-container"
				>
					<div>
						<TextField id="title" floatingLabelText="Title" />
						<br />
						<TextField
							id="description"
							floatingLabelText="Description"
							multiLine={true}
							rows={3}
						/>
					</div>
					<div>
						<h3>Rewards</h3>
						<div>
							<span>Things will go here</span>
						</div>
						<RaisedButton type="submit" label="Create" />
						<RaisedButton label="Cancel" onClick={this.props.handleClose} />
					</div>
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
