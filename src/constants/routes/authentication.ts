const constantRoutesAuth = {
  root: "auth",
  options: "options",
  challengeManager: {
    root: "challenge-manager",
    login: "login",
  },

  tasker: {
    root: "tasker",
    login: "login",
    register: "register",
    emailRegistration: "email-registration",
    verifyOtp: "verify-otp",
    forgotPassword: "forgot-password",
    registerSuccess: "register-success",
    loginNonApprove: "login-non-approve",
  },

  mentor: {
    root: "mentor",
    login: "login",
  },

  adminRoot: {
    root: "root",
    login: "login",
  },
};

export default constantRoutesAuth;
