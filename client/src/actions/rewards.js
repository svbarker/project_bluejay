export const GET_ALL_REWARDS = "GET_ALL_REWARDS";
export const GET_ONE_REWARD = "GET_ONE_REWARD";
export const ADD_REWARD = "ADD_REWARD";
export const UPDATE_REWARD = "UPDATE_REWARD";
export const REMOVE_REWARD = "REMOVE_REWARD";

export const getRewards = data => ({
	type: GET_ALL_REWARDS,
	data: data
});

const addReward = data => ({
	type: ADD_REWARD,
	data: data
});

const updateReward = (id, data) => ({
	type: UPDATE_REWARD,
	data: {
		id: id,
		reward: data
	}
});

const removeReward = id => ({
	type: REMOVE_REWARD,
	data: id
});
