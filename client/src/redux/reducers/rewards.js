import {
	START_GET_ALL_REWARDS,
	GET_ALL_REWARDS,
	ERROR_GET_ALL_REWARDS,
	GET_ONE_REWARD,
	ADD_REWARD,
	UPDATE_REWARD,
	REDEEM_REWARD,
	REMOVE_REWARD
} from "../actions/rewards";

export const rewardInitState = {
	isFetching: true,
	error: null,
	list: []
};

const rewards = (state = rewardInitState, action) => {
	if (!action) {
		console.error("action = ", action);
		return state;
	}
	switch (action.type) {
		case START_GET_ALL_REWARDS:
			return {
				...state,
				isFetching: true
			};
		case GET_ALL_REWARDS:
			return {
				isFetching: false,
				error: null,
				list: action.data
			};
		case ERROR_GET_ALL_REWARDS:
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		case GET_ONE_REWARD:
			//UNTESTED
			const newRewards = state.list
				.filter(reward => reward._id !== action.data._id)
				.push(action.data);
			return {
				...state,
				list: newRewards
			};
		case ADD_REWARD:
			//UNTESTED
			return {
				...state,
				list: [...state.list, action.data]
			};
		case UPDATE_REWARD:
			return {
				...state,
				list: state.map(
					reward =>
						action.data.id === reward._id ? action.data.reward : reward
				)
			};
		case REMOVE_REWARD:
			return {
				...state,
				list: state.list.filter(reward => reward._id !== action.data)
			};
		default:
			return state;
	}
};
export default rewards;
