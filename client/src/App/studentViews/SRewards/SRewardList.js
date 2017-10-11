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
import {
	purchaseReward,
	createReward,
	getAllRewards,
	editReward,
	deleteReward
} from "../../../redux/actions/rewards";
import { getStudentRewardOptions } from "../../../redux/actions/rewardOptions";
import { loginTeacher, loginStudent } from "../../../redux/actions/index";

class StudentRewardList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingRewards: false,
			loading: true
		};
	}
	onPurchase = rewardId => {
		this.props.purchaseReward(this.props.user.id, rewardId);
	};

	async componentDidMount() {
		//grab all the rewards
		await this.props.getStudentRewardOptions(this.props.classrooms);
		this.setState({
			fetchingRewards: false,
			loading: false
		});
	}

	render = () => {
		if (this.state.loading) {
			return <LoadScreen />;
		}

		const rewardOptions = this.props.rewardOptions.map(reward => {
			return (
				<SRewardCard
					reward={reward}
					points={this.props.user.points}
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
		user: state.user,
		rewards: state.rewards,
		classrooms: state.classrooms,
		rewardOptions: state.rewardOptions
	};
};
const mapDispatchToProps = dispatch => {
	return {
		createReward: teacher => {
			dispatch(createReward(teacher));
		},
		fetchRewards: (userId, userKind) => {
			dispatch(getAllRewards(userId, userKind));
		},
		removeReward: rewardId => {
			dispatch(deleteReward(rewardId));
		},
		updateReward: (id, editedReward) => {
			dispatch(editReward(id, editedReward));
		},
		getStudentRewardOptions: classrooms => {
			dispatch(getStudentRewardOptions(classrooms));
		},
		purchaseReward: (studentId, rewardId) => {
			dispatch(purchaseReward(studentId, rewardId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentRewardList);
