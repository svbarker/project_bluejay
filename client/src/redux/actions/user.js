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

const editUser = () => () => {
  //
};
