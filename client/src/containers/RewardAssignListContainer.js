import React from "react";
import { connect } from "react-redux";

import RewardAssignList from "../components/RewardAssignList";

import { getAllRewards } from "../actions/rewards";

const mapStateToProps = state => {
	return {
		userId: state.user.id,
		rewards: state.rewards
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
