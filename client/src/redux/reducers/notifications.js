import {
	REMOVE_NOTIFICATION,
	START_GET_ALL_NOTIFICATIONS,
	GET_ALL_NOTIFICATIONS,
	ERROR_GET_ALL_NOTIFICATIONS,
	CLEAR_ALL_NOTIFICATIONS
} from "../actions/notifications";

export const notificationInitState = {
	isFetching: true,
	error: null,
	list: []
};

const notifications = (state = notificationInitState, action) => {
	switch (action.type) {
		case START_GET_ALL_NOTIFICATIONS:
			return {
				...state,
				isFetching: true
			};
		case GET_ALL_NOTIFICATIONS:
			return {
				isFetching: false,
				error: null,
				list: [...action.data]
			};
		case ERROR_GET_ALL_NOTIFICATIONS:
			return {
				...state,
				error: action.error
			};
		case REMOVE_NOTIFICATION:
			return {
				...state,
				list: state.list.filter(
					notification => notification._id !== action.data
				)
			};
		case CLEAR_ALL_NOTIFICATIONS:
			return {
				...state,
				list: []
			};
		default:
			return state;
	}
};

export default notifications;
