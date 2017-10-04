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

export const acceptEvent = (t_id, s_id, ta_id, n_id) => async dispatch => {
  try {
    /*

    WHAT IS THE ROUTE FOR THIS

    */
    let response = await fetch(`complete task, deliver reward to student!`);
    response = await response.json();
    if (!response.success) {
      throw new Error("Something went wrong with your request.");
    }
    // dispatch(???);
  } catch (error) {
    console.log(error);
  }

  // remove from teacher's notifications
  try {
    let response = await fetch(`/api/teachers/${t_id}/notifications/${n_id}`, {
      method: "DELETE"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error("Something went wrong with your request.");
    }
    dispatch(removeNotification(n_id));
  } catch (error) {
    console.log(error);
  }
};

export const rejectEvent = (t_id, s_id, ta_id, n_id) => async dispatch => {
  try {
    /*

    WHAT IS THE ROUTE FOR THIS

    */
    let response = await fetch(`udpate student task status to 'rejected'!`);
    response = await response.json();
    if (!response.success) {
      throw new Error("Something went wrong with your request.");
    }
    // dispatch(???);
  } catch (error) {
    console.log(error);
  }

  // remove from teacher's notifications
  try {
    let response = await fetch(`/api/teachers/${t_id}/notifications/${n_id}`, {
      method: "DELETE"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error("Something went wrong with your request.");
    }
    dispatch(removeNotification(n_id));
  } catch (error) {
    console.log(error);
  }
};
