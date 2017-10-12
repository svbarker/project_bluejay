import {
  GET_ALL_REWARDS,
  GET_ONE_REWARD,
  ADD_REWARD,
  UPDATE_REWARD,
  REDEEM_REWARD,
  REMOVE_REWARD
} from "../actions/rewards";
import { CLEAR_STORE } from "../actions/index";

export const rewardInitState = [];

const rewards = (state = [], action) => {
  if (!action) {
    console.error("action = ", action);
    return state;
  }
  switch (action.type) {
    case CLEAR_STORE:
      return [];
    case GET_ALL_REWARDS:
      return action.data;
    case GET_ONE_REWARD:
      //UNTESTED
      const newRewards = state
        .filter(reward => reward._id !== action.data._id)
        .push(action.data);
      return newRewards;
    case ADD_REWARD:
      //UNTESTED
      return [...state, action.data];
    case UPDATE_REWARD:
      return state.map(reward => {
        if (action.data.id === reward._id) return action.data.reward;
        return reward;
      });
    case REMOVE_REWARD:
      return state.filter(reward => reward._id !== action.data);
    default:
      return state;
  }
};
export default rewards;
