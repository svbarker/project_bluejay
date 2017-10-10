export const SET_USER = "SET_USER";
export const UPDATE_POINTS = "UPDATE_POINTS";
// export const UPDATE_USER = "UPDATE_USER";
// export const DELETE_USER = "DELETE_USER";

export const setUser = data => ({
  type: SET_USER,
  data: data
});
export const updatePoints = points => ({
  type: UPDATE_POINTS,
  data: points
});

export const refreshPoints = () => async dispatch => {
  try {
    let response = await fetch(`/api/students/points`, {
      method: "GET",
      credentials: "include"
    });
    response = await response.json();
    dispatch(updatePoints(response.apiData));
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async params => {
  try {
    const response = await fetch("/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};
