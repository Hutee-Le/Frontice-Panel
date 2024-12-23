import { constantChallengeApi } from "./challenge";
import constantSolutionApi from "./solution";
import constantTaskApi from "./task";
import constantTaskerApi from "./tasker";
import constantTaskSolution from "./taskSolution";

const constantChallengeManagerApi = {
  challenge: constantChallengeApi,
  solution: constantSolutionApi,
  task: constantTaskApi,
  taskSolution: constantTaskSolution,
  tasker: constantTaskerApi,
};

export default constantChallengeManagerApi;
