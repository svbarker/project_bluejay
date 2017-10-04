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
//create a new kind of reward
export const createReward = (teacherId, reward) => async dispatch => {
  dispatch(startRequest());
  // teacher = await getTeacher(); //change this later after we store the user
  const teacher = null;
  console.log("teacher = ", teacher);
  const defaultReward = {
    kind: "point",
    description: "new reward",
    value: "lots",
    teacher: teacher._id,
    status: "Unaccepted"
  };
  const response = await fetch(`/api/rewards`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: defaultReward
  });
  console.log("response from createReward API = ", response);
  //TODO: double check that we're getting this back from server
  dispatch(addReward(response.apiData));
};
//SEEMS TO WORK
//get all the rewards for a teacher
export const getAllRewards = teacherId => async dispatch => {
  console.log("reward things!");
  dispatch(startRequest());
  const response = await fetch(`/api/teachers/${teacherId}/rewards`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: null
  });
  if (response.status !== 200) {
    console.error(response.status);
  }
  const data = await response.json();
  dispatch(getRewards(data.apiData));
};

//NOT IMPLEMENTED
export const editReward = (teacherId, editedReward) => async dispatch => {
  dispatch(startRequest());
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

//TODO:
//MAKE A DELETE REWARD CALL
