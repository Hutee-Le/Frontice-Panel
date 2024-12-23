import { FC, PropsWithChildren } from 'react';
import useAuthStore from '../../../store/Auth/authStore';
import { useNavigate } from 'react-router-dom';
import constantRoutesAuth from '../../../constants/routes/authentication';

type PrivateRouteProps = PropsWithChildren & {};

const PrivateRouteWrapper: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated: isAuthentication } = useAuthStore();
  const navigate = useNavigate();
  if (!isAuthentication) {
    navigate(`/${constantRoutesAuth.options}`);
    return;
  }
  return <>{children}</>;
};

export default PrivateRouteWrapper;
