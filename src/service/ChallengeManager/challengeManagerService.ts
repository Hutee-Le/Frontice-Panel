import challengeService from "./Challenge";
import solutionService from "./Solution";
import taskService from "./Task";
import taskeeService from "./Taskee";
import taskerSerivce from "./Tasker";
import taskSolutionService from "./TaskSolution";

const challengeManagerService = {
  challenge: challengeService,
  solution: solutionService,
  taskee: taskeeService,
  task: taskService,
  taskSolution: taskSolutionService,
  tasker: taskerSerivce,
};

export default challengeManagerService;
