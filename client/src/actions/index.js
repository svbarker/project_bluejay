import * as rewards from "./rewards";
import * as student from "./student";
import * as task from "./task";
import * as user from "./user";
import * as classrooms from "./classrooms";

export const START_REQUEST = "START_REQUEST";
export const FAILURE_REQUEST = "FAILURE_REQUEST";

export const startRequest = () => {
  return {
    type: START_REQUEST,
    data: null
  };
};
export const failedRequest = error => {
  return {
    type: FAILURE_REQUEST,
    data: error
  };
};

export const loginTeacher = () => async dispatch => {
  console.log("LOGGING IN AS A TEACHER");
  try {
    const response = await fetch("/sessions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "teacher1@teach.com", password: "foo" })
    });

    const teacher = await response.json();
    if (!teacher.success) {
      throw new Error("Something went wrong with your request.");
    }
    console.log("teacher = ", teacher);
    const userObj = {
      id: teacher.apiData._id,
      kind: teacher.apiData.kind,
      displayName: teacher.apiData.profile.displayName
    };

    dispatch(user.setUser(userObj));
    dispatch(classrooms.getClassrooms(teacher.apiData.classrooms));
  } catch (error) {
    console.log(error);
  }
};

//placeholder
export const loginStudent = () => async dispatch => {
  console.log("LOGGING IN AS A STUDENT");
  try {
    const response = await fetch("/sessions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "student1@learn.com", password: "foo" })
    });

    const loggedInUser = await response.json();
    if (!loggedInUser.success) {
      throw new Error("Something went wrong with your request.");
    }
    const userObj = {
      id: loggedInUser.apiData._id,
      kind: loggedInUser.apiData.kind,
      points: loggedInUser.apiData.points,
      displayName: loggedInUser.apiData.profile.displayName
    };
    console.log("logged in as ", loggedInUser);
    dispatch(user.setUser(userObj));
    dispatch(classrooms.getClassrooms(loggedInUser.apiData.classrooms));
  } catch (error) {
    console.log(error);
  }
};
