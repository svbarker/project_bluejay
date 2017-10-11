import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Chip from "material-ui/Chip";

//actions
import { getAllRewards, redeemReward } from "../../../redux/actions/rewards";

const headingStyle = {
	color: "white",
	backgroundColor: "#97cb39",
	padding: "20px"
};

const ListItemStyle = {
	padding: "10px"
};

class SRewardsWallet extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount = () => {
		this.props.fetchRewards(this.props.userId, "Student");
	};
	render = () => {
		let pendingRewards;
		if (this.props.rewards.length) {
			pendingRewards = this.props.rewards.map(reward =>
				<ListItem style={ListItemStyle} hoverColor="#1a8484" key={reward._id}>
					<NavLink to="/rewards">
						<Chip>
							{reward.title}
						</Chip>
					</NavLink>
					<Chip
						onClick={this.props.redeemReward(this.props.userId, reward._id)}
					>
						Redeem
					</Chip>
				</ListItem>
			);
		} else {
			pendingRewards = <h3>You have no rewards.</h3>;
		}

		return (
			<div className="dashboard-container">
				<h1>Your Wallet</h1>
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
						className="dashboard-menu-inner"
						style={{
							border: "5px dashed #ccc",
							borderRadius: "20px"
						}}
					>
						{pendingRewards}
					</div>
				</Paper>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		rewards: state.rewards
	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchRewards: (userId, userKind) => {
			dispatch(getAllRewards(userId, userKind));
		},
		redeemReward: (s_id, id) => () => {
			dispatch(redeemReward(s_id, id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SRewardsWallet);
