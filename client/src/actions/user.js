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

export const loginTeacher = () => async dispatch => {
	try {
		const response = await fetch("/sessions", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: "teacher1@teach.com", password: "foo" })
		});

		const teacher = await response.json();

		dispatch(setUser(teacher.apiData));
	} catch (error) {
		console.log(error);
	}
};

const editUser = () => () => {
	//
};
