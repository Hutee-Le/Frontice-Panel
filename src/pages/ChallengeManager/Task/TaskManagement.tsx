import { TaskDetailsPage } from "./Details";
import { TaskListPage } from "./List";
import { TaskReportsPage } from "./Report";
import { TaskReportDetailsPage } from "./ReportDetails";
import { SolutionTaskDetails } from "./SolutionTaskDetails";

const TaskManagement = () => {
  return TaskListPage;
};

TaskManagement.List = TaskListPage;
TaskManagement.Details = TaskDetailsPage;
TaskManagement.Reports = TaskReportsPage;
TaskManagement.ReportDetails = TaskReportDetailsPage;
TaskManagement.SolutionTaskDetails = SolutionTaskDetails;
export default TaskManagement;
