import { FC, PropsWithChildren } from "react";
import useAuthStore from "../../../store/Auth/authStore";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../constants/routes/global";

type GuestOnlyWrapperProps = PropsWithChildren & {};
const GuestOnlyWrapper: FC<GuestOnlyWrapperProps> = ({ children }) => {
  const isAuthentication = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (isAuthentication) {
    navigate(constantRoutesGlobal.errorPage[404]);
    return;
  }

  return <>{children}</>;
};

export default GuestOnlyWrapper;
