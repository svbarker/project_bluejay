import { startRequest, endRequest } from "./index";

export const GET_ALL_REWARDS = "GET_ALL_REWARDS";
export const GET_ONE_REWARD = "GET_ONE_REWARD";
export const ADD_REWARD = "ADD_REWARD";
export const UPDATE_REWARD = "UPDATE_REWARD";
export const REMOVE_REWARD = "REMOVE_REWARD";
export const REDEEM_REWARD = "REDEEM_REWARD";

export const getRewards = rewards => ({
  type: GET_ALL_REWARDS,
  data: rewards
});

const addReward = reward => ({
  type: ADD_REWARD,
  data: reward
});

const updateReward = (id, reward) => ({
  type: UPDATE_REWARD,
  data: {
    id: id,
    reward
  }
});

const removeReward = id => ({
  type: REMOVE_REWARD,
  data: id
});

export const purchaseReward = (studentId, rewardId) => async dispatch => {
  try {
    let response = await fetch(
      `/api/students/${studentId}/purchase/${rewardId}`,
      { method: "PATCH", credentials: "include" }
    );
    response = await response.json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

//NOT IMPLEMENTED
export const redeemReward = (studentId, rewardId) => async dispatch => {
  // dispatch(startRequest());
  let response;
  try {
    response = await fetch(`/api/students/${studentId}/redeem/${rewardId}`, {
      method: "PATCH",
      credentials: "include"
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.apiError.message);
    }
    dispatch(addReward(data.apiData));
  } catch (e) {
    console.error(e);
    // dispatch(endRequest(e));
  }
};

//NOT WORKING
//create a new kind of reward
export const createReward = (teacherId, reward) => async dispatch => {
  // dispatch(startRequest());
  const newReward = {
    kind: reward.kind || "loot",
    description: reward.description || "new reward",
    cost: reward.cost || undefined,
    value: reward.value || undefined,
    teacher: teacherId,
    available: reward.available || true
  };
  const response = await fetch(`/api/rewards`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ teacher: teacherId, ...newReward })
  });
  // console.log("response from createReward API = ", response);
  const data = await response.json();
  //check for server errors
  // console.log("response from createReward API = ", data);
  if (!data.success) {
    dispatch(endRequest(data.apiError));
    console.error(data.apiError);
    return;
  }
  //TODO: double check that we're getting this back from server
  dispatch(addReward(data.apiData));
  // dispatch(endRequest(null));
};

//get all the rewards for a teacher
export const getAllRewards = (userId, userKind) => async dispatch => {
  // dispatch(startRequest());

  //use correct input for students and teachers
  let endpoint = `/api/teachers/${userId}/rewards`;
  if (userKind === "Student") {
    endpoint = `/api/students/${userId}/rewards`;
  }
  let response;
  try {
    response = await fetch(endpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
  response = await response.json();
  if (!response.success) {
    console.error(response.apiError);
    dispatch(endRequest(response.apiError));
    return null;
  }
  dispatch(getRewards(response.apiData));
  // dispatch(endRequest(null));
};

//works??
export const editReward = (id, rewardUpdates) => async dispatch => {
  // dispatch(startRequest());
  let response = await fetch(`/api/rewards/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rewardUpdates)
  });
  response = await response.json();
  if (!response.success) {
    console.error(response.apiError);
    dispatch(endRequest(response.apiError));
  } else {
    //server send back the old reward, so update it before you store it in redux
    let oldReward = response.apiData;
    for (let key in rewardUpdates.updates) {
      if (oldReward.hasOwnProperty(key)) {
        oldReward[key] = rewardUpdates.updates[key];
      }
    }
    dispatch(updateReward(oldReward._id, oldReward));
  }
};

//NOT TESTED
//TESTED, NON-FUNCTIONING, API => 500
export const deleteReward = id => async dispatch => {
  // dispatch(startRequest());
  const response = await fetch(`/api/rewards/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: null
  });
  //TODO: SHOULD THESE USE THE response success flag?
  // console.log("response = ", response);
  const data = await response.json();
  // console.log("data = ", data);
  if (!data.success) {
    console.error(data);
    dispatch(endRequest(data));
  } else {
    //delete from redux
    await dispatch(removeReward(data.apiData._id));
    // dispatch(endRequest);
  }
};

export const distributeReward = (
  teacherId,
  studentId,
  rewardId
) => async dispatch => {
  try {
    let response = await fetch(
      `/api/teachers/${teacherId}/students/${studentId}/distribute`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rewards: [rewardId] })
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
