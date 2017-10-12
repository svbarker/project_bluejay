import { SET_USER, UPDATE_POINTS } from "../actions/user";
import { CLEAR_STORE } from "../actions/index";

const user = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_STORE:
      return {};
    case SET_USER:
      return {
        ...state,
        id: action.data.id,
        kind: action.data.kind,
        points: action.data.points,
        displayName: action.data.displayName
      };
    case UPDATE_POINTS:
      return {
        ...state,
        points: action.data
      };
    default:
      return state;
  }
};
export default user;
