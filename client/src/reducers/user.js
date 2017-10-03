import { SET_USER } from "../actions/user";

const user = (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.data
			};
		default:
			return state;
	}
};
export default user;
