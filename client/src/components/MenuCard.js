import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";

import StudentsModal from "../components/StudentModal";

const style = {
	display: "flex",
	justifyContent: "space-between"
};

const MenuNav = () => {
	return (
		<div style={style}>
			<p>Task Name Here</p>
			<p>Points Here</p>
		</div>
	);
};

class MenuCard extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		///
	}
	render() {
		//change this to grab this.props.tasks later
		const { title, points } = this.props.task;
		return (
			<Card>
				<CardHeader actAsExpander={true} showExpandableButton={true}>
					<div style={style}>
						<p>{title}</p>
						<p>{points}</p>
					</div>
				</CardHeader>
				<CardText expandable={true}>
					<div style={style}>
						<p>Such task descriptions here.[insert descriptions later]</p>
						<StudentsModal />
					</div>
				</CardText>
			</Card>
		);
	}
}

export default MenuCard;
