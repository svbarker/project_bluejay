export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const GET_ONE_STUDENT = "GET_ONE_STUDENT";
export const ADD_STUDENT = "ADD_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const REMOVE_STUDENT = "REMOVE_STUDENT";

export const getStudents = data => ({
	type: GET_ALL_STUDENTS,
	data: data
});

const addStudent = data => ({
	type: ADD_STUDENT,
	data: data
});

const updateStudent = (id, data) => ({
	type: UPDATE_STUDENT,
	data: {
		id: id,
		student: data
	}
});

const removeStudent = id => ({
	type: REMOVE_STUDENT,
	data: id
});

export const loadStudents = classId => async dispatch => {
	try {
		const response = await fetch(`/api/classrooms/${classId}/students`, {
			method: "GET",
			credentials: "include"
		});

		const students = response.json();
		dispatch(getStudents(students.apiData));
	} catch (error) {
		console.log(error);
	}
};
