export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const GET_ALL_NOTIFICATIONS = "GET_ALL_NOTIFICATIONS";

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

export const fetchNotifications = id => async dispatch => {
  try {
    let response = await fetch(`/api/teachers/${id}/notifications`, {
      method: "GET"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error("Something went wrong with your request.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearNotification = id => async dispatch => {
  try {
    let response = await fetch(`/api/events/${id}`, { method: "DELETE" });
    response = await response.json();
    if (!response.success) {
      throw new Error("Something went wrong with your request.");
    }
    dispatch(removeNotification(id));
  } catch (error) {
    console.log(error);
  }
};
