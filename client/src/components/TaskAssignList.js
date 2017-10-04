import React, { Component } from "react";
import Assignable from "./Assignable";
import { Card, CardHeader, CardText } from "material-ui/Card";

class TaskAssignList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.hydrateTasks(this.props.userId);
	}

	render() {
		return (
			<div>
				<h2>Tasks</h2>
				<Card>
					<CardHeader
						actAsExpander={true}
						showExpandableButton={true}
						style={{
							"background-color": "#1a8484"
						}}
						iconStyle={{ color: "white" }}
						title="Tasks"
						titleStyle={{
							color: "white",
							"font-weight": "bold",
							"font-size": "16px"
						}}
					/>
					<CardText expandable={true}>
						<div className="task-card-container">
							{this.props.tasks.map(task => {
								return <Assignable resource={task} />;
							})}
						</div>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default TaskAssignList;
