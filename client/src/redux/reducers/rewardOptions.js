import {
	START_GET_ALL_REWARD_OPTIONS,
	GET_ALL_REWARD_OPTIONS,
	ERROR_GET_ALL_REWARD_OPTIONS
} from "../actions/rewardOptions";

export const rewardOptionsInitState = {
	isFetching: true,
	error: null,
	options: []
};

export const rewardOptions = (state = rewardOptionsInitState, action) => {
	switch (action.type) {
		case START_GET_ALL_REWARD_OPTIONS:
			return {
				...state,
				isFetching: true
			};
		case GET_ALL_REWARD_OPTIONS:
			return {
				isFetching: false,
				error: null,
				options: action.data
			};
		case ERROR_GET_ALL_REWARD_OPTIONS:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};

export default rewardOptions;
