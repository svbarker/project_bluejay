import React, { Component } from "react";
import Assignable from "./Assignable";
import { Card, CardHeader, CardText } from "material-ui/Card";

class RewardAssignList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.getRewards(this.props.userId);
	}

	render() {
		return (
			<div>
				<h2>Rewards</h2>
				<Card>
					<CardHeader
						actAsExpander={true}
						showExpandableButton={true}
						style={{
							"background-color": "#96cd28"
						}}
						title="Rewards"
						titleStyle={{
							"font-weight": "bold",
							"font-size": "16px"
						}}
					/>
					<CardText expandable={true}>
						<div className="reward-card-container">
							{this.props.rewards.map(reward => {
								return <Assignable resource={reward} />;
							})}
						</div>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default RewardAssignList;
