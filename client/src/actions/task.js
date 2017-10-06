import * as Event from "./events";
import { unassignTask, bulkUnassign } from "./student";
import { startRequest, failedRequest } from "./index";
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_ONE_TASK = "GET_ONE_TASK";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

// export const UNASSIGN_TASK = "UNASSIGN_TASK"

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
// const removeStudentFromTask = studentId => (
//   return {
//     type: UNASSIGN_TASK,
//     data: studentId
//   }
// )

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
export const unAssignTask = (task, studentId) => async dispatch => {
  dispatch(startRequest());
  try {
    console.log(studentId);
    let response = await fetch(`api/tasks/${task._id}/unassign/${studentId}`, {
      method: "PATCH",
      credentials: "include"
    });
    let data = await response.json();
    if (!data.success) {
      throw new Error(response.apiError.message);
    }
    console.log("data = ", data);
    dispatch(unassignTask(studentId, task._id));
  } catch (error) {
    //dispatch error
    console.log(error);
    dispatch(failedRequest(error));
  }
};
export const bulkUnassignTask = (task, studentIds) => async dispatch => {
  dispatch(startRequest());
  try {
    console.log(studentIds);
    let calls = studentIds.map(studentId => {
      return fetch(`api/tasks/${task._id}/unassign/${studentId}`, {
        method: "PATCH",
        credentials: "include"
      });
    });
    console.log("calls = ", calls);
    let responses = await Promise.all(calls);
    console.log("responses =", responses);
    let data = responses.map(response => response.json());
    let unpackedData = await Promise.all(data);
    if (unpackedData.every(data => data.success)) {
      dispatch(bulkUnassign(studentIds, task._id));
    } else {
      console.error("problems in Bulk Unassign");
      console.log("unpackedData = ", unpackedData);
      dispatch(failedRequest("problems in Bulk Unassign"));
    }
  } catch (error) {
    //dispatch error
    dispatch(failedRequest(error));
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
