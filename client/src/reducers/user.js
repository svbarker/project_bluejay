import { SET_USER } from "../actions/user";

const user = (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				id: action.data.id,
				displayName: action.data.displayName
			};
		default:
			return state;
	}
};
export default user;
