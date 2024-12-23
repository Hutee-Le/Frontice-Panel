import { TaskerProfile } from "../MyProfile/Tasker";
import { SolutionManagement } from "./Solution";
import { TaskManagement } from "./Task";

const TaskerController = () => {
  return null;
};

TaskerController.Task = TaskManagement;
TaskerController.Profile = TaskerProfile;
TaskerController.Solution = SolutionManagement;

export default TaskerController;
