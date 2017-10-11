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

	//when the edit modal sends an edit add the reward id
	onSubmit = rewardUpdates =>
		this.props.editTask(this.props.reward._id, rewardUpdates);

	//what is this
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
					title={title}
					style={{
						backgroundColor: "#96cd28"
					}}
					iconStyle={{ color: "white" }}
					titleStyle={{ color: "white", fontWeight: "bold" }}
					onClick={this.hydrateList}
				/>
				<CardText expandable={true}>
					<Paper style={{ padding: "20px" }}>
						<Editable
							onSubmit={text => {
								this.onEditReward(text, _id, "description");
							}}
							text={description || "None"}
							label={"description"}
							multiLine={true}
							fullWidth={true}
						>
							<p>
								Description: {description || "None"}
							</p>
						</Editable>
						<p>
							Kind of reward: {cost ? "Loot" : "Point"}
						</p>
						<Editable
							onSubmit={text => {
								this.onEditReward(text, _id, "cost");
							}}
							text={cost || "None"}
							label={"Cost"}
						>
							<p>
								Cost: {cost || value || "None"}
							</p>
						</Editable>

						<p>
							Available: {available ? "YES" : "NO"}
						</p>
						<p>
							Supply: {supply || "Unlimited"}
						</p>
						<Undoable resolve={() => this.props.removeReward(_id)}>
							<RaisedButton label="delete" />
						</Undoable>
						<RaisedButton
							onClick={() => this.onToggleAvailability(this.props.reward)}
							label={available ? "Make Unavailable" : "Make Available"}
						/>
					</Paper>
				</CardText>
			</Card>
		);
	}
}

export default RewardCard;
