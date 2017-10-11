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
import SRewardsWalletCard from "./SRewardsWalletCard";

//actions
import { getAllRewards, redeemReward } from "../../../redux/actions/rewards";
import { loginTeacher, loginStudent } from "../../../redux/actions/index";

class StudentRewardWallet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingRewards: false,
			loading: true
		};
	}

	async componentDidMount() {
		//grab all the rewards
		await this.props.fetchRewards(this.props.userId, "Student");
		this.setState({
			fetchingRewards: false,
			loading: false
		});
	}

	render = () => {
		if (this.state.loading) {
			return <LoadScreen />;
		}

		const rewards = this.props.rewards.map(reward => {
			return (
				<SRewardsWalletCard
					reward={reward}
					studentId={this.props.userId}
					redeemReward={this.props.redeemReward}
				/>
			);
		});
		return (
			<div className="reward-container-outer">
				<h1>Your Rewards</h1>
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
							{rewards}
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
		rewards: state.rewards
	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchRewards: (userId, userKind) => {
			dispatch(getAllRewards(userId, userKind));
		},
		redeemReward: (s_id, id) => {
			dispatch(redeemReward(s_id, id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	StudentRewardWallet
);
