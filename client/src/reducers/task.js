import {
  START_REQUEST,
  GET_ALL_TASKS,
  GET_ONE_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FAILURE_REQUEST
} from "../actions/task";

export const taskInitState = [];

const task = (state = [], action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_ALL_TASKS:
      return {
        ...state,
        isFetching: true
      };
    case GET_ONE_TASK:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_TASK:
      return {
        ...state,
        isFetching: true
      };
    case UPDATE_TASK:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_TASK:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_REQUEST:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    default:
      return state;
  }
};
export default task;
