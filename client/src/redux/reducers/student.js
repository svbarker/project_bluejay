import {
  GET_ALL_STUDENTS,
  GET_ONE_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT,
  UNASSIGN_TASK,
  BULK_UNASSIGN_TASK
} from "../actions/student";
import { CLEAR_STORE } from "../actions/index";

export const studentInitState = [];

const students = (state = studentInitState, action) => {
  switch (action.type) {
    case CLEAR_STORE:
      return [];
    case GET_ALL_STUDENTS:
      return [...action.data];
    // case GET_ONE_STUDENT:
    //   return {
    //     ...state,
    //     isFetching: true
    //   };
    //I think add update and remove may be broken
    //state appears to be = [{student}] not {students: [{student}]}
    case ADD_STUDENT:
      return [...state, action.data];
    case UPDATE_STUDENT:
      return state.map(student => {
        return action.data.id === student._id ? action.data.student : student;
      });
    case REMOVE_STUDENT:
      return state.filter(student => `${student._id}` !== `${action.data}`);
    case UNASSIGN_TASK:
      //TODO: implement this by returning new student objects maybe?
      return state.map(student => {
        if (student._id === action.data.studentId) {
          student.tasks = student.tasks.filter(
            task => task._id !== action.data.taskId
          );
          return student;
        } else {
          return student;
        }
      });
    case BULK_UNASSIGN_TASK:
      //remove the task from all the appropriate students
      return state.map(student => {
        if (action.data.studentIds.includes(student._id)) {
          student.tasks = student.tasks.filter(
            task => task._id !== action.data.taskId
          );
          return student;
        } else {
          return student;
        }
      });
      return state;

    default:
      return state;
  }
};
export default students;
