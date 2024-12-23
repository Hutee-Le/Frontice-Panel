const constantRoutesChallengeManager = {
  pages: {
    root: "/",
    profile: {
      root: "profile",
      me: "me",
      setting: "setting",
      changePassword: "change-password",
    },
    challenges: {
      root: "challenges",
      // Children
      details: "details",
      create: "create",
    },
    statistic: {
      root: "statistic",
    },
    tasks: {
      root: "tasks",
      // Children
      details: "details",
      report: "reports",
      taskSolutionDetails: "task-solution",
    },
    solutions: {
      root: "solutions",
      // Children
      report: "reports",
      details: "details",
    },
  },
};

export default constantRoutesChallengeManager;
