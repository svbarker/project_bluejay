import {
  GET_ALL_CLASSROOMS,
  GET_ONE_CLASSROOM,
  ADD_CLASSROOM,
  UPDATE_CLASSROOM,
  REMOVE_CLASSROOM
} from "../actions/classrooms";
import { CLEAR_STORE } from "../actions/index";

export const classroomInitState = [];

const classrooms = (state = classroomInitState, action) => {
  switch (action.type) {
    case CLEAR_STORE:
      return [];
    case GET_ALL_CLASSROOMS:
      return action.data;
    case ADD_CLASSROOM:
      return [...state, action.data];
    case UPDATE_CLASSROOM:
      return state.map(classroom => {
        return `${action.data.id}` === `${classroom._id}`
          ? action.data.classroom
          : classroom;
      });
    case REMOVE_CLASSROOM:
      return state.classrooms.filter(classroom => classroom.id !== action.data);
    default:
      return state;
  }
};
export default classrooms;
