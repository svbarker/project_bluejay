import { SET_USER } from "../actions/user";

const user = (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				displayName: action.data.displayName
			};
		default:
			return state;
	}
};
export default user;
