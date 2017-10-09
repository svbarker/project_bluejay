import * as rewards from "./rewards";
import * as student from "./student";
import * as task from "./task";
import * as user from "./user";
import * as classrooms from "./classrooms";
import * as Events from "./events";

export const START_REQUEST = "START_REQUEST";
export const END_REQUEST = "END_REQUEST";

export const startRequest = () => {
	return {
		type: START_REQUEST,
		data: null
	};
};
export const endRequest = error => {
	return {
		type: END_REQUEST,
		data: error
	};
};

export const loginUser = (email, password, socket) => async dispatch => {
	try {
		dispatch(startRequest());
		const response = await fetch("/sessions", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: email, password: password })
		});

		const loggedInUser = await response.json();
		if (!loggedInUser.success) {
			throw new Error(loggedInUser.apiError.message);
		}
		console.log(loggedInUser);
		setUser(loggedInUser, dispatch, socket);
	} catch (error) {
		dispatch(endRequest(error));
		return error.message;
	}
};

export const returningUser = socket => async dispatch => {
	try {
		dispatch(startRequest());
		const response = await fetch("/sessions", {
			method: "GET",
			credentials: "include"
		});

		const loggedInUser = await response.json();

		if (!loggedInUser.success) {
			throw new Error("Something went wrong with your request.");
		}

		setUser(loggedInUser, dispatch, socket);
	} catch (error) {
		console.log(error);
		dispatch(endRequest(null));
	}
};

const setUser = async (loggedInUser, dispatch, socket) => {
	let userObj;

	if (loggedInUser.apiData.kind === "Teacher") {
		console.log("I'm a teacher");
		userObj = {
			id: loggedInUser.apiData._id,
			kind: loggedInUser.apiData.kind,
			displayName: loggedInUser.apiData.profile.displayName
		};
	} else if (loggedInUser.apiData.kind === "Student") {
		userObj = {
			id: loggedInUser.apiData._id,
			kind: loggedInUser.apiData.kind,
			points: loggedInUser.apiData.points,
			displayName: loggedInUser.apiData.profile.displayName
		};
	}

	socket.emit(Events.USER_LOGGED_IN, userObj.id);
	await dispatch(user.setUser(userObj));
	await dispatch(classrooms.getClassrooms(loggedInUser.apiData.classrooms));
	dispatch(endRequest(null));
};

export const logoutUser = () => dispatch => {
	const response = fetch("/sessions", {
		method: "DELETE",
		credentials: "include"
	});

	dispatch(user.setUser({}));
};
