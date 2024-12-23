import { useEffect } from "react";
import authService from "../service/authService";
import useAuthStore from "../store/Auth/authStore";
import { checkRefreshTokenValidity } from "../utils/helper";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../utils/localstorage";

const useCheckAuthOnReload = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setIsPending = useAuthStore((state) => state.setIsPending);
  const isAuthentication = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const isPending = useAuthStore((state) => state.isPending);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      setIsPending(true);

      if (accessToken) {
        try {
          const userInfo = await authService
            .infoMe()
            .then((response) => response.data);
          login(userInfo);
        } catch (error) {
          console.log("[Error in accessing user info]:", error);
          removeAccessToken();
          removeRefreshToken();
          logout();
        } finally {
          setIsPending(false);
        }
        return;
      }

      // Optimazation logic in here
      if (refreshToken) {
        const validateRefreshToken = checkRefreshTokenValidity(refreshToken);
        if (validateRefreshToken) {
          try {
            const newJwtToken = await authService.refreshToken({
              refreshToken: refreshToken,
            });
            saveAccessToken(newJwtToken.data.access_token);
            saveRefreshToken(newJwtToken.data.refresh_token);

            try {
              const userInfo = await authService
                .infoMe()
                .then((response) => response.data);
              login(userInfo); // Cập nhật trạng thái đăng nhập
              return;
            } catch (error) {
              console.log(
                "[Error in fetching user info after refresh]:",
                error,
              );
              removeRefreshToken();
              removeAccessToken();
              logout();
            }
          } catch (error) {
            console.log("[Error in refreshing token]:", error);
            removeRefreshToken();
            removeAccessToken();
            logout();
            return;
          } finally {
            setIsPending(false);
          }
        }
        return;
      }

      setIsPending(false);
    };

    checkAuth();
  }, [login, logout]);

  return { role, isAuthentication, isPending };
};

export default useCheckAuthOnReload;
