import { Navigate, RouteObject } from "react-router";
import constantRoutesTasker from "../../constants/routes/tasker";
import TaskerController from "../../pages/Tasker/Controller";
import { notfoundRoute, notMatchRoute } from "../CommonRoutes";
import { taskeeProfileRoute } from "../CommonRoutes/commonRoutes";
import constantDynamicRoute from "../../constants/routes/dynamicRoute";

const TASK_ROUTES = {
  ROOT: constantRoutesTasker.task.root,
  LIST: constantRoutesTasker.task.list,
  CREATE: constantRoutesTasker.task.create,
  UPDATE: constantRoutesTasker.task.update,
  DETAILS: constantRoutesTasker.task.details,
};

const SOLUTION_ROUTES = {
  ROOT: constantRoutesTasker.solution.root,
  DETAILS: constantRoutesTasker.solution.details,
};

const PROFILE_ROUTES = {
  ROOT: constantRoutesTasker.profile.root,
  DETAILS: constantRoutesTasker.profile.details,
  SETTING: constantRoutesTasker.profile.setting,
  CHANGE_PASSWORD: constantRoutesTasker.profile.changePassword,
};

const extendTaskRoutes: RouteObject[] = [
  {
    index: true,
    element: <TaskerController.Task.List />,
  },
  {
    path: TASK_ROUTES.CREATE,
    element: <TaskerController.Task.Create />,
  },
  {
    path: `${TASK_ROUTES.UPDATE}/:${constantDynamicRoute.task}`,
    element: <TaskerController.Task.Update />,
  },
  {
    path: `${TASK_ROUTES.DETAILS}/:${constantDynamicRoute.task}`,
    element: <TaskerController.Task.Details />,
  },
];

const extendSolutionRoutes: RouteObject[] = [
  {
    path: `${SOLUTION_ROUTES.DETAILS}/:${constantDynamicRoute.taskSolution}`,
    element: <TaskerController.Solution.Details />,
  },
];

const extendProfileRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={PROFILE_ROUTES.DETAILS} replace />,
  },
  {
    path: PROFILE_ROUTES.DETAILS,
    element: <TaskerController.Profile />,
  },
  {
    path: PROFILE_ROUTES.CHANGE_PASSWORD,
    element: <TaskerController.Profile.ChangePassword />,
  },
  {
    path: PROFILE_ROUTES.SETTING,
    element: <TaskerController.Profile.Setting />,
  },
];

const TaskerRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <Navigate to={`/${TASK_ROUTES.ROOT}/${TASK_ROUTES.LIST}`} replace />
    ),
  },
  {
    path: TASK_ROUTES.ROOT,
    children: extendTaskRoutes,
  },
  {
    path: PROFILE_ROUTES.ROOT,
    children: extendProfileRoutes,
  },
  {
    path: SOLUTION_ROUTES.ROOT,
    children: extendSolutionRoutes,
  },
  notMatchRoute,
  notfoundRoute,
  taskeeProfileRoute,
];

export default TaskerRoutes;
