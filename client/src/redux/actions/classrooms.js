export const GET_ALL_CLASSROOMS = "GET_ALL_CLASSROOMS";
export const GET_ONE_CLASSROOM = "GET_ONE_CLASSROOM";
export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM";
export const REMOVE_CLASSROOM = "REMOVE_CLASSROOM";

export const getClassrooms = data => ({
  type: GET_ALL_CLASSROOMS,
  data: data
});

const addClassroom = data => ({
  type: ADD_CLASSROOM,
  data: data
});

const updateClassroom = (id, data) => ({
  type: UPDATE_CLASSROOM,
  data: {
    id: id,
    classroom: data
  }
});

const removeClassroom = id => ({
  type: REMOVE_CLASSROOM,
  data: id
});

export const addStudentToClassroom = (id, studentData) => async dispatch => {
  try {
    studentData.password = "foo";

    const response = await fetch(`/api/classrooms/${id}/student`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentData)
    });

    const classroom = await response.json();

    if (!classroom.success) {
      throw new Error(classroom.apiError.message);
    }

    dispatch(updateClassroom(id, classroom.apiData));
  } catch (error) {
    console.log(error);
  }
};

export const deleteClass = id => async dispatch => {
  try {
    let response = await fetch(`/api/classrooms/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    response = await response.json();

    if (!response.success) {
      throw new Error(response.apiError.message);
    }

    dispatch(removeClassroom(id));
  } catch (error) {
    console.log(error);
  }
};

export const createClassroom = (id, title) => async dispatch => {
  try {
    const params = {
      title,
      description: "A class.",
      teachers: [id],
      students: []
    };
    const response = await fetch("/api/classrooms", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    const classroom = await response.json();

    if (!classroom.success) {
      throw new Error(classroom.apiError.message);
    }

    dispatch(addClassroom(classroom.apiData));
  } catch (error) {
    console.log(error);
  }
};
