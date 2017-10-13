import React from "react";
import { connect } from "react-redux";

import RewardAssignList from "./TRewardAssignList";

import { getAllRewards } from "../../../redux/actions/rewards";

const mapStateToProps = state => {
	return {
		userId: state.user.id,
		isFetching: state.rewards.isFetching,
		rewards: state.rewards.list
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getRewards: id => {
			dispatch(getAllRewards(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardAssignList);
