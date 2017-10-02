import combineReducers from "redux";
import teacher from "./teacher";
import student from "./student";
import task from "./task";
import rewards from "./rewards";

import { START_REQUEST, FAILURE_REQUEST } from "../actions/index";

const globalState = {
	isFetching: false,
	error: null
};
const reducer = (state = globalState, action) => {
	switch (action.type) {
		case FAILURE_REQUEST:
			return {
				...state,
				error: action.data
			};
		case START_REQUEST:
			return {
				...state,
				error: action.data
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	teacher,
	student,
	task,
	rewards,
	isFetching: reducer,
	error: reducer
});

export default rootReducer;
