import { REMOVE_NOTIFICATION } from "../actions/notifications";

export const notificationInitState = [];

const notifications = (state = [], action) => {
  switch (action.type) {
    // case GET_ALL_REWARDS:
    //   return action.data;
    // case GET_ONE_REWARD:
    //   return {
    //     ...state,
    //     isFetching: true
    //   };
    // case ADD_REWARD:
    //   return [...state.notifications, action.data];
    // case UPDATE_REWARD:
    //   return state.notifications.map(reward => {
    //     return action.data.id === reward.id ? action.data.reward : reward;
    //   });
    case REMOVE_NOTIFICATION:
      return state.notifications.filter(
        notification => notification.id !== action.data
      );
    default:
      return state;
  }
};

export default notifications;
