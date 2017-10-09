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
      credentials: "include",
      method: "GET"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }

    console.log(response);
    dispatch(getAllNotifications(response.apiData.reverse()));
  } catch (error) {
    console.log(error);
  }
};

export const fetchStudentNotifications = id => async dispatch => {
  try {
    let response = await fetch(`/api/students/${id}/notifications`, {
      credentials: "include",
      method: "GET"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    dispatch(getAllNotifications(response.apiData.reverse()));
  } catch (error) {
    console.log(error);
  }
};

export const acceptEvent = (
  t_id,
  s_id,
  ta_id,
  n_id,
  type
) => async dispatch => {
  try {
    if (t_id && s_id && ta_id && n_id && type) {
      console.log("fetch parameters all good!");
    }
    type = type[0].toUpperCase().concat(type.slice(1));
    let response = await fetch(
      `/api/teachers/${t_id}/students/${s_id}/confirm${type}/${ta_id}`,
      {
        credentials: "include",
        method: "PATCH"
      }
    );
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    // remove from teacher's notifications

    response = await fetch(`/api/teachers/${t_id}/notifications/${n_id}`, {
      credentials: "include",
      method: "DELETE"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    dispatch(removeNotification(n_id));
  } catch (error) {
    console.log(error);
  }
};

export const rejectEvent = (
  t_id,
  s_id,
  ta_id,
  n_id,
  type
) => async dispatch => {
  try {
    type = type[0].toUpperCase().concat(type.slice(1));
    let response = await fetch(
      `/api/teachers/${t_id}/students/${s_id}/reject${type}/${ta_id}`,
      { credentials: "include", method: "PATCH" }
    );
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    // dispatch(???);
    // remove from teacher's notifications
    response = await fetch(`/api/teachers/${t_id}/notifications/${n_id}`, {
      credentials: "include",
      method: "DELETE"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    dispatch(removeNotification(n_id));
  } catch (error) {
    console.log(error);
  }
};
