//TODO: SPLIT THIS UP INTO ONE CONTAINER AND TWO COMPONENTS

import React from "react";
import { connect } from "react-redux";

//components
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Undoable from "../../GlobalComponents/Undoable";
import LoadScreen from "../../GlobalComponents/LoadScreen";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import "../../Styles/RewardList.css";
import SRewardCard from "./SRewardCard";

//actions
import { purchaseReward } from "../../../redux/actions/rewards";
import { getStudentRewardOptions } from "../../../redux/actions/rewardOptions";
import { loginStudent } from "../../../redux/actions/index";

class StudentRewardList extends React.Component {
	constructor(props) {
		super(props);
	}
	onPurchase = rewardId => {
		this.props.purchaseReward(this.props.userId, rewardId);
	};

	async componentDidMount() {
		//grab all the rewards
		await this.props.getStudentRewardOptions(this.props.classrooms);
	}

	render = () => {
		// if (this.state.loading) {
		// 	return <LoadScreen />;
		// }

		const rewardOptions = this.props.rewardOptions.map(reward => {
			return (
				<SRewardCard
					key={reward._id}
					reward={reward}
					points={this.props.userPoints}
					onPurchase={this.onPurchase}
				/>
			);
		});
		return (
			<div className="reward-container-outer">
				<h1>Rewards Available for Purchase</h1>
				<Paper
					className="dashboard-menu"
					style={{
						padding: "4px",
						borderRadius: "20px"
					}}
					zDepth={5}
					rounded={true}
				>
					<div
						className="reward-container"
						style={{
							border: "5px dashed #ccc",
							borderRadius: "20px"
						}}
					>
						<h2>Current Rewards</h2>
						<List className="reward-list">
							{rewardOptions}
						</List>
					</div>
				</Paper>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		classrooms: state.classrooms,
		rewardOptions: state.rewardOptions
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getStudentRewardOptions: classrooms => {
			dispatch(getStudentRewardOptions(classrooms));
		},
		purchaseReward: (studentId, rewardId) => {
			dispatch(purchaseReward(studentId, rewardId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentRewardList);
