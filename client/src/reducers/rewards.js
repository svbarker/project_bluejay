import {
  GET_ALL_REWARDS,
  GET_ONE_REWARD,
  ADD_REWARD,
  UPDATE_REWARD,
  REMOVE_REWARD
} from "../actions/rewards";

export const rewardInitState = [];

const rewards = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_REWARDS:
      return action.data;
    case GET_ONE_REWARD:
      const newRewards = state
        .filter(reward => reward._id !== action.data._id)
        .push(action.data);
      return newRewards;
    case ADD_REWARD:
      return [...state.rewards, action.data];
    case UPDATE_REWARD:
      return state.rewards.map(reward => {
        return action.data.id === reward.id ? action.data.reward : reward;
      });
    case REMOVE_REWARD:
      return state.rewards.filter(reward => reward.id !== action.data);
    default:
      return state;
  }
};
export default rewards;
