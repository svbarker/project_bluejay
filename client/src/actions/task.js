import * as Event from "./events";

export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_ONE_TASK = "GET_ONE_TASK";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const getTasks = data => ({
  type: GET_ALL_TASKS,
  data: data
});

const addTask = data => ({
  type: ADD_TASK,
  data: data
});

const updateTask = (id, data) => ({
  type: UPDATE_TASK,
  data: {
    id: id,
    task: data
  }
});
const removeTask = id => ({
  type: REMOVE_TASK,
  data: id
});

export const hydrateTeacherTasks = userId => async dispatch => {
  console.log("attempting to hydrate teacher tasks ");
  try {
    let response = await fetch(`api/teachers/${userId}/tasks`, {
      method: "GET",
      credentials: "include"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    dispatch(getTasks(response.apiData));
  } catch (error) {
    console.log(error);
  }
};

export const hydrateStudentTasks = userId => async dispatch => {
  try {
    let response = await fetch(`api/students/${userId}/tasks`, {
      method: "GET",
      credentials: "include"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    dispatch(getTasks(response.apiData));
  } catch (error) {
    console.log(error);
  }
};

export const completeTask = (s_id, t_id, socket) => async dispatch => {
  try {
    let response = await fetch(`api/students/${s_id}/complete/${t_id}`, {
      method: "PATCH",
      credentials: "include"
    });
    response = await response.json();
    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    socket.emit(Event.SEND_NOTIFICATION, response.apiData.teacher);
    // dispatch(updateTask(t_id, response.apiData));
  } catch (error) {
    console.log(error);
  }
};
