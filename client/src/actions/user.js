export const SET_USER = "SET_USER";
// export const UPDATE_USER = "UPDATE_USER";
// export const DELETE_USER = "DELETE_USER";

const setUser = data => ({
	type: SET_USER,
	data: data
});

// const updateUser = (id, data) => ({
// 	type: UPDATE_USER,
// 	data: {
// 		id: id,
// 		data: data
// 	}
// });

// const deleteUser = (id) => ({
// 	type: DELETE_USER,
// 	data: data
// });

const loginTeacher = () => async dispatch => {
	const response = await fetch("/sessions", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ username: "teacher1@teach.com", password: "foo" })
	});

	const teacher = await response.json();

	setUser(teacher);
};

const editUser = () => () => {
	//
};
