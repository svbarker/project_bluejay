import { SET_TEACHER } from "../actions/teacher";

const teacher = (state = {}, action) => {
  switch (action.type) {
    case SET_TEACHER:
      return {
        ...state,
        teacher: action.data
      };
    default:
      return state;
  }
};
export default teacher;
