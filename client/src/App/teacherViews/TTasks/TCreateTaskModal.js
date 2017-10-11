import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../../../redux/actions/task";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

class CreateTaskModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rewards: [],
			selectedReward: null
		};
	}

	handleCreateTask = async e => {
		e.preventDefault();
		const params = {
			title: e.target.title.value,
			description: e.target.description.value,
			teacher: this.props.teacherId,
			rewards: this.state.rewards,
			classroom: []
		};
		await this.props.createTask(params);
		this.setState({ rewards: [], selectedReward: null });
		this.props.handleClose();
	};

	handleSelectChange = (e, i, value) => {
		this.setState({ selectedReward: value });
	};

	addReward = () => {
		this.setState({
			rewards: [...this.state.rewards, this.state.selectedReward],
			selectedReward: null
		});
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
							{!this.state.rewards.length ? null : (
								this.state.rewards.map(reward => <p>{reward.title}</p>)
							)}
							<div>
								<SelectField
									floatingLabelText="Choose a reward"
									onChange={this.handleSelectChange}
									value={this.state.selectedReward}
									id="title"
								>
									{this.props.rewards.map(reward => (
										<MenuItem
											key={reward._id}
											value={reward}
											primaryText={reward.title}
										/>
									))}
								</SelectField>
								<FloatingActionButton
									mini={true}
									backgroundColor="#96CD28"
									onClick={this.addReward}
								>
									<ContentAdd />
								</FloatingActionButton>
							</div>
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
