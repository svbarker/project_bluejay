import { GET_ALL_REWARD_OPTIONS } from "../actions/rewardOptions";

export const rewardOptionsInitState = [];

export const rewardOptions = (state = rewardOptionsInitState, action) => {
  switch (action.type) {
    case GET_ALL_REWARD_OPTIONS:
      return action.data;
    default:
      return state;
  }
};

export default rewardOptions;
