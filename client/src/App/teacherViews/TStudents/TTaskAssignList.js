import React, { Component } from "react";
import Assignable from "./TAssignable";
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
				<Card style={{ backgroundColor: "#85dcdc" }}>
					<CardHeader
						actAsExpander={true}
						showExpandableButton={true}
						style={{
							backgroundColor: "#1a8484"
						}}
						iconStyle={{ color: "white" }}
						title="Tasks"
						titleStyle={{
							color: "white",
							fontWeight: "bold",
							fontSize: "16px"
						}}
					/>
					<CardText expandable={true}>
						<div className="card-container">
							{this.props.tasks.map(task => {
								return (
									<Assignable key={task._id} resource={task} type="tasks" />
								);
							})}
						</div>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default TaskAssignList;
