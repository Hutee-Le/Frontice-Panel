import { RouteObject } from "react-router-dom";
import { challengeManagementRoutes } from "../routes/ChallengeManager";
import { MentorRoutes } from "../routes/Mentor";
import { RoleType } from "../types/base/role";

const useRoutesOfRole: (role: RoleType) => RouteObject[] = (role) => {
  switch (role) {
    case "challenge":
      return challengeManagementRoutes;

    case "mentor":
      return MentorRoutes;

    case "tasker":
      // TODO: Implement tasker routes
      return [];

    default:
      return [];
  }
};

export default useRoutesOfRole;
