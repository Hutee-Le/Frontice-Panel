import { TaskCreatePage } from "./Create";
import { TaskDetailsPage } from "./Details";
import { TaskListPage } from "./List";
import { TaskUpdatePage } from "./Update";

const TaskManagement = () => {
  return null;
};

TaskManagement.List = TaskListPage;
TaskManagement.Details = TaskDetailsPage;
TaskManagement.Update = TaskUpdatePage;
TaskManagement.Create = TaskCreatePage;

export default TaskManagement;
