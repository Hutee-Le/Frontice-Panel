import { useMutation } from "@tanstack/react-query";
import authService from "../../../service/authService";
import { ILoginRequest } from "../../../types/request/login";
import { toast } from "react-toastify";
import { saveAccessToken, saveRefreshToken } from "../../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/Auth/authStore";
import mutationKey from "../../../constants/mutation";

const useLoginLogic = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const mutationGetInfo = useMutation({
    mutationKey: [mutationKey.getInfo],
    mutationFn: async () => await authService.infoMe(),
  });

  const mutationLogin = useMutation({
    mutationKey: [],
    mutationFn: (data: ILoginRequest) => {
      return toast.promise(
        authService
          .login(data)
          .then((response) => {
            saveAccessToken(response.data.access_token);
            saveRefreshToken(response.data.refresh_token);
            return response.data;
          })
          .then(async (responseTokens) => {
            return await toast.promise(
              mutationGetInfo
                .mutateAsync()
                .then((response) => {
                  saveRefreshToken(responseTokens.refresh_token);
                  saveAccessToken(responseTokens.access_token);
                  login(response.data);
                })
                .catch((error) => {
                  console.log("error: ", error);
                }),
              {
                pending: "Đang thực hiện lấy thông tin tài khoản",
                success: "Lấy thông tin tài khoản thành công",
                error: "Lấy thông tin tài khoản thất bại",
              },
            );
          }),
        {
          success: "Đăng nhập thành công",
          pending: "Đang thực hiện đăng nhập",
          error: "Đăng nhập thất bại ",
        },
      );
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  return { mutationLogin };
};

export default useLoginLogic;
