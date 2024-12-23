import { Navigate, RouteObject } from "react-router-dom";
import constantRoutesMentor from "../../constants/routes/mentor";
import constantDynamicRoute from "../../constants/routes/dynamicRoute";
import MentorController from "../../pages/Mentor/Controller";
import {
  notfoundRoute,
  notMatchRoute,
  taskeeProfileRoute,
} from "../CommonRoutes/commonRoutes";

const SOLTUION_ROUTES = {
  ROOT: `${constantRoutesMentor.solution.root}`,
  LIST: `${constantRoutesMentor.solution.list}`,
  DETAILS: `${constantRoutesMentor.solution.details}/:${constantDynamicRoute.solution}`,
};

const MY_PROFILE_ROUTES = {
  ROOT: `${constantRoutesMentor.profile.root}`,
  CHANGE_PASSWORD: `${constantRoutesMentor.profile.changePassword}`,
  DETAILS: `${constantRoutesMentor.profile.details}`,
  SETTING: `${constantRoutesMentor.profile.setting}`,
};

const extendSolutionRoutes: RouteObject[] = [
  {
    index: true,
    element: <MentorController.Solutions.List />,
  },
  {
    path: SOLTUION_ROUTES.DETAILS,
    element: <MentorController.Solutions.Details />,
  },
];

const extendMyProfileRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={MY_PROFILE_ROUTES.DETAILS} replace />,
  },
  {
    path: MY_PROFILE_ROUTES.DETAILS,
    element: <MentorController.Profile />,
  },
  {
    path: MY_PROFILE_ROUTES.SETTING,
    element: <MentorController.Profile.Setting />,
  },
  {
    path: MY_PROFILE_ROUTES.CHANGE_PASSWORD,
    element: <MentorController.Profile.ChangePassword />,
  },
];

const MentorRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <Navigate
        to={`${SOLTUION_ROUTES.ROOT}/${SOLTUION_ROUTES.LIST}`}
        replace
      />
    ),
  },
  {
    path: SOLTUION_ROUTES.ROOT,
    children: extendSolutionRoutes,
  },
  {
    path: MY_PROFILE_ROUTES.ROOT,
    children: extendMyProfileRoutes,
  },
  taskeeProfileRoute,
  notMatchRoute,
  notfoundRoute,
];

export default MentorRoutes;
