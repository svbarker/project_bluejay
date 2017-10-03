export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const removeNotification = data => {
  return {
    type: REMOVE_NOTIFICATION,
    data
  };
};

const getAllNotifications = data => {
  return {
    type: GET_ALL_NOTIFICATIONS,
    data
  };
};

export const clearNotification = id => async dispatch => {
  let response = await fetch(`/api/events/${id}`, { method: "DELETE" });
  response = await response.json();
  if (!response.success) {
    throw new Error("Something went wrong with your request.");
  }

  dispatch(removeNotification());
};
