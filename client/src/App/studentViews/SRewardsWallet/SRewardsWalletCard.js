import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import Editable from "../../GlobalComponents/Editable";
import { Card, CardHeader, CardText } from "material-ui";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

class RewardCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			_id,
			title,
			value,
			description,
			classroom,
			cost,
			supply,
			available
		} = this.props.reward;
		return (
			<Card style={{ marginBottom: "20px" }}>
				<CardHeader
					actAsExpander={true}
					showExpandableButton={true}
					title={`(${cost || value || "None"}) ${title}`}
					style={{
						backgroundColor: "#96cd28"
					}}
					iconStyle={{ color: "white" }}
					titleStyle={{ color: "white", fontWeight: "bold" }}
				/>
				<CardText expandable={true}>
					<Paper style={{ padding: "20px" }}>
						<p>
							Description: {description || "None"}
						</p>
						<p>
							Kind of reward: {cost ? "Loot" : "Point"}
						</p>
						<p>
							Cost: {cost || value || "None"}
						</p>
						<p>
							Available: {available ? "YES" : "NO"}
						</p>
						<p>
							Supply: {supply || "Unlimited"}
						</p>
						<Undoable
							disabled={this.props.points < cost ? true : false}
							resolve={() => this.props.redeemReward(this.props.studentId, _id)}
							wait={2}
						>
							<FlatButton primary={true} label="redeem" />
						</Undoable>
					</Paper>
				</CardText>
			</Card>
		);
	}
}

export default RewardCard;
