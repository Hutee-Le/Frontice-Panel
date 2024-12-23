import axiosClient from "../../../axios/axiosClient";
import constantUploadApi from "../../../constants/api/upload";
import { IUploadAvatarFormData } from "../../../types/request/upload/avatar";
import IAvatarService from "../../../types/services/upload/avatar";

const uploadAvatarService: IAvatarService = {
  upload: (formData: IUploadAvatarFormData) => {
    const { image } = formData;
    const formDataRequest = new FormData();
    formDataRequest.append("image", image);
    return axiosClient.post(
      `${constantUploadApi.avatar.upload}`,
      formDataRequest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
};

export default uploadAvatarService;
