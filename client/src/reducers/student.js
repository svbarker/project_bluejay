import {
  START_REQUEST,
  GET_ALL_STUDENTS,
  GET_ONE_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  FAILURE_REQUEST
} from "../actions/student";

export const studentInitState = [];

const student = (state = studentInitState, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_ALL_STUDENTS:
      return {
        ...state,
        isFetching: true
      };
    case GET_ONE_STUDENT:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_STUDENT:
      return {
        ...state,
        isFetching: true
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_STUDENT:
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
export default student;
