import challengeQueryKey from "./challenge/challengeQueryKey";
import { solutionQueryKey } from "./solution";
import taskQueryKey from "./task";
import taskeeQueryKey from "./taskee/taskeeQueryKey";
import taskerQueryKey from "./tasker";
import taskSolution from "./taskSolution";

const constantChallengeManagerQueryKey = {
  challenge: challengeQueryKey,
  taskee: taskeeQueryKey,
  soltuion: solutionQueryKey,
  taskSolution: taskSolution,
  task: taskQueryKey,
  tasker: taskerQueryKey,
};

export default constantChallengeManagerQueryKey;
