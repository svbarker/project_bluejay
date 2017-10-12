import * as Event from "./events";
import { unassignTask, bulkUnassign } from "./student";
import { startRequest, endRequest } from "./index";
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_ONE_TASK = "GET_ONE_TASK";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const UNASSIGN_STUDENT = "UNASSIGN_STUDENT";
export const BULK_UNASSIGN_STUDENTS = "BULK_UNASSIGN_STUDENTS";

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
const unassignStudent = (studentId, taskId) => {
  return {
    type: UNASSIGN_STUDENT,
    data: {
      taskId,
      studentId
    }
  };
};
const bulkUnassignStudents = taskId => {
  return {
    type: BULK_UNASSIGN_STUDENTS,
    data: taskId
  };
};

export const hydrateTeacherTasks = userId => async dispatch => {
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

//unassign a single task from a student
export const unAssignTask = (task, studentId) => async dispatch => {
  // dispatch(startRequest());
  try {
    let response = await fetch(`api/tasks/${task._id}/unassign/${studentId}`, {
      method: "PATCH",
      credentials: "include"
    });
    let data = await response.json();
    if (!data.success) {
      throw new Error(data.apiError.message);
    }
    //update the student and the task
    await dispatch(unassignTask(studentId, task._id));
    await dispatch(unassignStudent(studentId, task._id));
    // dispatch(endRequest(null));
  } catch (error) {
    //dispatch error
    console.error(error);
    // dispatch(endRequest(error));
  }
};
export const bulkUnassignTask = (task, studentIds) => async dispatch => {
  try {
    let serverResponse = await fetch(`api/tasks/${task._id}/bulkunassign`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ studentIds: studentIds })
    });
    serverResponse = await serverResponse.json();
    if (serverResponse.success) {
      //update the students and the tasks
      await dispatch(bulkUnassign(studentIds)); //a student redux store action
      await dispatch(bulkUnassignStudents(task._id)); //a task redux store action
      // dispatch(endRequest(null));
    } else {
      console.error("problems in Bulk Unassign");
      dispatch(endRequest(serverResponse.apiError));
    }
  } catch (error) {
    //dispatch error
    // dispatch(endRequest(error));
    console.log(error);
  }
};

//delete a task from a teacher
export const deleteTask = (teacherId, taskId) => async dispatch => {
  try {
    let serverResponse = await fetch(
      `api/teachers/${teacherId}/tasks/${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    serverResponse = await serverResponse.json();
    if (serverResponse.success) {
      dispatch(removeTask(serverResponse.apiData));
    } else if (!serverResponse.success) {
      console.error(serverResponse.apiError);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

//Teacher editing a task's fields
export const editTask = (taskId, taskUpdates) => async dispatch => {
  try {
    let serverResponse = await fetch(`api/tasks/${taskId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ updates: taskUpdates })
    });
    serverResponse = await serverResponse.json();
    if (serverResponse.success) {
      //server send back the old task, so update it before you store it in redux
      let oldTask = serverResponse.apiData;
      for (let key in taskUpdates) {
        if (taskUpdates.hasOwnProperty(key)) {
          oldTask[key] = taskUpdates[key];
        }
      }
      dispatch(updateTask(oldTask._id, oldTask));
    } else if (!serverResponse.success) {
      console.error(serverResponse.apiError);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const assignTask = (teacherId, studentId, taskId) => async dispatch => {
  try {
    let response = await fetch(
      `/api/teachers/${teacherId}/students/${studentId}/assign/${taskId}`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
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
    dispatch(updateTask(t_id, response.apiData));
  } catch (error) {
    console.log(error);
  }
};

export const createTask = params => async dispatch => {
  try {
    let response = await fetch(`api/tasks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    response = await response.json();

    if (!response.success) {
      throw new Error(response.apiError.message);
    }
    //redux store now expects the rewards under a task
    //to be populated, this route sends it unpopulated
    //so I'll fetch the rewards, probably change this later
    let taskRewardsFetch = await fetch(
      `api/tasks/${response.apiData._id}/rewards`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    let rewards = await taskRewardsFetch.json();
    let task = response.apiData;
    task.rewards = rewards.apiData;
    dispatch(addTask(task));
  } catch (error) {
    console.log(error);
  }
};
