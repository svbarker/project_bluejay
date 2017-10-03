import { startRequest, failedRequest } from "./index";

export const GET_ALL_REWARDS = "GET_ALL_REWARDS";
export const GET_ONE_REWARD = "GET_ONE_REWARD";
export const ADD_REWARD = "ADD_REWARD";
export const UPDATE_REWARD = "UPDATE_REWARD";
export const REMOVE_REWARD = "REMOVE_REWARD";

export const getRewards = data => ({
  type: GET_ALL_REWARDS,
  data: data
});

const addReward = data => ({
  type: ADD_REWARD,
  data: data
});

const updateReward = (id, data) => ({
  type: UPDATE_REWARD,
  data: {
    id: id,
    reward: data
  }
});

const removeReward = id => ({
  type: REMOVE_REWARD,
  data: id
});

//NOT IMPLEMENTED
//create a reward
export const createReward = teacher => async dispatch => {
  dispatch(startRequest());
  teacher = await getTeacher(); //change this later after we store the user
  console.log("teacher = ", teacher);
  const reward = {
    kind: "point",
    description: "new reward",
    cost: "lots",
    teacher: teacher._id,
    status: "Unaccepted"
  };
  const response = await fetch(`/api/rewards`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: reward
  });
  console.log("response from createReward API = ", response);
};

//NOT IMPLEMENTED
export const editReward = (teacher, editedReward) => async dispatch => {
  dispatch(startRequest());
  teacher = await getTeacher(); //change this later after we store the user
  const response = await fetch(`/api/rewards`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: editedReward
  });
  //do some things
  if (!response.success) {
    dispatch(failedRequest(response.apiData));
  }
  const newReward = await response.json().apiData;
  dispatch(updateReward(newReward._id, newReward));
};

//NOT IMPLEMENTED
//get all the rewards for a teacher
export const getAllRewards = () => async dispatch => {
  console.log("reward things!");
  dispatch(startRequest());
  const response = await fetch(
    `/api/teachers/59d3e54d09cb9cfe741b45ac/rewards`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    }
  );
  console.log("response = ", response);
  const data = await response.json();
  console.log("data = ", data);
  return null;
};

//TODO: REMOVE LATER
const getTeacher = async () => {
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
  console.log("teacher = ", teacher.apiData);
  return teacher;
};
