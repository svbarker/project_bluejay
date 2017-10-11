import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

const BUTTON_MARK_COMPLETED_TEXT = "Mark Completed";
const BUTTON_PENDING_TEXT = "Pending Teacher Approval";
class StudentTaskListMenuCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			label: props.task.pending
				? BUTTON_PENDING_TEXT
				: BUTTON_MARK_COMPLETED_TEXT,
			visible: true,
			disabled: props.task.pending
		};
	}
	componentDidMount() {
		///
	}
	render() {
		const { title, value, description, classroom, _id } = this.props.task;
		const { markCompleted, user, socket } = this.props;

		return (
			<Card style={{ marginBottom: "20px", backgroundColor: "#85DCDC" }}>
				<CardHeader
					actAsExpander={true}
					showExpandableButton={true}
					title={title}
					style={{
						backgroundColor: "#1a8484"
					}}
					iconStyle={{ color: "white" }}
					titleStyle={{ color: "white", fontWeight: "bold" }}
				/>
				<CardText expandable={true}>
					<Paper style={{ padding: "20px" }}>
						<div className="menu-card-container">
							<p>
								{description}
							</p>
							{this.props.task.status !== "CompletedTask"
								? <div className="menu-card-button-container">
										<FlatButton
											disabled={this.state.disabled}
											label={this.state.label}
											style={{ color: "rgb(255,255,255)" }}
											onClick={() => {
												if (!this.state.disabled)
													markCompleted(user.id, _id, socket);
												this.setState({
													label: BUTTON_PENDING_TEXT,
													disabled: true
												});
											}}
											backgroundColor="#1a8484"
											hoverColor="#3ca6a6"
										/>
									</div>
								: ""}
						</div>
					</Paper>
				</CardText>
			</Card>
		);
	}
}

export default StudentTaskListMenuCard;
