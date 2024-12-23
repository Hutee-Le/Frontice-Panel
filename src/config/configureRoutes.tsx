import { RouteObject } from "react-router-dom";
import authRoutes from "../routes/AuthRoutes/authRoutes";
import { challengeManagementRoutes } from "../routes/ChallengeManager";
import { DashBoardLayout } from "../layout/Root";
import { MentorRoutes } from "../routes/Mentor";
import { RoleType } from "../types/base/role";
import { TaskerRoutes } from "../routes/Tasker";
import { RootRoutes } from "../routes/Root";

const useConfigureRoutes = (
  role: RoleType | null,
  isAuthentication: boolean,
): RouteObject[] => {
  if (!isAuthentication || !role) {
    return authRoutes;
  }

  const basedRoutes: () => RouteObject[] = () => {
    switch (role) {
      case "challenge":
        return challengeManagementRoutes;

      case "mentor":
        return MentorRoutes;

      case "tasker":
        // console.log("routes for tasker");
        return TaskerRoutes;

      case "root":
        return RootRoutes;

      default:
        return [];
    }
  };

  return [
    {
      path: "/",
      element: <DashBoardLayout />,
      children: basedRoutes(),
    },
  ];
};

export default useConfigureRoutes;
