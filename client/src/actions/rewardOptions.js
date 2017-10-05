import { startRequest, failedRequest } from "./index";
export const GET_ALL_REWARD_OPTIONS = "GET_ALL_REWARD_OPTIONS";

export const getAllRewardOptions = options => {
  return {
    type: GET_ALL_REWARD_OPTIONS,
    data: options
  };
};

//get all the rewards for a student that their teachers are offering
// //get all the rewards a student could ever choose from
export const getStudentRewardOptions = classrooms => async dispatch => {
  const flatTeachers = classrooms.reduce((all, classroom) => {
    return all.concat(classroom.teachers);
  }, []);
  const uniqueTeachers = new Set(flatTeachers);
  dispatch(startRequest());
  //TODO: HANDLE ERRORS BETTER
  try {
    // console.log("teachers = ", [...uniqueTeachers.values()]);
    const promiseOfRewards = [...uniqueTeachers.values()].map(teacher => {
      return fetch(`/api/teachers/${teacher}/rewards`, {
        method: "GET"
      });
    });
    let allResponses = await Promise.all(promiseOfRewards);
    allResponses = allResponses.map(response => response.json());
    let allRewards = await Promise.all(allResponses);
    allRewards = allRewards.map(response => response.apiData);
    //NOTE: THIS LIST CURRENTLY INCLUDES DUPLICATES, AND BLOWS UP REACT
    let flatListORewards = allRewards.reduce(
      (list, rewardArr) => list.concat(rewardArr),
      []
    );
    dispatch(getAllRewardOptions(flatListORewards));
  } catch (e) {
    console.error(e);
    dispatch(failedRequest(e));
  }
};
