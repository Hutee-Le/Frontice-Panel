import { Navigate, RouteObject } from "react-router-dom";
import constantRoutesChallengeManager from "../../constants/routes/challengeManager";
import constantDynamicRoute from "../../constants/routes/dynamicRoute";
import { ChallengeManagerController } from "../../pages/ChallengeManager";
import { notfoundRoute } from "../CommonRoutes";
import {
  notMatchRoute,
  taskeeProfileRoute,
  taskerProfileRoute,
} from "../CommonRoutes/commonRoutes";
import MentorController from "../../pages/Mentor/Controller";

const CHALLENGE_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.challenges.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.challenges.details}/:${constantDynamicRoute.challenge}`,
  CREATE: `${constantRoutesChallengeManager.pages.challenges.create}`,
};

const SOLUTION_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.solutions.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.solutions.details}/:${constantDynamicRoute.solution}`,
  REPORT: `${constantRoutesChallengeManager.pages.solutions.report}`,
  REPORT_DETAILS: `:${constantDynamicRoute.reportSolution}`,
};

const STATISTIC_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.statistic.root}`,
};

const TASK_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.tasks.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.tasks.details}/:${constantDynamicRoute.task}`,
  REPORT: `${constantRoutesChallengeManager.pages.tasks.report}`,
  REPORT_DETAILS: `:${constantDynamicRoute.reportTask}`,
  SOLUTION_TASK_DETAILS: `${constantRoutesChallengeManager.pages.tasks.taskSolutionDetails}/:${constantDynamicRoute.taskSolution}`,
};

const PROFILE_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.profile.root}`,
  ME: `${constantRoutesChallengeManager.pages.profile.me}`,
  SETTING: `${constantRoutesChallengeManager.pages.profile.setting}`,
  CHANGE_PASSWORD: `${constantRoutesChallengeManager.pages.profile.changePassword}`,
};

const extendProfileRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={PROFILE_ROUTES.ME} replace />,
  },
  {
    path: PROFILE_ROUTES.ME,
    element: <ChallengeManagerController.Profile />,
  },
  {
    path: PROFILE_ROUTES.SETTING,
    element: <ChallengeManagerController.Profile.Setting />,
  },
  {
    path: PROFILE_ROUTES.CHANGE_PASSWORD,
    element: <MentorController.Profile.ChangePassword />,
  },
];

const extendChallengeRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Challenge.List />,
  },
  {
    path: CHALLENGE_ROUTES.DETAILS,
    element: <ChallengeManagerController.Challenge.Details />,
  },
  {
    path: CHALLENGE_ROUTES.CREATE,
    element: <ChallengeManagerController.Challenge.Upload />,
  },
];

const extendSolutionRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Solution.List />,
  },
  {
    path: SOLUTION_ROUTES.DETAILS,
    element: <ChallengeManagerController.Solution.Details />,
  },
  {
    path: SOLUTION_ROUTES.REPORT,
    children: [
      {
        index: true,
        element: <ChallengeManagerController.Solution.Reports />,
      },
      {
        path: SOLUTION_ROUTES.REPORT_DETAILS,
        element: <ChallengeManagerController.Solution.ReportDetails />,
      },
    ],
  },
];

const extendStatisticRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Statistic.Default />,
  },
];

const extendTaskRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Task.List />,
  },
  {
    path: TASK_ROUTES.DETAILS,
    element: <ChallengeManagerController.Task.Details />,
  },
  {
    path: TASK_ROUTES.SOLUTION_TASK_DETAILS,
    element: <ChallengeManagerController.Task.SolutionTaskDetails />,
  },
  {
    path: TASK_ROUTES.REPORT,
    children: [
      {
        index: true,
        element: <ChallengeManagerController.Task.Reports />,
      },
      {
        path: TASK_ROUTES.REPORT_DETAILS,
        element: <ChallengeManagerController.Task.ReportDetails />,
      },
    ],
  },
];

const challengeManagementRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={CHALLENGE_ROUTES.PARENT} replace />,
  },
  {
    path: CHALLENGE_ROUTES.PARENT,
    children: [...extendChallengeRoutes, notfoundRoute],
  },

  {
    path: SOLUTION_ROUTES.PARENT,
    children: [...extendSolutionRoutes, notfoundRoute],
  },

  {
    path: TASK_ROUTES.PARENT,
    children: [...extendTaskRoutes, notfoundRoute],
  },

  {
    path: STATISTIC_ROUTES.PARENT,
    children: [...extendStatisticRoutes, notfoundRoute],
  },

  {
    path: PROFILE_ROUTES.PARENT,
    children: [...extendProfileRoutes],
  },

  taskeeProfileRoute,
  taskerProfileRoute,
  notfoundRoute,
  notMatchRoute,
];

export default challengeManagementRoutes;
