import { startRequest, endRequest } from "./index";
export const START_GET_ALL_REWARD_OPTIONS = "START_GET_ALL_REWARD_OPTIONS";
export const GET_ALL_REWARD_OPTIONS = "GET_ALL_REWARD_OPTIONS";
export const ERROR_GET_ALL_REWARD_OPTIONS = "ERROR_GET_ALL_REWARD_OPTIONS";

export const startGetAllRewardOptions = () => {
	return {
		type: START_GET_ALL_REWARD_OPTIONS
	};
};

export const getAllRewardOptions = options => {
	return {
		type: GET_ALL_REWARD_OPTIONS,
		data: options
	};
};

export const errorGetAllRewardOptions = error => {
	return {
		type: ERROR_GET_ALL_REWARD_OPTIONS,
		error
	};
};

//get all the rewards for a student that their teachers are offering
// //get all the rewards a student could ever choose from
export const getStudentRewardOptions = () => async dispatch => {
	dispatch(startGetAllRewardOptions());

	try {
		let response = await fetch(`/api/rewards/rewardOptions`, {
			credentials: "include",
			method: "GET"
		});
		response = await response.json();
		dispatch(getAllRewardOptions(response.apiData));
	} catch (e) {
		console.error(e);
		dispatch(errorGetAllRewardOptions(e));
	}
};
