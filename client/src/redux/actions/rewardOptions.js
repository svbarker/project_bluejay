import { startRequest, endRequest } from "./index";
export const GET_ALL_REWARD_OPTIONS = "GET_ALL_REWARD_OPTIONS";

export const getAllRewardOptions = options => {
  return {
    type: GET_ALL_REWARD_OPTIONS,
    data: options
  };
};

//get all the rewards for a student that their teachers are offering
// //get all the rewards a student could ever choose from
export const getStudentRewardOptions = () => async dispatch => {
  try {
    let response = await fetch(`/api/rewards/rewardOptions`, {
      credentials: "include",
      method: "GET"
    });
    response = await response.json();
    dispatch(getAllRewardOptions(response.apiData));
  } catch (e) {
    console.error(e);
    // dispatch(endRequest(e));
  }
};
