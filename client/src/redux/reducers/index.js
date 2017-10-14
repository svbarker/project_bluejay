import { combineReducers } from "redux";
import user from "./user";
import students from "./student";
import tasks from "./task";
import rewards from "./rewards";
import rewardOptions from "./rewardOptions";
import notifications from "./notifications";
import classrooms from "./classrooms";
import { CLEAR_STORE } from "../actions/index";

import { START_REQUEST, END_REQUEST } from "../actions/index";

const initialState = {
  isFetching: false,
  error: null
};

const status = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STORE:
      return {
        isFetching: false,
        error: null
      };
    case END_REQUEST:
      return {
        isFetching: false,
        error: action.data
      };
    case START_REQUEST:
      return {
        isFetching: true,
        error: null
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
  students,
  tasks,
  rewards,
  rewardOptions,
  notifications,
  classrooms,
  status
});

export default rootReducer;
