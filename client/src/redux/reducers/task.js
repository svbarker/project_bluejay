import {
	START_GET_ALL_TASKS,
	GET_ALL_TASKS,
	ERROR_GET_ALL_TASKS,
	GET_ONE_TASK,
	ADD_TASK,
	UPDATE_TASK,
	REMOVE_TASK,
	UNASSIGN_STUDENT,
	BULK_UNASSIGN_STUDENTS
} from "../actions/task";
import { CLEAR_STORE } from "../actions/index";

export const taskInitState = {
	isFetching: true,
	error: null,
	list: []
};

const tasks = (state = taskInitState, action) => {
	switch (action.type) {
		case START_GET_ALL_TASKS:
			return {
				...state,
				isFetching: true
			};
		case GET_ALL_TASKS:
			return {
				isFetching: false,
				error: null,
				list: [...action.data]
			};
		case ERROR_GET_ALL_TASKS:
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		case ADD_TASK:
			return {
				...state,
				list: [...state.list, action.data]
			};
		case UPDATE_TASK:
			return {
				...state,
				list: state.list.map(
					task => (action.data.id === task._id ? action.data.task : task)
				)
			};
		case REMOVE_TASK:
			return {
				...state,
				list: state.list.filter(task => task._id !== action.data)
			};
		case UNASSIGN_STUDENT:
			return {
				...state,
				list: state.list.map(task => {
					if (task._id === action.data.taskId) {
						task.students = task.students.filter(
							studentId => studentId !== action.data.studentId
						);
						return task;
					} else {
						return task;
					}
				})
			};
		case BULK_UNASSIGN_STUDENTS:
			return {
				...state,
				list: state.list.map(task => {
					if (task._id === action.data) {
						task.students = [];
						return task;
					} else {
						return task;
					}
				})
			};
		default:
			return state;
	}
};
export default tasks;
