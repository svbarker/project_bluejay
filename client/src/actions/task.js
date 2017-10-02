export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_ONE_TASK = "GET_ONE_TASK";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

const getTasks = data => ({
	type: GET_ALL_TASKS,
	data: data
});

const addTask = data => ({
	type: ADD_TASK,
	data: data
});

const updateTask = (id, data) => ({
	type: UPDATE_TASK,
	data: {
		id: id,
		task: data
	}
});

const removeTask = id => ({
	type: REMOVE_TASK,
	data: id
});
