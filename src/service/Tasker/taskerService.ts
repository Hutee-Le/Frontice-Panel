import followerService from "./Follower";
import taskSolutionService from "./Solution";
import taskSerivce from "./Task";
import uploadService from "./Upload";

const taskerService = {
  task: taskSerivce,
  follower: followerService,
  upload: uploadService,
  taskSolution: taskSolutionService,
};

export default taskerService;
