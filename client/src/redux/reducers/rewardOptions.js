import { GET_ALL_REWARD_OPTIONS } from "../actions/rewardOptions";
import { CLEAR_STORE } from "../actions/index";

export const rewardOptionsInitState = [];

export const rewardOptions = (state = rewardOptionsInitState, action) => {
  switch (action.type) {
    case CLEAR_STORE:
      return [];
    case GET_ALL_REWARD_OPTIONS:
      return action.data;
    default:
      return state;
  }
};

export default rewardOptions;
