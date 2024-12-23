import followerApi from "./follower";
import taskApi from "./task";
import taskSolutionApi from "./taskSolution";
import uploadApi from "./upload";

const constantTaskerApi = {
  task: taskApi,
  follower: followerApi,
  upload: uploadApi,
  taskSolution: taskSolutionApi,
};

export default constantTaskerApi;
