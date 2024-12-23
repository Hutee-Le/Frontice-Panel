import { RouteObject, Navigate } from "react-router-dom";
import { LoginPage } from "../../pages/Auth/Login";
import constantRoutesAuth from "../../constants/routes/authentication";
import { AuthLayout } from "../../layout/Auth";
import { OptionsRolePage } from "../../pages/Auth/Options";
import { RegisterPage } from "../../pages/Auth/Register";
import { notMatchRoute } from "../CommonRoutes";
import { GuestOnlyWrapper } from "../../components/Wrapper/GuestOnly";
import { VerifyOtpPage } from "../../pages/Auth/VerifyOtp";
import { ForgotPasswordPage } from "../../pages/Auth/ForgotPassword";
import { ResultRegisterSuccessPage } from "../../pages/Auth/ResultRegisterSuccess";
import { ResultNonApprovePage } from "../../pages/Auth/ResultNonApprove";
import { EmailRegistrationPage } from "../../pages/Auth/EmailRegítration";

const extendAuthRoutes: RouteObject[] = [
  {
    path: constantRoutesAuth.options,
    // index: true,
    element: <OptionsRolePage />,
  },
  {
    path: constantRoutesAuth.challengeManager.root,
    // TODO: refactor routes in here
    children: [
      {
        index: true,
        element: (
          <Navigate to={constantRoutesAuth.challengeManager.login} replace />
        ),
      },
      {
        path: constantRoutesAuth.challengeManager.login,
        element: <LoginPage />,
      },
      notMatchRoute,
    ],
  },

  {
    path: constantRoutesAuth.adminRoot.root,
    children: [
      {
        index: true,
        element: <Navigate to={constantRoutesAuth.adminRoot.login} />,
      },
      {
        path: constantRoutesAuth.adminRoot.login,
        element: <LoginPage />,
      },
    ],
  },

  {
    path: constantRoutesAuth.mentor.root,
    children: [
      {
        index: true,
        element: <Navigate to={constantRoutesAuth.mentor.login} replace />,
      },
      {
        path: constantRoutesAuth.mentor.login,
        element: <LoginPage />,
      },
      notMatchRoute,
    ],
  },

  {
    path: constantRoutesAuth.tasker.root,
    children: [
      {
        index: true,
        element: <Navigate to={constantRoutesAuth.tasker.login} replace />,
      },
      {
        path: constantRoutesAuth.tasker.login,
        element: <LoginPage />,
      },
      {
        path: constantRoutesAuth.tasker.emailRegistration,
        element: <EmailRegistrationPage />,
      },
      {
        path: constantRoutesAuth.tasker.register,
        element: <RegisterPage />,
      },
      {
        path: constantRoutesAuth.tasker.verifyOtp,
        element: <VerifyOtpPage />,
      },
      {
        path: constantRoutesAuth.tasker.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: constantRoutesAuth.tasker.registerSuccess,
        element: <ResultRegisterSuccessPage />,
      },
      {
        path: constantRoutesAuth.tasker.loginNonApprove,
        element: <ResultNonApprovePage />,
      },
      notMatchRoute,
    ],
  },
];

const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <GuestOnlyWrapper>
        <AuthLayout />
      </GuestOnlyWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={`${constantRoutesAuth.root}/${constantRoutesAuth.options}`}
            replace
          />
        ),
      },
      {
        path: constantRoutesAuth.root,
        children: [
          {
            index: true,
            element: <Navigate to={constantRoutesAuth.options} replace />,
          },
          ...extendAuthRoutes,
        ],
      },
      {
        path: "*",
        element: (
          <Navigate
            to={`${constantRoutesAuth.root}/${constantRoutesAuth.options}`}
            replace
          />
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
];

export default authRoutes;
