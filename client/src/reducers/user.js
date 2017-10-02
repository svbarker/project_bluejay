import { SET_USER } from "../actions/user";

const user = (state = { displayName: "Ms. Frizzle", points: 793 }, action) => {
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
