import {
  GET_ALL_TASKS,
  GET_ONE_TASK,
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK
} from "../actions/task";

export const taskInitState = [];

const tasks = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.data
      };
    // case GET_ONE_TASK:
    //   return {
    //     ...state,
    //     isFetching: true
    //   };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.data]
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          return action.data.id === task.id ? action.data.task : task;
        })
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.data)
      };
    default:
      return state;
  }
};
export default tasks;
