export const GET_ALL_CLASSROOMS = "GET_ALL_CLASSROOMS";
export const GET_ONE_CLASSROOM = "GET_ONE_CLASSROOM";
export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM";
export const REMOVE_CLASSROOM = "REMOVE_CLASSROOM";

export const getClassrooms = data => ({
	type: GET_ALL_CLASSROOMS,
	data: data
});

const addClassroom = data => ({
	type: ADD_CLASSROOM,
	data: data
});

const updateClassroom = (id, data) => ({
	type: UPDATE_CLASSROOM,
	data: {
		id: id,
		classroom: data
	}
});

const removeClassroom = id => ({
	type: REMOVE_CLASSROOM,
	data: id
});
