import {
  GET_ALL_STUDENTS,
  GET_ONE_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT
} from "../actions/student";

export const studentInitState = [];

const student = (state = studentInitState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return {
        ...state,
        students: action.data
      };
    // case GET_ONE_STUDENT:
    //   return {
    //     ...state,
    //     isFetching: true
    //   };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.data]
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student => {
          return action.data.id === student.id ? action.data.student : student;
        })
      };
    case REMOVE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.data)
      };
    default:
      return state;
  }
};
export default student;
