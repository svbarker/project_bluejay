import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

import StudentModal from "../components/StudentModal";

// const MenuNav = () => {
// 	return (
// 		<div>
// 			<p>Task Name Here</p>
// 			<p>Points Here</p>
// 		</div>
// 	);
// };

class MenuCard extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		///
	}
	render() {
		//change this to grab this.props.tasks later
		const { title, value, description } = this.props.task;
		return (
			<Card>
				<CardHeader actAsExpander={true} showExpandableButton={true}>
					{title} {value}
				</CardHeader>
				<CardText expandable={true}>
					<div class="menu-card-container">
						<p>{description}</p>
						<div>
							<StudentModal />
						</div>
						<div className="menu-card-button-container">
							<FlatButton>Edit Task</FlatButton>
							<FlatButton>Delete Task</FlatButton>
						</div>
					</div>
				</CardText>
			</Card>
		);
	}
}

export default MenuCard;
